# PR Phase Execution Prompt

Act as the PR Agent.

Follow:

- `CLAUDE.md`
- Shared Instructions (`Instructions/instructions.md`)
- `Agents/pr.agent.md`
- `Skills/pr/SKILL.md`

Read:

- `user_story.md`
- `requirements.md` (approved)
- `architecture.md` (approved)
- `design-review.md` (approved)
- `implementation-plan.md` (approved)
- `review.md` (approved)
- `verify.md` (approved)
- `index.html`, `styles.css`, `app.js` (implementation)

Your task is to execute only the PR phase: prepare the completed and approved SDLC work for a Pull Request. Do not redesign, reimplement, or add features to the Todo application.

## Workflow

1. Inspect the completed SDLC artifacts listed above and confirm each phase's artifact exists and was approved.
2. Inspect Git state: current branch, remote configuration, `git status`, recent commit history, and the local branch's position relative to its remote (ahead/behind). Confirm the expected Steps 1–7 commit sequence is present and the working tree is clean, or explicitly document anything that is not.
3. Validate PR readiness: confirm requirements were implemented, architecture was followed, the implementation plan was completed, review was completed, verification was completed, known limitations are represented accurately, and no unintended files are included.
4. Prepare the PR description: title, summary, SDLC evidence (citing the actual artifacts), functional scope (only implemented capabilities), validation (from `verify.md`, preserving the AC-15 structural/programmatic-vs-physical-key-press distinction exactly), review findings (REV-1/REV-2/REV-3, no invented findings), technology (actual stack only), and known limitations (only those supported by `review.md` and `verify.md`).
5. Summarize the evidence supporting readiness (or non-readiness).
6. Identify known limitations and any blockers to creating the PR.
7. Stop and present: the Step 8 files created, repository status, the relevant Steps 1–7 commit history, the PR readiness result, the complete proposed PR title, the complete proposed PR description, and any remaining limitations or blockers. Request explicit human approval before proceeding further.

## Phase Rules

Do not:

- add, remove, or reinterpret product requirements;
- modify `index.html`, `styles.css`, or `app.js`;
- modify `requirements.md`, `architecture.md`, `design-review.md`, `implementation-plan.md`, `review.md`, or `verify.md`;
- fix any discovered issue without explicit human approval — document it and stop instead;
- add features not present in `implementation-plan.md`;
- install new dependencies or tooling;
- claim physical keyboard testing was performed — it was not, and this remains a documented limitation;
- claim a PR was created unless it actually was;
- claim the branch was pushed unless it actually was;
- fabricate GitHub information (URLs, PR numbers, or status);
- push to the remote, create the Pull Request, merge, rewrite history, or force-push before the corresponding explicit human approval;
- treat approval of the PR-preparation stage as approval to push or to create the PR — each is a separate gate;
- start any further SDLC phase.

## After Human Approval of PR Preparation

Only after the human explicitly approves the PR preparation:

1. Commit only the Step 8 artifacts (`Agents/pr.agent.md`, `Skills/pr/SKILL.md`, `Prompts/pr.prompt.md`) if not already committed, and report the commit hash.
2. Ask for explicit approval before pushing, if push has not yet been authorized.
3. Push only after that explicit approval.
4. Create the Pull Request only after a further explicit approval.
5. Report the actual PR URL and the final repository state.

## Important

Do not skip any human approval gate. Do not start another SDLC phase. Do not modify the Todo implementation or any previously approved artifact. Do not add dependencies or features. Do not silently fix issues. Use repository artifacts as the source of truth; do not invent information.
