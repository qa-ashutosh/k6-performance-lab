// tests/breakpoint-test.js
// Breakpoint Test — continuously increases load until system fails.
// Purpose: find the absolute maximum capacity of the application.
// ⚠️  WARNING: This test WILL break your system — isolated environments only.
// ⚠️  Do NOT run in CI — manual execution only.

import { sleep, group } from "k6";
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

// teardown — runs once after all VUs finish
export function teardown() {
  group("breakpoint-test | Summary", () => {
    console.log("Type       : Breakpoint");
    console.log("VUs        : 50 → 100 → 150 → 200 → 250 → 300");
    console.log("Duration   : ~12m (2m per stage)");
    console.log("Endpoints  : GET /  |  POST /api/pizza");
    console.log("Thresholds : p(95) < 10000ms  |  error rate < 30%");
    console.log("Watch for  : Stage where error rate first crosses 30% = breaking point");
    console.log("Dashboard  : http://localhost:3000");
    console.log("⚠️  Restart Docker stack after this test to reset system state");
  });
}
