# Requirements Phase Instructions

## Objective

Define and document complete, testable requirements for the Todo List user story through a human-in-the-loop collaboration with Claude.

## Inputs

Primary input:

- `user_story.md`

## Outputs

Primary output:

- `requirements.md`

Supporting artifacts:

- Requirements Agent
- Requirements Skill
- Requirements Prompt

## Workflow

Follow this sequence exactly:

1. Read `user_story.md`.
2. Identify the user's intent and explicit scope.
3. Identify missing, ambiguous, conflicting, or potentially risky requirements.
4. Ask the human clarification questions.
5. Wait for the human's response.
6. Re-evaluate the requirements using the answers.
7. Ask additional questions if essential ambiguity remains.
8. Draft the requirements.
9. Present the requirements for human review.
10. Incorporate approved corrections.
11. Generate the final `requirements.md`.
12. Stop.

## Question Policy

Questions should be:

- necessary;
- specific;
- easy to answer;
- focused on product behavior;
- grouped together where practical.

Do not ask questions merely to increase interaction.

Do not ask about implementation details unless they materially affect a requirement.

## Assumption Policy

Do not convert assumptions into confirmed requirements.

If an assumption is unavoidable, identify it explicitly and request human confirmation.

## Scope Boundary

Do not perform:

- architecture design;
- UI design;
- implementation planning;
- coding;
- testing implementation;
- code review;
- PR creation.

Those activities belong to later SDLC phases.

## Completion Condition

The Requirements phase is complete only after the human approves the final requirements.

After completion, stop and wait for explicit authorization to begin Architecture.