# Beyond the Milestone — Achievement Portfolio

A cinematic + editorial portfolio draft for an English project. It includes an animated hero, an achievement archive, clickable achievement detail panels, selected work, a personal timeline and reflection prompts.

## Live site

Once the GitHub Pages workflow completes successfully:
https://masterdooom.github.io/portfolio/

## How publishing works

1. Push changes to `main`.
2. GitHub Actions assembles the static page from `index.html`, `preview.js`, and the stylesheet segments under `.site-source/`.
3. GitHub Actions publishes the site to GitHub Pages.

If deployment does not start, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Then open **Actions** and rerun “Deploy portfolio to GitHub Pages”.

## Editing the draft

- `index.html` — all page content and achievement artwork placeholders.
- `preview.css` is assembled during deployment from `.site-source/exact-css-01.part` through `exact-css-07.part`. Edit those CSS source segments, preserving their order.
- `preview.js` — filters, responsive navigation, scroll reveal/progress and achievement detail panels.
- `CONTENT-GUIDE.md` — evidence checklist and writing prompts.
- `DESIGN-NOTES.md` — design direction and animation principles.

The deployed version is deliberately static; you do not need Node.js or npm to view it. If developing locally, use a small static server or VS Code Live Server. All dates and descriptions are placeholders until they have been verified. Replace the illustrative artwork with real evidence and redact private information from email screenshots before submission.
