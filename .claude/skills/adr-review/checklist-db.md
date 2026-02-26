# ADR Checklist — Database Design

Use when the ADR involves choosing, changing, or significantly modifying a database or data store.
For each item, assess: ✅ Present & sufficient | ⚠️ Weak / vague | ❌ Missing

---

## Data Model
- [ ] Schema or data model outlined (tables, collections, key structure)
- [ ] Data types and constraints considered (nullability, uniqueness, enums)
- [ ] Relationships defined (foreign keys, references, denormalization decisions)

## Database Choice
- [ ] Relational vs. non-relational choice justified for the use case
- [ ] Specific engine chosen and justified (PostgreSQL, MySQL, MongoDB, Redis, etc.)
- [ ] Managed vs. self-hosted decision addressed

## Migrations
- [ ] Migration strategy defined (how schema changes are applied)
- [ ] Rollback plan for failed migrations exists
- [ ] Zero-downtime migration approach considered if required

## Scalability & Performance
- [ ] Expected data volume and growth rate stated
- [ ] Read/write ratio considered (read-heavy → replicas, write-heavy → sharding/partitioning)
- [ ] Indexing strategy defined for key query patterns
- [ ] Query performance benchmarks or SLA targets referenced
- [ ] Connection pooling strategy addressed

## Reliability & Availability
- [ ] Availability target stated (SLA — e.g., 99.9%)
- [ ] Replication model defined (primary-replica, multi-primary, etc.)
- [ ] Failover strategy defined (automatic vs. manual, RTO/RPO targets)
- [ ] Backup strategy defined (frequency, retention, restore tested?)
- [ ] Impact of 5-minute DB outage assessed (degraded mode, queuing, data loss risk)
- [ ] Impact of 1-hour DB outage assessed (business continuity, SLA breach, recovery path)

## Security
- [ ] Access control defined (least-privilege roles per service/user)
- [ ] Encryption at rest and in transit addressed
- [ ] Sensitive data identified (PII, secrets) and handling documented
- [ ] Audit logging considered for sensitive operations

## Operational
- [ ] Monitoring defined (slow queries, connection saturation, disk usage)
- [ ] Alerting thresholds set
- [ ] On-call runbook planned for common failure scenarios
