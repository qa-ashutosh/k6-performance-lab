// tests/soak-test.js
// Soak Test — runs at moderate load for an extended period.
// Purpose: detect memory leaks, resource exhaustion, and performance
// degradation that only appears over time.
// ⚠️  This test runs for ~34 minutes — plan accordingly.

import { sleep } from "k6";
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
