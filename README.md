# AI Agent Solution Architect Skills

A personal Claude Code plugin marketplace of skills for AI-assisted solution architecture work: ADR authoring, ADR review, and ADR research.

## Install

Add the marketplace and install the plugin:

```bash
claude plugin marketplace add kamilbaczek/AI-Human-Lead-Solution-Architecture
claude plugin install ai-agent-solution-architect@ai-agent-solution-architect-skills
```

## Plugins

### ai-agent-solution-architect

A toolkit for AI-assisted solution architecture work: create, research, and review Architecture Decision Records.

| Skill | Purpose |
|---|---|
| `adr-create` | Create a production-ready ADR with deep trade-off analysis from a decision topic or free-text input |
| `adr-research-draft` | Research-first ADR drafting — web research + codebase analysis before drafting, with evidence-backed trade-offs |
| `adr-architecture-review` | Deep architectural review of an existing ADR — trade-off completeness, evolutionary fitness, decision reversibility |
| `adr-review` | Interactive ADR review/draft against a checklist (core + REST API/DB-specific), survey-style gap filling |

## CI

`.github/workflows/plugin-ci.yml` runs on every push/PR to `main`:

- **validate** — `claude plugin validate . --strict` on every push/PR, so a broken manifest or skill never lands on `main`.
- **tag-release** — on push to `main`, if `plugin.json`'s `version` was bumped, creates and pushes the `ai-agent-solution-architect--vX.Y.Z` release tag via `claude plugin tag`. Gives a stable, pinned `ref`/commit `sha` to reference when submitting to a marketplace.

## Submitting to the official Claude Code plugin directory

Anthropic's `claude-plugins-official` marketplace has no automated/PR-based submission path — external plugins are reviewed via the [plugin directory submission form](https://clau.de/plugin-directory-submission). Point it at this repo, path `plugins/ai-agent-solution-architect`, and a release tag from CI above for the `ref`/`sha`.

## Project structure

```
AI-Human-Lead-Solution-Architecture/
  .claude-plugin/
    marketplace.json
  plugins/
    ai-agent-solution-architect/
      .claude-plugin/
        plugin.json
      skills/
        adr-create/
        adr-research-draft/
        adr-architecture-review/
        adr-review/
```

## License

MIT
