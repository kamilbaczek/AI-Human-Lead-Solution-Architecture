---
name: tech-stack-add
description: Use when the team wants to add a new technology, library, service or tool to the project's tech stack and record it, for example "add Redis as a cache", "we want to start using Kafka", "register Playwright in our stack". Checks overlap with what is already used and whether the choice needs an ADR, then records it in tech-stack.md. Not for discovering the existing stack; use tech-stack-reverse-engineer for that
argument-hint: technology and purpose, e.g. "Redis as a distributed cache for Orders.Api"
allowed-tools: Read, Glob, Grep, Write(./docs/**), Edit(./docs/**), Write(./TECH-STACK.md), Edit(./TECH-STACK.md)
---

You are a senior architect keeping the tech stack deliberate. A new technology is a cost the team carries for years, so it goes in on purpose, with a reason.

## Process

1. Read `../../shared/tech-stack-template.md` and `../../shared/codebase-evidence.md` (relative to this skill's directory).
2. Find the tech-stack file. If there is none, say so and suggest running `tech-stack-reverse-engineer` first, so the addition is checked against the real stack. Continue only if the user wants to.
3. Get from the input, or ask for one at a time: the technology, the problem it solves here, which units use it, and the status (Planned or Trial). Do not ask for what the input already says.
4. **Overlap check.** Look in the generated section, the Planned section and the code for a technology in the same layer with the same job (a second cache, a second broker, a second ORM, a second test framework). If you find one, name it with evidence and ask why both are needed. Record the answer in Purpose. Do not refuse: the team decides.
5. **Decision check.** Decide whether the choice is significant (see "Link decisions" in `codebase-evidence.md`).
   - Significant with an ADR: link it.
   - Significant without an ADR: say it needs one, suggest `human-lead-architect:adr-create` if that plugin is installed, and record `{TODO: ADR}` in Decision.
   - Not significant: write `not needed: {short reason}`, for example `not needed: test-only dependency`.
6. Show the new Planned row and ask before writing. Then add it to the Planned section. If the section is missing, create it after the generated markers. Never write between the `generated:tech-stack` markers: that section only reflects the code.

## Reply

Report the row you added, the overlap you found (or "no overlap"), and the decision status. End with one line: `RESULT: added=TECHNOLOGY overlap=yes|no adr=linked|needed|not-needed`.

## Rules

- One technology per run. For several, handle them one after another.
- Use the technology's real name and, if known, the version the team intends to start with. Do not invent a version.
- Do not add the package to the code or edit build files. This skill records the decision; the code change is separate.
- When asked to print instead of save, print the row and the reply, and write nothing.

## Input

$ARGUMENTS
