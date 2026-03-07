# AGENTS.md

## Project Overview
- Repo: `/Users/joseph/Documents/Projects/ChipChop`
- Product: Static multi-page website for Vibe Node with a single product focus: Dotz & Boxz.
- Stack: Plain HTML + CSS + vanilla JavaScript (no build tooling/framework).
- Main branch: `main`
- Remote: `git@github.com:jojojubah/vibe-node.git`
- Live domain (`CNAME`): `vibenode.co.uk`

## Current Product State
- Visual theme:
  - Blue-top gradient into black background.
  - Sticky black glass-style header with faded divider line.
  - Dark card surfaces (`--card-surface`).
  - Footer is transparent with top border.
  - Favicon: `/assets/favicon.svg`.
- Site focus:
  - Home and Games both center on `Dotz & Boxz` only.
  - App Store / Google Play badges show a `Coming soon` tip on click.
  - No Services/Apps/Tools/About/Products/Thanks routes in the live structure.
- Navigation:
  - Primary links are `Home` and `Dotz & Boxz`.
- Footer:
  - Brand + social links.
  - `Explore`, `Contact`, and `Legal` columns.
  - `.cookie-settings-link` is available sitewide.

## Site Structure
- Home page: `/index.html`
- Folder routes (each with `index.html`):
  - `/games/`
  - `/privacy/`
  - `/terms/`
  - `/cookies/`
- Static assets directory: `/assets/`
- Reusable snippets directory: `/snippets/`
- Local snapshot folder (ignored by git):
  - `/site-backups/2026-03-07-full-site/`

## Shared Files
- Global styles: `/styles.css`
- Global behavior: `/scripts.js`
- Every page loads:
  - `<link rel="stylesheet" href="/styles.css?v=...">`
  - `<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=...">`
  - `<script src="/scripts.js?v=..." defer></script>`
- Current cache version in markup: `v=20260307a`
- Rule: when CSS/JS changes, bump the shared `?v=` value across all HTML files.

## Key Behavior Notes
- Mobile nav:
  - Controlled by `.menu-toggle` `aria-expanded` and header class `menu-open`.
  - Hamburger animation tied to `aria-expanded="true"` in CSS.
- Sticky header:
  - Scroll classes `.is-scrolled` and `.is-hidden` set in `/scripts.js`.
- Cookie consent:
  - Storage key: `vibenode_cookie_consent_v1`.
  - Footer `.cookie-settings-link` opens settings panel.
- Hero phrase motion:
  - `.hero-window-phrase` rotator on Home.
- Scroll reveal:
  - Viewport animation uses `[data-viewport]` + `.vn-onscreen` (`initViewportAnimations`).
- Coming-soon badges:
  - Badge groups use `data-coming-soon-group`.
  - Click handlers from `initComingSoonBadges` show `.coming-soon-tip`.
- Scroll angle:
  - `/scripts.js` updates `--scroll-angle`.

## Reusable Assets
- Store badges:
  - `/assets/badges/download-on-the-app-store.svg`
  - `/assets/badges/google-play-badge.png`
- Social icons:
  - `/assets/icons/social/linkedin.svg`
  - `/assets/icons/social/x.svg`
  - `/assets/icons/social/instagram.svg`
- Brand assets:
  - `/assets/v-node-mark-gradient.svg`
  - `/assets/v-node-mark-white.svg`
  - `/assets/v-node-profile.png`

## Editing Rules
- Keep clean folder URLs (edit `*/index.html`; do not introduce root-level route `.html` files).
- Preserve shared header/footer and nav consistency unless explicitly redesigning globally.
- Preserve accessibility attributes used by JS (`aria-expanded`, `aria-controls`, `aria-hidden`, `aria-current`).
- Prefer existing design tokens/components in `/styles.css` before adding one-off styles.
- Prefer local assets over external hotlinks.

## Quick QA Checklist
- Desktop/mobile nav opens/closes correctly on all pages.
- Active nav state (`aria-current="page"`) is correct per route.
- Home hero window renders correctly (top bar, phrase rotator, bullets).
- Games page shows Dotz & Boxz card with both store badges.
- Clicking either badge shows `Coming soon` tip.
- Cookie banner/settings still work.
- Legal pages load and link correctly.
- Updated CSS/JS is visible after cache version bump.

## Local Preview
- Preferred quick preview:
  - `python3 -m http.server 4173`
- Validate:
  - `http://127.0.0.1:4173/`
  - `http://127.0.0.1:4173/games/`
  - `http://127.0.0.1:4173/privacy/`
  - `http://127.0.0.1:4173/terms/`
  - `http://127.0.0.1:4173/cookies/`
