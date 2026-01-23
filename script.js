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
  initCounterAnimation();
  initBannerWordAnimation();
  initHeroWordAnimation();
  initFooterCtaWordAnimation();
  initTestimonialAnimation();
  initMobileMenu();
});