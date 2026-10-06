# EVC Resource Directory: Handoff Guide

This guide is for the member building the new EVC Resources page and the Google Sheets workflow behind it.

## What we are building

Create a public `/resources` page that brings together useful UNC, Kenan-Flagler, and community resources in one searchable directory.

The content must come from the club-owned Google Sheet, not from hard-coded values in the website. Once the initial feature is merged, executive-board members should be able to add and update resources in Google Sheets without editing code, accessing Cloudflare, or deploying the site.

## Access and boundaries

- You will receive an invitation to the website's GitHub repository. Use your own GitHub account. Do not use or request anyone else's account.
- Work on a feature branch and open a pull request for review. Never push directly to `main` or merge your own pull request.
- You do **not** need Cloudflare access, the club Gmail password, deployment credentials, or Google API credentials.
- The club Google account owns the spreadsheet. The project owner will share that one spreadsheet with your personal Google account if you need to view or edit it.
- Do not add packages, change deployment configuration, use Google OAuth, create a Google Cloud project, create a service account, or add secrets without explicit approval.

## Sheet workflow

The sheet contains a `Resources` tab. It is the only tab the site will read and the only tab that will be published to the web. The tab contains only public information.

The owner will publish the `Resources` tab as CSV and give you the resulting published CSV URL. The website should retrieve that CSV server-side. Do not embed the sheet in an iframe and do not fetch it from browser JavaScript.

The owner controls the `status` column. Only rows with `published` in that column may appear on the website. `draft` and blank rows must never appear publicly.

### Required columns

| Column | Required | Rules |
| --- | --- | --- |
| `id` | Yes | Stable lowercase ID using letters, numbers, and hyphens; never change an existing ID. |
| `title` | Yes | Short, recognizable resource name. |
| `url` | Yes | Full public `https://` URL. |
| `blurb` | Yes | One or two plain-language sentences explaining why a student would use it. |
| `category` | Yes | One of: `Career`, `Funding`, `Mentorship`, `Legal`, `Startup support`, `Learning`, `Community`, `Wellbeing`, `Other`. |
| `audience` | Yes | One of: `All students`, `MBA students`, `Undergraduates`, `Founders`, `Alumni`, `Community`. Multiple values are comma-separated. |
| `tags` | No | Comma-separated search terms, such as `jobs, resumes, coaching`. |
| `status` | Yes | `draft` or `published`. The site displays only `published`. |
| `sort_order` | No | Whole number. Lower numbers appear first. Leave blank for alphabetical placement. |
| `last_verified` | Yes | Date the link and description were checked, in `YYYY-MM-DD` form. |

### Example rows

```csv
id,title,url,blurb,category,audience,tags,status,sort_order,last_verified
example-career-center,Example Career Center,https://example.edu/careers,"Career coaching, job listings, and application workshops.",Career,"All students","jobs, coaching",draft,10,2026-10-06
example-startup-program,Example Startup Program,https://example.org/startups,"Workshops and mentoring for people exploring a new venture.",Startup support,"Founders, MBA students","mentoring, workshops",draft,20,2026-10-06
```

Replace the example rows with real, checked resources before requesting publication. Do not put private notes, internal documents, personal email addresses, credentials, or unpublished opportunities on the `Resources` tab.

## Technical requirements

1. Inspect the current project before writing code. Read the repository guidance and the relevant Next.js 16 documentation in `node_modules/next/dist/docs/` before implementing.
2. Create a public `/resources` route consistent with the existing design system and mobile behavior.
3. Fetch the published CSV in server-side code. Cache/revalidate it on a reasonable interval so Sheet updates appear without a new site deployment.
4. Parse the header row by column name, not column position. Trim values and handle quoted commas correctly.
5. Validate every resource before rendering it:
   - Require `id`, `title`, `url`, `blurb`, `category`, `audience`, `status`, and `last_verified`.
   - Accept only `http:` and `https:` URLs.
   - Ignore malformed, incomplete, blank, and non-`published` rows safely.
   - Sort by numeric `sort_order` when supplied, then alphabetically by title.
6. Provide keyword search and visible filters for Category and Audience. Filters should work on mobile and remain accessible with keyboard navigation.
7. Include a clear empty state when no resources match a filter.
8. If the Sheet cannot be reached, fail safely: log useful server-side context, avoid breaking the rest of the site, and show a small friendly unavailable message or retained cached data if the framework cache makes it available.
9. External links should open safely in a new tab and make that behavior clear to assistive technology.
10. Do not expose the raw published CSV URL in the visual interface unless the owner specifically asks for it.

## Required development process

1. Send a short written plan before changing code. Wait for approval.
2. Create a clearly named feature branch, such as `feature/resources-directory`.
3. Make the smallest focused implementation that meets the requirements.
4. Run the existing lint and production build checks. Resolve new failures before opening the pull request.
5. Test the public page with at least these Sheet scenarios:
   - One valid published row
   - A draft row that does not render
   - A row with a malformed URL that does not render
   - A blank `sort_order`
   - Search and both filters on a narrow mobile viewport
   - The Sheet request failing
6. Open a pull request. Its description must include the summary, changed files, test results, screenshots or a preview link, and any decision the owner still needs to make.
7. Do not merge the pull request. Wait for the owner’s approval.

## Suggested first message to Claude Code or Codex

```text
Read RESOURCE_PAGE_HANDOFF.md, inspect the repository, and read the relevant Next.js 16 documentation in node_modules/next/dist/docs before proposing changes. Do not change code yet.

I need a plan for a public /resources directory. Data comes from a club-owned Google Sheet that will be published as CSV; I will supply the URL. The page must fetch it server-side, display only status=published rows, validate data safely, and provide search plus category/audience filters. Follow every boundary and required workflow in RESOURCE_PAGE_HANDOFF.md.
```

## Owner checklist before requesting the implementation

1. Make the club Google account the owner of the Sheet.
2. Add the `Resources` tab and its header row exactly as specified above.
3. Keep the tab free of confidential information.
4. In Google Sheets, publish only the `Resources` tab to the web in CSV format. Enable automatic republishing if edits should go live without another approval step.
5. Copy the published CSV URL and give it to the developer only after the tab is ready.
6. Share the editable workbook with contributors using their individual Google accounts, not the club Gmail password.
7. Protect the header row and, if approvals are required, protect the `status` column so only the owner can change a row to `published`.

## Ongoing content rules

- Every link must be checked before publication and reviewed at least once per semester.
- Keep blurbs short, factual, and useful. Avoid marketing claims and time-sensitive details unless the resource page itself is kept current.
- Add a new resource as `draft`; the owner checks it and changes `status` to `published` when ready.
- If a link is broken or a resource is no longer appropriate, change it to `draft` immediately instead of deleting the history.
