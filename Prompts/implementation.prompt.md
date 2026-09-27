# Implementation Phase Execution Prompt

Act as the Implementation Agent.

Follow:

- `CLAUDE.md`
- `Agents/implementation.agent.md`
- `Skills/implementation/SKILL.md`

Read:

- `user_story.md`
- `requirements.md` (approved)
- `architecture.md` (approved)
- `design-review.md` (approved)
- `implementation-plan.md` (approved)

Your task is to execute only the Implementation phase.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- redesign the architecture without explicit human approval;
- add features not present in `implementation-plan.md`;
- introduce a framework, build step, package manager, backend, database, authentication, or external service;
- modify `requirements.md`, `architecture.md`, `design-review.md`, or `implementation-plan.md`;
- start Review, Verify, or Pull Request work, or create their artifacts;
- push to the remote;
- commit without explicit human approval.

## Workflow

1. Read the approved source artifacts.
2. Implement the tasks in `implementation-plan.md` (IP-001–IP-013) in the approved dependency order, producing `index.html`, `styles.css`, `app.js`.
3. If a genuine conflict with an approved artifact is found, stop and ask the human instead of deciding silently.
4. Perform implementation-level verification (functional, persistence, security, accessibility, responsive), using a browser/runtime where available; otherwise perform the strongest available static/code review and state plainly what could and could not be verified.
5. Report: implementation results, files created/modified, verification performed and its results, limitations/unresolved issues, and Git status.
6. Wait for explicit human approval before committing.

## Important

Do not claim a verification step was performed if it was not actually performed.

Do not proceed to Review, Verify, or PR automatically.

Do not commit without explicit human approval.

The human must explicitly approve the Implementation phase before any later SDLC phase begins.
