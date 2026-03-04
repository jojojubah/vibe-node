# Brand Rollout Notes

## Objective
Use the new `V + node` logo consistently across app, web, and social assets, with a repeatable export workflow.

## Source of Truth
- Keep masters in `/Users/joseph/Documents/Projects/ICONcOmP/brand-assets`.
- Edit only SVG masters, never exported PNG/ICO files.
- Canonical files:
  - `v-node-mark.svg`
  - `v-node-lockup.svg`
  - `v-node-app-icon-template.svg`

## Immediate Online Updates
1. Replace site favicon assets:
   - `favicon.svg`
   - `favicon.ico`
   - `favicon-32x32.png`
   - `favicon-16x16.png`
   - `apple-touch-icon.png`
2. Update `site.webmanifest` icons:
   - `icon-192.png`
   - `icon-512.png` (maskable-safe layout)
3. Update social preview images:
   - Open Graph image
   - Twitter/X card image
4. Update app icon source in Xcode Icon Composer from the 1024 template.

## Future-Proof Workflow
1. Add one script entry point (example: `npm run brand:build`) to regenerate all exports from SVG.
2. Keep a mini brand spec (`colors`, spacing, min-size, light/dark usage).
3. When logo geometry changes, regenerate all exports in one pass and redeploy.

## Quality Gate Before Publish
- Verify favicon renders in browser tab at 16px and 32px.
- Verify app icon legibility at small sizes.
- Verify social cards show updated logo on real URL previews.
