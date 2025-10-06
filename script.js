// script.js - minimal helpers: navbar scroll class, equalize card-bodies, auto-close mobile menu on link click

(function () {
  'use strict';

  // Navbar scroll class
  const navbar = document.querySelector('.navbar');
  function onScroll() {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Equalize .card-body heights inside each .card-grid row for visual uniformity
  function equalizeCards() {
    const grids = document.querySelectorAll('.card-grid');
    grids.forEach(grid => {
      const bodies = Array.from(grid.querySelectorAll('.card .card-body'));
      if (!bodies.length) return;
      // reset
      bodies.forEach(b => b.style.minHeight = '');
      // compute max height
      const heights = bodies.map(b => b.getBoundingClientRect().height);
      const max = Math.max(...heights, 0);
      bodies.forEach(b => b.style.minHeight = (max) + 'px');
    });
  }

  // run on load and resize (debounced)
  window.addEventListener('load', equalizeCards);
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(equalizeCards, 200);
  });

  // Close mobile menu after clicking a nav-link
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const bsCollapseEl = document.getElementById('mainNav');
  const bsCollapse = bsCollapseEl ? new bootstrap.Collapse(bsCollapseEl, {toggle:false}) : null;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
        // Mobile: collapse
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

})();
