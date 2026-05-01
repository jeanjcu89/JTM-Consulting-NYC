# JTM Consulting NYC — Handoff Package

Everything you need to deploy, edit, and re-export the JTM Consulting NYC brand and website.

```
handoff/
├── site/      ← what gets deployed to Netlify (drag this folder to deploy)
├── source/    ← editable design canvases (logos, monogram studies, marketing assets)
└── brand/     ← logo files, favicons, OG image, BRAND.md quick reference
```

---

## 1. Deploy / update the live site (Netlify)

The site at **jtmconsultingnyc.com** is a plain static site — HTML + CSS + JSX (transpiled in-browser via Babel). **No build step.** Just upload `site/`.

### Option A — Drag-and-drop deploy

1. Open https://app.netlify.com → your existing **jtmconsultingnyc.com** site.
2. Click **Deploys** → drag the entire `site/` folder onto the dropzone.
3. Wait ~10 seconds. The new version is live.

### Option B — Connect a Git repo (recommended for ongoing work)

1. Open VS Code on the `site/` folder, `git init`, commit, push to GitHub.
2. In Netlify → **Site settings → Build & deploy → Continuous deployment** → connect the repo.
3. Build command: *(leave empty)*. Publish directory: *(leave empty / repo root)*.
4. Every push to `main` auto-deploys.

`netlify.toml` and `_redirects` are already included.

---

## 2. Edit locally (VS Code)

```bash
cd handoff/site
# Any static server works. Two easy options:
python3 -m http.server 8080
# or
npx serve .
```

Open http://localhost:8080. Edit any `.jsx` / `.css` / `.html` file — the page picks up changes on refresh.

### File map

| File | What it is |
|---|---|
| `index.html` / `JTM Consulting NYC.html` | The two HTML entry points (Netlify serves `index.html`; the named one is identical and useful for sharing direct file links). |
| `app.jsx` | Top-level layout: `<Nav>` and `<Footer>`. Brand chip lives here (lines 53–62). |
| `main.jsx` | Mount + hash-based router. |
| `page-home.jsx` | Hero, services overview, CTA. |
| `page-services.jsx` | Services detail. |
| `page-portfolio.jsx` | Case studies / "Work". |
| `page-about.jsx` | About / team. |
| `page-contact.jsx` | Contact form + intake. |
| `tweaks-panel.jsx` | In-page tweaks helper (development tool — safe to leave in production). |
| `styles.css` | Global tokens, typography, nav, layout primitives. |
| `styles-{home,services,portfolio,about,contact}.css` | Per-page styles. |
| `logo-mark.png` | Source JM monogram artwork (black on transparent). Used in nav chip + marketing assets. |
| `favicon*.{ico,svg,png}` | Browser/tab icons (16, 32, 48, 64, 192, 256, 512 + apple-touch-icon). |
| `og-image.jpg` | 1200×630 social preview card. |
| `site.webmanifest` | PWA manifest (icons + theme color). |
| `netlify.toml` / `_redirects` | Netlify config. |

### Why JSX in the browser?

The site uses `<script type="text/babel">` to transpile JSX on page load (Babel standalone). Pros: zero build pipeline. Con: slightly slower first paint than a compiled bundle. If/when you want a build step, [Vite + React](https://vitejs.dev/guide/) drops in cleanly — the JSX is already standard React.

---

## 3. Re-export marketing PNGs

The marketing pack (Facebook square, IG story, OG card, Google Ads sizes, banner ads) is a live React canvas — not pre-rendered files. Open it locally to re-export at any time:

1. From `handoff/source/`, open `JTM Marketing Assets.html` directly in a browser (no server needed; or serve the `source/` folder if you hit CORS issues with the embedded fonts).
2. Bottom-right of the canvas → green **Export PNGs ↓** button.
3. Click **Render all 15 PNGs**. Wait ~30 seconds.
4. Right-click each preview → **Save Image As…** to download at native resolution.

### Files produced

| Filename | Size | Use |
|---|---|---|
| `01-jtm-mark-400.png` | 400×400 | Reference mark |
| `02-jtm-wordmark-600.png` | 600×400 | Reference wordmark |
| `fb-ig-feed-1080.png` | 1080×1080 | Instagram feed, FB feed square |
| `fb-ig-story-1080x1920.png` | 1080×1920 | IG story, FB story, Reels cover |
| `og-link-card-1200x630.png` | 1200×630 | OG / Twitter / LinkedIn link preview |
| `google-logo-1200.png` | 1200×1200 | Google Ads RDA — logo |
| `google-marketing-1200x628.png` | 1200×628 | Google Ads RDA — landscape marketing |
| `google-square-1200.png` | 1200×1200 | Google Ads RDA — square marketing |
| `google-portrait-480x600.png` | 480×600 | Google Ads RDA — portrait |
| `google-copy-deck-1200x800.png` | 1200×800 | Reference: headlines + descriptions for the RDA copy fields |
| `banner-medium-rect-300x250.png` | 300×250 | Display network — Medium Rectangle |
| `banner-leaderboard-728x90.png` | 728×90 | Display — Leaderboard |
| `banner-skyscraper-160x600.png` | 160×600 | Display — Wide Skyscraper |
| `banner-mobile-320x50.png` | 320×50 | Display — Mobile Banner |
| `banner-half-page-300x600.png` | 300×600 | Display — Half Page |

### To edit a marketing asset

Open `source/marketing/marketing-assets.jsx`. Each artboard is a `<DCArtboard>` with the size baked in. Edit the contents, save, refresh, re-export.

---

## 4. Brand assets

See **`brand/BRAND.md`** for colors, type, voice, and clear-space rules.

Quick handles:

- **Lime accent**: `#c2ff3d`
- **Ink**: `#0a0a0a`
- **Headlines/body**: Geist
- **Mono / labels**: Geist Mono
- **Logo**: lime square chip + JM monogram (centered, ~62% of chip size)

---

## 5. Common edits

### Update phone / email / address

Search the codebase for the current values and replace them everywhere:

```bash
# In handoff/site/
grep -r "info@jtmconsultingnyc.com" .
grep -r "718.*431.*5113" .
grep -r "Brooklyn" .
```

Hot spots: `page-contact.jsx`, `page-about.jsx`, `app.jsx` (footer), `JTM Consulting NYC.html` (meta).

### Change the OG / social preview copy

Edit the `og-image.jpg` directly in any image editor, or open `source/marketing/marketing-assets.jsx` → find `OGCard()` → edit text → re-export → drop into `site/og-image.jpg`.

### Add a new page

1. Create `page-newthing.jsx` (copy `page-about.jsx` as a template).
2. Add `<script type="text/babel" src="page-newthing.jsx"></script>` to `index.html`.
3. In `main.jsx`, add the route to the switch.
4. In `app.jsx`, add the link to the `items` array in `<Nav>`.

### Update the favicon / logo

The mark is `logo-mark.png`. To replace it:

1. Drop the new artwork into `site/logo-mark.png` (transparent PNG, square, ~1500×1500).
2. Re-render the favicon set: open `source/JTM Marketing Assets.html` (or any HTML page) → DevTools console → run the favicon-render script (see below) **OR** redraw them in your image editor at sizes 16, 32, 48, 64, 192, 256, 512, 180 (apple-touch).
3. Replace `og-image.jpg` (re-render via the marketing canvas).
4. Bump the cache-busting query string in `index.html` from `?v=6` to `?v=7` (or higher) on every `<link rel="stylesheet">` so visitors don't get stale CSS.

---

## 6. DNS / domain (already set)

Domain `jtmconsultingnyc.com` is pointed at Netlify. No DNS changes needed for content updates. If you need to migrate: **Netlify → Domain settings** has the current nameserver / A-record config.

---

## 7. Need to roll back?

Netlify keeps every deploy. **Deploys → click any past deploy → Publish deploy.** Live in seconds.

---

## Questions / future work

- Currently no analytics. To add Google Analytics: drop the GA snippet into the `<head>` of both `index.html` and `JTM Consulting NYC.html`.
- Contact form has no backend — submissions go nowhere. To wire it up: Netlify Forms (add `data-netlify="true"` to the `<form>`) or a service like Formspree.
- All `.jsx` files are transpiled in-browser. If first paint becomes a concern, migrate to a Vite build later.
