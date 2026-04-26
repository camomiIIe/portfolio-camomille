// Client-side behaviors: header pink-mode toggle, scroll-spy nav indicator,
// reveal-on-scroll, Lottie mounting. Loaded once per page via the layout.

declare global {
  interface Window {
    lottie?: any;
    __coworkClientInit?: boolean;
  }
}

function init() {
  if (window.__coworkClientInit) return;
  window.__coworkClientInit = true;

  // ---- Header mode (pink ↔ white) ----
  const header = document.getElementById('site-header');
  const pinkHero = document.getElementById('hero-pink');

  function updateHeaderMode() {
    if (!header) return;
    if (!pinkHero) {
      // Page without pink hero (case study) — always white-mode + scrolled style
      header.classList.remove('pink-mode');
      header.classList.toggle('scrolled', window.scrollY > 8);
      return;
    }
    const rect = pinkHero.getBoundingClientRect();
    const headerHeight = header.offsetHeight;
    const isOverPink = rect.bottom > headerHeight + 8;
    header.classList.toggle('pink-mode', isOverPink);
    header.classList.toggle('scrolled', !isOverPink && window.scrollY > 8);
  }

  // ---- Scroll-spy nav indicator ----
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav a[data-section]'));
  const indicator = document.querySelector<HTMLSpanElement>('.nav-indicator');
  const sectionMap: Record<string, HTMLElement | null> = {
    work: document.getElementById('work'),
    about: document.getElementById('about'),
    contact: document.getElementById('contact'),
  };

  function moveIndicator(activeLink: HTMLAnchorElement | null) {
    if (!activeLink || !indicator) return;
    const navUl = activeLink.closest('ul');
    if (!navUl) return;
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navUl.getBoundingClientRect();
    const offsetX = linkRect.left - navRect.left;
    indicator.style.transform = `translateX(${offsetX}px)`;
    indicator.style.width = linkRect.width + 'px';
    requestAnimationFrame(() => indicator.classList.add('ready'));
  }

  function updateActiveSection() {
    if (!navLinks.length) return;
    const triggerY = window.scrollY + window.innerHeight * 0.35;
    let activeKey = 'work';
    Object.entries(sectionMap).forEach(([key, sec]) => {
      if (sec && sec.offsetTop <= triggerY) activeKey = key;
    });
    let activeLink: HTMLAnchorElement | null = null;
    navLinks.forEach((link) => {
      const isActive = link.dataset.section === activeKey;
      link.classList.toggle('active', isActive);
      if (isActive) activeLink = link;
    });
    moveIndicator(activeLink);
  }

  function tick() {
    updateHeaderMode();
    updateActiveSection();
  }
  tick();
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  window.addEventListener('load', tick);

  // ---- Reveal-on-scroll ----
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  // ---- Mount Lotties (loaded from /assets/*.json via fetch) ----
  function mountLotties() {
    if (!window.lottie) {
      setTimeout(mountLotties, 100);
      return;
    }
    document.querySelectorAll<HTMLElement>('[data-lottie-src]').forEach(async (el) => {
      const src = el.dataset.lottieSrc;
      if (!src) return;
      try {
        const res = await fetch(src);
        const data = await res.json();
        window.lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: el.dataset.lottieLoop !== 'false',
          autoplay: true,
          animationData: data,
        });
      } catch (err) {
        console.warn('Lottie failed to load:', src, err);
      }
    });
  }
  mountLotties();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export {};
