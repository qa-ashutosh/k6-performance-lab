// tests/stress-test.js
// Stress Test — pushes the system beyond normal load to identify the point
// where performance degrades. Ramps up to 200 VUs in stages.
// Watch for: increased error rates, response time spikes, timeouts.

import http from "k6/http";
import { check, sleep } from "k6";
import { stressOptions, BASE_URL } from "../config/options.js";

export const options = stressOptions;

export default function () {
  // Step 1: Homepage health check under stress
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "homepage is up under stress": (r) => r.status === 200,
  });

  sleep(1);

  // Step 2: Pizza recommendation under increasing load
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
      authorization: "Token xox2YtMP7j9W3inM", // --- REPLACE WITH VALID TOKEN ---
    },
  };

  const pizzaRes = http.post(`${BASE_URL}/api/pizza`, payload, params);
  check(pizzaRes, {
    "pizza API responds under stress": (r) => r.status === 200,
    "response time acceptable under stress": (r) => r.timings.duration < 5000,
  });

  sleep(1);

  // Step 3: Custom pizza request under stress
  const customPayload = JSON.stringify({
    maxCaloriesPerSlice: 5000,
    mustBeVegetarian: true,
    excludedIngredients: [],
    excludedTools: ["Pizza cutter"],
    maxNumberOfToppings: 7,
    minNumberOfToppings: 4,
    customName: "Stress",
  });

  const recRes = http.post(`${BASE_URL}/api/pizza`, customPayload, params);
  check(recRes, {
    "custom recommendation responds under stress": (r) =>
      r.status === 200 || r.status === 201,
  });

  sleep(1);
}
