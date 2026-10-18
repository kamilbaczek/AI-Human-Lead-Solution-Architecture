# ADR 017: Adopt GraphQL for the public API

## Status
Proposed

## Date
2026-09-08

## Context
Mobile clients call several REST endpoints per screen and over-fetch data. Three client teams ask
for fewer round trips. The API team has two engineers and no GraphQL experience.

## Decision
We will replace the public REST API with a GraphQL API in one release.

## Consequences

### Positive
- Clients fetch exactly the data they need in one request.
- Strongly typed schema improves developer experience.
- Faster mobile screens.

### Negative
- None identified.

### Risks
- None identified.

## Alternatives Considered

### Alternative 1: Status Quo / Do Nothing
- **Why not chosen:** Clients keep over-fetching.

### Alternative 2: Add a backend-for-frontend layer
- **Why not chosen:** GraphQL is more flexible.

## References
- graphql.org
