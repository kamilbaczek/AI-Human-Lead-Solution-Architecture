#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const MARKETPLACE_SOURCE = "kamilbaczek/AI-Human-Lead-Solution-Architecture";
const MARKETPLACE = "ai-human-lead-solution-architecture";
const PLUGINS = ["human-lead-architect", "tech-stack-management"];

const steps = [
  ["plugin", "marketplace", "add", MARKETPLACE_SOURCE],
  ...PLUGINS.map((p) => ["plugin", "install", `${p}@${MARKETPLACE}`]),
];

if (spawnSync("claude", ["--version"], { stdio: "ignore" }).status !== 0) {
  console.error("Claude Code CLI not found. Install it first: https://claude.com/claude-code");
  process.exit(1);
}

for (const args of steps) {
  console.log(`\n> claude ${args.join(" ")}`);
  const { status } = spawnSync("claude", args, { stdio: "inherit" });
  if (status !== 0) process.exit(status ?? 1);
}

console.log("\nInstalled. Restart Claude Code to load the skills.");
