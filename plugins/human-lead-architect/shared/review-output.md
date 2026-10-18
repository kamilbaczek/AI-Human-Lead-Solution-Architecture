# Review output rules

Shared by `adr-review` and the `adr-reviewer` agent.

## Severity

- **BLOCKING**: the ADR has a fundamental flaw (missing trade-offs, contradicts prior decisions, decision is ambiguous)
- **REQUIRED**: the ADR is incomplete but the direction is sound (missing consequences, weak alternatives)
- **SUGGESTED**: the ADR is acceptable but could be stronger (additional context, better quantification)

## Verdict mapping

Any BLOCKING item gives Revise or Reject. Only REQUIRED or SUGGESTED items give Revise or Accept. Reject only when the decision itself is unsound or fails the significance gate, not when the document is merely poorly written.

## Machine-readable last line

End every review with exactly one line in this form, after the human-readable report, so scripts and CI can parse it:

```
RESULT: verdict=Accept|Revise|Reject blocking=N required=N suggested=N
```

When the significance gate rejects the ADR, still print the line with `verdict=Reject blocking=0 required=0 suggested=0`.

