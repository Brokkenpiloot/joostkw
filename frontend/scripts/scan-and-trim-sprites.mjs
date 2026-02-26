import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const spritesDir = path.resolve(__dirname, "..", "public", "Sprites");

function resolveTargetPath(rawInput) {
  const candidate = rawInput.trim();
  if (!candidate) return null;
  const absolute = path.isAbsolute(candidate)
    ? candidate
    : path.resolve(process.cwd(), candidate);
  return absolute;
}

async function scanAndTrim(filePath) {
  const image = sharp(filePath);
  const meta = await image.metadata();
  if (!meta.width || !meta.height) {
    return { filePath, skipped: true, reason: "missing dimensions" };
  }

  const trimmed = image.clone().trim();
  const trimMeta = await trimmed.metadata();

  if (!trimMeta.width || !trimMeta.height) {
    return { filePath, skipped: true, reason: "trim metadata missing" };
  }

  const left = trimMeta.trimOffsetLeft ?? 0;
  const top = trimMeta.trimOffsetTop ?? 0;
  const right = meta.width - left - trimMeta.width;
  const bottom = meta.height - top - trimMeta.height;
  const hasPadding = top > 0 || right > 0 || bottom > 0 || left > 0;

  return {
    filePath,
    original: { width: meta.width, height: meta.height },
    trimmed: { width: trimMeta.width, height: trimMeta.height },
    padding: { top, right, bottom, left },
    hasPadding,
    trimmedImage: trimmed,
  };
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.log("Usage: node scripts/scan-and-trim-sprites.mjs <path-to-sprite.png>");
    return;
  }

  const filePath = resolveTargetPath(inputPath);
  if (!filePath) {
    console.log("Invalid sprite path.");
    return;
  }

  try {
    await fs.access(filePath);
  } catch {
    console.log("Sprite file not found:", filePath);
    return;
  }

  if (!filePath.toLowerCase().endsWith(".png")) {
    console.log("Only .png files are supported.");
    return;
  }

  if (!filePath.includes(spritesDir)) {
    console.log("Sprite is outside public/Sprites; proceed with caution:", filePath);
  }

  const results = [await scanAndTrim(filePath)];

  for (const result of results) {
    if (result.skipped) {
      console.log(`SKIP ${path.basename(result.filePath)} (${result.reason})`);
      continue;
    }
    const { padding, hasPadding, original, trimmed } = result;
    console.log(
      `${path.basename(result.filePath)}: ${original.width}x${original.height} -> ${trimmed.width}x${trimmed.height} | padding t:${padding.top} r:${padding.right} b:${padding.bottom} l:${padding.left} ${hasPadding ? "[trim]" : "[ok]"}`,
    );
  }

  for (const result of results) {
    if (!result.hasPadding || result.skipped) continue;
    await result.trimmedImage.toFile(result.filePath);
  }
}

await main();
