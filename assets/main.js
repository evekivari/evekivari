// ── Cursor
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

// ── Nav scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Lightbox
const overlay = document.getElementById('lightboxOverlay');
const lbImg   = document.getElementById('lightboxImg');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
overlay && overlay.addEventListener('click', closeLightbox);

// Make all .zoomable images open lightbox
document.querySelectorAll('.zoomable').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});
