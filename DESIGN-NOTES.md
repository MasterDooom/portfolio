# Design notes — Sambhav Tade Portfolio

## Direction

The design is a project-led engineering portfolio with the pacing of a small exhibition catalogue, rather than a generic developer résumé or a stack of cards. It uses Instrument Serif and Fraunces for expressive display type, Inter for body text, and Geist Mono for small folio metadata. The palette centres on aubergine ink, warm ivory, muted copper, and soft sage. Section backgrounds shift gently in tone instead of relying on an animated video or heavy WebGL scene.

## Existing foundation, adapted

- **Primary source:** [Marginalia](https://github.com/uxderrick/marginalia), an MIT-licensed React/Vite portfolio template. Its chapter headers, scroll index, Hero, About, Work, Writing, Stack, and footer components are reused and adapted. The original background-painting assets are intentionally not loaded; a lightweight CSS colour field is used instead.
- **Motion and scroll:** Framer Motion for component-level entrances and dialogs; Lenis for optional smooth scrolling. The app respects `prefers-reduced-motion`.
- **Project UX:** selected projects lead the page flow. Offgrid uses a peer-to-peer mesh visual; Unmix uses a waveform visual. Each row opens a case note with implementation context, evidence needed, and a repository link.
- **Achievement UX:** the achievement gallery filters by Academic, Sport, Innovation, and Collection. Each card opens a dossier that explicitly calls out evidence to add.
- **Content truth:** no exact event year, SASMO category, tennis tournament name, or hackathon name is invented. The design distinguishes the real claim from the evidence still needed.

## References used for direction and component research

- [Type Garden](https://type-garden.vercel.app/) — type experiments and expressive title composition.
- [Awesome Web Components](https://github.com/saadpasta/awesome-web-components) — component and interaction inspiration; not treated as a dependency.
- [Shutterkif OSS folio](https://github.com/shutterkif-oss/shutterkif-oss.github.io) — cinematic section pacing and strong title scale, visual reference only.
- [MotionFolio](https://github.com/zickrian/motionfolio) — compared as another MIT React/Vite/GSAP starter; not copied into this build.
- [Google Stitch](https://stitch.withgoogle.com/) and [Figma](https://www.figma.com/) — design-first iteration references for hierarchy, spacing, and responsive states.
- [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — observer-driven viewport behaviour.

The page is still a draft: add genuine achievement evidence, verify exact event details, and capture project screenshots or demos. Review desktop and mobile layouts before merging.
