# Page Topology — www.taobao.com `/`

Source: live HTML skeleton + `window.staticConfig` + desktop screenshot at 1440×2000.

## Scroll container
- Native document scroll. No Lenis / Locomotive (no `.lenis`).
- `body, html { overflow-x: hidden }` except `<1200px` where `overflow-x: scroll`.
- Content shell: `min-width: 1200px; max-width: 1760px; margin: 0 auto; padding: 0 48px` (80px ≥1415).

## Layers (top → bottom)
1. **SiteNav** — flow, 35px, `#f5f5f5`. Interaction: hover dropdowns.
2. **HeaderSearch** — flow. Logo 240px, search inset 272px, right promo 240px. Interaction: click tabs, type, image-search button.
3. **ChannelNav** — flow, 34px row. Interaction: hover (color `#ff5000`).
4. **HeroRow** — flex, 332px. Left CategoryPanel 256px, middle PromoBanner + TransformerBoard, right UserCenter 256px.
5. **PickFeeds** — masonry/grid of product cards. Interaction: hover lift/shadow; tab “猜你喜欢”.
6. **SeoFooter** — SEO inject block.
7. **ToolkitRail** — `position: fixed` right, 56px. Interaction: hover.
8. **LoginModal** — overlay, first visit. Interaction: click-driven dismiss / submit (demo).
9. **MoreDealsBar** — sticky/fixed bottom pill “更多低价商品”.

## Interaction model by section
| Section | Model |
|---|---|
| SiteNav | hover dropdown + click links |
| HeaderSearch | click tab + submit |
| ChannelNav | click / hover |
| CategoryPanel | hover flyout (not click tabs) |
| PromoBanner | time-driven carousel (~4s) + click arrows/dots |
| TransformerBoard | static cards, click through |
| UserCenter | click login (opens modal) |
| PickFeeds | click cards; hover shadow |
| ToolkitRail | hover + click |
| LoginModal | click-driven overlay |
| MoreDealsBar | click |

## Breakpoints
- `<1200`: horizontal scroll, keep 1200 layout (viewport meta `width=1200`).
- `1343–1414`: feed 16.66% (6 col).
- `≥1415`: shell padding 80px, feed 16.66%.
- Mobile 390: original site is PC-first (`viewport width=1200`); clone scales down with a compressed stack rather than a separate H5 app.
