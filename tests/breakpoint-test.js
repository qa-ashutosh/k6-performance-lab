// tests/breakpoint-test.js
// Breakpoint Test — continuously increases load until the system fails.
// Purpose: find the absolute maximum capacity of the application.
// ⚠️  WARNING: This test WILL break your system — run in isolated environments only.
// ⚠️  Do NOT include in CI pipeline — run manually when needed.

import http from "k6/http";
import { check, sleep } from "k6";
import { breakpointOptions, BASE_URL } from "../config/options.js";

export const options = breakpointOptions;

export default function () {
  // Step 1: Homepage — monitor when it starts failing
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "homepage still responding": (r) => r.status === 200,
  });

  sleep(0.5);

  // Step 2: Core request — this is where we expect failures to start appearing
  const payload = JSON.stringify({
    maxCaloriesPerSlice: 1000,
    mustBeVegetarian: false,
    excludedIngredients: [],
    excludedTools: [],
    maxNumberOfToppings: 5,
    minNumberOfToppings: 2,
    customName: "",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      //   authorization: "<Auth-Token>", // --- REPLACE WITH VALID TOKEN ---
      authorization: "Token xox2YtMP7j9W3inM", // --- REPLACE WITH VALID TOKEN ---
    },
  };

  const pizzaRes = http.post(`${BASE_URL}/api/pizza`, payload, params);
  check(pizzaRes, {
    "pizza API still responding": (r) => r.status === 200,
  });

  sleep(0.5);
}
