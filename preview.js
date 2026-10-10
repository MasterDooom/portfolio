(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Scroll progress is updated once per frame and never forces a layout read in a loop.
  const progress = $('#scrollProgress');
  let progressQueued = false;
  const updateProgress = () => {
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const amount = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.transform = 'scaleX(' + amount + ')';
    }
    progressQueued = false;
  };
  const queueProgress = () => {
    if (progressQueued) return;
    progressQueued = true;
    requestAnimationFrame(updateProgress);
  };
  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress, { passive: true });
  updateProgress();

  // Accessible compact navigation.
  const menuButton = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('is-open');
  };
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      mobileNav.classList.toggle('is-open', opening);
    });
    $$('#mobileNav a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  // Reveal content once as it enters the reading area. Content remains readable without JS.
  const revealItems = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && revealItems.length) {
    document.documentElement.classList.add('motion-enabled');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });
    revealItems.forEach((el, index) => {
      el.style.transitionDelay = (Math.min(index % 3, 2) * 65) + 'ms';
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  // Achievement scrollytelling: one sticky frame, one focused record at a time.
  const spotlight = $('#spotlight');
  const steps = $$('.achievement-step');
  const artPanels = $$('.spotlight-art');
  const indexLabel = $('#spotlightIndex');
  const sectionLabel = $('#spotlightLabel');
  const labels = {
    sasmo: 'ACADEMIC / SASMO',
    tennis: 'SPORT / DISTRICT TENNIS',
    hackathon: 'INNOVATION / HACKATHON',
    medals: 'COLLECTION / RECOGNITIONS'
  };
  const setActiveStep = step => {
    if (!step || !spotlight) return;
    const key = step.dataset.achievement;
    if (!key || spotlight.dataset.active === key) return;
    spotlight.dataset.active = key;
    steps.forEach(item => {
      const active = item === step;
      item.classList.toggle('is-current', active);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    artPanels.forEach(panel => {
      const active = panel.dataset.art === key;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });
    if (indexLabel) indexLabel.textContent = (step.dataset.index || '01') + ' / 04';
    if (sectionLabel) sectionLabel.textContent = labels[key] || 'ACHIEVEMENT / ARCHIVE';
  };
  if ('IntersectionObserver' in window && steps.length) {
    const stepObserver = new IntersectionObserver(entries => {
      const candidates = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) =>
          Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2) -
          Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2));
      if (candidates[0]) setActiveStep(candidates[0].target);
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    steps.forEach(step => stepObserver.observe(step));
  }

  // Current section navigation state is observer-driven rather than recalculated on scroll.
  const navLinks = $$('.nav a');
  const sections = ['achievements', 'work', 'timeline', 'reflections'].map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => navObserver.observe(section));
  }

  // Timeline entries pick up emphasis as they cross the centre of the viewport.
  const timelineEntries = $$('.timeline-entry');
  if ('IntersectionObserver' in window && timelineEntries.length) {
    const timelineObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) timelineEntries.forEach(item => item.classList.toggle('is-active', item === entry.target));
      });
    }, { rootMargin: '-38% 0px -46% 0px', threshold: 0 });
    timelineEntries.forEach(entry => timelineObserver.observe(entry));
  }

  // Pointer details are restricted to fine pointers; mobile gets no fake hover interactions.
  if (!reduceMotion && finePointer) {
    const hero = $('.hero');
    const heroVisual = $('.hero-visual');
    const cta = $('.hero-cta');
    if (hero) {
      hero.addEventListener('pointermove', event => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / Math.max(1, rect.width) * 2 - 1;
        const y = (event.clientY - rect.top) / Math.max(1, rect.height) * 2 - 1;
        if (heroVisual) {
          heroVisual.style.setProperty('--pointer-x', (x * -8).toFixed(1) + 'px');
          heroVisual.style.setProperty('--pointer-y', (y * -7).toFixed(1) + 'px');
        }
        if (cta) {
          const cr = cta.getBoundingClientRect();
          const inside = event.clientX >= cr.left && event.clientX <= cr.right && event.clientY >= cr.top && event.clientY <= cr.bottom;
          cta.style.setProperty('--cta-x', inside ? ((event.clientX - cr.left - cr.width / 2) / cr.width * 7).toFixed(1) + 'px' : '0px');
          cta.style.setProperty('--cta-y', inside ? ((event.clientY - cr.top - cr.height / 2) / cr.height * 5).toFixed(1) + 'px' : '0px');
        }
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        if (heroVisual) {
          heroVisual.style.setProperty('--pointer-x', '0px');
          heroVisual.style.setProperty('--pointer-y', '0px');
        }
        if (cta) { cta.style.setProperty('--cta-x', '0px'); cta.style.setProperty('--cta-y', '0px'); }
      }, { passive: true });
    }
    if (spotlight) {
      spotlight.addEventListener('pointermove', event => {
        const rect = spotlight.getBoundingClientRect();
        spotlight.style.setProperty('--light-x', ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
        spotlight.style.setProperty('--light-y', ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
      }, { passive: true });
    }
    $$('.work-row').forEach(row => row.addEventListener('pointermove', event => {
      const rect = row.getBoundingClientRect();
      row.style.setProperty('--row-x', (event.clientX - rect.left).toFixed(1) + 'px');
      row.style.setProperty('--row-y', (event.clientY - rect.top).toFixed(1) + 'px');
    }, { passive: true }));
  }
})();