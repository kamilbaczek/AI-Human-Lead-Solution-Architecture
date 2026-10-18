# Human Lead Architect

A Claude Code plugin for taking an Architecture Decision Record (ADR) from a rough decision to a reviewed, evidence-backed document: create it, research what is missing, and challenge it before it is accepted.

## Installation

```bash
claude plugin marketplace add kamilbaczek/AI-Human-Lead-Solution-Architecture
claude plugin install human-lead-architect@ai-human-lead-solution-architecture
```

## Skills

Every skill first applies a significance gate (`shared/adr-significance.md`). A decision that is cosmetic, local, or reversible in one pull request gets no ADR.

### `/human-lead-architect:adr-create`

Writes an ADR for a decision you already have in mind, with trade-off analysis and consequences.

```
/human-lead-architect:adr-create extract payments module into a separate microservice
```

### `/human-lead-architect:adr-research-draft`

Researches first (web, codebase, industry patterns), then drafts an ADR backed by evidence. Use it when the decision depends on facts you do not have yet, such as comparing technologies.

```
/human-lead-architect:adr-research-draft MassTransit vs NServiceBus for saga orchestration
```

### `/human-lead-architect:adr-review`

Reviews an existing ADR before acceptance: judges whether the decision is sound (trade-offs, evolutionary fitness, reversibility), checks it against a checklist (core, plus REST API or database specific), ends with a verdict, then interviews you question by question to fill the gaps. To write a new ADR, use `adr-create`.

```
/human-lead-architect:adr-review docs/adr/0007-event-sourcing.md
```

### `/human-lead-architect:adr-supersede`

Marks an accepted ADR as superseded by a newer one, checks the new ADR explains why, and lists the references that need updating. History is kept: only the old ADR's Status line changes.

```
/human-lead-architect:adr-supersede docs/adr/ADR-002-rabbitmq.md replaced by ADR 006
```

### `/human-lead-architect:adr-index-check`

Read-only health check of the whole ADR log: numbering gaps and duplicates, broken supersede links, stale Proposed ADRs, missing fields and index entries.

```
/human-lead-architect:adr-index-check docs/adr
```

### `/human-lead-architect:adr-drift-check`

Read-only check of whether the code still follows an accepted ADR. Each claim is marked followed, drifted, partial or unverifiable, with the file as evidence.

```
/human-lead-architect:adr-drift-check docs/adr/ADR-003-module-isolation.md
```

## Agents

### `adr-reviewer`

A read-only subagent that reviews an ADR in its own context window and returns a verdict with prioritized feedback. It runs the review from `adr-review` without the interview, and it cannot edit files. Ask Claude to use it, for example: "Use the adr-reviewer agent on docs/adr/0007-event-sourcing.md".

## Shared files

The skills read these from the plugin's `shared/` folder: `adr-template.md`, `adr-significance.md`, `review-output.md`, `self-review.md`, `checklist.md`, `checklist-rest-api.md`, `checklist-db.md`.

## Requirements

- Claude Code CLI

## License

MIT
