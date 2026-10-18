import { describe, expect, it } from "vitest";
import { PLUGIN, agentPrompt, cases, claude, createPrompt, firedSkills, reviewPrompt } from "./lib.mjs";

function assertOutput(out, c) {
  // Boolean asserts keep failure output short; toMatch would dump the whole model answer.
  for (const p of c.mustMatch ?? []) expect(new RegExp(p, "i").test(out), `missing /${p}/`).toBe(true);
  for (const p of c.mustNotMatch ?? []) expect(new RegExp(p, "i").test(out), `unexpected /${p}/`).toBe(false);
}

describe.concurrent("review", () => {
  it.each(cases.review)("$id", async (c) => {
    assertOutput(await claude(reviewPrompt(c)), c);
  });
});

describe.concurrent("agent", () => {
  it.each(cases.agent ?? [])("$id", async (c) => {
    // Runs the whole session as the plugin's subagent definition, so its tool limits and prompt apply.
    assertOutput(await claude(agentPrompt(c), ["--agent", `${PLUGIN}:adr-reviewer`]), c);
  });
});

describe.concurrent("create", () => {
  it.each(cases.create ?? [])("$id", async (c) => {
    assertOutput(await claude(createPrompt(c)), c);
  });
});

describe.concurrent("triggers", () => {
  it.each(cases.triggers)("$expectSkill fires for: $prompt", async (c) => {
    const fired = firedSkills(await claude(c.prompt, ["--output-format", "stream-json", "--verbose"]));
    // The namespaced name is required: a personal skill with the same bare name must not count.
    expect(fired).toContain(`${PLUGIN}:${c.expectSkill}`);
  });
});
