# ADR 020: Build the order workflow on an event-sourced, actor-based runtime

## Status
Proposed

## Date
2026-09-10

## Context
The order workflow has three steps and about 200 orders a day. Release is in six weeks. The team
of three has only built CRUD applications on SQL Server.

## Decision
We will implement the order workflow with event sourcing and an actor framework hosted on
Kubernetes.

## Consequences

### Positive
- Full audit trail of every order.
- Scales to millions of orders.

### Negative
- Adds new infrastructure.

### Risks
- Learning curve.

## Alternatives Considered

### Alternative 1: Status Quo / Do Nothing
- **Why not chosen:** No workflow engine exists today.

### Alternative 2: Table-driven state machine in the existing SQL database
- **Why not chosen:** Less modern.

## References
- Blog post on event sourcing
