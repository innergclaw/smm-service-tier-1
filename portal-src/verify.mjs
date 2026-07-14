import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("./src/main.jsx", import.meta.url), "utf8");
const css = readFileSync(new URL("./src/styles.css", import.meta.url), "utf8");
const authClient = readFileSync(new URL("./src/supabase.js", import.meta.url), "utf8");
const builtHtml = readFileSync(new URL("../portal/index.html", import.meta.url), "utf8");

const postBlock = source.split("const samplePosts = [", 2)[1].split("];", 1)[0];
assert.equal((postBlock.match(/\{ id:/g) || []).length, 12, "Expected twelve sample posts");
assert.equal((postBlock.match(/status: \"Awaiting Client Approval\"/g) || []).length, 3, "Expected three posts awaiting approval");
assert.equal((postBlock.match(/status: \"Approved\"/g) || []).length, 2, "Expected two approved posts");
assert.equal((postBlock.match(/status: \"Revision Requested\"/g) || []).length, 1, "Expected one revision request");

for (const label of ["Dashboard", "Onboarding", "Content", "Brand Library", "Requests", "Messages", "Analytics", "Billing", "Notifications", "Admin Dashboard", "Clients", "Create Content"]) {
  assert.ok(source.includes(`\"${label}\"`), `Missing portal area: ${label}`);
}

for (const marker of ["The Luxe Beauty Studio", "Instagram", "Facebook", "$250", "OWY-INV-2026-0701", "Email verification enabled", "Cloud file storage", "Stripe-ready billing"]) {
  assert.ok(source.includes(marker), `Missing required demonstration marker: ${marker}`);
}

for (const marker of ["signUp", "signInWithPassword", "resetPasswordForEmail", "resend", "updateUser", "onAuthStateChange", "portal_profiles"]) {
  assert.ok(source.includes(marker), `Missing production authentication behavior: ${marker}`);
}

assert.ok(authClient.includes("sb_publishable_"), "Portal must use a publishable Supabase key");
assert.ok(authClient.includes("ownyourweb.marketing/portal/"), "Custom-domain portal redirect must be configured");
assert.ok(authClient.includes("innergclaw.github.io/smm-service-tier-1/portal/"), "GitHub Pages portal redirect must remain supported");
assert.ok(!authClient.includes("service_role"), "A service-role key must never be included in the browser build");
assert.ok(!source.includes("Demo250!"), "Demonstration passwords must not remain in production authentication");

assert.ok(!css.includes("transition:all"), "Do not animate all CSS properties");
assert.ok(!css.includes("scale(0)"), "Do not animate from scale zero");
assert.ok(css.includes("prefers-reduced-motion"), "Reduced-motion handling is required");
assert.ok(css.includes(".btn:active{transform:scale(.97)"), "Press feedback is required");
assert.match(builtHtml, /\.\/assets\/index-[^\"]+\.js/);
assert.match(builtHtml, /\.\/assets\/index-[^\"]+\.css/);

console.log("Portal verification passed: secure authentication, sample data, routes, motion rules, and production assets are present.");
