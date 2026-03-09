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
  - Header/nav uses a black glass-style sticky bar with a faded-edge divider line.
  - Card surfaces are solid dark grey-blue (`--card-surface`) with no thin outline borders.
  - Footer is non-card style (transparent background + top border).
  - Primary and ghost buttons use no hover movement; hover behavior is color inversion.
  - Favicon is `/assets/favicon.svg` (Vibe Node mark; white fill treatment).
- Home (`/`):
  - Hero is 2-column; left side keeps core headline + CTA.
  - Right side is a macOS-style app window panel with:
    - top bar controls + Vibe Node logo/label
    - rotating phrase line (`.hero-window-phrase`)
    - static outcome bullets
    - trust line with `3-5 business day response`
  - Main CTA in hero: `Build with Us` (links to `/services/#service-enquiry`).
  - Three stacked panels remain: `Game`, `Services`, `Platform`.
- Products (`/products/`):
  - Main hub with section order: `Apps` -> `Games` -> `Tools`.
- Games (`/games/`):
  - Single game card for `Dotz & Boxz` with App Store / Google Play badges.
- Services (`/services/`):
  - Header copy: `Build with us at the practical frontier of AI.`
  - Hero right side uses same app-window component pattern as Home.
  - Includes `LATEST MODELS` marquee banner section (top global snapshot, March 2026).
  - Three service panels: `Individuals`, `Businesses`, `Build Tracks`.
  - Enquiry form is `data-mailto-form` and opens prefilled email compose to `contact@vibenode.co.uk`.
  - Includes `I am a` selector (`Individual` / `Company / Business`).
  - When `Individual` is selected, company field is disabled and visually greyed out.
  - Service trust/reply messaging uses `3-5 business days`.
- Apps (`/apps/`) and Tools (`/tools/`):
  - Minimal `Coming soon.` pages.
  - Marked `noindex,follow` until full content is ready.
- Thanks (`/thanks/`):
  - Confirmation page after enquiry flow with `3-5 business days` response message.
- Top navigation across site:
  - Primary links: `Products` and `Services`.
  - Desktop links are text-only (no pill containers); active/hover state is blue color.

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
  - `/thanks/`
- Static assets directory: `/assets/`
- Reusable snippets directory: `/snippets/`

## Shared Files
- Global styles: `/styles.css`
- Global behavior: `/scripts.js`
- Every page loads:
  - `<link rel="stylesheet" href="/styles.css?v=...">`
  - `<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=...">`
  - `<script src="/scripts.js?v=..." defer></script>`
- Current cache version in markup: `v=20260309a`
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
- Hero phrase motion:
  - Home + Services hero windows use `.hero-window-phrase` with `data-hero-phrases`.
  - Rotator logic is in `/scripts.js` (`initHeroWindowPhraseRotators`), with reduced-motion guard.
- Scroll reveal + section tracking:
  - Viewport animation system uses `[data-viewport]` + `.vn-onscreen` (`initViewportAnimations`).
  - Section sticky nav is auto-generated for `.products-sections` (`initStickySectionNav`), desktop only.
- Services models marquee:
  - Auto-scrolls on desktop; touch/click toggles pause via `.is-paused` (`initModelIntelMarquee`).
- Service form:
  - Current live form markup uses `form[data-mailto-form]`.
  - Prefill handling is in `/scripts.js` (`initMailtoForms`).
  - `initAsyncForms` remains in codebase for forms that use `data-async-form`.
  - `select[name="client_type"]` controls `input[name="company"]` disabled state.
- Scroll angle:
  - `/scripts.js` still updates CSS variable `--scroll-angle` (legacy support for motion/angle-driven effects).
- Canonical path handling:
  - `/scripts.js` normalizes `*/index.html` URLs to clean folder paths.
  - Also normalizes `www` to apex host and `http` to `https` for `vibenode.co.uk`.

## Reusable Assets
- Store badges:
  - `/assets/badges/download-on-the-app-store.svg`
  - `/assets/badges/google-play-badge.png`
  - Snippet: `/snippets/store-badge-links.html`
- Social icons (local SVG):
  - `/assets/icons/social/linkedin.svg`
  - `/assets/icons/social/x.svg`
  - `/assets/icons/social/instagram.svg`
- AI model provider icons:
  - `/assets/icons/ai-models/openai.svg`
  - `/assets/icons/ai-models/anthropic.svg`
  - `/assets/icons/ai-models/google.svg`
  - `/assets/icons/ai-models/x.svg`
  - `/assets/icons/ai-models/mistralai.svg`
  - `/assets/icons/ai-models/alibabacloud.svg`
- Brand assets:
  - `/assets/v-node-mark-gradient.svg`
  - `/assets/v-node-mark-white.svg`
  - `/assets/v-node-profile.png`

## Editing Rules
- Keep clean folder URLs (edit `*/index.html`; do not introduce root-level route `.html` files).
- Preserve shared header/footer and nav consistency unless explicitly redesigning globally.
- Preserve accessibility attributes used by JS (`aria-expanded`, `aria-controls`, `aria-hidden`, `aria-current`).
- Prefer existing design tokens/components in `/styles.css` before adding new one-off styles.
- Prefer local assets (store badges, social SVGs) over external hotlinks.

## Quick QA Checklist
- Desktop/mobile nav opens/closes correctly on all pages.
- Active nav state (`aria-current="page"`) is correct per route.
- Home + Services hero windows render correctly (header bar, phrase rotator, bullets, trust line).
- Header intro text alignment is consistent between Home, Products, Services.
- Button hover behavior inverts colors and does not move.
- Products sections render in order: Apps, Games, Tools.
- `/apps/` and `/tools/` include `noindex,follow` meta tags.
- Games page shows one game and both store badges open external links.
- Services model marquee scrolls, and pause/resume works on mobile tap.
- Services form:
  - `Send enquiry` opens prefilled email compose to `contact@vibenode.co.uk`
  - selecting `Individual` disables/greys company field
- Reply-time text shows `3-5 business days` where displayed.
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
