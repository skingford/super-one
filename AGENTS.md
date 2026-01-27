# Repository Guidelines

## Project Structure & Module Organization
This repository is in early initialization. Current files are documentation only (`README.md`, `CLAUDE.md`). No source, tests, or assets directories exist yet. When adding code, keep structure predictable (for example: `src/` for application code, `tests/` or `__tests__/` for tests, `scripts/` for tooling, and `assets/` for static files). Document any new top-level directories in `README.md`.

## Build, Test, and Development Commands
There are no build, test, or dev commands defined yet. If you introduce a package manager (likely Node.js based per `.gitignore` guidance), add scripts to `package.json` and list them in `README.md` (examples: `npm run dev`, `npm run build`, `npm test`, `npm run lint`). Keep commands consistent and avoid one-off shell scripts unless necessary.

## Coding Style & Naming Conventions
No formatting or linting tools are configured yet. When tooling is added, define it explicitly (for example: ESLint/Prettier) and document formatting rules (indentation, quotes, line endings). Use clear, descriptive names and prefer `kebab-case` for file names and `camelCase` for JS/TS identifiers unless a framework dictates otherwise.

## Testing Guidelines
No testing framework is configured. When tests are added, standardize on a single framework (for example: Vitest or Jest), document how to run all tests and a single test, and follow a consistent naming convention (for example: `*.test.ts` or `*.spec.js`). Target meaningful coverage rather than chasing a numeric threshold until requirements are defined.

## Commit & Pull Request Guidelines
Recent commits use Conventional Commits (for example: `feat: skill`). Continue with `feat:`, `fix:`, `chore:`, etc., and keep messages imperative and scoped. Pull requests should include a short summary, rationale, and any relevant issues or screenshots. Note any manual testing performed and list follow-up tasks if needed.

## Agent-Specific Notes
Read and follow `CLAUDE.md` when making changes. If you add new commands, directories, or architectural decisions, update both `README.md` and `CLAUDE.md` to keep onboarding friction low.

## requirement

* Always respond in Chinese-simplified
