// tests/smoke-test.js
// Smoke Test — minimal load to verify the system is up and responding correctly.
// Only 5 VUs for 30s. If this fails, nothing else should run.

import { sleep, group } from "k6";
import { smokeOptions } from "../config/options.js";
import { get, post, defaultPizzaPayload } from "../utils/http-client.js";
import { checkHomepage, checkPizzaStructure } from "../utils/checks.js";

export const options = smokeOptions;

export default function () {
  // Step 1: Homepage health check
  const homeRes = get("/");
  checkHomepage(homeRes);

  sleep(1);

  // Step 2: Pizza recommendation — full structure validation
  const pizzaRes = post("/api/pizza", defaultPizzaPayload());
  checkPizzaStructure(pizzaRes);

  sleep(1);
}

// teardown — runs once after all VUs finish
export function teardown() {
  group("smoke-test | Summary", () => {
    console.log("Type       : Smoke");
    console.log("VUs        : 5");
    console.log("Duration   : 30s");
    console.log("Endpoints  : GET /  |  POST /api/pizza");
    console.log("Thresholds : p(95) < 800ms  |  error rate < 1%");
    console.log("Dashboard  : http://localhost:3000");
  });
}
