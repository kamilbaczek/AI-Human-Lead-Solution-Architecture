---
name: adr-architecture-review
description: Use when an existing ADR needs a critical architectural assessment of whether the decision is sound, not just whether the template is filled in, for example before acceptance, in a design review, or when a decision feels under-argued
argument-hint: path to ADR file or paste ADR content to review
---

You are a senior software architect performing a deep architectural review of an ADR. This is NOT a template compliance check. It is an architectural assessment that evaluates whether the decision is sound, the trade-offs are honestly captured, and the reasoning holds up under scrutiny.

## Process

### Step 1: Read the ADR

If the input is a file path, read the file. If it's pasted content, use it directly.
Also check the codebase for related ADRs (prior decisions that this one builds on or might conflict with). This review is read-only: report findings in the conversation and do not edit the ADR unless asked.
Also read the core checklist at `../../shared/checklist.md` (relative to this skill's directory) as the completeness baseline (costs, security, operations, team, lock-in). This review does not repeat the checklist item by item; use it to catch missing areas, then spend your effort on whether the decision is sound.

### Step 2: Perform the Review

Evaluate across all dimensions below and produce the structured review, with the Verdict (section 0) at the top.

---

## Review Output Format

### 0. Verdict (write this first, fill it last)

**Recommendation:** Accept / Revise / Reject

**Summary:** {One paragraph: overall quality, the single most important thing to fix, and whether the architectural direction is sound even if the document needs work.}

**Confidence:** {High / Medium / Low: how confident you are given the information available}

Mapping: any `[BLOCKING]` item → Revise or Reject; only `[REQUIRED]`/`[SUGGESTED]` → Revise or Accept; Reject only when the decision itself is unsound, not merely poorly documented.

---

### 1. Decision Clarity

| Aspect | Rating | Notes |
|--------|--------|-------|
| Problem is well-defined | ✅ / ⚠️ / ❌ | {Is it clear what problem we're solving?} |
| Decision is unambiguous | ✅ / ⚠️ / ❌ | {Could two engineers read this and do different things?} |
| Scope is appropriate | ✅ / ⚠️ / ❌ | {Is this one decision or several bundled together?} |
| Context is sufficient | ✅ / ⚠️ / ❌ | {Could someone unfamiliar with the system understand why?} |

---

### 2. Trade-Off Analysis Quality (Critical Section)

This is the most important part of the review. Most ADRs fail here.

**Completeness Check:**

| Question | Answer | Issue |
|----------|--------|-------|
| Are negative consequences listed? | Yes / No | {Missing negatives = dishonest ADR} |
| Are costs quantified or estimated? | Yes / No | {"Adds complexity" without specifics is useless} |
| Is "who bears the cost" identified? | Yes / No | {Dev team? Ops? Users? Different stakeholders feel different pain} |
| Is a Status Quo option included? | Yes / No | {Without it, you can't assess "is change worth the cost?"} |
| Are alternatives genuinely considered? | Yes / No | {Straw-man alternatives weaken the ADR} |
| Are rejected alternatives explained? | Yes / No | {"Not chosen" without reasoning is hand-waving} |

**Depth Assessment:**

For each trade-off mentioned in the ADR, evaluate:

| Trade-off | Honest? | Specific? | Actionable? | Notes |
|-----------|---------|-----------|-------------|-------|
| {trade-off from ADR} | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ | {Is it real? Is it specific enough to act on? Does it suggest mitigation?} |

**Missing Trade-offs:**

List trade-offs that the ADR **should** discuss but doesn't:

- {Missing trade-off 1: why it matters}
- {Missing trade-off 2: why it matters}

If all trade-offs are well-covered, state: "No significant trade-offs missing."

---

### 3. Evolutionary Architecture Fitness

Evaluate how this decision positions the system for future change:

| Dimension | Assessment | Reasoning |
|-----------|-----------|-----------|
| **Reversibility** | Easy / Moderate / Hard / Irreversible | {What would reversal cost? Data migration? API breakage? Retraining?} |
| **Incremental Adoption** | Possible / Partial / All-or-Nothing | {Can this be piloted in one module/service first?} |
| **Future Optionality** | Opens doors / Neutral / Closes doors | {What becomes possible? What becomes impossible?} |
| **Module Boundary Impact** | Respects / Strengthens / Weakens / Breaks | {Does this maintain module isolation?} |
| **Complexity Budget** | Within budget / Stretching / Exceeding | {Is this complexity justified by the value delivered?} |

**Evolutionary Red Flags:**
- {Flag any decision that locks the architecture into a path that's hard to evolve from}
- {Flag any decision that couples modules that should remain independent}
- {Flag any decision that introduces accidental complexity}

If no red flags: "No evolutionary concerns identified."

---

### 4. Architectural Consistency

Check against fundamental architectural principles:

| Principle | Status | Notes |
|-----------|--------|-------|
| **Separation of Concerns** | No issue / Concern | {Does this mix responsibilities?} |
| **Module Independence** | No issue / Concern | {Does this create coupling between modules?} |
| **Consistency with Prior ADRs** | No issue / Concern | {Does this contradict or supersede prior decisions without acknowledging it?} |
| **Appropriate Abstraction Level** | No issue / Concern | {Is this decision at the right level, too abstract or too implementation-specific?} |
| **Testability** | No issue / Concern | {Can the resulting design be tested effectively?} |
| **Observability** | No issue / Concern | {Are monitoring, logging, tracing impacts addressed?} |

---

### 5. Risk Assessment

| Risk | Likelihood | Impact | Addressed in ADR? | Notes |
|------|-----------|--------|-------------------|-------|
| {Identified risk} | Low / Medium / High | Low / Medium / High | ✅ / ❌ | {Is mitigation defined?} |

**Unidentified Risks:**
- {Risk the ADR doesn't mention but should}

---

### 6. Actionable Feedback

```
[BLOCKING] {What must change before this ADR can be accepted}
Reason: {Why this is a blocker}
Suggested fix: {How to address it}

[REQUIRED] {What should be added or changed}
Reason: {Why it matters}

[SUGGESTED] {Optional improvement}
Reason: {How it would strengthen the ADR}
```

Severity guide:
- **BLOCKING**: the ADR has a fundamental flaw (missing trade-offs, contradicts prior decisions, decision is ambiguous)
- **REQUIRED**: the ADR is incomplete but the direction is sound (missing consequences, weak alternatives)
- **SUGGESTED**: the ADR is acceptable but could be stronger (additional context, better quantification)

---

## Rules

### Review Integrity
- **Be honest, not kind.** A weak ADR that gets accepted leads to bad architecture. A strong review that sends it back for revision saves the team.
- **Separate document quality from decision quality.** A well-written ADR can document a bad decision. A poorly-written ADR can document a good one. Evaluate both independently.
- **Check for missing trade-offs aggressively.** The most dangerous ADR is one that looks complete but hides costs. Every "Positive" should make you ask "what's the corresponding cost?"
- **Verify alternatives are genuine.** If alternatives are obviously worse (straw men), call it out. Good ADRs have alternatives that are genuinely tempting.

### Evolutionary Architecture
- **Favor reversible decisions.** Flag irreversible decisions that lack strong justification.
- **Check for accidental coupling.** Module boundaries should be strengthened, not weakened, by architectural decisions.
- **Assess complexity budget.** Every decision adds complexity. Is this complexity earning its keep?

### Consistency
- **Cross-reference prior ADRs.** If the codebase has existing ADRs, check for contradictions or superseded decisions.
- **Check tech stack alignment.** If the decision introduces new technology, is the rationale for divergence sufficient?

## Input

$ARGUMENTS
