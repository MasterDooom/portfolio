# Design notes — Personal Achievement Archive

## Art direction
- Monochrome 1990s interface language: near-black, graphite, chrome/silver, low-key phosphor accents.
- Archivo Black for titles, Space Grotesk for body text, IBM Plex Mono for small UI labels.
- Static scanlines and grid texture; hard rules, technical labels, oversized typography and original vector achievement art.
- No dependence on WebGL/Three.js or a custom rendering loop.

## Achievement experience
The four main achievements are a scrollytelling sequence. A large sticky spotlight shows an original typographic/vector composition while the text entry on the right advances. IntersectionObserver switches the spotlight when a chapter crosses the central focus band.

## Motion and performance
- One-time headline entrance and observer-triggered content reveals.
- CSS opacity/transform transitions, no large blur filters or layout-property animation.
- One requestAnimationFrame-coalesced scroll handler updates only the thin progress indicator.
- No smooth-scroll hijacking and no always-running parallax loop.
- Honour prefers-reduced-motion; content remains visible without JavaScript.

## References consulted
- Shutterkif OSS reference: https://github.com/shutterkif-oss/shutterkif-oss.github.io
- MotionFolio open-source starter: https://github.com/zickrian/motionfolio
- GSAP ScrollTrigger documentation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- MDN Intersection Observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- GSAP performance notes: https://github.com/sam-u-p/gsap-effects/blob/main/docs/performance.md

These references informed the broad visual direction and interaction/performance approach. This site uses its own HTML/CSS artwork and lightweight JavaScript, rather than copying another portfolio's source or assets.
