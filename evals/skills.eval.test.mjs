import { describe, expect, it } from "vitest";
import {
  PLUGIN, agentPrompt, cases, claude, createPrompt, firedSkills, judge, majority, reviewPrompt, skillPrompt,
} from "./lib.mjs";

async function assertOutput(out, c) {
  // Boolean asserts keep failure output short; toMatch would dump the whole model answer.
  for (const p of c.mustMatch ?? []) expect(new RegExp(p, "i").test(out), `missing /${p}/`).toBe(true);
  for (const p of c.mustNotMatch ?? []) expect(new RegExp(p, "i").test(out), `unexpected /${p}/`).toBe(false);
  if (c.rubric) {
    const verdict = await judge(out, c.rubric);
    expect(verdict.pass, `judge: ${verdict.reason}`).toBe(true);
  }
}

describe.concurrent("review", () => {
  it.each(cases.review)("$id", async (c) => {
    await majority(async () => assertOutput(await claude(reviewPrompt(c)), c));
  }, 600_000);
});

describe.concurrent("agent", () => {
  it.each(cases.agent ?? [])("$id", async (c) => {
    // Runs the whole session as the plugin's subagent definition, so its tool limits and prompt apply.
    await majority(async () =>
      assertOutput(await claude(agentPrompt(c), ["--agent", `${PLUGIN}:adr-reviewer`]), c));
  }, 600_000);
});

describe.concurrent("create", () => {
  it.each(cases.create ?? [])("$id", async (c) => {
    await majority(async () => assertOutput(await claude(createPrompt(c)), c));
  }, 600_000);
});

describe.concurrent("lifecycle", () => {
  it.each(cases.lifecycle ?? [])("$id", async (c) => {
    await majority(async () => assertOutput(await claude(skillPrompt(c)), c));
  }, 600_000);
});

describe.concurrent("triggers", () => {
  it.each(cases.triggers)("$id", async (c) => {
    await majority(async () => {
      const fired = firedSkills(await claude(c.prompt, ["--output-format", "stream-json", "--verbose"]));
      if (c.expectNone) {
        // Negative case: no skill of this plugin may fire.
        expect(fired.filter((s) => s.startsWith(`${PLUGIN}:`)), "a plugin skill fired").toEqual([]);
      } else {
        // The namespaced name is required: a personal skill with the same bare name must not count.
        expect(fired).toContain(`${PLUGIN}:${c.expectSkill}`);
      }
    });
  }, 600_000);
});
