# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2025-04-10

### Added
- `tests/soak-test.js` — long duration endurance test (34 min at 50 VUs) to detect memory leaks and performance degradation over time
- `dashboards/k6-dashboard.json` — importable Grafana dashboard with response time percentiles, error rate, VU count and requests/sec panels
- `grafana-provisioning/datasources/influxdb.yml` — auto-provisions InfluxDB datasource in Grafana on stack startup
- `grafana-provisioning/dashboards/dashboard.yml` — auto-provisions k6 dashboard in Grafana on stack startup
- `docs/screenshots/` — folder for Grafana dashboard screenshots

### Changed
- `docker-compose.yml` — added Grafana volume mounts for provisioning; dashboard and datasource now load automatically on `docker compose up`
- `README.md` — added Grafana dashboard section, soak test run instructions, full project structure tree

### Notes
- Thresholds across all tests are baseline values — tuning based on observed metrics planned for v0.4.1
- `teardown()` functions not yet added to test files
- CI integration not yet implemented — coming in v1.0.0

---

## [0.3.0] - 2025-04-09

### Added
- `utils/http-client.js` — reusable HTTP wrapper with `get()`, `post()`, `defaultPizzaPayload()` and `customPizzaPayload()` helpers
- `utils/checks.js` — shared check functions (`checkHomepage`, `checkPizzaResponse`, `checkPizzaStructure`, `checkCustomResponse`)
- `config/env.js` — centralised environment config reading from `__ENV` with safe fallback defaults
- `.env.example` — committed safe template showing all required environment variables
- `run-tests.sh` — shell wrapper that loads `.env` and runs k6 with any arguments passed

### Changed
- `config/options.js` — removed `BASE_URL` export (moved to `config/env.js`); added `soakOptions` placeholder for next stage
- All test files refactored to import from `utils/` and `config/env.js` — eliminated duplicated HTTP and check logic
- Auth token now sourced from `ENV.AUTH_TOKEN` via environment variable — uses `Bearer` prefix

### Notes
- Soak test file not yet created — options placeholder added, full implementation in v0.4.0
- Grafana dashboard not yet version-controlled — added in v0.4.0

---

## [0.2.0] - 2025-04-07

### Added
- `tests/stress-test.js` — ramps to 200 VUs across 5 stages to identify performance degradation point
- `tests/spike-test.js` — simulates sudden traffic burst from 10 to 200 VUs to test spike recovery
- `tests/breakpoint-test.js` — continuously ramps to 300 VUs to find absolute system capacity limit

### Fixed
- `config/options.js` — added missing thresholds to `loadOptions` (`p(95)<2000`, `p(99)<3000`, error rate `<5%`)

### Notes
- Auth token still hardcoded as placeholder across all test files — moved to env config in v0.3.0
- HTTP request logic duplicated across test files — reusable utils added in v0.3.0
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
- Auth token hardcoded as placeholder in test files — moved to env config in v0.3.0
- Thresholds on smoke test only; load test thresholds added in v0.2.0
- Stress, spike, soak and breakpoint tests not yet implemented

---

## [Unreleased]
