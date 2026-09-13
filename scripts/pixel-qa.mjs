#!/usr/bin/env node

/**
 * Scored Pixel-Diff QA for Website Clones
 * 
 * Compares original site screenshots vs. local build using Playwright + pixelmatch
 * Supports multi-viewport testing with section-based scoring
 * Inspired by Mahanaicoach/ai-site-cloner pixel QA approach
 */

import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 }
};

const PASS_THRESHOLD = 0.95; // 95% similarity required
const DIFF_THRESHOLD = 0.1;  // pixelmatch threshold (0-1)

/**
 * Configuration for the QA run
 * Override via environment variables or config file
 */
const CONFIG = {
  originalUrl: process.env.ORIGINAL_URL || '',
  localUrl: process.env.LOCAL_URL || 'http://localhost:3000',
  outputDir: './docs/qa/pixel-diff',
  screenshotDir: './docs/design-references',
  sections: [] // Define sections as { name, selector, viewport } if needed
};

async function captureScreenshot(page, viewport, url) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Wait for animations to settle
  await page.waitForTimeout(1000);
  
  return await page.screenshot({ fullPage: true });
}

function compareImages(img1Buffer, img2Buffer) {
  const img1 = PNG.sync.read(img1Buffer);
  const img2 = PNG.sync.read(img2Buffer);
  
  const { width, height } = img1;
  
  // Ensure images are same dimensions
  if (width !== img2.width || height !== img2.height) {
    throw new Error(`Image dimensions don't match: ${width}x${height} vs ${img2.width}x${img2.height}`);
  }
  
  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: DIFF_THRESHOLD }
  );
  
  const totalPixels = width * height;
  const similarity = 1 - (numDiffPixels / totalPixels);
  
  return { similarity, diff: PNG.sync.write(diff), numDiffPixels, totalPixels };
}

function compareSectionImages(img1Buffer, img2Buffer, sectionBox) {
  const img1 = PNG.sync.read(img1Buffer);
  const img2 = PNG.sync.read(img2Buffer);
  
  const { x, y, width, height } = sectionBox;
  
  // Validate section bounds
  if (x + width > img1.width || y + height > img1.height) {
    throw new Error(`Section bounds exceed image dimensions`);
  }
  
  const sectionDiff = new PNG({ width, height });
  let numDiffPixels = 0;
  
  // Compare only the section region
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = ((y + row) * img1.width + (x + col)) << 2;
      const sectionIdx = (row * width + col) << 2;
      
      const r1 = img1.data[idx];
      const g1 = img1.data[idx + 1];
      const b1 = img1.data[idx + 2];
      const a1 = img1.data[idx + 3];
      
      const r2 = img2.data[idx];
      const g2 = img2.data[idx + 1];
      const b2 = img2.data[idx + 2];
      const a2 = img2.data[idx + 3];
      
      const delta = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(a1 - a2);
      const isDiff = delta > DIFF_THRESHOLD * 255 * 4;
      
      if (isDiff) numDiffPixels++;
      
      // Write diff visualization
      sectionDiff.data[sectionIdx] = isDiff ? 255 : r1;
      sectionDiff.data[sectionIdx + 1] = isDiff ? 0 : g1;
      sectionDiff.data[sectionIdx + 2] = isDiff ? 0 : b1;
      sectionDiff.data[sectionIdx + 3] = 255;
    }
  }
  
  const totalPixels = width * height;
  const similarity = 1 - (numDiffPixels / totalPixels);
  
  return { similarity, diff: PNG.sync.write(sectionDiff), numDiffPixels, totalPixels };
}

async function runQA() {
  console.log('🔍 Starting Pixel QA...\n');
  
  if (!CONFIG.originalUrl) {
    console.error('❌ Error: ORIGINAL_URL not configured');
    console.log('   Set via environment: ORIGINAL_URL=https://example.com npm run qa:pixel');
    process.exit(1);
  }
  
  // Ensure output directories exist
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = {
    timestamp: new Date().toISOString(),
    originalUrl: CONFIG.originalUrl,
    localUrl: CONFIG.localUrl,
    passThreshold: PASS_THRESHOLD,
    viewports: [],
    overallPass: true
  };
  
  try {
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      console.log(`📱 Testing ${viewportName} (${viewport.width}x${viewport.height})`);
      
      // Capture screenshots
      const originalBuffer = await captureScreenshot(page, viewport, CONFIG.originalUrl);
      const localBuffer = await captureScreenshot(page, viewport, CONFIG.localUrl);
      
      // Save screenshots
      const originalPath = join(CONFIG.outputDir, `${viewportName}-original.png`);
      const localPath = join(CONFIG.outputDir, `${viewportName}-local.png`);
      writeFileSync(originalPath, originalBuffer);
      writeFileSync(localPath, localBuffer);
      
      // Compare full page
      const comparison = compareImages(originalBuffer, localBuffer);
      const passed = comparison.similarity >= PASS_THRESHOLD;
      
      if (!passed) results.overallPass = false;
      
      // Save diff image
      const diffPath = join(CONFIG.outputDir, `${viewportName}-diff.png`);
      writeFileSync(diffPath, comparison.diff);
      
      const viewportResult = {
        name: viewportName,
        viewport,
        similarity: comparison.similarity,
        passed,
        numDiffPixels: comparison.numDiffPixels,
        totalPixels: comparison.totalPixels,
        diffPath
      };
      
      results.viewports.push(viewportResult);
      
      const icon = passed ? '✅' : '❌';
      console.log(`   ${icon} Similarity: ${(comparison.similarity * 100).toFixed(2)}% ${passed ? '(PASS)' : '(FAIL)'}`);
      console.log(`   📊 Diff pixels: ${comparison.numDiffPixels.toLocaleString()} / ${comparison.totalPixels.toLocaleString()}`);
      console.log('');
    }
  } finally {
    await browser.close();
  }
  
  // Save results JSON
  const resultsPath = join(CONFIG.outputDir, 'results.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Print summary
  console.log('═══════════════════════════════════════');
  console.log('📊 QA Summary');
  console.log('═══════════════════════════════════════');
  console.log(`Original: ${CONFIG.originalUrl}`);
  console.log(`Local: ${CONFIG.localUrl}`);
  console.log(`Threshold: ${PASS_THRESHOLD * 100}%`);
  console.log('');
  
  for (const result of results.viewports) {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.name}: ${(result.similarity * 100).toFixed(2)}%`);
  }
  
  console.log('');
  console.log(`Results saved to: ${resultsPath}`);
  console.log(`Diff images saved to: ${CONFIG.outputDir}`);
  console.log('');
  
  if (results.overallPass) {
    console.log('✅ All viewports PASSED');
    process.exit(0);
  } else {
    console.log('❌ Some viewports FAILED');
    console.log('   Review diff images and fix discrepancies before merging');
    process.exit(1);
  }
}

runQA().catch(error => {
  console.error('❌ QA failed with error:', error);
  process.exit(1);
});
