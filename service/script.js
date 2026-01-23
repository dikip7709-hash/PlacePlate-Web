// ========================================
// PLACE PLATE SERVICE PAGE - JAVASCRIPT
// Animations and Interactions
// ========================================

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

  if (statNumbers.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
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
    wordSpan.setAttribute('data-delay', index * 0.1);

    // Preserve original colors based on word position
    if (word === 'Your' || word === 'Message') {
      wordSpan.classList.add('text-accent');
    } else {
      wordSpan.classList.add('text-primary');
    }

    bannerTitle.appendChild(wordSpan);

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

        const wordElements = bannerTitle.querySelectorAll('.word');
        wordElements.forEach(wordEl => {
          const delay = wordEl.getAttribute('data-delay');
          wordEl.style.animationDelay = `${delay}s`;
        });

        observer.unobserve(bannerTitle);
      }
    });
  }, observerOptions);

  observer.observe(bannerTitle);
}

// ========================================
// HERO HEADLINE WORD ANIMATION
// Animates each word to reveal from bottom with blur
// ========================================

function initHeroWordAnimation() {
  const heroHeadline = document.querySelector('.hero-headline');

  if (!heroHeadline) return;

  const originalSpans = heroHeadline.querySelectorAll('span');
  const spanData = [];

  originalSpans.forEach(span => {
    const text = span.textContent.trim();
    const classes = span.className;
    const style = span.getAttribute('style');

    if (text) {
      spanData.push({ text, classes, style });
    }
  });

  heroHeadline.innerHTML = '';

  let wordIndex = 0;

  spanData.forEach(spanInfo => {
    const words = spanInfo.text.split(/\s+/);

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word;
      wordSpan.setAttribute('data-delay', wordIndex * 0.1);

      if (spanInfo.classes) {
        wordSpan.className += ' ' + spanInfo.classes;
      }
      if (spanInfo.style) {
        wordSpan.setAttribute('style', spanInfo.style);
      }

      heroHeadline.appendChild(wordSpan);
      heroHeadline.appendChild(document.createTextNode(' '));

      wordIndex++;
    });
  });

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroHeadline.classList.contains('animated')) {
        heroHeadline.classList.add('animated');

        const wordElements = heroHeadline.querySelectorAll('.word');
        wordElements.forEach(wordEl => {
          const delay = wordEl.getAttribute('data-delay');
          wordEl.style.animationDelay = `${delay}s`;
        });

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

  const originalSpans = footerCtaHeadline.querySelectorAll('span');
  const spanData = [];

  originalSpans.forEach(span => {
    const text = span.textContent.trim();
    const classes = span.className;
    const style = span.getAttribute('style');

    if (text) {
      spanData.push({ text, classes, style });
    }
  });

  footerCtaHeadline.innerHTML = '';

  let wordIndex = 0;

  spanData.forEach(spanInfo => {
    const words = spanInfo.text.split(/\s+/);

    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word;
      wordSpan.setAttribute('data-delay', wordIndex * 0.1);

      if (spanInfo.classes) {
        wordSpan.className += ' ' + spanInfo.classes;
      }
      if (spanInfo.style) {
        wordSpan.setAttribute('style', spanInfo.style);
      }

      footerCtaHeadline.appendChild(wordSpan);
      footerCtaHeadline.appendChild(document.createTextNode(' '));

      wordIndex++;
    });
  });

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !footerCtaHeadline.classList.contains('animated')) {
        footerCtaHeadline.classList.add('animated');

        const wordElements = footerCtaHeadline.querySelectorAll('.word');
        wordElements.forEach(wordEl => {
          const delay = wordEl.getAttribute('data-delay');
          wordEl.style.animationDelay = `${delay}s`;
        });

        observer.unobserve(footerCtaHeadline);
      }
    });
  }, observerOptions);

  observer.observe(footerCtaHeadline);
}

// ========================================
// TESTIMONIAL CARDS ANIMATION
// Animates cards to slide up one by one
// ========================================

function initTestimonialAnimation() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  if (testimonialCards.length === 0) return;

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    observer.observe(card);
  });
}

// ========================================
// STEP CARDS ANIMATION
// Animates step cards to fade in when visible
// ========================================

function initStepCardsAnimation() {
  const stepCards = document.querySelectorAll('.step-card');

  if (stepCards.length === 0) return;

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  stepCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// ========================================
// COMPARISON CARDS ANIMATION
// Animates comparison cards to slide in
// ========================================

function initComparisonAnimation() {
  const comparisonCards = document.querySelectorAll('.comparison-card');

  if (comparisonCards.length === 0) return;

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  comparisonCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = index === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
  });
}

// ========================================
// PRICING CARD ANIMATION
// Animates pricing card to scale in
// ========================================

function initPricingAnimation() {
  const pricingCard = document.querySelector('.pricing-card');

  if (!pricingCard) return;

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  pricingCard.style.opacity = '0';
  pricingCard.style.transform = 'scale(0.95)';
  pricingCard.style.transition = 'all 0.6s ease';
  observer.observe(pricingCard);
}

// ========================================
// RESPONSIVE NAVBAR TOGGLE
// Toggle mobile menu on button click
// ========================================

function initMobileMenu() {
  const menuButton = document.querySelector('.btn-primary-menu');
  const navbarResponsive = document.querySelector('.navbar-responsive');

  if (!menuButton || !navbarResponsive) return;

  menuButton.addEventListener('click', () => {
    navbarResponsive.classList.toggle('active');
  });

  const navLinks = navbarResponsive.querySelectorAll('li');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarResponsive.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navbarResponsive.contains(event.target);
    const isClickOnButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton && navbarResponsive.classList.contains('active')) {
      navbarResponsive.classList.remove('active');
    }
  });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// HEADER SCROLL EFFECT
// Add background on scroll
// ========================================


// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initCounterAnimation();
  initBannerWordAnimation();
  initHeroWordAnimation();
  initFooterCtaWordAnimation();
  initTestimonialAnimation();
  initStepCardsAnimation();
  initComparisonAnimation();
  initPricingAnimation();
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
});
