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

  // Low-cost pointer interactions: parallax in the hero and a moving inspection light.
  // Disabled on touch devices and when the visitor requests reduced motion.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!reduceMotion && finePointer) {
    const hero = $('.hero');
    const heroCta = $('.hero-cta');
    if (hero) {
      hero.addEventListener('pointermove', event => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width * 2 - 1;
        const y = (event.clientY - rect.top) / rect.height * 2 - 1;
        hero.style.setProperty('--hero-shift-x', (x * 15).toFixed(1) + 'px');
        hero.style.setProperty('--hero-shift-y', (y * 12).toFixed(1) + 'px');
        hero.style.setProperty('--hero-art-x', (x * -9).toFixed(1) + 'px');
        hero.style.setProperty('--hero-art-y', (y * -8).toFixed(1) + 'px');
        if (heroCta) {
          const buttonRect = heroCta.getBoundingClientRect();
          const inside = event.clientX >= buttonRect.left && event.clientX <= buttonRect.right &&
                         event.clientY >= buttonRect.top && event.clientY <= buttonRect.bottom;
          heroCta.style.setProperty('--cta-x', inside ? (((event.clientX - (buttonRect.left + buttonRect.width / 2)) / buttonRect.width) * 7).toFixed(1) + 'px' : '0px');
          heroCta.style.setProperty('--cta-y', inside ? (((event.clientY - (buttonRect.top + buttonRect.height / 2)) / buttonRect.height) * 5).toFixed(1) + 'px' : '0px');
        }
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        ['--hero-shift-x','--hero-shift-y','--hero-art-x','--hero-art-y'].forEach(name => hero.style.setProperty(name, '0px'));
        if (heroCta) { heroCta.style.setProperty('--cta-x', '0px'); heroCta.style.setProperty('--cta-y', '0px'); }
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

  // Give the timeline a single active beat as entries pass through the reading line.
  const timelineEntries = $$('.timeline-entry');
  if ('IntersectionObserver' in window && timelineEntries.length) {
    const timelineObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineEntries.forEach(item => item.classList.toggle('is-active', item === entry.target));
        }
      });
    }, { rootMargin: '-38% 0px -46% 0px', threshold: 0 });
    timelineEntries.forEach(entry => timelineObserver.observe(entry));
  }

})();