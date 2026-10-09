# Design notes — Beyond the Milestone

## Concept
A cinematic personal archive with a dark opening and closing, a warm cream editorial achievement archive, selected work, a timeline, and reflection prompts.

## Motion direction
- Short staggered hero entrance.
- Intersection-observer section reveals.
- Scroll progress indicator.
- Restrained decorative orbits and ticker movement.
- Achievement-card hover details and click-to-open dossiers.
- Native anchor navigation and smooth scrolling.
- Respect `prefers-reduced-motion`; avoid WebGL and heavy perpetual effects.

## Palette
- Near black: #0B0D0F
- Warm cream: #F0E8DC
- Soft white: #F5F0E8
- Burnt orange: #D98C56
- Muted green/ink accents for achievement artwork.

## Deployment
This repository's published version is a static HTML/CSS/JS site to avoid a build step. GitHub Pages publishes the repository root through the included Actions workflow. Once the site is customised, keep evidence authentic and check all details before submitting.
