# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2025-03-30

### Added
- `docker-compose.yml` — local stack with QuickPizza, InfluxDB (v1.11), and Grafana
- `tests/smoke-test.js` — smoke test with 5 VUs / 30s; validates homepage and `/api/pizza` POST endpoint with deep response structure checks
- `tests/load-test.js` — load test ramping to 50 VUs over 5 minutes; covers regular and custom pizza request scenarios
- `config/options.js` — shared k6 options (smokeOptions, loadOptions) and BASE_URL config
- `README.md` — project overview, stack details, setup and run instructions
- `.gitignore` — excludes k6 output files, OS artifacts and editor configs

### Notes
- Auth token currently hardcoded as placeholder in test files (`<Auth-Token>`) — to be moved to environment variable config in upcoming version
- Thresholds defined on smoke test only; load test thresholds deferred until baseline metrics are observed
- Stress, spike, soak and breakpoint test types not yet implemented

---

<!-- Unreleased changes go here during development -->
## [Unreleased]

