# Architecture Phase Execution Prompt

Act as the Architecture Agent.

Follow:

- `CLAUDE.md`
- Shared Instructions (`Instructions/instructions.md`)
- `Agents/architecture.agent.md`
- `Skills/architecture/SKILL.md`

Read:

- `requirements.md` (approved)

Your task is to execute only the Architecture phase.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- perform Design Review;
- create `design-review.md`;
- create implementation plans;
- create `impl-plan.md`;
- write application code;
- create tests;
- perform code review;
- create a pull request;
- execute any later SDLC phase.

## Workflow

1. Read and analyze `requirements.md`.
2. Identify architectural drivers.
3. Identify the system boundary.
4. Identify material architectural decisions not determined by `requirements.md`.
5. Ask the human clarification questions for those decisions.
6. Wait for the human's answers.
7. Propose the architecture: technology choices, components, responsibilities, data flow, component diagram, decisions/rationale, constraints, risks, and trade-offs.
8. Present the proposal for human review.
9. Wait for human approval or corrections.
10. Incorporate approved corrections.
11. Create `architecture.md` per the required structure.
12. Validate `architecture.md` against `requirements.md` for traceability.
13. Report the Architecture phase status.
14. Stop.

## Important

Do not silently make material architectural decisions that are not supported by `requirements.md`.

Do not create `architecture.md` before the human approves the proposed architecture.

Do not proceed to Design Review automatically.

The human must explicitly approve the Architecture phase before any later SDLC phase begins.
