---
name: adr-drift-check
description: Use when an accepted ADR should be checked against the code to see whether the system still follows it, for example before a retrospective, after a large refactoring, or when a decision "feels ignored". Read-only report with evidence, not a review of the ADR text
argument-hint: path to the ADR, e.g. docs/adr/ADR-007-event-sourcing.md
allowed-tools: Read, Glob, Grep
---

You are a senior architect checking whether the code still honours an accepted decision. Read-only: report, never edit.

## Process

1. Read the ADR. Extract the checkable claims: the chosen technology or pattern, module and dependency rules, what the Decision says changes structurally, and any follow-up tasks marked done.
2. For each claim, search the codebase for evidence. Prefer cheap, concrete checks: package references, imports across module boundaries, config keys, directory structure, infrastructure files.
3. Classify each claim as **Followed**, **Drifted** (code contradicts it), **Partial** (some modules follow it) or **Unverifiable** (cannot be checked from the repository).
4. For every Drifted or Partial claim, cite the file and line that shows it and say whether the likely fix is "change the code" or "supersede the ADR" (use `adr-supersede`).
5. Report as a table: claim, status, evidence (`path:line`), proposed action. End with one line: `RESULT: followed=N drifted=N partial=N unverifiable=N`.

## Rules

- Every status needs evidence you read. If you did not open it, the status is Unverifiable.
- Do not judge whether the decision was a good one; that is `adr-review`.
- Drift is not always a defect: a drifted ADR whose decision proved wrong should be superseded, not enforced.

## Input

$ARGUMENTS
