const NAV_HTML = `
<nav class="nav">
  <div class="container nav-inner">
    <a class="logo" href="index.html" aria-label="Mariz portfolio home">
      <span class="logo-mark">∞</span>
      <span>Mariz</span>
    </a>
    <div class="nav-links">
      <a href="index.html#about">About</a>
      <a href="index.html#process">Process</a>
      <a href="index.html#skills">Skills</a>
      <a href="index.html#work">Work</a>
      <a href="index.html#experience">Experience</a>
      <a href="index.html#contact">Contact</a>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-social">
      <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="#" target="_blank" rel="noopener" aria-label="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      </a>
      <a href="#" target="_blank" rel="noopener" aria-label="Behance">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h6a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3V3z"/><path d="M3 11h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3v-8z"/><path d="M15 6h6"/><path d="M18 3v6"/></svg>
      </a>
    </div>
    <div class="footer-copy">© 2026 Mariz De Las Alas · UI/UX Designer & UI Developer</div>
  </div>
</footer>`;

function initComponents() {
  // ── Orbs ──
  const orbTarget = document.getElementById("site-orbs");
  if (orbTarget) {
    orbTarget.outerHTML = `<div class="orb one"></div><div class="orb two"></div>`;
  }

  // ── Nav ──
  const navEl = document.getElementById("site-nav");
  if (navEl) navEl.outerHTML = NAV_HTML;

  // ── Footer ──
  const footerEl = document.getElementById("site-footer");
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  // ── Lucide icons ──
  if (typeof lucide !== "undefined") lucide.createIcons();

  // ── Scroll-aware nav ──
  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 80);
    });
  }

  // ── Active nav link on scroll (index.html) ──
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, { threshold: 0.4 });
    sections.forEach((s) => sectionObserver.observe(s));
  }

  // ── Reveal on scroll ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 400)}ms`;
    revealObserver.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", initComponents);
