#!/usr/bin/env node
// Skill evals: runs each case through headless Claude Code and checks the output.
// Usage: node evals/run.mjs [--reviews | --triggers] [substring-filter]
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const pluginDir = join(repoRoot, "plugins", "ai-agent-solution-architect");
const PLUGIN = "ai-agent-solution-architect";
const cases = JSON.parse(readFileSync(join(here, "cases.json"), "utf8"));

const args = process.argv.slice(2);
const onlyReviews = args.includes("--reviews");
const onlyTriggers = args.includes("--triggers");
const filter = args.find((a) => !a.startsWith("--"));

const base = [
  "-p",
  "--plugin-dir", pluginDir,
  "--max-turns", "6",
  "--disallowedTools=Write,Edit,Bash,WebSearch,WebFetch",
];

function claude(prompt, extra = []) {
  const r = spawnSync("claude", [...base, ...extra], {
    cwd: repoRoot,
    input: prompt,
    encoding: "utf8",
    timeout: 5 * 60 * 1000,
  });
  if (r.error) throw r.error;
  return r.stdout ?? "";
}

function runReview(c) {
  const path = join("evals", "fixtures", c.fixture);
  const out = claude(`Use the ${PLUGIN}:${c.skill} skill on ${path}. Do not ask questions; print your full report.`);
  const failures = [];
  for (const p of c.mustMatch ?? []) if (!new RegExp(p, "i").test(out)) failures.push(`missing /${p}/`);
  for (const p of c.mustNotMatch ?? []) if (new RegExp(p, "i").test(out)) failures.push(`unexpected /${p}/`);
  return failures;
}

function runTrigger(c) {
  const out = claude(c.prompt, ["--output-format", "stream-json", "--verbose"]);
  const fired = [];
  for (const line of out.split("\n")) {
    if (!line.trim().startsWith("{")) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    for (const block of msg.message?.content ?? []) {
      if (block.type === "tool_use" && block.name === "Skill") fired.push(block.input?.skill ?? "");
    }
  }
  // Require the namespaced name: a personal skill with the same bare name must not count.
  const ok = fired.includes(`${PLUGIN}:${c.expectSkill}`);
  return ok ? [] : [`expected ${c.expectSkill}, fired [${fired.join(", ") || "none"}]`];
}

const jobs = [
  ...(onlyTriggers ? [] : cases.review.map((c) => ({ id: c.id, run: () => runReview(c) }))),
  ...(onlyReviews ? [] : cases.triggers.map((c) => ({ id: `trigger/${c.expectSkill}`, run: () => runTrigger(c) }))),
].filter((j) => !filter || j.id.includes(filter));

let failed = 0;
for (const job of jobs) {
  process.stdout.write(`${job.id} ... `);
  const failures = job.run();
  if (failures.length) { failed++; console.log(`FAIL\n    ${failures.join("\n    ")}`); }
  else console.log("ok");
}
console.log(`\n${jobs.length - failed}/${jobs.length} passed`);
process.exit(failed ? 1 : 0);
