# The Cullen Ledger: Ryan Cullen's portfolio

Live: https://ryan-portfolio-three-beryl.vercel.app

Personal portfolio and CV of Ryan Cullen, a Computer Science & Business student at Trinity College Dublin. The site is laid out like the business pages of a Dublin broadsheet. TheoryPrep ([theoryprep.ie](https://theoryprep.ie)), my free Irish driving theory test practice platform, is the lead story.

See [DESIGN.md](./DESIGN.md) for the concept, tokens, type system and motion principles.

## Built with

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) and [React](https://react.dev/) 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4, with design tokens defined as CSS variables and mapped through `@theme`
- `next/font`: Newsreader (self-hosted, subset with fontTools, OFL), Instrument Sans and JetBrains Mono
- `next/og` for generated social images
- No animation or UI libraries: the motion uses CSS (including scroll-driven animations) and the View Transitions API

## Features

- Day and night editions. Both are designed themes with AA contrast, and an inline script prevents the wrong theme flashing on load.
- A market-style ticker you can pause, a broadsheet masthead, and a front-page layout.
- The TheoryPrep "pull-out supplement": real screenshots, a stat strip, a question-bank chart, and a playable four-question quiz.
- Project stories with their own layouts and SVG illustrations.
- GitHub contribution chart for [`@cullenry`](https://github.com/cullenry): server-fetched, with arrow-key and pointer readouts and a table view.
- The experience ledger, education, and skills set out as "classifieds".
- A `/` (or Ctrl/⌘ K) command index for keyboard navigation.
- Accessible mobile section menu, skip link, visible focus, and full `prefers-reduced-motion` support.
- A `/cv` page that switches between the full CV and a one-page version, with an A4 print stylesheet (full = 2 pages, short = 1).
- Metadata API: canonical URLs, Open Graph and Twitter images for `/` and `/cv`, JSON-LD (`Person`, `WebSite`, `WebApplication`), sitemap and robots.
- A 404 page set as a printed correction, and an easter egg for anyone who knows the Konami code.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used for `metadataBase`, canonicals, sitemap and robots. Defaults to `https://ryan-portfolio-three-beryl.vercel.app`. |
| `GITHUB_TOKEN` | Optional | A GitHub token (no scopes needed) for the GraphQL contribution calendar. Without it, the site falls back to a public mirror, and if both fail it shows a graceful message. |

GitHub data revalidates every six hours, so the homepage stays statically rendered.

## Routes

| Route | Description |
| --- | --- |
| `/` | Portfolio front page |
| `/cv` | Curriculum vitae (print-ready) |
| `/opengraph-image`, `/twitter-image` | Generated social cards (also under `/cv`) |
| `/sitemap.xml`, `/robots.txt` | Generated from `NEXT_PUBLIC_SITE_URL` |

## Project structure

```text
app/                    Routes, layout, metadata routes, global styles, self-hosted fonts
assets/fonts/           Static TTFs used only by the generated OG images and icons
components/layout/      Header, mobile menu, footer
components/sections/    Front page, TheoryPrep supplement, projects, activity, experience, education, contact
components/cv/          CV document and the full/one-page view switcher
components/ui/          Ticker, theme toggle, command index, quiz, contribution chart, sparkline, easter egg
components/illustrations/  SVG project illustrations
data/portfolio.ts       All personal content, in one place
lib/                    Site config, GitHub data, theme helpers, OG renderer
public/projects/        Optimised TheoryPrep screenshots and mascot
```

Edit [`data/portfolio.ts`](./data/portfolio.ts) to change any content. The homepage, CV, structured data and social images all read from it.

## Deployment (Vercel)

1. Push the branch and open a pull request, or merge to `main`.
2. In Vercel → Project → Settings → Environment Variables, set `NEXT_PUBLIC_SITE_URL` to the production URL, and optionally `GITHUB_TOKEN`.
3. Vercel uses the default Next.js settings (`npm install`, `npm run build`). No other configuration is needed.

## Licence

Personal portfolio. Unless stated otherwise, the content and design are not licensed for reuse. Newsreader is used under the SIL Open Font License (see `app/fonts/OFL.txt`).
