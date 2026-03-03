# AGENTS.md

## Project Overview
- Repo: `/Users/joseph/Documents/Projects/ChipChop`
- Product: Static multi-page marketing site for Vibe Node.
- Stack: Plain HTML + CSS + vanilla JavaScript (no build tooling/framework).
- Main branch: `main`
- Remote: `git@github.com:jojojubah/vibe-node.git`
- Live domain (`CNAME`): `vibenode.co.uk`

## Current Product State
- Visual theme:
  - Background uses blue gradients at the top only, fading into black for most of the page.
  - No decorative top background shapes (no extra top line/circle overlays).
  - Header/nav bar uses a black glass-style surface.
  - Card surfaces are solid dark grey-blue (`--card-surface`) with no thin outline borders.
  - Footer is non-card style (transparent background + top border).
  - Primary and ghost buttons use no hover movement; hover behavior is color inversion.
- Home (`/`):
  - Header section uses the same core messaging style as Services.
  - Includes right-side blue information panel with:
    - `Build...`
    - `Apps, games, tools`
    - `Extensions, web apps, CLI tools`
    - `Optimise your business with AI`
  - Main CTA in hero: `Build with Us` (links to `/services/#service-enquiry`).
  - Three stacked panels remain: `Game`, `Services`, `Platform`.
- Products (`/products/`):
  - Main hub with section order: `Apps` -> `Games` -> `Tools`.
- Games (`/games/`):
  - Single game card for `Dotz & Boxz` with App Store / Google Play badges.
- Services (`/services/`):
  - Header copy: `Build with us at the practical frontier of AI.`
  - Three service panels: `Individuals`, `Businesses`, `Build Tracks`.
  - Stock imagery removed from service cards.
  - Enquiry form is async and includes `I am a` selector (`Individual` / `Company / Business`).
  - When `Individual` is selected, company field is disabled and visually greyed out.
- Apps (`/apps/`) and Tools (`/tools/`):
  - Minimal `Coming soon.` pages.
- Top navigation across site:
  - Primary links: `Products` and `Services`.

## Site Structure
- Home page: `/index.html`
- Folder routes (each with `index.html`):
  - `/about/`
  - `/products/`
  - `/games/`
  - `/apps/`
  - `/tools/`
  - `/services/`
  - `/privacy/`
  - `/terms/`
  - `/cookies/`
- Static assets directory: `/assets/`
- Reusable snippets directory: `/snippets/`

## Shared Files
- Global styles: `/styles.css`
- Global behavior: `/scripts.js`
- Every page loads:
  - `<link rel="stylesheet" href="/styles.css?v=...">`
  - `<script src="/scripts.js?v=..." defer></script>`
- Current cache version in markup: `v=20260303g`
- Rule: when CSS/JS changes, bump the shared `?v=` value across all HTML files.

## Key Behavior Notes
- Mobile nav:
  - Controlled by `.menu-toggle` `aria-expanded` and header class `menu-open`.
  - Hamburger icon animation tied to `aria-expanded="true"` in CSS.
- Sticky header:
  - Scroll classes `.is-scrolled` and `.is-hidden` are set in `/scripts.js`.
- Cookie consent:
  - Storage key: `vibenode_cookie_consent_v1`.
  - Footer `.cookie-settings-link` opens consent settings panel.
- Service form:
  - Markup uses `form[data-async-form]`.
  - Async submission handled in `/scripts.js` (`initAsyncForms`).
  - Endpoint: `https://formsubmit.co/ajax/contact@vibenode.co.uk`.
  - Includes honeypot field and inline status UI.
  - `select[name="client_type"]` controls `input[name="company"]` disabled state.
- Scroll angle:
  - `/scripts.js` still updates CSS variable `--scroll-angle` (legacy support for motion/angle-driven effects).

## Reusable Assets
- Store badges:
  - `/assets/badges/download-on-the-app-store.svg`
  - `/assets/badges/google-play-badge.png`
  - Snippet: `/snippets/store-badge-links.html`
- Social icons (local SVG):
  - `/assets/icons/social/linkedin.svg`
  - `/assets/icons/social/x.svg`
  - `/assets/icons/social/instagram.svg`
  - `/assets/icons/social/tiktok.svg`

## Editing Rules
- Keep clean folder URLs (edit `*/index.html`; do not introduce root-level route `.html` files).
- Preserve shared header/footer and nav consistency unless explicitly redesigning globally.
- Preserve accessibility attributes used by JS (`aria-expanded`, `aria-controls`, `aria-hidden`, `aria-current`).
- Prefer existing design tokens/components in `/styles.css` before adding new one-off styles.
- Prefer local assets (store badges, social SVGs) over external hotlinks.

## Quick QA Checklist
- Desktop/mobile nav opens/closes correctly on all pages.
- Active nav state (`aria-current="page"`) is correct per route.
- Home hero left text + right blue panel render correctly.
- Header intro text alignment is consistent between Home, Products, Services.
- Button hover behavior inverts colors and does not move.
- Products sections render in order: Apps, Games, Tools.
- Games page shows one game and both store badges open external links.
- Services form:
  - async submit status works
  - selecting `Individual` disables/greys company field
- Cookie banner/settings still work.
- Updated CSS/JS is visible after cache version bump.

## Local Preview
- Preferred quick preview:
  - `python3 -m http.server 4173`
- Validate:
  - `http://127.0.0.1:4173/`
  - `http://127.0.0.1:4173/products/`
  - `http://127.0.0.1:4173/games/`
  - `http://127.0.0.1:4173/services/`
