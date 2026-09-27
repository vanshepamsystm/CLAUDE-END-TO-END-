# Requirements Definition Skill

## Purpose

Provide a repeatable procedure for transforming a user story into clear, testable, human-approved requirements.

---

## Procedure

### Step 1 — Read the User Story

Read:

`user_story.md`

Extract:

- actor;
- desired capability;
- business/user goal;
- explicit scope;
- explicitly mentioned behavior.

Do not add functionality that is not supported by the story.

---

### Step 2 — Analyze the Story

Identify:

- functional behavior;
- non-functional expectations;
- constraints;
- dependencies;
- ambiguities;
- missing acceptance information;
- conflicting interpretations.

---

### Step 3 — Determine Clarification Questions

Ask questions only when the answer could materially affect:

- application behavior;
- acceptance criteria;
- scope;
- data behavior;
- error behavior;
- user interaction;
- persistence;
- security;
- accessibility;
- reliability.

Group related questions together.

---

### Step 4 — Human Clarification

Present the questions to the human.

Do not finalize the requirements until the human has answered questions that materially affect the specification.

---

### Step 5 — Define Functional Requirements

Document behavior using testable statements.

Each requirement should answer:

- What must the system do?
- Under what condition?
- What is the expected result?

Use stable identifiers such as:

- FR-1
- FR-2
- FR-3

---

### Step 6 — Define Non-Functional Requirements

Document applicable quality requirements such as:

- usability;
- accessibility;
- responsiveness;
- security;
- reliability;
- persistence;
- maintainability.

Only include requirements relevant to the application.

---

### Step 7 — Define Constraints and Scope

Document:

- explicit constraints;
- technical constraints only when confirmed;
- in-scope behavior;
- out-of-scope behavior where necessary.

Do not turn an implementation preference into a requirement without confirmation.

---

### Step 8 — Define Acceptance Criteria

Each significant functional requirement should have clear acceptance criteria.

Acceptance criteria should be observable and testable.

---

### Step 9 — Validate Requirements

Check that:

- every requirement traces to the user story or an explicitly confirmed decision;
- requirements do not contradict each other;
- requirements are testable;
- ambiguous statements have been resolved;
- unnecessary features have not been introduced;
- scope remains intentionally simple.

---

### Step 10 — Human Review

Present the proposed requirements to the human.

Allow corrections.

Incorporate approved changes.

---

### Step 11 — Produce `requirements.md`

Create the final requirements document only after the clarification and review process has completed.

---

## Required Output Structure

The final `requirements.md` should contain:

1. Overview
2. User Story
3. Functional Requirements
4. Non-Functional Requirements
5. Constraints
6. Scope
7. Out of Scope
8. Acceptance Criteria
9. Assumptions
10. Open Questions

If a section has no applicable content, explicitly state that rather than inventing information.

---

## Quality Gate

Before declaring Requirements complete, verify:

- [ ] User story is represented accurately.
- [ ] Functional requirements are testable.
- [ ] Relevant non-functional requirements are documented.
- [ ] Ambiguities have been resolved.
- [ ] Human decisions are captured.
- [ ] Scope is controlled.
- [ ] No future SDLC work was performed.
- [ ] `requirements.md` is internally consistent.
- [ ] Human approval has been obtained.