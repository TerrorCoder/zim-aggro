import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');
const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

async function walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...(await walk(fullPath)));
      continue;
    }

    if (!SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    results.push(fullPath);
  }

  return results;
}

function bytesToMb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

async function optimizeImage(filePath) {
  const originalBuffer = await fs.readFile(filePath);
  const image = sharp(originalBuffer, { failOn: 'none' }).rotate();
  const metadata = await image.metadata();

  let optimizedBuffer;

  if (metadata.format === 'png') {
    optimizedBuffer = await image
      .png({
        palette: true,
        quality: 72,
        compressionLevel: 9,
        effort: 10,
      })
      .toBuffer();
  } else if (metadata.format === 'jpeg') {
    optimizedBuffer = await image
      .jpeg({
        quality: 72,
        mozjpeg: true,
        progressive: true,
      })
      .toBuffer();
  } else if (metadata.format === 'webp') {
    optimizedBuffer = await image
      .webp({
        quality: 72,
        effort: 6,
      })
      .toBuffer();
  } else {
    return { optimized: false, before: originalBuffer.length, after: originalBuffer.length };
  }

  const shouldWrite = optimizedBuffer.length < originalBuffer.length * 0.98;

  if (shouldWrite) {
    await fs.writeFile(filePath, optimizedBuffer);
    return { optimized: true, before: originalBuffer.length, after: optimizedBuffer.length };
  }

  return { optimized: false, before: originalBuffer.length, after: originalBuffer.length };
}

async function main() {
  try {
    const imageFiles = await walk(IMAGES_DIR);

    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }

    let beforeTotal = 0;
    let afterTotal = 0;
    let optimizedCount = 0;

    for (const filePath of imageFiles) {
      const result = await optimizeImage(filePath);
      beforeTotal += result.before;
      afterTotal += result.after;

      if (result.optimized) {
        optimizedCount += 1;
      }
    }

    const saved = beforeTotal - afterTotal;
    console.log(`Optimized ${optimizedCount}/${imageFiles.length} images.`);
    console.log(
      `Total size: ${bytesToMb(beforeTotal)} MB -> ${bytesToMb(afterTotal)} MB (saved ${bytesToMb(saved)} MB)`
    );
  } catch (error) {
    console.error('Image optimization failed:', error.message);
    process.exitCode = 1;
  }
}

main();
