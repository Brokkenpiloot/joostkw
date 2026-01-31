# joostkw.nl – Setup & deployment

This guide covers local development and deploying your site to **mijn.host** with your **STRATO** domain.

---

## 1. Open the project in Cursor

1. In Cursor: **File → Open Folder**
2. Choose: `C:\Users\joost.kaan\joostkw-website`
3. The project has a `frontend` folder (Next.js app). Open that folder or the repo root; both work.

---

## 2. Local development

From a terminal in the project root:

```powershell
cd C:\Users\joost.kaan\joostkw-website\frontend
npm install
npm run dev
```

- **npm install** – installs dependencies (first time and after pulling changes).
- **npm run dev** – starts the dev server. Open **http://localhost:3000** in your browser.

Edit `frontend/src/app/page.tsx` and related files; the page updates automatically.

---

## 3. Connect your STRATO domain to mijn.host

Your domain is at **STRATO**, your site files are on **mijn.host**. You need to point the domain to the host.

### Option A: Point domain with A record (recommended)

1. Log in at **STRATO** and open DNS settings for **joostkw.nl**.
2. Get the **server IP** of your mijn.host package (in [mijn.host control panel](https://mijn.host/cp/) → Hosting → your package; often under “Server” or “Details”).
3. In STRATO DNS, set:
   - **A record** for `@` (or `joostkw.nl`) → IP from step 2.
   - Optionally **A** or **CNAME** for `www` → same IP or `joostkw.nl` (as your host allows).
4. Save. DNS can take up to 24–48 hours to propagate (often much sooner).

### Option B: Use mijn.host nameservers

If STRATO allows changing nameservers:

1. In [mijn.host control panel](https://mijn.host/cp/) find the **nameservers** for your hosting (e.g. `ns1.mijn.host`, `ns2.mijn.host` or similar).
2. In STRATO, for **joostkw.nl**, replace the default nameservers with these.
3. Save. Propagation can take up to 24–48 hours.

After this, **www.joostkw.nl** and **joostkw.nl** will point to your mijn.host hosting.

---

## 4. Deploy to mijn.host

You have two ways to put the site online: **static export + SFTP** (simplest) or **Node.js app** (if you need server-side features later).

---

### Option A: Static export + SFTP (recommended to start)

The site is built to plain HTML/CSS/JS and uploaded to `public_html`. No Node.js needed on the server.

#### Step 1: Build the static site

In the project:

```powershell
cd C:\Users\joost.kaan\joostkw-website\frontend
npm run build
```

This creates the `out` folder with all static files.

#### Step 2: Create an FTP/SFTP account on mijn.host

1. Go to [mijn.host control panel](https://mijn.host/cp/).
2. **Hosting** → select your hosting package → **FTP accounts**.
3. **FTP account toevoegen**.
4. Set:
   - **Hoofdmap**: “Ftp account met als hoofdmap de domein home directory” or “Map zelf opgeven” → `public_html` (so you land in the web root).
   - **Gebruikersnaam** and **Wachtwoord** – save these; you’ll use them in FileZilla.

Details: [mijn.host – FTP account aanmaken](https://mijn.host/kb/webhosting/hoe-maak-ik-een-ftp-account-aan).

#### Step 3: Upload with FileZilla (SFTP)

1. Install [FileZilla Client](https://filezilla-project.org/).
2. **File → Site Manager → New Site**. Name it e.g. “joostkw.nl”.
3. Settings:
   - **Protocol**: SFTP – SSH File Transfer Protocol  
   - **Host**: `joostkw.nl` (or the hostname mijn.host gives you)  
   - **Port**: 22  
   - **Logon type**: Normal  
   - **User**: `jouwgebruikersnaam@joostkw.nl` (replace with your FTP username)  
   - **Password**: your FTP password  

4. **Connect**.
5. **Local** (left): go to `C:\Users\joost.kaan\joostkw-website\frontend\out`.
6. **Remote** (right): go to `public_html` (or the folder that is the document root for joostkw.nl).
7. Select **all files and folders** in `out` and **drag them** to `public_html`. Overwrite if asked.

Reference: [mijn.host – SFTP in FileZilla](https://mijn.host/kb/webhosting/verbinden-via-sftp-in-filezilla).

After upload, open **https://www.joostkw.nl** (or http). Your site should load.

---

### Option B: Node.js app on mijn.host

Use this if you later need server-side logic (API routes, SSR, etc.). More setup, same domain.

1. In [mijn.host](https://mijn.host/cp/) open **DirectAdmin** (link in control panel).
2. **Extra Kenmerken** → **Setup Node.js App** → **Create Application**.
3. Set:
   - **Application root**: e.g. `domains/joostkw.nl/public_html` or the path DirectAdmin shows.
   - **Application URL**: leave empty for “joostkw.nl” or set a path.
   - **Node.js version**: 20 (recommended).
   - **Application mode**: Production when going live.
4. Connect via **SSH** (see [mijn.host – SSH](https://mijn.host/kb/webhosting/verbinden-met-ssh)), go to the application root, upload your project (or clone via Git if available), then:
   - `npm install`
   - `npm run build`
   - Start command as required by DirectAdmin (e.g. `node .next/standalone/server.js` if using Next.js standalone).

Note: Next.js on shared Node.js hosting often needs “standalone” output and a specific start command. We can add that to the project when you choose this route.

---

## 5. Checklist

- [ ] Project opens in Cursor; `npm install` and `npm run dev` work.
- [ ] STRATO: A record (or nameservers) points **joostkw.nl** (and www) to mijn.host.
- [ ] mijn.host: FTP/SFTP account created; main folder = `public_html`.
- [ ] FileZilla: SFTP to `joostkw.nl`, port 22, upload from `frontend/out` to `public_html`.
- [ ] Visit **https://www.joostkw.nl** and confirm the site loads.

---

## 6. “Connecting Cursor to the hosting”

Cursor runs on your PC and cannot log in to mijn.host for you. What we do instead:

1. **You** follow this guide (STRATO DNS, FTP account, FileZilla).
2. **In Cursor** you edit the code; when ready you run `npm run build` and upload the new `out` folder via FileZilla (or we can add a small script that reminds you / opens the right folder).

You can use **`npm run deploy:prepare`** in the `frontend` folder: it runs `npm run build` and then opens the `out` folder in Explorer so you can drag its contents into FileZilla. We can also add a **Cursor rule** so the AI always knows this project is “joostkw.nl, hosted at mijn.host, deploy via static export + SFTP”.

---

## Quick reference

| What            | Where |
|-----------------|--------|
| Domain / DNS    | [STRATO](https://www.strato.nl) → DNS / nameservers |
| Hosting, FTP    | [mijn.host CP](https://mijn.host/cp/) → Hosting → FTP accounts |
| DirectAdmin     | Link from mijn.host control panel |
| SFTP (FileZilla)| Host: `joostkw.nl`, Port: 22, User: `user@joostkw.nl` |
| Local build     | `frontend/` → `npm run build` → upload `frontend/out` to `public_html` |

If you tell me your preferred step (e.g. “first get it running with static + SFTP” or “I want Node.js on the server”), we can do the next changes in the project (e.g. deploy script, Cursor rule, or Node.js deploy steps) in the repo.
