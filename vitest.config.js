import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    coverage: {
      reporter: ["text", "html"],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
