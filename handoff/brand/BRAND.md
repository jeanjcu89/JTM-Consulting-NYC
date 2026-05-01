# JTM Consulting NYC — Brand Quick Reference

## Logo

The mark is a **lime square chip** with the **JM monogram** inside (J and M letterforms, custom-drawn, ligature-style).

| File | Use |
|---|---|
| `logo-mark.png` | Source artwork — black JM glyph on transparent. Drop on any background. |
| `jtm-mark.svg` | Animated SVG version of the chip + monogram (with cursor). |
| `jtm-mark-static.svg` | Static SVG (no animation). For PDFs, email signatures, anywhere SVG is supported. |
| `jtm-wordmark.svg` | "JTM CONSULTING NYC" wordmark, no chip. |
| `jtm-lockup.svg` | Chip + wordmark, horizontal. |
| `favicon.svg` / `favicon-*.png` / `apple-touch-icon.png` / `favicon.ico` | Browser/tab/OS icons. |
| `og-image.jpg` | 1200×630 link-preview card (Facebook, LinkedIn, WhatsApp, X). |

### Clear space
Leave at least the height of one "M" of clear space around the mark on all sides.

### Minimum size
- Mark / chip: 16×16 px on screen, 12×12 mm in print.
- Wordmark: 80 px wide on screen, 25 mm wide in print.

### Don'ts
- Don't change the chip color (lime `#c2ff3d`) or the monogram color (ink `#0a0a0a`).
- Don't outline, drop-shadow, or gradient the mark.
- Don't stretch — the chip is square, the monogram is centered inside it.

---

## Color

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| **Lime** (accent) | `#c2ff3d` | `oklch(94% 0.21 122)` | Primary action, brand chip, highlights |
| **Ink** (foreground / chip text) | `#0a0a0a` | `oklch(15% 0 0)` | Primary text on lime, dark backgrounds |
| **Off-white** | `#fafafa` | `oklch(98% 0 0)` | Body text on ink |
| **Mute** | `#666` / `#9a9a96` | — | Secondary text, captions, mono labels |
| **Border** | `#1f1f1f` / `#2a2a2a` | — | Card edges, dividers |
| **Background** | `#0a0a0a` / `#050505` | — | Page background (charcoal/near-black) |
| **Sky** (secondary accent) | `#36c5f0` | — | Editorial italic accents only — sparingly |

The site is **dark by default**. There is no light theme.

---

## Type

- **Headlines & body**: [Geist](https://fonts.google.com/specimen/Geist) (300, 400, 500, 600, 700)
- **Mono / labels / monogram**: [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) (400, 500, 600, 700)
- **Editorial italic accent**: Geist italic — used in the hero only, sparingly, in the sky-blue accent color

Loaded via Google Fonts in `<head>`. If self-hosting, put the WOFF2 files in `/fonts/` and update `styles.css`.

---

## Voice

Plain, direct, and a little dry. We don't oversell. Examples:

- ✅ "One team. One invoice."
- ✅ "We build the digital backbone for NYC small business."
- ❌ "Unleash your business potential with our cutting-edge synergy."

Use mono-font tags (`// SERVICES`, `// CONTACT`) for section labels — they reinforce the engineering/terminal vibe.

---

## OG / social preview

The 1200×630 OG image lives at `og-image.jpg`. It's referenced from `<head>` of every HTML page. To regenerate after a copy or color change, edit `og-image.jpg` directly or run `scripts/build-og-image.py` (requires Python + Pillow).
