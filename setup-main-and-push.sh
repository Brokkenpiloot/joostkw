#!/bin/sh
# Run this in Git Bash (right-click in folder -> Git Bash Here) or any terminal where git works.
# Creates main branch and pushes to GitHub Brokkenpiloot/joostkw.

cd "$(dirname "$0")"

if ! command -v git >/dev/null 2>&1; then
  echo "Git not found. Install Git for Windows or run in a terminal where git works."
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add .
git status

if [ -n "$(git status --porcelain)" ]; then
  git commit -m "first commit"
fi

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin https://github.com/Brokkenpiloot/joostkw.git
else
  git remote add origin https://github.com/Brokkenpiloot/joostkw.git
fi

echo "Pushing to origin main..."
git push -u origin main

echo "Done. main branch is on GitHub; Vercel can deploy from it."
