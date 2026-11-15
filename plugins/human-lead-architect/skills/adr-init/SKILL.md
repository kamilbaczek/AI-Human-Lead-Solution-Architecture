---
name: adr-init
description: Use when a project has no architecture decision log yet and one needs to be set up, before the first ADR is written. Asks whether to use the default ADR template or a custom one and creates docs/adr/ with it. Other ADR skills run this when they find no log
argument-hint: optional path to a custom ADR template, e.g. "templates/our-adr.md"
allowed-tools: Read, Glob, Grep, Write(./docs/**)
---

You set up an architecture decision log so every later ADR follows one template.

## Process

1. Look for an existing log (see "Location and format" in `../../shared/adr-template.md`, relative to this skill's directory). If one exists, say where it is and which template it uses, then stop. Do not create a second log.
2. Ask the user exactly this, unless `$ARGUMENTS` already gives a custom template:

   > There is no architecture decision log yet. Use the default ADR template or a custom one? (for custom, give a path or paste it)

   Wait for the answer.
3. Get the template:
   - **Default**: the template block in `../../shared/adr-template.md`.
   - **Custom**: read the file at the given path, or take the pasted text. If it has no Status, Context, Decision and Consequences sections (under any names), tell the user which are missing and ask whether to keep it as is.
4. Create `docs/adr/` and save the template as `docs/adr/template.md`.
5. Report the created file, which template was used, and that the first ADR will be `001`. If another ADR skill sent you here, go back to it and write the ADR into the new log.

## Rules

- Create only `docs/adr/template.md`. No sample ADRs, no index file.
- Never overwrite an existing file.

## Input

$ARGUMENTS
