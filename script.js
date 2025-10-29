document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle (safe checks)
  const navToggle = document.querySelector('.nav-toggle');
  const navRight = document.querySelector('.nav-right');

  if (navToggle && navRight) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navRight.classList.toggle('active');

      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navRight.contains(e.target) && !navToggle.contains(e.target)) {
        navRight.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Single IntersectionObserver used for all animations
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target); // don't re-trigger
      }
    });
  }, { threshold: 0.12 });

  // Utility to prepare & observe a NodeList
  const observeAll = (nodes) => {
    nodes.forEach((el, i) => {
      el.classList.add('hidden');
      el.style.setProperty('--order', i);
      observer.observe(el);
    });
  };

  // Animate nav items
  const navItems = document.querySelectorAll('.nav-right ul li');
  observeAll(navItems);

  // Animate hero elements
  const heroElements = document.querySelectorAll('.hero-content, .hero-txt, .hero-btns');
  observeAll(heroElements);

  // Animate everything inside .about
  const aboutElements = document.querySelectorAll('.about .about-content, .about .abt-txt, .About-cards, .About-cards .card, .about .big-card');
  observeAll(aboutElements);

  // Animate everything inside .programs
  const programElements = document.querySelectorAll('.programs h2, .programs .prg-txt, .programs .pr-card');
  observeAll(programElements);

  // Animate program card images separately
  const programImages = document.querySelectorAll('.programs .pr-card img');
  programImages.forEach((img, i) => {
    img.classList.add('hidden');
    img.style.setProperty('--order', i + 4);
    observer.observe(img);
  });

  // Animate everything inside .mission
  const missionElements = document.querySelectorAll('.mission-content h2, .msp, .mission-cards .mission-crd, .mis-big');
  observeAll(missionElements);

  // Animate mission card contents separately
  const missionCardElements = document.querySelectorAll('.mission-crd i, .mission-crd h3, .mission-crd p, .mission-crd span, .mission-crd a');
  missionCardElements.forEach((el, i) => {
    el.classList.add('hidden');
    el.style.setProperty('--order', i + 3);
    observer.observe(el);
  });

  // Animate mis-big contents
  const misBigElements = document.querySelectorAll('.mis-big h2, .mis-go, .preach');
  misBigElements.forEach((el, i) => {
    el.classList.add('hidden');
    el.style.setProperty('--order', i + 5);
    observer.observe(el);
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});