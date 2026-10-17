# ADR 015: Use a transactional outbox for order events

## Status
Proposed

## Date
2026-09-10

## Context
The order service writes to PostgreSQL and then publishes `OrderPlaced` to RabbitMQ. Over the last
quarter 11 orders were saved without the event being published (process crash between the two
steps), which caused customers to miss confirmation emails. The team of 6 already operates
PostgreSQL and RabbitMQ and has no appetite for new infrastructure. Orders are placed at roughly
20/s at peak; the SLA for confirmation email is 60 seconds. The decision is limited to the order
service.

## Decision
We will write events to an `outbox` table in the same transaction as the order and publish them
with a background relay that polls every second. The relay is owned by the order team.

## Consequences

### Positive
- Removes the lost-event failure mode entirely; events are committed atomically with the order.
  Benefits the support team (fewer manual re-sends, currently ~4 hours/month).
- No new infrastructure.

### Negative
- Event delivery is delayed by up to ~1 second plus relay time; acceptable against the 60 s SLA.
- Delivery becomes at-least-once, so consumers must be idempotent. This costs the notification
  and billing teams roughly one sprint of work.
- The outbox table adds write load (~20 rows/s at peak) and needs a cleanup job.

### Risks
- Relay stalls silently (likelihood: medium, impact: high). Mitigation: alert when the oldest
  unpublished row is older than 30 seconds.
- Table bloat if cleanup fails (likelihood: low, impact: medium). Mitigation: partition by day.

### Costs
- About 5 engineer-days to build, 1 sprint for consumer idempotency. No licensing cost. Cost of
  doing nothing: ~4 hours/month of manual support work and recurring customer-facing incidents.

### Security
- Outbox rows contain order data already stored in the same database; no new exposure.

## Reversibility
Easy. The relay can be disabled and the publish call restored in one release; the outbox table can
be dropped afterwards.

## Alternatives Considered

### Alternative 1: Status quo (publish after commit)
Cheapest, but the 11 lost events last quarter show the failure rate is not acceptable.

### Alternative 2: Change Data Capture with Debezium
Lower latency and no polling, but requires running Kafka Connect, which the team has never
operated. Rejected for operational burden at our scale.

### Alternative 3: Two-phase commit (distributed transaction) across PostgreSQL and RabbitMQ
RabbitMQ does not support XA transactions, so this is not available without changing the broker.

## References
- ADR 009: Choose RabbitMQ as the message broker
- Incident INC-2041, INC-2077
