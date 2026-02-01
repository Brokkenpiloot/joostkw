# joostkw.nl – Project spec (coding best practices)

This document summarizes the coding best practices applied in this project. It serves as a **spec** for further development: when adding or changing code, follow these conventions so the codebase stays consistent and maintainable.

---

## 1. TypeScript

- **Strict mode** is enabled (`strict: true` in `tsconfig.json`).
- **`noUncheckedIndexedAccess`** – array/object index access is treated as possibly undefined; handle missing values explicitly.
- **`noImplicitReturns`** – every code path in a function that has a return type must return a value.

---

## 2. Linting and formatting

- **ESLint** runs on the `src` folder (`npm run lint`). Config: `eslint-config-next` (core-web-vitals + TypeScript) + `eslint-config-prettier` so ESLint doesn’t conflict with Prettier.
- **Prettier** is used for code formatting (`npm run format`). Config in `.prettierrc`.

---

## 3. Design tokens and Tailwind

- **Colors** are defined once in `src/app/globals.css` as CSS variables (`:root`) and exposed to Tailwind via `@theme inline` (e.g. `--color-background`, `--color-neon-cyan`).
- Use **theme-backed classes** (e.g. `bg-background`, `text-neon-cyan`, `border-neon-cyan/50`) instead of arbitrary values like `bg-[#0a0a0f]` so design stays consistent and changeable in one place.

---

## 4. Component structure

- **Presentational pieces** (reusable UI blocks) live in `src/components/` (e.g. `CornerAccents`, `StatusLine`, `PhotoFrame`, `UnderConstructionMessage`).
- Page files in `src/app/` compose these components and keep layout logic clear.

---

## 5. Semantic HTML and accessibility

- Use **semantic elements** where they fit: `<main>`, `<header>`, `<section>`, `<nav>`, etc. Avoid generic `<div>` for meaningful structure when a semantic tag applies.
- **Skip link** – provide a “Skip to content” link at the top (visible on keyboard focus) for keyboard users.
- **Focus** – interactive elements use the `.focus-ring` class (or equivalent) so keyboard focus is visible (e.g. outline in `neon-cyan`).
- **Images** – always set a meaningful `alt` text.
- **Decorative** elements use `aria-hidden` where appropriate.

---

## 6. Metadata and performance

- **Viewport** and **themeColor** are set in `layout.tsx` (via Next.js `viewport` and `metadata`).
- **Open Graph** metadata is set for link previews when the site is shared (title, description, url, siteName, locale, type). **Twitter/X meta tags are not used**; the project avoids dependency on Twitter/X and prefers to reduce reliance on American tech where practical.

---

## 7. Error and not-found handling

- **404** – custom `src/app/not-found.tsx` with the same visual style (cyberpunk theme) and a clear “Page not found” message plus link back home.
- **Runtime errors** – custom `src/app/error.tsx` with a friendly message and a “Try again” button that calls `reset()`.

---

## 8. Constants

- **Repeated or important strings/numbers** (site URL, version, labels) live in `src/lib/constants.ts` and are imported where needed. Avoid magic strings inline in components.

---

## 9. Dependencies and security

- **`npm run audit`** – run before releases to check for known vulnerabilities. Documented in the frontend README.

---

## 10. Tech and platform choices

- **No Twitter/X** – no Twitter/X meta tags or integration; preference to reduce dependency on American technology where practical.
- **Stack** – Next.js (App Router), TypeScript, Tailwind CSS, ESLint, Prettier. Hosting: Vercel. Domain/DNS: STRATO.

---

## Quick reference for contributors (including AI/agents)

- **Colors** → `globals.css` (`:root` + `@theme inline`); use `bg-background`, `text-neon-cyan`, etc.
- **Constants** → `src/lib/constants.ts`
- **Reusable UI** → `src/components/`
- **Pages** → `src/app/` (page.tsx, layout.tsx, not-found.tsx, error.tsx)
- **Lint** → `npm run lint`; **Format** → `npm run format`; **Audit** → `npm run audit`
- **Accessibility** → semantic HTML, skip link, visible focus (`.focus-ring`), meaningful `alt`
- **Metadata** → viewport, themeColor, Open Graph only (no Twitter)
