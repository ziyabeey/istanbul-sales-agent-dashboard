#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
WEB_DIR="$ROOT_DIR/apps/web"
RESULT_DIR="$WEB_DIR/test-results/trust-browser"
SERVER_LOG="$RESULT_DIR/server.log"
BASE_URL="${TRUST_BASE_URL:-http://127.0.0.1:3000}"

mkdir -p "$RESULT_DIR"
: > "$SERVER_LOG"

CHROME_BIN="${CHROME_BIN:-}"
if [[ -z "$CHROME_BIN" ]]; then
  for candidate in google-chrome google-chrome-stable chromium chromium-browser; do
    if command -v "$candidate" >/dev/null 2>&1; then
      CHROME_BIN="$(command -v "$candidate")"
      break
    fi
  done
fi

if [[ -z "$CHROME_BIN" ]]; then
  echo "No Chrome/Chromium binary is available on this runner." >&2
  exit 1
fi

pnpm --filter @kepenk/web dev:smoke >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

cleanup() {
  if kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

ready=false
for _ in $(seq 1 90); do
  if curl --fail --silent --output /dev/null "$BASE_URL/giris"; then
    ready=true
    break
  fi

  if ! kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    echo "Kepenk web server exited before becoming ready." >&2
    cat "$SERVER_LOG" >&2
    exit 1
  fi

  sleep 1
done

if [[ "$ready" != "true" ]]; then
  echo "Kepenk web server did not become ready in time." >&2
  cat "$SERVER_LOG" >&2
  exit 1
fi

assert_login_dom() {
  local label="$1"
  local width="$2"
  local height="$3"
  local dom_file="$RESULT_DIR/${label}.html"

  "$CHROME_BIN" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --window-size="${width},${height}" \
    --virtual-time-budget=3000 \
    --dump-dom \
    "$BASE_URL/giris" >"$dom_file"

  grep -Fq 'KPNK' "$dom_file"
  grep -Fq 'Paneline giriş yap' "$dom_file"
  grep -Fq 'type="tel"' "$dom_file"
  grep -Fq 'SMS Kodu Gönder' "$dom_file"
  grep -Fq 'Hemen başla' "$dom_file"
}

assert_login_dom desktop-1440 1440 900
assert_login_dom mobile-390 390 844
assert_login_dom mobile-360 360 800

DASHBOARD_HEADERS="$RESULT_DIR/dashboard-redirect.headers"
ADMIN_HEADERS="$RESULT_DIR/admin-redirect.headers"

curl --silent --show-error --output /dev/null --dump-header "$DASHBOARD_HEADERS" \
  "$BASE_URL/dashboard/manage"
if ! grep -Eiq '^location: .*\/giris\?callbackUrl=.*dashboard' "$DASHBOARD_HEADERS"; then
  echo "Unauthenticated dashboard did not redirect to /giris." >&2
  cat "$DASHBOARD_HEADERS" >&2
  exit 1
fi

curl --silent --show-error --output /dev/null --dump-header "$ADMIN_HEADERS" \
  "$BASE_URL/admin"
if ! grep -Eiq '^location: .*\/admin\/login' "$ADMIN_HEADERS"; then
  echo "Unauthenticated admin did not redirect to /admin/login." >&2
  cat "$ADMIN_HEADERS" >&2
  exit 1
fi

echo "P0-00 trust browser smoke passed with $CHROME_BIN."
