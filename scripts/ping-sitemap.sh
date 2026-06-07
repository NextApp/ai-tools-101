#!/bin/bash
# Daily sitemap ping to Google
# This pushes the latest sitemap to Google for faster indexing

SITEMAP_URL="https://ai-tools-101.com/sitemap-index.xml"

echo "=== $(date -u '+%Y-%m-%d %H:%M:%S UTC') ==="
echo "Pinging Google with sitemap: $SITEMAP_URL"

# Ping Google
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP_URL")
echo "Google response: $RESPONSE"

if [ "$RESPONSE" = "200" ]; then
    echo "✅ Sitemap submitted successfully"
else
    echo "⚠️  Unexpected response: $RESPONSE"
fi
