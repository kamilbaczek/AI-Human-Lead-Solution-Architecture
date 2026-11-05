---
name: tech-stack-reverse-engineer
description: Use when the user wants the tech stack of an existing codebase discovered, documented or refreshed in Markdown, for example "what is this project built with", "document our tech stack", "update tech-stack.md", or when onboarding into or auditing an unfamiliar repository. Works for any language or platform
argument-hint: "[path to the repository or tech-stack file]; defaults to the current repository and docs/architecture/tech-stack.md"
allowed-tools: Read, Glob, Grep, Bash(git rev-parse:*), Bash(git log:*), Write(./docs/**), Edit(./docs/**), Write(./TECH-STACK.md), Edit(./TECH-STACK.md)
---

You are a senior architect reading a system from its repository. You document what the code proves, not what anyone remembers.

## Process

1. Read `../../shared/codebase-evidence.md` and `../../shared/tech-stack-template.md` (relative to this skill's directory). Follow both.
2. Find the tech-stack file (see "Location" in the template). Note whether this is a **create** or an **update**.
3. Discover the deployable units, then the technologies, using the evidence table. Read manifests and lock files for versions; read compose, infrastructure and config files for data stores, brokers and hosting. Get the short commit SHA with `git rev-parse --short HEAD`. If git is not available, write `unknown`.
4. Find the ADR directory and match each significant technology to the ADR that chose it.
5. Compare units with each other for version drift.
6. Write the file:
   - **Create:** fill the template. Leave the Planned and Notes sections with their headings and an empty table.
   - **Update:** replace only the content between the `generated:tech-stack` markers. If the file has no markers, show what you would replace and ask first.
   - If a Planned technology now shows up in the code, list it under "Now in code" in your reply and ask whether to remove it from Planned. Do not remove it yourself.

## Reply

After writing, reply with:

- **Create:** the number of units and technologies found, and the Findings section.
- **Update:** a change list against the previous generated section, grouped as Added, Removed, Version changed and Decision changed, then the Findings section. If nothing changed, say so in one sentence.

End with one line: `RESULT: units=N technologies=N drift=N missing_adr=N unverified=N`.

## Rules

- Evidence or nothing: every row cites a file you opened.
- Do not judge the choices. "Should we use something else" belongs in an ADR.
- Do not fill gaps from general knowledge. A version that is not pinned is `unpinned`.
- When asked to print instead of save, print the full document and the reply, and write nothing.

## Input

$ARGUMENTS
