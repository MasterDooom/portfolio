(() => {
  const $ = (selector, root = document) => root.querySelector(selector)
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Small, observer-driven reveals. The production React version uses Motion for React.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' })
  $$('.js-reveal').forEach((el, index) => {
    el.style.transitionDelay = reduceMotion ? '0ms' : `${Math.min(index % 4, 3) * 55}ms`
    if (reduceMotion) el.classList.add('is-visible')
    else revealObserver.observe(el)
  })

  // Page progress line.
  const progress = $('#readProgress')
  let progressQueued = false
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    progressQueued = false
  }
  window.addEventListener('scroll', () => {
    if (!progressQueued) { progressQueued = true; requestAnimationFrame(updateProgress) }
  }, { passive: true })
  updateProgress()

  // Navigation active state.
  const navLinks = $$('.desktop-nav a')
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`))
    })
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  ['archive', 'projects', 'journey', 'reflections'].forEach((id) => { const el = document.getElementById(id); if (el) sectionObserver.observe(el) })

  // Mobile navigation.
  const menuButton = $('#menuButton')
  const mobileNav = $('#mobileNav')
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open')
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    menuButton.innerHTML = open ? '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m6 6 12 12M18 6 6 18"/></svg>' : '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  })
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => { mobileNav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false') }))

  // Achievement filters animate through CSS and keep the count accurate.
  const filterButtons = $$('.filter-button')
  const grid = $('#achievementGrid')
  const cards = $$('.achievement-card')
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter
    filterButtons.forEach((b) => { const active = b === button; b.classList.toggle('is-selected', active); b.setAttribute('aria-pressed', String(active)) })
    grid.classList.toggle('is-filtering', filter !== 'All')
    let count = 0
    cards.forEach((card) => {
      const show = filter === 'All' || card.dataset.category === filter
      card.classList.toggle('is-filtered-out', !show)
      if (show) count += 1
    })
    $('#entryCount').textContent = String(count).padStart(2, '0')
  }))

  // Detail dossier content. All text is intentionally editable placeholder copy.
  const dossiers = {
    sasmo: { category: 'ACADEMIC / STORY', meta: 'RESULT / YEAR TO ADD', title: '8th rank · SASMO Olympiad', detail: 'A result from the Singapore and Asian Schools Math Olympiad. Add the official year, category or level, and the certificate or result page here.', reflection: 'What preparation looked like, which kinds of problems challenged you, and what the result taught you about reasoning under pressure.', evidence: 'Official certificate or result evidence to add.', art: '.sasmo-art' },
    tennis: { category: 'SPORT / STORY', meta: 'TOURNAMENT / YEAR TO ADD', title: 'District tennis trophy', detail: 'A district-level tennis milestone. Add the tournament name, event, year and result so the story is grounded in the actual competition.', reflection: 'Describe the training, match-day pressure, a difficult point or a lesson about patience and consistency.', evidence: 'Photograph of your actual trophy or tournament document to add.', art: '.tennis-art' },
    hackathon: { category: 'INNOVATION / STORY', meta: 'EVENT / YEAR TO ADD', title: 'Hackathon selection', detail: 'A selection email marks the beginning of a project, not the end of the story. Add the hackathon name, the round you reached and a concise description of the idea submitted.', reflection: 'Explain the problem you chose, the thinking behind your solution and what you learned from taking an idea into a selection process.', evidence: 'Redacted screenshot or PDF of the selection email to add.', art: '.hack-art' },
    medals: { category: 'COLLECTION / STORY', meta: 'COLLECTION / DETAILS TO ADD', title: 'Medals & recognitions', detail: 'A gallery of physical medals and other recognitions. Each item can have its own label, event, year and a short note explaining what made it meaningful.', reflection: 'Look for the range in the collection: what each medal represents, how your interests shifted and which achievements demanded different kinds of effort.', evidence: 'Photographs of your own medals and any supporting certificates to add.', art: '.medal-collection-art' }
  }
  const backdrop = $('#modalBackdrop')
  let previouslyFocused = null
  const closeModal = () => { backdrop.classList.remove('is-open'); backdrop.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); if (previouslyFocused) previouslyFocused.focus() }
  const openModal = (id, button) => {
    const data = dossiers[id]
    if (!data) return
    previouslyFocused = button
    $('#modalCategory').textContent = data.category
    $('#modalMeta').textContent = data.meta
    $('#modalTitle').textContent = data.title
    $('#modalDetail').textContent = data.detail
    $('#modalReflection').textContent = data.reflection
    $('#modalEvidence').textContent = data.evidence
    const originalCard = $(`[data-id="${id}"]`)
    const visual = $('.achievement-card__visual', originalCard)
    $('#modalVisual').innerHTML = visual.innerHTML
    // Remove controls/corner UI from the enlarged artwork.
    $('#modalVisual .card-index')?.remove()
    $('#modalVisual .card-open')?.remove()
    backdrop.classList.add('is-open')
    backdrop.setAttribute('aria-hidden', 'false')
    document.body.classList.add('modal-open')
    $('#modalClose').focus()
  }
  $$('[data-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.open, button)))
  $('#modalClose').addEventListener('click', closeModal)
  $('#modalDone').addEventListener('click', closeModal)
  backdrop.addEventListener('mousedown', (event) => { if (event.target === backdrop) closeModal() })
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && backdrop.classList.contains('is-open')) closeModal() })

  // In the no-dependency preview, browser-native smooth scrolling stands in for Lenis.
  if (!reduceMotion) document.documentElement.style.scrollBehavior = 'smooth'
})()
