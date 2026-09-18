# ទិសដៅ (Tis Dav) — Navigating Cambodians

A bilingual (Khmer-first, English toggle) web app that helps Cambodian students — especially
those finishing grade 12 — discover which university majors or vocational/TVET paths fit them,
and connects each match to real Cambodian scholarship/training resources.

No accounts, no login. Individual quiz answers are never saved — only an anonymous summary
(age range, grade status, optional province, the computed 16-dimension score vector, and the top
3 matches) is logged for aggregate analysis; see "Analytics" below. The npm package and Cloudflare
Worker are still named `scholearn` internally (the project's original working name) to avoid
breaking the deployed URL — only the user-facing branding changed.

## Stack

Next.js (App Router) + React + Tailwind CSS. Data lives in `data/questions.json`,
`data/careers.json`, and `data/scholarships.json`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

- `lib/scoring.js` — turns quiz answers into a 16-dimension student vector and ranks careers by
  similarity (see `data/questions.json`'s `scoring_notes` for the exact formula).
- `lib/scholarships.js` — matches scholarships to a career by tag overlap.
- `lib/dimensions.js` / `lib/i18n.js` — bilingual labels and UI microcopy.
- `app/page.js` — the landing → assessment → results flow (all client-side state, no routing).
- `app/about/page.js` — methodology and limitations.

## Updating data

Edit the JSON files in `data/` directly — no code changes needed for new questions, careers, or
scholarships as long as the shape matches the existing entries (dimension keys must match across
`questions.json` and `careers.json`).

## Deployment

Deployed to Cloudflare via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
(`wrangler.jsonc`, `open-next.config.ts`). `npm run build` also runs the OpenNext build as a
`postbuild` step, so Cloudflare's Git-integration build (which just runs `npm run build`) produces
a deployable Worker with no extra dashboard configuration.

## Analytics (anonymous)

`app/api/submit-result/route.js` fire-and-forgets one row per completed assessment to a Postgres
database on Neon (project `tisdav-analytics`), via `lib/demographics.js`'s `responses` table:
`lang`, `age_range`, `grade_status`, `province`, `dimension_vector`, `top_matches`, `created_at`.
No name, contact info, or individual question answers are ever sent — see `lib/scoring.js` for
what `dimension_vector` actually contains (16 aggregate scores, not raw answers). A failed or slow
write is swallowed silently and never affects the results page.

**Required setup**: add a `DATABASE_URL` **secret** (not a plain `vars` entry — it's not in
`wrangler.jsonc` on purpose) in the Cloudflare dashboard for this Worker: **Workers & Pages → your
project → Settings → Variables and Secrets → Add → type "Secret" → name `DATABASE_URL`** → the
Neon pooled connection string → redeploy. For local dev, put the same value in `.dev.vars`
(gitignored, already present if you have this checked out from the original setup).

To query the collected data, use the Neon console/SQL editor on the `tisdav-analytics` project, e.g.:

```sql
select age_range, grade_status, count(*) from responses group by 1, 2 order by 1, 2;
```
