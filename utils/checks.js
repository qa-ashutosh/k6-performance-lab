// utils/checks.js
// Shared check functions used across all test types.
// v0.4.1 — added failure logging for easier debugging.

import { check } from "k6";

// Basic homepage availability check
export function checkHomepage(res) {
  const passed = check(res, {
    "homepage status is 200": (r) => r.status === 200,
  });
  if (!passed) {
    console.error(`[checkHomepage] Failed — status: ${res.status}, url: ${res.url}`);
  }
}

// Pizza API status + response time check
export function checkPizzaResponse(res) {
  const passed = check(res, {
    "pizza API status is 200": (r) => r.status === 200,
    "pizza response time < 2000ms": (r) => r.timings.duration < 2000,
  });
  if (!passed) {
    console.error(`[checkPizzaResponse] Failed — status: ${res.status}, duration: ${res.timings.duration}ms`);
  }
}

// Deep structure validation — used in smoke test for full contract check
export function checkPizzaStructure(res) {
  const passed = check(res, {
    "pizza endpoint status is 200": (r) => r.status === 200,
    "pizza response basic structure is valid": (r) => {
      let body;
      try {
        body = typeof r.body === "string" ? JSON.parse(r.body) : r.body;
      } catch (e) {
        console.error("[checkPizzaStructure] Invalid JSON:", r.body);
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
  if (!passed) {
    console.error(`[checkPizzaStructure] Failed — status: ${res.status}, body: ${res.body?.substring(0, 200)}`);
  }
}

// Custom recommendation check
export function checkCustomResponse(res) {
  const passed = check(res, {
    "recommendation POST responds": (r) =>
      r.status === 200 || r.status === 201,
  });
  if (!passed) {
    console.error(`[checkCustomResponse] Failed — status: ${res.status}`);
  }
}
