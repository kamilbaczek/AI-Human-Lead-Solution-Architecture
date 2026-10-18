<h1 align="center">AI Human Lead Solution Architecture 🏛️</h1>

<p align="center">
  <b>Skills for the distinguished software architect.</b><br>
  ADR authoring, research and review, powered by Claude Code.
</p>

<p align="center">
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude_Code-plugin_marketplace-D97757?logo=anthropic&logoColor=white">
  <img alt="Plugin version" src="https://img.shields.io/badge/ai--agent--solution--architect-1.2.0-blue">
  <img alt="Skills" src="https://img.shields.io/badge/skills-4-green">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-lightgrey">
</p>

<p align="center">
  <a href="https://github.com/kamilbaczek/AI-Human-Lead-Solution-Architecture/actions/workflows/plugin-ci.yml"><img alt="Plugin CI" src="https://github.com/kamilbaczek/AI-Human-Lead-Solution-Architecture/actions/workflows/plugin-ci.yml/badge.svg?branch=main"></a>
</p>

<hr>

> ### 💬 *"Why" is more important than "How".*
>
> Anyone can describe what was built. An architect preserves the reasoning, so the next team can tell
> whether the decision still holds.

> ### 💬 *An ADR records a significant decision: one that is hard to revert.*
>
> Significance is measured by how hard it is to undo. If one pull request can reverse it, it is not an
> architecture decision and it does not get an ADR.

## About

The architect leads, the AI does the legwork. This marketplace packages one plugin,
`ai-agent-solution-architect`, with skills that take an Architecture Decision Record from a rough
decision to a reviewed, evidence-backed document: create it, research what is missing, and
challenge it before it is accepted.

## 🧭 Principles

| Principle | What it means in practice |
| --- | --- |
| ⚖️ **Trade-off analysis** | Every option has a cost. Each ADR compares real alternatives and states what you give up, not only what you gain. |
| 🎯 **Risk-driven decisions** | Spend effort where the risk is. The harder a decision is to reverse, the more evidence it needs. |
| 🤝 **Collaborative decisions** | A decision is owned by the team. The skills ask questions and surface gaps instead of deciding for you. |
| 🚪 **Significance gate** | Cosmetic, local or one-PR-reversible choices are turned away, so the ADR log stays worth reading. |

## 🚀 Getting started

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

## 🧰 Skills

| Skill | Use it when | What it does |
| --- | --- | --- |
| ✍️ `adr-create` | You already know the decision | Production-ready ADR with deep trade-off analysis from a topic or free-text input |
| 🔎 `adr-research-draft` | The decision needs evidence you don't have | Web and codebase research first, then an evidence-backed ADR draft |
| 🧠 `adr-architecture-review` | You need to know if the decision is sound | Critical review of trade-off completeness, evolutionary fitness and reversibility, ending in a verdict |
| ✅ `adr-review` | You want gaps found and filled | Checklist review (core, REST API, database) with interview-style questions |

### The flow

```text
 decision ──► significance gate ──► create / research ──► review ──► accepted ADR
                    │
                    └── not significant ──► no ADR, and a note on where it belongs
```

## ⚙️ CI

[`.github/workflows/plugin-ci.yml`](.github/workflows/plugin-ci.yml) runs on every push/PR to `main`:

- **validate**: `claude plugin validate . --strict`, so a broken manifest or skill never lands on `main`.
- **tag-release**: on push to `main`, if `plugin.json`'s `version` was bumped, creates and pushes the
  `ai-agent-solution-architect--vX.Y.Z` release tag via `claude plugin tag`. Gives a stable, pinned
  `ref`/commit `sha` to reference when submitting to a marketplace.

## 📮 Submitting to the official Claude Code plugin directory

Anthropic's `claude-plugins-official` marketplace has no automated/PR-based submission path.
External plugins are reviewed via the
[plugin directory submission form](https://clau.de/plugin-directory-submission). Point it at this
repo, path `plugins/ai-agent-solution-architect`, and a release tag from CI above for the
`ref`/`sha`.

## 🗂️ Project structure

```text
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
      shared/         # ADR template, significance gate, checklists
```

## 📚 Documentation

- [`adr-create`](plugins/ai-agent-solution-architect/skills/adr-create/SKILL.md): write an ADR for a decision you already have in mind
- [`adr-research-draft`](plugins/ai-agent-solution-architect/skills/adr-research-draft/SKILL.md): draft an ADR when the decision depends on evidence you don't have yet
- [`adr-architecture-review`](plugins/ai-agent-solution-architect/skills/adr-architecture-review/SKILL.md): critical assessment of whether the decision is sound
- [`adr-review`](plugins/ai-agent-solution-architect/skills/adr-review/SKILL.md): checklist review and interview-style gap filling

## License

[MIT](LICENSE)
