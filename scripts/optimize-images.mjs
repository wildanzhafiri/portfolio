#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// Directories (relative to public/) that are converted to WebP. Walked
// recursively, so nested folders like projects/<slug>/ are included.
const imageDirs = ['images', 'projects'];

const SOURCE_RE = /\.(png|jpg|jpeg)$/i;

/** Recursively collect every png/jpg/jpeg under a directory. */
function collectImages(dirPath) {
  const out = [];
  if (!fs.existsSync(dirPath)) return out;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectImages(full));
    } else if (SOURCE_RE.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function optimizeImages() {
  console.log('🖼️  Optimizing images to WebP...\n');
  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;

  for (const dir of imageDirs) {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`⏭️  Skipping ${dir}/ (not found)`);
      continue;
    }

    const sources = collectImages(dirPath);
    if (sources.length === 0) {
      // Nothing to do — either empty or already fully converted to WebP.
      continue;
    }

    console.log(`📂 ${dir}/ — ${sources.length} source image(s):`);

    for (const inputPath of sources) {
      const outputPath = inputPath.replace(SOURCE_RE, '.webp');
      const rel = path.relative(publicDir, inputPath);

      // Idempotent: if an up-to-date WebP already exists, drop the stale
      // original (so dist/ never ships both formats) and move on.
      if (fs.existsSync(outputPath)) {
        const inStat = fs.statSync(inputPath);
        const outStat = fs.statSync(outputPath);
        if (outStat.mtimeMs >= inStat.mtimeMs) {
          fs.rmSync(inputPath);
          console.log(`  ⏭️  ${rel} (WebP up-to-date, removed original)`);
          skipped++;
          continue;
        }
      }

      try {
        const inStat = fs.statSync(inputPath);
        await sharp(inputPath)
          .webp({ quality: 82, alphaQuality: 100 })
          .toFile(outputPath);
        const outStat = fs.statSync(outputPath);

        // Only remove the original once the WebP was written successfully.
        fs.rmSync(inputPath);

        const saved = inStat.size - outStat.size;
        savedBytes += saved;
        const pct = ((saved / inStat.size) * 100).toFixed(1);
        console.log(
          `  ✅ ${rel.padEnd(42)} ${(inStat.size / 1024).toFixed(0).padStart(6)}KB → ${(outStat.size / 1024).toFixed(0).padStart(5)}KB (${pct}% saved)`
        );
        converted++;
      } catch (err) {
        console.error(`  ❌ ${rel}: ${err.message}`);
      }
    }
    console.log();
  }

  console.log(
    `✨ Done — ${converted} converted, ${skipped} already up-to-date. Saved ${(savedBytes / 1048576).toFixed(1)} MB.`
  );
}

optimizeImages().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
