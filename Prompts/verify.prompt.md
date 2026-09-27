# Verify Phase Execution Prompt

Act as the Verify Agent.

Follow:

- `CLAUDE.md`
- Shared Instructions (`Instructions/instructions.md`)
- `Agents/verify.agent.md`
- `Skills/verify/SKILL.md`

Read:

- `user_story.md`
- `requirements.md` (approved)
- `architecture.md` (approved)
- `design-review.md` (approved)
- `implementation-plan.md` (approved)
- `review.md` (approved)
- `index.html`, `styles.css`, `app.js` (Step 5 implementation)

Your task is to execute only the Verify phase.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- modify `index.html`, `styles.css`, or `app.js`;
- modify `requirements.md`, `architecture.md`, `design-review.md`, `implementation-plan.md`, or `review.md`;
- fix any discovered defect without explicit human approval — document it and stop instead;
- add features not present in `implementation-plan.md`;
- install new verification dependencies or tooling (e.g. Playwright, Puppeteer) not already available in the environment;
- create Pull Request artifacts or start the Pull Request phase;
- commit anything before the verification results, and then the final `verify.md`, have each been explicitly approved by the human;
- push to the remote.

## Workflow

1. Read the approved source artifacts, `review.md`, and the Step 5 implementation. Confirm none have been modified since their approval.
2. Individually verify AC-1 through AC-18 with method, actual result, PASS/FAIL/BLOCKED, and evidence. Do not mark PASS without evidence, and do not claim physical keyboard interaction unless actually performed.
3. Actually execute (or explicitly mark BLOCKED with a reason) functional, persistence, security, accessibility, and responsive verification, using the strongest practical method — prefer real headless-browser execution and actual DOM/`localStorage` behavior over static inspection, reusing the Step 5 methodology and existing Chrome installation without adding any new dependency.
4. Verify consistency with `architecture.md` and `implementation-plan.md`, and re-verify the Step 5 mobile-layout fix and the continued accuracy of REV-1/REV-2/REV-3.
5. Delete any temporary verification harness files created during this process.
6. If an actual defect is discovered, do not fix it — record it with evidence and the affected requirement/architecture/plan reference, and stop to ask the human before any corrective cycle.
7. Present the full verification results (scope, methods, AC-1–AC-18 results, functional/persistence/security/accessibility/responsive results, architecture/regression results, failures, blocked tests, limitations, and whether corrective implementation is required) to the human. Do not create `verify.md` yet.
8. Wait for explicit human approval of the verification results.
9. Create `verify.md` only after that approval, reflecting exactly the approved results.
10. Wait for explicit human approval of the final `verify.md`.
11. Stage and commit only the Verify-phase files.
12. Report the commit hash, committed files, and Git status.
13. Stop.

## Important

Do not claim a verification step was performed if it was not actually performed. Distinguish real execution from static/code-level inspection at every step.

Do not silently modify the implementation or any approved artifact, including `review.md`.

Do not create `verify.md` before the human reviews and approves the verification results.

Do not proceed to the Pull Request phase automatically.

The human must explicitly approve the Verify phase before Step 8 — Pull Request begins.
