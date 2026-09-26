#!/usr/bin/env bash
# Preserve the real Docker exit status while keeping the console report bounded.
set -euo pipefail

image="${1:?Usage: build-cloud-run-evidence.sh IMAGE}"
: "${RUNNER_TEMP:?RUNNER_TEMP must point outside the checkout}"
: "${GITHUB_SHA:?GITHUB_SHA must identify the tested checkout}"
root="$(git rev-parse --show-toplevel)"
cd "$root"
checkout="$(git rev-parse HEAD)"
if [[ "$checkout" != "$GITHUB_SHA" ]]; then
  printf 'Checkout mismatch: expected %s, found %s\n' "$GITHUB_SHA" "$checkout" >&2
  exit 65
fi
if [[ -n "$(git status --porcelain --untracked-files=all)" ]]; then
  printf 'Refusing to attribute a dirty checkout to %s\n' "$checkout" >&2
  exit 65
fi
mkdir -p "$RUNNER_TEMP"
temp_root="$(cd "$RUNNER_TEMP" && pwd -P)"
case "$temp_root/" in
  "$root/"*) printf 'Evidence must remain outside the Docker build context\n' >&2; exit 65 ;;
esac
evidence="$temp_root/cloud-run-build-evidence"
mkdir -p "$evidence"
log="$evidence/build.log"
report="$evidence/report.txt"

{
  printf 'checkout_sha=%s\n' "$checkout"
  printf 'source_sha=%s\n' "${CLOUD_RUN_SOURCE_SHA:-not-provided}"
  printf 'run_id=%s\nrun_attempt=%s\n' "${GITHUB_RUN_ID:-local}" "${GITHUB_RUN_ATTEMPT:-1}"
  printf 'image=%s\n' "$image"
  # Read headers directly: shallow checkouts may not have parent objects.
  git cat-file -p HEAD | sed -n '/^$/q; /^tree /p; /^parent /p'
  printf '\nTracked build inputs (Git object IDs):\n'
  git ls-files --stage -- Dockerfile .dockerignore .github/workflows/ci.yml \
    package.json pnpm-lock.yaml pnpm-workspace.yaml apps/web/package.json \
    apps/web/next.config.js apps/web/next.config.mjs apps/web/next.config.ts \
    apps/web/src/app/api/health/route.ts packages/templates/package.json \
    scripts/build-cloud-run-evidence.sh
} > "$evidence/provenance.txt"

# No pipe to tee: reporting cannot turn a failed build into a successful step.
if docker build --progress=plain -t "$image" . > "$log" 2>&1; then
  status=0
else
  status=$?
fi
printf '%s\n' "$status" > "$evidence/exit-code.txt"
{
  cat "$evidence/provenance.txt"
  printf '\nbuild_exit_code=%s\n' "$status"
  printf 'build_log_bytes=%s\n' "$(wc -c < "$log")"
  sha256sum "$log"
  printf '\nFirst error matches (bounded excerpt, not the complete log):\n'
  # head can close the pipe early. This non-gating diagnostic never determines status.
  { grep -n -m 12 -Ei 'failed to compile|module not found|cannot find module|syntaxerror|error:|error occurred prerendering' "$log" | head -c 8000; } || true
  printf '\nFinal output (at most 120 lines and 16000 bytes):\n'
  tail -c 16000 "$log" | tail -n 120
} > "$report"
# Prefix every line so build output cannot be interpreted as Actions commands.
sed 's/^/ | /' "$report"
exit "$status"
