# KFBS EVC — Entrepreneurship & Venture Capital Club Website

The site for the **Entrepreneurship & Venture Capital Club at UNC Kenan-Flagler
Business School**, rebuilt for a custom domain (`kfbsevc.com`) and strong SEO.

- **Framework:** Next.js 16 (App Router, React 19, server-rendered for SEO)
- **Styling:** Tailwind CSS v4 (UNC Carolina Blue / Navy design system)
- **Database:** Cloudflare D1 (serverless SQLite) for the Network directory and
  Ventures repository — read in Server Components, written via Server Actions
- **Admin auth:** Cloudflare Access protects `/admin` at the edge (no passwords
  in the app)
- **Hosting:** Cloudflare Workers via the OpenNext adapter

> **Requires Node.js 22+** for the Cloudflare tooling (wrangler). Check with
> `node -v`; if you use nvm, run `nvm use 22`.

## Pages

| Route | What it is |
|-------|-----------|
| `/` | Home — hero, programs, ventures, network CTAs |
| `/about` | Mission, values, programming overview, exec board |
| `/programs` | **New** — E-Week, VCIC, Career Trek, Career Labs, Panels & Fireside Chats, Triangle Mixer |
| `/network` | Member directory (filterable), with public "Add Person" |
| `/ventures` | MBA student ventures, with public "Add Venture" |
| `/admin` | Moderation dashboard (approve / unpublish / delete), gated by Cloudflare Access |

Public submissions are saved as **pending** and only appear after an admin
approves them — this keeps spam out of the public (indexed) pages.

---

## 1. Local development

```bash
npm install
npm run dev          # plain Next.js at http://localhost:3000
```

`npm run dev` runs without a database: `/ventures` shows the four seed ventures,
`/network` is empty, and the add forms show a friendly "not connected" message.
To develop against a **real local D1 database** (so submissions and the admin
dashboard work), use the Cloudflare preview instead:

```bash
npx wrangler d1 migrations apply kfbsevc --local   # one-time: create + seed local DB
npm run cf:preview                                 # Workers runtime + local D1 at :8787
```

## 2. Create the D1 database (production)

```bash
npx wrangler login                    # first time only
npx wrangler d1 create kfbsevc        # prints a database_id
```

Paste the returned `database_id` into [`wrangler.jsonc`](wrangler.jsonc) (replace
`REPLACE_WITH_ID_FROM_wrangler_d1_create`), then apply the schema:

```bash
npx wrangler d1 migrations apply kfbsevc --remote
```

This creates the `ventures` and `people` tables and seeds the four current
ventures. The schema lives in [`migrations/`](migrations). **No environment
variables or secret keys are needed** — the app reaches D1 through the `DB`
binding in `wrangler.jsonc`.

## 3. Protect /admin with Cloudflare Access

`/admin` has no password logic — it's gated at the edge by Cloudflare Access
(free on the Zero Trust plan):

1. Cloudflare dashboard → **Zero Trust → Access → Applications → Add an
   application → Self-hosted**.
2. Application domain: `kfbsevc.com`, path: `admin`.
3. Add a policy → **Allow** → include the officer emails (or an email domain
   like `@kenan-flagler.unc.edu`) who should have admin access.
4. Save. Now visiting `/admin` requires a verified login; the app also
   double-checks the Access identity header before any approve/delete.

## 4. Deploy to Cloudflare

This repo is preconfigured for Cloudflare Workers via
[OpenNext](https://opennext.js.org/cloudflare) (`wrangler.jsonc`,
`open-next.config.ts`). Deploy after steps 2–3.

**Option A — Git-connected (recommended):**
1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Import a repository**.
3. Framework preset: **Next.js**. Build command: `npm run cf:build`.
   The D1 binding in `wrangler.jsonc` is picked up automatically.
4. Every push to `main` auto-deploys.

**Option B — From your machine:**
```bash
npm run cf:preview   # build + run the Workers bundle locally (with local D1)
npm run cf:deploy    # build + deploy to Cloudflare (runs `wrangler login` first time)
```

## 5. Point kfbsevc.com at Cloudflare

The domain is **registered at Wix** (owned by the club — "KFBS EVC", paid
through 2028). You don't need to transfer it to use Cloudflare:

1. In **Cloudflare → Add a site →** `kfbsevc.com`. Cloudflare gives you two
   nameservers.
2. In your **Wix** domain settings, switch the domain to **custom / external
   nameservers** and paste Cloudflare's two nameservers.
3. Once DNS propagates (minutes–hours), attach the domain to your Worker:
   **Workers & Pages → your project → Settings → Domains & Routes → Add custom
   domain →** `kfbsevc.com` (and `www`). HTTPS is automatic.
4. *(Optional, later)* Transfer the registrar Wix → Cloudflare to consolidate
   billing: in Wix, unlock the domain + get the EPP/auth code, then start the
   transfer in Cloudflare Registrar.

## 6. Editing content

- **Programs / events:** [`src/lib/programs.ts`](src/lib/programs.ts)
- **Club info (email, LinkedIn, name, SEO keywords):** [`src/lib/constants.ts`](src/lib/constants.ts)
- **Exec board photo:** drop `public/exec-board.jpg` (About page picks it up)
- **Ventures / people:** submitted via the public forms and managed at `/admin`
  (approve / unpublish / delete) once D1 is connected
- **Seed ventures fallback:** [`src/lib/seed.ts`](src/lib/seed.ts) (shown when
  D1 isn't reachable) — also seeded into the DB by [`migrations/`](migrations)
- **Database schema:** [`migrations/0001_init.sql`](migrations/0001_init.sql)

## 7. SEO — built in vs. your homework

**Already done in the code:**
- Server-rendered HTML on every page (crawlers see real content, not a blank shell)
- Keyword-targeted `<title>` / meta descriptions / H1s for "UNC / Kenan-Flagler
  entrepreneurship + venture capital + MBA"
- Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, PWA manifest
- JSON-LD structured data (Organization + EducationEvent list on Programs)
- `/admin` excluded from indexing

**Your off-page checklist (this is what actually moves rankings):**
1. **Google Search Console** — verify `kfbsevc.com`, submit `sitemap.xml`.
   Repeat with Bing Webmaster Tools.
2. **Backlinks** — get these pages to link to `kfbsevc.com`:
   - the official Kenan-Flagler / UNC club listing page
   - your LinkedIn company page (About → Website)
   - VCIC's site and any partner club pages
   These authoritative `.edu`/industry links are the biggest ranking lever.
3. **Keep pages fresh** — add ventures, update programs each semester.
4. Set `SITE.url` in `constants.ts` if the launch domain ever changes.

---

Questions or handoff: **mbaevc@kenan-flagler.unc.edu** ·
[LinkedIn](https://www.linkedin.com/company/kfbsevc)
