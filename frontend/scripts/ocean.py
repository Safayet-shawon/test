# Generates public/hero/waves-day.webp (or waves-night.webp with "dark"): a soft pastel drawing of rows of waves, as if
# drawn with a stylus pastel brush: white water, blue pastel strokes in the shadow under each crest,
# uneven pressure, wobbly hand-drawn lines, and paper tooth showing through the pigment.
# Run from frontend/:  python3 scripts/ocean.py public/hero   (needs numpy and Pillow)
import sys, os
import numpy as np
from PIL import Image, ImageFilter

W, H = 1920, 1080
OUT = sys.argv[1] if len(sys.argv) > 1 else "."
DARK = len(sys.argv) > 2 and sys.argv[2] == "dark"   # python3 scripts/ocean.py public/hero dark
NAME = "waves-night.webp" if DARK else "waves-day.webp"
rng = np.random.default_rng(26)
X = np.arange(W, dtype=np.float32)[None, :]
Y = np.arange(H, dtype=np.float32)[:, None]

def smooth_noise(scale_x, scale_y, blur):
    a = rng.random((max(2, int(H / scale_y)), max(2, int(W / scale_x)))).astype(np.float32)
    im = Image.fromarray((a * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)
    if blur: im = im.filter(ImageFilter.GaussianBlur(blur))
    n = np.asarray(im, np.float32) / 255
    return (n - n.min()) / (n.max() - n.min() + 1e-6)

# paper tooth: fine bumpy grain; pastel only sticks to the high points
tooth = smooth_noise(2.2, 2.2, 0.7)
# brush texture: streaks running along the stroke direction (horizontal)
streak = smooth_noise(26, 1.6, 0.8)
# slow pressure changes across the drawing
press_map = smooth_noise(260, 120, 30)

def wobble(n, amp, step):
    v = np.cumsum(rng.normal(0, 1, n // step + 2))
    v = np.interp(np.arange(n) / step, np.arange(len(v)), v)
    v = v - np.convolve(v, np.ones(301) / 301, mode="same")
    return (v / (np.abs(v).max() + 1e-6) * amp).astype(np.float32)

ink = np.zeros((H, W), np.float32)
depthmap = np.zeros((H, W), np.float32)
x = np.arange(W, dtype=np.float32)
y = -20.0
while y < H + 40:
    t = 0.8 + 0.2 * rng.random()   # flat: every row drawn like the close-up rows
    amp = 7 + 4 * rng.random()
    k = rng.uniform(0.008, 0.013)
    p1, p2, p3 = rng.uniform(0, 6.28, 3)
    crest = y + amp * (np.sin(x * k + p1) + 0.45 * np.sin(x * k * 2.3 + p2))
    crest += wobble(W, 1.2 + 2.5 * t, 9)                       # hand-drawn wobble
    thick = (5 + 20 * t ** 1.3) * np.clip(0.62 + 0.6 * np.sin(x * k * 1.7 + p2 + 1.3), 0.12, 1) ** 1.2
    thick *= 0.8 + 0.4 * rng.random()
    # stroke pressure: rises in, swells, lifts off (ends of each crescent fade)
    pressure = np.clip(np.sin(x * k * 1.7 + p2 + 1.3) * 0.75 + 0.6, 0, 1) ** 0.7
    d = (Y - crest[None, :]) / np.maximum(thick[None, :], 0.6)
    body = np.clip(1 - d, 0, 1) * (d >= -0.15)
    body = body ** 0.75 * pressure[None, :]
    ink = 1 - (1 - ink) * (1 - body * 0.85)                    # layered strokes build up
    # a light pencil line along the crest, and a faint wash below the stroke
    line = np.exp(-((Y - crest[None, :]) / (0.8 + 1.2 * t)) ** 2) * (0.35 + 0.35 * t)
    wash = np.clip(1 - (d - 1) / 2.2, 0, 1) * (d >= 1) * 0.22 * pressure[None, :]
    ink = 1 - (1 - ink) * (1 - line) * (1 - wash)
    depthmap = np.where(body > 0.05, np.maximum(depthmap, t), depthmap)
    y += 44 + 6 * rng.random()

ink *= 0.7 + 0.5 * press_map                                   # uneven hand pressure
# pastel on paper: pigment catches the tooth, streaks follow the stroke
cover = ink * (0.55 + 0.45 * streak)
cover = np.clip((cover - (1 - tooth) * 0.55) / 0.45, 0, 1)
cover = np.asarray(Image.fromarray((cover * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6)), np.float32) / 255

if DARK:  # night: near-black paper, moonlit blue pastel, a hint of violet
    paper = np.array([13, 13, 17], np.float32)
    far = np.array([58, 72, 120], np.float32)
    near = np.array([112, 136, 206], np.float32)
    lav = np.array([120, 104, 196], np.float32)
else:     # day: white paper, soft cornflower pastel
    paper = np.array([250, 249, 246], np.float32)
    far = np.array([196, 210, 238], np.float32)    # pale powder blue
    near = np.array([124, 156, 222], np.float32)   # soft cornflower pastel
    lav = np.array([170, 160, 222], np.float32)    # a little lavender mixed in
mix = smooth_noise(180, 90, 20)[..., None]
col = far * (1 - depthmap[..., None]) + near * depthmap[..., None]
col = col * (1 - 0.25 * mix) + lav * (0.25 * mix)
img = paper * (1 - cover[..., None]) + col * cover[..., None]
img += (1 - tooth[..., None]) * (5 if DARK else -6)          # paper texture everywhere
im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
im.save(os.path.join(OUT, NAME), "WEBP", quality=60, method=6)

if OUT == ".":
    im.resize((960, 540), Image.LANCZOS).save("preview.png"); im.crop((480, 300, 1440, 780)).save("preview-crop.png")
for f in [NAME]:
    print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, "KB")
