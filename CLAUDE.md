# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16 — read the bundled docs before writing code

This project uses **Next.js 16.2.12** with the **App Router** and **Turbopack**. This is a newer major version than most training data reflects — APIs, conventions, and file structure may differ from what you expect. Before writing or changing framework code (routing, data fetching, `layout`/`page` conventions, config, caching), consult the version-accurate docs bundled in the install:

- `node_modules/next/dist/docs/01-app/` — App Router
- `node_modules/next/dist/docs/03-architecture/`
- `node_modules/next/dist/docs/index.md`

Heed any deprecation notices you encounter. See `AGENTS.md` for the same warning.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build (Turbopack) — also runs full TypeScript check
npm run start    # Serve the production build (run `build` first)
npm run lint     # ESLint (flat config, eslint-config-next)
```

There is no test runner configured yet. `npm run build` is the closest thing to a full check: it type-checks the whole project and fails on TS or build errors, so run it to validate non-trivial changes.

## Architecture

This is a single-page marketing/portfolio site for **Flo of Music** (Florina Jane), a mixing & mastering engineer.

- **Content is data-driven.** `src/data.ts` is the single source of truth for _all_ site copy, links, prices, mixes, brands, etc. To change what the site says, edit `data.ts` — do not hardcode content in components. Sections map 1:1 to exports there (`profile`, `services`, `mixes`, `brands`, `stats`, `courses`, `testimonials`, `resources`, `contact`, `navLinks`, `socials`). `data.ts` also holds YouTube helpers that derive everything from a share URL: `youtubeId`, the thumbnail variants `youtubeThumbMax`/`youtubeThumbSd`/`youtubeThumbSmall` (plus the older `youtubeThumb`/`youtubeWatch`), and `youtubeEmbed`, which builds a `youtube-nocookie.com` player URL. The Mixes section plays inline — it mounts that iframe only after a click, so no third-party player loads until a visitor presses play.
- **Page composition:** `src/app/page.tsx` just stacks the section components from `src/components/sections/` (Navbar, Hero, About, Brands, Mixes, Services, Courses, Testimonials, Contact). Reusable primitives live in `src/components/ui/` (Aceternity/Magic-UI-style: `reveal`, `aurora-background`, `marquee`, `counter`, `spotlight-card`, `section`, `button`).
- **Design system lives in CSS.** `src/app/globals.css` defines the brand tokens under `@theme` — navy canvas + **gold** accent (matching the logo). Change `--color-accent`/`--color-background` etc. there to reshade the whole site. Custom keyframes (marquee, aurora, float, glow) and helpers (`.text-gradient`, `.glass`, `.bg-grid`) are also defined here. Gold is a light color: text/icons on a gold fill must be dark navy (`#08121d`), not white.
- **Animation:** the `motion` package (Framer Motion's successor, imported from `motion/react`). Any component using it — or hooks/state/effects — needs `"use client"`. Server Components are the default otherwise.
- **Brand logo:** `public/logo.png` (a circular navy+gold mark with transparent corners), referenced via `profile.logo` in `data.ts` and rendered through `next/image`. Favicon is `src/app/icon.svg`. Remote image domains (YouTube thumbnails) are allowlisted in `next.config.ts` — add any new external image host there.
- **Styling: Tailwind CSS v4**, configured entirely in CSS (no `tailwind.config.js`). Import alias `@/*` → `src/*`. TypeScript is `strict`; `next-env.d.ts` is generated — do not edit it.
