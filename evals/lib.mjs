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
  c.prompt
    ? `${c.prompt} The ADR is ${join("evals", "fixtures", c.fixture)}.`
    : `Review ${join("evals", "fixtures", c.fixture)}. Do not ask questions; print your full report.`;

export const skillPrompt = (c) => `Use the ${PLUGIN}:${c.skill} skill. ${c.prompt}`;

export const createPrompt = (c) => `Use the ${PLUGIN}:${c.skill} skill. ${c.prompt}`;

/** How many times each case runs; a case passes when at least RUNS - 1 runs pass (2 of 3 by default). */
export const RUNS = Math.max(1, Number(process.env.EVAL_RUNS ?? 3));

/** Runs `attempt` RUNS times; it must throw on failure. Passes on a majority, reports the first failure otherwise. */
export async function majority(attempt) {
  const results = await Promise.all(
    Array.from({ length: RUNS }, () => attempt().then(() => null, (e) => e)),
  );
  const failures = results.filter(Boolean);
  const needed = RUNS === 1 ? 1 : RUNS - 1;
  if (RUNS - failures.length < needed) {
    throw new Error(`${failures.length}/${RUNS} runs failed: ${failures[0].message}`);
  }
}

/** Asks a small model to grade `output` against `rubric`; returns { pass, reason }. */
export async function judge(output, rubric) {
  const prompt = `You grade an architecture review. Rubric:\n${rubric}\n\nReview to grade:\n<review>\n${output}\n</review>\n\nAnswer with one line of JSON only: {"pass": true|false, "reason": "<one sentence>"}`;
  const raw = await claude(prompt, ["--model", "haiku", "--max-turns", "1"]);
  const m = raw.match(/\{[^{}]*"pass"[^{}]*\}/s);
  if (!m) return { pass: false, reason: `judge gave no JSON: ${raw.slice(0, 120)}` };
  return JSON.parse(m[0]);
}

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
