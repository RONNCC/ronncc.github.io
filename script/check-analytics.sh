#!/usr/bin/env bash
# Fails if any publishable page can end up without analytics.
# Rule: every tracked .html/.md outside _layouts/_includes/_posts (and
# READMEs) must have front matter with a `layout:` — analytics is injected
# by _layouts/default.html (templated pages) or _layouts/standalone.html
# (raw HTML pages), both of which pull in _includes/analytics.html.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

fail=0
while IFS= read -r f; do
  if ! head -1 "$f" | grep -q '^---$'; then
    echo "MISSING front matter (no layout -> no analytics): $f"
    fail=1
  elif ! sed -n '2,6p' "$f" | grep -q '^layout:'; then
    echo "MISSING layout in front matter: $f"
    fail=1
  fi
  # permalink: pretty rewrites named .html pages to directory URLs unless
  # an explicit permalink preserves the original path
  if [[ "$f" == *.html && "$f" != */index.html && "$f" != "index.html" ]]; then
    if ! sed -n '2,8p' "$f" | grep -q '^permalink:'; then
      echo "MISSING permalink (pretty permalinks would move $f to a directory URL): $f"
      fail=1
    fi
  fi
done < <(git ls-files | grep -E '\.(html|md)$' | grep -vE '^(_layouts|_includes|node_modules)/' | grep -vE '^_posts/' | grep -v 'README\.md$')

# every layout must reach analytics.html (directly or via default)
while IFS= read -r f; do
  if ! grep -qE 'include (analytics|default)\.html|googletagmanager|^layout: (default|standalone)' "$f"; then
    echo "LAYOUT does not reach analytics: $f"
    fail=1
  fi
done < <(git ls-files '_layouts/*.html')

# the analytics include itself must reference the gtag loader
if ! grep -q 'googletagmanager' _includes/analytics.html 2>/dev/null; then
  echo "MISSING gtag snippet in _includes/analytics.html"
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "analytics coverage: OK"
fi
exit "$fail"
