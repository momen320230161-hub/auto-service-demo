# Project Structure — Recommended Starting Point

Repository: `auto-service-demo`

Preferred framework: Next.js App Router + TypeScript + Tailwind CSS. This is a **proposed** structure; adapt to existing repository files if already initialized.

```text
auto-service-demo/
├── AGENTS.md
├── DESIGN_BRIEF.md
├── PROJECT_STRUCTURE.md
├── README.md
├── public/
│   └── images/                 # Rights-cleared imagery / documented placeholders
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Metadata, fonts and global shell
│   │   ├── page.tsx            # Main home experience
│   │   ├── booking/
│   │   │   └── page.tsx        # Demo-only request flow
│   │   └── globals.css         # Tokens, foundational styles
│   ├── components/
│   │   ├── layout/             # Header, footer, containers
│   │   ├── home/               # Hero, service overview, process
│   │   ├── booking/            # Form steps, fields, review
│   │   └── ui/                 # Button, input, icon wrappers
│   ├── content/
│   │   └── site.ts             # Editable demo brand, services, labels
│   ├── lib/
│   │   └── validation.ts       # Booking request field validation
│   └── types/
│       └── booking.ts
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Design architecture
Keep tokens in one place and use consistent typography, spacing and icon conventions. Components should reflect real repeated patterns, not abstract everything unnecessarily.

## Data architecture
- `src/content/site.ts`: single source of truth for provisional service descriptions, concept branding and placeholder contact details.
- Booking: client-side demo state only. No fake available appointments; no real submission.
- Preserve clear distinction between placeholder content and verified business facts.

## Suggested working milestones
1. Foundation: Next.js bootstrap, fonts, tokens, site content, icons and navigation.
2. Homepage: visually complete desktop and mobile compositions.
3. Booking: accessible multi-step demo form, validation and explicit no-submission result.
4. Polish: responsive details, states, loading, reduced motion, no overflow.
5. QA and delivery: lint/build verification, README, screenshots and deployment instructions.

## GitHub / Vercel deployment
1. Create GitHub repo `auto-service-demo` and add these documents.
2. Let Codex implement and push the project to the repository.
3. Connect the repo to Vercel, check build configuration and deploy preview/production.
4. Open the live site on desktop and mobile; test booking demo messaging before sharing.
5. Share a demo link only after confirming that the deployment works.

**Note:** This document does not create a repository or deploy a site; deployment must be performed separately.
