// tests/spike-test.js
// Spike Test — simulates sudden extreme traffic burst.
// Jumps from 10 to 200 VUs instantly to test spike recovery.
// Watch for: error spikes, whether system recovers after burst.

import { sleep } from "k6";
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
