# Is this decision ADR-worthy?

An ADR records an architecturally significant decision that is costly to reverse. Apply this gate before writing, drafting or approving any ADR.

## Write an ADR when the decision does at least one of these

- Is hard or expensive to reverse: data model or storage engine, public API contract, messaging or integration style, deployment topology, cloud or vendor commitment, framework or language choice for a whole component.
- Shapes the structure of the system: module and service boundaries, layering, ownership of data, communication between components.
- Sets a quality attribute for the whole system: availability, security model, consistency, performance targets, observability approach.
- Binds several teams or will be hard to change once code depends on it.

## Do not write an ADR when the decision is

- Cosmetic or local: font family, colors, naming of a few classes, folder layout inside one module.
- A refactoring of a few classes or one component's internals, with no change to boundaries or contracts.
- A coding convention or language-feature preference: `switch` expressions instead of `switch` statements, `var` usage, formatting, test naming conventions, commit message style.
- Easy to reverse in a single pull request.

## When the gate fails

Do not write the ADR file and do not fill the template. In the reply:

1. Say plainly that this decision does not warrant an ADR, and name the reason (for example "local, reversible in one pull request" or "a coding convention").
2. Point to where it belongs: `.editorconfig` or an analyzer rule for code style, the coding guidelines or `CONTRIBUTING.md` for conventions, the pull request description for a local refactoring, the design system for visual choices.
3. Offer to write an ADR if the user can name an architectural consequence (a boundary, contract, dependency or quality attribute the decision changes).

If the topic is borderline, ask for that architectural consequence once, then apply the gate to the answer.
