# runtz.dev DESIGN.md

## Product Position

runtz.dev is the public landing and documentation site for runtz, an open source DevSecOps scans platform. The design should feel technical, calm, credible, and built for engineers who need to run local SCA, SAST, host package, container package, and Kubernetes scans without adopting a heavyweight security suite.

## Visual Direction

Use an operational developer-tool aesthetic inspired by Fumadocs' public site and DESIGN.md systems from technical SaaS products:

- One strong visual color: electric blue.
- Theme-aware pages: cool blue paper in light mode and charcoal/navy in dark mode.
- Product-first hero surfaces with halftone texture, technical panels, and command windows.
- Avoid plain black-and-white pages. Surfaces can be dark, but the page should be driven by the blue accent and technical texture.
- Compact, data-dense product previews.
- Strong monospace details for commands, CVE IDs, hashes, and scan metadata.
- Restrained secondary accents: deeper blue for depth, red for critical findings, pale blue for information states.

Avoid decorative mascot art, generic gradient blobs, oversized empty marketing cards, and one-color purple/blue themes.

## Color Tokens

- `canvas`: `#eef6ff`
- `canvas-card`: `#f7fbff`
- `ink`: `#071222`
- `muted`: `#53657d`
- `night`: `#050912`
- `night-panel`: `#0d1420`
- `night-card`: `#111b2b`
- `line`: `rgba(27, 26, 16, 0.1)`
- `line-dark`: `#223149`
- `brand`: `#6db5ff`
- `brand-deep`: `#2f7eff`
- `warning`: `#4f8dff`
- `critical`: `#ff6b6b`
- `info`: `#95c8ff`

## Typography

Use Inter for all interface and marketing copy. Use `ui-monospace` for CLI, CVE, package, digest, and metadata labels.

Keep the scale compact and refined (calibrated to the Fumadocs landing page) rather than oversized. Lean on weight and the blue accent for hierarchy, not raw size.

- Hero: 36px mobile, 48px desktop (`text-4xl md:text-5xl`), weight 600, tight line-height.
- Lead statement: 24px mobile, 36px desktop (`text-2xl md:text-4xl`), weight 300, line-height snug.
- Section headings: 30px mobile, 36px desktop (`text-3xl md:text-4xl`), weight 600.
- Sub-headings: 20-24px (`text-xl`/`text-2xl`), weight 600.
- Body: 16px (`text-base`), line-height ~1.6-1.75.
- Technical labels: 12-14px monospace, uppercase only when it improves scanning.

Letter spacing stays `0` everywhere except the hero and lead statement, which use a slight negative tracking (`tracking-tight`) for a tighter, more refined headline.

## Layout

- Keep the first viewport product-led: H1, concise value prop, two CTAs, and a credible dashboard/terminal visual.
- Use full-width bands with constrained inner content.
- Container and gutters (calibrated to the Fumadocs landing page): cap content at `max-w-[1400px]`, centered, with side walls of `px-6` on mobile and `px-12` (48px) on desktop. Keep the same wall on every band so the hero text and section text align on the same left edge — the hero card runs full-bleed to the 1400px box (`md:px-0`) and uses `p-12` inner padding so its content lands on that shared 48px wall.
- Vertical rhythm: tight, around `py-10 md:py-12` per band (≈80-96px between sections). Avoid large empty gaps.
- Prefer 12-column desktop grids and single-column mobile flows.
- Cards should use 8px radius or less.
- Product preview panels may be nested inside the preview because they represent actual UI, but marketing sections should not nest cards inside cards.
- Section rhythm should be tight enough for technical readers: no empty decorative hero space.

## Components

- Primary button: blue background, dark text, pill radius, subtle lift on hover.
- Secondary button: transparent tinted surface, hairline border, theme-aware text.
- Feature panels: cool blue paper in light mode, dark navy/charcoal in dark mode.
- Status pills: small monospace labels with color-coded dots.
- Code blocks: dark background, 16px radius, blue prompt accents.
- Hero panels: rounded 28px with halftone texture and embedded product preview.

## Landing Page Content Rules

- Make claims concrete: scan types, local Docker Compose, MongoDB, Go CLI, Next.js dashboard.
- Do not imply paid, hosted, or enterprise features that are not implemented.
- Use "coming soon" only for DAST until that workflow is implemented.
- Pricing must include Free Cloud at $0, Self-hosted at $0, Standard at $20/month, and Enterprise at $99/month during launch, normally $199/month. Enterprise can also be activated on self-hosted deployments.
- Product CTAs for Login, Playground, and Start for free should point to `https://runtz.dev/login` or `https://runtz.dev/playground`.

## Agent Prompt Guide

When modifying the `runtz.dev` landing page, read this file first. Preserve the technical DevSecOps positioning, keep the UI product-first, use the tokens above, and avoid generic security-site copy. Build sections that prove what runtz already does before adding aspirational messaging.
