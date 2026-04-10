// tests/stress-test.js
// Stress Test — pushes beyond normal load to identify performance degradation.
// Ramps up to 200 VUs across 5 stages.
// Watch for: increased error rates, response time spikes, timeouts.

import { sleep } from "k6";
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
