# Personal Achievement Archive

A 90s-inspired monochrome portfolio draft built around a cinematic opener and a scroll-led achievement spotlight. The four achievements each have their own large visual composition: SASMO 8th rank, district tennis trophy, hackathon selection, and the medal collection.

## Live site
https://masterdooom.github.io/portfolio/

## What makes this version different
- The achievement section is scrollytelling, not a grid of generic cards. The sticky spotlight changes as each entry crosses the viewport's focus zone.
- A black, graphite and silver palette with CRT scanlines, strict grid lines and oversized display type.
- Archivo Black headings, Space Grotesk body copy and IBM Plex Mono labels.
- Lightweight, observer-triggered reveals and a single requestAnimationFrame scroll-progress update. No Three.js, no canvas loop, no scroll-smoothing hijack.
- Respects `prefers-reduced-motion`; the page content remains readable even if JavaScript is unavailable.

## Files
- `index.html` — all content and the four achievement scenes.
- `preview.css` — theme, typography, responsive layouts and transitions.
- `preview.js` — active achievement spotlight, reveal observer, progress line and mobile menu.
- `CONTENT-GUIDE.md` — content/evidence checklist.
- `DESIGN-NOTES.md` — original design notes.

## Personalise before submission
Replace the illustrative graphics with photographs of your real medals and tennis trophy, and a redacted screenshot of the actual hackathon selection email. Add the SASMO certificate, exact competition year/category and hackathon name once verified. Add real project names and dated timeline entries. Never publish unredacted email addresses, phone numbers or private message content.

## Deploy
Push changes to `main`; GitHub Actions publishes `index.html`, `preview.css` and `preview.js` through GitHub Pages.
