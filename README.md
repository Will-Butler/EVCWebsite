# KFBS EVC — Entrepreneurship & Venture Capital Club Website

The site for the **Entrepreneurship & Venture Capital Club at UNC Kenan-Flagler
Business School**, rebuilt for a custom domain (`kfbsevc.com`) and strong SEO.

- **Framework:** Next.js 16 (App Router, React 19, server-rendered for SEO)
- **Styling:** Tailwind CSS v4 (UNC Carolina Blue / Navy design system)
- **Backend:** Supabase (Postgres + Auth) for the Network directory, Ventures
  repository, and Admin dashboard
- **Hosting:** Cloudflare Workers via the OpenNext adapter

## Pages

| Route | What it is |
|-------|-----------|
| `/` | Home — hero, programs, ventures, network CTAs |
| `/about` | Mission, values, programming overview, exec board |
| `/programs` | **New** — E-Week, VCIC, Career Trek, Career Labs, Panels & Fireside Chats, Triangle Mixer |
| `/network` | Member directory (filterable), with public "Add Person" |
| `/ventures` | MBA student ventures, with public "Add Venture" |
| `/admin` | Password-protected moderation dashboard (approve / unpublish / delete) |

Public submissions are saved as **pending** and only appear after an admin
approves them — this keeps spam out of the public (indexed) pages.

---

## 1. Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

The site **runs without a backend**: `/ventures` shows the four seed ventures,
`/network` is empty, and the add forms show a friendly "not connected" message.
Wire up Supabase (below) to make them live.

## 2. Supabase setup (backend)

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query →** paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run.**
   This creates the `ventures` and `people` tables, row-level security
   policies, and seeds the four current ventures.
3. **Project Settings → API →** copy the **Project URL** and the **anon public** key.
4. Create the admin login: **Authentication → Users → Add user** (email +
   password). That email/password is what you'll use at `/admin`.

## 3. Environment variables

Copy the example and fill in the two values from step 3 above:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

Restart `npm run dev`. The Network/Ventures pages and Admin dashboard are now live.

> The `anon` key is safe to expose publicly — row-level security (defined in
> `schema.sql`) is what protects the data. Never commit a **service_role** key.

## 4. Deploy to Cloudflare

This repo is preconfigured for Cloudflare Workers via
[OpenNext](https://opennext.js.org/cloudflare) (`wrangler.jsonc`,
`open-next.config.ts`).

**Option A — Git-connected (recommended):**
1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Import a repository**.
3. Framework preset: **Next.js**. Build command: `npm run cf:build`.
   Deploy command / output is handled by the adapter.
4. Add the two `NEXT_PUBLIC_SUPABASE_*` variables under **Settings → Variables**.
5. Every push to `main` auto-deploys.

**Option B — From your machine:**
```bash
npm run cf:preview   # build + run the Workers bundle locally
npm run cf:deploy    # build + deploy (runs `wrangler login` first time)
```
Set the env vars in the dashboard, or with `wrangler secret put NEXT_PUBLIC_SUPABASE_URL` etc.

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
- **Ventures / people:** managed at `/admin` once Supabase is connected
- **Seed ventures fallback:** [`src/lib/seed.ts`](src/lib/seed.ts)

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
