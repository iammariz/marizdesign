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
  <div class="container">© 2026 Mariz De Las Alas · UI/UX Designer & UI Developer</div>
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
