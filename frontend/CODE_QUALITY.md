# Code quality – Best practices and choices

This document lists coding best practices relevant to this project (Next.js, TypeScript, React, Tailwind). For each item you can choose: **Apply** (implement the suggestion), **Skip** (leave as-is), or **Custom** (describe what you want).

_If you’re new to TypeScript or web development, the explanations below are there to clarify the more technical terms. Basics like arrays, objects, functions, and code formatting are not explained._

---

## 1. TypeScript strictness

**Best practice:** Use strict TypeScript so types catch bugs at build time.

**What some of this means:**

- **TypeScript** is JavaScript with **types**: you (or the editor) can say “this variable is a number” or “this function returns a string.” The TypeScript compiler then checks that your code respects those types.
- **Strictness** here means how strict that checking is. “Stricter” = more rules, so more potential bugs are caught before the code runs.
- **Build time** is when you run `npm run build` (or the editor checks your code). Catching an error then is better than discovering it only when a user hits a certain page.

**Current state:** The project’s TypeScript config (`tsconfig.json`) has `"strict": true`, which already enables a good set of checks. No extra strict options are turned on.

**Suggestion:** Optionally add two more checks:

- **`noUncheckedIndexedAccess`** – When you read from an array or object by index (e.g. `myArray[3]` or `myObject["key"]`), that value might not exist. This option makes TypeScript treat the result as “maybe undefined,” so you have to handle the “missing” case. That avoids runtime errors when you assume something is there and it isn’t.
- **`noImplicitReturns`** – If a function is supposed to return a value, every path through the function must actually return something. So you don’t accidentally forget a return in one branch.

**Your choice:** [ ] **Apply** (add these options) [ ] **Skip** (keep current) [ ] **Custom** **\_**

---

## 2. Linting and formatting

**Best practice:** Lint and format code consistently so style and common issues are enforced automatically.

**What some of this means:**

- **Linting** means running a tool that **automatically checks** your code for common mistakes (e.g. unused variables, possible bugs) and sometimes style rules (e.g. “use single quotes”). The tool doesn’t run your app; it just reads the files and reports what it finds.
- **ESLint** is the **linting tool** used in this project. It’s the standard for JavaScript and TypeScript. You run it with `npm run lint` (or `npx eslint …`).
- **Prettier** is a **code formatter**: it rewrites your code to match a consistent style (indentation, line length, quotes, etc.). You don’t have to align things by hand; Prettier does it. Many projects use ESLint for “logic” rules and Prettier for “formatting” so they don’t conflict (there’s a config for that).

**Current state:** ESLint is set up with the Next.js config (core-web-vitals + TypeScript). The `package.json` script is `"lint": "eslint"` with no folder specified, so it might not run on your `src` folder by default. Prettier is not installed.

**Suggestion:**

- Fix the lint script so it clearly runs on your source code, e.g. `"lint": "eslint src"`.
- Optionally add Prettier and a `"format"` script so you can format the whole project in one go; and add a small config so ESLint and Prettier don’t contradict each other.

**Your choice:** [ ] **Apply** (fix lint script + add Prettier) [ ] **Lint only** (fix lint script, no Prettier) [ ] **Skip** [ ] **Custom** **\_**

---

## 3. Design tokens / single source of colors

**Best practice:** Define colors (and other design values) in one place so the UI stays consistent and is easy to change later.

**What some of this means:**

- **Design tokens** (in this context) are **named values** for things like colors or spacing—e.g. “background,” “neon-cyan,” “spacing-large.” Instead of pasting `#0a0a0f` in many files, you define it once and refer to it by name. That way, changing the background color is a one-line change.
- **Tailwind** is the CSS framework this project uses. It gives you short class names like `bg-blue-500`. You can **extend its theme** so that “background” and “neon-cyan” become Tailwind classes too (e.g. `bg-background`, `text-neon-cyan`), instead of writing raw hex inside classes.

**Current state:** `globals.css` already has CSS variables (`--neon-cyan`, `--background`, etc.). In `page.tsx` and `layout.tsx`, some Tailwind classes still use raw hex (e.g. `bg-[#0a0a0f]`, `text-[#00f5ff]`), so the same colors are defined in two ways.

**Suggestion:** Extend the Tailwind theme so it uses those same CSS variables. Then in your components you use classes like `bg-background` and `text-neon-cyan` instead of `bg-[#0a0a0f]`. One source of truth for colors, and easier to read.

**Your choice:** [ ] **Apply** (Tailwind theme from CSS variables, refactor page/layout) [ ] **Skip** [ ] **Custom** **\_**

---

## 4. Component structure

**Best practice:** Keep components focused and reusable so the codebase is easier to read and maintain.

**What some of this means:**

- In React, a **component** is a piece of UI (and the code that describes it). You can split one big component into smaller ones—e.g. “photo frame,” “headline,” “message box”—and use them like building blocks. That makes the main page shorter and each file easier to understand.
- **Presentational components** here just means “components that mainly show stuff,” without much logic. They’re good candidates to extract.

**Current state:** `page.tsx` is one component (~65 lines) with all the JSX for corners, status line, photo, headline, message, and footer in one file.

**Suggestion:** Extract small pieces (e.g. `CornerAccents`, `StatusLine`, `PhotoFrame`, `UnderConstructionMessage`) into separate files under `src/components/` and use them in `page.tsx`. Same page, but clearer structure and potential reuse later.

**Your choice:** [ ] **Apply** (extract components) [ ] **Skip** (keep single file) [ ] **Custom** **\_**

---

## 5. Semantic HTML and accessibility

**Best practice:** Use semantic elements and good accessibility so the site works well with screen readers and keyboards.

**What some of this means:**

- **Semantic HTML** means choosing tags that **describe the meaning** of the content, not just “a box.” For example `<header>` for the top of the page, `<section>` for a distinct block, `<main>` for the main content. That helps both search engines and assistive technologies (e.g. screen readers) understand the page.
- **Accessibility** (often shortened to **a11y**) means making the site usable for people who rely on keyboards only, screen readers, or other assistive tech. That includes things like visible **focus** (the outline when you tab through links/buttons) and optionally a **skip link** (“Skip to content”) so keyboard users can jump past repeated navigation.

**Current state:** The page uses `<main>` correctly. Many generic `<div>`s could be `<section>` or `<header>` where it makes sense. The image has a good `alt` text. There’s no visible focus style or skip link.

**Suggestion:** Use `<section>` and `<header>` for the logical blocks. Add a visible focus style (e.g. a ring) so keyboard users can see where they are. Optionally add a skip link at the top.

**Your choice:** [ ] **Apply** (semantic + focus + optional skip link) [ ] **Minimal** (semantic only) [ ] **Skip** [ ] **Custom** **\_**

---

## 6. Metadata and performance

**Best practice:** Set metadata and performance-related tags so search engines and social sharing work well.

**What some of this means:**

- **Metadata** (in the web sense) is **information about the page** that doesn’t appear in the main content: title, description, how the page should be displayed (viewport), accent color (theme-color), etc. Search engines and social networks use this (e.g. for the title in the browser tab and in search results).
- **Viewport** tells the browser how to scale the page on different screen sizes (especially mobile).
- **Theme-color** is the color browsers use for the address bar / UI around your site (e.g. to match your brand).
- **Open Graph** (often “OG”) is a set of tags that social networks (Facebook, LinkedIn, etc.) use to build **link previews**—the image and text you see when someone shares your URL. Without them, the preview might be generic or wrong.

**Current state:** `layout.tsx` already sets `metadata` with title and description. Viewport, theme-color, and Open Graph are not set.

**Suggestion:** Add viewport and theme-color in the metadata. Optionally add Open Graph (and Twitter) so shared links get a nice preview.

**Your choice:** [ ] **Apply** (viewport, theme-color, OG) [ ] **Minimal** (viewport + theme-color only) [ ] **Skip** [ ] **Custom** **\_**

---

## 7. Error and not-found handling

**Best practice:** Provide clear, on-brand pages for “page not found” and (optionally) for runtime errors.

**What some of this means:**

- A **404** is when someone visits a URL that doesn’t exist on your site. In Next.js you can customize that with a `not-found.tsx` file so it matches your design (e.g. same cyberpunk style) instead of the default Next.js 404.
- **Runtime errors** are things that go wrong while the app is running (e.g. a network failure). Next.js lets you add an `error.tsx` that shows a friendly “Something went wrong” and optionally a retry button, instead of a blank or technical error screen.

**Current state:** No custom `not-found.tsx` or `error.tsx`; visitors see the default Next.js 404 and error UI.

**Suggestion:** Add `not-found.tsx` with your cyberpunk style and a “Page not found” message. Optionally add `error.tsx` for runtime errors with a simple message and retry.

**Your choice:** [ ] **Apply** (not-found + error) [ ] **Not-found only** [ ] **Skip** [ ] **Custom** **\_**

---

## 8. Constants and magic strings

**Best practice:** Put repeated or important strings (and numbers) in named constants so they’re easy to find and change in one place.

**What “magic strings” means:** Literal text or numbers written directly in the code (e.g. `"joostkw.nl · v0.1"`) without a name. If you use the same string in several places or might change it later, it’s clearer and safer to define it once (e.g. `const SITE_URL = "joostkw.nl"`) and use the constant everywhere.

**Current state:** Strings like `"joostkw.nl · v0.1"`, `"[ SYSTEM: STANDBY ]"`, `"[ EST. COMING_SOON ]"` are written inline in `page.tsx`.

**Suggestion:** Add a small file (e.g. `src/lib/constants.ts`) with names like `SITE_URL`, `VERSION`, `STATUS_LABEL`, and use those in the page instead of raw strings.

**Your choice:** [ ] **Apply** (extract constants) [ ] **Skip** [ ] **Custom** **\_**

---

## 9. Dependency and security hygiene

**Best practice:** Keep dependencies and security checks visible so you can react to known vulnerabilities.

**What some of this means:**

- **Dependencies** are the external packages your project uses (listed in `package.json` and installed with `npm install`). They can have security issues, so it’s good to check them from time to time.
- **`npm audit`** is a command that checks those packages against a database of known vulnerabilities and suggests updates or fixes. Adding an `"audit"` script in `package.json` makes it easy to run (e.g. `npm run audit`) and optionally to document “run this before releases” in the README.

**Current state:** There’s no script for `npm audit`; you can run it manually if you remember.

**Suggestion:** Add a script like `"audit": "npm audit"` (or with `--audit-level=high` if you only want to be warned about serious issues). Optionally add a short note in the README about running it before releases.

**Your choice:** [ ] **Apply** (add script + short README note) [ ] **Script only** [ ] **Skip** [ ] **Custom** **\_**

---

## 10. Tailwind arbitrary values

**Best practice:** Prefer theme-backed utility classes over arbitrary values so design stays consistent and easy to change.

**What some of this means:**

- In Tailwind, an **arbitrary value** is when you write a raw value in square brackets, e.g. `bg-[#0a0a0f]` or `text-[#00f5ff]`. It works, but the color is “hard-coded” in that class and repeated wherever you use it.
- The **Tailwind theme** is the central config where colors (and spacing, etc.) are defined. If you put your colors there (or wire it to your CSS variables), you use **named classes** like `bg-background` and `text-neon-cyan` instead of `bg-[#0a0a0f]`. Then changing a color is done in one place, and the class names are easier to read.

**Current state:** Many classes use arbitrary values (`bg-[#0a0a0f]`, `text-[#00f5ff]`, etc.). This overlaps with item 3 (design tokens).

**Suggestion:** Same idea as item 3: define these colors in the Tailwind theme (using your existing CSS variables) and replace the arbitrary values with theme-based classes like `bg-background`, `text-neon-cyan`, `border-neon-cyan/50`.

**Your choice:** [ ] **Apply** (tie to theme from item 3) [ ] **Skip** [ ] **Custom** **\_**

---

## Summary: how to reply

Reply with your choice for each number, for example:

- `1: Apply, 2: Lint only, 3: Apply, 4: Skip, 5: Minimal, 6: Minimal, 7: Not-found only, 8: Apply, 9: Script only, 10: Apply`

Or: “Apply all” / “Skip all” and any exceptions. For **Custom**, add a short note (e.g. “7: Custom – only add not-found, with a different layout”).

After you reply, the chosen items can be implemented step by step.
