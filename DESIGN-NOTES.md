# Design notes — The Work Speaks

## Art direction
- Editorial student portfolio: warm paper (#f7f0e8), deep plum (#251630), and merging coral, lilac, mint, and butter accents.
- Syne is used for oversized, decisive display typography; DM Serif Display Italic adds contrast; Manrope carries body copy; IBM Plex Mono is reserved for metadata; Caveat and a small Comic Sans note provide controlled hand-written/playful moments.
- Large type, generous space, restrained color fields, carefully framed achievements, and section-to-section contrast are the main visual devices.
- The hero, achievement spotlight, and section backgrounds use layered CSS gradients rather than WebGL or a continuous canvas renderer.

## Achievement experience
The four achievement entries form a scrollytelling sequence. A sticky spotlight shows an original typographic/vector composition while the story entry advances. IntersectionObserver switches the artwork when a chapter crosses the central focus band.

## Motion, accessibility, performance
- Observer-triggered reveals, headline clipping, a moving theme ribbon, subtle orbital shapes, and state changes on the spotlight and timeline.
- Scroll progress uses one requestAnimationFrame-coalesced scroll handler.
- Pointer-following details run only on fine pointers and are disabled when reduced motion is requested.
- No smooth-scroll hijacking; the site honours `prefers-reduced-motion` and leaves content readable without JavaScript.

## References consulted
- Shutterkif OSS reference: https://github.com/shutterkif-oss/shutterkif-oss.github.io
- MotionFolio open-source starter: https://github.com/zickrian/motionfolio
- Awwwards creative portfolio inspiration: https://www.awwwards.com/websites/single-page-1/
- MDN Intersection Observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- GSAP performance notes: https://github.com/sam-u-p/gsap-effects/blob/main/docs/performance.md

These references informed broad layout and interaction principles. The site uses its own HTML/CSS artwork and lightweight JavaScript rather than copying another portfolio's source or assets.
