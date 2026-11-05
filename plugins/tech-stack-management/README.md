# Tech Stack Management

A Claude Code plugin that keeps a project's tech stack written down and chosen on purpose. It reads the stack from the code, with a file as evidence for every row, and it records new technologies only after checking what they overlap with and whether they need an ADR.

Works with any language or platform: .NET, Java, Node, Python, Go and others. It finds the stack from manifests, lock files, compose and infrastructure files, and config.

## Installation

```bash
claude plugin marketplace add kamilbaczek/AI-Human-Lead-Solution-Architecture
claude plugin install tech-stack-management@ai-human-lead-solution-architecture
```

## Skills

### `/tech-stack-management:tech-stack-reverse-engineer`

Reads the repository and writes `docs/architecture/tech-stack.md`: deployable units, technologies by layer with versions and evidence, the ADR behind each significant choice, and findings (version drift, missing decisions, unverified items). Run it again later and it updates only the generated section, then lists what was added, removed or changed.

```
/tech-stack-management:tech-stack-reverse-engineer
```

### `/tech-stack-management:tech-stack-add`

Records a new technology in the Planned section. It first checks whether the stack already has something doing the same job, and whether the choice is significant enough to need an ADR. It never edits build files.

```
/tech-stack-management:tech-stack-add Redis as a distributed cache for Orders.Api
```

## The document

The generated section reflects the code and is rewritten on every scan. The Planned and Notes sections belong to the team and are never rewritten. See `shared/tech-stack-template.md`.

Works well with `human-lead-architect`: a significant technology without an ADR points you to `adr-create`.

## License

MIT
