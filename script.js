const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const links = nav ? [...nav.querySelectorAll('a')] : [];
const menuLabel = toggle ? toggle.querySelector('.sr-only') : null;

const closeMenu = () => {
  if (!toggle || !nav || !menuLabel) return;

  toggle.setAttribute('aria-expanded', 'false');
  menuLabel.textContent = 'Open menu';
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
};

if (toggle && nav && menuLabel) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    const nextOpen = !isOpen;

    toggle.setAttribute('aria-expanded', String(nextOpen));
    menuLabel.textContent = nextOpen ? 'Close menu' : 'Open menu';
    nav.classList.toggle('open', nextOpen);
    document.body.classList.toggle('menu-open', nextOpen);
  });
}

if (links.length) {
  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

const sectionTargets = [...document.querySelectorAll('main section[id], header[id]')];
if ('IntersectionObserver' in window && sectionTargets.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      links.forEach(link => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sectionTargets.forEach(section => observer.observe(section));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
}

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
