# Skill evals

Automated checks that the skills behave, not just that the manifests validate.

```bash
node evals/run.mjs               # everything
node evals/run.mjs --reviews     # planted-flaw review cases only
node evals/run.mjs --triggers    # "does the right skill fire" cases only
node evals/run.mjs straw-man     # cases whose id contains the substring
```

Requires the `claude` CLI. Each case is a headless `claude -p` run, so it costs real tokens; it is
not part of the per-push CI.

## What is tested

- **Planted-flaw reviews** (`cases.json` → `review`). Each fixture in `fixtures/` is an ADR with a
  known defect (no alternatives, straw-man alternatives, irreversible change with no cost
  analysis). `adr-architecture-review` and `adr-review` must flag it. `good-adr.md` is the control:
  a sound ADR must not be rejected.
- **Triggering** (`cases.json` → `triggers`). A prompt must make Claude invoke the expected skill.

## Adding a case

1. Add a fixture ADR with one clear defect to `fixtures/`.
2. Add an entry to `cases.json` with `mustMatch` / `mustNotMatch` regexes (case-insensitive).
3. Run it a few times; LLM output varies, so assert on the defect, not on exact wording.

## Gotcha: skill name collisions

A personal skill with the same bare name (for example a user-level `adr-review`) shadows the
plugin's. The runner always uses the namespaced `ai-agent-solution-architect:<skill>` name.
