// tests/soak-test.js
// Soak Test — runs at moderate load for an extended period.
// Purpose: detect memory leaks, resource exhaustion, and performance
// degradation that only appears over time.
// ⚠️  This test runs for ~34 minutes — plan accordingly.

import { sleep, group } from "k6";
import { soakOptions } from "../config/options.js";
import { get, post, defaultPizzaPayload, customPizzaPayload } from "../utils/http-client.js";
import { checkHomepage, checkPizzaResponse, checkCustomResponse } from "../utils/checks.js";

export const options = soakOptions;

export default function () {
  // Step 1: Homepage — watch for degradation over time
  const homeRes = get("/");
  checkHomepage(homeRes);

  sleep(1);

  // Step 2: Standard pizza request — monitor response times across full duration
  const pizzaRes = post("/api/pizza", defaultPizzaPayload());
  checkPizzaResponse(pizzaRes);

  sleep(2);

  // Step 3: Custom pizza request — sustained varied load
  const recRes = post("/api/pizza", customPizzaPayload("Soak"));
  checkCustomResponse(recRes);

  sleep(1);
}

// teardown — runs once after all VUs finish
export function teardown() {
  group("soak-test | Summary", () => {
    console.log("Type       : Soak");
    console.log("VUs        : steady 50");
    console.log("Duration   : ~34m (2m ramp up | 30m hold | 2m ramp down)");
    console.log("Endpoints  : GET /  |  POST /api/pizza (default + custom)");
    console.log("Thresholds : p(95) < 1500ms  |  p(99) < 2500ms  |  error rate < 5%");
    console.log("Watch for  : p(95) drift — compare minute 5 vs minute 30 in Grafana");
    console.log("Dashboard  : http://localhost:3000");
  });
}
