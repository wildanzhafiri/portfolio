#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const imageDirs = ['images'];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization to WebP...\n');
  let totalProcessed = 0;
  let totalSkipped = 0;

  for (const dir of imageDirs) {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`⏭️  Skipping ${dir} (not found)`);
      continue;
    }

    const files = fs.readdirSync(dirPath);
    // Scoped to Experience section images only ("dokum *.png") to avoid touching
    // images used elsewhere (e.g. profile.png) that aren't part of this task.
    const imageFiles = files.filter(f => /^dokum.*\.(png|jpg|jpeg)$/i.test(f));

    if (imageFiles.length === 0) {
      console.log(`⏭️  No images to optimize in ${dir}`);
      continue;
    }

    console.log(`📂 Processing ${dir}/ (${imageFiles.length} files):`);

    for (const file of imageFiles) {
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

      // Idempotent: skip if .webp already exists and is newer than source
      if (fs.existsSync(outputPath)) {
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        if (outputStats.mtimeMs >= inputStats.mtimeMs) {
          console.log(
            `  ⏭️  ${file.padEnd(35)} (WebP already up-to-date, skipping)`
          );
          totalSkipped++;
          continue;
        }
      }

      try {
        const inputStats = fs.statSync(inputPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        await sharp(inputPath)
          .webp({ quality: 82, alphaQuality: 100 })
          .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(2);
        const savedPercent = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

        console.log(
          `  ✅ ${file.padEnd(35)} ${inputSizeKB.padStart(8)}KB → ${outputSizeKB.padStart(8)}KB (${savedPercent}% saved)`
        );
        totalProcessed++;
      } catch (err) {
        console.error(`  ❌ ${file}: ${err.message}`);
      }
    }
    console.log();
  }

  console.log(`✨ Image optimization complete! (${totalProcessed} converted, ${totalSkipped} skipped)`);
}

optimizeImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
