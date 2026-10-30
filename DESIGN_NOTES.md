# Motive concept direction

The subject is everyday automotive care, expressed through precise alignment, authentic workshop photography and calm service language. The sample brand is explicitly provisional.

- Palette: paper `#FBFCFC`, white `#FFFFFF`, ink `#203B43`, secondary `#5B6B70`, petrol `#275E70`, cool wash `#EEF3F4`; borders `#DCE4E6`.
- Type: Manrope for confident geometric headings; DM Sans for body and controls, loaded with `next/font`. Body copy uses 15–16px, form controls 16px, and supporting labels 12–14px. No uppercase label system.
- Layout: left-aligned split hero, workshop photograph with an integrated caption below it, two-column service list, a sequential approach section, and a compact appointment invitation. On mobile these become a deliberately spaced single column with an expandable navigation.
- Shape: 5px controls, restrained surfaces, hairline separators. Service offerings are linked rows rather than floating cards. Lucide is the sole UI icon library.
- Motion: only interaction feedback; reduced motion disables transitions and smooth scrolling.

The mobile request flow prioritizes the first service choice over introductory copy. Review edits offer explicit save/cancel actions and return directly to review. The header switches to its navigation disclosure at 960px so larger, readable controls remain comfortable on tablets.

The audit extends the compact request layout to 960px, giving tablet forms the full content width. Interactive control borders use `#7C9097` for distinguishable inputs and radio outlines; the lighter divider token remains reserved for decorative separation. Review edit buttons have 44px touch targets. Missing pages retain the same light palette and provide a direct route home.

The subsequent visual pass gives the hero a balanced two-line heading, removes its redundant note and lets the workshop photograph stand without an enclosing card. Service and process titles use a stronger weight; the closing request invitation uses direct language without decorative curves. Vehicle, preference and contact steps display the selected service as compact context. See `DESIGN_REFINEMENT.md` for the rationale and before/after captures.

Composition:

```text
brand              navigation       request
large headline             workshop photograph
description + actions      integrated caption
service heading            honest service context
service rows               service rows
approach introduction      three sequential steps
appointment invitation     demo action
brand / concept            contact placeholders
```

The plan was reviewed against the brief before composition: retain the automotive editorial feel, but avoid a newspaper layout, generic card grids, dark sections, fabricated trust signals and decorative counters. Authentic maintenance work is the visual anchor; surrounding sections stay quiet. One consistent palette runs through home and booking.

The approved desktop-first implementation replaces service rows with a six-choice explorer and contextual detail panel, uses a wider technician-focused hero crop, compresses the process into a horizontal sequence, and makes the final CTA useful for unspecified concerns. The desktop booking sidebar summarizes entered data; mobile retains compact context. Final screenshots and validation are in `CLIENT_DEMO_HANDOFF.md`.
