# Changelog

All notable changes to the Todo Task Management project, recorded per completed SDLC phase.

## [Unreleased] — Pull Request phase (cycle 2) — 2026-10-04

- Extended `pr.md` and this changelog for the Clear Completed Tasks addition.

## 2026-10-04 — Verify phase, cycle 2 (`d76d9ff`)

- Extended `verify.md`: AC-19 and IP-014/IP-015 verification for Clear Completed Tasks. No live browser was available this session; evidence is static code trace only (REV-4-consistent). No corrective implementation required.

## 2026-10-04 — Review phase, cycle 2 (`a67f8c5`)

- Extended `review.md`: FR-15/IP-014/IP-015 conformance for Clear Completed Tasks; added finding REV-4 (Informational, testing evidence — static-only verification for this addition), dispositioned "no change required."

## 2026-10-04 — Implementation phase, cycle 2 (`a93b9f5`)

- Added the Clear Completed Tasks control: `clear-completed-btn` (`index.html`), `.clear-completed` styling (`styles.css`), and `hasCompletedTasks()`/`clearCompleted()`/`renderClearCompletedButton()` (`app.js`).

## 2026-10-04 — Implementation Planning phase, cycle 2 (`2e3f6d6`)

- Extended `implementation-plan.md`: added IP-014 (Clear Completed operation, Task Store) and IP-015 (Clear Completed UI control & wiring); extended IP-011/IP-012 for tab order and focus management.

## 2026-10-04 — Design Review phase, cycle 2 (`420e754`)

- Extended `design-review.md`: confirmed FR-15/AC-19 coverage sound against AD-7; finding F5 (cosmetic) deferred; no architecture change required.

## 2026-10-04 — Architecture phase, cycle 2 (`9cd5db1`)

- Extended `architecture.md`: added AD-7 (Clear Completed reuses the existing Task Store/Persistence contract unchanged — array filter plus the same `save(tasks)` call; no new component, persistence shape, or status value).

## 2026-10-04 — Requirements phase, cycle 2 (`62675e7`, `ea8d810`)

- Extended `requirements.md`: added FR-15 (Clear Completed Tasks), AC-19, and NFR-5/NFR-7 extensions.
- Extended `user_story.md`: added clearing completed tasks in bulk to the user story and scope — the trigger for this cycle.

## [Unreleased] — Pull Request phase — 2026-09-28

- Added PR-phase artifacts (`Agents/pr.agent.md`, `Prompts/pr.prompt.md`, `Skills/pr/SKILL.md`), the PR description (`pr.md`), and this changelog (`CHANGELOG.md`).

## 2026-09-28 — Verify phase (`eb3602d`)

- Added `verify.md`: execution-based verification of AC-1–AC-18, functional/persistence/security/accessibility/responsive checks, and re-confirmation of REV-1/REV-2/REV-3. No corrective implementation required.
- Added `Agents/verify.agent.md`, `Prompts/verify.prompt.md`, `Skills/verify/SKILL.md`.

## 2026-09-27 — Review phase (`b24da45`)

- Added `review.md`: requirements/architecture/implementation-plan conformance review; findings REV-1 (Low, accessibility), REV-2 (Informational, code quality), REV-3 (Informational, testing evidence), all dispositioned "no change required."
- Added `Agents/review.agent.md`, `Prompts/review.prompt.md`, `Skills/review/SKILL.md`.

## 2026-09-27 — Implementation phase (`7a41d02`)

- Added `index.html`, `styles.css`, `app.js`: the Todo application (create, view, complete/reopen, delete tasks; `localStorage` persistence; no framework or backend).
- Added `Agents/implementation.agent.md`, `Prompts/implementation.prompt.md`, `Skills/implementation/SKILL.md`.

## 2026-09-27 — Implementation Planning phase (`aaa3934`)

- Added `implementation-plan.md`: implementation tasks IP-001–IP-013.
- Added `Agents/implementation-planning.agent.md`, `Prompts/implementation-planning.prompt.md`, `Skills/implementation-planning/SKILL.md`.

## 2026-09-27 — Design Review phase (`069ff7d`)

- Added `design-review.md`: architecture design review findings.
- Added `Agents/design-review.agent.md`, `Prompts/design-review.prompt.md`, `Skills/design-review/SKILL.md`.

## 2026-09-27 — Architecture phase (`f7fd186`)

- Added `architecture.md`: three-layer architecture (UI Layer, Task Store, Persistence Layer), data model, persistence contract.
- Added `Agents/architecture.agent.md`, `Prompts/architecture.prompt.md`, `Skills/architecture/SKILL.md`.

## 2026-09-27 — Requirements phase (`8c11ec8`)

- Added `requirements.md`: FR-1–FR-14, NFR-1–NFR-9, AC-1–AC-18.
- Added `user_story.md`, `CLAUDE.md`, `Instructions/instructions.md`.
- Added `Agents/requirements.agent.md`, `Prompts/requirements.prompt.md`, `Skills/requirements/SKILL.md`, `Hooks/requirements`.

## 2026-09-27 — Initial commit (`0c82a22`)

- Repository initialized.
