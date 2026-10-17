# ADR 021: Replace customer IDs with GUIDs across all services

## Status
Accepted

## Date
2026-09-05

## Context
Integer customer IDs leak customer counts and are guessable in URLs. Seven services and two
partner integrations reference them.

## Decision
We will migrate every table, API contract and event payload from integer customer IDs to GUIDs in
a single release, and drop the integer columns afterwards.

## Consequences

### Positive
- IDs are no longer guessable.
- Consistent identifiers across services.

### Negative
- Some migration work is needed.

## Alternatives Considered

### Alternative 1: Do nothing
Integer IDs remain guessable.

### Alternative 2: Expose opaque public IDs only at the API edge
Keeps internal integer keys and maps them at the gateway. Smaller change, but adds a mapping layer.
