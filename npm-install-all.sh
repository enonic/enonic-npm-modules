find . -name package.json -not -path "*/node_modules/*" -exec bash -c "npm --prefix \$(dirname {}) install --production --no-audit" \;
