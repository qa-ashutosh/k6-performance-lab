// tests/stress-test.js
// Stress Test — pushes beyond normal load to identify performance degradation.
// Ramps up to 200 VUs across 5 stages.
// Watch for: increased error rates, response time spikes, timeouts.

import { sleep, group } from "k6";
import { stressOptions } from "../config/options.js";
import { get, post, defaultPizzaPayload, customPizzaPayload } from "../utils/http-client.js";
import { checkHomepage, checkPizzaResponse, checkCustomResponse } from "../utils/checks.js";

export const options = stressOptions;

export default function () {
  // Step 1: Homepage under stress
  const homeRes = get("/");
  checkHomepage(homeRes);

  sleep(1);

  // Step 2: Standard pizza request under stress
  const pizzaRes = post("/api/pizza", defaultPizzaPayload());
  checkPizzaResponse(pizzaRes);

  sleep(1);

  // Step 3: Custom pizza request under stress
  const recRes = post("/api/pizza", customPizzaPayload("Stress"));
  checkCustomResponse(recRes);

  sleep(1);
}

// teardown — runs once after all VUs finish
export function teardown() {
  group("stress-test | Summary", () => {
    console.log("Type       : Stress");
    console.log("VUs        : 50 → 100 → 150 → 200 → 0");
    console.log("Duration   : ~8m across 5 stages");
    console.log("Endpoints  : GET /  |  POST /api/pizza (default + custom)");
    console.log("Thresholds : p(95) < 4000ms  |  p(99) < 6000ms  |  error rate < 10%");
    console.log("Watch for  : Error rate spikes and response time degradation per stage");
    console.log("Dashboard  : http://localhost:3000");
  });
}
