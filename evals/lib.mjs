// Helpers for the skill evals: run headless Claude Code and check its output.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, "..");
export const PLUGIN = "human-lead-architect";
export const cases = JSON.parse(readFileSync(join(here, "cases.json"), "utf8"));

const base = [
  "-p",
  "--plugin-dir", join(repoRoot, "plugins", PLUGIN),
  "--max-turns", "6",
  "--disallowedTools=Write,Edit,Bash,WebSearch,WebFetch",
];

export function claude(prompt, extra = []) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn("claude", [...base, ...extra], { cwd: repoRoot });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.on("error", reject);
    child.on("close", () => resolvePromise(out));
    child.stdin.end(prompt);
  });
}

export const reviewPrompt = (c) =>
  `Use the ${PLUGIN}:${c.skill} skill on ${join("evals", "fixtures", c.fixture)}. Do not ask questions; print your full report.`;

export const agentPrompt = (c) =>
  `Review ${join("evals", "fixtures", c.fixture)}. Do not ask questions; print your full report.`;

export const createPrompt = (c) => `Use the ${PLUGIN}:${c.skill} skill. ${c.prompt}`;

/** Names of the skills Claude invoked, from a stream-json transcript. */
export function firedSkills(streamJson) {
  const fired = [];
  for (const line of streamJson.split("\n")) {
    if (!line.trim().startsWith("{")) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    for (const block of msg.message?.content ?? []) {
      if (block.type === "tool_use" && block.name === "Skill") fired.push(block.input?.skill ?? "");
    }
  }
  return fired;
}
