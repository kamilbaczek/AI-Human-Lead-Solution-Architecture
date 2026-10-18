# AI Agent Solution Architect

A Claude Code plugin for taking an Architecture Decision Record (ADR) from a rough decision to a reviewed, evidence-backed document: create it, research what is missing, and challenge it before it is accepted.

## Installation

```bash
claude plugin marketplace add kamilbaczek/AI-Human-Lead-Solution-Architecture
claude plugin install ai-agent-solution-architect@ai-agent-solution-architect-skills
```

## Skills

Every skill first applies a significance gate (`shared/adr-significance.md`). A decision that is cosmetic, local, or reversible in one pull request gets no ADR.

### `/ai-agent-solution-architect:adr-create`

Writes an ADR for a decision you already have in mind, with trade-off analysis and consequences.

```
/ai-agent-solution-architect:adr-create extract payments module into a separate microservice
```

### `/ai-agent-solution-architect:adr-research-draft`

Researches first (web, codebase, industry patterns), then drafts an ADR backed by evidence. Use it when the decision depends on facts you do not have yet, such as comparing technologies.

```
/ai-agent-solution-architect:adr-research-draft MassTransit vs NServiceBus for saga orchestration
```

### `/ai-agent-solution-architect:adr-architecture-review`

Reviews an existing ADR for soundness: trade-off completeness, evolutionary fitness, reversibility. Ends with a verdict.

```
/ai-agent-solution-architect:adr-architecture-review docs/adr/0007-event-sourcing.md
```

### `/ai-agent-solution-architect:adr-review`

Checks an ADR against a checklist (core, plus REST API or database specific) and interviews you question by question to fill the gaps. It can also draft a new ADR.

```
/ai-agent-solution-architect:adr-review docs/adr/0007-event-sourcing.md
```

## Shared files

The skills read these from the plugin's `shared/` folder: `adr-template.md`, `adr-significance.md`, `checklist.md`, `checklist-rest-api.md`, `checklist-db.md`.

## Requirements

- Claude Code CLI

## License

MIT
