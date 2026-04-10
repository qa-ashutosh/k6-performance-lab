// utils/http-client.js
// Reusable HTTP request wrapper for QuickPizza API.
// Centralises headers, auth token and base request structure.
// All test files import from here instead of duplicating http logic.

import http from "k6/http";
import { ENV } from "../config/env.js";

// Default headers used across all API requests
export function getHeaders() {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${ENV.AUTH_TOKEN}`,
  };
}

// GET request wrapper
export function get(path) {
  return http.get(`${ENV.BASE_URL}${path}`, {
    headers: getHeaders(),
  });
}

// POST request wrapper
export function post(path, payload) {
  return http.post(
    `${ENV.BASE_URL}${path}`,
    JSON.stringify(payload),
    { headers: getHeaders() }
  );
}

// Standard pizza request payload — default user scenario
export function defaultPizzaPayload() {
  return {
    maxCaloriesPerSlice: 1000,
    mustBeVegetarian: false,
    excludedIngredients: [],
    excludedTools: [],
    maxNumberOfToppings: 5,
    minNumberOfToppings: 2,
    customName: "",
  };
}

// Custom pizza request payload — restricted/filtered scenario
export function customPizzaPayload(name = "Custom") {
  return {
    maxCaloriesPerSlice: 5000,
    mustBeVegetarian: true,
    excludedIngredients: [],
    excludedTools: ["Pizza cutter"],
    maxNumberOfToppings: 7,
    minNumberOfToppings: 4,
    customName: name,
  };
}
