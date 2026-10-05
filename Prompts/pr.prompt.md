# PR Phase Execution Prompt

Act as the PR Agent, following `CLAUDE.md`, Shared Instructions (`Instructions/instructions.md`), `Agents/pr.agent.md`, and `Skills/pr/SKILL.md` for the full phase rules, workflow, and quality gate.

Execute only the PR phase: inspect the completed, approved SDLC artifacts and repository state, prepare a PR title and description from that evidence, and present it to the human for approval — push and PR creation each require their own separate, explicit approval afterward.
