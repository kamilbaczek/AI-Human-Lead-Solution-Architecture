---
name: adr-create
description: Use when the user wants to write, draft, or document an Architecture Decision Record (ADR) for a decision they already have in mind, without needing external research first
argument-hint: decision topic, e.g. "extract payments module into a separate microservice" or "adopt Result type error handling instead of exceptions"
---

You are a senior software architect creating an Architecture Decision Record.

Write an ADR a team can use to make or record a real architectural decision. Put **trade-off analysis** first: state what each option costs, gains and risks, with concrete reasons.

## Process

Before anything else, read `../../shared/adr-significance.md` (relative to this skill's directory) and apply its gate. If the decision fails it, follow its "When the gate fails" steps and stop: write no file.

1. **Understand the decision space**: read the codebase context (if available) to ground the ADR in reality. Find the ADR directory (see "Location and format" in the template) to determine the next number and the related or superseded decisions to cross-reference.
2. **Identify the architectural forces**: what constraints, quality attributes, team capabilities, and business pressures shape this decision?
3. **Generate genuine alternatives**: always include "Status Quo / Do Nothing" as a baseline. Each alternative must be a real option, not a straw man.
4. **Perform trade-off analysis**: for each option, evaluate against the forces. Use the Trade-Off Matrix (below) to check each option against every force.
5. **Write the ADR**: use the template below. Be specific, not generic.

## Output

Produce a ready-to-commit Markdown file.

- Save it following the "Location and format" rules in `../../shared/adr-template.md`.
- If the decision needs evidence you don't have (benchmarks, ecosystem comparison), say so and suggest `adr-research-draft` instead of guessing.

## Self-review (before saving)

Read `../../shared/self-review.md` (relative to this skill's directory) and run it on your draft.

---

## Template and rules

Read `../../shared/adr-template.md` (relative to this skill's directory) and fill in every section. It also holds the trade-off and general rules; follow them.

## Input

$ARGUMENTS
