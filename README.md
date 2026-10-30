# Motive Auto Care — Concept Demo

A light-only automotive service concept built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide. **Motive is a sample brand, not an identified client business.** Services and imagery are illustrative; contact details remain “To be confirmed.”

Previews: [Desktop homepage](artifacts/home-desktop.png) · [Mobile homepage](artifacts/home-mobile.png) · [Desktop request review](artifacts/review-desktop.png) · [Mobile request review](artifacts/review-mobile.png).

## Run locally

Use Node.js 22 or 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use `/booking` to try the appointment request.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`next/font` downloads Manrope and DM Sans at build time and serves them locally at runtime. The initial install/build needs network access; site visitors do not contact Google Fonts.

## What works

- Responsive home page, mobile navigation, service links with preselection, anchor navigation, and contact placeholders.
- Five-step booking demo: service, optional vehicle details/notes, preferred date/time, sample contact details, and editable review.
- Field validation, inline error descriptions, focus on invalid fields, step heading focus, keyboard controls, skip link, and reduced-motion support.
- Completion explicitly says **“Demo — not submitted”** and **“Demo request only — no appointment has been booked or sent.”**

All booking data stays in React memory. It is not posted, emailed, placed in a URL, or persisted in browser storage. Refreshing or leaving the booking page clears it. No availability is checked. Times are illustrative preference windows, with no claim about business hours. Use sample personal details when demonstrating.

## Editing

- `src/content/site.ts`: provisional branding, service definitions, contact placeholders, hero content, booking step names and illustrative time windows.
- `src/app/globals.css`: palette, typography, spacing, borders, control styles and responsive layouts.
- `src/app/page.tsx`: home page composition and supporting copy.
- `src/components/booking-form.tsx`: local booking interaction and review.
- `src/lib/validation.ts`: field validation and browser-local date checks.
- `DESIGN_NOTES.md`: art direction and design decisions.
- `public/images/CREDITS.md`: illustrative image source and licensing.

ESLint 9 is retained to match the peer support of the React, import and accessibility plugins included in `eslint-config-next`; migrate to ESLint 10 when those plugins support it. The lockfile includes the patched transitive packages identified by `npm audit`.

The homepage is a server component. Only navigation and booking interactions use client components. The local photo is optimized through `next/image`; no runtime image-host configuration is needed. Search indexing is disabled for this unverified demo in `src/app/layout.tsx`.

## Browser checks

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts the production server unless one is already running. It checks desktop and mobile navigation, image loading, keyboard focus, horizontal overflow, booking validation, editable review, direct service selection, no POST submission, and no browser-storage persistence. Screenshots are written to `artifacts/`; traces on failure go to `test-results/`. Mobile tests emulate a phone in Chromium; real Safari/device testing is still recommended before client launch.

You can use an installed Chrome instead of downloading Chromium: set `PLAYWRIGHT_CHANNEL=chrome` before `npm run test:e2e` (PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'`).

## Deploy on Vercel

1. Push this project to `https://github.com/momen320230161-hub/auto-service-demo`.
2. Sign in to Vercel and choose **Add New → Project**. Import `auto-service-demo` from GitHub.
3. Select the **Next.js** framework preset, repository root directory, Node.js **24.x** (or a supported LTS), install command `npm ci`, and build command `npm run build`. Keep the framework's default output directory.
4. No environment variables, database, email service, or secrets are required.
5. Choose **Deploy** when you are ready to publish the demo. Use the generated Vercel URL for review. Do not connect a real custom domain without approval.
6. Open the deployed page on desktop and mobile. Test navigation and the full request flow; verify the explicit no-submission result. Check image/font loading and the build logs.

Git pushes to connected branches can create preview deployments. A project configured to use `main` as its production branch will deploy pushes to that branch to production. Review the project's Git settings before future changes.

Official reference: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Verification — 30 October 2026

`npm run lint`, `npm run typecheck`, `npm run build`, and all **6 Playwright tests** passed. The lockfile passed `npm ci --dry-run --ignore-scripts`; `npm audit` reported **0 vulnerabilities**. Browser checks used installed Chrome, including phone emulation, with homepage widths from 320px to 1440px. Desktop/mobile home and review screenshots were visually inspected. This is local production-build verification; no Vercel deployment or real-device Safari verification has been performed.

## Before a real launch

Confirm the official name/logo, location/service area, phone/email, hours, supported vehicles, actual service list, approved descriptions and photography, languages, and maintenance/hosting ownership. Confirm whether customers request a visit or reserve a verified slot.

A live appointment system needs a separately scoped backend, notifications, availability and capacity rules, privacy/retention policy, appropriate consent, spam protection and delivery verification. None is connected here. Replace sample branding and all unconfirmed details; remove demo indexing restrictions only once content and launch have been approved.
