# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-04-15

### Added
- `.github/workflows/k6-smoke.yml` — GitHub Actions CI runs smoke test on every push and pull request to main
- `CONTRIBUTING.md` — branch naming, commit conventions, PR process and code style guidelines

### Changed
- `README.md` — full polish: CI badge, architecture diagram, thresholds summary table, screenshots section, roadmap, clone instructions
- `README.md` — version badge updated from `0.4.1` to `1.0.0`
- `CHANGELOG.md` — promoted to v1.0.0

### Notes
- Grafana upgrade from `8.5.21` to `latest` with timeseries panel migration planned for v1.1.0
- TypeScript migration planned for v1.2.0

---

## [0.4.1] - 2025-04-13

### Fixed
- `dashboards/k6-dashboard.json` — rebuilt using Grafana query builder format; fixes "No data" issue caused by unresolved `$__interval` variable in raw SQL mode
- `docker-compose.yml` — pinned Grafana to `8.5.21`; latest Grafana (v10+) removed the `graph` panel type breaking auto-provisioned dashboards
- `grafana-provisioning/datasources/influxdb.yml` — simplified datasource name to `k6`; added `httpMode: GET`
- `config/options.js` — thresholds tuned based on observed baseline metrics; spike ramp adjusted from 30s to 45s
- `tests/spike-test.js` — spike ramp duration adjusted for realistic behavior
- `config/env.js` — removed hardcoded token fallback, replaced with empty string

### Added
- `teardown()` function added to all 6 test files with `group()` formatted summary output
- `utils/checks.js` — failure logging with status code and duration
- `README.md` — static shields.io badges

---

## [0.4.0] - 2025-04-13

### Added
- `tests/soak-test.js` — long duration endurance test (34 min at 50 VUs)
- `dashboards/k6-dashboard.json` — importable Grafana dashboard
- `grafana-provisioning/datasources/influxdb.yml` — auto-provisions InfluxDB datasource
- `grafana-provisioning/dashboards/dashboard.yml` — auto-provisions k6 dashboard
- `docs/screenshots/` — folder for Grafana dashboard screenshots

### Changed
- `docker-compose.yml` — Grafana volume mounts for auto-provisioning
- `README.md` — Grafana dashboard section, full project structure tree

### Notes
- Thresholds across all tests are baseline values — tuned in v0.4.1
- `teardown()` functions not yet added — added in v0.4.1
- CI not yet implemented — added in v1.0.0

---

## [0.3.0] - 2025-04-09

### Added
- `utils/http-client.js` — reusable HTTP wrapper with `get()`, `post()`, `defaultPizzaPayload()` and `customPizzaPayload()` helpers
- `utils/checks.js` — shared check functions
- `config/env.js` — centralised environment config with safe fallback defaults
- `.env.example` — committed safe template
- `run-tests.sh` — shell wrapper that loads `.env`

### Changed
- All test files refactored to use utils and env config
- Auth token uses `Bearer` prefix via `ENV.AUTH_TOKEN`

---

## [0.2.0] - 2025-04-07

### Added
- `tests/stress-test.js` — ramps to 200 VUs across 5 stages
- `tests/spike-test.js` — sudden burst from 10 to 200 VUs
- `tests/breakpoint-test.js` — ramps to 300 VUs to find system limit

### Fixed
- `config/options.js` — added missing thresholds to `loadOptions`

---

## [0.1.0] - 2025-03-30

### Added
- `docker-compose.yml` — local stack with QuickPizza, InfluxDB (v1.11), and Grafana
- `tests/smoke-test.js` — smoke test with deep response structure validation
- `tests/load-test.js` — load test with regular and custom pizza scenarios
- `config/options.js` — shared k6 options
- `README.md` — project overview and setup instructions
- `.gitignore` — excludes k6 output files and editor configs

---

## [Unreleased]
