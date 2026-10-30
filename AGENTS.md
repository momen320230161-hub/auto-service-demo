# AGENTS.md — Auto Service Client Demo

## Mission
Build an excellent, client-presentable automotive repair/service website demo. The client has expressed interest but has not supplied their brand, exact service list, location, pricing, or operational details yet. Treat all such details as unknown. The objective is to demonstrate a refined visual identity, credible service presentation, and a convincing appointment request experience.

## Hard requirements
- **Light theme only.** No dark-mode toggle and no dark overall page themes. Dark typography is fine.
- Deliver a **simple, distinctive, premium** aesthetic. Avoid generic AI-generated landing-page patterns: gratuitous gradients, glowing CTAs, glassmorphism, unnecessary blobs, identical cards everywhere, fake metrics, filler sections, and excessively rounded corners.
- Use a restrained, consistent **premium SVG icon set** (prefer Lucide or Phosphor, choose one and use it consistently). Do not use emoji as UI icons. Icons should communicate meaning, not decorate every sentence.
- All content and interactions must work well on mobile and desktop, with keyboard access, legible contrast, meaningful focus styles and reduced-motion consideration.
- Never invent client facts: business name, phone, address, operating hours, reviews, star ratings, certifications, warranties, prices, appointment availability or completed bookings. Use clearly labelled sample business name and demo data where required.
- Booking is a **demo request flow**, not a confirmed appointment. Never imply that the user has reserved a real slot or that a real shop received their information unless a backend is connected and tested.
- No backend, external messaging, payment, or database connection without an explicit requirement and configuration. Never hardcode secrets.
- Do not publish or connect a real custom domain without approval.

## Work process
1. Read `DESIGN_BRIEF.md` and `PROJECT_STRUCTURE.md` before touching UI code.
2. Inspect repository state and existing tooling. Do not overwrite useful work.
3. Propose a succinct implementation plan and choose one coherent visual direction. If a visual direction has not been chosen, implement one strong, polished light-mode direction using the brief rather than mixing four distinct styles.
4. Establish design tokens (colors, typography, spacing, radii, border treatments) and reusable components before composing sections.
5. Build one complete, well-crafted responsive experience rather than many unfinished pages.
6. Validate using available project scripts: install, lint, typecheck, build and test where configured; fix issues. Check mobile navigation, forms, focus states and layout overflow.
7. Report what is functional, what is explicitly demo-only, what is not integrated, and what is needed for a real launch.

## Scope — first iteration
- Homepage with intentional hero, services overview, succinct process/benefit explanation and prominent appointment CTA.
- Services section or page featuring typical illustrative offerings: oil & filter service, brake inspection/repair, diagnostics, battery, tires, and A/C. Don't imply these exact services are confirmed by the client.
- Booking demo: select service; enter vehicle details; choose a **preferred** date/time (not a verified available slot); enter contact details; review; show local-only confirmation explicitly labelled **Demo — not submitted**.
- Contact / inquiry CTA using labelled placeholder details rather than made-up real addresses or numbers.
- Clear top-level navigation and an intentional footer.

## Stack & implementation
- Preferred stack for a new repo: Next.js (App Router), TypeScript, Tailwind CSS. Favor server components when possible and client components only for interactions.
- Use semantic HTML, proper labels, validation and accessible messages.
- Use a consistent icon package; keep total dependencies small.
- Source images responsibly; use authentic automotive-service imagery if licensed/available, otherwise considered CSS/layout or obvious placeholders. Avoid unrelated exotic supercars and synthetic-looking mechanic imagery. Include alt text and credit/licensing details where applicable.
- Do not add fake testimonials, counters, badges or urgency timers.
- Keep content, service definitions, contact details and brand placeholders in one easily editable config or content module.
- Use optimised images and sensible font loading; limit motion to subtle feedback.

## Skills
If the following agent skills are installed and available, use them as relevant:
- `frontend-design`: visual craft and differentiated UI.
- `vercel-react-best-practices`: React / Next.js architecture and performance.
- `web-design-guidelines`: final UI, usability and accessibility review.
Do not claim to have executed a skill unless it was actually available and used.

## Delivery checklist
- [ ] No dark mode and no template-like filler
- [ ] Clear brand placeholder / demo disclaimer
- [ ] Distinctive responsive design with coherent iconography
- [ ] Services easily configurable
- [ ] Booking completion clearly marked demo-only
- [ ] Form validation and keyboard navigation
- [ ] Build and lint pass (if scripts exist)
- [ ] Production deployment is ready to connect to GitHub/Vercel
- [ ] README includes local setup, deployment, and unresolved client questions
