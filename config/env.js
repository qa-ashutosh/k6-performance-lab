// config/env.js
// Central environment configuration.
// All values read from environment variables with safe fallback defaults.
// Set real values in your local .env file (see .env.example).
// In CI, inject these as pipeline environment variables.

export const ENV = {
  // Base URL of the application under test
  BASE_URL: __ENV.BASE_URL || "http://localhost:3333",

  // Auth token for QuickPizza API — required for /api/pizza endpoint
  // Locally: set in .env file
  // CI: inject as secret environment variable
  AUTH_TOKEN: __ENV.AUTH_TOKEN || "",

  // Virtual user count override — useful for quick local runs
  TARGET_VUS: parseInt(__ENV.TARGET_VUS || "50"),

  // Test duration override
  DURATION: __ENV.DURATION || "5m",
};
