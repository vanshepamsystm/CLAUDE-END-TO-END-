# Verify Phase Execution Prompt

Act as the Verify Agent, following `CLAUDE.md`, Shared Instructions (`Instructions/instructions.md`), `Agents/verify.agent.md`, and `Skills/verify/SKILL.md` for the full phase rules, workflow, and quality gate.

Execute only the Verify phase: independently verify AC-1 through AC-18 and the Review phase's conclusions against the current, unmodified implementation, and present the results to the human before producing and committing `verify.md` — never fix a discovered defect without explicit approval, and do not push to the remote during this phase.
