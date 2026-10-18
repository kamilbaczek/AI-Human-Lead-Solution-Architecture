# Skill evals

Automated checks that the skills behave, not just that the manifests validate.

```bash
npm ci
npm run evals                    # everything, Vitest default reporter + evals/report/index.html
npx vitest run -t straw-man      # cases whose name contains "straw-man"
npx vitest run -t "review"       # one suite
npm run evals:ui                 # Vitest UI (watch mode, rerun single cases)
```

Every case runs `EVAL_RUNS` times (default 3) and passes when at least 2 of 3 runs pass, because LLM
output varies. Set `EVAL_RUNS=1` for a quick, cheaper smoke run. Cases with a `rubric` are also graded
by a small judge model (Haiku), which checks that the review names the planted defect and proposes a
concrete fix; the regexes only prove the right words appear.

Requires the `claude` CLI. Each case is a headless `claude -p` run, so it costs real tokens; it is
not part of the per-push `plugin-ci.yml`.

## What is tested

- **Planted-flaw reviews** (`cases.json` → `review`). Each fixture in `fixtures/` is an ADR with a
  known defect (no alternatives, straw-man alternatives, irreversible change with no cost
  analysis). `adr-review` must flag it. `good-adr.md` is the control:
  a sound ADR must not be rejected. Other fixtures cover a single option, vague context, no
  negatives or risks, and a solution out of proportion to the team and scale.
- **Agent** (`cases.json` → `agent`). The `adr-reviewer` agent runs as the whole session
  (`--agent human-lead-architect:adr-reviewer`) on the same planted-flaw fixtures and the
  `good-adr.md` control. It must give a verdict, flag the defect and reject the not-ADR-worthy case.
- **Lifecycle** (`cases.json` → `lifecycle`). `adr-index-check`, `adr-drift-check` and `adr-supersede`
  run on planted fixtures (`fixtures/adr-log/`, `fixtures/drift/`, `fixtures/supersede/`).
- **Machine-readable result.** Reviews must end with the `RESULT:` line from
  `shared/review-output.md`, so CI can parse the verdict.
- **Creation** (`cases.json` → `create`). `adr-create` must produce the required sections, keep
  Status Quo as an alternative even when the user says there is only one option, and write
  `{TODO}` instead of inventing numbers. Technology choices must include a comparison table with
  aspects in the left column and technologies across the top, and no ADR may contain emoji.
- **Triggering** (`cases.json` → `triggers`). A prompt must make Claude invoke the expected skill. Negative cases (`expectNone`) must fire no skill of this plugin; near-miss and Polish prompts check the descriptions.

## Adding a case

1. Add a fixture ADR with one clear defect to `fixtures/`.
2. Add an entry to `cases.json` with `mustMatch` / `mustNotMatch` regexes (case-insensitive).
3. Run it a few times; LLM output varies, so assert on the defect, not on exact wording.

## Gotcha: skill name collisions

A personal skill with the same bare name (for example a user-level `adr-review`) shadows the
plugin's. The runner always uses the namespaced `human-lead-architect:<skill>` name.

## Significance gate

ADRs record essential, hard-to-reverse decisions. `refuse/*` cases check that `adr-create` and
`adr-research-draft` decline to write an ADR for a font family, a refactoring of a few classes,
`switch` expressions versus statements, a test naming convention or indentation, and point to where
the decision belongs (`.editorconfig`, coding guidelines, PR description). `refuse/significant-still-written`
is the control: a real decision (database ownership) must still produce an ADR. The reviews must
reject `flaw-not-adr-worthy.md`. The gate lives in `plugins/.../shared/adr-significance.md`.

## Real-world fixtures

`fixtures/real-*.adoc` are ADRs 19, 20 and 22 from Chapter 4 of
[evolutionary-architecture-by-example](https://github.com/evolutionary-architecture/evolutionary-architecture-by-example)
(MIT licensed), copied unchanged, AsciiDoc format included. They check that the skills handle ADRs
written by real teams, not only the synthetic `flaw-*` ones: 0019 and 0022 state a decision with no
alternatives, and 0020 compares three options but lists only benefits. `real-0010-*` is the calibration case: its consequences are honest, so the review must ask for alternatives (Revise) but must not Reject it.

## CI and reports

The evals are ordinary [Vitest](https://vitest.dev) tests (`evals/skills.eval.test.mjs`), so the
reporting is Vitest's own. Config is in `vitest.config.mjs`.

- **Locally:** default console reporter plus an HTML report at `evals/report/index.html`
  (`npx vite preview --outDir evals/report` to serve it).
- **CI:** adds the `github-actions` reporter (annotations and job summary) and `junit` at
  `evals/report/junit.xml`, and retries a failing case once because LLM output varies.

`.github/workflows/evals.yml` runs on pull requests that touch `plugins/**` or `evals/**`, weekly
(model drift) and on demand. It needs an `ANTHROPIC_API_KEY` repository secret, skips fork PRs, and
uploads `evals/report/` as the `eval-report` artifact. `evals/report/` is git-ignored.
