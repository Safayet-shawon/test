// Regenerates data/shotSizes.js from the images in public/projects (reads WebP/PNG/JPEG headers).
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "projects");
function size(buf) {
  if (buf.toString("ascii", 0, 4) === "RIFF") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
    if (kind === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (kind === "VP8L") {
      const b = buf.readUInt32LE(21);
      return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
    }
  }
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xc3) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}
const rows = fs
  .readdirSync(dir)
  .filter((f) => /\.(webp|png|jpe?g)$/i.test(f))
  .sort()
  .map((f) => [f, size(fs.readFileSync(path.join(dir, f)))])
  .filter(([, s]) => s)
  .map(([f, [w, h]]) => `  "/projects/${f}": [${w}, ${h}],`);
fs.writeFileSync(
  path.join(process.cwd(), "data", "shotSizes.js"),
  `// Width and height of every screenshot in /public/projects (used by next/image).\n// After adding or replacing a screenshot, run:  npm run shots\nexport const SHOT_SIZES = {\n${rows.join("\n")}\n};\n`
);
console.log(`wrote ${rows.length} sizes`);
