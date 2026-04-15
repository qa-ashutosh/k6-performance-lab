// tests/spike-test.js
// Spike Test — simulates sudden extreme traffic burst.
// Ramp adjusted from 30s to 45s for more realistic spike behavior.
// Watch for: error spikes, whether system recovers after burst.

import { sleep, group } from "k6";
import { spikeOptions } from "../config/options.js";
import { get, post, defaultPizzaPayload } from "../utils/http-client.js";
import { checkHomepage, checkPizzaResponse } from "../utils/checks.js";

export const options = spikeOptions;

export default function () {
  // Step 1: Homepage during spike
  const homeRes = get("/");
  checkHomepage(homeRes);

  sleep(1);

  // Step 2: Pizza request during spike
  const pizzaRes = post("/api/pizza", defaultPizzaPayload());
  checkPizzaResponse(pizzaRes);

  sleep(1);
}

// teardown — runs once after all VUs finish
export function teardown() {
  group("spike-test | Summary", () => {
    console.log("Type       : Spike");
    console.log("VUs        : 10 → burst 200 → hold → recover → 0");
    console.log("Duration   : ~3.5m (30s baseline | 45s spike | 1m hold | 45s recovery)");
    console.log("Endpoints  : GET /  |  POST /api/pizza");
    console.log("Thresholds : p(95) < 8000ms  |  error rate < 20%");
    console.log("Watch for  : Did error rate recover after burst dropped?");
    console.log("Dashboard  : http://localhost:3000");
  });
}
