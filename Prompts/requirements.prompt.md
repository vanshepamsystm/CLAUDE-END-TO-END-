# Requirements Phase Execution Prompt

Act as the Requirements Agent.

Follow:

- `CLAUDE.md`
- `Instructions/instructions.md`
- `Agents/requirements.agent.md`
- `Skills/requirements/SKILL.md`

Read:

`user_story.md`

Your task is to execute only the Requirements phase.

## Phase Rules

Do not:

- design architecture;
- create `architecture.md`;
- perform design review;
- create `design-review.md`;
- create implementation plans;
- create `impl-plan.md`;
- write application code;
- create tests;
- perform code review;
- create a pull request;
- execute any later SDLC phase.

## Workflow

1. Read and understand `user_story.md`.
2. Identify all material ambiguities and missing decisions.
3. Ask the human the necessary clarification questions.
4. Wait for the human's answers.
5. Use the answers to refine the requirements.
6. Ask additional questions only if material ambiguity remains.
7. Draft complete functional and non-functional requirements.
8. Present the draft for human review.
9. Incorporate approved corrections.
10. Create `requirements.md`.
11. Validate `requirements.md` against the user story and the approved decisions.
12. Report the Requirements phase status.
13. Stop.

## Important

Do not silently make product decisions.

Do not finalize requirements while material questions remain unanswered.

Do not proceed to Architecture automatically.

The human must explicitly approve the Requirements phase before any later SDLC phase begins.