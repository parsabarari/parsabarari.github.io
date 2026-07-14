document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     FOOTER YEAR
  ========================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================
     NAVBAR: SCROLL STYLE + MOBILE TOGGLE
  ========================================= */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active', isActive);
      navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================
     TYPING EFFECT (HERO TITLE)
  ========================================= */
  const typingEl = document.getElementById('typingText');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const roles = [
    'Backend Developer | Django & DRF',
    'Building Scalable APIs',
    'Django REST Framework Specialist'
  ];

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const typeLoop = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
          charIndex--;
        } else {
          charIndex++;
        }

        typingEl.textContent = currentRole.substring(0, charIndex);

        let speed = isDeleting ? 35 : 65;

        if (!isDeleting && charIndex === currentRole.length) {
          speed = 1800; // pause at full text
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          speed = 400;
        }

        setTimeout(typeLoop, speed);
      };

      typeLoop();
    }
  }

  /* =========================================
     FADE-IN ON SCROLL (Intersection Observer)
  ========================================= */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* =========================================
     BACK TO TOP BUTTON
  ========================================= */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* =========================================
     ACTIVE NAV LINK ON SCROLL
  ========================================= */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.toggle('active-link', anchor.getAttribute('href') === `#${currentId}`);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

});