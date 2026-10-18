# ADR 026: Use Hangfire for background jobs

## Status
Proposed

## Date
2026-09-20

## Context
The order service needs retries and scheduled jobs. The team of five has run Hangfire before and
uses SQL Server already.

## Decision
We will use Hangfire with SQL Server storage for background processing.

## Consequences

### Positive
- Built-in dashboard and retries.

### Negative
- Jobs share the application database, adding load.

### Risks
- Job table growth needs cleanup (likelihood: medium, impact: low).

## Alternatives Considered

### Alternative 1: Quartz.NET
- **Why not chosen:** More configuration, less familiar.

## References
- Hangfire documentation
