// tests/load-test.js
// Load Test — simulates expected normal + peak traffic.
// Ramps up to 50 VUs over 5 minutes.

import { sleep, group } from "k6";
import { loadOptions } from "../config/options.js";
import { get, post, defaultPizzaPayload, customPizzaPayload } from "../utils/http-client.js";
import { checkHomepage, checkPizzaResponse, checkCustomResponse } from "../utils/checks.js";

export const options = loadOptions;

export default function () {
  // Step 1: Homepage
  const homeRes = get("/");
  checkHomepage(homeRes);

  sleep(1);

  // Step 2: Standard pizza recommendation
  const pizzaRes = post("/api/pizza", defaultPizzaPayload());
  checkPizzaResponse(pizzaRes);

  sleep(2);

  // Step 3: Custom/restricted pizza recommendation
  const recRes = post("/api/pizza", customPizzaPayload("LoadUser"));
  checkCustomResponse(recRes);

  sleep(1);
}

// teardown — runs once after all VUs finish
export function teardown() {
  group("load-test | Summary", () => {
    console.log("Type       : Load");
    console.log("VUs        : 20 → 50 → 0");
    console.log("Duration   : 5m (1m up | 3m hold | 1m down)");
    console.log("Endpoints  : GET /  |  POST /api/pizza (default + custom)");
    console.log("Thresholds : p(95) < 1500ms  |  p(99) < 2500ms  |  error rate < 5%");
    console.log("Dashboard  : http://localhost:3000");
  });
}
