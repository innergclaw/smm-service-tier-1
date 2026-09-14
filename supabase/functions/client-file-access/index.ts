/// <reference lib="deno.ns" />
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.110.3";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const BUCKET = "client-deliveries";
const LINK_SECONDS = 600;
const RATE_WINDOW_MINUTES = 15;
const MAX_FAILED_ATTEMPTS = 10;

const allowedOrigins = new Set([
  "https://ownyourweb.marketing",
  "https://www.ownyourweb.marketing",
  "https://innergclaw.github.io",
  "http://127.0.0.1:43104",
  "http://localhost:43104",
]);

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://ownyourweb.marketing",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(req),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "Pragma": "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function clean(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function normalizeCode(value: unknown) {
  return clean(value, 80).toUpperCase().replace(/\s+/g, "");
}

function requestIp(req: Request) {
  return clean(
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown",
    128,
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { ok: false, error: "Method not allowed" }, 405);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json(req, { ok: false, error: "Service unavailable" }, 503);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const body = await req.json().catch(() => ({}));
  const code = normalizeCode(body.code);
  if (code.length < 8) return json(req, { ok: false, error: "Code not recognized" }, 401);

  const codeDigest = await sha256(code);
  const ipDigest = await sha256(requestIp(req));
  const since = new Date(Date.now() - RATE_WINDOW_MINUTES * 60_000).toISOString();

  const { count: recentFailures, error: rateError } = await supabase
    .from("client_delivery_access_log")
    .select("id", { count: "exact", head: true })
    .eq("ip_fingerprint", ipDigest)
    .eq("success", false)
    .gte("created_at", since);

  if (rateError) return json(req, { ok: false, error: "Service unavailable" }, 503);
  if ((recentFailures || 0) >= MAX_FAILED_ATTEMPTS) {
    return json(req, { ok: false, error: "Too many attempts" }, 429);
  }

  const now = new Date().toISOString();
  const { data: project, error: projectError } = await supabase
    .from("client_delivery_projects")
    .select("id, project_name, brand, status_label, delivery_note, expires_at")
    .eq("access_code_digest", codeDigest)
    .eq("is_active", true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .maybeSingle();

  const success = !projectError && Boolean(project);
  await supabase.from("client_delivery_access_log").insert({
    project_id: project?.id || null,
    code_fingerprint: codeDigest.slice(0, 16),
    ip_fingerprint: ipDigest,
    success,
    user_agent: clean(req.headers.get("user-agent"), 500),
  });

  if (!success || !project) return json(req, { ok: false, error: "Code not recognized" }, 401);

  const { data: files, error: filesError } = await supabase
    .from("client_delivery_files")
    .select("id, storage_path, display_name, folder, description, mime_type, extension, size_bytes, sort_order")
    .eq("project_id", project.id)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (filesError) return json(req, { ok: false, error: "Files unavailable" }, 503);

  const signedFiles = await Promise.all((files || []).map(async (file) => {
    const [viewResult, downloadResult] = await Promise.all([
      supabase.storage.from(BUCKET).createSignedUrl(file.storage_path, LINK_SECONDS),
      supabase.storage.from(BUCKET).createSignedUrl(file.storage_path, LINK_SECONDS, {
        download: file.display_name,
      }),
    ]);

    if (viewResult.error || downloadResult.error) return null;
    return {
      ...file,
      view_url: viewResult.data.signedUrl,
      download_url: downloadResult.data.signedUrl,
      link_expires_in_seconds: LINK_SECONDS,
    };
  }));

  await supabase
    .from("client_delivery_projects")
    .update({ last_accessed_at: now, updated_at: now })
    .eq("id", project.id);

  return json(req, {
    ok: true,
    project: {
      project_name: project.project_name,
      brand: project.brand,
      status_label: project.status_label,
      delivery_note: project.delivery_note,
    },
    files: signedFiles.filter(Boolean),
    refreshed_at: now,
  });
});
