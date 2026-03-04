# V Node Logo Export Checklist

## 1) Master files (do not raster-edit these)
- `v-node-mark.svg` (square logo mark, transparent)
- `v-node-lockup.svg` (wide lockup, transparent)
- `v-node-app-icon-template.svg` (1024 app icon starter)

## 2) iOS / Icon Composer workflow
1. Open Xcode Icon Composer and start from a 1024x1024 source.
2. Import `v-node-app-icon-template.svg` (or a PNG exported from it).
3. Create appearance variants (default, dark, tinted, clear) from the same master shape.
4. Keep one simple high-contrast version for small contexts.

## 3) Website favicon + touch icons
Export from `v-node-mark.svg`:
- `favicon.svg`
- `favicon.ico` (contains 16x16 and 32x32)
- `apple-touch-icon.png` at 180x180
- `favicon-32x32.png`
- `favicon-16x16.png`
- Manifest icons: `icon-192.png`, `icon-512.png` (maskable-safe composition)

## 4) HTML head tags
```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

## 5) Brand hygiene
- Keep a transparent-background mark file and a solid-background app-icon file.
- Keep monochrome and reversed variants.
- Never edit PNG exports as the source of truth; always edit SVG masters, then re-export.
