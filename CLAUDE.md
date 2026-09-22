# Vibe Node — vibenode.co.uk

Marketing/publisher site for **Vibe Node Ltd**. Static site, no build step, deployed by
GitHub Pages from `main` on push. Custom domain in `CNAME` (`vibenode.co.uk`), `.nojekyll`
present so `_`-prefixed paths aren't stripped.

**Pushing to `main` publishes to the live site.** Don't push unless asked.

## Layout

```
index.html            home page — all product sections live here
styles.css            visual source of truth for the brand (see VIBE_NODE_BRAND_AI_GUIDE.md)
scripts.js            all shared behaviour, plain IIFE/module-free JS
assets/               logos, app icons, favicon, store badges
privacy/ legal/ terms/ support/ cookies/   one index.html each
snippets/store-badge-links.html            reusable App Store badge markup
sitemap.xml robots.txt CNAME .nojekyll
```

Legal pages exist because the App Store requires them — see
`VIBENODE_WEBSITE_REQUIREMENTS.md` in the Learn Liquid Glass repo
(`~/Documents/ChatGPT/Learn Liquid Glass/`) for exactly what each URL must say.

## Conventions

- **Plain HTML/CSS/JS only.** No framework, no bundler, no npm. Keep it that way.
- Absolute root paths for assets and pages: `/styles.css`, `/assets/...`, `/privacy/`.
- **Cache-busting:** `styles.css` and `scripts.js` are linked with `?v=YYYYMMDD<letter>`
  (currently `?v=20260914d`). When you edit either file, bump the query string in **every**
  HTML file that references it, or returning visitors get stale CSS.
- Product sections on the home page use slug ids used by the nav: `#learn-liquid-glass`,
  `#vroulette`, `#dotz-and-boxz`, `#contact`.
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
