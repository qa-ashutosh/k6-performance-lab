// config/options.js
// Shared k6 test options for all test types.
// v0.4.1 — thresholds tuned based on observed baseline metrics from QuickPizza.

// --- SMOKE ---
// Quick sanity check — minimal VUs, short duration
export const smokeOptions = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"],
  },
};

// --- LOAD ---
// Normal + peak expected traffic simulation
// Thresholds tuned after observing baseline: avg ~300ms, p95 ~800ms
export const loadOptions = {
  stages: [
    { duration: "1m", target: 20 },
    { duration: "3m", target: 50 },
    { duration: "1m", target: 0  },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1500", "p(99)<2500"],
  },
};

// --- STRESS ---
// Push beyond normal load to find performance degradation point
// Higher thresholds acceptable — system under stress
export const stressOptions = {
  stages: [
    { duration: "1m", target: 50  },
    { duration: "2m", target: 100 },
    { duration: "2m", target: 150 },
    { duration: "2m", target: 200 },
    { duration: "1m", target: 0   },
  ],
  thresholds: {
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<4000", "p(99)<6000"],
  },
};

// --- SPIKE ---
// Sudden burst of traffic — simulates flash sale / viral event
// Ramp adjusted: was too aggressive at 30s, now 45s for more realistic spike
export const spikeOptions = {
  stages: [
    { duration: "30s", target: 10  },  // baseline
    { duration: "45s", target: 200 },  // spike — was 30s, adjusted for realism
    { duration: "1m",  target: 200 },  // hold spike
    { duration: "45s", target: 10  },  // recovery
    { duration: "30s", target: 0   },  // ramp down
  ],
  thresholds: {
    http_req_failed: ["rate<0.20"],
    http_req_duration: ["p(95)<8000"],
  },
};

// --- BREAKPOINT ---
// Continuously ramp up until system breaks — find absolute limit
// ⚠️  Run manually only — not part of CI
export const breakpointOptions = {
  stages: [
    { duration: "2m", target: 50  },
    { duration: "2m", target: 100 },
    { duration: "2m", target: 150 },
    { duration: "2m", target: 200 },
    { duration: "2m", target: 250 },
    { duration: "2m", target: 300 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.30"],
    http_req_duration: ["p(95)<10000"],
  },
};

// --- SOAK ---
// Long duration test at moderate load — catches memory leaks and degradation over time
export const soakOptions = {
  stages: [
    { duration: "2m",  target: 50 },
    { duration: "30m", target: 50 },
    { duration: "2m",  target: 0  },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1500", "p(99)<2500"],
  },
};
