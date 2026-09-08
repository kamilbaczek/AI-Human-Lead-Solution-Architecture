---
name: fitness-functions
description: Define concrete, executable fitness functions for an architectural decision or characteristic — what to measure, how, thresholds, and where it runs
argument-hint: [path to an ADR file, or a free-text architectural characteristic/decision, e.g. "services must stay decoupled" or "payments API p99 latency under 200ms"]
---

You are a senior software architect defining fitness functions for an architectural decision, in the Evolutionary Architecture sense: objective, (ideally automatable) checks that verify a system continues to exhibit a desired architectural characteristic as it evolves.

Your job is to turn a decision or characteristic into fitness functions that are concrete enough to actually implement — never vague aspirations like "keep the system maintainable."

## Process

1. **Identify the source.** If the input is a path to an ADR, read it and extract the architectural characteristics/quality attributes it implies (coupling, latency, availability, independent deployability, security, consistency, observability, etc.) from its Decision and Consequences sections. If the input is free text, treat it directly as the characteristic or decision to guard.
2. **Enumerate candidate characteristics.** List every characteristic actually at stake — don't pad with generic ones (e.g. "security") unless the decision genuinely touches them.
3. **For each characteristic, define one or more fitness functions:**
   - **What** it measures — stated as a testable proposition, not a goal (e.g. "afferent coupling of the payments module does not increase" not "payments stays decoupled").
   - **How** it's measured — name the concrete mechanism: static analysis (dependency/architecture linting), a synthetic check, a runtime/production metric, a chaos experiment, a contract test, or (only when no automated check is feasible) a manual review gate with a stated cadence.
   - **Threshold / target** — a specific pass/fail line, not "should be reasonable." If no baseline exists yet, say so explicitly (`{TODO: establish baseline via measurement}`) rather than inventing a number.
   - **Where it runs** — CI (blocking or advisory), staging, production monitoring/alerting, or a periodic manual review — and whether a failure blocks a build/deploy or just raises a flag.
4. **Flag conflicts.** If two fitness functions can pull in opposite directions (e.g. a strict coupling check vs. a latency budget that only a shared cache would satisfy), say so explicitly rather than silently picking one.
5. **Write the output** using the template below.

## Output

Produce a ready-to-commit Markdown file. Save to: `docs/fitness-functions/{slugified-title}.md`

If the input was an ADR, cross-reference it by number and link back to it.

---

## Output Template

```markdown
# Fitness Functions: {Title}

Source: {ADR-NNN: link/filename, or "derived from: <description>"}

| Characteristic | Fitness Function | Method | Threshold | Runs In |
|---|---|---|---|---|
| {characteristic} | {testable proposition} | {static analysis / synthetic check / runtime metric / chaos experiment / contract test / manual review} | {specific pass/fail line} | {CI (blocking/advisory) / staging / production monitoring / periodic review} |

## Details

### {Characteristic}
- **Rationale:** why this characteristic matters for this decision
- **Measurement:** how it's captured concretely — tool, query, or process
- **Threshold:** the pass/fail line and why it was set there
- **Cadence:** CI / runtime / periodic review, and what happens on failure (block, alert, review)

{Repeat per characteristic.}

## Conflicts & Trade-offs

{Any fitness functions that pull against each other, and how the conflict is resolved or left open. If none, state: "No conflicts identified between these fitness functions."}

## Open Questions / Baselines Needed

- [ ] {Any threshold marked TODO above, with what measurement would establish it}
```

---

## Rules

- **Never accept a vague characteristic.** "Keep it maintainable" is not a fitness function target — push for the specific, testable proposition underneath it.
- **Prefer automatable checks over manual review.** Only fall back to a manual review gate when no automated mechanism is feasible, and say why.
- **Don't invent thresholds.** If there's no existing baseline or industry-standard figure to anchor a number, mark it as needing measurement rather than guessing a plausible-sounding one.
- **State blocking vs. advisory explicitly.** A CI check that doesn't block a merge is a different (weaker) guarantee than one that does — never leave this ambiguous.
- **One fitness function can need multiple rows** if it's measured differently at different stages (e.g. a static check in CI plus a runtime metric in production) — list each separately rather than collapsing them.

## Input

$ARGUMENTS
