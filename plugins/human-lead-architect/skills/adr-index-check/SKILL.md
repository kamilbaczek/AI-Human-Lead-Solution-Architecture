---
name: adr-index-check
description: Use when the ADR log needs a health check, for example numbering gaps, duplicate numbers, broken supersede links, stale Proposed ADRs or a missing index. Read-only report across all ADRs, not a review of one ADR
argument-hint: "[path to ADR directory]; defaults to the project's ADR folder"
allowed-tools: Read, Glob, Grep
---

You are a senior architect auditing an ADR log as a whole. Read-only: report, never edit.

## Process

1. Find the ADR directory (`docs/adr/`, `docs/architecture/decisions/`, `Docs/ArchitectureDecisionLog/`, or `$ARGUMENTS`). Read the Status, Date and any `Supersedes` line of every ADR.
2. Check each of these and list every hit with the file name:
   - **Numbering**: gaps, duplicates, and file names that disagree with the number in the title.
   - **Supersede links**: `Superseded by ADR N` with no matching `Supersedes: ADR M` in ADR N (or the reverse), links to ADRs that do not exist, supersede cycles.
   - **Stale statuses**: `Proposed` for more than 30 days (compare the Date to today), `Accepted` ADRs older than 2 years that nothing references.
   - **Missing fields**: ADRs without Status, Date or an alternatives section.
   - **Index**: if the project keeps an index or README of ADRs, entries that are missing, wrong or point to a deleted file.
3. Report as a table: finding, ADR, why it matters, suggested fix. Group by severity: broken (links and numbering), stale, cosmetic.
4. End with one line: `RESULT: adrs=N broken=N stale=N cosmetic=N`.

If everything is consistent, say so in one sentence. Do not invent findings to look thorough.

## Input

$ARGUMENTS
