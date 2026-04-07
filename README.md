# k6 Performance Lab

Performance testing suite built with [Grafana k6](https://k6.io/) targeting the [QuickPizza](https://github.com/grafana/quickpizza) demo application.

## Tech Stack

- **k6** — performance test scripting and execution
- **QuickPizza** — target application (Grafana's official k6 demo app)
- **InfluxDB** — stores k6 metrics output
- **Grafana** — visualizes metrics in real-time dashboards
- **Docker** — runs the full stack locally

## Test Types (in progress)

| Test | File | Status |
|------|------|--------|
| Smoke | `tests/smoke-test.js` | ✅ Ready |
| Load | `tests/load-test.js` | ✅ Ready |
| Stress | `tests/stress-test.js` | ✅ Ready |
| Spike | `tests/spike-test.js` | ✅ Ready |
| Breakpoint | `tests/breakpoint-test.js` | ✅ Ready |
| Soak | `tests/soak-test.js` | 🔜 Coming |

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [k6](https://k6.io/docs/get-started/installation/)

### 1. Start the stack

```bash
docker compose up -d
```

Wait ~10 seconds, then verify:
- QuickPizza → http://localhost:3333
- Grafana → http://localhost:3000

### 2. Run a smoke test

```bash
k6 run tests/smoke-test.js
```

### 3. Run load test with InfluxDB output

```bash
k6 run --out influxdb=http://localhost:8086/k6 tests/load-test.js
```

### 4. Stop the stack

```bash
docker compose down
```

## Project Structure

```
k6-performance-lab/
├── tests/              # k6 test scripts
├── config/             # shared options and configuration
├── docker-compose.yml  # full local stack
└── README.md
```

---

> More test types, Grafana dashboards, and CI integration coming in upcoming commits.
