# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2025-04-07
 
### Added
- `tests/stress-test.js` — ramps to 200 VUs across 5 stages to identify performance degradation point
- `tests/spike-test.js` — simulates sudden traffic burst from 10 to 200 VUs to test spike recovery
- `tests/breakpoint-test.js` — continuously ramps to 300 VUs to find absolute system capacity limit
 
### Fixed
- `config/options.js` — added missing thresholds to `loadOptions` (`p(95)<2000`, `p(99)<3000`, error rate `<5%`)
 
### Notes
- Auth token still hardcoded as placeholder across all test files — to be moved to env config in v0.3.0
- HTTP request logic duplicated across test files — reusable utils planned for v0.3.0
- Soak test not yet implemented
- Breakpoint test should not be run in CI — manual execution only
 
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

