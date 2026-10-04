# Implementation Plan: Todo Task Management

## 1. Overview

The Implementation phase will build a static, client-only Todo application: one HTML page with semantic controls for creating, listing, and bulk-clearing completed tasks, one stylesheet for a simple responsive layout, and one JavaScript file implementing the Task Store (in-memory state, validation, ID/ordering rules, clear-completed) and the Persistence Layer (`localStorage` load/save with the `ok`/`unavailable`/`malformed`/`failed` contract), wired to the UI per `architecture.md`.

File organization (approved): `index.html`, `styles.css`, `app.js`.

## 2. Implementation Task Backlog

### IP-001 — Static HTML structure & semantic controls
- **Priority:** Foundational
- **Objective:** Base page markup with semantic elements for title input, submit control, task list container, and notice line.
- **Description:** `<input>` for title, native `<button>` to submit, a list container for tasks; DOM order matches intended visual/tab order.
- **Requirements covered:** FR-1, FR-5; NFR-4, NFR-6
- **Acceptance criteria covered:** AC-1, AC-5, AC-14, AC-15
- **Architecture components affected:** UI Layer (§7, §13)
- **Files expected to be created/modified:** `index.html` (create)
- **Dependencies:** none
- **Verification expectations:** Semantic elements are present and correctly typed for their function; DOM order is logical (title input, then list).

### IP-002 — Baseline styles & responsive layout
- **Priority:** Foundational
- **Objective:** Minimal CSS for a legible desktop/mobile layout.
- **Description:** Relative units, flex/stack layout, no fixed-width elements that would force horizontal scrolling.
- **Requirements covered:** NFR-8
- **Acceptance criteria covered:** AC-17
- **Architecture components affected:** UI Layer (§13)
- **Files expected to be created/modified:** `styles.css` (create)
- **Dependencies:** IP-001
- **Verification expectations:** At a mobile-width viewport, all controls remain visible, reachable, and operable without horizontal scrolling or overlapping elements.

### IP-003 — Task Store data model & in-memory state
- **Priority:** Foundational
- **Objective:** Canonical in-memory task array and ID/ordering rules.
- **Description:** `Task = {id, title, completed}`; unique ID generation independent of title; array order equals newest-first display order.
- **Requirements covered:** FR-3, FR-4, FR-10
- **Acceptance criteria covered:** AC-3, AC-4
- **Architecture components affected:** Task Store (§9, AD-3)
- **Files expected to be created/modified:** `app.js` (create)
- **Dependencies:** none
- **Verification expectations:** Duplicate-titled tasks receive distinct IDs and behave independently; newly created tasks are prepended to the list.

### IP-004 — Task creation logic & validation
- **Priority:** Core
- **Objective:** Implement the create-task operation with title validation.
- **Description:** Reject empty/whitespace-only titles (no task added, no trimming applied); otherwise create the task with the exact entered title.
- **Requirements covered:** FR-1, FR-2
- **Acceptance criteria covered:** AC-1, AC-2
- **Architecture components affected:** Task Store (§7, §8)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-003
- **Verification expectations:** Whitespace-only/empty input adds no task; valid input preserves the exact entered string, including surrounding whitespace.

### IP-005 — Complete/Reopen operations
- **Priority:** Core
- **Objective:** Toggle a task's completed state by ID.
- **Requirements covered:** FR-6, FR-7, FR-8
- **Acceptance criteria covered:** AC-6, AC-7, AC-8
- **Architecture components affected:** Task Store (§8)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-003
- **Verification expectations:** Toggling a task by ID changes only that task's state and indicator; no other task is affected.

### IP-006 — Delete operation
- **Priority:** Core
- **Objective:** Remove a task by ID, immediately, with no confirmation.
- **Requirements covered:** FR-9
- **Acceptance criteria covered:** AC-9
- **Architecture components affected:** Task Store (§8)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-003
- **Verification expectations:** Deletion is immediate, requires no confirmation step, and affects only the targeted task.

### IP-007 — Persistence Layer: `load()`/`save()` contract
- **Priority:** Foundational
- **Objective:** Implement the storage adapter with the exact `ok`/`unavailable`/`malformed`/`failed` status contract.
- **Description:** Sequential determination per architecture §10 (read failure/API absent → `unavailable`; parse/shape failure → `malformed`; absent key → `ok` with empty list; successful read/parse → `ok` with tasks). `load()` never writes. `save()` performs one `stringify` + one `setItem` call and reports `ok`/`failed`.
- **Requirements covered:** FR-11, FR-12, FR-13, FR-14
- **Acceptance criteria covered:** AC-10, AC-11, AC-12, AC-13
- **Architecture components affected:** Persistence Layer (§10, §11, AD-4, AD-6)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** none
- **Verification expectations:** Each of the four statuses is independently reproducible and matches its defined trigger condition; malformed existing data is never overwritten by `load()`.

### IP-008 — Wire Task Store to Persistence Layer
- **Priority:** Core
- **Objective:** Integrate startup load and post-mutation save.
- **Description:** Call `load()` once at startup to initialize state; call `save()` after every create/complete/reopen/delete mutation; retain only the single latest status as `persistenceStatus`.
- **Requirements covered:** FR-11, FR-12, FR-13, FR-14 (integration)
- **Acceptance criteria covered:** AC-10, AC-11, AC-12, AC-13
- **Architecture components affected:** Task Store + Persistence Layer (§5, §8, §10)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-003, IP-004, IP-005, IP-006, IP-007
- **Verification expectations:** Exactly one `load()` call at startup; one `save()` call per mutation; `persistenceStatus` always reflects the most recent call's result.

### IP-009 — UI rendering: task list & completed indicator
- **Priority:** Core
- **Objective:** Render the combined list with a clear completed/incomplete distinction, safely.
- **Description:** Titles are rendered using `textContent` only, never `innerHTML`.
- **Requirements covered:** FR-5, FR-6, NFR-2, NFR-9
- **Acceptance criteria covered:** AC-5, AC-6, AC-18
- **Architecture components affected:** UI Layer (§7, §12, AD-5)
- **Files expected to be created/modified:** `app.js` (modify), `index.html` (template hooks if needed)
- **Dependencies:** IP-001, IP-003
- **Verification expectations:** A title containing HTML/script-like content renders as literal visible text; completed tasks are visually distinguishable from incomplete ones.

### IP-010 — UI event wiring: create/complete/reopen/delete
- **Priority:** Core
- **Objective:** Connect controls to Task Store operations and trigger re-render.
- **Requirements covered:** FR-1, FR-7, FR-8, FR-9; NFR-1, NFR-2
- **Acceptance criteria covered:** AC-1, AC-7, AC-8, AC-9
- **Architecture components affected:** UI Layer (§7, §8)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-004, IP-005, IP-006, IP-009
- **Verification expectations:** Each control triggers only its corresponding Task Store operation; the visible list reflects the change immediately after the action.

### IP-011 — Keyboard accessibility & tab order
- **Priority:** Core
- **Objective:** Ensure the full task lifecycle, including clear-completed, is keyboard-operable in a logical order.
- **Description:** The clear-completed control takes its place in the natural DOM order (input, then list items, then clear-completed control), giving it a correct tab position without custom `tabindex` management.
- **Requirements covered:** NFR-5, NFR-6, FR-15
- **Acceptance criteria covered:** AC-15, AC-19
- **Architecture components affected:** UI Layer (§13)
- **Files expected to be created/modified:** `index.html`, `app.js` (verify no custom `tabindex` management)
- **Dependencies:** IP-001, IP-010, IP-015
- **Verification expectations:** Create, complete, reopen, delete, and clear-completed are each achievable using the keyboard alone; focus order matches the visual layout.

### IP-012 — Focus management after create/delete/clear-completed
- **Priority:** Core
- **Objective:** Implement predictable focus behavior.
- **Description:** After create, focus returns to the title input. After delete or clear-completed, focus moves to the title input; focus is never left on a removed element.
- **Requirements covered:** NFR-7, FR-15
- **Acceptance criteria covered:** AC-16, AC-19
- **Architecture components affected:** UI Layer (§13)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-010, IP-015
- **Verification expectations:** After creating a task, the title input has focus. After deleting a task or clearing completed tasks, the title input has focus.

### IP-014 — Clear Completed operation (Task Store)
- **Priority:** Core
- **Objective:** Implement the bulk clear-completed operation.
- **Description:** Filter the task array to remove every task with `completed === true` in a single operation; call the same `save(tasks)` already used by every other mutation (AD-7) — no new persistence shape introduced.
- **Requirements covered:** FR-15
- **Acceptance criteria covered:** AC-19
- **Architecture components affected:** Task Store (§7, §8, AD-7)
- **Files expected to be created/modified:** `app.js` (modify)
- **Dependencies:** IP-003, IP-007
- **Verification expectations:** Only completed tasks are removed; incomplete tasks and their relative order are unaffected; exactly one `save()` call occurs per activation.

### IP-015 — Clear Completed UI control & wiring
- **Priority:** Core
- **Objective:** Add the Clear Completed control and its enable/disable + event wiring.
- **Description:** Native `<button>`, placed after the task list in DOM order; disabled whenever zero tasks are completed, enabled whenever at least one task is completed, recomputed after every mutation that changes the completed count (create, complete, reopen, delete, clear) — not only recalculated at clear-time itself; wired to IP-014's operation; triggers re-render.
- **Requirements covered:** FR-15, NFR-1, NFR-2, NFR-4, NFR-5, NFR-6
- **Acceptance criteria covered:** AC-19, AC-14, AC-15
- **Architecture components affected:** UI Layer (§7, §13)
- **Files expected to be created/modified:** `index.html` (modify — add button), `app.js` (modify)
- **Dependencies:** IP-001, IP-009, IP-014
- **Verification expectations:** Control is disabled with zero completed tasks and enabled with at least one; activating it removes all completed items from the DOM in a single update; reachable and operable via keyboard alone.

### IP-013 — Persistence status notice UI
- **Priority:** Supporting
- **Objective:** Surface the single current `persistenceStatus` as one non-blocking notice line.
- **Requirements covered:** FR-12, FR-13, FR-14; NFR-1
- **Acceptance criteria covered:** AC-11, AC-12, AC-13
- **Architecture components affected:** UI Layer + status propagation (§7, §10)
- **Files expected to be created/modified:** `index.html` (notice element), `app.js` (modify), `styles.css` (minor)
- **Dependencies:** IP-008, IP-009
- **Verification expectations:** The notice is hidden when `persistenceStatus` is `ok`; it shows the appropriate message for `unavailable`, `malformed`, or `failed`.

## 3. Dependency Order

Recommended implementation sequence:

```
IP-001 → IP-002 → IP-003 → IP-007 → IP-004 → IP-005 → IP-006 → IP-008 → IP-009 → IP-010 → IP-014 → IP-015 → IP-011 → IP-012 → IP-013
```

IP-001/IP-002 (markup/styles) and IP-003/IP-007 (Task Store/Persistence contract) are each internally independent but must precede any task that wires them together (IP-008 onward). IP-014 (Clear Completed operation) depends on the same Task Store/Persistence foundation as the other mutations; IP-015 (its UI control) follows the same pattern as IP-009/IP-010.

## 4. File Impact

| File | Created by | Modified by |
|---|---|---|
| `index.html` | IP-001 | IP-009 (if hooks needed), IP-011, IP-013, IP-015 |
| `styles.css` | IP-002 | IP-013 |
| `app.js` | IP-003 | IP-004, IP-005, IP-006, IP-007, IP-008, IP-009, IP-010, IP-012, IP-013, IP-014, IP-015 |

No other files. No framework, package manager, backend service, database, or authentication is introduced anywhere in this plan, consistent with `architecture.md` §4/§15 and `CLAUDE.md`'s scope control.

## 5. Requirements Traceability

| Requirement | Covered by |
|---|---|
| FR-1 | IP-001, IP-004, IP-010 |
| FR-2 | IP-004 |
| FR-3 | IP-003 |
| FR-4 | IP-003 |
| FR-5 | IP-001, IP-009 |
| FR-6 | IP-005, IP-009 |
| FR-7 | IP-005, IP-010 |
| FR-8 | IP-005, IP-010 |
| FR-9 | IP-006, IP-010 |
| FR-10 | IP-003 |
| FR-11 | IP-007, IP-008 |
| FR-12 | IP-007, IP-008, IP-013 |
| FR-13 | IP-007, IP-008, IP-013 |
| FR-14 | IP-007, IP-008, IP-013 |
| FR-15 | IP-014, IP-015, IP-011, IP-012 |
| NFR-1 | IP-010, IP-013, IP-015 |
| NFR-2 | IP-009, IP-010, IP-015 |
| NFR-3 | Cross-cutting — no task introduces a framework/build step |
| NFR-4 | IP-001, IP-015 |
| NFR-5 | IP-011, IP-015 |
| NFR-6 | IP-001, IP-011, IP-015 |
| NFR-7 | IP-012 |
| NFR-8 | IP-002 |
| NFR-9 | IP-009 |

Every functional and non-functional requirement has at least one covering task.

## 6. Risks and Considerations

- **localStorage unavailable** (FR-12/§11): must be handled without crashing; every subsequent `save()` will still be attempted per architecture.
- **Malformed stored data** (FR-13/§11): `load()` must never write — implementation must not "repair" or clear storage on load.
- **Failed writes** (FR-14/§11): a caught `setItem` exception must not alter in-memory state or trigger a retry.
- **Stable, unique ID generation** (FR-3/AD-3): the chosen ID scheme must not risk collisions across the session.
- **Newest-first ordering drift** (AD-3): array order in memory and in the persisted JSON must stay identical; care needed to avoid accidental re-sorting.
- **Safe text rendering** (NFR-9/AD-5): risk of accidentally using `innerHTML` for convenience instead of `textContent`.
- **Keyboard accessibility** (NFR-5/NFR-6): risk of introducing non-native custom controls that silently break default keyboard behavior.
- **Focus loss on delete** (NFR-7): re-rendering the list after a deletion risks leaving focus on a removed/detached element if not explicitly redirected.
- **Responsive layout overflow** (NFR-8): fixed-width elements could cause horizontal scrolling at mobile widths.
- **Stale disabled-state on Clear Completed** (FR-15/§8/§13): the control's disabled condition must be recomputed after every mutation that changes the completed count (create, complete, reopen, delete), not only recalculated at clear-time itself — otherwise the control can show an incorrect enabled/disabled state.

All risks above are grounded in `architecture.md` and `design-review.md`; none are invented beyond those artifacts.

## 7. Implementation Boundary

This phase produces the plan only. No application source code, styles, or scripts have been created. No tests have been written. No Implementation, Review, Verify, or Pull Request artifacts exist yet. Production implementation (creating/modifying `index.html`, `styles.css`, `app.js`, and any tests) must happen only in the later, separately-authorized Implementation phase.
