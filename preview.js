(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const progress = $('#scrollProgress');
  let progressQueued = false;
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const amount = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = 'scaleX(' + amount + ')';
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

  const menuButton = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open', !isOpen);
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    });
    $$('#mobileNav a').forEach(link => link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  // Reveal once as content approaches view. Static content remains visible if JS or IO is unavailable.
  const revealItems = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && revealItems.length) {
    document.documentElement.classList.add('motion-enabled');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((el, index) => {
      el.style.transitionDelay = (Math.min(index % 3, 2) * 55) + 'ms';
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  // Scrollytelling spotlight: a single sticky stage switches between original SVG/type compositions.
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
  const setActiveStep = (step) => {
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
      // If a quick scroll catches two steps in the activation band, prefer the one closest to the viewport centre.
      const candidates = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2) -
                        Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2));
      if (candidates[0]) setActiveStep(candidates[0].target);
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    steps.forEach(step => stepObserver.observe(step));
  }

  // Active navigation is event-driven, not recalculated on every scroll frame.
  const navLinks = $$('.nav a');
  const navSections = ['achievements', 'work', 'timeline', 'reflections'].map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window && navSections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    navSections.forEach(section => navObserver.observe(section));
  }
})();