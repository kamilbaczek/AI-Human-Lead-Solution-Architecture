# ADR Review Checklist

Use this checklist to evaluate completeness and quality of an ADR.
For each item, assess: ✅ Present & sufficient | ⚠️ Weak / vague | ❌ Missing

---

## 1. Context
- [ ] Problem is clearly stated: not just symptoms, but root cause
- [ ] Business or technical driver is identified: "Why?" is answered (business rationale is explicit)
- [ ] Scope is defined (what is affected, what is not)
- [ ] Current state / baseline is described

## 2. Decision
- [ ] Decision is specific and actionable (not vague like "use a better approach")
- [ ] Who is making the decision is clear (team, architect, CTO?)
- [ ] Decision is scoped: applies to which systems/services/teams?

## 3. Consequences: Positive
- [ ] At least one concrete benefit is listed
- [ ] Benefits are specific, not generic marketing language

## 4. Consequences: Negative
- [ ] Trade-offs are honest and explicit
- [ ] Short-term vs long-term impacts are distinguished where relevant

## 5. Consequences: Risks
- [ ] Technical risks identified (e.g., data loss, downtime, performance regression)
- [ ] Organizational risks identified (e.g., team skill gaps, vendor dependency)
- [ ] Mitigation strategies are mentioned for high-severity risks

## 6. Cost Analysis (often missing)
- [ ] Licensing / infrastructure costs estimated
- [ ] Migration or implementation cost considered
- [ ] Ongoing operational cost addressed
- [ ] Cost of NOT making this decision addressed

## 7. Security & Compliance
- [ ] Security implications evaluated
- [ ] Data privacy / compliance requirements addressed (GDPR, SOC2, etc.)
- [ ] Attack surface changes noted

## 8. Operational Impact
- [ ] Deployment complexity assessed
- [ ] Monitoring / observability requirements defined
- [ ] Incident response / debugging impact considered
- [ ] Runbook or operational docs planned

## 9. Team & Skills
- [ ] Team has (or can acquire) necessary skills
- [ ] Knowledge transfer / onboarding plan exists
- [ ] Bus factor impact assessed

## 10. Scalability & Performance
- [ ] Load/scale assumptions stated
- [ ] Performance benchmarks or SLAs referenced
- [ ] Known bottlenecks acknowledged

## 11. Vendor & Lock-in
- [ ] Vendor lock-in risk assessed
- [ ] Exit strategy or migration path considered
- [ ] Open-source / proprietary tradeoffs noted

## 0. Significance
- [ ] The decision is architecturally significant and costly to reverse (see `adr-significance.md`), not a convention, cosmetic choice or small refactoring

## 12. Alternatives Considered
- [ ] At least 2 alternatives evaluated (not just "do nothing")
- [ ] Each alternative has a clear reason for rejection
- [ ] If the decision selects a technology (framework, library, storage, database, messaging), a comparison table with concrete values per option and criterion is present
- [ ] Status quo / "do nothing" option considered

## 13. References
- [ ] Links to relevant RFCs, tickets, discussions, or prior ADRs
- [ ] Related ADRs cross-referenced

## 14. Status & Ownership
- [ ] Status is set (Proposed / Accepted / etc.)
- [ ] Author and date are recorded
- [ ] Review / expiry date set if time-sensitive
