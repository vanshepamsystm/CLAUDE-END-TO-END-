# Architecture Definition Skill

## Purpose

Provide a repeatable procedure for transforming approved requirements into a human-approved, high-level system architecture.

---

## Procedure

### Step 1 — Read and Analyze `requirements.md`

Read the approved `requirements.md` in full. Extract:

- functional requirements;
- non-functional requirements;
- constraints;
- scope and out-of-scope statements;
- acceptance criteria.

Do not add architecture elements not justified by these requirements.

---

### Step 2 — Identify Architectural Drivers

Identify the requirements that most strongly shape structure, for example:

- persistence requirements;
- error/failure-handling requirements;
- accessibility and responsiveness requirements;
- security/safety requirements (e.g., safe rendering);
- simplicity/maintainability constraints.

---

### Step 3 — Identify System Boundary

Determine what is inside the system (client application, local storage) versus outside it (no backend, no external services), based on the Constraints and Scope sections of `requirements.md`.

---

### Step 4 — Propose Architecture Options Where Appropriate

Where `requirements.md` does not determine a unique answer (e.g., technology stack), identify the realistic options.

---

### Step 5 — Compare Options Using Factual Criteria

Compare options against factual criteria such as: alignment with the simplicity constraint, number of dependencies/build steps introduced, and fit with the stated non-functional requirements. Avoid subjective or unstated preferences.

---

### Step 6 — Ask the Human, Then Recommend

If a decision is material and not determined by the requirements, ask the human before proceeding. Once answered, recommend an architecture consistent with the requirements and the human's answer.

---

### Step 7 — Define Components and Responsibilities

Define the smallest set of components that satisfies the requirements (e.g., UI/rendering, task state management, persistence/storage). State each component's single responsibility.

---

### Step 8 — Define Data Flow

Describe how data moves between components for each major functional requirement (create, view, complete, reopen, delete, load/save).

---

### Step 9 — Define Technology Choices

Record the confirmed technology choices and the rationale tying each choice back to a requirement or constraint.

---

### Step 10 — Define Interfaces/Dependencies

Where relevant, describe the interface between components (e.g., the shape of data passed from storage to the UI layer) without specifying implementation-level code.

---

### Step 11 — Identify Risks and Trade-offs

Document risks (e.g., storage quota limits, browser storage disabled) and trade-offs of the chosen approach versus alternatives.

---

### Step 12 — Produce `architecture.md`

Create the document only after the human has reviewed and approved the proposal, using the required structure defined in the Architecture Prompt/Instructions.

---

### Step 13 — Architecture Quality Check

Before declaring Architecture complete, verify:

- [ ] Every architectural decision traces to a requirement, constraint, or explicit human answer.
- [ ] No product requirement was added, removed, or reinterpreted.
- [ ] The architecture is proportionate to an intentionally simple Todo application.
- [ ] A component/system diagram is included.
- [ ] Data flow is defined for each major functional requirement.
- [ ] Risks and trade-offs are documented.
- [ ] `architecture.md` contains no implementation-level coding tasks.
- [ ] Human approval has been obtained before `architecture.md` was created.

---

## Required Output Structure

The final `architecture.md` should contain:

1. Architecture Overview
2. Architectural Drivers
3. System Boundary
4. Technology Choices
5. High-Level Architecture
6. Component Diagram
7. Component Responsibilities
8. Data Flow
9. Data Model / Key Data Structures
10. Persistence Architecture
11. Error/Failure Handling
12. Security Considerations
13. Accessibility/Responsiveness Considerations
14. Architecture Decisions and Rationale
15. Constraints
16. Risks and Trade-offs
17. Requirements Traceability
18. Architecture Quality Checklist

If a section has no applicable content, state that explicitly rather than inventing information.
