# Review Skill

## Purpose

Provide a repeatable procedure for reviewing an implementation against approved requirements, architecture, design-review dispositions, and an implementation plan, producing evidence-based, severity-classified findings prior to human approval.

---

## Procedure

### Step 1 — Read Source of Truth

Read `CLAUDE.md`, `Instructions/instructions.md`, `user_story.md`, `requirements.md`, `architecture.md`, `design-review.md`, and `implementation-plan.md` in full.

### Step 2 — Read the Implementation

Read `index.html`, `styles.css`, `app.js`, and the Step 5 artifacts (`Agents/implementation.agent.md`, `Skills/implementation/SKILL.md`, `Prompts/implementation.prompt.md`) in full. Do not modify any of these files during review.

### Step 3 — Requirements Conformance Check

For every FR-1–FR-14 and NFR-1–NFR-9, determine whether the implementation satisfies, partially satisfies, does not satisfy, or cannot be determined to satisfy the requirement, citing concrete implementation evidence (specific code/markup).

### Step 4 — Architecture Conformance Check

Compare the implementation against `architecture.md`: UI Layer / Task Store / Persistence Layer responsibilities and separation, the `Task` data model, the data flows (create/load/complete/reopen/delete), the persistence status contract (`ok`/`unavailable`/`malformed`/`failed`), failure handling, and the client-only system boundary (no backend/network dependency). Identify any deviation.

### Step 5 — Implementation-Plan Conformance Check

For every IP-001–IP-013 task, determine whether the implementation actually delivers what the plan specified. Do not invent implementation tasks that were not in the approved plan.

### Step 6 — Security Review

Review user-controlled task title rendering, HTML/script injection risk, DOM manipulation APIs used, `localStorage` parsing and malformed-data handling, and the absence of unintended external/network dependencies. Reuse existing Step 5 verification evidence where applicable rather than re-deriving it from nothing.

### Step 7 — Accessibility Review

Review semantic HTML, native controls, keyboard accessibility, focus management, DOM/tab order, and labels. Distinguish implementation-level evidence (e.g., no `tabindex`, native elements, DOM order) from prior live-verification evidence, and from anything not yet actually verified (e.g., physical Tab-key traversal). Never claim a physical keyboard test was performed if it was not.

### Step 8 — Responsive/UI Review

Review desktop and mobile layout, control sizing, overflow, and overlap, using the existing Step 5 responsive verification evidence. Do not re-expand scope into a more complex UI review than the approved application warrants.

### Step 9 — Maintainability/Code-Quality Review

Review clarity, organization, duplication, naming, separation of responsibilities, unnecessary complexity, and unnecessary dependencies, relative to the approved architecture. Only raise issues with meaningful evidence or impact — do not refactor or flag matters of personal stylistic preference.

### Step 10 — Classify and Report Findings

For each finding, record: Finding ID, severity (Critical/High/Medium/Low/Informational), area, description, evidence, requirement/architecture/plan reference, impact, and recommended action. If an area is fully conformant, state so explicitly with evidence rather than omitting it.

### Step 11 — Human Review and Disposition

Present all findings to the human before creating `review.md`. Wait for explicit approval of the findings and their dispositions. If a finding implies that an approved requirement or architecture decision must change, stop and ask instead of deciding silently.

### Step 12 — Produce `review.md`

Create the document only after the human has reviewed and approved the findings and dispositions. The document must accurately reflect exactly what was approved — do not silently alter findings after approval.

### Step 13 — Commit Only After Approval

Stage and commit only the Review-phase files, only after the human has explicitly approved the final `review.md`. Do not commit during the initial findings-review step.

---

## Required Output Structure for `review.md`

1. Review Objective
2. Review Inputs
3. Review Scope
4. Requirements Conformance
5. Architecture Conformance
6. Implementation-Plan Conformance
7. Security Review
8. Accessibility Review
9. Responsive/UI Review
10. Code-Quality/Maintainability Review
11. Findings Table
12. Human-Approved Dispositions
13. Overall Review Conclusion
14. Remaining Limitations
15. Validation Checklist

If a section has no findings, state explicitly that the area was reviewed and found conformant, with supporting evidence, rather than omitting the section.

---

## Quality Gate

Before declaring the Review phase complete, verify:

- [ ] Every FR and NFR was checked against the implementation, not merely listed.
- [ ] Every IP-001–IP-013 task was checked against what was actually delivered.
- [ ] No product requirement or architecture decision was silently added, removed, or reinterpreted.
- [ ] Findings distinguish real defects from stylistic preference, and implementation evidence from prior verification evidence and from untested items.
- [ ] No implementation file or approved artifact was modified during the review.
- [ ] No Verify or Pull Request artifact was created.
- [ ] Human approval of findings (and dispositions) was obtained before `review.md` was created.
- [ ] Human approval of the final `review.md` was obtained before any commit.
