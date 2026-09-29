const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const links = [...document.querySelectorAll('#site-nav a')];

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});
links.forEach(link => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); document.body.classList.remove('menu-open');
}));

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(section => observer.observe(section));

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
reveals.forEach(el => revealObserver.observe(el));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });
document.querySelector('#year').textContent = new Date().getFullYear();
