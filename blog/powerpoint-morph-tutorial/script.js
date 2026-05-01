document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initTocHighlight();
});

function initMobileMenu() {
  const menuButton = document.querySelector('.btn-primary-menu');
  const navbarResponsive = document.querySelector('.navbar-responsive');
  if (!menuButton || !navbarResponsive) return;

  menuButton.addEventListener('click', function () {
    const isOpen = navbarResponsive.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

function initTocHighlight() {
  const sections = document.querySelectorAll('.article-body section[id]');
  const tocLinks = document.querySelectorAll('.toc-link');
  if (!sections.length || !tocLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));
}
