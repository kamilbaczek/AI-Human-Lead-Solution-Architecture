<h1 align="center">AI Human Lead Solution Architecture 🏛️</h1>

<p align="center">
  A personal Claude Code plugin marketplace of skills for AI-assisted solution architecture work:
  ADR authoring, ADR review, and ADR research.
</p>

<p align="center">
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude_Code-plugin_marketplace-D97757?logo=anthropic&logoColor=white">
  <img alt="Plugin version" src="https://img.shields.io/badge/ai--agent--solution--architect-1.1.0-blue">
  <img alt="Skills" src="https://img.shields.io/badge/skills-4-green">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-lightgrey">
</p>

<hr>

<p align="center">
  <a href="https://github.com/kamilbaczek/AI-Human-Lead-Solution-Architecture/actions/workflows/plugin-ci.yml"><img alt="Plugin CI" src="https://github.com/kamilbaczek/AI-Human-Lead-Solution-Architecture/actions/workflows/plugin-ci.yml/badge.svg?branch=main"></a>
</p>

## About

The architect leads, the AI does the legwork. This marketplace packages one plugin,
`ai-agent-solution-architect`, with skills that take an Architecture Decision Record from a rough
decision to a reviewed, evidence-backed document: create it, research what's missing, and
challenge it before it's accepted.

## Getting started

**Requirements:** [Claude Code](https://claude.com/claude-code) CLI and Node.js 18+

One command, straight from GitHub:

```bash
npx github:kamilbaczek/AI-Human-Lead-Solution-Architecture
```

It runs the two commands below for you. Or run them yourself:

```bash
claude plugin marketplace add kamilbaczek/AI-Human-Lead-Solution-Architecture
claude plugin install ai-agent-solution-architect@ai-agent-solution-architect-skills
```

## Skills 🧰

| Skill                     | What it does                                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `adr-create`              | Create a production-ready ADR with deep trade-off analysis from a decision topic or free-text input                  |
| `adr-research-draft`      | Research-first ADR drafting: web research and codebase analysis before drafting, with evidence-backed trade-offs     |
| `adr-architecture-review` | Deep architectural review of an existing ADR: trade-off completeness, evolutionary fitness, decision reversibility   |
| `adr-review`              | Interactive ADR review/draft against a checklist (core + REST API/DB-specific), survey-style gap filling             |

## CI

[`.github/workflows/plugin-ci.yml`](.github/workflows/plugin-ci.yml) runs on every push/PR to `main`:

- **validate**: `claude plugin validate . --strict`, so a broken manifest or skill never lands on `main`.
- **tag-release**: on push to `main`, if `plugin.json`'s `version` was bumped, creates and pushes the
  `ai-agent-solution-architect--vX.Y.Z` release tag via `claude plugin tag`. Gives a stable, pinned
  `ref`/commit `sha` to reference when submitting to a marketplace.

## Submitting to the official Claude Code plugin directory

Anthropic's `claude-plugins-official` marketplace has no automated/PR-based submission path.
External plugins are reviewed via the
[plugin directory submission form](https://clau.de/plugin-directory-submission). Point it at this
repo, path `plugins/ai-agent-solution-architect`, and a release tag from CI above for the
`ref`/`sha`.

## Project structure

```
AI-Human-Lead-Solution-Architecture/
  bin/
    install.js        # npx installer
  .claude-plugin/
    marketplace.json
  package.json
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

## 📚 Documentation

- [`adr-create`](plugins/ai-agent-solution-architect/skills/adr-create/SKILL.md): write an ADR for a decision you already have in mind
- [`adr-research-draft`](plugins/ai-agent-solution-architect/skills/adr-research-draft/SKILL.md): draft an ADR when the decision depends on evidence you don't have yet
- [`adr-architecture-review`](plugins/ai-agent-solution-architect/skills/adr-architecture-review/SKILL.md): critical assessment of whether the decision is sound
- [`adr-review`](plugins/ai-agent-solution-architect/skills/adr-review/SKILL.md): checklist review and interview-style gap filling

## License

MIT
