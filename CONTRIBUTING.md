# Contributing to k6 Performance Lab

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

---

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Follow the setup instructions in [README.md](README.md)
4. Create a new branch following the naming convention below

---

## Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| New feature | `feat/description` | `feat/add-websocket-test` |
| Bug fix | `fix/description` | `fix/threshold-tuning` |
| Refactor | `refactor/description` | `refactor/utils-cleanup` |
| Docs | `docs/description` | `docs/update-readme` |

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add WebSocket performance test
fix: correct spike test ramp duration
refactor: extract shared payload helpers
docs: update README with new test results
chore: upgrade k6 to latest version
```

---

## Adding a New Test

1. Create your test file in `tests/` following the existing naming pattern
2. Add the corresponding options to `config/options.js`
3. Use shared utilities from `utils/http-client.js` and `utils/checks.js`
4. Include a meaningful `teardown()` function
5. Update the test types table in `README.md`
6. Add an entry to `CHANGELOG.md` under `[Unreleased]`

---

## Pull Request Process

1. Ensure your test runs locally before submitting
2. Run the smoke test to verify nothing is broken:
   ```bash
   ./run-tests.sh tests/smoke-test.js
   ```
3. Update `CHANGELOG.md` with your changes under `[Unreleased]`
4. Open a PR with a clear title and description
5. PRs are merged using **squash merge** to keep history clean

---

## Code Style Guidelines

- Use `const` for all imports and options
- Keep test files focused — one test type per file
- Always use shared utils — never duplicate HTTP or check logic
- Add comments explaining the purpose of each test step
- Keep `sleep()` values realistic (1-3 seconds between steps)

---

## Reporting Issues

Open a GitHub issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your OS and k6 version (`k6 version`)
