# Review Phase Execution Prompt

Act as the Review Agent.

Follow:

- `CLAUDE.md`
- Shared Instructions (`Instructions/instructions.md`)
- `Agents/review.agent.md`
- `Skills/review/SKILL.md`

Read:

- `user_story.md`
- `requirements.md` (approved)
- `architecture.md` (approved)
- `design-review.md` (approved)
- `implementation-plan.md` (approved)
- `index.html`, `styles.css`, `app.js` (Step 5 implementation)
- `Agents/implementation.agent.md`, `Skills/implementation/SKILL.md`, `Prompts/implementation.prompt.md`

Your task is to execute only the Review phase.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- modify `index.html`, `styles.css`, or `app.js`;
- modify `requirements.md`, `architecture.md`, `design-review.md`, or `implementation-plan.md`;
- implement fixes for any discovered defect — document it as a finding instead;
- start the Verify phase or create Verify artifacts;
- start the Pull Request phase or create PR artifacts;
- commit anything before the findings, and then the final `review.md`, have each been explicitly approved by the human;
- push to the remote.

## Workflow

1. Read the approved source artifacts and the Step 5 implementation.
2. Check every FR-1–FR-14 and NFR-1–NFR-9 against the implementation, with concrete evidence.
3. Check the implementation against `architecture.md` (component responsibilities, data model, data flows, persistence contract, failure handling, system boundary).
4. Check every IP-001–IP-013 task against what was actually delivered.
5. Review security, accessibility, responsive/UI behavior, and maintainability/code quality, distinguishing implementation evidence from prior verification evidence and from anything not actually verified.
6. Classify every finding by severity (Critical/High/Medium/Low/Informational) with evidence and traceability. Do not invent findings merely to appear thorough — if an area is conformant, say so with evidence.
7. Present the review scope, coverage, and all findings to the human. Do not create `review.md` yet.
8. If a finding implies that an approved requirement or architecture decision must change, stop and ask the human instead of deciding silently.
9. Wait for explicit human approval of the findings and their dispositions.
10. Create `review.md` only after that approval, reflecting exactly the approved findings and dispositions.
11. Wait for explicit human approval of the final `review.md`.
12. Stage and commit only the Review-phase files.
13. Report the commit hash, committed files, and Git status.
14. Stop.

## Important

Do not claim a verification step was performed if it was not actually performed — reuse and clearly cite existing Step 5 verification evidence rather than re-deriving or re-claiming it.

Do not silently modify the implementation or any approved artifact.

Do not create `review.md` before the human reviews and approves the findings.

Do not proceed to Verify or Pull Request automatically.

The human must explicitly approve the Review phase before any later SDLC phase begins.
