# Agentic SDLC Project Instructions

## Project Purpose

This project demonstrates an agentic Software Development Lifecycle using Claude.

The Todo application is intentionally simple. The primary objective is to demonstrate how Claude capabilities such as agents, skills, prompts, instructions, hooks, human-in-the-loop approval, code review, verification, and agent-assisted PR creation can support the complete SDLC.

Do not add unnecessary application complexity.

---

## SDLC Phase Control

The project follows these phases in order:

1. Requirements
2. Architecture
3. Design Review
4. Implementation Planning
5. Implementation
6. Review
7. Verify
8. Pull Request

Only the currently authorized phase may be executed.

Do not create artifacts for a future phase unless the user explicitly authorizes that phase.

Human approval is required before moving from one SDLC phase to the next.

---

## Current Phase Rule

When working on Requirements:

- Work only on Requirements.
- Read `user_story.md`.
- Ask clarification questions when requirements are ambiguous.
- Wait for the human response before finalizing requirements.
- Do not silently invent missing requirements.
- Produce `requirements.md` only after clarification and human confirmation.
- Do not create architecture, design, planning, implementation, review, verification, or PR artifacts.

---

## Human-in-the-Loop

Claude must involve the human when:

- requirements are ambiguous;
- multiple valid interpretations exist;
- a product decision is required;
- scope is unclear;
- a requirement conflicts with another requirement.

Claude must not make product decisions silently when human clarification is required.

---

## Artifact Rules

Each SDLC phase must have clearly separated artifacts.

Agents define responsibilities.

Skills define repeatable procedures.

Prompts define execution requests.

Instructions define shared project rules.

Hooks may automate deterministic actions when there is a genuine need.

Do not create an agent, skill, prompt, or hook merely for appearance.

---

## Scope Control

The Todo application must remain simple.

Do not introduce features such as:

- authentication;
- collaboration;
- categories;
- priorities;
- due dates;
- reminders;
- search;
- external services;
- unnecessary frameworks;
- unnecessary backend infrastructure;

unless a future approved requirement explicitly requires them.

---

## Requirements Quality

Requirements should be:

- clear;
- testable;
- unambiguous;
- traceable to the user story;
- appropriately scoped;
- separated into functional and non-functional requirements where appropriate.

Record unresolved items explicitly rather than hiding uncertainty.

---

## Phase Completion

A phase is complete only when:

1. Its required artifacts exist.
2. The artifacts have been reviewed.
3. Human approval has been received.
4. Required changes have been incorporated.
5. The user explicitly authorizes the next phase.

Never automatically continue to the next SDLC phase.