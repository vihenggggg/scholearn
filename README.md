# Schoolearn

A bilingual (Khmer-first, English toggle) web app that helps Cambodian students — especially
those finishing grade 12 — discover which university majors or vocational/TVET paths fit them,
and connects each match to real Cambodian scholarship/training resources.

Fully static and client-side: no backend, no database, no accounts. Answers only live in memory
for the current visit and are never saved or sent anywhere.

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
