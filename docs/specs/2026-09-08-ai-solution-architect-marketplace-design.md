# Design: AI Solution Architect Skills marketplace

Date: 2026-09-08
Status: Approved

## Context

Kamil has a set of ADR-related Claude Code skills currently living loose in
`~/.claude/skills/`. He wants to package the personal ones as a proper
Claude Code plugin marketplace so they can be installed/shared like his
other custom marketplaces (`dotnet-agent-skills`, `vladikk-modularity`), and
add a new skill for defining architectural fitness functions.

There is already a scaffolded, git-initialized, remote-less repo at
`~/claude-code-skills` with a placeholder structure and one prior commit
("feat: add adr-review skill") — this design reuses that repo rather than
starting a new one.

**Correction found during planning:** of the five ADR skills initially
assumed loose/personal, two are actually symlinks into `~/.se2`, a
shared skill repo for Kamil's IoT Live work project:

```
~/.claude/skills/adr-draft  → ~/.se2/skills/iot-live/architecture/skills/adr-draft/SKILL.md
~/.claude/skills/adr-review → ~/.se2/skills/iot-live/architecture/skills/adr-review/SKILL.md
```

`adr-review` in particular is explicitly scoped to "IoT Live CMP project"
conventions (module boundaries, vertical-slice rules, DOMAIN.md tech
stack). This is employer/client project content, not Kamil's personal
material, and must not be copied into a personal GitHub repo. Kamil
confirmed: **exclude both from the marketplace** — they stay exactly where
they are, managed by se2 for the IoT Live project. Only the two genuinely
standalone personal skills (`adr-create`, `adr-research-draft`,
`adr-architecture-review` — three, not two) are migrated. A fourth,
genuinely generic `adr-review` skill was separately found already
scaffolded at project scope (`.claude/skills/adr-review/` in this repo,
from the "feat: add adr-review skill" commit) — interactive review/draft
with core + REST API/DB checklists, zero IoT Live references. It fills the
`adr-review` slot freed up by excluding the IoT-Live-sourced one, and is
folded into the plugin too.

## Goals

- Turn `~/claude-code-skills` into a valid Claude Code plugin marketplace.
- House the personal ADR skills plus a new `fitness-functions` skill in a
  single plugin, `ai-agent-solution-architect`.
- Publish the repo privately on GitHub and register it in Kamil's Claude
  Code settings, replacing the loose copies in `~/.claude/skills/`.
- Keep the marketplace free of any IoT Live (or other client/employer
  project) content or references.

## Non-goals

- Splitting skills into multiple plugins (single-plugin bundle was chosen
  for simplicity; can be revisited later if skills diverge in versioning
  needs).
- Rewriting the content/behavior of the 3 migrated ADR skills — they move
  as-is (confirmed to already be generic, no project-specific references).
- Touching `adr-draft` / `adr-review` or anything under `~/.se2` — these
  stay exactly where they are, managed by se2 for the IoT Live project.
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
    ai-agent-solution-architect/
      .claude-plugin/
        plugin.json
      skills/
        adr-create/
          SKILL.md
        adr-research-draft/
          SKILL.md
        adr-architecture-review/
          SKILL.md
        adr-review/
          SKILL.md
          checklist.md
          checklist-rest-api.md
          checklist-db.md
          templates/
        fitness-functions/
          SKILL.md
  README.md
```

The pre-existing empty `docs/.gitkeep` and `examples/` stub folders are
removed — nothing uses them and they don't serve the marketplace. (`docs/`
is repurposed to hold this spec instead.)

### `marketplace.json`

The GitHub repo stays `kamilbaczek/claude-code-skills` — the marketplace's
own identity (its registration name, used for `plugin@marketplace`
addressing) comes from the `name` field below, not the repo name; they
don't have to match (`dotnet-agent-skills`, for example, is hosted in the
`dotnet/skills` repo).

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "ai-agent-solution-architect-skills",
  "description": "AI Agent Solution Architect Skills — a personal Claude Code marketplace of skills for AI-assisted software architecture: authoring, researching, and reviewing Architecture Decision Records, and defining executable fitness functions that guard the architectural characteristics those decisions depend on.",
  "owner": {
    "name": "Kamil Bączek"
  },
  "plugins": [
    {
      "name": "ai-agent-solution-architect",
      "source": "./plugins/ai-agent-solution-architect",
      "description": "A toolkit for AI-assisted solution architecture work: create, research, and review Architecture Decision Records, and define concrete, executable fitness functions for the architectural characteristics behind them."
    }
  ]
}
```

### `plugin.json`

```json
{
  "name": "ai-agent-solution-architect",
  "description": "A toolkit for AI-assisted solution architecture work: create, research, and review Architecture Decision Records, and define concrete, executable fitness functions for the architectural characteristics behind them.",
  "version": "1.0.0",
  "author": {
    "name": "Kamil Bączek"
  }
}
```

## Migrating the existing ADR skills

`~/.claude/skills/<name>` is not inside the marketplace repo's git tree, so
this is a copy into the new location (not a cross-repo `git mv`), followed
by `git add` in `~/claude-code-skills` and a separate cleanup of the
originals:

- `adr-create`
- `adr-research-draft`
- `adr-architecture-review`

No content changes — only relocation. `~/.claude/skills/adr-draft` and
`~/.claude/skills/adr-review` are explicitly **not** touched — they are
symlinks into `~/.se2` (the IoT Live project's skill repo) and stay exactly
as they are; nothing is read from or written to `~/.se2` as part of this
work beyond the read-only check already done to confirm their provenance.

Separately, the project-scoped `.claude/skills/adr-review/` already inside
this repo (generic, unrelated to the `~/.se2` one) is `git mv`'d — not
copied — into `plugins/ai-agent-solution-architect/skills/adr-review/`, since
both source and destination are in the same repo.

After the plugin is registered and confirmed working, the now-copied
originals (`adr-create`, `adr-research-draft`, `adr-architecture-review`)
are deleted from `~/.claude/skills/` so there is a single source of truth
(loose skill and plugin-provided skill would otherwise both register under
the same skill name).

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

Claude Code ships a `claude plugin` CLI that does this without hand-editing
`settings.json`:

1. Validate locally first: `claude plugin validate ~/claude-code-skills`
   (covers both the marketplace manifest and the plugin/skills inside it).
2. Register the marketplace from the local path to test end-to-end before
   publishing: `claude plugin marketplace add ~/claude-code-skills`.
3. Install/enable the plugin: `claude plugin install ai-agent-solution-architect@ai-agent-solution-architect-skills`.
4. Confirm it's live: `claude plugin list` should show
   `ai-agent-solution-architect@ai-agent-solution-architect-skills` enabled, with its 5 skills
   available.
5. Commit the restructure to `~/claude-code-skills` (existing git history
   preserved).
6. Create a new **private** GitHub repo `kamilbaczek/claude-code-skills`
   using the active `kamilbaczek` gh account, and push.
7. Re-point the marketplace at GitHub instead of the local path: remove the
   local registration (`claude plugin marketplace remove ai-agent-solution-architect-skills`)
   and re-add it from GitHub (`claude plugin marketplace add kamilbaczek/claude-code-skills`),
   then re-install the plugin — this leaves `~/.claude/settings.json`'s
   `extraKnownMarketplaces` entry pointing at the GitHub repo, matching the
   pattern used by `dotnet-agent-skills`, `vladikk-modularity`, and
   `claude-code-warp`.
8. Remove the loose `adr-create`, `adr-research-draft`,
   `adr-architecture-review` folders from `~/.claude/skills/` (the
   `adr-review` migration was an in-repo `git mv`, nothing to remove
   there).

## Testing / validation approach

- `claude plugin validate ~/claude-code-skills` must pass with no errors
  (run with `--strict` to also catch warnings) before anything is
  registered or pushed.
- After local registration, `claude plugin list` must show the plugin
  enabled with all 5 skills present, no duplicates, no missing entries.
- After the GitHub-hosted round-trip (step 7), re-run `claude plugin list`
  to confirm the marketplace source switched cleanly and the plugin still
  resolves.
- Confirm `~/.claude/skills/adr-create`, `adr-research-draft`, and
  `adr-architecture-review` are gone post-migration so there's no
  duplicate/conflicting skill registration; confirm `adr-draft` and
  `adr-review` (the `~/.se2` symlinks) are untouched.
