import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://food-fusion-215.example/", {
      headers: { accept: "text/html", host: "food-fusion-215.example" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Food Fusion 215 pickup ordering demo", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Food Fusion 215 \| Philadelphia Pickup Ordering Demo<\/title>/i);
  assert.match(html, /BIG FLAVOR/);
  assert.match(html, /Alfredo Bowl/);
  assert.match(html, /Rice Bowl/);
  assert.match(html, /Egg Roll Platter/);
  assert.match(html, /Interactive demo/);
  assert.match(html, /https:\/\/ownyourweb\.marketing\/demos\/food-fusion-215\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the Food Fusion demo and removes the starter", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/assets/food-fusion-215-flyer.png", import.meta.url));

  assert.match(page, /FOOD FUSION/);
  assert.match(page, /food-fusion-215-demo-cart/);
  assert.match(page, /Pay at pickup/);
  assert.match(layout, /export const metadata/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
