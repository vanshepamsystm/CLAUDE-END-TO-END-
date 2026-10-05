# Implementation Planning Skill

## Purpose

Provide a repeatable procedure for turning approved requirements and architecture into a detailed, dependency-ordered implementation backlog, and a quality gate for validating that backlog before it is finalized.

---

## Procedure

### Step 1 — Read Approved Requirements

Read `requirements.md` in full: functional requirements, non-functional requirements, constraints, scope, out of scope, and acceptance criteria.

### Step 2 — Read Approved Architecture

Read `architecture.md` in full: components, responsibilities, data model, data flows, persistence contract, error handling, security, accessibility, decisions, and traceability.

### Step 3 — Read Design Review Findings/Dispositions

Read `design-review.md`. Carry forward its conclusions and the disposition of every finding (accepted, rejected/deferred, informational) as binding context — do not re-open a finding the human already resolved.

### Step 4 — Decompose Requirements into Implementation Tasks

Break the approved requirements and architecture into discrete tasks small enough to implement and verify individually (e.g., markup/structure, one component's core logic, one cross-cutting concern such as accessibility or persistence). Each task must map back to specific requirements.

### Step 5 — Identify Dependencies

For each task, identify which other tasks must be completed first (e.g., data model/state before UI wiring; UI wiring before focus management; persistence contract before error-notice rendering).

### Step 6 — Identify Affected Files

For each task, list the files it is expected to create or modify, consistent with the approved architecture's system boundary and technology choices (no frameworks, build tooling, or backend files).

### Step 7 — Define Task Priorities

Assign a priority (e.g., Foundational, Core, Supporting) reflecting what must exist before other work is meaningful or testable.

### Step 8 — Maintain Requirements Traceability

Confirm every FR and relevant NFR is covered by at least one task; confirm every task cites the requirement(s)/acceptance criteria it addresses.

### Step 9 — Identify Implementation Risks

List only risks already surfaced or implied by the approved architecture/design review (e.g., localStorage failures, malformed data, write failures, focus management, safe rendering). Do not invent risks unrelated to the approved artifacts.

### Step 10 — Define Verification Expectations

For each task, state what must be true for the task to be considered done (observable behavior/acceptance criteria satisfied), without prescribing test tooling or implementation technique.

### Step 11 — Validate Plan Completeness

Check the full backlog against the Quality Gate below before presenting it to the human.

### Step 12 — Present for Human Review

Present the proposed plan, along with any ambiguities or conflicts found relative to the approved artifacts, and wait for explicit human approval before creating `implementation-plan.md`.

### Step 13 — Finalize `implementation-plan.md`

Create the file only after human approval, incorporating only approved changes.

---

## Required Output Structure

The final `implementation-plan.md` should contain:

1. Overview
2. Implementation Task Backlog (IP-001, IP-002, … each with: Task ID, Task Name, Priority, Objective, Description, Requirements Covered, Acceptance Criteria Covered, Architecture Components Affected, Files Expected to be Created/Modified, Dependencies, Verification Expectations)
3. Dependency Order / Recommended Implementation Sequence
4. File Impact Summary
5. Requirements Traceability
6. Risks and Considerations
7. Implementation Boundary Statement

---

## Quality Gate

Before presenting the plan (and again before finalizing `implementation-plan.md`), verify:

- [ ] Every FR and relevant NFR from `requirements.md` is covered by at least one task.
- [ ] No task introduces a requirement, decision, component, or technology not present in `architecture.md`.
- [ ] No task conflicts with a design-review disposition in `design-review.md`.
- [ ] Every task's file impact is consistent with the approved architecture's system boundary (no framework, backend, database, or build-tooling files).
- [ ] Dependencies form a valid, acyclic sequence.
- [ ] Risks listed are all traceable to the approved architecture or design review, not invented.
- [ ] Verification expectations describe observable outcomes, not implementation technique.
- [ ] No application source code, tests, or later-phase artifacts were created.
- [ ] Human approval was obtained before `implementation-plan.md` was finalized.
