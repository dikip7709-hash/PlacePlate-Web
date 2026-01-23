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

// ========================================
// EMAILJS CONFIGURATION
// Ganti nilai di bawah dengan kredensial Anda
// ========================================

const EMAILJS_CONFIG = {
  publicKey: "QsPsXnOnsIIDDrkCm",      // Ganti dengan Public Key Anda
  serviceID: "service_ehuqs3n",      // Ganti dengan Service ID Anda
  templateID: "template_wed1v0a"     // Ganti dengan Template ID Anda
};

// ========================================
// EMAILJS FORM HANDLER
// Mengirim form ke EmailJS
// ========================================

function initContactForm() {
  // Inisialisasi EmailJS dengan Public Key
  emailjs.init(EMAILJS_CONFIG.publicKey);

  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  const notificationOverlay = document.getElementById('notification-overlay');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Ubah tampilan tombol saat mengirim
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Kirim form menggunakan EmailJS
    emailjs.sendForm(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, this)
      .then(function(response) {
        // Berhasil - Tampilkan notification overlay
        console.log('SUCCESS!', response.status, response.text);
        form.reset();
        showNotification();
      })
      .catch(function(error) {
        // Gagal
        console.log('FAILED...', error);
        alert('❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.');
      })
      .finally(function() {
        // Kembalikan tombol ke keadaan semula
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
  });

  // Fungsi untuk menampilkan notification overlay
  function showNotification() {
    if (notificationOverlay) {
      notificationOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }

  // Fungsi untuk menutup notification (opsional - jika ingin close dengan klik di luar)
  if (notificationOverlay) {
    notificationOverlay.addEventListener('click', function(e) {
      // Tutup hanya jika klik di luar notification-card
      if (e.target === notificationOverlay) {
        notificationOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
});
