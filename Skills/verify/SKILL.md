# Verify Skill

## Purpose

Provide a repeatable procedure for independently verifying — through actual execution wherever practical — that the implemented Todo application behaves as required by the approved acceptance criteria, requirements, architecture, and implementation plan, producing honest, evidence-based results prior to human approval and prior to producing `verify.md`.

---

## Procedure

### Step 1 — Read Source of Truth

Read `CLAUDE.md`, `Instructions/instructions.md`, `user_story.md`, `requirements.md`, `architecture.md`, `design-review.md`, `implementation-plan.md`, and `review.md` in full.

### Step 2 — Read the Implementation

Read `index.html`, `styles.css`, `app.js` in full. Confirm, via `git diff`/`git status` against the last approved commit, that none of these files nor any prior approved artifact has been modified since Step 6. Do not modify any of them during Verify.

### Step 3 — Prepare a Verification Harness (Temporary Only)

Where real execution is practical, build a temporary, disposable harness reusing the Step 5 headless-Chrome methodology:

- Use the confirmed Chrome executable already installed in the environment.
- Use a CSS-sized `<iframe>` embedding the real `index.html` for trustworthy viewport/layout measurement rather than relying on `--window-size` for the top-level page.
- Use the `--allow-file-access-from-files` flag when a `file://` iframe must access `.contentDocument` across origins.
- Never write a literal `</script` byte sequence inside an inline `<script>` block's text, even inside a JS string; split it via concatenation.
- Delete every temporary harness file before finalizing the phase.

Do not install Playwright, Puppeteer, or any other new dependency. If real execution is impractical for a given check, fall back to static/code-level inspection and report it explicitly as static evidence, not as an executed test.

### Step 4 — Verify Acceptance Criteria (AC-1–AC-18)

For each AC in `requirements.md` §8, record: AC ID, expected behavior, verification method actually used, actual result, PASS/FAIL/BLOCKED, evidence, and any limitation. Never mark PASS without evidence. Never claim physical keyboard interaction unless it was actually performed.

### Step 5 — Functional Verification

Actually exercise (or, if blocked, explicitly state why not) task creation (valid title, empty/whitespace-only title, exact-text preservation), display (newest-first order, combined list), completion/reopen (indicator, no reordering, per-ID targeting with duplicate titles), and deletion (immediate, no confirmation, per-ID targeting).

### Step 6 — Persistence Verification

Actually exercise: normal save/reload round-trip; reopening the app if the environment permits; storage-unavailable simulation; malformed stored-data simulation (including verifying that a subsequent explicit user mutation still behaves correctly against the malformed-then-recovered state); write-failure simulation confirming no rollback and no retry of the in-memory change.

### Step 7 — Security Verification

Actually create a task titled `<script>window.__xss_ran=1</script>` at minimum and confirm literal rendering, no script execution, and no unsafe `innerHTML` use; also consider `<img src=x onerror=alert(1)>`. Do not introduce security tooling not already available.

### Step 8 — Accessibility Verification

Verify semantic HTML, native controls, labels, DOM order, and the absence of unnecessary `tabindex` (structural inspection). Verify that native controls are keyboard-operable and that focus returns to the title input after create and after delete, using whatever real interaction is available (programmatic DOM events at minimum; real keyboard-input automation only if it is already available without adding a dependency). Explicitly state, for each accessibility item, whether it was structurally verified, physically exercised, or left untested — do not blur these categories, and preserve the physical-Tab-key-traversal limitation if it remains unaddressed.

### Step 9 — Responsive Verification

Actually measure layout at 375px and at 1024px viewport widths (via the iframe-measurement technique), confirming no horizontal overflow, no overlap, and full visibility/usability of controls at both sizes, and re-confirm the mobile layout switch and natural control heights.

### Step 10 — Architecture/Implementation-Plan/Regression Verification

Confirm no backend, framework, package manager, or network call has been introduced; confirm `localStorage` remains the sole persistence mechanism; confirm consistency with `architecture.md` and `implementation-plan.md`; confirm no unplanned feature exists; confirm no approved artifact was accidentally changed. Re-verify the Step 5 mobile flex-basis fix is present and effective. Confirm REV-1, REV-2, and REV-3 remain accurately characterized (not silently "fixed") unless verification reveals an actual approved-requirement failure.

### Step 11 — Failure Handling

If any actual defect is found, do not fix it. Record the defect, the evidence, and the specific requirement/architecture/plan element it affects, then stop and ask the human for approval before any corrective implementation cycle. Do not commit a fix during Verify without explicit authorization.

### Step 12 — Human Review and Approval of Results

Present the full verification results (scope, methods, AC-1–AC-18 results, functional/persistence/security/accessibility/responsive results, architecture/regression results, any failures or blocked tests, limitations, and whether corrective implementation is required) to the human. Do not create `verify.md` yet. Wait for explicit approval.

### Step 13 — Produce `verify.md`

Create the document only after human approval of the results, reflecting exactly what was approved. Never claim a test was performed if it was not.

### Step 14 — Commit Only After Approval

Remove any remaining temporary harness files. Stage and commit only the Verify-phase files, only after the human has explicitly approved the final `verify.md`.

---

## Required Output Structure for `verify.md`

1. Verification Objective
2. Verification Inputs
3. Verification Environment and Method
4. Acceptance Criteria Verification (AC-1–AC-18)
5. Functional Verification
6. Persistence Verification
7. Security Verification
8. Accessibility Verification
9. Responsive Verification
10. Architecture/Implementation-Plan Verification
11. Regression Verification
12. Test Results Summary
13. Known Limitations
14. Human-Approved Dispositions
15. Overall Verification Conclusion
16. Final Verification Checklist

If a check could not be executed, state that explicitly and classify it as BLOCKED with the reason, rather than omitting it or reporting it as PASS.

---

## Quality Gate

Before declaring the Verify phase complete, verify:

- [ ] Every AC-1–AC-18 was individually verified with method, result, and evidence — none marked PASS without evidence.
- [ ] No claim of physical keyboard interaction was made unless it was actually performed.
- [ ] Functional, persistence, security, accessibility, and responsive checks were actually executed wherever practical; any that were not are explicitly marked BLOCKED with a reason.
- [ ] No new dependency or tooling (e.g. Playwright, Puppeteer) was installed.
- [ ] Any discovered defect was reported to the human, not silently fixed.
- [ ] No implementation file or approved artifact (including `review.md`) was modified during Verify.
- [ ] All temporary harness files were deleted before finalization.
- [ ] Human approval of results was obtained before `verify.md` was created.
- [ ] Human approval of the final `verify.md` was obtained before any commit.
- [ ] No Pull Request artifact was created.
