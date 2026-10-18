# ADR 023: Use Azure Blob Storage for customer documents

## Status
Proposed

## Date
2026-09-12

## Context
Customers upload contracts and invoices, currently stored as varbinary columns in SQL Server. The
database has grown to 800 GB and backups take six hours. We run on Azure and the team has used
Azure services before.

## Decision
We will store customer documents in Azure Blob Storage and keep only the blob URI and metadata in
SQL Server.

## Consequences

### Positive
- Smaller database and faster backups.
- Cheap storage with built-in redundancy.

### Negative
- Documents and metadata can drift out of sync, so we need a cleanup job.

### Risks
- Misconfigured access policy could expose documents (likelihood: low, impact: high).

## Alternatives Considered

### Alternative 1: Status Quo / Do Nothing
- **Why not chosen:** The database keeps growing and backups keep getting slower.

### Alternative 2: Amazon S3
- **Why not chosen:** We run on Azure.

### Alternative 3: Self-hosted MinIO
- **Why not chosen:** We would have to operate it.

## References
- Azure documentation
