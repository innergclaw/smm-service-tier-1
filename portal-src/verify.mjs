import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("./src/main.jsx", import.meta.url), "utf8");
const css = readFileSync(new URL("./src/styles.css", import.meta.url), "utf8");
const builtHtml = readFileSync(new URL("../portal/index.html", import.meta.url), "utf8");

const postBlock = source.split("const samplePosts = [", 2)[1].split("];", 1)[0];
assert.equal((postBlock.match(/\{ id:/g) || []).length, 12, "Expected twelve sample posts");
assert.equal((postBlock.match(/status: \"Awaiting Client Approval\"/g) || []).length, 3, "Expected three posts awaiting approval");
assert.equal((postBlock.match(/status: \"Approved\"/g) || []).length, 2, "Expected two approved posts");
assert.equal((postBlock.match(/status: \"Revision Requested\"/g) || []).length, 1, "Expected one revision request");

for (const label of ["Dashboard", "Onboarding", "Content", "Brand Library", "Requests", "Messages", "Analytics", "Billing", "Notifications", "Admin Dashboard", "Clients", "Create Content"]) {
  assert.ok(source.includes(`\"${label}\"`), `Missing portal area: ${label}`);
}

for (const marker of ["The Luxe Beauty Studio", "Instagram", "Facebook", "$250", "OWY-INV-2026-0701", "Secure authentication", "Cloud file storage", "Stripe-ready billing"]) {
  assert.ok(source.includes(marker), `Missing required demonstration marker: ${marker}`);
}

assert.ok(!css.includes("transition:all"), "Do not animate all CSS properties");
assert.ok(!css.includes("scale(0)"), "Do not animate from scale zero");
assert.ok(css.includes("prefers-reduced-motion"), "Reduced-motion handling is required");
assert.ok(css.includes(".btn:active{transform:scale(.97)"), "Press feedback is required");
assert.match(builtHtml, /\.\/assets\/index-[^\"]+\.js/);
assert.match(builtHtml, /\.\/assets\/index-[^\"]+\.css/);

console.log("Portal verification passed: sample data, routes, integration notices, motion rules, and production assets are present.");
