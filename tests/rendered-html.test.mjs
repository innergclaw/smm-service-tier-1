import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://butterfly-links.example/", {
      headers: { accept: "text/html", host: "butterfly-links.example" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the butterfly personal link hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Yakira Lynn \| Entrepreneur &amp; Lifestyle Enthusiast<\/title>/i);
  assert.match(html, /YAKIRA LYNN/);
  assert.match(html, /Entrepreneur/);
  assert.match(html, /Lifestyle Enthusiast/);
  assert.match(html, /Aries Club/);
  assert.match(html, /Marie Stems Floral/);
  assert.match(html, /RYZE Coffee/);
  assert.match(html, /InnerG Intelligence/);
  assert.match(html, /https:\/\/discord\.gg\/RTzygdF5N/);
  assert.match(html, /https:\/\/www\.msfloral\.com\//);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the link hub lightweight and ready for final URLs", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /navigator\.share/);
  assert.match(page, /https:\/\/get\.aspr\.app\/SH1wfR/);
  assert.match(page, /butterfly-profile-photo\.jpg/);
  assert.match(layout, /export const metadata/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /cubic-bezier\(\.23, 1, \.32, 1\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/assets/butterfly-profile-photo.jpg", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
