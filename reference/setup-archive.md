# joostkw.nl – Setup archive

This document describes how joostkw.nl was set up. It’s kept for reference (e.g. if you need to change DNS, reconnect Vercel, or onboard someone).

---

## How it’s set up

- **Site:** [joostkw.nl](https://joostkw.nl) (and [www.joostkw.nl](https://www.joostkw.nl))
- **Code:** Next.js app in the `frontend` folder; version control on GitHub
- **Hosting:** Vercel (builds and deploys on every push to `main`)
- **Domain:** joostkw.nl is registered at STRATO; DNS points the domain to Vercel

---

## Local development

- **Project root:** `C:\Users\joost.kaan\joostkw-website` (or wherever the repo is cloned)
- **App:** `frontend/` (Next.js)
- **Run locally:** From project root, `cd frontend` then `npm install` and `npm run dev`; open http://localhost:3000

---

## Version control (GitHub)

- **Repo:** [Brokkenpiloot/joostkw](https://github.com/Brokkenpiloot/joostkw)
- **Branch used for production:** `main`
- **Workflow:** Edit code → `git add` / `git commit` → `git push origin main` → Vercel deploys automatically

---

## Hosting (Vercel)

- **Vercel project:** joostkw
- **Dashboard:** [vercel.com](https://vercel.com) → project **joostkw**
- **Root Directory:** `frontend` (set in Vercel → Settings → General)
- **Framework:** Next.js (detected; also set in `frontend/vercel.json`)
- **Deploy:** Triggered by pushes to `main`; no manual uploads

---

## Domain (STRATO → Vercel)

- **Registrar / DNS:** [STRATO](https://www.strato.nl) for joostkw.nl
- **Setup:** Domains joostkw.nl and www.joostkw.nl were added in Vercel (Settings → Domains). The DNS records at STRATO were set as Vercel instructed:
  - **A** for the root domain → Vercel’s IP
  - **CNAME** for `www` → Vercel’s target (e.g. `cname.vercel-dns.com`)
- **HTTPS:** Provided by Vercel; no extra config

---

## Quick reference

| What              | Where |
|-------------------|--------|
| Domain / DNS      | [STRATO](https://www.strato.nl) → Domeinen / DNS |
| Hosting & deploys | [Vercel](https://vercel.com) → project **joostkw** |
| Code              | [GitHub Brokkenpiloot/joostkw](https://github.com/Brokkenpiloot/joostkw) |
| Deploy            | Push to `main` → Vercel deploys |
| Custom domain     | Vercel → Settings → Domains; DNS at STRATO |
