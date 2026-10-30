# Vibe Node — vibenode.co.uk

Marketing/publisher site for **Vibe Node Ltd**. Static site, no build step, deployed by
GitHub Pages from `main` on push. Custom domain in `CNAME` (`vibenode.co.uk`), `.nojekyll`
present so `_`-prefixed paths aren't stripped.

**Pushing to `main` publishes to the live site.** Don't push unless asked.

## Layout

```
index.html            home page — showcase section per app, each linking to its app page
learn-liquid-glass/ roulette-play/ dotz-boxz/   app pages: full detail, facts, FAQ, JSON-LD (canonical page per app)
press/                press kit: company facts, boilerplate, downloads (logos, icons, screenshots)
llms.txt              plain-language site summary for AI assistants — update when apps/facts change
styles.css            visual source of truth for the brand (see VIBE_NODE_BRAND_AI_GUIDE.md)
scripts.js            all shared behaviour, plain IIFE/module-free JS
assets/               logos, app icons, favicon, store badges
privacy/ legal/ terms/ support/ cookies/   one index.html each
                      (company: Vibe Node Ltd, Companies House 17002209, incorporated 30 Jan 2026, London)
snippets/store-badge-links.html            reusable App Store badge markup
404.html              branded not-found page (GitHub Pages serves it for any missing path)
services/ products/ games/ vroulette/   noindex redirect stubs for old URLs that still get visits — keep them
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
  (currently `styles.css?v=20261030a`, `scripts.js?v=20260923d`). When you edit either file, bump the query string in **every**
  HTML file that references it, or returning visitors get stale CSS.
- Each app has its own page (`/learn-liquid-glass/`, `/roulette-play/`, `/dotz-boxz/`) and the nav/footer link there. The home
  page keeps its showcase sections with ids `#learn-liquid-glass`, `#vroulette`, `#dotz-boxz`, `#contact` so old links still work.
- SEO: Search Console is verified via the `google-site-verification` meta on the home page (don't remove it).
  JSON-LD uses `@id`s: `https://vibenode.co.uk/#organization`, `/#website`, and `/<app>/#app`; app pages reference
  the organization by `@id`. Keep app facts (price, OS, version) in step with the App Store listings.
- **Dotz & Boxz** (App Store id `6828686411`, source `~/Documents/Dotz&Boxz`): dots and boxes with real ropes, iPhone and
  iPad, iOS 26+, free with an optional £1.99 Animal Friends Pack, rated 4+, English only. First version 1.2026.1 submitted
  30 Oct 2026. Until it's live, its home section and app page show "Coming soon to the App Store" (`.app-feature-soon`)
  under the badge: remove those lines and that CSS rule at launch. Pink accent `#ff9fd0` (`.app-feature-dotz`,
  `.app-page-dotz`, `.press-app-dotz`). Site shots are portrait 560×1216 JPEGs in `assets/dotz-boxz/` inside the Learn
  Liquid Glass iPhone 17 Pro Max bezel, made from the app repo's `AppStoreScreenshots/Sources-iPhone17ProMax/`; the press
  ZIP is the 7 App Store iPhone shots as JPEGs. Privacy, support, terms, legal and about pages cover it (iCloud key-value
  sync, tilt motion stays on device, opt-in reminder, grown-up check, children's statement).
- The roulette app is **Roulette Play** (App Store name "Roulette Play: Casino Game", formerly Vroulette; renamed in
  1.2026.1, live Oct 2026). The `#vroulette` anchor, `assets/vroulette/` folder and CSS class names keep the old name on
  purpose so existing links keep working. App Store link: `https://apps.apple.com/app/id6786365002`.
- Roulette Play screenshots on the site are raw in-game iPhone captures, 1600×736 JPEG (quality ~70, ~300 KB), shown
  inside the site's own landscape bezel: `assets/vroulette/iphone-table.jpg`, `iphone-winner-v2.jpg`, `iphone-customise.jpg`
  (from the Roulette repo's `AppStoreScreenshots/Sources-Production-iPhone18ProMax/` `table`, `win`, `theme`). They carry
  their own `?v=YYYYMMDD<letter>` (currently `20261012a`) in `index.html` and `roulette-play/index.html`; bump it when the
  images change. The press kit's `roulette-play-app-store-screenshots.zip` holds the 8 English portrait App Store
  screenshots. Last refreshed for 1.2026.3 (12 Oct 2026), with JSON-LD `softwareVersion` 1.2026.3.
- **Learn Liquid Glass** (App Store id `6768110722`, bundle `com.vibenode.learn-liquid-glass`). **Free since
  1.2026.2** (live 12 Oct 2026; checked 17 Oct via `itunes.apple.com/lookup?id=6768110722&country=gb`). Category is
  still Education on the public listing; the app repo plans a switch to Developer Tools in App Store Connect, so only
  change "Education" on the site once the listing shows it. 1.2026.3 (iOS build 12, Mac build 11) is prepared locally,
  not yet uploaded: new Unsplash photography behind many more lesson examples (Morphing Transitions, Animations, Touch,
  Pencil Hover, Gestures, State Machines, AppKit…), share-an-example-page flow, rating prompt only after 8 completed
  lessons. Release copy: the app repo's `Documentation/APP_STORE_RELEASE_<version>.md`. The marketing line stays
  "50+ guided lessons, 200+ working examples", no account, no tracking, works offline, iOS/iPadOS/macOS 26+.
  Facts to keep in step on the site: price (JSON-LD `offers` on the home page and app page, FAQ, facts list, meta
  description, press kit card), `softwareVersion` in `learn-liquid-glass/index.html` (bump to 1.2026.3 once that version
  is live), `llms.txt`. The site says Free (no subscription, no in-app purchases, no ads) since 17 Oct 2026.
- Learn Liquid Glass site screenshots (in `assets/learn-liquid-glass/`) are raw app captures shown inside the site's
  own bezels, used on `index.html`, `learn-liquid-glass/index.html` (also JSON-LD `screenshot`) and as press downloads:
  `mac-lessons.png` (2292×1532, in `macbook-pro-m5.png`), `ipad-dashboard.png` (2064×2752 portrait, in
  `ipad-pro-m5.png`), `phone-liquid-ai.jpg` + `phone-code.jpg` (560×1216, in `iphone-17-pro-max.png`). Replace them at
  the same pixel size and aspect so the bezel fit holds (or update the `width`/`height` attributes everywhere). Replaced
  ones carry `?v=YYYYMMDD<letter>` (`phone-code.jpg` + `ipad-dashboard.png` at `20261017a`) in `index.html`,
  `learn-liquid-glass/index.html` and `press/index.html`; bump it whenever an image changes. Despite its name,
  `phone-code.jpg` shows the Morphing Transitions lesson since 17 Oct 2026; `phone-liquid-ai.jpg` is still the Sep shot
  (Liquid AI fails to answer in the simulator, so a conversation needs real hardware).
  **How they're made:** the app has a Debug-only `--marketing-capture=<name>` launch argument (`MarketingCaptureView.swift`:
  `dashboard`, `lessons`, `liquid-ai`, `code-example`, …) and `--lesson=<LiquidGlassSection raw value>` (e.g.
  `--lesson=Morphing Transitions`). Build Debug into the scratchpad, run on the iPhone 17 Pro Max simulator (1320×2868 →
  `sips -z 1216 560`, JPEG ~80) and iPad Pro 13-inch (M5) (2064×2752, used as is), status bar overridden to 9:41 via
  `simctl status_bar`. First launch after a fresh boot can take minutes and capture blank: re-check before using.
  Mac: launch the Debug Mac app with `--marketing-capture=lessons`; it opens at 1100×720. Get its window id from
  `CGWindowListCopyWindowInfo` (small Swift snippet), then `screencapture -x -l <id> mac-lessons.png` gives the
  2292×1532 transparent-shadow PNG directly. Do it yourself, never stitch or hand it to the user. All three
  (`mac-lessons.png` too) are at `?v=20261017a`.
  The finished App Store sets (with captions, not for the site bezels) are in the app repo under
  `App Store Screenshots/Final/`, `iPad App Store Screenshots/Final/`, `Mac App Store Screenshots/Final/` and
  `iPhone Duo App Store Screenshots/`; the press kit has no Learn Liquid Glass screenshot ZIP yet.
- New page → also add it to `sitemap.xml`.
- Contact is `contact@vibenode.co.uk` everywhere.

## scripts.js

One file, small init functions called on DOM ready. Notable ones:
mobile nav + sticky header, cookie consent (`readCookieConsent`/`writeCookieConsent`),
GA4 gated behind consent (`GA4_MEASUREMENT_ID` = `G-WDLSD474GV`, only loads after opt-in; it's the "VIBENODE" property on
the user's VibeNode Google account, the *second* Chrome login (`authuser=1`), not the JojoJubah account),
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
