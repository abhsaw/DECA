
/* Mobile nav toggle */
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
if (burger){
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}


/* Scroll reveal */
const io = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold: .12}) : null;
document.querySelectorAll('.reveal').forEach(el => io && io.observe(el));

/* Active link highlight by section */
const sections = document.querySelectorAll('section[id]');
const navLinks = [...document.querySelectorAll('.links a')];
function setActive(id){
  navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href').includes(id)));
}
const obs = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); });
}, {rootMargin: '-40% 0px -55% 0px'}) : null;
sections.forEach(s => obs && obs.observe(s));


/* Parallax for watermark: shift based on scroll position (subtle) */
(function(){
  const root = document.documentElement;
  function onScroll(){
    const y = window.scrollY || 0;
    root.style.setProperty('--wm-shift', Math.min(y * 0.20, 500) + 'px'); // gentle parallax
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

/* Stagger reveal timing */
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 60) + 'ms';
});

/* Header shadow on scroll (fade) */
(function(){
  const navEl = document.querySelector('.nav');
  function onScroll(){
    const y = window.scrollY || 0;
    if (!navEl) return;
    if (y > 8) navEl.classList.add('nav-shadow-fade');
    else navEl.classList.remove('nav-shadow-fade');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

/* Smooth anchor scrolling with sticky header offset */
(function(){
  const header = document.querySelector('.nav');
  const headerH = () => (header ? header.getBoundingClientRect().height : 0);
  function smoothTo(hash){
    try{
      const target = document.querySelector(hash);
      if(!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - (headerH() + 8);
      window.scrollTo({ top: y, behavior: 'smooth' });
    }catch(e){}
  }
  // same-page anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1){
        e.preventDefault();
        history.pushState(null, "", href);
        smoothTo(href);
      }
    });
  });
  // if page loaded with a hash
  if (location.hash) { setTimeout(() => smoothTo(location.hash), 50); }
})();
