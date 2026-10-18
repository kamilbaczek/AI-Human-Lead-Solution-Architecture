# ADR 031: Use switch expressions instead of switch statements

## Status
Proposed

## Date
2026-09-15

## Context
Some developers write classic `switch` statements and others write `switch` expressions. Code
reviews often contain comments about which to use.

## Decision
We will use `switch` expressions wherever a value is returned and classic `switch` statements
otherwise.

## Consequences

### Positive
- Consistent code style.
- Less boilerplate.

### Negative
- Developers need to learn the syntax.

## Alternatives Considered

### Alternative 1: Status Quo / Do Nothing
- **Why not chosen:** Review comments continue.

### Alternative 2: Always use classic switch statements
- **Why not chosen:** More verbose.

## References
- C# language reference
