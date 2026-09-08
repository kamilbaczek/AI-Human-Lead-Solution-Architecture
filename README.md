# AI Agent Solution Architect Skills

A personal Claude Code plugin marketplace of skills for AI-assisted solution architecture work: ADR authoring, ADR review, ADR research, and defining architectural fitness functions.

## Install

Add the marketplace and install the plugin:

```bash
claude plugin marketplace add kamilbaczek/claude-code-skills
claude plugin install ai-agent-solution-architect@ai-agent-solution-architect-skills
```

## Plugins

### ai-agent-solution-architect

A toolkit for AI-assisted solution architecture work: create, research, and review Architecture Decision Records, and define concrete, executable fitness functions for the architectural characteristics behind them.

| Skill | Purpose |
|---|---|
| `adr-create` | Create a production-ready ADR with deep trade-off analysis from a decision topic or free-text input |
| `adr-research-draft` | Research-first ADR drafting — web research + codebase analysis before drafting, with evidence-backed trade-offs |
| `adr-architecture-review` | Deep architectural review of an existing ADR — trade-off completeness, evolutionary fitness, decision reversibility |
| `adr-review` | Interactive ADR review/draft against a checklist (core + REST API/DB-specific), survey-style gap filling |
| `fitness-functions` | Define concrete, executable fitness functions for a decision or architectural characteristic — what to measure, how, thresholds, where it runs |

## Project structure

```
claude-code-skills/
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
        fitness-functions/
  docs/
    specs/            # design docs
```

## License

MIT
