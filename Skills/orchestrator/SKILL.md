# Orchestrator Skill

## Purpose

Provide a repeatable procedure for running the Agentic SDLC pipeline end-to-end — Requirements through PR — by delegating each phase to its own existing Agent, Skill, and Prompt files, tracking progress in a single `pipeline-status.md`, and automatically advancing to the next phase after explicit human approval of the current one.

---

## Phase Map

| # | Phase | Agent | Skill | Prompt | Primary Artifact(s) |
|---|---|---|---|---|---|
| 1 | Requirements | `Agents/requirements.agent.md` | `Skills/requirements/SKILL.md` | `Prompts/requirements.prompt.md` | `requirements.md` |
| 2 | Architecture | `Agents/architecture.agent.md` | `Skills/architecture/SKILL.md` | `Prompts/architecture.prompt.md` | `architecture.md` |
| 3 | Design Review | `Agents/design-review.agent.md` | `Skills/design-review/SKILL.md` | `Prompts/design-review.prompt.md` | `design-review.md` |
| 4 | Implementation Planning | `Agents/implementation-planning.agent.md` | `Skills/implementation-planning/SKILL.md` | `Prompts/implementation-planning.prompt.md` | `implementation-plan.md` |
| 5 | Implementation | `Agents/implementation.agent.md` | `Skills/implementation/SKILL.md` | `Prompts/implementation.prompt.md` | `index.html`, `styles.css`, `app.js` |
| 6 | Review | `Agents/review.agent.md` | `Skills/review/SKILL.md` | `Prompts/review.prompt.md` | `review.md` |
| 7 | Verify | `Agents/verify.agent.md` | `Skills/verify/SKILL.md` | `Prompts/verify.prompt.md` | `verify.md` |
| 8 | PR | `Agents/pr.agent.md` | `Skills/pr/SKILL.md` | `Prompts/pr.prompt.md` | `pr.md`, the Pull Request |

This table must be used as-is to resolve which files govern a phase. Do not substitute, skip, or reorder entries.

---

## Dependency Chain (for Drift Detection)

Each phase's primary input is the previous phase's primary artifact, except Requirements, whose input is `user_story.md`:

`user_story.md` → (1) `requirements.md` → (2) `architecture.md` → (3) `design-review.md` → (4) `implementation-plan.md` → (5) `index.html`/`styles.css`/`app.js` → (6) `review.md` → (7) `verify.md` → (8) `pr.md`

---

## Procedure

### Step 1 — Load Pipeline State

Read `pipeline-status.md`.

- If it does not exist, create it using the template in "Status File Format" below, seeded by inspecting the repository for which phase artifacts already exist and appear approved (do not guess — check the actual files and, where in doubt, ask the human), and seed each `Fingerprint` cell with `git hash-object <artifact>` for that phase's artifact(s).
- If it exists, proceed to Step 1a before trusting any row's status.

### Step 1a — Detect Drift

For each phase in pipeline order, starting from Requirements:

1. Recompute the current fingerprint of that phase's primary artifact(s) with `git hash-object <file>` (one hash per file; for multi-file artifacts, e.g. Implementation, record all three).
2. Compare it to the `Fingerprint` recorded in `pipeline-status.md`.
3. If they differ — the artifact was hand-edited outside the orchestrator, or (for Requirements) `user_story.md` itself changed — mark that phase `Not Started`, clear its recorded fingerprint, and mark **every phase after it** `Not Started` too, per the Dependency Chain above (a downstream phase cannot stay `Approved` once something it depends on has changed).
4. A phase already sitting at `Not Started`/`In Progress`/`Awaiting Approval`/`Rejected` is left as-is; drift detection only ever downgrades an `Approved` row, never upgrades one.

Report any drift found (which phase, which file changed) before proceeding.

Then identify the first phase whose status is not `Approved` — this is the phase to run next.

If no phase is non-`Approved` after drift detection, the pipeline is genuinely complete and unchanged: report this and stop.

### Step 2 — Resolve the Phase

Using the Phase Map, resolve the Agent, Skill, and Prompt file for the phase identified in Step 1.

If any of those three files is missing for that phase, stop and report this to the human — do not improvise phase behavior that isn't defined in its own files.

### Step 3 — Execute the Phase

Adopt the role defined in that phase's `Agents/<phase>.agent.md`. Follow the procedure defined in that phase's `Skills/<phase>/SKILL.md`, exactly as if that phase's `Prompts/<phase>.prompt.md` had been invoked directly.

Do not alter, shortcut, or add to that phase's own procedure or quality gate. The Orchestrator's only job here is to trigger it with the correct inputs (the prior phases' approved artifacts).

Mark the phase `In Progress` in `pipeline-status.md` while this is happening.

### Step 4 — Present for Approval

When the phase's own completion criteria are met (its artifact exists and its own quality gate is satisfied), present:

- the artifact produced (or changed);
- that phase's own quality-gate checklist, checked off;
- anything that phase's own agent is required to surface (limitations, assumptions, open questions).

Mark the phase `Awaiting Approval` in `pipeline-status.md`.

Stop and wait. Do not proceed, and do not treat silence as approval.

### Step 5 — Handle the Human's Response

- **Explicit approval** ("approved", "looks good, continue", or equivalent unambiguous affirmation of this specific phase's artifact): go to Step 6.
- **Rejection or requested changes**: keep the phase at `In Progress`, incorporate the feedback by re-running that phase's own procedure, and return to Step 4. Do not advance.
- **Pause/stop instruction**: stop immediately, leaving `pipeline-status.md` at its current state. Do not advance.

### Step 6 — Record Approval and Advance

Update `pipeline-status.md` for the just-approved phase: status `Approved`, approval timestamp, artifact reference, and the fingerprint — `git hash-object` of the artifact(s) as they exist right now, post-approval. This recorded fingerprint is what the next run's Step 1a will compare against.

If the phase just approved was PR: the pipeline is complete. Report this and stop.

Otherwise: return to Step 1 and continue immediately with the next phase, without waiting for a new "run orchestrator" instruction. The only thing that gates continuation is the human approval already received in Step 5 — no additional invocation is required.

### Step 7 — Respect Inner Phase Gates

Some phases define their own approval gates beneath the phase-level artifact approval (for example: Implementation's pre-commit approval; Review and Verify's rule not to push; PR's separate push approval and PR-creation approval). These are not satisfied by the Step 5 phase-level approval. When executing a phase in Step 3, still honor every inner gate exactly as that phase's own Agent/Skill files require it.

---

## Status File Format

`pipeline-status.md` must contain one table with these columns:

| Phase | Status | Artifact(s) | Fingerprint | Approved On | Notes |
|---|---|---|---|---|---|

Valid `Status` values: `Not Started`, `In Progress`, `Awaiting Approval`, `Approved`, `Rejected`.

`Fingerprint` holds the `git hash-object` value(s) of the artifact(s) as they stood at the moment of approval — empty for any phase not currently `Approved`.

Only one phase should be `In Progress` or `Awaiting Approval` at a time. A phase must not be `Approved` while an earlier phase is not `Approved`.

---

## Quality Gate

Before reporting the orchestrator run as complete or paused, confirm:

- [ ] `pipeline-status.md` was read (or created) before any phase work began.
- [ ] Drift detection (Step 1a) was run against real `git hash-object` values before trusting any `Approved` row — not assumed from the file alone.
- [ ] Any detected drift correctly cascaded `Not Started` to every downstream phase, not just the directly-changed one.
- [ ] The phase executed matches the first non-`Approved` row, in order — no phase was skipped or reordered.
- [ ] That phase's own Agent/Skill/Prompt files were used unmodified — no phase-specific rule was duplicated, shortcut, or overridden here.
- [ ] No phase advanced without an explicit human approval of that specific phase's artifact.
- [ ] Every inner approval gate a phase defines for itself (commit, push, PR creation, no-push rules) was still honored.
- [ ] `pipeline-status.md` accurately reflects the true state of the repository's artifacts, not an assumed state.
