# k6 Performance Lab

A professional performance testing suite built with [Grafana k6](https://k6.io/), targeting the [QuickPizza](https://github.com/grafana/quickpizza) demo application. Covers all major performance test types with a clean, modular structure and real observability tooling.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **k6** | Performance test scripting and execution |
| **QuickPizza** | Target application under test (Grafana's official k6 demo app) |
| **InfluxDB** | Stores k6 metrics output |
| **Grafana** | Visualizes metrics in real-time dashboards |
| **Docker** | Runs the full local stack |

---

## Test Types

| Test | File | VUs | Purpose |
|------|------|-----|---------|
| Smoke | `tests/smoke-test.js` | 5 | Sanity check — is the system up and responding? |
| Load | `tests/load-test.js` | 50 | Normal + peak traffic simulation |
| Stress | `tests/stress-test.js` | 200 | Push beyond normal load to find degradation point |
| Spike | `tests/spike-test.js` | 200 | Sudden traffic burst — flash sale / viral event |
| Soak | `tests/soak-test.js` | 50 | Long duration endurance — catches memory leaks |
| Breakpoint | `tests/breakpoint-test.js` | 300 | Find absolute system capacity limit ⚠️ manual only |

---

## Project Structure

```
k6-performance-lab/
├── docker-compose.yml               # Full local stack (QuickPizza + InfluxDB + Grafana)
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

### 1. Start the Docker stack

```bash
docker compose up -d
```

Verify services are running:

| Service | URL |
|---------|-----|
| QuickPizza | http://localhost:3333 |
| Grafana | http://localhost:3000 |
| InfluxDB | http://localhost:8086 |

---

### 2. Get your Auth Token

1. Open **http://localhost:3333**
2. Click the user/profile icon in the top right
3. Copy the token shown

---

### 3. Set up environment

```bash
cp .env.example .env
```

Edit `.env` and paste your token:

```bash
AUTH_TOKEN=your_token_here
BASE_URL=http://localhost:3333
```

---

### 4. Make the run script executable (first time only)

```bash
chmod +x run-tests.sh
```

---

### 5. Run tests

```bash
# Smoke test — quick sanity check
./run-tests.sh tests/smoke-test.js

# Load test
./run-tests.sh tests/load-test.js

# Stress test
./run-tests.sh tests/stress-test.js

# Spike test
./run-tests.sh tests/spike-test.js

# Soak test (runs ~34 minutes)
./run-tests.sh tests/soak-test.js

# Breakpoint test (manual only — will stress your system)
./run-tests.sh tests/breakpoint-test.js
```

---

### 6. Run with InfluxDB output (Grafana live dashboard)

```bash
./run-tests.sh --out influxdb=http://localhost:8086/k6 tests/load-test.js
./run-tests.sh --out influxdb=http://localhost:8086/k6 tests/stress-test.js
```

Then open Grafana at **http://localhost:3000** → the **k6 Performance Lab** dashboard will be pre-loaded automatically.

---

### 7. Stop the stack

```bash
docker compose down
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `http://localhost:3333` | Base URL of the application under test |
| `AUTH_TOKEN` | `` | Auth token for QuickPizza `/api/pizza` endpoint |
| `TARGET_VUS` | `50` | Virtual user count override |
| `DURATION` | `5m` | Test duration override |

---

> CI integration and final polish coming in upcoming commits.
