#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEST_DIR="$ROOT/.npmrc-test"
CLI="$ROOT/dist/cli.js"

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
DIM='\033[2m'
RESET='\033[0m'

if [ ! -f "$CLI" ]; then
  echo "dist/cli.js not found — run 'pnpm build' first"
  exit 1
fi

scenario() {
  local title="$1"
  local config="$2"
  local cli_args="${3:-}"
  shift 3
  local env_vars=("$@")

  echo ""
  echo -e "${BOLD}${CYAN}▶ $title${RESET}"
  echo -e "${DIM}.npmrc.config:${RESET}"
  echo "$config" | sed 's/^/  /'

  echo "$config" > "$TEST_DIR/.npmrc.config"
  rm -f "$TEST_DIR/.npmrc"

  (cd "$TEST_DIR" && env "${env_vars[@]}" node "$CLI" $cli_args 2>&1) | while IFS= read -r line; do
    echo -e "  ${DIM}[cli]${RESET} $line"
  done || true

  if [ -f "$TEST_DIR/.npmrc" ]; then
    echo -e "${DIM}.npmrc output:${RESET}"
    while IFS= read -r line; do
      echo -e "  ${GREEN}${line}${RESET}"
    done < <(grep -v "^# last modified:" "$TEST_DIR/.npmrc" | grep -v "^$")
  fi
}

echo -e "${BOLD}${YELLOW}npmrc-replace-env — manual demo${RESET}"
echo -e "${DIM}All scenarios use token value: ${RESET}${BOLD}my-secret-token${RESET}"

scenario \
  "Default prefix (NPMRC_)" \
  "@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=NPMRC_MY_TOKEN" \
  "" \
  "NPMRC_MY_TOKEN=my-secret-token"

scenario \
  "Custom prefix (--prefix MY_)" \
  "@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=MY_TOKEN" \
  "--prefix MY_" \
  "MY_TOKEN=my-secret-token"

scenario \
  "No prefix (--without-prefix)" \
  "@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=MY_TOKEN" \
  "--without-prefix" \
  "MY_TOKEN=my-secret-token"

scenario \
  'Shell curly syntax: ${MY_TOKEN}' \
  "@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=\${MY_TOKEN}" \
  "" \
  "MY_TOKEN=my-secret-token"

scenario \
  "Shell dollar syntax: \$MY_TOKEN" \
  "@myorg:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=\$MY_TOKEN" \
  "" \
  "MY_TOKEN=my-secret-token"

echo ""
echo -e "${DIM}Cleaning up...${RESET}"
rm -f "$TEST_DIR/.npmrc.config" "$TEST_DIR/.npmrc"
echo -e "${BOLD}${GREEN}Done.${RESET}"
