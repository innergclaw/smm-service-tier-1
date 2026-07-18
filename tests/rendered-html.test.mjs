import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://soap-game-strong.example/", {
      headers: { accept: "text/html", host: "soap-game-strong.example" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Soap Game Strong operations dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Soap Game Strong Order Flow \| Operations Dashboard Demo<\/title>/i);
  assert.match(html, /Good morning, Soap Game/);
  assert.match(html, /Today’s order flow/);
  assert.match(html, /Wholesale/);
  assert.match(html, /Warehouse pickup/);
  assert.match(html, /Add order/);
  assert.match(html, /https:\/\/ownyourweb\.marketing\/demos\/soap-game-strong\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the Soap Game Strong dashboard and removes the starter", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await access(new URL("../public/og.png", import.meta.url));

  assert.match(page, /Soap Game Strong/);
  assert.match(page, /Never lose an order/);
  assert.match(page, /soap-game-strong-demo-orders/);
  assert.match(layout, /export const metadata/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
