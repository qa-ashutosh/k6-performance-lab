// tests/breakpoint-test.js
// Breakpoint Test — continuously increases load until system fails.
// Purpose: find the absolute maximum capacity of the application.
// ⚠️  WARNING: This test WILL break your system — isolated environments only.
// ⚠️  Do NOT run in CI — manual execution only.

import { sleep } from "k6";
import { breakpointOptions } from "../config/options.js";
import { get, post, defaultPizzaPayload } from "../utils/http-client.js";
import { checkHomepage, checkPizzaResponse } from "../utils/checks.js";

export const options = breakpointOptions;

export default function () {
  // Step 1: Homepage — monitor when it starts failing
  const homeRes = get("/");
  checkHomepage(homeRes);

  sleep(0.5);

  // Step 2: Core request — watch for failures as VUs climb
  const pizzaRes = post("/api/pizza", defaultPizzaPayload());
  checkPizzaResponse(pizzaRes);

  sleep(0.5);
}
