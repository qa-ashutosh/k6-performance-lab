// tests/smoke-test.js
// Smoke Test — minimal load to verify the system is up and responding correctly.
// Only 5 VUs for 30s. If this fails, nothing else should run.

import { sleep } from "k6";
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
