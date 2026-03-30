// tests/smoke-test.js
// Smoke Test — minimal load to verify the system is up and responding correctly.
// Only 5 VUs for 30s. If this fails, nothing else should run.

import http from "k6/http";
import { check, sleep } from "k6";
import { smokeOptions, BASE_URL } from "../config/options.js";

export const options = smokeOptions;

export default function () {
  // Test 1: Homepage / health check
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "homepage status is 200": (r) => r.status === 200,
  });

  sleep(1);

  // Test 2: Get pizza recommendations
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
      authorization: "<Auth-Token>", // --- REPLACE WITH VALID TOKEN ---
    },
  };

  const pizzaRes = http.post(`${BASE_URL}/api/pizza`, payload, params);

  check(pizzaRes, {
    "pizza endpoint status is 200": (r) => r.status === 200,
    "pizza response basic structure is valid": (r) => {
      let body;

      try {
        body = typeof r.body === "string" ? JSON.parse(r.body) : r.body;
        // console.log("Parsed response body:", JSON.stringify(body, null, 2));
      } catch (e) {
        console.error("Invalid JSON:", r.body);
        return false;
      }
      return (
        // Core pizza object
        body?.pizza !== undefined &&
        // Basic fields
        body?.pizza?.id !== undefined &&
        body?.pizza?.name !== "" &&
        // Dough validation
        body?.pizza?.dough?.name !== undefined &&
        body?.pizza?.dough?.caloriesPerSlice > 0 &&
        // Ingredients validation
        Array.isArray(body?.pizza?.ingredients) &&
        body?.pizza?.ingredients.length > 0 &&
        // Check first ingredient structure
        body?.pizza?.ingredients[0]?.name !== undefined &&
        // Tool validation
        body?.pizza?.tool !== undefined &&
        // Top-level fields
        body?.calories > 0 &&
        typeof body?.vegetarian === "boolean"
      );
    },
  });

  sleep(1);
}
