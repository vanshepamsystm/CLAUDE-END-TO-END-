# Implementation Skill

## Purpose

Provide a repeatable procedure for implementing the Todo application from an approved implementation plan, and a verification checklist for confirming the result against approved requirements and architecture.

---

## Procedure

### Step 1 — Read the Approved Implementation Plan

Read `implementation-plan.md` in full: task backlog, dependency order, file impact, requirements traceability, risks, and the implementation boundary statement.

### Step 2 — Read the Approved Architecture and Requirements

Read `architecture.md` and `requirements.md` to confirm the exact behavior each task must implement, and `design-review.md` for any binding clarifications.

### Step 3 — Implement Tasks in Dependency Order

Implement IP-001 through IP-013 in the approved sequence, without skipping dependencies or implementing unrelated work.

### Step 4 — Implement the Task Store

Implement the in-memory task array with stable, title-independent unique IDs, newest-first insertion order, title validation (reject empty/whitespace-only, no trimming), and independent handling of duplicate titles.

### Step 5 — Implement the Persistence Layer

Implement `load()` and `save(tasks)` exactly per the approved contract: `load()` distinguishes `ok` (including absent-key first run), `unavailable`, and `malformed`, and never writes; `save()` distinguishes `ok`/`failed`, performs one `stringify`+`setItem` call, and never retries. Preserve in-memory state on failure.

### Step 6 — Implement the UI Layer

Implement rendering of the combined task list with a completed indicator, using semantic native elements, and wire up create/complete/reopen/delete controls.

### Step 7 — Handle localStorage Failure Cases

Ensure `unavailable` and `malformed` statuses do not crash the application, and that the UI surfaces the current `persistenceStatus` as a single notice line.

### Step 8 — Implement Safe Text Rendering

Render all task titles using `textContent` (or an equivalent text-only API); never use `innerHTML` for user-provided content.

### Step 9 — Implement Keyboard Accessibility

Ensure every control is a native, keyboard-operable element, and that DOM order produces a logical tab order matching the visual layout.

### Step 10 — Implement Focus Management

Return focus to the title input after a create; move focus to the title input after a delete; never leave focus on a removed element.

### Step 11 — Implement Responsive Behavior

Use relative units and a flex/stack layout so the interface remains usable without horizontal scrolling or overlapping controls at mobile widths.

### Step 12 — Maintain Requirements Traceability

While implementing, keep track of which FR/NFR/AC each piece of code satisfies, using `implementation-plan.md`'s traceability table as the reference.

### Step 13 — Verify Implementation Against Acceptance Criteria

Perform implementation-level verification (functional, persistence, security, accessibility, responsive) using a browser/runtime where available; otherwise perform the strongest available static/code-level review and report exactly what could and could not be verified.

### Step 14 — Keep Scope Controlled

Do not implement editing, filtering, search, categories, priorities, due dates, authentication, backend calls, or any feature not present in `implementation-plan.md`.

---

## Verification Checklist

- [ ] Valid task creation; empty/whitespace-only titles rejected; exact title (including surrounding whitespace) preserved.
- [ ] Duplicate titles produce independent tasks with distinct, stable, title-independent IDs.
- [ ] New tasks appear first; completing/reopening does not change ordering.
- [ ] Completed and incomplete tasks appear together with a clear visual indicator.
- [ ] Deletion is immediate, with no confirmation step.
- [ ] Tasks persist across refresh and reopening.
- [ ] Absent storage key is treated as a normal, non-error first run.
- [ ] Unavailable storage does not crash the app and is surfaced to the user.
- [ ] Malformed stored data is not overwritten by `load()` and is surfaced to the user.
- [ ] A failed `save()` preserves in-memory state and is surfaced to the user, with no automatic retry.
- [ ] An HTML/script-like title renders as literal text and never executes.
- [ ] All controls are semantic, native, and keyboard-operable in a logical tab order.
- [ ] Focus returns to the title input after create and after delete.
- [ ] Layout remains usable, with no horizontal scrolling or overlap, at mobile widths.
- [ ] No unapproved feature or architectural element was introduced.
