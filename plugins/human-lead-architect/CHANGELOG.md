# Changelog

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
