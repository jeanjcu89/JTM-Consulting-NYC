"""
Generate og-image.jpg (1200x630) for JTM Consulting NYC.
Target: < 300 KB JPG so WhatsApp renders the link preview reliably.
"""
import math
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "og-image.jpg"

W, H = 1200, 630
BG = (10, 10, 10)
INK = (245, 245, 245)
INK_DIM = (170, 170, 170)
INK_MUTE = (110, 110, 110)
LIME = (198, 255, 0)
CYAN = (0, 220, 255)


def load_font(candidates, size):
    for name in candidates:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


FONTS = ROOT / "scripts" / "fonts"
GEIST_MED = [str(FONTS / "geist-v4-latin-500.ttf"), "segoeui.ttf", "arial.ttf"]
GEIST_BOLD = [str(FONTS / "geist-v4-latin-700.ttf"), "segoeuib.ttf", "arialbd.ttf"]
GEIST_MONO_MED = [str(FONTS / "geist-mono-v4-latin-500.ttf"), "consola.ttf", "cour.ttf"]
GEIST_MONO_BOLD = [str(FONTS / "geist-mono-v4-latin-600.ttf"), "consolab.ttf", "courbd.ttf"]


def draw_tracked(draw, xy, text, font, fill, tracking_em=0.0):
    """Draw text with extra letter-spacing in em units (positive = wider)."""
    if tracking_em == 0:
        draw.text(xy, text, font=font, fill=fill)
        return draw.textlength(text, font=font)
    extra = font.size * tracking_em
    x, y = xy
    start = x
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + extra
    return x - start


def tracked_width(draw, text, font, tracking_em=0.0):
    if tracking_em == 0:
        return draw.textlength(text, font=font)
    extra = font.size * tracking_em
    return sum(draw.textlength(ch, font=font) for ch in text) + extra * max(0, len(text) - 1)


def draw_grid(draw):
    step = 60
    color = (28, 28, 28)
    for x in range(0, W, step):
        draw.line([(x, 0), (x, H)], fill=color, width=1)
    for y in range(0, H, step):
        draw.line([(0, y), (W, y)], fill=color, width=1)


def draw_network(img):
    """Faint connected-dots motif, low alpha so text reads clean."""
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    rng = random.Random(7)
    nodes = []
    n = 70
    for _ in range(n):
        nodes.append((rng.uniform(0, W), rng.uniform(0, H)))

    max_d = 180
    for i, a in enumerate(nodes):
        for b in nodes[i + 1:]:
            dx, dy = a[0] - b[0], a[1] - b[1]
            d = math.hypot(dx, dy)
            if d < max_d:
                alpha = int((1 - d / max_d) * 60)
                od.line([a, b], fill=(198, 255, 0, alpha), width=1)

    for x, y in nodes:
        r = rng.uniform(1.4, 2.6)
        od.ellipse((x - r, y - r, x + r, y + r), fill=(198, 255, 0, 220))
        rh = r * 5
        od.ellipse((x - rh, y - rh, x + rh, y + rh), fill=(198, 255, 0, 16))

    overlay = overlay.filter(ImageFilter.GaussianBlur(0.4))
    img.alpha_composite(overlay)


def draw_corner_glow(img):
    """Soft lime glow bottom-left, cyan glow top-right."""
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    # bottom-left lime
    for r, a in [(520, 14), (380, 22), (240, 30), (140, 40)]:
        gd.ellipse((-r, H - r, r, H + r), fill=(198, 255, 0, a))
    # top-right cyan
    for r, a in [(460, 10), (320, 16), (200, 22)]:
        gd.ellipse((W - r, -r, W + r, r), fill=(0, 220, 255, a))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    img.alpha_composite(glow)


def text_w(draw, s, font):
    return draw.textlength(s, font=font)


def main():
    img = Image.new("RGBA", (W, H), BG + (255,))

    # background layers
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_grid(ImageDraw.Draw(grid))
    img.alpha_composite(grid)
    draw_corner_glow(img)
    draw_network(img)

    draw = ImageDraw.Draw(img)

    # outer frame hint
    draw.rectangle((24, 24, W - 25, H - 25), outline=(40, 40, 40), width=1)

    # fonts (Geist family — matches the website's --font-display / --font-mono)
    f_brand = load_font(GEIST_MONO_BOLD, 22)
    f_meta = load_font(GEIST_MONO_MED, 18)
    f_eyebrow = load_font(GEIST_MONO_MED, 18)
    f_h1 = load_font(GEIST_BOLD, 78)
    f_sub = load_font(GEIST_MED, 22)
    f_url = load_font(GEIST_MONO_MED, 18)

    PAD = 56

    # top-left: brand mark
    draw.rectangle((PAD, PAD, PAD + 14, PAD + 14), fill=LIME)
    draw_tracked(draw, (PAD + 26, PAD - 4),
                 "JTM CONSULTING / NYC", f_brand, INK, tracking_em=0.04)

    # top-right: status pill
    pill = "EST. 2018  ·  BROOKLYN, NY"
    pw = tracked_width(draw, pill, f_meta, tracking_em=0.05)
    draw_tracked(draw, (W - PAD - pw, PAD - 2), pill, f_meta, INK_DIM, tracking_em=0.05)

    # eyebrow (mono, lime)
    EY = "// ONE TEAM. ONE INVOICE."
    draw_tracked(draw, (PAD, 200), EY, f_eyebrow, LIME, tracking_em=0.05)

    # HEADLINE — all caps, Geist Bold
    line1 = "WE BUILD THE"
    line2 = "DIGITAL BACKBONE"
    line3 = "FOR NYC SMALL BUSINESS."
    y = 232
    draw.text((PAD, y), line1, font=f_h1, fill=INK)
    y += 86
    draw.text((PAD, y), line2, font=f_h1, fill=LIME)
    lw = text_w(draw, line2, f_h1)
    draw.rectangle((PAD, y + 92, PAD + lw, y + 95), fill=LIME)
    y += 86
    draw.text((PAD, y), line3, font=f_h1, fill=INK)

    # bottom-left: subline (caps, mono-tag style)
    SUB = "WEB · BRAND · SEO · IT · NETWORKS · CLOUD"
    draw_tracked(draw, (PAD, H - PAD - 24), SUB, f_sub, INK_DIM, tracking_em=0.06)

    # bottom-right: domain
    URL = "JTMCONSULTINGNYC.COM"
    uw = tracked_width(draw, URL, f_url, tracking_em=0.05)
    draw_tracked(draw, (W - PAD - uw, H - PAD - 22), URL, f_url, LIME, tracking_em=0.05)

    # save as JPG, iterate quality to stay < 300 KB
    rgb = img.convert("RGB")
    target_kb = 290
    for q in (92, 88, 84, 80, 76, 72, 68):
        rgb.save(OUT, "JPEG", quality=q, optimize=True, progressive=True)
        kb = OUT.stat().st_size / 1024
        print(f"quality={q}  size={kb:.1f} KB")
        if kb <= target_kb:
            break

    final_kb = OUT.stat().st_size / 1024
    print(f"\nWrote {OUT}  ({final_kb:.1f} KB, {W}x{H})")
    print("WhatsApp link-preview limit: ~300 KB JPG/PNG -> "
          + ("OK" if final_kb < 300 else "OVER"))


if __name__ == "__main__":
    main()
