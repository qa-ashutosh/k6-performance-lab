# k6 Performance Lab

![CI](https://github.com/qa-ashutosh/k6-performance-lab/actions/workflows/k6-smoke.yml/badge.svg)
![k6](https://img.shields.io/badge/k6-7D64FF?style=flat&logo=k6&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white)
![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=flat&logo=influxdb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

A professional performance testing suite built with [Grafana k6](https://k6.io/), targeting the [QuickPizza](https://github.com/grafana/quickpizza) demo application. Covers all major performance test types with a clean, modular codebase and full observability via Grafana dashboards.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **k6** | Performance test scripting and execution |
| **QuickPizza** | Target application under test (Grafana's official k6 demo app) |
| **InfluxDB** | Stores k6 metrics output in real-time |
| **Grafana** | Visualizes metrics via auto-provisioned dashboards |
| **Docker** | Runs the full local observability stack |
| **GitHub Actions** | Runs smoke test on every push to main |

---

## Test Types

| Test | File | VUs | Duration | Purpose |
|------|------|-----|----------|---------|
| Smoke | `tests/smoke-test.js` | 5 | 30s | Sanity check — is the system up? |
| Load | `tests/load-test.js` | 50 | 5m | Normal + peak traffic simulation |
| Stress | `tests/stress-test.js` | 200 | ~8m | Find performance degradation point |
| Spike | `tests/spike-test.js` | 200 | ~3.5m | Sudden traffic burst recovery |
| Soak | `tests/soak-test.js` | 50 | ~34m | Endurance — catch memory leaks |
| Breakpoint | `tests/breakpoint-test.js` | 300 | ~12m | Find absolute system capacity ⚠️ |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Local Stack                    │
│                                                  │
│   k6 (local) ──► QuickPizza (Docker :3333)      │
│        │                                         │
│        └──► InfluxDB (Docker :8086)              │
│                    │                             │
│                    └──► Grafana (Docker :3000)   │
└─────────────────────────────────────────────────┘
```

---

## Project Structure

```
k6-performance-lab/
├── .github/
│   └── workflows/
│       └── k6-smoke.yml             # CI — runs smoke test on every push
├── docker-compose.yml               # Full local stack
├── run-tests.sh                     # Shell wrapper — loads .env and runs k6
├── .env.example                     # Environment variable template
├── config/
│   ├── env.js                       # Centralised env config with fallback defaults
│   └── options.js                   # Shared k6 options for all test types
├── utils/
│   ├── http-client.js               # Reusable HTTP request wrapper
│   └── checks.js                    # Shared k6 check functions
├── tests/
│   ├── smoke-test.js
│   ├── load-test.js
│   ├── stress-test.js
│   ├── spike-test.js
│   ├── soak-test.js
│   └── breakpoint-test.js
├── dashboards/
│   └── k6-dashboard.json            # Grafana dashboard (auto-provisioned)
├── grafana-provisioning/
│   ├── datasources/influxdb.yml     # Auto-provisions InfluxDB datasource
│   └── dashboards/dashboard.yml     # Auto-provisions k6 dashboard
└── docs/
    └── screenshots/                 # Grafana dashboard screenshots
```

---

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [k6](https://k6.io/docs/get-started/installation/) — `brew install k6`

---

### 1. Clone the repo

```bash
git clone https://github.com/qa-ashutosh/k6-performance-lab.git
cd k6-performance-lab
```

---

### 2. Start the Docker stack

```bash
docker compose up -d
```

| Service | URL |
|---------|-----|
| QuickPizza | http://localhost:3333 |
| Grafana | http://localhost:3000 |
| InfluxDB | http://localhost:8086 |

---

### 3. Get your Auth Token

1. Open **http://localhost:3333**
2. Click the user/profile icon top right
3. Copy the token shown

---

### 4. Set up environment

```bash
cp .env.example .env
# Edit .env and paste your token
```

```bash
AUTH_TOKEN=your_token_here
BASE_URL=http://localhost:3333
```

---

### 5. Make run script executable (first time only)

```bash
chmod +x run-tests.sh
```

---

### 6. Run tests

```bash
# Smoke — quick sanity check
./run-tests.sh tests/smoke-test.js

# Load test
./run-tests.sh tests/load-test.js

# Stress test
./run-tests.sh tests/stress-test.js

# Spike test
./run-tests.sh tests/spike-test.js

# Soak test (~34 minutes)
./run-tests.sh tests/soak-test.js

# Breakpoint test (manual only)
./run-tests.sh tests/breakpoint-test.js
```

---

### 7. Run with Grafana live dashboard

```bash
./run-tests.sh --out influxdb=http://localhost:8086/k6 tests/load-test.js
```

Open **http://localhost:3000** → **k6 Performance Lab** dashboard loads automatically.

---

### 8. Stop the stack

```bash
docker compose down
```

---

## CI — GitHub Actions

Every push and pull request to `main` automatically runs the smoke test against the public QuickPizza endpoint.

To enable: add `QUICKPIZZA_TOKEN` as a GitHub Actions secret in your repo settings:
- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
- Name: `QUICKPIZZA_TOKEN`
- Value: your QuickPizza auth token

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `http://localhost:3333` | Target application URL |
| `AUTH_TOKEN` | `` | QuickPizza API auth token |
| `TARGET_VUS` | `50` | Virtual user count override |
| `DURATION` | `5m` | Test duration override |

---

## Thresholds Summary

| Test | Error Rate | p(95) | p(99) |
|------|-----------|-------|-------|
| Smoke | < 1% | < 800ms | — |
| Load | < 5% | < 1500ms | < 2500ms |
| Stress | < 10% | < 4000ms | < 6000ms |
| Spike | < 20% | < 8000ms | — |
| Soak | < 5% | < 1500ms | < 2500ms |
| Breakpoint | < 30% | < 10000ms | — |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding tests, branch naming, and the PR process.

---

## Roadmap

- [ ] Upgrade Grafana to latest with timeseries panel migration
- [ ] TypeScript migration for better IDE support
- [ ] HTML test reports via k6 web dashboard
