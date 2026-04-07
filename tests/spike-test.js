// tests/spike-test.js
// Spike Test — simulates a sudden and extreme surge in traffic (e.g. flash sale,
// viral event, marketing campaign drop). Jumps from 10 to 200 VUs instantly.
// Watch for: error spikes, recovery behavior, whether system stabilizes after burst.

import http from "k6/http";
import { check, sleep } from "k6";
import { spikeOptions, BASE_URL } from "../config/options.js";

export const options = spikeOptions;

export default function () {
  // Step 1: Homepage check — does it hold during the spike?
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    "homepage survives spike": (r) => r.status === 200,
  });

  sleep(1);

  // Step 2: Core pizza request during spike
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
    "pizza API survives spike": (r) => r.status === 200,
    "response time during spike": (r) => r.timings.duration < 10000,
  });

  sleep(1);
}
