(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // Reference-inspired reveal sequence: each object enters when its scene approaches view.
  const revealTargets = $$('.archive-intro__headline, .achievement-card, .feature-spread__left, .feature-spread__right, .projects-heading__row, .project-row, .journey-heading > div, .timeline-item, .reflection-quote, .reflection-bottom__lead, .reflection-prompts, .closing-container h2');
  revealTargets.forEach((el, i) => {
    el.classList.add('motion-reveal');
    if (i % 4) el.dataset.motionDelay = String(i % 4);
  });
  if (reduce) revealTargets.forEach(el => el.classList.add('motion-in'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-in');
      observer.unobserve(entry.target);
    }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(el => observer.observe(el));
  }

  // Scroll-linked parallax: title and medal composition drift at different rates.
  const hero = $('.hero');
  const heroArt = $('.hero-art');
  const heroCopy = $('.hero-copy');
  const bottomCue = $('.hero-bottom');
  const timeline = $('.timeline-list');
  let queued = false;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const updateScrollMotion = () => {
    queued = false;
    const y = window.scrollY || 0;
    if (hero && heroArt) {
      const r = hero.getBoundingClientRect();
      const p = clamp((0 - r.top) / Math.max(1, r.height), 0, 1.2);
      heroArt.style.setProperty('--scroll-drift', (p * 58) + 'px');
      heroArt.style.opacity = String(clamp(1 - p * 1.7, .04, 1));
      if (heroCopy) {
        heroCopy.style.setProperty('--copy-drift', (p * -28) + 'px');
        heroCopy.style.transform = 'translate3d(0,' + (p * -28) + 'px,0)';
        heroCopy.style.opacity = String(clamp(1 - p * 1.5, .1, 1));
      }
      if (bottomCue) bottomCue.style.opacity = String(clamp(1 - p * 7, 0, 1));
    }
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const visible = clamp((window.innerHeight * .78 - r.top) / Math.max(1, r.height), 0, 1);
      timeline.style.setProperty('--timeline-progress', String(Math.max(.04, visible)));
    }
    const header = $('.site-header');
    if (header) header.classList.toggle('has-scrolled', y > 18);
  };
  const requestUpdate = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateScrollMotion);
    }
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  updateScrollMotion();

  // Pointer parallax on the decorative medal, disabled on touch and reduced-motion setups.
  if (!reduce && window.matchMedia('(pointer: fine)').matches && hero && heroArt) {
    let raf = 0, tx = 0, ty = 0;
    hero.addEventListener('pointermove', e => {
      const rect = hero.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - .5) * 18;
      ty = ((e.clientY - rect.top) / rect.height - .5) * 14;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        heroArt.style.setProperty('--hero-mx', tx + 'px');
        heroArt.style.setProperty('--hero-my', ty + 'px');
        raf = 0;
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      heroArt.style.setProperty('--hero-mx', '0px');
      heroArt.style.setProperty('--hero-my', '0px');
    }, { passive: true });
  }

  // Cursor-lit surfaces, using CSS custom properties and a single local handler per card.
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    $$('.achievement-card__visual').forEach(visual => {
      visual.addEventListener('pointermove', e => {
        const r = visual.getBoundingClientRect();
        visual.style.setProperty('--spot-x', (((e.clientX - r.left) / r.width) * 100) + '%');
        visual.style.setProperty('--spot-y', (((e.clientY - r.top) / r.height) * 100) + '%');
      }, { passive: true });
    });
  }

  // Mark current section for future palette transitions without forcing expensive repainting.
  if (!reduce) {
    const scenes = $$('.hero, .archive-section, .feature-spread, .projects-section, .journey-section, .reflection-section, .closing-section');
    const sceneObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('scene-in-view');
      else entry.target.classList.remove('scene-in-view');
    }), { threshold: .05, rootMargin: '-10% 0px -10% 0px' });
    scenes.forEach(scene => sceneObserver.observe(scene));
  }

  window.addEventListener('pageshow', requestUpdate);
})();