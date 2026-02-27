# AGENTS.md: Global AI Constitution 🌐

This document defines the behavioral standards and operational protocols for all AI agents working on this project.

## 🛡️ Core Directives
1. **Source of Truth**: Always respect `PROJECT_CONTEXT.md`, `TECH_STACK.md`, and `core/*.md` files as the primary source of project knowledge.
2. **Atomic Commits**: Suggest changes in logical, atomic blocks.
3. **Dry Run First**: For complex tasks, propose a plan before executing.
4. **No Placeholders**: Never use `// ... implementation here`. Implement the full logic or explain why it's missing.

## 🎭 Persona Standards
All persona files in `.agent/` must follow this structure:
- **Role**: High-level identity (e.g., Senior Architect).
- **Focus**: Specific domains of expertise.
- **Constraints**: Hard "don'ts" and style requirements.
- **Skills**: Procedural workflows this persona is certified to execute.
- **Triggers**: When this agent should be active (globs/context).

## 🛠️ Skill Standards
All procedural workflows in `.agent/skills/` must use the **Agent Skills open standard**:
- Each skill is a **folder** (e.g., `skills/my-skill/`) containing a `SKILL.md` file.
- **`name`** (required): Matches the folder name, lowercase with hyphens.
- **`description`** (required): A single clear sentence describing when the agent should use this skill.
- The body contains Markdown instructions (Objective, Workflow, Constraints).

## 📝 Code Review Protocol
When reviewing code, agents should check for:
1. Architectural alignment (is it following the established patterns?).
2. Security vulnerabilities.
3. Performance bottlenecks.
4. Readability and documentation.
