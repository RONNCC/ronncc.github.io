#!/usr/bin/env bash
# Live sweep: every published URL returns 200 and carries the GA tag.
set -u
cd "$(git rev-parse --show-toplevel)"
GA="G-WL390Z0Q0Y"
base="https://sghose.me"
fail=0
count=0

paths=$(git ls-files | grep -E '\.(html|md)$' | grep -vE '^_|node_modules/|README\.md$|_posts/|\.scss$')

while IFS= read -r f; do
  [ -z "$f" ] && continue
  case "$f" in
    index.html) p="/" ;;
    */index.html) p="/${f%/index.html}/" ;;
    *.html) p="/$f" ;;
    *.md)
      pl=$(sed -n '2,8p' "$f" | grep '^permalink:' | head -1 | sed 's/permalink:[[:space:]]*//')
      if [ -n "$pl" ]; then p="$pl"; else p="/${f%.md}/"; fi ;;
    *) continue ;;
  esac
  count=$((count + 1))
  code=$(curl -sS -m 20 -o /tmp/sweep.html -w "%{http_code}" "$base$p?cb=$RANDOM$RANDOM" 2>/dev/null)
  ga=$(grep -c "$GA" /tmp/sweep.html 2>/dev/null)
  if [ "$code" != "200" ] || [ "${ga:-0}" -eq 0 ]; then
    echo "FAIL code=$code GA=${ga:-0} $p"
    fail=1
  fi
done <<< "$paths"

if [ "$fail" -eq 0 ]; then echo "live sweep: ALL PAGES OK ($count urls)"; fi
exit "$fail"
