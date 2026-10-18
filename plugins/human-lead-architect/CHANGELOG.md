# Changelog

## 1.5.0 - 2026-10-18

* Breaking: removed `adr-architecture-review`. `adr-review` now judges soundness and gives the verdict, so use it instead
* `adr-review` no longer drafts new ADRs (use `adr-create`); it reviews, then interviews you to fill the gaps
* `adr-reviewer` agent now loads `adr-review`

## 1.4.0 - 2026-10-18

* New skills: `adr-supersede` (retire an ADR and fix links), `adr-index-check` (numbering, supersede links, stale statuses across the whole log) and `adr-drift-check` (does the code still follow an accepted ADR)
* Reviews now end with a machine-readable `RESULT:` line; severity levels and the verdict mapping moved to `shared/review-output.md` and are no longer duplicated
* `adr-reviewer` agent loads only `adr-architecture-review` and reads checklists on demand, which saves context
* Evals: each case runs 3 times and passes on 2 of 3, an LLM judge grades review quality against rubrics, and new cases cover negative and Polish triggers, the new skills, the agent's read-only guarantee and a balanced real-world ADR

## 1.3.1 - 2026-10-18

* `adr-reviewer` agent: added a trade-off-driven reviewing lens (architecture characteristics, coupling, options, communicating across levels)

## 1.3.0 - 2026-10-18

* Added the `adr-reviewer` agent: a read-only subagent (Read, Grep, Glob) that reviews an ADR for soundness and completeness and returns a verdict without editing files

## 1.2.3 - 2026-10-18

* Moved the self-review step and the ADR location rules into shared files so the skills no longer repeat them
* `adr-review` and `adr-architecture-review` descriptions now point to each other; `adr-review` gets a readiness line, a write-after-confirmation rule and `Edit(./docs/**)`
* ADR template: supersede handling, Markdown or AsciiDoc output
* `adr-research-draft`: fewer than 2 sources for the recommended option means Low confidence and a spike

## 1.2.2 - 2026-10-18

* Removed AI-sounding phrasing from `adr-create` and `adr-architecture-review`
* Added a plain-prose rule to the shared ADR template: no em dashes, no "not X, it's Y", no stacked buzzwords

## 1.2.1 - 2026-10-18

* Added a 1024 px square listing icon
* Scoped the `adr-review` write grant to `Write(./docs/**)` instead of unrestricted `Write`

## 1.2.0 - 2026-10-18

- Technology comparison table in ADRs
- Significance gate: decisions that do not warrant an ADR are rejected
- No emoji in ADR tables
- One shared ADR template across `adr-create`, `adr-research-draft` and `adr-review`
- Removed the `fitness-functions` skill

## 1.1.0 - 2026-10-16

- Improved ADR skills

## 1.0.0 - 2026-09-08

- Initial release: `adr-create`, `adr-research-draft`, `adr-architecture-review`, `adr-review`
