// utils/checks.js
// Shared check functions used across all test types.
// Keeps check logic DRY and consistent — update once, applies everywhere.

import { check } from "k6";

// Basic homepage availability check
export function checkHomepage(res) {
  check(res, {
    "homepage status is 200": (r) => r.status === 200,
  });
}

// Pizza API status + response time check
export function checkPizzaResponse(res) {
  check(res, {
    "pizza API status is 200": (r) => r.status === 200,
    "pizza response time < 2000ms": (r) => r.timings.duration < 2000,
  });
}

// Deep structure validation — used in smoke test for full contract check
export function checkPizzaStructure(res) {
  check(res, {
    "pizza endpoint status is 200": (r) => r.status === 200,
    "pizza response basic structure is valid": (r) => {
      let body;
      try {
        body = typeof r.body === "string" ? JSON.parse(r.body) : r.body;
      } catch (e) {
        console.error("Invalid JSON:", r.body);
        return false;
      }
      return (
        body?.pizza !== undefined &&
        body?.pizza?.id !== undefined &&
        body?.pizza?.name !== "" &&
        body?.pizza?.dough?.name !== undefined &&
        body?.pizza?.dough?.caloriesPerSlice > 0 &&
        Array.isArray(body?.pizza?.ingredients) &&
        body?.pizza?.ingredients.length > 0 &&
        body?.pizza?.ingredients[0]?.name !== undefined &&
        body?.pizza?.tool !== undefined &&
        body?.calories > 0 &&
        typeof body?.vegetarian === "boolean"
      );
    },
  });
}

// Custom recommendation check
export function checkCustomResponse(res) {
  check(res, {
    "recommendation POST responds": (r) =>
      r.status === 200 || r.status === 201,
  });
}
