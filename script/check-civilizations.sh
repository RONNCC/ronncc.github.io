#!/usr/bin/env bash
# Full browser regression gate, called by the existing analytics check in CI.
# Workflow files deliberately remain unchanged. A manual dispatch of the
# validation workflow audits the live site; push/PR/deploy checks run locally.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)/scripts/civilizations-qa"

target="${BASE_URL:-}"
if [[ "${GITHUB_WORKFLOW:-}" == 'Check analytics coverage' ]]; then
  if [[ "${GITHUB_EVENT_NAME:-}" == workflow_dispatch ]] ||
     [[ "${GITHUB_EVENT_NAME:-}" == push && "$(git log -1 --format=%s)" == *'[civilizations-live-audit]'* ]]; then
    target=https://sghose.me
  fi
fi
printf '\nCivilization Readers browser audit (%s)\n' "${target:-local preview}"
npm ci
npx playwright install --with-deps chromium firefox webkit

failed=0
for browser in chromium firefox webkit; do
  BROWSER="$browser" BASE_URL="$target" npm test || failed=1
  # Preserve a compact visual review in the existing job log without requiring
  # a new workflow/action or any additional GitHub permissions.
  node emit-review.mjs "$browser"
done
exit "$failed"
