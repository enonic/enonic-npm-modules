#!/bin/bash

# Find all directories containing package.json files, up to 2 levels deep, excluding node_modules
directories=$(find . -maxdepth 3 -type d -name "node_modules" -prune -o -type f -name "package.json" -exec dirname {} \;)

# Loop through each directory
for dir in $directories; do
    echo "Installing dependencies in $dir"
    cd "$dir" || exit 1
    npm install
    cd - || exit 1
done
