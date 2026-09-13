# Pixel QA Guide

## Overview

This project includes a scored pixel-diff QA system to ensure website clones achieve pixel-perfect accuracy. The QA script compares the original site against your local build across multiple viewports and generates similarity scores.

## How It Works

1. **Multi-Viewport Testing**: Captures screenshots at desktop (1440px), tablet (768px), and mobile (390px)
2. **Pixel Comparison**: Uses pixelmatch to compare original vs. clone pixel-by-pixel
3. **Similarity Scoring**: Calculates similarity percentage for each viewport
4. **Pass/Fail Gate**: Requires ≥95% similarity across all viewports to pass
5. **Visual Artifacts**: Saves diff images highlighting discrepancies

## Running Pixel QA

### Prerequisites

```bash
npm install
```

The required dependencies (`@playwright/test`, `pixelmatch`, `pngjs`) are included in `package.json`.

### Run QA Manually

1. Start your local development server:
```bash
npm run dev
```

2. Run the QA script in another terminal:
```bash
ORIGINAL_URL=https://example.com npm run qa:pixel
```

Or set environment variables:
```bash
export ORIGINAL_URL=https://example.com
export LOCAL_URL=http://localhost:3000
npm run qa:pixel
```

### Automatic QA in Clone Workflow

The `/clone-website` skill can automatically run pixel QA after building. See `AGENTS.md` for details.

## Interpreting Results

### Console Output

```
🔍 Starting Pixel QA...

📱 Testing desktop (1440x900)
   ✅ Similarity: 97.23% (PASS)
   📊 Diff pixels: 35,892 / 1,296,000

📱 Testing tablet (768x1024)
   ❌ Similarity: 92.41% (FAIL)
   📊 Diff pixels: 59,635 / 786,432

═══════════════════════════════════════
📊 QA Summary
═══════════════════════════════════════
Original: https://example.com
Local: http://localhost:3000
Threshold: 95%

✅ desktop: 97.23%
❌ tablet: 92.41%

❌ Some viewports FAILED
   Review diff images and fix discrepancies before merging
```

### Generated Artifacts

All artifacts are saved to `docs/qa/pixel-diff/`:

- `{viewport}-original.png` — Screenshot from original site
- `{viewport}-local.png` — Screenshot from your local build
- `{viewport}-diff.png` — **Visual diff highlighting differences in red**
- `results.json` — Complete test results with metadata

### Reading Diff Images

- **Red pixels** = differences detected
- **Grayscale pixels** = matches original
- Review diff images to identify problem areas (wrong colors, spacing, missing elements)

## Common Failure Patterns

### Fonts Not Loading
- **Symptom**: Text renders in fallback font, high diff score
- **Fix**: Ensure Google Fonts or self-hosted fonts are properly configured in `layout.tsx`

### Images Missing
- **Symptom**: White/empty boxes where images should be, very high diff score
- **Fix**: Run the asset download script, verify images in `public/` directory

### Spacing/Layout Differences
- **Symptom**: Elements shifted, moderate diff score
- **Fix**: Re-extract CSS values from `getComputedStyle()`, don't approximate

### Hover/Animation States
- **Symptom**: Screenshot timing catches mid-transition
- **Fix**: QA script waits 1s after page load; adjust if site has slow animations

### Dark Mode / Theming
- **Symptom**: Color palette completely different
- **Fix**: Ensure you're extracting from the same theme mode on both sites

## Configuration

### Customize Pass Threshold

Edit `scripts/pixel-qa.mjs`:

```javascript
const PASS_THRESHOLD = 0.95; // Change to 0.93 for 93%, etc.
```

### Test Specific Sections

For advanced usage, define sections in the config:

```javascript
const CONFIG = {
  // ...
  sections: [
    { name: 'hero', selector: '.hero-section', viewport: 'desktop' },
    { name: 'features', selector: '.features', viewport: 'mobile' }
  ]
};
```

Then modify `runQA()` to use `compareSectionImages()` for per-section scoring.

### Custom Viewports

Edit the `VIEWPORTS` object:

```javascript
const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },  // 1080p
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
  mobile_xs: { width: 320, height: 568 }   // iPhone SE
};
```

## Integration with CI/CD

To run pixel QA in GitHub Actions or other CI:

```yaml
- name: Start dev server
  run: npm run dev &
  
- name: Wait for server
  run: npx wait-on http://localhost:3000
  
- name: Run pixel QA
  env:
    ORIGINAL_URL: https://example.com
  run: npm run qa:pixel
  
- name: Upload diff artifacts
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: pixel-diff-results
    path: docs/qa/pixel-diff/
```

## Philosophy

Pixel QA is the **final gate** before considering a clone complete. A 95% threshold is strict but achievable:

- ≥97% = excellent, near-perfect match
- 95-97% = good, minor differences only
- 90-95% = needs work, noticeable differences
- <90% = significant issues, major refactor needed

The goal is **pixel-perfect emulation**, not "close enough." Use the diff images to systematically eliminate discrepancies.

## Dembrandt Integration

When using Dembrandt for design token extraction:

1. Dembrandt provides accurate global tokens (colors, typography, spacing)
2. Use those tokens as the foundation for your Tailwind config
3. Browser automation still required for behavior and per-component styles
4. Pixel QA validates the final result matches the original

This workflow (Dembrandt → browser automation → build → pixel QA) ensures both token accuracy and visual fidelity.

## Troubleshooting

### "Image dimensions don't match"
- Original and local have different viewport heights (usually dynamic content)
- Solution: Use `fullPage: false` and fixed height screenshots, or accept height variance

### "ORIGINAL_URL not configured"
- You forgot to set the environment variable
- Solution: `ORIGINAL_URL=https://example.com npm run qa:pixel`

### Playwright install errors
- Missing browser binaries
- Solution: `npx playwright install chromium`

### "Connection refused" to localhost
- Dev server not running
- Solution: `npm run dev` in another terminal first

### High diff score despite visual match
- Anti-aliasing differences across environments
- Solution: Adjust `DIFF_THRESHOLD` slightly (e.g., 0.15) or review pixel-level rendering

## References

- Inspired by [Mahanaicoach/ai-site-cloner](https://github.com/Mahanaicoach/ai-site-cloner) pixel QA approach
- [pixelmatch](https://github.com/mapbox/pixelmatch) — Fast pixel-level image comparison
- [Playwright](https://playwright.dev/) — Browser automation for screenshots
