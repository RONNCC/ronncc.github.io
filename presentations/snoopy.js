/* No CDN or framework needed: the deck, fonts, and artwork work offline. */
(() => {
  'use strict';
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  const previous = document.getElementById('previous-slide');
  const next = document.getElementById('next-slide');
  const counter = document.getElementById('counter');
  const sectionLabel = document.getElementById('section-label');
  const titleLabel = document.getElementById('title-label');
  const progress = document.getElementById('progress');
  const live = document.getElementById('slide-announcement');
  const indexDialog = document.getElementById('slide-index');
  const notesDialog = document.getElementById('slide-notes');
  const imageDialog = document.getElementById('image-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const imageViewport = document.getElementById('image-viewport');
  const zoomButton = document.getElementById('zoom-image');
  const jumpButton = document.getElementById('open-index');
  let current = 1;

  const parseHash = () => {
    const match = /^#slide(\d+)$/.exec(location.hash);
    return match ? Math.max(1, Math.min(total, Number(match[1]))) : 1;
  };
  const dialogOpen = () => Boolean(document.querySelector('dialog[open]'));

  // Generate the hierarchical index from the slide markup (one source of truth).
  const groups = new Map();
  const indexBody = document.getElementById('index-body');
  slides.forEach((slide, index) => {
    const name = slide.dataset.section;
    if (!groups.has(name)) {
      const group = document.createElement('section');
      group.className = 'index-section';
      const heading = document.createElement('h3');
      heading.textContent = name;
      const list = document.createElement('ol');
      group.append(heading, list);
      indexBody.append(group);
      groups.set(name, list);
    }
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.slideTarget = index + 1;
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    number.setAttribute('aria-hidden', 'true');
    button.append(number, document.createTextNode(slide.dataset.title));
    button.setAttribute('aria-label', `Slide ${index + 1}: ${slide.dataset.title}`);
    button.addEventListener('click', () => {
      indexDialog.close();
      showSlide(index + 1, { focus: true });
    });
    item.append(button);
    groups.get(name).append(item);
  });

  function showSlide(number, { history = true, focus = false, announce = true } = {}) {
    if (!Number.isInteger(number) || number < 1 || number > total) return;
    const oldSlide = slides[current - 1];
    const active = slides[number - 1];
    const changed = current !== number;
    const focusWasOnSlide = changed && oldSlide.contains(document.activeElement);
    slides.forEach(slide => {
      slide.hidden = slide !== active;
      slide.inert = slide !== active;
      slide.classList.toggle('active', slide === active);
    });
    current = number;
    if (changed) active.scrollTop = 0;
    if (history && location.hash !== `#slide${number}`) {
      window.history.pushState(null, '', `#slide${number}`);
    }
    previous.disabled = current === 1;
    next.disabled = current === total;
    counter.textContent = `${current} / ${total}`;
    sectionLabel.textContent = active.dataset.section;
    titleLabel.textContent = active.dataset.title;
    jumpButton.setAttribute('aria-label', `Slide ${current} of ${total}: ${active.dataset.title}. Open slide index`);
    progress.setAttribute('aria-valuenow', String(current));
    progress.setAttribute('aria-valuetext', `Slide ${current} of ${total}`);
    progress.firstElementChild.style.width = `${current / total * 100}%`;
    document.querySelectorAll('[data-slide-target]').forEach(button => {
      if (Number(button.dataset.slideTarget) === current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    document.querySelectorAll('.chapter-nav a').forEach(link => {
      if (link.dataset.section === active.dataset.section) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    document.title = `${active.dataset.title} · Snoopy`;
    if (announce) live.textContent = `${active.dataset.section}. Slide ${current} of ${total}: ${active.dataset.title}`;
    if (focus || focusWasOnSlide) active.querySelector('h1,h2').focus({ preventScroll: true });
  }

  previous.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));
  document.querySelectorAll('a[href^="#slide"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const match = /^#slide(\d+)$/.exec(link.getAttribute('href'));
      if (match) {
        event.preventDefault();
        showSlide(Number(match[1]), { focus: !link.closest('.chapter-nav') });
      }
    });
  });
  // Back/forward, hand-edited hashes, and copied links all select the same slide.
  const syncLocation = () => showSlide(parseHash(), { history: false });
  window.addEventListener('hashchange', syncLocation);
  window.addEventListener('popstate', syncLocation);

  jumpButton.addEventListener('click', () => {
    indexDialog.showModal();
    const activeButton = indexDialog.querySelector('[aria-current]');
    activeButton.focus({ preventScroll: true });
    activeButton.scrollIntoView({ block: 'center' });
  });
  document.getElementById('open-notes').addEventListener('click', () => {
    const active = slides[current - 1];
    document.getElementById('notes-title').textContent = `${current}. ${active.dataset.title}`;
    const body = document.getElementById('notes-body');
    body.replaceChildren(active.querySelector('template').content.cloneNode(true));
    notesDialog.showModal();
    notesDialog.scrollTop = 0;
  });
  document.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', () => button.closest('dialog').close());
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    // Only an actual backdrop tap closes; dragging inside a zoomed image does not.
    let backdropStart = false;
    const outside = event => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener('pointerdown', event => { backdropStart = event.target === dialog && outside(event); });
    dialog.addEventListener('click', event => {
      if (backdropStart && event.target === dialog && outside(event)) dialog.close();
      backdropStart = false;
    });
  });

  document.querySelectorAll('.image-button').forEach(button => {
    const image = button.querySelector('img');
    const unavailable = () => {
      button.dataset.failed = 'true';
      button.disabled = true;
      image.hidden = true;
      button.querySelector('.enlarge').hidden = true;
      if (!button.querySelector('.image-fallback')) {
        const fallback = document.createElement('span');
        fallback.className = 'image-fallback';
        fallback.textContent = `${image.alt} — image unavailable. See Notes & sources.`;
        button.append(fallback);
      }
    };
    image.addEventListener('error', unavailable);
    if (image.complete && !image.naturalWidth) unavailable();
    button.addEventListener('click', () => {
      document.getElementById('image-title').textContent = button.dataset.name;
      viewerImage.src = image.currentSrc || image.src;
      viewerImage.alt = image.alt;
      document.getElementById('image-credit').textContent = button.dataset.credit;
      const source = document.getElementById('image-source');
      source.href = button.dataset.source;
      imageViewport.classList.remove('is-zoomed');
      zoomButton.setAttribute('aria-pressed', 'false');
      zoomButton.textContent = 'Zoom in';
      imageDialog.showModal();
      imageViewport.scrollTo(0, 0);
    });
  });
  zoomButton.addEventListener('click', () => {
    const zoomed = imageViewport.classList.toggle('is-zoomed');
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? 'Fit image' : 'Zoom in';
    imageViewport.scrollTo(0, 0);
  });

  const interactive = element => element.closest('button,a,input,select,textarea,summary,[contenteditable="true"]');
  document.addEventListener('keydown', event => {
    if (dialogOpen() || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,select,textarea,[contenteditable="true"]')) return;
    const actions = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 1, End: total };
    if (Object.hasOwn(actions, event.key)) {
      event.preventDefault();
      showSlide(actions[event.key]);
    }
    // Space scrolls a long slide first; it advances only after reaching its end.
    if (event.key === ' ' && !event.shiftKey && !interactive(event.target)) {
      event.preventDefault();
      const slide = slides[current - 1];
      if (slide.scrollTop + slide.clientHeight < slide.scrollHeight - 2) {
        slide.scrollBy({ top: slide.clientHeight * .8, behavior: 'auto' });
      } else showSlide(current + 1);
    }
  });

  // Horizontal, single-finger gestures only. Vertical reading and pinch zoom are untouched.
  let swipe = null;
  const deck = document.getElementById('deck');
  deck.addEventListener('touchstart', event => {
    swipe = !dialogOpen() && event.touches.length === 1 && !interactive(event.target)
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  deck.addEventListener('touchmove', event => {
    if (!swipe) return;
    if (event.touches.length !== 1 || Math.abs(event.touches[0].clientY - swipe.y) > 40) swipe = null;
  }, { passive: true });
  deck.addEventListener('touchcancel', () => { swipe = null; }, { passive: true });
  deck.addEventListener('touchend', event => {
    if (!swipe || dialogOpen() || event.touches.length || event.changedTouches.length !== 1) { swipe = null; return; }
    const dx = swipe.x - event.changedTouches[0].clientX;
    const dy = swipe.y - event.changedTouches[0].clientY;
    swipe = null;
    if (Math.abs(dx) >= 64 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(current + (dx > 0 ? 1 : -1));
  }, { passive: true });

  // Content remains a readable document if JavaScript is unavailable.
  document.documentElement.classList.add('js');
  current = parseHash();
  showSlide(current, { history: false, announce: false });
})();
