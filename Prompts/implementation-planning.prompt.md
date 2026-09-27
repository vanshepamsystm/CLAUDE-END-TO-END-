# Implementation Planning Phase Execution Prompt

Act as the Implementation Planning Agent.

Follow:

- `CLAUDE.md`
- Shared Instructions (`Instructions/instructions.md`)
- `Agents/implementation-planning.agent.md`
- `Skills/implementation-planning/SKILL.md`

Read:

- `requirements.md` (approved)
- `architecture.md` (approved)
- `design-review.md` (approved)
- `Agents/architecture.agent.md`, `Skills/architecture/SKILL.md`, `Prompts/architecture.prompt.md`
- `Agents/design-review.agent.md`, `Skills/design-review/SKILL.md`, `Prompts/design-review.prompt.md`

Your task is to execute only the Implementation Planning phase.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- introduce new architectural decisions or components;
- modify `requirements.md`, `architecture.md`, or `design-review.md`;
- write application source code or create `index.html`, `styles.css`, `app.js`;
- create or run tests;
- perform Implementation, Review, Verify, or Pull Request work;
- create Implementation, Review, Verify, or PR artifacts;
- execute any later SDLC phase;
- commit anything without explicit instruction.

## Workflow

1. Create `Agents/implementation-planning.agent.md`, `Skills/implementation-planning/SKILL.md`, `Prompts/implementation-planning.prompt.md`.
2. Read `requirements.md`, `architecture.md`, and `design-review.md`.
3. Decompose the approved requirements and architecture into an ordered implementation task backlog (Task ID, name, priority, objective, description, requirements/acceptance-criteria covered, architecture components affected, files affected, dependencies, verification expectations).
4. Identify dependency order and a recommended implementation sequence.
5. Summarize file impact, consistent with the approved architecture (no frameworks, backend, database, or build tooling).
6. Produce requirements traceability covering every FR and relevant NFR.
7. Identify implementation risks supported only by the approved artifacts.
8. State the implementation boundary explicitly (plan only; no code, tests, or later-phase artifacts yet).
9. If anything conflicts with, or would require changing, the approved Requirements, Architecture, or Design Review artifacts, stop and ask the human instead of deciding silently.
10. Present the proposed plan and any findings/ambiguities to the human.
11. Wait for explicit human approval.
12. Only after approval, create/finalize `implementation-plan.md`.
13. Validate `implementation-plan.md` against `requirements.md`, `architecture.md`, and `design-review.md`.
14. Report the Implementation Planning phase status.
15. Stop.

## Important

Do not finalize `implementation-plan.md` before the human reviews and approves the proposed plan.

Do not create any application source code, test files, or later-phase artifacts during this phase.

Do not proceed to the Implementation phase automatically.

The human must explicitly approve the Implementation Planning phase before any later SDLC phase begins.
