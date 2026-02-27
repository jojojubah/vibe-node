# AGENTS.md

## Project Overview
- Repo: `/Users/joseph/Documents/Projects/ChipChop`
- Product: Static multi-page marketing site for Vibe Node.
- Stack: Plain HTML + CSS + vanilla JavaScript (no build tooling/framework).
- Main branch: `main`
- Remote: `git@github.com:jojojubah/vibe-node.git`
- Live domain (`CNAME`): `vibenode.co.uk`

## Current Product State
- Home (`/`) is now a simplified software-company landing page:
  - Text-first hero
  - Two primary pathways only: `Game` and `Services`
  - No legacy hero collage/stats/join blocks
- Games (`/games/`):
  - Single game card: `Dotz & Boxz`
  - Includes official App Store and Google Play badge links
- Services (`/services/`):
  - Modern service cards with stock imagery
  - Clear CTA: Build with us / Bring your ideas to life
  - On-page enquiry form with async submit (no `mailto` flow)
- Apps (`/apps/`) and Tools (`/tools/`):
  - Minimal pages showing `Coming soon.`
- Services is live (no `Coming soon` label in nav/footer links).

## Site Structure
- Home page: `/index.html`
- Folder routes (each with `index.html`):
  - `/about/`
  - `/games/`
  - `/apps/`
  - `/tools/`
  - `/services/`
  - `/privacy/`
  - `/terms/`
  - `/cookies/`
- Static assets directory: `/assets/`

## Shared Files
- Global styles: `/styles.css`
- Global behavior: `/scripts.js`
- Every page loads:
  - `<link rel="stylesheet" href="/styles.css?v=...">`
  - `<script src="/scripts.js?v=..." defer></script>`
- Current cache version in markup: `v=20260227i`
- Rule: when CSS/JS changes, bump the shared `?v=` value across all HTML files.

## Key Behavior Notes
- Mobile nav:
  - Controlled by `.menu-toggle` `aria-expanded` and header class `menu-open`
  - Hamburger icon animation tied to `aria-expanded="true"` in CSS
- Sticky header:
  - Scroll classes `.is-scrolled` and `.is-hidden` are set in `/scripts.js`
- Cookie consent:
  - Storage key: `vibenode_cookie_consent_v1`
  - Footer `.cookie-settings-link` opens consent settings panel
- Service form:
  - Markup uses `form[data-async-form]`
  - Async submission handled in `/scripts.js` (`initAsyncForms`)
  - Endpoint currently: `https://formsubmit.co/ajax/hello@vibenode.co.uk`
  - Includes honeypot field and inline status UI

## Editing Rules
- Keep clean folder URLs (edit `*/index.html`; do not introduce root-level route `.html` files).
- Preserve shared header/footer and nav consistency unless explicitly redesigning globally.
- Preserve accessibility attributes used by JS (`aria-expanded`, `aria-controls`, `aria-hidden`, `aria-current`).
- Prefer existing design tokens/components in `/styles.css` before adding new one-off styles.
- Keep external store badges/stock imagery links valid if used in page content.

## Quick QA Checklist
- Desktop/mobile nav opens and closes correctly on all pages.
- Active nav state (`aria-current="page"`) is correct per route.
- Home links route correctly to `/games/` and `/services/`.
- Games page shows one card and both store badges open external links.
- Services CTA jumps to enquiry form and form shows submit status.
- Cookie banner/settings still work.
- Updated CSS/JS is visible after cache version bump.

## Local Preview
- Preferred quick preview:
  - `python3 -m http.server 4173`
- Validate:
  - `http://localhost:4173/`
  - `http://localhost:4173/games/`
  - `http://localhost:4173/services/`
