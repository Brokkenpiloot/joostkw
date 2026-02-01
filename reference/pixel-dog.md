# PixelDog – How it works, design choices, and best practices

This document describes the PixelDog component: behaviour, design decisions, and how it aligns with the project spec in `project-spec.md`.

---

## 1. What it does

PixelDog is a **decorative** client-only component: a dog sprite that:

- **Follows the mouse horizontally** (X-axis only), pinned to a fixed **horizon line** (82vh).
- **Shows different sprites** depending on state:
  - **Idle + not moving:** front-facing dog (`dog.png`).
  - **Idle + moving:** sideways dog (`dog-moving-sideways.png`), mirrored when moving right.
  - **Jump sequence:** look-up → jumping → landing, then back to idle (see below).
- **Jump on click:** click anywhere → dog looks up (0.2s) → jumps up to click Y → lands back on horizon → idle.

The dog and horizon line are **non-interactive** and **decorative** (no keyboard interaction, no semantic content).

---

## 2. How it works (technical)

### 2.1 Visibility and horizon

- The dog is **hidden until the user moves the mouse** (`visible` state), to avoid a static sprite before any interaction.
- **Horizon Y** is derived from viewport height: `window.innerHeight * (HORIZON_VH / 100)` with `HORIZON_VH = 82`. It is updated on mount and on `resize`; a ref (`horizonYRef`) holds the latest value for use inside event handlers and transition callbacks.

### 2.2 Horizontal tracking (X only)

- **Mouse X** is stored in state and updated on `mousemove`, with a small offset (`OFFSET_X`) so the sprite aligns nicely with the cursor.
- **Dog Y** is either the horizon (idle / look-up) or the click target (jump-up) or back to horizon (fall-down). Vertical movement is driven by **CSS `top` transitions**, not by continuous mouse Y.

### 2.3 Direction and “moving” state

- **Direction** (`"left"` | `"right"`) is set by comparing current mouse X to previous mouse X (stored in `prevMouseXRef`).
- **Moving** is set to `true` on every `mousemove` and back to `false` after `MOVING_IDLE_MS` (200ms) of no movement. That determines whether the idle sprite is front-facing or sideways (and mirrored for right).

### 2.4 Jump sequence (phases)

Jump is a small state machine with four phases:

| Phase      | Sprite           | Position        | Next transition                    |
|-----------|-------------------|-----------------|------------------------------------|
| `idle`    | front / sideways  | horizon         | —                                  |
| `look-up` | dog-looking-up    | horizon         | After 200ms → `jump-up`            |
| `jump-up` | dog-jumping       | horizon → clickY| CSS transition; on end → `fall-down` |
| `fall-down` | dog-landing     | clickY → horizon| CSS transition; on end → `idle`    |

- **On click:** If `jumpPhaseRef.current === "idle"`, we set `jumpPhase` to `"look-up"`, keep `dogY` at horizon, and schedule a timeout for `LOOK_UP_MS`. When the timeout fires, we set `jumpPhase` to `"jump-up"` and `dogY` to `e.clientY`; CSS then animates `top` from horizon to click Y.
- **Transition end (top):** We use `onTransitionEnd` and only react when `e.propertyName === "top"`. We use the **functional updater** `setJumpPhase((phase) => ...)` so the callback doesn’t depend on `jumpPhase` and can have a stable dependency array `[]` (Rules of Hooks). When phase is `"jump-up"`, we set `dogY` to `horizonYRef.current` and phase to `"fall-down"`; when phase is `"fall-down"`, we set phase to `"idle"`.

### 2.5 Why refs in the click effect

- The click effect has dependency array `[horizonY, jumpPhase]` so that **the dependency array size stays constant** between renders (required by React/Next.js). If we cleared the look-up timeout in the effect’s cleanup, then when we set `jumpPhase` to `"look-up"`, the effect would re-run and cleanup would cancel the timeout before it fired. So **cleanup does not clear `lookUpTimeoutRef`**; only the click handler clears it when starting a new jump.
- The handler uses **refs** (`horizonYRef`, `jumpPhaseRef`) to read the latest horizon and phase without putting them in the effect deps, so we can keep `[horizonY, jumpPhase]` for stability while still preventing multiple jumps (only start when `jumpPhaseRef.current === "idle"`).

### 2.6 Hooks order

- All hooks (including `useCallback` for `handleTransitionEnd`) are declared **before** any conditional return (`if (!visible || horizonY === 0) return null`). That keeps the order and number of hooks consistent and avoids “order of Hooks” errors.

---

## 3. Design choices

- **X-only tracking:** The dog follows the cursor horizontally only and stays on a fixed horizon. This keeps the interaction simple and avoids the sprite chasing the cursor all over the screen.
- **Fixed horizon (82vh):** A single horizontal line gives a clear “ground” and makes the jump (up to click Y, then back) easy to understand.
- **Jump sequence:** Look-up → jump → land matches a clear mental model and uses four dedicated sprites (look-up, jumping, landing, plus front/sideways for idle).
- **Sideways sprite mirrored for right:** One asset is reused with `transform: scaleX(-1)` when moving right, to avoid maintaining two assets.
- **Decorative only:** The dog doesn’t affect focus, semantics, or SEO. It uses `aria-hidden` and `alt=""` so it’s treated as decorative by assistive tech.
- **Sprites in `public/Sprites`:** PNGs are copied from `frontend/Sprites/` into `frontend/public/Sprites/` with URL-safe names so Next.js can serve them; the component references them by path (e.g. `/Sprites/dog.png`).

---

## 4. Best practices applied (project-spec alignment)

- **TypeScript:** Typed state and props (`Direction`, `JumpPhase`, `JUMP_SPRITE_SRC`); strict mode and project TS settings apply.
- **Design tokens:** The glow uses the theme colour via `var(--neon-cyan)` in `drop-shadow`; the horizon line uses `bg-neon-cyan/60` and `shadow-[0_0_12px_var(--neon-cyan)]`, consistent with `globals.css` and Tailwind theme.
- **Component structure:** PixelDog lives in `src/components/` and is composed in `src/app/page.tsx`; the presentational sprite choice is encapsulated in `DogSprite` inside the same file.
- **Constants:** Timing and layout values (e.g. `DOG_SIZE`, `HORIZON_VH`, `LOOK_UP_MS`, `JUMP_UP_MS`, `FALL_DOWN_MS`, `MOVING_IDLE_MS`, `OFFSET_X`) and sprite paths are defined as named constants at the top of the file, not magic numbers/strings inline. They are component-local and not reused elsewhere, so they are kept in the component rather than in `src/lib/constants.ts`.
- **Accessibility:** The dog and horizon are decorative; the image uses `alt=""` and the container uses `aria-hidden` so screen readers skip them. No interactive elements; no focus management.
- **No dead code:** Only refs that are used are kept (e.g. no unused `jumpTimeoutRef`).

---

## 5. Files involved

- **Component:** `frontend/src/components/PixelDog.tsx`
- **Usage:** `frontend/src/app/page.tsx` (imports and renders `<PixelDog />`)
- **Assets:** `frontend/public/Sprites/` – `dog.png`, `dog-moving-sideways.png`, `dog-looking-up.png`, `dog-jumping.png`, `dog-landing.png` (source assets live in `frontend/Sprites/` with human-readable names and are copied into `public/Sprites/` for serving).

---

## Quick reference for contributors (including AI/agents)

- **Behaviour:** X-follow, fixed horizon, click = look-up (0.2s) → jump up → land → idle.
- **Sprites:** Idle = front or sideways (mirrored for right); jump = look-up → jumping → landing.
- **Refs:** `horizonYRef`, `jumpPhaseRef` for handlers; `lookUpTimeoutRef` for the look-up delay; do not clear look-up timeout in effect cleanup.
- **Hooks:** All hooks above the early return; click effect deps `[horizonY, jumpPhase]` for stable array size; transition end uses functional `setJumpPhase` and `[]` deps.
