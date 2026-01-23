// ========================================
// RESPONSIVE NAVBAR TOGGLE
// Toggle mobile menu on button click
// ========================================

function initMobileMenu() {
  const menuButton = document.querySelector('.btn-primary-menu');
  const navbarResponsive = document.querySelector('.navbar-responsive');

  if (!menuButton || !navbarResponsive) return;

  // Toggle menu on button click
  menuButton.addEventListener('click', () => {
    navbarResponsive.classList.toggle('active');
  });

  // Close menu when clicking on navigation links
  const navLinks = navbarResponsive.querySelectorAll('li');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarResponsive.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navbarResponsive.contains(event.target);
    const isClickOnButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton && navbarResponsive.classList.contains('active')) {
      navbarResponsive.classList.remove('active');
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});
