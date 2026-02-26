# joostkw.nl – Frontend

Next.js app for [joostkw.nl](https://joostkw.nl). Deploys automatically via Vercel when you push to `main`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to the `main` branch on GitHub; Vercel builds and deploys. See the repo root for setup notes.

## Scripts

- `npm run lint` – run ESLint on `src`
- `npm run format` – format code with Prettier
- `npm run audit` – check dependencies for known vulnerabilities (run before releases)

## Sprite padding checks

To prevent layout errors caused by transparent padding, run the padding scan on any newly added sprite:

```bash
node scripts/scan-and-trim-sprites.mjs public/Sprites/<new-sprite>.png
```

This trims the image in place if padding is detected.
