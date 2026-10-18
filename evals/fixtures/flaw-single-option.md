# ADR 011: Use RabbitMQ for inter-service messaging

## Status
Proposed

## Date
2026-09-03

## Context
We are splitting the inventory module out of the monolith and need asynchronous messaging between
the two. The team wants messages delivered reliably when a consumer is briefly down.

## Decision
We will use RabbitMQ with durable queues for all messages between the monolith and the inventory
service.

## Consequences

### Positive
- Reliable delivery with durable queues and acknowledgements.
- Mature .NET client libraries.

### Negative
- We have to run and monitor a broker.

### Risks
- Broker outage stops messaging.

## Alternatives Considered
RabbitMQ is the only option that fits our requirements, so no other options were evaluated.

## References
- RabbitMQ documentation
