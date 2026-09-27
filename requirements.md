# Requirements: Todo Task Management

## 1. Overview

Defines requirements for a simple Todo List application supporting task creation, viewing, completion, reopening, and deletion, derived from `user_story.md` and confirmed product decisions.

## 2. User Story

As a Todo List user, I want to create, view, complete, and delete tasks so that I can keep track of my work.

## 3. Functional Requirements

- **FR-1 — Create Task:** The system shall allow the user to create a new task by entering a title. When the title contains at least one non-whitespace character, the system shall create a new incomplete task with that exact title.
- **FR-2 — Title Validation:** The system shall reject creation of a task whose title is empty or consists only of whitespace; no task shall be added in that case. Titles are not trimmed — if a title contains non-whitespace content, it is stored and displayed exactly as entered, including any leading/trailing whitespace.
- **FR-3 — Unique Task Identifier:** The system shall assign every task a stable, unique identifier at creation time, independent of its title.
- **FR-4 — Newest-First Ordering:** The system shall insert newly created tasks at the top of the task list, so the list is ordered newest-first.
- **FR-5 — View Tasks:** The system shall display all tasks — both incomplete and completed — together in a single combined list.
- **FR-6 — Completed State Indicator:** The system shall visually distinguish completed tasks from incomplete tasks within the list.
- **FR-7 — Complete Task:** The system shall allow the user to mark a specific incomplete task, identified by its unique ID, as completed.
- **FR-8 — Reopen Task:** The system shall allow the user to change a specific completed task, identified by its unique ID, back to incomplete.
- **FR-9 — Delete Task:** The system shall allow the user to delete a specific task, identified by its unique ID, immediately upon request, without a confirmation step.
- **FR-10 — Duplicate Titles / Independent Task Management:** The system shall allow multiple tasks with identical titles to coexist; completing, reopening, or deleting one task (by ID) shall not affect any other task, including one with the same title.
- **FR-11 — Persistence (Save/Load):** The system shall persist tasks and their state (incomplete/completed, ID, title, order) using browser-local storage, and shall reload them on page refresh or application reopening so the list is unchanged.
- **FR-12 — Storage Unavailable:** If browser-local storage is unavailable (e.g., blocked or inaccessible), the system shall continue to function for the current session using in-memory state, and shall indicate to the user that changes will not be saved persistently.
- **FR-13 — Malformed Stored Data:** If previously stored task data cannot be read or parsed, the system shall not automatically overwrite or discard the existing stored data; it shall start the current session with an empty or error-indicated list and shall inform the user that stored data could not be loaded, leaving the original stored data untouched until a subsequent explicit user action produces a new save.
- **FR-14 — Write Failure:** If a write to storage fails, the system shall retain the current in-memory task list without loss for the remainder of the session, shall not partially or silently overwrite existing valid stored data as a result of the failed write, and shall indicate to the user that the change could not be saved.

## 4. Non-Functional Requirements

- **NFR-1 — Usability:** The interface must allow creating, viewing, completing, reopening, and deleting tasks with minimal, direct interaction (no multi-step flows).
- **NFR-2 — Responsiveness:** Task actions (create, complete, reopen, delete) must be reflected in the visible list immediately after the action.
- **NFR-3 — Simplicity/Maintainability:** The implementation must remain intentionally simple, avoiding unnecessary frameworks or backend infrastructure, per project scope control.
- **NFR-4 — Semantic Controls:** Interactive elements (title input, complete/reopen control, delete control) shall use native, semantic HTML elements appropriate to their function (e.g., `<input>`, `<button>`, checkbox-type control), rather than non-semantic elements with attached behavior.
- **NFR-5 — Keyboard Operability:** All task actions (create, complete, reopen, delete) shall be fully operable using the keyboard alone, without requiring a mouse or touch input.
- **NFR-6 — Logical Tab Order:** Keyboard focus order shall follow a logical, predictable sequence matching the visual layout of the task list and controls.
- **NFR-7 — Predictable Focus Behavior:** After a task is created, focus shall return to the title input so another task can be added immediately. After a task is deleted, focus shall move to a predictable, defined element (the title input) rather than being lost or left on a removed element.
- **NFR-8 — Responsive Layout:** The layout must remain usable and legible on both desktop-sized and mobile-sized screens, with all controls visible and operable without horizontal scrolling or overlapping elements.
- **NFR-9 — Safe Title Rendering:** Task titles shall be rendered strictly as text content. User-provided titles shall never be interpreted or executed as HTML, script, or other markup, regardless of their content.

## 5. Constraints

- No authentication or user accounts.
- No collaboration or multi-user features.
- No external services or backend/server-side persistence; persistence is client-side only, using browser-local storage.
- No categories, priorities, due dates, reminders, or search.
- No application-defined maximum number of tasks is required for this iteration.

## 6. Scope

- Creating tasks (title only, non-empty/non-whitespace, exact text preserved).
- Assigning each task a unique, stable identifier.
- Displaying all tasks in one combined list, newest-first.
- Completing and reopening tasks, addressed by unique ID.
- Deleting tasks (immediate, no confirmation), addressed by unique ID.
- Persisting tasks across refresh/reopen via browser-local storage, including defined behavior for storage-unavailable, malformed-data, and write-failure conditions.
- Baseline accessibility (semantic controls, keyboard operability, logical tab order, predictable focus) and responsive layout.
- Safe (text-only) rendering of task titles.

## 7. Out of Scope

- Editing an existing task's title.
- Task descriptions or any fields beyond title.
- Filtering, sorting, or searching tasks.
- Manual/custom reordering of tasks by the user.
- Categories, priorities, due dates, reminders.
- Delete confirmation dialogs.
- Maximum title length or maximum task count limits.
- Authentication, accounts, multi-device sync, or collaboration.
- Server-side persistence, and automatic repair/recovery of corrupted stored data beyond leaving it unmodified.

## 8. Acceptance Criteria

- **AC-1 (FR-1):** Given a title containing at least one non-whitespace character, when the user submits it, a new incomplete task with that exact title is created.
- **AC-2 (FR-2):** Given an empty or whitespace-only title, when the user attempts to submit it, no task is added. Given a title with leading/trailing whitespace and non-whitespace content, when submitted, the created task's title exactly matches the entered string, unmodified.
- **AC-3 (FR-3, FR-10):** Given two tasks created with identical titles, each is assigned a distinct unique ID; completing, reopening, or deleting one has no effect on the other.
- **AC-4 (FR-4):** Given an existing list of tasks, when a new task is created, it appears at the top of the list, above all previously existing tasks.
- **AC-5 (FR-5):** Given tasks in both incomplete and completed states, when the user views the list, all tasks appear together in one list.
- **AC-6 (FR-6):** Given a completed task, when displayed in the list, it is visually marked as completed, distinguishable from incomplete tasks.
- **AC-7 (FR-7):** Given an incomplete task, when the user marks it complete, that specific task's state changes to completed and its indicator updates.
- **AC-8 (FR-8):** Given a completed task, when the user reopens it, that specific task's state changes to incomplete and its indicator updates.
- **AC-9 (FR-9):** Given any task, when the user deletes it, it is immediately removed from the list with no confirmation prompt.
- **AC-10 (FR-11):** Given an existing task list, when the page is refreshed or the application is reopened, all tasks, their titles, IDs, states, and order are unchanged.
- **AC-11 (FR-12):** Given browser-local storage is unavailable, when the user creates, completes, reopens, or deletes tasks, the actions succeed for the current session and the user is informed that changes are not being saved persistently.
- **AC-12 (FR-13):** Given previously stored task data that is malformed or unreadable, when the application loads, it does not crash, the existing stored data is not overwritten or erased, and the user is informed the data could not be loaded.
- **AC-13 (FR-14):** Given a save operation that fails, when it occurs, the current in-memory task list remains intact and visible for the session, existing valid stored data is not corrupted or partially overwritten, and the user is informed the change was not saved.
- **AC-14 (NFR-4):** Inspection of the interface confirms the title input, complete/reopen control, and delete control are implemented with native semantic HTML elements matching their function.
- **AC-15 (NFR-5, NFR-6):** Using only the keyboard, a user can create, complete, reopen, and delete a task, with focus moving in an order matching the visual list layout.
- **AC-16 (NFR-7):** After creating a task, the title input receives focus. After deleting a task, the title input receives focus, and focus is never left on a removed element.
- **AC-17 (NFR-8):** At a mobile-width viewport, all controls remain visible, reachable, and operable without horizontal scrolling or overlapping elements.
- **AC-18 (NFR-9):** Given a task title containing HTML or script-like content (e.g., `<script>alert(1)</script>`), when displayed in the list, it appears as literal visible text and is not executed or rendered as markup.

## 9. Assumptions

None remaining. All previously identified assumptions (ordering, whitespace handling, persistence scope, task count limit) have been resolved into confirmed decisions above.

## 10. Open Questions

None outstanding.
