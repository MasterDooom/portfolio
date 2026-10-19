# Sambhav Tade — Portfolio

A project-led engineering portfolio adapted from the MIT-licensed **Marginalia** React/Vite folio template. It keeps the template's chapter-based layout, editorial typography, scroll motion, and reusable section components while making the content specific to real projects, evidence, and milestones.

## Preview branch

The redesign is being staged on `redesign/marginalia-folio`. The existing live `main` site has not been replaced yet.

## What the folio contains

- **Opening:** serif display typography, layered atmospheric colour, and a clear navigation index.
- **Honours:** a filterable achievement gallery with detail dossiers for SASMO eighth place, a district tennis trophy, a hackathon selection notice, and the medal collection.
- **Selected projects:** Offgrid (offline Android communication) and Unmix (audio source separation), with implementation status and evidence stated honestly.
- **The process:** a short evidence → effort → learning → next-step framework.
- **Field notes:** reflection prompts that help turn a list of awards into an English portfolio.
- **Closing chapter:** a clear end to the story without a fake contact form.

The achievement artwork is illustrative only. Before submission, replace it with genuine photographs or documents where appropriate. No event year, category, or result beyond the known facts is invented.

## Edit the content

- `src/marginalia/config.jsx` — identity, headings, section copy, and navigation.
- `src/marginalia/data/works.js` — achievement records, categories, dossier details, and evidence checklist.
- `src/marginalia/data/writings.js` — selected projects.
- `src/marginalia/data/stack.js` — the process/reflection framework.
- `src/marginalia/folio-overrides.css` — the folio theme and responsive visual tuning.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
npm run build
```

Vite builds to `dist/` with the `/portfolio/` base path for GitHub Pages. The branch has a build-validation workflow; the Pages deployment workflow publishes the build only when changes land on `main`.

## Attribution

Adapted from [Marginalia](https://github.com/uxderrick/marginalia) by Derrick Tsorme under the MIT License; the original license is preserved in `LICENSE`. The component structure and motion patterns are reused and adapted, not presented as an original-from-zero implementation.
