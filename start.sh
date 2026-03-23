#!/bin/bash
# Start lokale dev server voor Het Formatie Spel
cd "$(dirname "$0")"

echo "=================================="
echo "  Het Formatie Spel — Dev Server"
echo "=================================="
echo ""
echo "  Informateur: http://localhost:8080/index.html"
echo "  TV-scherm:   http://localhost:8080/tv.html"
echo ""
echo "  Druk Ctrl+C om te stoppen."
echo ""

# Open browser (macOS: open, Linux: xdg-open)
if command -v open &> /dev/null; then
  open http://localhost:8080/index.html
elif command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:8080/index.html
fi

python3 -m http.server 8080
