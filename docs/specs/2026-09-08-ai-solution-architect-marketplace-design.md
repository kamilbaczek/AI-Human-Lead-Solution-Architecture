# Design: AI Solution Architect Skills marketplace

Date: 2026-09-08
Status: Approved

## Context

Kamil has a set of ADR-related Claude Code skills (`adr-create`, `adr-draft`,
`adr-research-draft`, `adr-review`, `adr-architecture-review`) currently
living loose in `~/.claude/skills/`. He wants to package and deploy them as
a proper Claude Code plugin marketplace so they can be installed/shared like
his other custom marketplaces (`dotnet-agent-skills`, `vladikk-modularity`),
and add a new skill for defining architectural fitness functions.

There is already a scaffolded, git-initialized, remote-less repo at
`~/claude-code-skills` with a placeholder structure and one prior commit
("feat: add adr-review skill") — this design reuses that repo rather than
starting a new one.

## Goals

- Turn `~/claude-code-skills` into a valid Claude Code plugin marketplace.
- House all ADR skills plus a new `fitness-functions` skill in a single
  plugin, `ai-solution-architect`.
- Publish the repo privately on GitHub and register it in Kamil's Claude
  Code settings, replacing the loose copies in `~/.claude/skills/`.

## Non-goals

- Splitting skills into multiple plugins (single-plugin bundle was chosen
  for simplicity; can be revisited later if skills diverge in versioning
  needs).
- Rewriting the content/behavior of the 5 existing ADR skills — they move
  as-is.
- Publishing to the public Claude Code plugin directory
  (`claude-plugins-official`) — this stays a private, personal marketplace.

## Repo & marketplace structure

Reuse `~/claude-code-skills` in place, restructured to the standard
marketplace layout (matching `dotnet-agent-skills` and
`claude-plugins-official`):

```
claude-code-skills/
  .claude-plugin/
    marketplace.json
  plugins/
    ai-solution-architect/
      .claude-plugin/
        plugin.json
      skills/
        adr-create/
          SKILL.md
        adr-draft/
          SKILL.md
        adr-research-draft/
          SKILL.md
        adr-review/
          SKILL.md
          checklist.md
          templates/
        adr-architecture-review/
          SKILL.md
        fitness-functions/
          SKILL.md
  README.md
```

The pre-existing empty `docs/.gitkeep` and `examples/` stub folders are
removed — nothing uses them and they don't serve the marketplace. (`docs/`
is repurposed to hold this spec instead.)

### `marketplace.json`

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "claude-code-skills",
  "owner": {
    "name": "Kamil Bączek"
  },
  "plugins": [
    {
      "name": "ai-solution-architect",
      "source": "./plugins/ai-solution-architect",
      "description": "ADR authoring/review skills and architectural fitness-function definition for AI-assisted solution architecture work."
    }
  ]
}
```

### `plugin.json`

```json
{
  "name": "ai-solution-architect",
  "description": "ADR authoring/review skills and architectural fitness-function definition for AI-assisted solution architecture work.",
  "version": "1.0.0",
  "author": {
    "name": "Kamil Bączek"
  }
}
```

## Migrating the existing ADR skills

`git mv` each skill folder, unmodified, from `~/.claude/skills/<name>` to
`plugins/ai-solution-architect/skills/<name>` inside the marketplace repo:

- `adr-create`
- `adr-draft`
- `adr-research-draft`
- `adr-review` (including `checklist.md` and `templates/`)
- `adr-architecture-review`

No content changes — only relocation. After the plugin is registered and
confirmed working, the now-empty originals are deleted from
`~/.claude/skills/` so there is a single source of truth (loose skill and
plugin-provided skill would otherwise both register under the same skill
name).

## New skill: `fitness-functions`

Modeled on `adr-create`'s structure and voice (senior architect, numbered
process, ready-to-commit Markdown output), consistent with the terminology
used elsewhere in Kamil's skill set (`create-chapter`, `create-article` —
Evolutionary Architecture style).

**Input:** either an existing ADR file (e.g.
`docs/adr/ADR-004-*.md`) or a free-text architectural characteristic /
decision description.

**Process:**
1. Read the source ADR (if given) or the described decision, and identify
   the architectural characteristics / quality attributes it implies
   (coupling, latency, availability, independent deployability, security,
   etc.).
2. For each relevant characteristic, define a concrete fitness function:
   - **What** it measures
   - **How** it's measured (static analysis, synthetic/runtime check,
     chaos experiment, manual review gate, etc.)
   - **Threshold / target**
   - **Where it runs** (CI, staging, production monitoring, periodic
     manual review)
3. Write the output using the template below.

**Output:** a ready-to-commit Markdown file at
`docs/fitness-functions/{slugified-title}.md`, cross-referencing the source
ADR by number when one exists.

**Output template:**

```markdown
# Fitness Functions: {Title}

Source: {ADR-NNN link, or "derived from: <description>"}

| Characteristic | Fitness Function | Method | Threshold | Runs In |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## Details

### {Characteristic}
- **Rationale:** why this characteristic matters for this decision
- **Measurement:** how it's captured concretely
- **Threshold:** the pass/fail line and why
- **Cadence:** CI / runtime / periodic review
```

## Publish & register

1. Commit the restructure to `~/claude-code-skills` (existing git history
   preserved).
2. Create a new **private** GitHub repo `kamilbaczek/claude-code-skills`
   using the active `kamilbaczek` gh account, and push.
3. In `~/.claude/settings.json`, add under `extraKnownMarketplaces`:
   ```json
   "claude-code-skills": {
     "source": {
       "source": "github",
       "repo": "kamilbaczek/claude-code-skills"
     }
   }
   ```
   matching the existing entries for `dotnet-agent-skills`,
   `vladikk-modularity`, and `claude-code-warp`.
4. Enable the plugin: `"ai-solution-architect@claude-code-skills": true`
   under `enabledPlugins`.
5. Validate: confirm `marketplace.json`/`plugin.json` are well-formed JSON,
   and that all 6 skills (5 migrated + `fitness-functions`) load and are
   listed by Claude Code after registration.
6. Remove the loose `adr-*` skill folders from `~/.claude/skills/`.

## Testing / validation approach

- JSON validity check on both manifests before pushing.
- After registering the marketplace and enabling the plugin, start a fresh
  Claude Code session and confirm the 6 skills appear as available skills
  (no duplicates, no missing entries) and that at least one (`adr-create`)
  invokes correctly end-to-end.
- Confirm the loose `~/.claude/skills/adr-*` folders are gone post-migration
  so there's no duplicate/conflicting skill registration.
