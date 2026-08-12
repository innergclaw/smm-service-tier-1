import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = process.env.GITHUB_PAGES_ROOT === "true" ? "" : "/demos/reference-room";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      trailingSlash: true,
      basePath: pagesBasePath,
      assetPrefix: pagesBasePath,
      images: { unoptimized: true },
      typescript: { tsconfigPath: "tsconfig.pages.json" },
    }
  : {};

export default nextConfig;
