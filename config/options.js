// config/options.js
// Stage 1: Hardcoded config values — will be moved to env vars in a later refactor

export const BASE_URL = "http://localhost:3333";

export const smokeOptions = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export const loadOptions = {
  stages: [
    { duration: "1m", target: 20 },
    { duration: "3m", target: 50 },
    { duration: "1m", target: 0 },
  ],
  // TODO: add thresholds here in next iteration
};
