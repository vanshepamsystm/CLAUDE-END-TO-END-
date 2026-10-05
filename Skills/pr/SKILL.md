# PR Skill

## Purpose

Provide a repeatable procedure for preparing the completed, approved Todo Task Management SDLC work (Steps 1–7) for a Pull Request: verifying readiness against the project's own artifacts, drafting an accurate PR description, and gating every push/PR-creation action behind explicit, separate human approval.

---

## Inputs

- `CLAUDE.md`, `Instructions/instructions.md`, `user_story.md`
- `requirements.md`, `architecture.md`, `design-review.md`, `implementation-plan.md`, `review.md`, `verify.md` (all approved)
- `index.html`, `styles.css`, `app.js` (Step 5 implementation, unmodified through Step 7)
- Live Git state: branch, remote, status, log, ahead/behind vs. upstream

## Required Artifacts

Before this phase may proceed, confirm all of the following exist and are committed:

- `requirements.md`, `architecture.md`, `design-review.md`, `implementation-plan.md`, `review.md`, `verify.md`
- `index.html`, `styles.css`, `app.js`
- The Agent/Skill/Prompt artifact set for each of Steps 1–7

If any is missing, PR readiness fails and the phase stops with that finding reported to the human — do not fabricate or backfill a missing artifact.

---

## Procedure

### Step 1 — Inspect Repository State

Check, and report factually (never assume or approximate):

- current branch name
- remote name(s) and URL(s)
- `git status` (clean or not — if not, list exactly what is untracked/modified/staged)
- recent commit history (`git log --oneline`), confirming the expected Steps 1–7 sequence
- the local branch's position relative to its remote tracking branch (ahead/behind counts), via `git status -sb` or equivalent

Do not push anything during this step.

### Step 2 — Create the Step 8 Artifacts

Create `Agents/pr.agent.md`, `Skills/pr/SKILL.md`, `Prompts/pr.prompt.md` per `Agents/pr.agent.md`'s responsibilities. Do not create any other file in this step.

### Step 3 — PR Readiness Analysis

Read every artifact listed under Inputs and the current implementation files. Using only what they actually state, verify:

- every functional and non-functional requirement in `requirements.md` was implemented, per `review.md`'s FR/NFR conformance tables and `verify.md`'s AC-1–AC-18 results;
- the implementation follows `architecture.md` (component separation, data model, persistence contract, failure handling, system boundary), per `review.md` §5 and `verify.md` §10;
- every `implementation-plan.md` task (IP-001–IP-013) was completed, per `review.md` §6 and `verify.md` §11;
- `review.md` was completed and its findings (REV-1, REV-2, REV-3) have approved dispositions;
- `verify.md` was completed, with AC-1–AC-18 results, functional/persistence/security/accessibility/responsive verification, and REV-1/REV-2/REV-3 re-confirmation;
- known limitations are represented accurately and consistently across `review.md` and `verify.md` — in particular, the AC-15 split between structural/programmatic PASS and physical-key-press BLOCKED must not be flattened into a plain PASS or a plain FAIL;
- the working tree is clean, or exactly what is not clean is documented;
- commits are present in the expected phase-by-phase sequence;
- no unintended file (temporary harness, debug output, unrelated file) is tracked or staged.

Do not invent a requirement, finding, or limitation not present in the cited artifacts.

### Step 4 — Construct the PR Description

Build the PR description using only repository evidence, with these sections:

1. **Title** — concise, describing the completed Todo Task Management implementation.
2. **Summary** — what was implemented, in plain terms.
3. **SDLC Evidence** — one line per phase (Requirements, Architecture, Design Review, Implementation Planning, Implementation, Review, Verify), each citing its actual artifact.
4. **Functional Scope** — only the implemented capabilities: create, view, complete/reopen, delete, persistence. Do not describe anything from `requirements.md` §7 (Out of Scope).
5. **Validation** — summarize `verify.md`'s actual results; state the AC-15 limitation exactly: structural/programmatic keyboard evidence passed; physical Tab-key/key-press synthesis was not performed; this is a testing limitation, not a confirmed product defect.
6. **Review Findings** — REV-1, REV-2, REV-3 exactly as `review.md` characterizes them, with their approved dispositions. Do not add a finding not in `review.md`.
7. **Technology** — HTML, CSS, vanilla JavaScript, browser `localStorage`; no framework, backend, or dependency, matching `architecture.md` §4.
8. **Known Limitations** — only limitations stated in `review.md` and/or `verify.md`.

### Step 5 — Human Approval Gate (PR Preparation)

Present: the Step 8 files created, repository status, the Steps 1–7 commit history, the PR readiness result, the complete proposed PR title, the complete proposed PR description, and any remaining limitations or blockers.

Do not push, create the PR, merge, modify the implementation, modify any previously approved artifact, add features, change requirements, rewrite history, or force-push at this stage.

Stop and wait for explicit human approval.

### Step 6 — After Approval

Only after explicit approval of the PR preparation:

1. Commit the three Step 8 artifacts if not already committed; report the commit hash.
2. Ask for explicit approval before pushing, if not yet authorized.
3. Push only after that explicit approval.
4. Create the Pull Request only after a further explicit approval.
5. Report the actual commit hash, push result, and PR URL — never a fabricated one.

Approval of PR preparation is not approval to push. Approval to push is not approval to create the PR. Each is its own gate.

---

## Evidence to Include

- Direct citations to `requirements.md` (FR/NFR/AC IDs), `architecture.md` (section numbers), `implementation-plan.md` (IP IDs), `review.md` (FR/NFR conformance tables, findings table, dispositions), and `verify.md` (AC-1–AC-18 results table, functional/persistence/security/accessibility/responsive sections, regression section).
- Actual `git log`/`git status` output, not a paraphrase.

## Known Limitations (to carry forward, not resolve)

- AC-15 / NFR-5 / NFR-6: physical Tab-key traversal and physical key-press synthesis have not been performed in any phase; this is documented as a testing-tool limitation in `verify.md` §14, not a product defect.
- REV-1 (Low, accessibility): focus falls back to `<body>` on checkbox toggle; does not violate NFR-7, which is scoped to create/delete only.
- REV-2 (Informational, code quality): `deleteTask()` uses its own linear search instead of reusing `findTask()`.
- REV-3 (Informational, testing evidence): keyboard-accessibility conclusions rest on structural/programmatic evidence, not physical key-press synthesis.

## Human Approval Gates

1. Approval of the PR readiness analysis and proposed PR description (Step 5), before any Step 8 commit.
2. Approval to push, separate from the above.
3. Approval to create the Pull Request, separate from both above.

## Prohibited Without Approval

- Committing Step 8 artifacts before Step 5's approval.
- Pushing to the remote.
- Creating the GitHub Pull Request.
- Merging.
- Rewriting history or force-pushing.
- Modifying `index.html`, `styles.css`, `app.js`, or any previously approved SDLC artifact.
- Adding features, requirements, or dependencies.
- Starting any SDLC phase beyond Pull Request.

---

## Quality Gate

Before presenting the Stage 5 human approval gate, confirm:

- [ ] Repository state (branch, remote, status, log, divergence) was actually inspected, not assumed.
- [ ] Every PR-readiness claim cites a real, existing artifact section.
- [ ] The AC-15 limitation is stated with the exact structural/programmatic-vs-physical distinction, not flattened.
- [ ] REV-1/REV-2/REV-3 are represented exactly as `review.md` documents them — no new findings invented.
- [ ] No implementation file or previously approved artifact was modified.
- [ ] No unintended file is included in what would be committed.
- [ ] Nothing has been pushed and no PR has been created.
- [ ] The proposed PR title and description are complete and shown in full to the human.
