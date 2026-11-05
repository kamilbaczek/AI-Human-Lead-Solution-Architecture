# Reading a system from its repository

Shared by the `tech-stack-management` skills. Works for any language or platform: never assume a stack, find it.

## Where the evidence is

Look for these, in this order, and stop reading a category once it gives no new facts:

| What | Files to look for |
|---|---|
| **Deployable units** | `*.csproj`, `*.sln`, `package.json`, `pom.xml`, `build.gradle*`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `requirements*.txt`, `Gemfile`, `composer.json`, `mix.exs`, `Dockerfile*` |
| **Runtime topology** | `docker-compose*.yml`, `compose*.yaml`, Kubernetes manifests, Helm charts, `Procfile`, serverless configs (`serverless.yml`, `host.json`, `template.yaml`) |
| **Infrastructure** | Terraform (`*.tf`), Bicep (`*.bicep`), ARM, CloudFormation, Pulumi, CDK |
| **Integrations** | Connection strings and URLs in config (`appsettings*.json`, `.env.example`, `application*.yml`, `config/*`), HTTP clients, message contracts, queue and topic names, OpenAPI or AsyncAPI files, `.proto` files |
| **Pipelines and tooling** | `.github/workflows/`, `azure-pipelines*.yml`, `.gitlab-ci.yml`, `Jenkinsfile`, linters, test frameworks |
| **Decisions** | The ADR directory (`docs/adr/`, `docs/architecture/decisions/`, `Docs/ArchitectureDecisionLog/` or similar) |

Never read secrets. If a config file holds real credentials, note that the integration exists and do not copy the value.

## Rules

- **Every element needs evidence.** Name the file (and line, where it helps) that proves a component, technology or connection exists. If you did not open it, it is not evidence.
- **Unknown is a valid answer.** A connection you suspect but cannot prove is marked `?` with a short note, never drawn or listed as fact.
- **Names come from the repository.** Use the names the code uses (project, service, module, queue). Do not invent friendlier ones.
- **Versions come from manifests or lock files.** If no version is pinned, write `unpinned`; do not guess the latest one.
- **Link decisions.** When an ADR governs a technology, link it. When a significant choice has no ADR, say so and suggest writing one (`human-lead-architect:adr-create` if that plugin is installed). Significant means hard to reverse: a data store, a message broker, a cloud service, a framework or language for a whole component, an identity provider. Do not ask for ADRs for small libraries, test helpers or dev tooling.

## Generated sections and human notes

Generated content goes between markers, so a later run can update it without touching what people wrote:

```markdown
<!-- generated:{name}:begin -->
...generated content...
<!-- generated:{name}:end -->
```

On update, replace only what is between the markers. Keep every line outside them unchanged. If the file has no markers, show the user what you would replace and ask before writing.
