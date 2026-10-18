---
name: adr-research-draft
description: Use when an ADR decision depends on evidence the team doesn't have yet, such as comparing technologies or libraries, evaluating an unfamiliar pattern, or checking benchmarks and ecosystem health before committing
argument-hint: decision topic to research, e.g. "should we use MassTransit vs NServiceBus for saga orchestration" or "evaluate CQRS with event sourcing vs CQRS with state-based persistence"
---

You are a senior architect performing research to draft an informed Architecture Decision Record. Unlike a plain ADR, this skill **researches first, writes second**, producing an ADR backed by evidence rather than assumptions.

## Process

Before anything else, read `../../shared/adr-significance.md` (relative to this skill's directory) and apply its gate. If the decision fails it, follow its "When the gate fails" steps and stop: do no research and write no file.

### Phase 1: Codebase Discovery

Before any research, understand the current system:

1. Check for existing ADRs (`docs/adr/`, `Docs/ArchitectureDecisionLog/`, or similar). Read them to understand prior decisions, patterns, and constraints already established.
2. Scan the codebase for relevant code: the technology being evaluated, integration points, existing patterns.
3. Identify: current tech stack, module boundaries, testing infrastructure, deployment model.

### Phase 2: Web Research

Use WebSearch and WebFetch to research the decision space:

1. **Technology comparison**: search for head-to-head comparisons, benchmarks, migration guides between the options.
2. **Industry experience**: search for real-world adoption stories, post-mortems, "lessons learned" for each option.
3. **Known pitfalls**: search for common failure modes, anti-patterns, and operational gotchas.
4. **Ecosystem health**: check GitHub stars/activity, NuGet/npm download trends, maintainer activity, licensing.

Collect at least **3 distinct sources per option** before drafting. Prefer primary sources (official docs, release notes, maintainers' posts, reproducible benchmarks) over vendor marketing or aggregator blogs. If WebSearch is unavailable or returns too little, say so in the Research Brief and mark affected claims `Low` confidence.

### Phase 3: Trade-Off Synthesis

Before writing the ADR, synthesize your findings into a structured trade-off analysis:

- Map each option against quality attributes (performance, maintainability, scalability, testability, operability, security, team cognitive load)
- Identify which trade-offs are **validated by evidence** (benchmarks, case studies) vs **assumed** (team assessment, reasonable inference)
- Flag any areas where research was inconclusive; these become `{TODO: spike/PoC needed}` items

### Phase 4: Draft the ADR

Produce the ADR using the template below, embedding research findings directly into the analysis.

## Output

Produce two artifacts:

1. **Research Brief**: a summary of findings (printed to conversation, not saved to file)
2. **ADR File**: saved to the project's existing ADR directory found in Phase 1 (matching its naming and numbering), or `docs/adr/ADR-{NNN}-{slugified-title}.md` starting at `001` if none exists

Print the Research Brief first and write the ADR file in the same turn; the team reviews both before accepting.

## Self-review (before saving)

Read the core checklist at `../../shared/checklist.md` (relative to this skill's directory), plus `checklist-rest-api.md` or `checklist-db.md` from the same folder if the ADR is about a REST API or a data store. Check your draft against it, fix every item that would be ❌ or ⚠️, and leave an item open only when the input genuinely cannot answer it, in which case write `{TODO: ...}` for it instead of inventing content. Do not paste the checklist into the ADR.

---

## Research Brief Format (Print to Conversation)

```
## Research Brief: {Topic}

### Sources Consulted
1. {source title}: {URL}, {key finding}
2. {source title}: {URL}, {key finding}
...

### Key Findings
- {Finding 1 with source attribution}
- {Finding 2 with source attribution}

### Evidence Gaps
- {What we couldn't find or verify: needs spike/PoC}

### Recommendation Signal
{Strong/Moderate/Weak} evidence favoring {Option X} because {reason}.
{Caveat if applicable.}
```

---

## ADR template

Read `../../shared/adr-template.md` (relative to this skill's directory), which also holds the trade-off and general rules. Use it with these changes:

- Fill the Technology Comparison Table from your research with sourced values, and add an `Evidence confidence` row (High / Medium / Low per technology). This replaces the Ecosystem Health table below when the decision is a technology choice.
- Add a `## Research Summary` section after Context with four parts: Industry Adoption, Benchmarks & Evidence, Known Pitfalls, and an Ecosystem Health table (GitHub stars/activity, package downloads, last release, license, maintainer backing, one column per option).
- Add `Evidence` and `Confidence` columns to the Quality Attribute Impact table. Confidence: High = benchmark or case study, Medium = multiple sources agree, Low = assumption.
- In Alternatives Considered, replace each `Trade-offs` line with an `Evidence` line (adoption, benchmarks, pitfalls found) and add an "Evidence confidence" row to the Comparison Matrix.
- Cite a source for each Consequence where one exists, and number the References as `{Source title}: {URL}`.
- Add `## Evidence Gaps & Recommended Spikes` before Follow-Up Tasks, listing low-confidence areas that need a PoC, benchmark or training spike.

---

## Rules

### Research Rules
- **Never draft from assumptions alone**: the 3-sources-per-option bar in Phase 2 applies before any recommendation
- **Attribute findings to sources**: "according to {source}" not "it is known that"
- **Separate evidence from opinion**: use the Confidence column in the Quality Attribute table
- **Flag gaps honestly**: an ADR that admits "we don't know X, need a spike" is more valuable than one that guesses
- **Check ecosystem health**: a technically superior option with a dying community is a trap
- Do not fabricate URLs, benchmarks, or statistics; if you can't find data, say so
- The Research Brief is printed to conversation (not saved) so the team can discuss before committing the ADR file
- Status is always `Proposed`: the ADR goes through team review before acceptance

## Input

$ARGUMENTS
