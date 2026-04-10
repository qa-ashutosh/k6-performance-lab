#!/bin/bash
# run-tests.sh
# Wrapper script that loads .env variables and runs a k6 test.
# Usage:
#   ./run-tests.sh tests/smoke-test.js
#   ./run-tests.sh tests/load-test.js
#   ./run-tests.sh --out influxdb=http://localhost:8086/k6 tests/load-test.js

set -e

# Load .env file if it exists
if [ -f .env ]; then
  echo "Loading environment from .env..."
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
  echo "Warning: .env file not found. Using default values."
  echo "Tip: cp .env.example .env and fill in your values."
fi

# Require at least one argument (the test file)
if [ -z "$1" ]; then
  echo ""
  echo "Usage: ./run-tests.sh [k6 options] <test-file>"
  echo ""
  echo "Examples:"
  echo "  ./run-tests.sh tests/smoke-test.js"
  echo "  ./run-tests.sh tests/load-test.js"
  echo "  ./run-tests.sh --out influxdb=http://localhost:8086/k6 tests/load-test.js"
  echo ""
  exit 1
fi

echo ""
echo "Running: k6 run $@"
echo "BASE_URL: ${BASE_URL:-http://localhost:3333}"
echo ""

k6 run "$@"
