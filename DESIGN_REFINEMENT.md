# Premium design refinement

30 October 2026. This pass builds on the locally completed technical audit; earlier fixes remain intact. No push or deployment was performed.

## Assessment

The strongest existing decisions were the cool light palette, Manrope/DM Sans pairing, authentic workshop photograph, open service rows, restrained Lucide icons and honest demo messaging. These already formed a coherent automotive identity and did not need replacement.

The desktop hero left “clear.” alone on its second line. Its supporting note repeated vague marketing language, while the photograph's enclosing card competed with the image itself. Service names and descriptions had similar weight. The closing invitation repeated the same “your next step” language and added decorative road curves without explaining anything. Later booking steps did not remind visitors which service they had chosen.

## Implemented direction

- **A composed headline:** constrain the existing hero heading to a deliberate two-line measure, with balanced wrapping. “Car care,” and “made clear.” now read as complete phrases at the inspected widths. The text remains configurable.
- **A quieter hero:** remove the redundant wrench note and shorten the introduction to “Maintenance. Repairs. A place to start.” Widen the supporting paragraph slightly to reduce fragmented desktop lines. Keep the existing primary and secondary actions.
- **Photography without an extra card:** retain the same image and crop, with restrained rounding on the photograph itself. Remove the surrounding border/white card and align its caption with the image edge. Nothing overlaps the photograph.
- **Clearer hierarchy:** slightly relax section-heading tracking and increase service/process title weight to 600. Body text, contrast tokens and input sizing remain intact.
- **More direct process language:** use “Choose a service,” “Add your preferences,” and “Review your request.” The numbered sequence still describes the actual request journey.
- **A more useful closing invitation:** replace “Your car. Your next step.” with “What does your car need?” Remove decorative curves and keep a clear request action plus the explicit no-submission note.
- **Restrained feedback:** service rows receive a faint surface response on pointer hover; form options gain a clearer accent border and light selected-style wash. No added animation, dependency or client-side home component.
- **Booking context:** one small “Selected service” line appears in vehicle, preference and contact steps. It follows the current form state and avoids repeating the information already shown in review/completion.

## New elements and rejected ideas

The selected-service line is the only new product UI element. It helps users maintain context without returning to the service step.

Deliberately omitted a service filter for a six-item list, a second booking widget duplicating the existing flow, a mobile sticky CTA covering form space, and a new FAQ without confirmed business answers. No testimonials, invented trust badges, location map, extra photography, floating shapes or entrance animations were added. The existing content is sufficient for this demonstration.

## Before and after

Fresh browser captures were taken before editing, then repeated after rebuilding. Home and the vehicle step with Brakes preselected were visually inspected at 375, 768 and 1440px.

| View | Before | After |
| --- | --- | --- |
| Home · 375px | [Before](artifacts/design/before-home-375.png) | [After](artifacts/design/after-home-375.png) |
| Home · 768px | [Before](artifacts/design/before-home-768.png) | [After](artifacts/design/after-home-768.png) |
| Home · 1440px | [Before](artifacts/design/before-home-1440.png) | [After](artifacts/design/after-home-1440.png) |
| Booking · 375px | [Before](artifacts/design/before-booking-375.png) | [After](artifacts/design/after-booking-375.png) |
| Booking · 768px | [Before](artifacts/design/before-booking-768.png) | [After](artifacts/design/after-booking-768.png) |
| Booking · 1440px | [Before](artifacts/design/before-booking-1440.png) | [After](artifacts/design/after-booking-1440.png) |

The `scripts/capture-design.mjs` utility captures these views against the running production server. Use `after` as its argument to update the current-state captures; the `before` files preserve the starting point for this pass.

## Validation and scope

Production build, lint and TypeScript checks pass. The final browser run completed with **25 passed in 32.3 seconds**, across Chrome desktop/mobile and WebKit mobile. Two duplicate width-matrix entries are intentionally skipped because the complete matrix runs in desktop Chrome. The suite checks navigation, booking validation/editing/completion, keyboard behavior, reduced motion, axe accessibility rules and responsive overflow across seven widths. Physical-device Safari and screen-reader listening sessions remain outside this local validation.

Changed product files: `src/app/page.tsx`, `src/app/globals.css`, `src/content/site.ts`, and `src/components/booking-form.tsx`. Added only a screenshot utility and documentation/artifacts. The local-only booking behavior and previous audit fixes are preserved.

The result is ready for a client concept presentation. It remains a sample brand with illustrative services and no real booking submission. Performance measurements in `AUDIT_REPORT.md` belong to the preceding technical audit, not a new performance benchmark of this refinement.
