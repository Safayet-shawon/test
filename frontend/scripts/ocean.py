# Generates public/hero/ocean.webp and ocean-sm.webp (white sea, blue wave shadows).
# Run from frontend/:  python3 scripts/ocean.py   (needs numpy and Pillow)
import numpy as np
from PIL import Image, ImageFilter
W, H = 2400, 1350
rng = np.random.default_rng(7)
y, x = np.mgrid[0:H, 0:W].astype(np.float32)
# perspective: waves get smaller and flatter toward the top (horizon)
depth = 0.35 + 0.65 * (y / H)            # 0.35 far .. 1 near
yy = (y / H) ** 1.6 * H                  # compress rows near the top
h = np.zeros((H, W), np.float32)
for i in range(26):
    ang = rng.normal(0, 0.45)            # mostly travelling toward the viewer
    k = rng.uniform(0.018, 0.075)        # wave number
    amp = 1.0 / (k * 60) ** 1.3
    ph = rng.uniform(0, 2 * np.pi)
    dx, dy = np.sin(ang), np.cos(ang)
    t = (x * dx * depth + yy * dy * 2.2) * k + ph
    # sharper crests, flat troughs (trochoid-like)
    h += amp * (1 - np.abs(np.sin(t / 2))) ** 1.6
# fine ripples
small = rng.random((H // 6, W // 6)).astype(np.float32)
small = np.asarray(Image.fromarray((small * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(3)), np.float32) / 255
h += 0.06 * small
# lighting: sun from the upper right, low; shading = slope facing away
gy, gx = np.gradient(h)
nx, ny, nz = -gx * 9 * depth, -gy * 9 * depth, np.ones_like(h)
n = np.sqrt(nx ** 2 + ny ** 2 + nz ** 2); nx, ny, nz = nx / n, ny / n, nz / n
L = np.array([0.35, -0.55, 0.76]); L /= np.linalg.norm(L)
lit = np.clip(nx * L[0] + ny * L[1] + nz * L[2], 0, 1)
shade = np.clip((0.86 - lit) / 0.40, 0, 1) ** 1.6      # 0 = white, 1 = deepest blue
shade *= 0.55 + 0.45 * depth                            # far waves softer
white = np.array([250, 251, 253], np.float32)
blue = np.array([78, 124, 206], np.float32)             # ocean shadow
img = white * (1 - shade[..., None] * 0.72) + blue * (shade[..., None] * 0.72)
# haze toward the horizon
haze = np.clip(1 - y / (H * 0.35), 0, 1)[..., None] ** 2
img = img * (1 - haze * 0.75) + white * (haze * 0.75)
im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.1))

im.resize((1920, 1080), Image.LANCZOS).save('public/hero/ocean.webp', 'WEBP', quality=66, method=6)
im.resize((960, 540), Image.LANCZOS).save('public/hero/ocean-sm.webp', 'WEBP', quality=64, method=6)

import os
for f in ['ocean.webp', 'ocean-sm.webp']: print(f, os.path.getsize('public/hero/' + f) // 1024, 'KB')
