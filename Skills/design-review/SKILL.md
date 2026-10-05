# Design Review Skill

## Purpose

Provide a repeatable procedure and quality checklist for reviewing an approved architecture against approved requirements before implementation planning begins.

---

## Procedure

### Step 1 — Read Source of Truth

Read `requirements.md` and `architecture.md` in full, along with `CLAUDE.md` and shared Instructions.

### Step 2 — Requirements Coverage Check

For every FR and NFR, confirm the architecture states which component/section addresses it. Use the architecture's own traceability table as a starting point, then verify each mapping is actually accurate rather than merely present.

### Step 3 — Component Responsibility Check

Confirm each component (UI Layer, Task Store, Persistence Layer) has a distinct responsibility with no overlap or gap between them.

### Step 4 — Data Model Check

Verify the task data model correctly supports: stable identity independent of title, duplicate titles, newest-first ordering, the two-state (incomplete/completed) model, and its persisted representation.

### Step 5 — Data Flow Check

Walk through create, load, complete, reopen, and delete flows. Confirm each is complete (start to finish) and consistent with the component responsibilities and data model.

### Step 6 — Persistence Design Check

Verify the persistence contract distinguishes: storage unavailable, missing/empty storage (normal first run), malformed stored data, successful writes, and failed writes. Verify status propagation is simple (no unnecessary abstraction), in-memory state is preserved on failure, and the "no partial write" guarantee is scoped to what the application actually controls (no unsupported claims about browser/storage internals).

### Step 7 — Validation and State Behavior Check

Verify title validation (empty/whitespace-only rejection, no trimming), duplicate-title handling, stable IDs, ordering, and the complete/reopen/delete-by-ID behaviors are each represented and mutually consistent.

### Step 8 — UI/Accessibility Check

Verify semantic HTML usage, keyboard operability, tab order, focus behavior after create/delete, responsive behavior (including avoiding horizontal overflow), and safe text-only title rendering are each addressed.

### Step 9 — Security Check

Verify the design prevents task titles from being interpreted as HTML/script, and that no unnecessary attack surface (network calls, external services, credentials) has been introduced.

### Step 10 — Simplicity/Maintainability Check

Verify no unjustified framework, backend service, authentication, database, unnecessary abstraction, event bus, custom error system, state-management library, or build infrastructure has been introduced.

### Step 11 — Internal Consistency Check

Cross-check the component diagram, data flows, persistence contract, architecture decisions, risks, and traceability table against each other for contradictions or asymmetries.

### Step 12 — Classify and Report Findings

For each finding, record: description, severity/priority, evidence (citing `requirements.md`/`architecture.md`), classification (no change needed / clarification opportunity / architecture change / design decision), and a recommended resolution. Present findings to the human before creating any file.

### Step 13 — Human Review and Resolution

Wait for the human to review findings. If any finding is classified as an architecture change, wait for explicit approval before modifying `architecture.md`. Incorporate only approved resolutions.

### Step 14 — Produce `design-review.md`

Create the document only after the human has reviewed findings and approved any required resolutions.

---

## Required Output Structure

The final `design-review.md` should contain:

1. Review Scope and Inputs
2. Requirements Coverage Review
3. Component Responsibility Review
4. Data Model Review
5. Data Flow Review
6. Persistence Design Review
7. Validation and State Behavior Review
8. UI/Accessibility Review
9. Security Review
10. Simplicity/Maintainability Review
11. Architecture Consistency Review
12. Findings Summary (with severity, classification, resolution, and disposition)
13. Overall Design Review Recommendation

If a section has no findings, state explicitly that the area was reviewed and found adequate, with supporting evidence, rather than omitting it.

---

## Quality Gate

Before declaring Design Review complete, verify:

- [ ] Every FR and NFR was checked against the architecture, not merely listed.
- [ ] No product requirement was added, reinterpreted, or silently changed.
- [ ] Findings distinguish real gaps from clarification opportunities, later-phase implementation details, and already-adequate areas.
- [ ] No architecture change was applied without explicit human approval.
- [ ] The review is proportional to an intentionally simple Todo application (no invented findings).
- [ ] Human approval of findings (and any resolutions) was obtained before `design-review.md` was created.
