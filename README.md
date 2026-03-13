# OutGrow

OutGrow is a multi-page agritech platform for smallholder farmers, crop buyers, and platform operators across Kenya, Uganda, Nigeria, Ghana, and Malawi. It combines a public marketing site with authenticated farmer, buyer, and admin portals to support crop monitoring, market access, finance workflows, and farm operations.

This project was built on Medo. Original project link: https://medo.dev/projects/app-a5tzymr7g1s1

## What the product covers

- Public landing experience for OutGrow's value proposition, partner story, testimonials, and lead capture.
- Farmer portal for dashboarding, crop monitoring, AI advisory, market access, finance, reports, and profile management.
- Buyer portal for browsing farms, reviewing farm profiles, managing watchlists, procurement, and quality reports.
- Admin portal for onboarding farms, managing devices, and overseeing farmer and buyer operations.
- Supabase-backed data access plus serverless functions for AI crop advice, weather, text-to-voice, and voice-to-text flows.

## Core routes

The application currently includes route definitions for:

- `/` public landing page
- `/login` and `/signup`
- Farmer pages such as `/dashboard`, `/farm-map`, `/crop-monitor`, `/ai-advisor`, `/market-access`, `/finance`, `/reports`, and `/profile`
- Buyer pages under `/buyer/*`
- Admin pages under `/admin/*`

See [src/routes.tsx](src/routes.tsx) for the full route list.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Radix UI primitives
- React Router
- Supabase
- Biome for linting

## Project structure

```text
.
|-- docs/                    Product and planning docs
|-- public/                  Static assets
|-- src/
|   |-- components/          Landing, dashboard, buyer, admin, and shared UI components
|   |-- contexts/            App-level providers such as auth
|   |-- db/                  Supabase client and API helpers
|   |-- hooks/               Shared hooks
|   |-- pages/               Route-level pages
|   |-- services/            Service-layer code
|   |-- types/               Shared type definitions
|   |-- App.tsx              App shell
|   |-- main.tsx             Frontend entry point
|   \-- routes.tsx          Route configuration
|-- supabase/
|   |-- functions/           Edge functions
|   \-- config.toml         Supabase local config
|-- migrations/              SQL migrations
|-- package.json             Scripts and dependencies
\-- README.md               Project documentation
```

## Local setup

### Prerequisites

- Node.js 20+
- pnpm
- Supabase project credentials if you want the app to talk to a live backend

### Install dependencies

```bash
pnpm install
```

### Environment variables

The frontend Supabase client expects the following variables:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

These are read in [src/db/supabase.ts](src/db/supabase.ts).

### Validate the project

```bash
pnpm lint
```

At the moment, `dev` and `build` in [package.json](package.json) are intentionally stubbed out, and `lint` is the primary validation command configured in this workspace.

## Supabase

Supabase-related assets live in [supabase](supabase) and [migrations](migrations).

- Edge functions:
    - `ai-crop-advisor`
    - `get-weather`
    - `text-to-voice`
    - `voice-to-text`
- SQL migrations define the farmer schema and AI advisor tables.

If you are developing against Supabase locally, keep the project config and migrations in sync before deploying functions or schema changes.

## Notes for contributors

- Product requirements and UX direction are documented in [docs/prd.md](docs/prd.md).
- The UI is organized around landing, farmer, buyer, admin, and shared component groups.
- This repository uses pnpm workspace files, even though it is currently a single app workspace.

## Attribution

OutGrow is a product-specific implementation built on top of Medo's generated project foundation, then adapted for an African agritech marketplace and farm operations platform.
