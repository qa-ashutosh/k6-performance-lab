// tests/load-test.js
// Load Test — simulates expected normal + peak traffic.
// Ramps up to 50 VUs over 5 minutes to observe system behavior under load.
// NOTE: thresholds not yet defined here — to be added after baseline metrics observed

import http from "k6/http";
import { check, sleep } from "k6";
import { loadOptions, BASE_URL } from "../config/options.js";

export const options = loadOptions;

export default function () {
  // Simulate a user browsing the pizza app

  // Step 1: Land on homepage
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "homepage is up": (r) => r.status === 200,
  });

  sleep(1);

  // Step 2: Browse pizza recommendations
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
    "pizza API responds": (r) => r.status === 200,
    "response time OK": (r) => r.timings.duration < 1000,
  });

  sleep(2);

  // Step 4: Get a specific recommendation with restrictions
  const customPayload = JSON.stringify({
    maxCaloriesPerSlice: 5000,
    mustBeVegetarian: true,
    excludedIngredients: [],
    excludedTools: ["Pizza cutter"],
    maxNumberOfToppings: 7,
    minNumberOfToppings: 4,
    customName: "Ash",
  });

  const recRes = http.post(`${BASE_URL}/api/pizza`, customPayload, params);

  check(recRes, {
    "recommendation POST responds": (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
