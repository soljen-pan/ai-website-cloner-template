# Behaviors — www.taobao.com `/`

Captured 2026-09-13 via Chrome headless + `staticConfig` + pegasus CSS.

## Scroll sweep
- Header does **not** shrink in the captured first screen. CSS defines `.wrap-fixed` after scroll: header becomes `position:fixed; top:0; z-index:1001; padding 7px 0; search compact`. Trigger: page scroll past the header block (~99px padding-top on wrap).
- No scroll-snap.
- No Lenis.
- Feed is a normal flow grid; more cards load via infinite scroll on the live site (out of scope — mock first page).

## Click sweep
- Search type chip `宝贝` is the default tab.
- Channel links navigate off-site (天猫 / 直播 / 企业购 / 司法拍卖 / 天猫超市 / 闲鱼 / 天猫国际).
- Category row hover reveals a white flyout with 2px `#ff5000` border, `left: 248px`.
- Banner auto-rotates; dots/arrows switch slides.
- Unauthenticated visit shows a centered login card over a dimmed homepage.
- Close (X) dismisses the modal; background stays interactive after dismiss.

## Hover sweep
- Links → `color: #ff5000`.
- Category row → `background: #fff`.
- Channel item → `background: rgba(0,0,0,.03)`.
- Feed card (not-login) → `border-radius: 20px; box-shadow: 0 12px 36px 0 rgba(31,31,51,.12)`.
- Search button stays `#ff5000`.

## Time-driven
- Banner carousel interval ~4000ms, fade/slide.
- Live channel icon is an animated GIF.

## Responsive
- Desktop 1440: 5-up feed (20% until 1343, then 6-up).
- Tablet 768 / Mobile 390: live site is still the 1200px PC page (meta viewport width=1200). Clone keeps the PC composition and allows horizontal overflow, matching the source.
