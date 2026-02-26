# Local-only workflow for new features

This document sets the default workflow for new features so the live site is not impacted without explicit approval.

## Rule

- **All new features and changes are local-only by default.**
- **Do not push** to `origin/main` unless the user explicitly requests a push.

## Why

- Prevents accidental breakage on the live site.
- Lets us review changes locally first.

## Exceptions

- If the user explicitly asks to push, proceed and confirm the target branch.
