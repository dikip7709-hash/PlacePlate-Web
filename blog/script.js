// ========================================
// PLACE PLATE — BLOG PAGE SCRIPT
// Card animations, filter, mobile menu
// ========================================

// ========================================
// CARD ENTRANCE ANIMATIONS
// ========================================

function initCardAnimations() {
  const cards = document.querySelectorAll('.blog-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(card);
  });
}

// ========================================
// CATEGORY FILTER
// ========================================

function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.blog-card');
  const emptyState = document.getElementById('blogEmpty');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visible = 0;
      cards.forEach((card, i) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;

        if (match) {
          card.style.display = '';
          card.classList.remove('visible');
          card.style.transitionDelay = `${visible * 0.06}s`;
          setTimeout(() => card.classList.add('visible'), 20);
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      emptyState.hidden = visible > 0;
    });
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
  initCardAnimations();
  initFilter();
  initMobileMenu();
});
