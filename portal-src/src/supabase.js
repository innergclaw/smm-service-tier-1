import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zkyhhoxcrjkhywblzehr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bdi3BexAKWDBaUIh40hJ_A_8CNVdnM_";

const GITHUB_PORTAL_URL = "https://innergclaw.github.io/smm-service-tier-1/portal/";

function currentPortalUrl() {
  if (typeof window === "undefined") return GITHUB_PORTAL_URL;
  if (window.location.hostname === "ownyourweb.marketing") return "https://ownyourweb.marketing/portal/";
  if (window.location.hostname === "www.ownyourweb.marketing") return "https://www.ownyourweb.marketing/portal/";
  if (window.location.hostname === "innergclaw.github.io") return GITHUB_PORTAL_URL;
  return GITHUB_PORTAL_URL;
}

function readAuthCallbackError() {
  if (typeof window === "undefined" || !window.location.hash) return null;
  const params = new URLSearchParams(window.location.hash.slice(1));
  if (!params.get("error")) return null;
  const code = params.get("error_code") || params.get("error") || "auth_error";
  const description = params.get("error_description") || "The email link could not be verified.";
  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
  return { code, description };
}

export const PORTAL_URL = currentPortalUrl();
export const AUTH_CALLBACK_ERROR = readAuthCallbackError();

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
