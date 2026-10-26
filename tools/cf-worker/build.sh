#!/bin/sh
# Surenka viešus puslapio failus į public/paslaugos/renginiu-erdves/ (be vidinių dokumentų, kainoraščių, api/, tools/)
set -e
cd "$(dirname "$0")"
ROOT=../..
OUT=public/paslaugos/renginiu-erdves
rm -rf public && mkdir -p "$OUT"
cp "$ROOT"/*.html "$OUT"/
rsync -a --exclude docs --exclude .DS_Store "$ROOT"/assets "$OUT"/
cp sitemap.xml "$OUT"/sitemap.xml
echo "OK: $(find public -type f | wc -l | tr -d ' ') failai"
