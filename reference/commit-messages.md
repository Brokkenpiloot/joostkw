# Commit message detail level

This document describes how detailed commit messages should be in this project. Use it when writing or reviewing commits (including AI/agent-assisted commits).

---

## Desired detail level

- **Summary line:** One short line (about 50–72 characters) that states *what* changed in plain language. Use present tense (“Add …”, “Fix …”, “Update …”). No need for a ticket ID or scope prefix unless you use them consistently.
- **Body (optional):** If the change is non-obvious or touches several areas, add 1–3 sentences explaining *what* was done and *where* (e.g. which component or file). Keep it concise; avoid step-by-step logs or full diff summaries.
- **Reference pointer (when useful):** If behaviour, design, or conventions are documented in the reference folder, add a single line pointing to it (e.g. `Details: reference/pixel-dog.md` or `See reference/project-spec.md`). No need to repeat the contents of those docs in the commit message.

---

## What to avoid

- **Too vague:** e.g. “Updates” or “Fix stuff” without saying what was updated or fixed.
- **Too verbose:** Long paragraphs, bullet lists of every file changed, or copy-pasting reference docs into the message.
- **Redundant context:** Don’t paste project-spec or pixel-dog details into the message; refer to the reference documents instead.

---

## Examples

**Good (single feature):**
```
Add PixelDog: mouse-following dog with jump-on-click and directional sprites

Details: reference/pixel-dog.md
```

**Good (small fix):**
```
Fix PixelDog: remove unused jumpTimeoutRef and keep hooks order stable
```

**Good (docs only):**
```
Add reference docs for PixelDog and commit message detail level
```

**Too vague:** `Update frontend`  
**Too long:** A 20-line message that repeats the whole of pixel-dog.md.

---

## Quick reference for contributors (including AI/agents)

- **Summary:** One line, ~50–72 chars, present tense, what changed.
- **Body:** Only if needed; 1–3 sentences, what + where.
- **Reference:** One line to reference docs when relevant (e.g. `Details: reference/pixel-dog.md`).
- **Rest of project context:** See other documents in the reference folder (setup, spec, PixelDog).
