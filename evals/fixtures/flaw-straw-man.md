# ADR 012: Move session storage to Redis

## Status
Proposed

## Date
2026-09-02

## Context
Session data is stored in the application database and adds ~40% of read load on the primary.
The team runs on Azure and has two engineers with Redis experience.

## Decision
We will store sessions in Azure Cache for Redis with a 30 minute sliding expiry.

## Consequences

### Positive
- Removes ~40% of read load from the primary database.
- Sub-millisecond session lookups.

### Negative
- Adds one more managed service to operate and pay for.

### Risks
- Redis outage logs every user out (likelihood: low, impact: high).

## Alternatives Considered

### Alternative 1: Do nothing
Keep sessions in the database. This is bad.

### Alternative 2: Store sessions in files on each web server
This would never work and nobody would seriously consider it.

### Alternative 3: Write our own session store in assembly
Far too slow to build and much worse than Redis.
