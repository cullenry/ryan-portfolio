# Ryan Cullen Portfolio - https://ryan-portfolio-qd24ddmsb-cullenry.vercel.app/

Personal portfolio and CV website for Ryan Cullen, a Computer Science & Business student at Trinity College Dublin.

The design borrows from the painted Georgian doors of Dublin: a street of doors you can open in the hero, arched "doorway" project cards, and a warm, colourful palette that turns into a lamp-lit street at night. Everything about Ryan (projects, experience, education, skills, GitHub activity, hobbies and contact details) lives in a single About section.

## Built with

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- Next Font (Fraunces, Bricolage Grotesque and Caveat)

## Features

- Responsive single-page portfolio with one condensed About section
- An interactive street of Dublin doors (house numbers in binary)
- Day and night themes, with a sun, moon and stars that follow the theme
- A playable mini piano, a live Dublin clock and one-click email copying
- Dedicated, printable CV route at `/cv`
- GitHub contribution activity for [`@cullenry`](https://github.com/cullenry)
- Accessible external links, keyboard-friendly interactions and reduced-motion support
- Static production builds suitable for Vercel or other Next.js hosts

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
# Run ESLint
npm run lint

# Create an optimized production build
npm run build

# Serve the production build locally
npm run start
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Main portfolio page |
| `/cv` | Curriculum vitae |

## Project structure

```text
app/                    Next.js routes, layout, and global styles
components/layout/      Shared site layout components
components/sections/    Portfolio and CV sections
components/ui/          Reusable interface components
data/                   Portfolio content and profile links
lib/                    Data-fetching and utility functions
public/                 Static assets
```

Most personal content is managed in [`data/portfolio.ts`](./data/portfolio.ts), so profile details, projects, experience, and links can be updated in one place.

## Deployment

The project can be deployed to [Vercel](https://vercel.com/) by importing the GitHub repository. Use the default Next.js build settings:

- **Build command:** `npm run build`
- **Install command:** `npm install`
- **Output:** Next.js default output

For a self-hosted deployment, build the project and start the production server:

```bash
npm run build
npm run start
```

## License

This project is a personal portfolio. Unless otherwise stated, the content and design are not licensed for reuse.
