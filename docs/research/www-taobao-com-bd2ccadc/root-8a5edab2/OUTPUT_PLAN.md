# Output Plan — taobao.com homepage

## Target
- **URL:** https://www.taobao.com/
- **Normalized origin:** `https://www.taobao.com`
- **Normalized pathname:** `/`
- **app-root:** `.` (repository root)
- **site-key:** `www-taobao-com-bd2ccadc`
- **page-key:** `root-8a5edab2`
- **Destination route:** `/` (untouched template scaffold at `src/app/page.tsx`)

## Artifact roots
- Research: `docs/research/www-taobao-com-bd2ccadc/root-8a5edab2/`
- Screenshots: `docs/design-references/www-taobao-com-bd2ccadc/root-8a5edab2/`
- Components: `src/components/sites/www-taobao-com-bd2ccadc/root-8a5edab2/`
- Shared icons: `src/components/sites/www-taobao-com-bd2ccadc/shared/`
- Assets: `public/sites/www-taobao-com-bd2ccadc/root-8a5edab2/`
- Downloader: `scripts/download-assets-www-taobao-com-bd2ccadc-root-8a5edab2.mjs`

## Shared foundation changes
- `src/app/layout.tsx` — zh-CN, Noto Sans SC + existing Geist fallback
- `src/app/globals.css` — scoped `.tb-home` tokens, do not remove scaffold tokens
- `src/app/page.tsx` — replace unused clone scaffold

## Existing routes
- Only scaffold `src/app/page.tsx` exists. No cloned/user-authored routes to preserve.

## Collisions
- None. First clone in untouched template.
