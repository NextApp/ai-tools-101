#!/bin/bash
set -e
cd "$(dirname "$0")/.."

echo "📌 Step 1/2: Generating pin HTML from articles..."
python3 scripts/gen-pins.py "$@" 2>&1

echo ""
echo "📌 Step 2/2: Screenshotting pins to PNG..."
node scripts/screenshot-pins.cjs

echo ""
echo "✅ Complete: $(ls -1 public/pins/*.png 2>/dev/null | wc -l | tr -d ' ') pins generated"
