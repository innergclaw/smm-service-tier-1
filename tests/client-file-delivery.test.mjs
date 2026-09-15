import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../files/index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../files/app.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../files/styles.css", import.meta.url), "utf8");
const edge = await readFile(new URL("../supabase/functions/client-file-access/index.ts", import.meta.url), "utf8");
const schema = await readFile(new URL("../supabase/client-delivery-schema.sql", import.meta.url), "utf8");

test("delivery entry is co-branded and asks for one project code", () => {
  assert.match(html, /OWNYOURWEB/);
  assert.match(html, /SHOPNASGFX/);
  assert.match(html, /What is your project code\?/);
  assert.match(html, /type="password"/);
  assert.match(html, /noindex, nofollow/);
  assert.match(styles, /\[hidden\] \{ display: none !important; \}/);
});

test("frontend sends the code in a POST body and does not persist it", () => {
  assert.match(app, /method: "POST"/);
  assert.match(app, /JSON\.stringify\(\{ code \}\)/);
  assert.doesNotMatch(app, /localStorage|sessionStorage|URLSearchParams/);
});

test("mobile file previews show the complete artwork without cropping", () => {
  assert.match(styles, /\.preview-shell img,[\s\S]*object-fit: contain;/);
  assert.match(styles, /@media \(max-width: 600px\)[\s\S]*\.preview-shell \{ aspect-ratio: 1; \}/);
  assert.match(styles, /\.preview-shell img \{[\s\S]*box-sizing: border-box;[\s\S]*padding: 12px;/);
});

test("edge function returns short-lived private file links", () => {
  assert.match(edge, /const LINK_SECONDS = 600/);
  assert.match(edge, /createSignedUrl/);
  assert.match(edge, /MAX_FAILED_ATTEMPTS = 10/);
  assert.match(edge, /Cache-Control/);
  assert.match(edge, /Deno\.env\.get\("SUPABASE_SERVICE_ROLE_KEY"\)/);
  assert.doesNotMatch(edge, /sb_secret_[A-Za-z0-9_-]+|eyJ[A-Za-z0-9_-]{20,}/);
});

test("database keeps projects private and stores code digests", () => {
  assert.match(schema, /access_code_digest text not null unique/);
  assert.match(schema, /enable row level security/);
  assert.match(schema, /using \(false\) with check \(false\)/);
  assert.match(schema, /'client-deliveries'[\s\S]*false/);
  assert.doesNotMatch(schema, /access_code\s+text/);
});
