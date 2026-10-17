---
name: adr-research-draft
description: Use when an ADR decision depends on evidence the team doesn't have yet, such as comparing technologies or libraries, evaluating an unfamiliar pattern, or checking benchmarks and ecosystem health before committing
argument-hint: decision topic to research, e.g. "should we use MassTransit vs NServiceBus for saga orchestration" or "evaluate CQRS with event sourcing vs CQRS with state-based persistence"
---

You are a senior architect performing research to draft an informed Architecture Decision Record. Unlike a plain ADR, this skill **researches first, writes second**, producing an ADR backed by evidence rather than assumptions.

## Process

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

## ADR Template

```markdown
# ADR {NNN}: {Title}

## Status
Proposed

## Date
{today's date, YYYY-MM-DD}

## Context

{Ground the decision in the current system reality:
- What is the current architecture and relevant tech stack?
- What problem, opportunity, or evolutionary pressure triggered this decision?
- What quality attributes are at stake?
- What constraints exist (team, timeline, budget, compliance)?
- Reference prior ADRs if this decision builds on or supersedes them.}

## Research Summary

{Distill your research into actionable insights:

### Industry Adoption
- {Option A}: {adoption context, notable users, maturity}
- {Option B}: {adoption context, notable users, maturity}

### Benchmarks & Evidence
- {Specific performance/reliability data from research, with source}
- {Comparison data if available}

### Known Pitfalls
- {Option A}: {documented failure modes or operational challenges}
- {Option B}: {documented failure modes or operational challenges}

### Ecosystem Health
| Factor | Option A | Option B |
|---|---|---|
| GitHub stars / activity | {data} | {data} |
| Package downloads | {data} | {data} |
| Last release | {date} | {date} |
| License | {license} | {license} |
| Maintainer backing | {org/individual} | {org/individual} |}

## Decision

We will {describe the chosen approach in one clear sentence}.

{Implementation details:
- What changes structurally?
- What is the migration path?
- What is the rollout strategy?}

## Consequences

### Positive
- {Evidence-backed benefit: cite source when possible}

### Negative
- {Evidence-backed cost: cite source when possible}

### Risks
- {Risk with likelihood/impact assessment}
- {Mitigations, or flag as `TODO: define mitigation`}

## Trade-Off Analysis

### Quality Attribute Impact

| Quality Attribute | Impact | Evidence | Confidence |
|---|---|---|---|
| Performance | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |
| Maintainability | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |
| Scalability | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |
| Testability | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |
| Operability | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |
| Security | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |
| Team Cognitive Load | 🟢 / 🟡 / 🔴 | {specific data or reasoning} | High / Medium / Low |

Legend: 🟢 improves · 🟡 neutral · 🔴 degrades
Confidence: High = benchmark/case study · Medium = multiple sources agree · Low = assumption

### Evolutionary Architecture Considerations

- **Reversibility:** {Cost of reversal: data migration, API contracts, team retraining}
- **Incremental adoption:** {Can this be piloted in one module first?}
- **Future optionality:** {What doors open? What doors close?}
- **Module boundary impact:** {Does this respect, strengthen, or break module isolation?}

## Alternatives Considered

### Alternative 1: Status Quo / Do Nothing
- **Description:** {Current approach}
- **Evidence:** {What research says about sustainability of current approach}
- **Why not chosen:** {Specific force that makes inaction unacceptable}

### Alternative 2: {Name}
- **Description:** {How it works}
- **Evidence:** {What research found: adoption, benchmarks, pitfalls}
- **Why not chosen:** {Specific trade-off that made the chosen option preferable, reference evidence}

### Comparison Matrix

| Criterion | Chosen: {Name} | Status Quo | Alt 2: {Name} |
|---|---|---|---|
| {Key force 1} | 🟢 | 🟡 | 🔴 |
| {Key force 2} | 🟡 | 🔴 | 🟢 |
| Evidence confidence | {level} | High (known) | {level} |
| Migration effort | {estimate} | None | {estimate} |

## References

1. {Source title}: {URL}
2. {Source title}: {URL}
3. {Prior ADR references}

## Evidence Gaps & Recommended Spikes

- [ ] {Area where evidence is low-confidence: needs PoC or benchmark}
- [ ] {Area where team experience is unknown: needs training spike}

## Follow-Up Tasks

- [ ] {Implementation task}
- [ ] {Validation task}
```

---

## Rules

### Research Rules
- **Never draft from assumptions alone**: the 3-sources-per-option bar in Phase 2 applies before any recommendation
- **Attribute findings to sources**: "according to {source}" not "it is known that"
- **Separate evidence from opinion**: use the Confidence column in the Quality Attribute table
- **Flag gaps honestly**: an ADR that admits "we don't know X, need a spike" is more valuable than one that guesses
- **Check ecosystem health**: a technically superior option with a dying community is a trap

### Trade-Off Rules
Same as `adr-create`: no option is purely positive or negative, quantify with the research data, name who bears each cost, evaluate reversibility explicitly (hard-to-reverse decisions need stronger evidence), and always include Status Quo as the baseline alternative.

### General Rules
- Do not fabricate URLs, benchmarks, or statistics; if you can't find data, say so
- The Research Brief is printed to conversation (not saved) so the team can discuss before committing the ADR file
- Status is always `Proposed`: the ADR goes through team review before acceptance

## Input

$ARGUMENTS
