#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
WEB_DIR="$ROOT_DIR/apps/web"
RESULT_DIR="$WEB_DIR/test-results/trust-browser"
SERVER_LOG="$RESULT_DIR/server.log"
BASE_URL="${TRUST_BASE_URL:-http://127.0.0.1:3000}"
TRUST_ADMIN_SECRET_TOKEN="${TRUST_ADMIN_SECRET_TOKEN:-p0-00-trust-smoke-admin-secret}"

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

# Production is expected to have ADMIN_SECRET_TOKEN configured. The separate
# characterization suite pins the current fail-open behavior when it is absent.
ADMIN_SECRET_TOKEN="$TRUST_ADMIN_SECRET_TOKEN" \
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

assert_redirects_to_login() {
  local label="$1"
  shift
  local headers_file="$RESULT_DIR/${label}.headers"

  curl --silent --show-error --output /dev/null --dump-header "$headers_file" "$@"
  if ! grep -Eiq '^location: .*\/giris\?callbackUrl=' "$headers_file"; then
    echo "$label did not redirect to /giris." >&2
    cat "$headers_file" >&2
    exit 1
  fi
}

assert_login_dom desktop-1440 1440 900
assert_login_dom mobile-390 390 844
assert_login_dom mobile-360 360 800

assert_redirects_to_login dashboard-unauthenticated "$BASE_URL/dashboard/manage"
assert_redirects_to_login dashboard-random-cookie \
  --header 'Cookie: kepenk_session=random-cookie' \
  "$BASE_URL/dashboard/manage"

# Build a cryptographically valid legacy {esnafId} JWT with the development
# session secret. P0-03 must still reject it at the dashboard request gate.
LEGACY_TOKEN="$(node <<'NODE'
const crypto = require('crypto')
const secret = 'kepenk-dev-secret-change-in-production-32ch'
const now = Math.floor(Date.now() / 1000)
const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
const header = encode({ alg: 'HS256', typ: 'JWT' })
const payload = encode({ esnafId: 'legacy-smoke-tenant', iss: 'kepenk.ai', iat: now, exp: now + 3600 })
const input = `${header}.${payload}`
const signature = crypto.createHmac('sha256', secret).update(input).digest('base64url')
process.stdout.write(`${input}.${signature}`)
NODE
)"
assert_redirects_to_login dashboard-legacy-signed-cookie \
  --header "Cookie: kepenk_session=$LEGACY_TOKEN" \
  "$BASE_URL/dashboard/manage"

for subdomain in app edit manage; do
  assert_redirects_to_login "${subdomain}-subdomain-unauthenticated" \
    --header "Host: ${subdomain}.localhost:3000" \
    "$BASE_URL/"
done

# /giris itself must remain reachable on business subdomains instead of being
# rewritten under /dashboard and entering an auth redirect loop.
APP_LOGIN_STATUS="$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' \
  --header 'Host: app.localhost:3000' \
  "$BASE_URL/giris")"
if [[ "$APP_LOGIN_STATUS" != "200" ]]; then
  echo "app.localhost /giris is not directly reachable (status $APP_LOGIN_STATUS)." >&2
  exit 1
fi

# Destek subdomain remains a public/support surface and must not be captured by
# the business dashboard auth gate.
DESTEK_HEADERS="$RESULT_DIR/destek-subdomain.headers"
curl --silent --show-error --output /dev/null --dump-header "$DESTEK_HEADERS" \
  --header 'Host: destek.localhost:3000' \
  "$BASE_URL/"
if grep -Eiq '^location: .*\/giris' "$DESTEK_HEADERS"; then
  echo "destek.localhost was incorrectly captured by business auth." >&2
  cat "$DESTEK_HEADERS" >&2
  exit 1
fi

ADMIN_HEADERS="$RESULT_DIR/admin-redirect.headers"
curl --silent --show-error --output /dev/null --dump-header "$ADMIN_HEADERS" \
  "$BASE_URL/admin"
if ! grep -Eiq '^location: .*\/admin\/login' "$ADMIN_HEADERS"; then
  echo "Configured-secret unauthenticated admin did not redirect to /admin/login." >&2
  cat "$ADMIN_HEADERS" >&2
  exit 1
fi

echo "P0-03 trust browser smoke passed with $CHROME_BIN."
