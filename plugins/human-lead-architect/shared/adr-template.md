# ADR template and rules

Shared by `adr-create`, `adr-research-draft` and `adr-review`. Fill every section; write `{TODO: ...}` instead of inventing content.

```markdown
# ADR {NNN}: {Title}

## Status
Proposed

## Date
{today's date, YYYY-MM-DD}

## Context

{Describe the current system state, what works, what doesn't, and what forces are driving the need for a decision.

Be specific:
- What is the current architecture? (e.g., monolith with module X handling Y)
- What problem or opportunity triggered this decision?
- What quality attributes are at stake? (performance, maintainability, scalability, security, operability)
- What constraints exist? (team size, timeline, budget, existing contracts, compliance)
- What is the cost of inaction?}

## Decision

We will {describe the chosen approach in one clear sentence}.

{Expand with implementation details:
- What changes structurally?
- What stays the same?
- What are the key implementation steps?
- What is the migration path from current state?}

## Consequences

### Positive
- {Concrete benefit with reasoning, e.g. "Independent deployment of module X, reduces release coordination from 3 teams to 1"}
- {Each benefit should answer: "positive for whom, and how much?"}

### Negative
- {Concrete cost with reasoning, e.g. "Introduces network boundary between X and Y, adds ~5ms latency per call and requires handling partial failures"}
- {Each negative should answer: "how bad is this, and can we mitigate it?"}

### Risks
- {Risk with likelihood and impact, e.g. "Team lacks RabbitMQ operational experience (likelihood: high, impact: medium), mitigate with training + managed service"}

## Trade-Off Analysis

### Quality Attribute Impact

| Quality attribute | Impact | Reasoning |
|---|---|---|
| **Performance** | Improves / Neutral / Degrades | {specific impact} |
| **Maintainability** | Improves / Neutral / Degrades | {specific impact} |
| **Scalability** | Improves / Neutral / Degrades | {specific impact} |
| **Testability** | Improves / Neutral / Degrades | {specific impact} |
| **Operability** | Improves / Neutral / Degrades | {specific impact} |
| **Security** | Improves / Neutral / Degrades | {specific impact} |
| **Team cognitive load** | Improves / Neutral / Degrades | {specific impact} |

Keep the Impact column to one of the three words, and put the detail in Reasoning.

### Evolutionary Architecture Considerations

- **Reversibility:** {Is this decision easy to reverse? What would reversal cost?}
- **Incremental adoption:** {Can this be adopted incrementally or is it all-or-nothing?}
- **Future optionality:** {What future options does this open? What does it close?}
- **Module boundaries:** {Does this respect or change module boundaries?}

## Alternatives Considered

### Alternative 1: Status Quo / Do Nothing
- **Description:** {What happens if we make no change}
- **Trade-offs:** {Why this is or isn't acceptable}
- **Why not chosen:** {Specific reason}

### Alternative 2: {Name}
- **Description:** {How this alternative works}
- **Trade-offs:** {Benefits and costs}
- **Why not chosen:** {Specific reason: never "it's worse", always explain the specific trade-off that made the chosen option preferable}

### Comparison Matrix

{For a technology choice, use the Technology Comparison Table below instead of this matrix.}

Aspects in the left column, options as columns. Every cell holds a concrete statement, not a symbol.

| Aspect | **Chosen: {Name}** | Status Quo | {Alternative} |
|---|---|---|---|
| **{Force 1}** | {how this option satisfies or fails it} | {value} | {value} |
| **{Force 2}** | {value} | {value} | {value} |
| **Migration effort** | {estimate} | None | {estimate} |
| **Team readiness** | {assessment} | Ready | {assessment} |
| **Reversibility** | {cost of reversal} | n/a | {cost of reversal} |

### Technology Comparison Table

{Include this section, in place of the Comparison Matrix, only when the decision selects a product, library, framework or service, for example a frontend framework, background processing library, messaging library, blob storage or database.}

Aspects in the left column, one column per technology. Put the chosen technology first and mark it in the header. Include every real option, and Status Quo when the team already runs something. Every cell holds a concrete value; use `code` for names, versions and settings, links for sources, and bold for the deciding factor.

| Aspect | **{Chosen}** (chosen) | {Option 2} | {Option 3} |
|---|---|---|---|
| **Programming model / fit** | {value} | {value} | {value} |
| **Cost (license + hosting)** | {value} | {value} | {value} |
| **Compatibility with our stack** | {value} | {value} | {value} |
| **Team familiarity** | High / Medium / Low | {level} | {level} |
| **Performance / scale** | {value or `{TODO: measure}`} | {value} | {value} |
| **Ecosystem and maintenance** | {last release, license, backing, [source](url)} | {value} | {value} |
| **Lock-in / exit cost** | {value} | {value} | {value} |
| **Verdict** | {why it wins, naming the deciding aspect} | {why not} | {why not} |

Swap aspects for ones that matter to this decision (for example consistency model and query capabilities for a database, or SSR and bundle size for a frontend framework), but keep team familiarity, cost and lock-in. Unknown cells hold `{TODO: ...}`, never a guess.

## References

- {Links to relevant docs, RFCs, prior ADRs, benchmarks, or PoCs}

## Follow-Up Tasks

- [ ] {Actionable next step 1}
- [ ] {Actionable next step 2}
```

---

## Rules

### Location and format
- If the project has an ADR directory (`docs/adr/`, `docs/architecture/decisions/`, `Docs/ArchitectureDecisionLog/`, or similar), save there and match its numbering, file naming and format (Markdown or AsciiDoc)
- If none exists, save to `docs/adr/ADR-{NNN}-{slugified-title}.md`, starting at `001`
- If the new ADR replaces an earlier one, add `Supersedes: ADR {NNN}` under Status and set the old ADR's status to `Superseded by ADR {NNN}`

### Trade-Off Analysis Rules (Critical)
- **Never present an option as purely positive or purely negative.** Every real architectural option has trade-offs. If you can't find downsides, you haven't thought hard enough.
- **Quantify when possible.** "Adds latency" is weak. "Adds ~5-15ms per inter-service call" is useful. "Increases complexity" is weak. "Requires team to learn and operate RabbitMQ" is useful.
- **Name who bears the cost.** A trade-off that affects the dev team differently than ops or end users should say so.
- **Evaluate reversibility.** Decisions that are hard to reverse (data model changes, public API contracts, infrastructure choices) need stronger justification than easily reversible ones.
- **Include "Status Quo / Do Nothing"** as the first alternative. This anchors the comparison and forces you to articulate the cost of inaction.

### General Rules
- Status starts as `Proposed` unless the user specifies otherwise
- Context must include specific architectural forces, not vague statements
- Compare at least three options: the chosen one plus at least two genuine alternatives (two options alone is too thin to show a real trade-off), and always list Status Quo / Do Nothing as the baseline. If the user names fewer, research and propose the missing alternatives and mark them `{TODO: confirm with team}`
- Every alternative must have a specific "Why not chosen", never generic dismissals
- Quality Attribute Impact table is mandatory: it forces systematic thinking
- Evolutionary Architecture section is mandatory: architecture decisions exist in time, not in isolation
- Do not invent data, benchmarks, or assessments; if unknown, write `{TODO: measure/research}`
- A technology choice (product, library, framework or service) requires the Technology Comparison Table with at least two options
- No emoji anywhere in the ADR. Tables carry words and concrete values; use bold, `code`, links and short lists for emphasis and structure
- In every comparison table, aspects go in the left column and options (technologies) across the top
- Write plain prose: no em dashes, no "not X, it's Y" constructions, no stacked buzzwords (leverage, seamless, robust, holistic), and digits for numbers ("3 options", not "three options")
