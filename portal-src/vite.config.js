import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "../portal",
    emptyOutDir: true,
    sourcemap: false,
  },
});
