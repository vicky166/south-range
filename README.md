# South Range

A Next.js directory of adventure tours across South Asia. Tours, operators, destinations and categories live in `src/data`. Pages only read them through `src/lib/catalog.ts`.

The catalogue shipped here is sample content. Operators are fictional. KLNK addresses use `example.com` so they cannot be mistaken for a real booking system. One published tour has `klnkUrl: null`, and one has an invalid value, so those pages show no booking button.

Search engines are blocked until you set `NEXT_PUBLIC_ALLOW_INDEXING=true`. Set `NEXT_PUBLIC_SITE_URL` to the public origin before you do that, so canonical URLs and the sitemap use the real domain.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm test
npm run lint
npm run build
```

## Add a tour

Edit `src/data/tours.ts`. Copy a record. Give it a new `id` and `slug`. Point `operatorId`, `destinationSlug`, `categorySlug` and `activitySlugs` at existing records (add those first if they are new). Set `klnkUrl` to the https address for that tour only, or `null` if you do not have one. Leave `price` null and `priceVerified` false unless the figure is verified. Set `published` to false for a draft. Set `sample` to false only for a real listing.

The page is `/tours/your-slug`. The booking button reads `klnkUrl` and nothing else.

## Add an operator

Add a record to `src/data/operators.ts`, then set `operatorId` on the tours that belong to it.

## Update a KLNK URL

Change `klnkUrl` on that tour in `src/data/tours.ts`. Do not reuse another tour's address.

## Add a destination

Add a record to `src/data/destinations.ts` with `coordinates` in decimal degrees (north and east positive). The atlas grid covers 4°N–38°N and 66°E–94°E (`atlasBounds` in `src/lib/geo.ts`); a test fails if a published tour's destination falls outside it. A destination only appears once a published tour points at it.

## Collections and field notes

Homepage collections live in `src/data/collections.ts`. Each one is a directory query, not a list of tours, so it fills itself from published listings and hides when nothing matches. Field notes live in `src/data/field-notes.ts` and render at `/field-notes/your-slug`. Keep them to general guidance; `relatedQuery` adds matching tours under the article.

## Describe-it search

The postcard on the homepage and `?ask=` on `/tours` read a plain sentence with word rules in `src/lib/ask.ts` (countries, places, kinds of trip, lengths). No AI model or external service is called. The tours page shows how the sentence was read so every filter can be changed. A test fails if an example prompt or the postcard placeholder returns no journeys, so update `askExamples` or `askPlaceholder` when the catalogue changes.

## Images

Photos load from `images.unsplash.com` and `images.pexels.com` through `next/image` (allowed in `images.remotePatterns` in `next.config.ts`). In `src/data`, `photo("photo-…", alt)` builds an Unsplash URL and `photo("pexels-<number>", alt)` builds a Pexels one. Both libraries are free to use without attribution. Check that a new photo actually shows the place before you use it, and write the alt text from what is in the frame.

## Testing on another device

`allowedDevOrigins` in `next.config.ts` lets the dev server load its scripts from `127.0.0.1` and `*.trycloudflare.com` tunnels. Add any other dev hostname there, or pages load without client-side interactivity.

## Later

Replace the arrays in `src/data` with a CMS or database behind `src/lib/catalog.ts`. Keep the page components on the catalogue functions so the UI does not need to change shape.
