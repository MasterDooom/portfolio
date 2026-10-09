# Beyond the Milestone — Achievement Portfolio

A cinematic + editorial portfolio draft for an English project. It includes an animated hero, an achievement archive, clickable achievement detail panels, selected work, a personal timeline and reflection prompts.

## Live site

After GitHub Pages is enabled and the Actions workflow succeeds:
https://masterdooom.github.io/portfolio/

## First-time publishing

The source and deployment workflow are already in this repository. GitHub Pages itself is not yet enabled, so the first workflow currently stops at **Configure Pages**.

1. Open [Repository Pages settings](https://github.com/MasterDooom/portfolio/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open [Actions](https://github.com/MasterDooom/portfolio/actions), select **Deploy portfolio to GitHub Pages**, and rerun the latest failed run. Future pushes to `main` deploy automatically.

## Editing the draft

- `index.html` — page content, achievement cards and illustrative artwork.
- `preview.css` — complete stylesheet; responsive layout, transitions and reveal animations.
- `preview.js` — category filters, responsive navigation, scroll progress/reveals, and achievement detail panels.
- `CONTENT-GUIDE.md` — evidence checklist and writing prompts.
- `DESIGN-NOTES.md` — design direction and animation principles.

This is a static site. Viewing it does not require Node.js or npm; use VS Code Live Server for convenient local editing. All dates and descriptions are placeholders until verified. Replace the illustrations with authentic photographs and supporting evidence, and redact private information from screenshots or documents before submission.
