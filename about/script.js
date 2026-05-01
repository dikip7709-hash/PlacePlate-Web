// ========================================
// PLACE PLATE — ABOUT PAGE SCRIPT
// Counter, card animations, mobile menu
// ========================================

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounter(element) {
  const target    = parseInt(element.getAttribute('data-target'));
  const suffix    = element.getAttribute('data-suffix') || '';
  const duration  = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const tick = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(tick);
    } else {
      element.textContent = target + suffix;
    }
  };

  tick();
}

function initCounters() {
  const nums = document.querySelectorAll('.story-stat-number[data-target]');
  if (!nums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

// ========================================
// CARD ENTRANCE ANIMATIONS
// Fade-up on scroll for audience + testimonial cards
// ========================================

function initCardAnimations() {
  const targets = document.querySelectorAll(
    '.audience-card, .strip-card, .value-card, .service-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    // service-card and value-card need initial state set via JS
    if (el.classList.contains('service-card') || el.classList.contains('value-card')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    }
    observer.observe(el);
  });

  // When service/value cards become visible, reveal them
  document.querySelectorAll('.service-card, .value-card').forEach((el, i) => {
    const singleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          singleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    singleObserver.observe(el);
  });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
  const menuBtn = document.querySelector('.btn-primary-menu');
  const navResp = document.querySelector('.navbar-responsive');

  if (!menuBtn || !navResp) return;

  menuBtn.addEventListener('click', () => navResp.classList.toggle('active'));

  navResp.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => navResp.classList.remove('active'));
  });

  document.addEventListener('click', (e) => {
    if (
      navResp.classList.contains('active') &&
      !navResp.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      navResp.classList.remove('active');
    }
  });
}

// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initCardAnimations();
  initMobileMenu();
});
