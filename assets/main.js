// ── Cursor — hidden until first mouse movement
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = -200, my = -200;
let rx = -200, ry = -200;
let cursorActive = false;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  if (!cursorActive) {
    cursorActive = true;
    cursor.classList.add('active');
    ring.classList.add('active');
  }
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
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Lightbox
const overlay = document.getElementById('lightboxOverlay');
const lbImg   = document.getElementById('lightboxImg');

function openLightbox(src, alt) {
  if (!overlay) return;
  lbImg.src = src;
  lbImg.alt = alt || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
overlay && overlay.addEventListener('click', closeLightbox);

document.querySelectorAll('.zoomable').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});
