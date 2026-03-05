# Vibe Node Brand Guide for AI Coding Assistants

Use this file as the canonical handoff when you want an AI assistant to re-skin an app/game into Vibe Node branding.

## Goal
Make every page feel like `vibenode.co.uk`, especially the background system.

## Source of truth
- `styles.css` in this repo is the visual source of truth.
- `scripts.js` controls shared behavior (mobile nav, sticky header, scroll effects, card/media rotators).

## Non-negotiable brand rules
- Keep the top-only blue glow + black fade background.
- Keep dark surfaces; no white page backgrounds.
- Keep accent as blue (`#4ba4ff` family), no purple theme shifts.
- Keep header as black glass with faded edge divider line.
- Keep cards as solid `--card-surface` (no thin outline-only cards).
- Keep button hover as color inversion only (no movement).

## Exact background system (copy exactly)
Use this block globally:

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap");

:root {
  --bg: #02050f;
  --bg-soft: #050b1d;
  --surface: #060d1f;
  --surface-2: #091327;
  --surface-3: #0d1831;
  --text: #edf4ff;
  --muted: #8f9fbe;
  --line: rgba(151, 181, 255, 0.22);
  --line-soft: rgba(120, 152, 228, 0.14);
  --accent: #4ba4ff;
  --accent-strong: #1f6aff;
  --accent-soft: #8bc6ff;
  --focus: #8bc6ff;
  --shadow: 0 18px 50px rgba(1, 6, 18, 0.66);
  --radius-lg: 26px;
  --radius-md: 18px;
  --radius-sm: 12px;
  --card-surface: #161b24;
}

body {
  font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at 14% 0%, rgba(36, 112, 255, 0.22), transparent 18%),
    radial-gradient(circle at 84% 4%, rgba(82, 176, 255, 0.09), transparent 14%),
    linear-gradient(180deg, #041028 0%, #020a1d 10%, #000 26%, #000 100%);
  min-height: 100vh;
  line-height: 1.6;
}
```

## Core shell classes to reproduce
Use these structural styles for accurate page feel:

```css
.page {
  position: relative;
  width: min(1180px, 100% - 44px);
  margin: 0 auto;
  padding-bottom: 88px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 12px 22px;
  background: rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  --header-line-color: rgba(255, 255, 255, 0.14);
}

.site-header::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    var(--header-line-color) 12%,
    var(--header-line-color) 88%,
    rgba(255, 255, 255, 0)
  );
}

.home-panel,
.game-item,
.service-form {
  border-radius: var(--radius-lg);
  border: 0;
  background: var(--card-surface);
  box-shadow: var(--shadow);
}
```

## Navigation styling rules
- Desktop nav links are plain text, no containers.
- Active and hover state: blue text (`var(--accent-soft)`).
- Mobile menu can use temporary dark containers when expanded.

## Button styling rules
- Primary uses blue gradient fill.
- Hover state inverts to light background + blue text.
- No translate/scale hover movement.

## AI execution workflow (for converting external apps)
1. Create/merge a global theme file with the exact token + `body` background block above.
2. Wrap page content in a centered container equivalent to `.page`.
3. Replace top nav with Vibe Node header behavior and visual style.
4. Convert cards/sections to dark solid surfaces (`--card-surface`, rounded corners, shadow).
5. Normalize typography to Plus Jakarta Sans + muted body text.
6. Restyle buttons/links to Vibe Node blue system.
7. Add responsive stacking at mobile widths (`<=960px`) for hero two-column layouts.
8. Run visual QA against reference pages.

## Exact prompt you can give another AI
Use this prompt verbatim when needed:

```text
Rebrand this project to match Vibe Node exactly.
Use /Users/joseph/Documents/Projects/ChipChop/VIBE_NODE_BRAND_AI_GUIDE.md as strict source of truth.
Apply the exact global background gradients and token system, keep dark card surfaces, black glass sticky header with faded divider line, text-only desktop nav links, and blue inversion hover buttons.
Do not invent a new palette, do not add purple, and do not use white page backgrounds.
Update every route/page consistently and keep mobile behavior aligned (hero stacks to one column under 960px).
```

## QA acceptance checklist
- Background is identical in direction and tone (top blue glows fading to black).
- Header appears as black glass with the soft faded divider line.
- Cards are dark solid surfaces with rounded corners and shadow.
- Text contrast matches Vibe Node (`--text` and `--muted`).
- Buttons follow Vibe Node primary/ghost style and inversion hover.
- Mobile hero sections stack vertically and remain readable.

## Legal/media note
- Do not copy Apple-owned screenshots directly unless explicitly licensed.
- Prefer custom illustrations or licensed/free-use assets for “liquid glass” style visuals.
