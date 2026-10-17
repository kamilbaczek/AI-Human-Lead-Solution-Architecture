# ADR Checklist: REST API Design

Use when the ADR involves introducing or changing a REST API.
For each item, assess: ✅ Present & sufficient | ⚠️ Weak / vague | ❌ Missing

---

## Authentication & Authorization
- [ ] Authentication mechanism chosen and justified (e.g., OAuth2 client credentials for M2M, JWT for user-facing)
- [ ] Authorization model defined (RBAC, scopes, API keys?)
- [ ] Token expiry, rotation, and revocation strategy addressed

## Rate Limiting & Caching
- [ ] Rate limiting strategy defined (per client, per endpoint, global?)
- [ ] Caching strategy addressed (HTTP cache headers, CDN, in-process, Redis?)
- [ ] Cache invalidation approach considered

## API Design Maturity
- [ ] Richardson Maturity Level targeted and justified (L0 to L3)
  - L1: Resources (nouns, not verbs)
  - L2: HTTP verbs + status codes used correctly
  - L3: HATEOAS, responses include hypermedia links for discoverability
- [ ] If L3: link relations defined and client navigation documented

## Compression & Transport
- [ ] Compression considered (gzip / Brotli) for response bodies, justified or explicitly skipped
- [ ] Content-Encoding negotiation addressed (`Accept-Encoding` / `Content-Encoding`)
- [ ] Payload size expectations stated (small JSON vs. large blobs, compression impact differs)

## API Gateway
- [ ] Decision on API Gateway justified (needed vs. overkill for current scale?)
- [ ] Gateway responsibilities defined if used (auth, rate limiting, routing, TLS termination)

## Scalability & Reliability
- [ ] Availability target stated (SLA: e.g., 99.9%)
- [ ] Expected number of instances / replicas stated
- [ ] Horizontal scaling approach defined (stateless design, session handling)
- [ ] Auto-scaling triggers and limits considered
- [ ] Replication model addressed (active-active vs. active-passive)
- [ ] Failover strategy defined (automatic vs. manual, RTO/RPO targets)
- [ ] Impact of 5-minute outage assessed (revenue loss, user impact, data inconsistency)
- [ ] Impact of 1-hour outage assessed (escalation path, business continuity, SLA breach)
- [ ] Health checks and circuit breakers considered

## Validation
- [ ] Format validation defined: field types, lengths, patterns (done at HTTP/serialization layer)
- [ ] Request validation defined: required fields, allowed values, structural correctness (done before business logic)
- [ ] Application-level validation defined: checks requiring external state (DB lookup, API call, e.g. "does this user exist?")
- [ ] Business logic validation defined: domain rules (e.g. "can't cancel a completed order"), separated from format/request checks
- [ ] Validation layer placement documented: where each layer lives (middleware, service, domain model)
- [ ] Validation error responses consistent and informative (field-level errors, not just 400 Bad Request)

## Permissions
- [ ] Permission model defined: who can do what (per role, per resource, per action)
- [ ] Permissions enforced at correct layer (not just UI, verified server-side)
- [ ] Resource ownership rules defined (can user A access user B's data?)
- [ ] Elevation / admin override paths documented if they exist

## Error Responses
- [ ] Error format standardized: RFC 9457 Problem Details (`application/problem+json`) considered or alternative justified
- [ ] Error responses include: `type`, `title`, `status`, `detail`, `instance` (or equivalent fields)
- [ ] Validation errors return field-level detail (not just a generic message)
- [ ] Internal errors do not leak stack traces or sensitive data to clients
- [ ] Error catalog or list of expected error codes documented

## Testing
- [ ] API testing approach defined (Postman collections, `.http` files, contract tests, integration tests)
- [ ] Test coverage expectations stated (happy path, validation errors, auth failures, edge cases)
- [ ] Tests are runnable in CI (not just manual Postman clicks)
- [ ] Contract testing considered for consumer-producer API contracts (e.g., Pact)

## Documentation
- [ ] API documented (Swagger / OpenAPI, Scalar, or custom docs)
- [ ] Documentation kept in sync with implementation (generated vs. manual)
- [ ] Authentication flows and error responses documented
