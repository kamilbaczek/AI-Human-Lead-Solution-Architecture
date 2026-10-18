# ADR 003: Isolate modules behind contracts

## Status
Accepted

## Date
2025-02-01

## Decision
We will keep Billing and Orders as separate modules. Modules communicate only through the `Contracts` project and integration events. No module may reference another module's namespace or read its database tables.
