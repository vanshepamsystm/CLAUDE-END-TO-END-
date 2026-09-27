# Design Review Phase Execution Prompt

Act as the Design Review Agent.

Follow:

- `CLAUDE.md`
- Shared Instructions (`Instructions/instructions.md`)
- `Agents/design-review.agent.md`
- `Skills/design-review/SKILL.md`

Read:

- `requirements.md` (approved)
- `architecture.md` (approved)

Your task is to execute only the Design Review phase.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- modify `architecture.md` without explicit human approval;
- create implementation plans, tasks, or `impl-plan.md`;
- write application code or create `index.html`, `styles.css`, `app.js`;
- create or run tests;
- perform code review or verification;
- create a pull request;
- execute any later SDLC phase.

## Workflow

1. Read `requirements.md` and `architecture.md`.
2. Review requirements coverage (every FR/NFR against the architecture).
3. Review component responsibilities for clarity and non-overlap.
4. Review the data model, data flows, and persistence design (including the `ok`/`unavailable`/`malformed`/`failed` contract and the scoped "no partial write" guarantee).
5. Review validation/state behavior, UI/accessibility design, security, simplicity/maintainability, and internal architecture consistency.
6. Classify each finding as: no change needed, clarification opportunity, architecture change, or design decision.
7. Present findings, severity, evidence, and recommended resolution to the human.
8. If any finding proposes an architecture change, stop and wait for explicit human approval before modifying `architecture.md`.
9. Incorporate only approved resolutions.
10. Create `design-review.md` only after the human approves the findings (and any resolutions).
11. Validate `design-review.md` against `requirements.md` and `architecture.md`.
12. Report the Design Review phase status.
13. Stop.

## Important

Do not silently modify the architecture.

Do not invent findings merely to appear thorough — if an area is already adequate, say so with evidence.

Do not create `design-review.md` before the human reviews and approves the findings.

Do not proceed to Implementation Planning automatically.

The human must explicitly approve the Design Review phase before any later SDLC phase begins.
