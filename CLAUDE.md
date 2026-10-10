# Vibe Node — vibenode.co.uk

Marketing/publisher site for **Vibe Node Ltd**. Static site, no build step, deployed by
GitHub Pages from `main` on push. Custom domain in `CNAME` (`vibenode.co.uk`), `.nojekyll`
present so `_`-prefixed paths aren't stripped.

**Pushing to `main` publishes to the live site.** Don't push unless asked.

## Layout

```
index.html            home page — showcase section per app, each linking to its app page
learn-liquid-glass/ roulette-play/       app pages: full detail, facts, FAQ, JSON-LD (canonical page per app)
press/                press kit: company facts, boilerplate, downloads (logos, icons, screenshots)
llms.txt              plain-language site summary for AI assistants — update when apps/facts change
styles.css            visual source of truth for the brand (see VIBE_NODE_BRAND_AI_GUIDE.md)
scripts.js            all shared behaviour, plain IIFE/module-free JS
assets/               logos, app icons, favicon, store badges
privacy/ legal/ terms/ support/ cookies/   one index.html each
                      (company: Vibe Node Ltd, Companies House 17002209, incorporated 30 Jan 2026, London)
snippets/store-badge-links.html            reusable App Store badge markup
sitemap.xml robots.txt CNAME .nojekyll
```

Legal pages exist because the App Store requires them — see
`VIBENODE_WEBSITE_REQUIREMENTS.md` in the Learn Liquid Glass repo
(`~/Documents/ChatGPT/Learn Liquid Glass/`) for exactly what each URL must say.

## Brand

Brand pack: github.com/jojojubah/BrandVNode-Pack (logos, colours, Sora, guidelines). Display name is **VibeNode**
(one word) in headings, logos and prose; **Vibe Node Ltd** stays for legal/formal references (legal pages, copyright,
page titles of legal pages, JSON-LD `name`). Tagline: "Build with Vibes." (footer).
The expressive (glossy, merged-node) logo is used wherever it holds up; the plain flat SVG only where it must.
Site copies live in `assets/brand/`: `vibenode-mark.png` + `vibenode-wordmark.png` (header and footer, side by side
in `.logo`: the pack's exact separation of the original glossy lockup, `assets/logo/raster/original-generated/`; mark
34px / word 17px in the header, 38 / 19 in the footer), `vibenode-logo.svg` (vector
fallback, unused), `favicon.svg` (the pack's flat gradient mark: flat only where tiny), `apple-touch-icon.png` (180,
glossy), `vibenode-og-1200x630.jpg` (og/twitter image), `vibenode-mark-512.png` (JSON-LD logo). The user prefers the
original glossy raster everywhere it works; SVG/flat only when truly necessary.
Typeface: Sora, self-hosted variable woff2 in `assets/fonts/sora/` with its OFL licence. Don't recreate the wordmark as text.

## Conventions

- **Plain HTML/CSS/JS only.** No framework, no bundler, no npm. Keep it that way.
- Absolute root paths for assets and pages: `/styles.css`, `/assets/...`, `/privacy/`.
- **Cache-busting:** `styles.css` and `scripts.js` are linked with `?v=YYYYMMDD<letter>`
  (currently `styles.css?v=20261010c`, `scripts.js?v=20260923d`). When you edit either file, bump the query string in **every**
  HTML file that references it, or returning visitors get stale CSS.
- Each app has its own page (`/learn-liquid-glass/`, `/roulette-play/`) and the nav/footer link there. The home
  page keeps its showcase sections with ids `#learn-liquid-glass`, `#vroulette`, `#contact` so old links still work.
- SEO: Search Console is verified via the `google-site-verification` meta on the home page (don't remove it).
  JSON-LD uses `@id`s: `https://vibenode.co.uk/#organization`, `/#website`, and `/<app>/#app`; app pages reference
  the organization by `@id`. Keep app facts (price, OS, version) in step with the App Store listings.
- The roulette app is **Roulette Play** (App Store name "Roulette Play: Casino Game", formerly Vroulette; renamed in
  1.2026.1, live Oct 2026). The `#vroulette` anchor, `assets/vroulette/` folder and CSS class names keep the old name on
  purpose so existing links keep working. App Store link: `https://apps.apple.com/app/id6786365002`.
- New page → also add it to `sitemap.xml`.
- Contact is `contact@vibenode.co.uk` everywhere.

## scripts.js

One file, small init functions called on DOM ready. Notable ones:
mobile nav + sticky header, cookie consent (`readCookieConsent`/`writeCookieConsent`),
GA4 gated behind consent (`GA4_MEASUREMENT_ID` = `G-WDLSD474GV`, only loads after opt-in),
`initMailtoForms` / `initAsyncForms`, `initScrollGradientRims` (scroll-driven gradient angle),
`initHomeHeroTypewriter` (items come from `data-typewriter-items`).

Analytics must stay consent-gated — don't load GA before `applyAnalyticsConsent(true)`.

## Checking work

No test suite. Verify by opening the site locally:

```bash
python3 -m http.server 8000
```

Then check `http://localhost:8000` — root-absolute paths need a server, `file://` breaks them.
Check mobile width too; the nav and hero behave differently under the mobile breakpoint.

## Related local projects

- `~/Documents/ChatGPT/Learn Liquid Glass/` — the iOS/macOS app this site markets.
  Finished App Store screenshots live in `App Store Screenshots/Final/` and
  `Mac App Store Screenshots/Final/`; its own `CLAUDE.md` covers the app itself.
