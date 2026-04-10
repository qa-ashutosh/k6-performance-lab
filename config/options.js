// config/options.js
// Shared k6 test options for all test types.
// BASE_URL moved to config/env.js as part of env config refactor.

// --- SMOKE ---
// Quick sanity check — minimal VUs, short duration
export const smokeOptions = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

// --- LOAD ---
// Normal + peak expected traffic simulation
export const loadOptions = {
  stages: [
    { duration: "1m", target: 20 },
    { duration: "3m", target: 50 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<2000", "p(99)<3000"],
  },
};

// --- STRESS ---
// Push beyond normal load to find performance degradation point
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
    http_req_duration: ["p(95)<5000"],
  },
};

// --- SPIKE ---
// Sudden burst of traffic — simulates flash sale / viral event
export const spikeOptions = {
  stages: [
    { duration: "30s", target: 10  },
    { duration: "30s", target: 200 },
    { duration: "1m",  target: 200 },
    { duration: "30s", target: 10  },
    { duration: "30s", target: 0   },
  ],
  thresholds: {
    http_req_failed: ["rate<0.20"],
    http_req_duration: ["p(95)<10000"],
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
  },
};

// --- SOAK ---
// Long duration test at moderate load — catches memory leaks and degradation over time
// ⚠️  Placeholder — full implementation coming in next stage
export const soakOptions = {
  stages: [
    { duration: "2m",  target: 50 },
    { duration: "30m", target: 50 },
    { duration: "2m",  target: 0  },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<2000"],
  },
};
