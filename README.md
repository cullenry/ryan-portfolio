# Ryan Cullen Portfolio

Personal portfolio and CV website for Ryan Cullen, a Computer Science & Business student at Trinity College Dublin.

The site introduces Ryan, showcases selected projects and experience, includes education and contact sections, and displays recent GitHub contribution activity.

## Built with

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- Next Font

## Features

- Responsive portfolio landing page
- About, projects, experience, education, and contact sections
- Dedicated CV route at `/cv`
- GitHub contribution activity for [`@cullenry`](https://github.com/cullenry)
- Accessible external links and keyboard-friendly interactions
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
