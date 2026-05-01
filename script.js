// ========================================
// COUNTER ANIMATION
// Animates numbers to count up when in viewport
// ========================================

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;

    if (current < target) {
      element.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + suffix;
    }
  };

  updateCounter();
}

// Intersection Observer to trigger animation when element is visible
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5, // Trigger when 50% of element is visible
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// ========================================
// BANNER TITLE WORD ANIMATION
// Animates each word to reveal from bottom with blur
// ========================================

function initBannerWordAnimation() {
  const bannerTitle = document.querySelector('.banner-title');

  if (!bannerTitle) return;

  // Get all text content from spans
  const spans = bannerTitle.querySelectorAll('span');
  let allText = '';

  spans.forEach(span => {
    allText += span.textContent + ' ';
  });

  // Split into words
  const words = allText.trim().split(/\s+/);

  // Clear original content
  bannerTitle.innerHTML = '';

  // Create word spans WITHOUT animation initially
  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.textContent = word;
    // Store delay as data attribute instead of applying it immediately
    wordSpan.setAttribute('data-delay', index * 0.1);

    // Preserve original colors
    if (index < 5) { // "Premium Templates & Custom Slides"
      wordSpan.classList.add('text-primary');
    } else if (word === 'for') {
      wordSpan.classList.add('text-primary');
    } else { // "Every Industry"
      wordSpan.classList.add('text-accent');
    }

    bannerTitle.appendChild(wordSpan);

    // Add space after word (except last word)
    if (index < words.length - 1) {
      bannerTitle.appendChild(document.createTextNode(' '));
    }
  });

  // Trigger animation when banner is in viewport
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !bannerTitle.classList.contains('animated')) {
        bannerTitle.classList.add('animated');

        // Apply animation delays when entering viewport
        const wordElements = bannerTitle.querySelectorAll('.word');
        wordElements.forEach(wordEl => {
          const delay = wordEl.getAttribute('data-delay');
          wordEl.style.animationDelay = `${delay}s`;
        });

        // Unobserve after animation starts (only animate once)
        observer.unobserve(bannerTitle);
      }
    });
  }, observerOptions);

  observer.observe(bannerTitle);
}

// ========================================
// TESTIMONIAL CARDS ANIMATION
// Animates cards to slide up one by one
// ========================================

function initTestimonialAnimation() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  if (testimonialCards.length === 0) return;

  const observerOptions = {
    threshold: 0.2, // Trigger when 20% of card is visible
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        // Unobserve after animation starts (only animate once)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe each card with staggered delay
  testimonialCards.forEach((card, index) => {
    // Set animation delay for stagger effect
    card.style.animationDelay = `${index * 0.15}s`;
    observer.observe(card);
  });
}

// ========================================
// HERO HEADLINE WORD ANIMATION
// Animates each word to reveal from bottom with blur
// ========================================

function initHeroWordAnimation() {
  const heroHeadline = document.querySelector('.hero-headline');

  if (!heroHeadline) return;

  // Get all original spans with their classes
  const originalSpans = heroHeadline.querySelectorAll('span');
  const spanData = [];

  // Store text and classes from original spans
  originalSpans.forEach(span => {
    const text = span.textContent.trim();
    const classes = span.className;
    const style = span.getAttribute('style');

    if (text) {
      spanData.push({ text, classes, style });
    }
  });

  // Clear original content
  heroHeadline.innerHTML = '';

  let wordIndex = 0;

  // Process each original span
  spanData.forEach(spanInfo => {
    const words = spanInfo.text.split(/\s+/);

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word;
      wordSpan.setAttribute('data-delay', wordIndex * 0.1);

      // Preserve original classes and styles
      if (spanInfo.classes) {
        wordSpan.className += ' ' + spanInfo.classes;
      }
      if (spanInfo.style) {
        wordSpan.setAttribute('style', spanInfo.style);
      }

      heroHeadline.appendChild(wordSpan);

      // Add space after word (except if it's the last word of the last span)
      heroHeadline.appendChild(document.createTextNode(' '));

      wordIndex++;
    });
  });

  // Trigger animation when hero is in viewport
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroHeadline.classList.contains('animated')) {
        heroHeadline.classList.add('animated');

        // Apply animation delays when entering viewport
        const wordElements = heroHeadline.querySelectorAll('.word');
        wordElements.forEach(wordEl => {
          const delay = wordEl.getAttribute('data-delay');
          wordEl.style.animationDelay = `${delay}s`;
        });

        // Unobserve after animation starts
        observer.unobserve(heroHeadline);
      }
    });
  }, observerOptions);

  observer.observe(heroHeadline);
}

// ========================================
// FOOTER CTA HEADLINE WORD ANIMATION
// Animates each word to reveal from bottom with blur
// ========================================

function initFooterCtaWordAnimation() {
  const footerCtaHeadline = document.querySelector('.footer-cta-headline');

  if (!footerCtaHeadline) return;

  // Get all original spans with their classes
  const originalSpans = footerCtaHeadline.querySelectorAll('span');
  const spanData = [];

  // Store text and classes from original spans
  originalSpans.forEach(span => {
    const text = span.textContent.trim();
    const classes = span.className;
    const style = span.getAttribute('style');

    if (text) {
      spanData.push({ text, classes, style });
    }
  });

  // Clear original content
  footerCtaHeadline.innerHTML = '';

  let wordIndex = 0;

  // Process each original span
  spanData.forEach(spanInfo => {
    const words = spanInfo.text.split(/\s+/);

    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word;
      wordSpan.setAttribute('data-delay', wordIndex * 0.1);

      // Preserve original classes and styles
      if (spanInfo.classes) {
        wordSpan.className += ' ' + spanInfo.classes;
      }
      if (spanInfo.style) {
        wordSpan.setAttribute('style', spanInfo.style);
      }

      footerCtaHeadline.appendChild(wordSpan);

      // Add space after word
      footerCtaHeadline.appendChild(document.createTextNode(' '));

      wordIndex++;
    });
  });

  // Trigger animation when footer CTA is in viewport
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !footerCtaHeadline.classList.contains('animated')) {
        footerCtaHeadline.classList.add('animated');

        // Apply animation delays when entering viewport
        const wordElements = footerCtaHeadline.querySelectorAll('.word');
        wordElements.forEach(wordEl => {
          const delay = wordEl.getAttribute('data-delay');
          wordEl.style.animationDelay = `${delay}s`;
        });

        // Unobserve after animation starts
        observer.unobserve(footerCtaHeadline);
      }
    });
  }, observerOptions);

  observer.observe(footerCtaHeadline);
}

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
    const isOpen = navbarResponsive.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close menu when clicking on navigation links
  const navLinks = navbarResponsive.querySelectorAll('li');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarResponsive.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navbarResponsive.contains(event.target);
    const isClickOnButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton && navbarResponsive.classList.contains('active')) {
      navbarResponsive.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    }
  });
}

// ========================================
// NAVBAR SEARCH (inline bar + compact popup)
// ========================================

function initNavSearch() {
  const wrap  = document.getElementById('navSearchWrap');
  const input = document.getElementById('navSearchInline');
  const popup = document.getElementById('navSearchPopup');

  if (!input) return;

  function navigate(q) {
    location.href = q
      ? `templates/index.html?q=${encodeURIComponent(q)}`
      : 'templates/index.html';
  }

  function showPopup() {
    if (popup) popup.hidden = false;
  }

  function hidePopup() {
    if (popup) popup.hidden = true;
  }

  input.addEventListener('focus', showPopup);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { hidePopup(); navigate(input.value.trim()); }
    if (e.key === 'Escape') { hidePopup(); input.blur(); }
  });

  // Hint tags — use mousedown so click fires before blur hides popup
  popup?.querySelectorAll('.popup-hint').forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      navigate(btn.getAttribute('data-query'));
    });
  });

  // Hide popup on outside click
  document.addEventListener('click', (e) => {
    if (wrap && !wrap.contains(e.target)) hidePopup();
  });

  // Mobile search input (navbar-responsive)
  const mobileInput = document.getElementById('mobileSearchInput');
  mobileInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = mobileInput.value.trim();
      location.href = q
        ? `templates/index.html?q=${encodeURIComponent(q)}`
        : 'templates/index.html';
    }
  });
}

// ========================================
// LANGUAGE SWITCHER
// Apply saved language on load, switch on click
// ========================================

function applyLanguage(lang) {
  if (typeof TRANSLATIONS === 'undefined') return;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // RTL for Arabic
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

function initLanguageSwitcher() {
  const currentLang = localStorage.getItem('pp_lang') || 'en';

  // Mark active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);

    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      localStorage.setItem('pp_lang', lang);
      location.reload();
    });
  });
}

// ========================================
// BUNDLE CARD ENTRANCE ANIMATION
// Staggered fade-up when cards scroll into view
// ========================================

function initBundleAnimation() {
  const cards = document.querySelectorAll('.bundle-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(card);
  });
}

// ========================================
// PAYMENT MODAL
// Template purchase popup with USD / IDR tabs
// ========================================

function initPaymentModal() {
  const overlay = document.getElementById('paymentOverlay');
  if (!overlay) return;

  const closeBtn   = document.getElementById('paymentClose');
  const modalName  = document.getElementById('modalTemplateName');
  const modalPrice = document.getElementById('modalPrice');
  const methodsInt = document.getElementById('methodsInt');
  const methodsId  = document.getElementById('methodsId');
  const tabs       = overlay.querySelectorAll('.payment-tab');

  let priceInt = '$3.50';
  let priceId  = 'Rp 55.000';

  function openModal(title, intPrice, idPrice) {
    priceInt = intPrice;
    priceId  = idPrice;
    modalName.textContent  = title;
    modalPrice.textContent = intPrice;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.currency === 'int'));
    methodsInt.classList.remove('hidden');
    methodsId.classList.add('hidden');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open modal on any .btn-buy click (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-buy');
    if (!btn) return;
    const card  = btn.closest('.template-card');
    const title = card ? card.querySelector('.template-title').textContent.trim() : 'Template';
    openModal(title, btn.dataset.int || '$3.50', btn.dataset.id || 'Rp 55.000');
  });

  // Currency tab switch
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const isId = tab.dataset.currency === 'id';
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      modalPrice.textContent = isId ? priceId : priceInt;
      methodsInt.classList.toggle('hidden', isId);
      methodsId.classList.toggle('hidden', !isId);
    });
  });

  // Close on button / backdrop / Escape key
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ========================================
// YOUTUBE FACADE
// Defers YouTube iframe load until user clicks — saves ~400 KB on initial load
// ========================================

function initYoutubeFacade() {
  document.querySelectorAll('.yt-facade').forEach(facade => {
    function loadVideo() {
      const id = facade.dataset.id;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = facade.querySelector('img')?.alt || 'Video preview';
      facade.innerHTML = '';
      facade.appendChild(iframe);
    }

    facade.addEventListener('click', loadVideo);
    facade.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadVideo();
      }
    });
  });
}

// ========================================
// STAR RATING ACCESSIBILITY
// Groups star images under one labelled region so screen readers announce correctly
// ========================================

function initStarRatingAccessibility() {
  document.querySelectorAll('.stars').forEach(stars => {
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', 'Rating: 4.5 out of 5 stars');
    stars.querySelectorAll('img').forEach(img => {
      img.setAttribute('alt', '');
      img.setAttribute('aria-hidden', 'true');
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language FIRST so animations see translated text
  const savedLang = localStorage.getItem('pp_lang') || 'en';
  applyLanguage(savedLang);

  initCounterAnimation();
  initBannerWordAnimation();
  initHeroWordAnimation();
  initFooterCtaWordAnimation();
  initTestimonialAnimation();
  initMobileMenu();
  initNavSearch();
  initLanguageSwitcher();
  initBundleAnimation();
  initPaymentModal();
  initYoutubeFacade();
  initStarRatingAccessibility();
});