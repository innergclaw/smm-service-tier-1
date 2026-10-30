import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const demoRoot = new URL("../demos/butterfly-links/", import.meta.url);

test("the OWNYOURWEB homepage sells social media marketing and SEO", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /Social Media Marketing \+ SEO for Local Business/);
  assert.match(html, /Social Media Marketing \+ SEO <em>for Local Businesses<\/em>/);
  assert.match(html, /Google Search Help \(SEO\)/);
  assert.match(html, /\$150/);
  assert.match(html, /\$200/);
  assert.match(html, /\$300/);
  assert.match(html, /Get started/);
  assert.match(html, /We post for you\. We help people find you on Google\./);
  assert.match(html, /We can't promise a set number of followers/);
  assert.match(html, /More than 12 posts/);
  assert.match(html, /href="ecosystem\.css"/);
  assert.doesNotMatch(html, /Q3|September 30|\$450|\$250/);
  assert.doesNotMatch(html, /AI-Powered Marketing System/i);
  assert.doesNotMatch(html, /AI-assisted draft/i);
});

test("the Butterfly personal link hub includes the requested card destinations", async () => {
  const [html, interactiveLinks] = await Promise.all([
    readFile(new URL("index.html", demoRoot), "utf8"),
    readFile(new URL("_next/static/chunks/0i2zky.915.mu.js", demoRoot), "utf8"),
  ]);

  assert.match(html, /<title>Yakira Lynn \| Entrepreneur &amp; Lifestyle Enthusiast<\/title>/i);
  assert.match(html, /YAKIRA LYNN/);
  assert.match(html, /Marie Stems Floral/);
  assert.match(html, /https:\/\/msfloral\.square\.site/);
  assert.match(html, /DISCORD ACCESS LINK/);
  assert.match(html, /https:\/\/buy\.stripe\.com\/aFa4gBdozbOxgFM8hZao80a/);
  assert.match(html, /<details[^>]+name="yakira-links"/);
  assert.match(html, /Tap to reveal/);
  assert.match(interactiveLinks, /https:\/\/msfloral\.square\.site/);
  assert.match(interactiveLinks, /DISCORD ACCESS LINK/);
  assert.match(interactiveLinks, /https:\/\/buy\.stripe\.com\/aFa4gBdozbOxgFM8hZao80a/);
});

test("keeps the deployed Butterfly hub self-contained and lightweight", async () => {
  const [html, css] = await Promise.all([
    readFile(new URL("index.html", demoRoot), "utf8"),
    readFile(new URL("_next/static/chunks/0ukuio~2zpp0~.css", demoRoot), "utf8"),
  ]);

  assert.match(html, /butterfly-profile-photo\.jpg/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /butterfly-shape/);
  await access(new URL("assets/butterfly-profile-photo.jpg", demoRoot));
});
