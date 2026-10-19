# Sambhav Tade — Engineering Portfolio

A project-led portfolio adapted from the MIT-licensed **Marginalia** React/Vite template. It keeps the editorial typography and restrained motion while making the projects and navigation easier to understand.

## Sections

- **Opening & about:** a concise introduction and direct path to the work.
- **Selected projects:** Offgrid and Unmix, with custom animated network/audio visuals, plain-language summaries, contributions, technology tags, and direct GitHub links.
- **Honours & milestones:** medal collection first, followed by SASMO, tennis, and hackathon milestones. The collection currently uses a placeholder until a real photograph is supplied.
- **Technical toolkit:** languages, frameworks, engineering concepts, and tools connected to projects.
- **About & contact:** a short introduction and direct profile/repository links.

## Project accuracy

- **Offgrid:** the current default transport supports a real TCP send/receive demo between two emulator instances. Nearby entries shown on a single emulator are simulated; real multi-hop relay and hardware mesh transport remain future work.
- **Unmix:** audio source-separation exploration using PCA whitening and symmetric FastICA. No broad real-world performance claim is made.

Illustrative project visuals are conceptual UI artwork, not live device telemetry or measured audio results. Achievement details are kept conservative where dates or event categories need confirmation.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
npm run build
```

Vite builds to `dist/` with the `/portfolio/` base path for GitHub Pages. The redesign is staged on `redesign/marginalia-folio`; merge the pull request only after a fresh build and desktop/mobile visual QA.
