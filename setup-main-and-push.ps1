# Run this script in a terminal where Git works (e.g. Git Bash, or PowerShell after installing Git).
# Creates main branch and pushes to GitHub Brokkenpiloot/joostkw.

Set-Location $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not in PATH. Install Git for Windows or run this in Git Bash."
    exit 1
}

if (-not (Test-Path .git)) {
    git init
}

git add .
git status
# Only commit if there are changes
$status = git status --porcelain
if ($status) {
    git commit -m "first commit"
}

git branch -M main

if (git remote get-url origin 2>$null) {
    git remote set-url origin https://github.com/Brokkenpiloot/joostkw.git
} else {
    git remote add origin https://github.com/Brokkenpiloot/joostkw.git
}

Write-Host "Pushing to origin main..."
git push -u origin main

Write-Host "Done. main branch is on GitHub; Vercel can deploy from it."
