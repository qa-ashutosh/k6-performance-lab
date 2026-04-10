// tests/load-test.js
// Load Test — simulates expected normal + peak traffic.
// Ramps up to 50 VUs over 5 minutes.

import { sleep } from "k6";
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
