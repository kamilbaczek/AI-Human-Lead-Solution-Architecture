# ADR 007: Adopt Kafka for order events

## Status
Proposed

## Date
2026-09-01

## Context
Our order service publishes events to downstream services through direct HTTP calls. Releases of
the notification service regularly break order processing.

## Decision
We will publish all order events to Apache Kafka and have downstream services consume them.

## Consequences

### Positive
- Decouples order processing from downstream availability.
- Industry standard, highly scalable, great ecosystem.
- Replayable event log.
