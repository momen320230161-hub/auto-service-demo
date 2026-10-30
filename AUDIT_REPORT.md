# Website audit and refinement

30 October 2026. Baseline: `e86f967`. Changes are local; no commit, push, Vercel deployment or external integration was performed during this audit.

## Readiness

**Ready for a client presentation as a clearly labelled, local-only concept demo.** Home, service discovery, navigation and the complete request journey passed the checks below. This is not a live appointment system or a certification of WCAG conformance.

Read `AGENTS.md`, `DESIGN_BRIEF.md`, `PROJECT_STRUCTURE.md`, application source, configuration, existing tests, content and deployment documentation. Applied the installed `frontend-design` skill. `vercel-react-best-practices` and `web-design-guidelines` were not installed in the available skill roots. Kept the established light palette, typography, workshop photography and service-row composition.

## Initial findings and implemented fixes

### Critical

None identified in the audited paths. No submission endpoint, payment integration, exposed application secret or unsafe HTML rendering was found. This was a frontend review, not a penetration test.

### High

None identified. Existing booking completion, validation, review editing and demo disclosures already worked; those earlier fixes were preserved and retested.

### Medium

| Finding | Evidence before changes | Resolution |
| --- | --- | --- |
| Unknown URLs violated the light-only brief | Default Next.js 404 turned the body black under dark system preference; no `main#main` skip-link target or contextual recovery action | Added a branded, light-only 404 with a main landmark and working home action. HTTP status remains 404. |
| Form controls and placeholder text had insufficient contrast | Input border against white: **1.62:1**; unselected radio outline: **2.29:1**; placeholder text: **4.04:1** | Separate control-border token produces **3.34:1**; placeholder text uses the existing secondary text color at **5.55:1**. Decorative separators remain subtle. |
| Tablet booking panel was unnecessarily narrow | At 768px, the sidebar occupied 280px and left a 389px panel; service names wrapped in small two-column options | Extended the compact booking layout to 960px. At 768px the panel now uses the full 704px content width, with horizontal progress above it. |
| Service validation lacked group-level invalid semantics and a live notification | Only a data attribute marked the service error; no validation live region | Added `aria-invalid` to the service fieldset and a concise live error notice. Individual radios retain their error description; focus still goes to the first invalid control. |

### Low

| Finding | Resolution |
| --- | --- |
| Mobile menu remained logically open across the desktop breakpoint and could reappear when narrowing again | Reset its disclosure state on crossing 961px, and move focus to visible desktop navigation if focus was inside the disappearing menu. |
| Hero `sizes` described half the viewport even after the layout reached its maximum width | Matched the actual grid and gutters. In the measured 1920px/DPR-1 case the selected image changed from a 1080px candidate to 640px. Replaced deprecated `priority` with Next.js 16 `preload`. |
| Review edit buttons were small for touch | Increased each to at least 44 × 44px without changing the review structure. |
| Demo notice sat outside any landmark | Converted it to a labelled complementary landmark; full axe scan on 404 now passes as well. |
| Existing responsive coverage omitted 430px and 1920px and did not exercise every booking state at every requested width | Added a full seven-width matrix, long-content/input-escaping checks, menu-resize coverage, 404 checks and every service/navigation destination. |

Contrast targets follow [W3C non-text contrast guidance](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html). Image changes follow the [Next.js Image reference](https://nextjs.org/docs/app/api-reference/components/image).

## Files changed

- `src/app/globals.css`: control contrast, touch targets, tablet booking layout and 404 typography/spacing.
- `src/app/not-found.tsx`: accessible light-only recovery page.
- `src/app/layout.tsx`: demo-notice landmark.
- `src/app/page.tsx`: accurate responsive image sizes and preload.
- `src/components/header.tsx`: breakpoint dismissal and focus recovery.
- `src/components/booking-form.tsx`: validation announcement, invalid-group semantics and targeted invalid-control focus.
- `tests/audit.spec.ts`: new regression, responsive, navigation and privacy tests.
- `scripts/audit-performance.mjs`: repeatable local browser measurements, no added dependency.
- `README.md`, `DESIGN_NOTES.md`, this report and `artifacts/`: documentation and before/after evidence.

No dependency or backend changes were needed. Home remains a server component; navigation and booking remain the only interactive client components. Fonts and the optimized hero image are served locally at runtime.

## Verification results

| Check | Result |
| --- | --- |
| Production build (`npm run build`) | PASS; static home, booking, 404 and icon routes generated |
| TypeScript (`npm run typecheck`) | PASS |
| ESLint (`npm run lint`) | PASS, no lint warnings |
| Dependency advisory audit (`npm audit --json`) | PASS, 0 reported vulnerabilities |
| Existing and extended browser suite | PASS: 22 tests in the main final run, followed by 3 newly added navigation tests; **25 passed total** |
| Width matrix | PASS: 320, 375, 430, 768, 1024, 1440 and 1920px, home plus service, vehicle, preference, contact, review and completion: **49 rendered states** |
| Browser engines | Chrome desktop and phone emulation; WebKit phone emulation. The full-width matrix runs once in desktop Chrome; its duplicate mobile project entries are intentionally skipped (2 skips). |
| Accessibility automation | PASS: axe WCAG-tag scans across home, every form step, validation and completion; full axe scan on 404 |
| Keyboard/focus | PASS: skip link, radio selection, step heading focus, invalid-control focus, Escape dismissal and breakpoint focus recovery |
| Reduced motion | PASS: smooth scrolling disabled under reduced-motion preference |
| Booking behavior | PASS: required/optional fields, invalid year/date/email, consent, preference selection, review save/cancel, final local completion and retry |
| Navigation | PASS: all six services and unsure preselection; services/approach/contact sections from booking; footer request CTA; back-to-top preserves booking data |
| Robustness/privacy | PASS: long unbroken notes wrap, HTML-like notes display as text, private test marker absent from request URLs/bodies, existing no-POST and storage-reset tests pass |
| Console/assets | PASS: no page errors, console errors/warnings or HTTP 4xx/5xx responses in the 49-state journey. A requested missing URL returns its expected 404 separately. |
| Source review | No fetch/submission integration, browser storage persistence, unsafe HTML injection or hardcoded application credentials found. Environment files remain ignored. |

The test runner emitted an environment-level `NO_COLOR`/`FORCE_COLOR` precedence warning; this is not a browser or application warning.

Screenshots were captured for all 49 states. Visually inspected representative home layouts from small mobile through tablet and large desktop, the revised tablet booking layout, desktop preference inputs, long-content mobile review, and the 404 recovery page. Automated geometry checks cover every captured state; not every screenshot received a separate manual accessibility assessment.

Evidence: [tablet booking before](artifacts/audit/before-booking-768.png), [tablet booking after](artifacts/audit/service-768.png), [mobile homepage](artifacts/audit/home-430.png), [long-content review](artifacts/audit/review-320.png), [mobile 404](artifacts/audit/not-found-mobile.png). All audit captures are in `artifacts/audit/`.

## Performance observations

Measured with Chrome against `npm start`, fresh contexts, DPR 1, no CPU/network throttling and one sample per route/width. These are local load observations, **not Lighthouse scores, field Core Web Vitals, or deployment performance guarantees**. Runtime prefetch traffic is included in resource totals.

| Width | Route | Observed LCP | Load-time layout-shift total |
| --- | --- | --- | --- |
| 390 | Home | 488ms | 0 |
| 390 | Booking | 116ms | 0.0165 |
| 1440 | Home | 100ms | 0 |
| 1440 | Booking | 152ms | 0.0029 |
| 1920 | Home | 128ms | 0 |
| 1920 | Booking | 188ms | 0.0022 |

No third-party runtime resources were observed. The measurement script records resource bytes and image candidates in [performance.json](artifacts/audit/performance.json). INP and real-user Core Web Vitals were not measured. Reproduce with the production server running:

```powershell
$env:PLAYWRIGHT_CHANNEL='chrome'
node scripts/audit-performance.mjs
```

## Remaining limitations and launch requirements

- No unresolved failure in the tested demo paths. Automated checks cannot establish that every browser, assistive technology or input combination is error-free.
- No physical iPhone/Safari, Android hardware, screen-reader listening session, real-network throttling study or Vercel-hosted verification was performed. WebKit emulation is not physical Safari testing.
- Appointment information remains in page memory. No real slot is offered, no workshop receives data, and completion explicitly says **Demo — not submitted**.
- Client must confirm brand, services, contact details, location, hours, supported vehicles, copy, image approval, languages and hosting ownership.
- A real booking launch needs separately configured availability rules, backend, delivery/notifications, privacy/retention terms and spam protection, with end-to-end delivery verification.
- Vercel setup is documented in `README.md`. No publish, push or production deployment was performed, as requested.
