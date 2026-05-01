// ========================================
// PLACE PLATE — FAQ PAGE SCRIPT
// Accordion, category tabs, mobile menu
// ========================================

// ========================================
// FAQ ACCORDION
// Smooth open/close with max-height
// ========================================

function initAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other open items
      items.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

// ========================================
// CATEGORY TABS
// Switch visible FAQ group
// ========================================

function initTabs() {
  const tabs   = document.querySelectorAll('.faq-tab');
  const groups = document.querySelectorAll('.faq-group');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show target group, hide others
      groups.forEach(group => {
        const match = group.getAttribute('data-group') === target;
        group.classList.toggle('hidden', !match);

        // Close all open items when switching tabs
        if (!match) {
          group.querySelectorAll('.faq-item.open').forEach(item => {
            item.classList.remove('open');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          });
        }
      });
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
  initAccordion();
  initTabs();
  initMobileMenu();
});
