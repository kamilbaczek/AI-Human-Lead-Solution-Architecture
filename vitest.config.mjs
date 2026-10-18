import { defineConfig } from "vitest/config";

const ci = !!process.env.CI;

export default defineConfig({
  test: {
    include: ["evals/**/*.test.mjs"],
    testTimeout: 6 * 60 * 1000, // each case is a real headless Claude run
    maxConcurrency: 4,
    retry: ci ? 1 : 0, // LLM output varies, so retry a failing case once in CI
    reporters: ci
      ? ["default", "github-actions", "html", "junit"]
      : ["default", "html"],
    outputFile: { html: "evals/report/index.html", junit: "evals/report/junit.xml" },
  },
});
