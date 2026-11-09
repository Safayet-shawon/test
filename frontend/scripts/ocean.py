# Generates public/hero/ocean.webp and ocean-sm.webp: a flat, grainy illustration of a calm sea
# (white water, blue only in the shadow under each crest).
# Run from frontend/:  python3 scripts/ocean.py public/hero   (needs numpy and Pillow)
# Flat, grainy illustration of a calm sea: white water, rows of wave crests, blue only in the
# shadow under each crest; grain breaks up the shadow edges like a riso print.
import numpy as np
from PIL import Image
import sys, os
W, H = 1920, 1080
OUT = sys.argv[1] if len(sys.argv) > 1 else "."
rng = np.random.default_rng(26)
x = np.arange(W, dtype=np.float32)
paper = np.array([248, 248, 246], np.float32)
blue = np.array([58, 98, 196], np.float32)      # shadow ink
blue2 = np.array([138, 168, 224], np.float32)   # lighter ink for far rows
ink = np.zeros((H, W), np.float32)              # 0 = paper, 1 = full ink
tone = np.zeros((H, W), np.float32)             # 0 = far/light ink, 1 = near/deep ink
Y = np.arange(H, dtype=np.float32)[:, None]

# rows from the horizon (top) to the front (bottom), spacing grows toward the viewer
y = 0.10 * H
rows = []
while y < H + 40:
    t = y / H
    rows.append(y)
    y += 7 + 64 * t ** 1.5
for y0 in rows:
    t = min(1, y0 / H)
    amp = 1.5 + 13 * t ** 1.4               # crest height
    k1 = rng.uniform(0.010, 0.016) / (0.35 + t)  # wider waves near the front
    p1, p2, p3 = rng.uniform(0, 6.28, 3)
    crest = y0 + amp * (np.sin(x * k1 + p1) + 0.45 * np.sin(x * k1 * 2.3 + p2)) + 1.5 * np.sin(x * 0.07 + p3)
    # shadow thickness: crescents that swell and taper along the row
    thick = (2 + 22 * t ** 1.3) * np.clip(0.55 + 0.75 * np.sin(x * k1 * 1.7 + p2 + 1.3), 0, 1) ** 1.5
    d = (Y - crest[None, :]) / np.maximum(thick[None, :], 0.5)   # 0 at crest, 1 at shadow end
    band = np.clip(1 - d, 0, 1) * (d >= 0)
    band = band ** 0.6                                           # solid near the crest, fading down
    ink = np.maximum(ink, band)
    tone = np.where(band > 0, np.maximum(tone, t), tone)

# horizon haze: ink fades out toward the top
ink *= np.clip((Y / H - 0.08) / 0.25, 0, 1) ** 1.2
# grain: stochastic threshold so soft edges dissolve into dots
g = rng.random((H, W)).astype(np.float32)
dots = (ink > g * 0.95).astype(np.float32)
dots = np.maximum(dots, (ink > 0.85).astype(np.float32))         # solid cores
col = blue2[None, None] * (1 - tone[..., None]) + blue[None, None] * tone[..., None]
img = paper[None, None] * (1 - dots[..., None]) + col * dots[..., None]
# paper grain over everything
# (paper grain comes from the page itself, so the file stays small)
img = np.clip(img, 0, 255).astype(np.uint8)
im = Image.fromarray(img)
# few flat colours + lossless WebP: crisp dots, small file
im.quantize(6).convert("RGB").save(os.path.join(OUT, "ocean.webp"), "WEBP", lossless=True, method=6)
im.resize((1200, 675), Image.NEAREST).quantize(6).convert("RGB").save(os.path.join(OUT, "ocean-sm.webp"), "WEBP", lossless=True, method=6)
for f in ["ocean.webp", "ocean-sm.webp"]: print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, "KB")
