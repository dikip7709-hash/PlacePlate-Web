function getTemplatesUrl(query) {
  const anchor = document.querySelector('a[href*="templates-page.html"]');
  if (anchor) {
    const url = new URL(anchor.href);
    if (query) url.searchParams.set('q', query);
    return url.toString();
  }

  return 'pages/templates-page.html' + (query ? '?q=' + encodeURIComponent(query) : '');
}

function animateCounter(element) {
  const target    = parseInt(element.getAttribute('data-target'));
  const suffix    = element.getAttribute('data-suffix') || '';
  const duration  = 2000; // ms
  const increment = target / (duration / 16); // ~60fps
  let current = 0;

  const update = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  };

  update();
}

function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

function initWordReveal(selector) {
  const headline = document.querySelector(selector);
  if (!headline) return;

  const originalSpans = headline.querySelectorAll('span');
  const spanData = [];
  originalSpans.forEach(span => {
    const text = span.textContent.trim();
    if (text) spanData.push({
      text,
      classes: span.className,
      style: span.getAttribute('style')
    });
  });

  headline.innerHTML = '';
  let wordIndex = 0;

  spanData.forEach(spanInfo => {
    spanInfo.text.split(/\s+/).forEach(word => {
      const wordSpan = document.createElement('span');

      wordSpan.className = 'word ' + (spanInfo.classes || '');
      wordSpan.textContent = word;
      wordSpan.setAttribute('data-delay', wordIndex * 0.1);
      if (spanInfo.style) wordSpan.setAttribute('style', spanInfo.style);
      headline.appendChild(wordSpan);
      headline.appendChild(document.createTextNode(' '));
      wordIndex++;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !headline.classList.contains('animated')) {
        headline.classList.add('animated');

        headline.querySelectorAll('.word').forEach(el => {
          el.style.animationDelay = el.getAttribute('data-delay') + 's';
        });
        observer.unobserve(headline); // hanya animasi sekali
      }
    });
  }, { threshold: 0.3 });

  observer.observe(headline);
}

function initTestimonialAnimation() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.15}s`;
    observer.observe(card);
  });
}

function initBundleAnimation() {
  const cards = document.querySelectorAll('.bundle-card');
  if (!cards.length) return;

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

function initMobileMenu() {
  const menuBtn   = document.querySelector('.btn-primary-menu');
  const mobileNav = document.querySelector('.navbar-responsive');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileNav.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mobileNav.querySelectorAll('li:not(.mobile-search-row)').forEach(li => {
    li.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header') && !e.target.closest('.navbar-responsive')) {
      mobileNav.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function initNavSearch() {
  const wrap   = document.getElementById('navSearchWrap');
  const input  = document.getElementById('navSearchInline');
  const popup  = document.getElementById('navSearchPopup');

  if (input && popup) {

    input.addEventListener('focus', () => popup.removeAttribute('hidden'));
    input.addEventListener('input', () => popup.removeAttribute('hidden'));

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        location.href = getTemplatesUrl(input.value.trim());
      }
      if (e.key === 'Escape') {
        popup.setAttribute('hidden', '');
        input.blur();
      }
    });

    document.addEventListener('click', e => {
      if (wrap && !wrap.contains(e.target)) popup.setAttribute('hidden', '');
    });

    popup.querySelectorAll('.popup-hint').forEach(btn => {
      btn.addEventListener('click', () => {
        location.href = getTemplatesUrl(btn.dataset.query);
      });
    });
  }

  const mobileInput = document.getElementById('mobileSearchInput');
  if (mobileInput) {
    mobileInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && mobileInput.value.trim()) {
        location.href = getTemplatesUrl(mobileInput.value.trim());
      }
    });
  }
}

function applyLanguage(lang) {

  if (typeof TRANSLATIONS === 'undefined') return;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

function initLanguageSwitcher() {
  const currentLang = localStorage.getItem('pp_lang') || 'en';

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);

    btn.addEventListener('click', () => {
      localStorage.setItem('pp_lang', btn.getAttribute('data-lang'));
      location.reload();
    });
  });
}

function initYoutubeFacade() {
  document.querySelectorAll('.yt-facade').forEach(facade => {
    function loadVideo() {
      const id     = facade.dataset.id;
      const iframe = document.createElement('iframe');
      iframe.src           = `https://www.youtube.com/embed/${id}?autoplay=1`;
      iframe.allow         = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title         = facade.querySelector('img')?.alt || 'Video preview';
      facade.innerHTML     = '';
      facade.appendChild(iframe);
    }

    facade.addEventListener('click', loadVideo);

    facade.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(); }
    });
  });
}

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

function initStripCardAnimation() {
  const cards = document.querySelectorAll('.strip-card');
  if (!cards.length) return;

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

function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards  = document.querySelectorAll('.blog-card');
  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      blogCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

function initBlogCardAnimation() {
  const cards = document.querySelectorAll('.blog-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
    observer.observe(card);
  });
}

function initFaqAccordion() {

  const tabs   = document.querySelectorAll('.faq-tab');
  const groups = document.querySelectorAll('.faq-group');
  if (!tabs.length || !groups.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      groups.forEach(group => {
        group.classList.toggle('hidden', group.dataset.group !== target);
      });
    });
  });

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;

      const isOpen = item.classList.contains('open');

      item.closest('.faq-group')?.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initContactForm() {
  if (typeof emailjs === 'undefined') return;

  const EMAILJS_CONFIG = {
    publicKey:  'QsPsXnOnsIIDDrkCm',
    serviceID:  'service_ehuqs3n',
    templateID: 'template_wed1v0a'
  };

  emailjs.init(EMAILJS_CONFIG.publicKey);

  const form       = document.getElementById('contact-form');
  const overlay    = document.getElementById('notification-overlay');
  if (!form) return;

  const submitBtn      = form.querySelector('button[type="submit"]');
  const originalBtnTxt = submitBtn.textContent;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    emailjs.sendForm(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, this)
      .then(() => {
        form.reset();
        if (overlay) {
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      })
      .catch(() => {
        alert('Failed to send. Please try again or contact us via WhatsApp.');
      })
      .finally(() => {
        submitBtn.disabled    = false;
        submitBtn.textContent = originalBtnTxt;
      });
  });

  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

var _catalogState = { perPage: 12, currentPage: 1, activeCards: [] };

function _showPage(page, cards) {
  var state = _catalogState;
  if (cards !== undefined) state.activeCards = cards;
  var total      = state.activeCards.length;
  var totalPages = Math.max(1, Math.ceil(total / state.perPage));
  state.currentPage = Math.min(Math.max(1, page), totalPages);

  var start = (state.currentPage - 1) * state.perPage;
  var end   = start + state.perPage;

  document.querySelectorAll('.tpl-card').forEach(function(c) {
    c.style.display = 'none';
    c.style.transitionDelay = '';
    c.classList.remove('visible');
  });

  state.activeCards.slice(start, end).forEach(function(card, i) {
    card.style.display = '';
    card.style.transitionDelay = (i * 0.07) + 's';
    requestAnimationFrame(function() { requestAnimationFrame(function() { card.classList.add('visible'); }); });
  });

  var countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = total + ' template' + (total !== 1 ? 's' : '');

  var emptyState = document.getElementById('emptyState');
  if (emptyState) emptyState.hidden = total > 0;

  _renderPagination(state.currentPage, totalPages);

  if (page !== 1 || cards !== undefined) {
    var catalog = document.getElementById('catalog');
    if (catalog) catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function _renderPagination(page, totalPages) {
  var bar  = document.getElementById('paginationBar');
  var nums = document.getElementById('pageNumbers');
  var prev = document.getElementById('pagePrev');
  var next = document.getElementById('pageNext');
  if (!bar) return;

  bar.hidden    = totalPages <= 1;
  prev.disabled = page <= 1;
  next.disabled = page >= totalPages;
  nums.innerHTML = '';

  var rangeStart = Math.max(1, page - 2);
  var rangeEnd   = Math.min(totalPages, rangeStart + 4);
  if (rangeEnd - rangeStart < 4) rangeStart = Math.max(1, rangeEnd - 4);

  if (rangeStart > 1) { _appendPageBtn(nums, 1, page); if (rangeStart > 2) _appendEllipsis(nums); }
  for (var i = rangeStart; i <= rangeEnd; i++) _appendPageBtn(nums, i, page);
  if (rangeEnd < totalPages) { if (rangeEnd < totalPages - 1) _appendEllipsis(nums); _appendPageBtn(nums, totalPages, page); }
}

function _appendPageBtn(container, n, current) {
  var btn = document.createElement('button');
  btn.className = 'page-num' + (n === current ? ' active' : '');
  btn.textContent = n;
  btn.setAttribute('aria-current', n === current ? 'page' : 'false');
  btn.addEventListener('click', function() { _showPage(n); });
  container.appendChild(btn);
}

function _appendEllipsis(container) {
  var span = document.createElement('span');
  span.className = 'page-ellipsis';
  span.textContent = '…';
  container.appendChild(span);
}

function _initCatalogPagination() {
  var prev = document.getElementById('pagePrev');
  var next = document.getElementById('pageNext');
  if (!prev || !next) return;
  prev.addEventListener('click', function() { _showPage(_catalogState.currentPage - 1); });
  next.addEventListener('click', function() { _showPage(_catalogState.currentPage + 1); });
}

function _initCatalogFilter() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var allCards   = Array.from(document.querySelectorAll('.tpl-card'));
  if (!filterBtns.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var matching = filter === 'all' ? allCards.slice() : allCards.filter(function(c) { return c.getAttribute('data-category') === filter; });
      _showPage(1, matching);
    });
  });
}

function _initCatalogSort() {
  var sortSelect = document.getElementById('sortSelect');
  var grid       = document.getElementById('templateGrid');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', function() {
    var value  = sortSelect.value;
    var sorted = _catalogState.activeCards.slice().sort(function(a, b) {
      if (value === 'popular') return (b.getAttribute('data-popular') === 'true' ? 1 : 0) - (a.getAttribute('data-popular') === 'true' ? 1 : 0);
      return Number(a.getAttribute('data-order')) - Number(b.getAttribute('data-order'));
    });
    sorted.forEach(function(c) { grid.appendChild(c); });
    _showPage(1, sorted);
  });
}

function _applySearch(query) {
  var allCards    = Array.from(document.querySelectorAll('.tpl-card'));
  var banner      = document.getElementById('searchResultsBanner');
  var bannerText  = document.getElementById('searchResultsText');
  var searchInput = document.getElementById('catalogSearchInput');
  var clearBtn    = document.getElementById('catalogSearchClear');

  var q = query.trim().toLowerCase();
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  var allFilter = document.querySelector('.filter-btn[data-filter="all"]');
  if (allFilter) allFilter.classList.add('active');

  var genericTerms = ['powerpoint', 'ppt', 'slide', 'slides', 'template', 'morph'];
  var isGeneric = genericTerms.indexOf(q) !== -1;
  var matching  = !q ? allCards.slice() : allCards.filter(function(card) {
    var nameEl   = card.querySelector('.tpl-name');
    var name     = nameEl ? nameEl.textContent.toLowerCase() : '';
    var category = (card.getAttribute('data-category') || '').toLowerCase();
    return isGeneric || name.includes(q) || category.includes(q);
  });

  if (searchInput) searchInput.value = query;
  if (clearBtn)    clearBtn.hidden   = !query;

  if (query && banner && bannerText) {
    banner.hidden     = false;
    bannerText.innerHTML = 'Showing <strong>' + matching.length + '</strong> result' + (matching.length !== 1 ? 's' : '') + ' for "<strong>' + query + '</strong>"';
  } else if (banner) {
    banner.hidden = true;
  }
  _showPage(1, matching);
}

function _clearSearchResults() {
  var allCards    = Array.from(document.querySelectorAll('.tpl-card'));
  var banner      = document.getElementById('searchResultsBanner');
  var searchInput = document.getElementById('catalogSearchInput');
  var clearBtn    = document.getElementById('catalogSearchClear');
  if (banner)      banner.hidden      = true;
  if (searchInput) searchInput.value  = '';
  if (clearBtn)    clearBtn.hidden    = true;
  history.replaceState(null, '', window.location.pathname);
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  var allFilter = document.querySelector('.filter-btn[data-filter="all"]');
  if (allFilter) allFilter.classList.add('active');
  _showPage(1, allCards);
}

function _initCatalogSearch() {
  var input          = document.getElementById('catalogSearchInput');
  var clearBtn       = document.getElementById('catalogSearchClear');
  var bannerClearBtn = document.getElementById('searchResultsClear');
  if (!input) return;

  input.addEventListener('input', function() {
    var q = input.value.trim();
    if (clearBtn) clearBtn.hidden = !q;
    if (q) {
      _applySearch(q);
    } else {
      _clearSearchResults();
    }
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && input.value.trim()) {
      history.replaceState(null, '', '?q=' + encodeURIComponent(input.value.trim()));
    }
    if (e.key === 'Escape') _clearSearchResults();
  });
  if (clearBtn)       clearBtn.addEventListener('click', _clearSearchResults);
  if (bannerClearBtn) bannerClearBtn.addEventListener('click', _clearSearchResults);
}

function _initUrlSearch() {
  var params = new URLSearchParams(window.location.search);
  var q      = params.get('q');
  if (q) _applySearch(decodeURIComponent(q));
}

function _initCatalogPaymentModal() {
  var overlay = document.getElementById('paymentOverlay');
  if (!overlay) return;
  var closeBtn = document.getElementById('paymentClose');
  function closeModal() { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });
}

function _initStickyBar() {
  var bar = document.getElementById('catalogBar');
  if (!bar) return;
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;pointer-events:none';
  bar.parentElement.insertBefore(sentinel, bar);
  new IntersectionObserver(
    function(entries) { bar.classList.toggle('is-stuck', !entries[0].isIntersecting); },
    { threshold: 1, rootMargin: '-73px 0px 0px 0px' }
  ).observe(sentinel);
}

function initTemplateCatalog() {
  var grid = document.getElementById('templateGrid');
  if (!grid) return;

  var allCards = Array.from(document.querySelectorAll('.tpl-card'));
  allCards.forEach(function(card) {
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });
  _catalogState.activeCards = allCards;
  _showPage(1);
  _initCatalogPagination();
  _initCatalogFilter();
  _initCatalogSort();
  _initCatalogSearch();
  _initUrlSearch();
  _initCatalogPaymentModal();
  _initStickyBar();
}

function injectCryptoPayment(overlay) {
  var modal = overlay.querySelector('.payment-modal');
  if (!modal || modal.querySelector('.payment-btn-crypto')) return;

  var cryptoBtn = document.createElement('a');
  cryptoBtn.href = '#';
  cryptoBtn.className = 'payment-btn payment-btn-crypto';
  cryptoBtn.setAttribute('role', 'button');
  cryptoBtn.innerHTML =
    '<span class="payment-btn-icon" style="background:#f0b90b">₿</span>' +
    '<span class="payment-btn-name">Crypto (USDT · BNB Smart Chain)</span>' +
    '<svg class="payment-btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none">' +
    '<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var cryptoPanel = document.createElement('div');
  cryptoPanel.className = 'crypto-info-panel';
  cryptoPanel.innerHTML =
    '<button class="crypto-back-btn" aria-label="Back to payment options">' +
      '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 4L6 10l7 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      'Back' +
    '</button>' +
    '<p class="crypto-panel-title">Crypto Payment</p>' +
    '<p class="crypto-panel-sub">Send USDT via BNB Smart Chain (BEP20)</p>' +
    '<div class="crypto-field">' +
      '<span class="crypto-field-label">Binance ID</span>' +
      '<div class="crypto-field-row">' +
        '<code class="crypto-code">1195308983</code>' +
        '<button class="crypto-copy-btn" data-copy="1195308983">Copy</button>' +
      '</div>' +
    '</div>' +
    '<div class="crypto-field">' +
      '<span class="crypto-field-label">USDT Address (BEP20)</span>' +
      '<div class="crypto-field-row">' +
        '<code class="crypto-code crypto-addr">0xa109c733aa75E4c52f4D8DDA68E08eD2456110f7</code>' +
        '<button class="crypto-copy-btn" data-copy="0xa109c733aa75E4c52f4D8DDA68E08eD2456110f7">Copy</button>' +
      '</div>' +
    '</div>' +
    '<p class="crypto-note">Please send the payment and share the transaction proof once completed. We will send you the template immediately after payment.</p>';

  var footnote = modal.querySelector('.payment-footnote');
  modal.insertBefore(cryptoBtn, footnote || null);
  modal.appendChild(cryptoPanel);

  cryptoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('showing-crypto');
  });

  cryptoPanel.querySelector('.crypto-back-btn').addEventListener('click', function() {
    modal.classList.remove('showing-crypto');
  });

  cryptoPanel.querySelectorAll('.crypto-copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var text = btn.getAttribute('data-copy');
      var original = btn.textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = original; }, 2000);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = original; }, 2000);
      }
    });
  });
}

function initProductPage() {
  var mainWrap = document.getElementById('galleryMainWrap');
  if (!mainWrap) return;

  document.querySelectorAll('.thumb-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var mainImg = document.getElementById('galleryMain');
      document.querySelectorAll('.thumb-item').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var existing = mainWrap.querySelector('iframe');
      if (existing) existing.remove();

      if (btn.classList.contains('thumb-video')) {
        var videoId = btn.getAttribute('data-video-id');
        mainImg.style.display = 'none';
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:17px;';
        mainWrap.appendChild(iframe);
      } else {
        mainImg.style.display = '';
        mainImg.classList.add('switching');
        setTimeout(function() {
          mainImg.src = btn.getAttribute('data-src');
          mainImg.classList.remove('switching');
        }, 200);
      }
    });
  });

  var overlay  = document.getElementById('paymentOverlay');
  if (!overlay) return;
  var closeBtn = document.getElementById('paymentClose');
  var buyBtn   = document.getElementById('productBuyBtn');
  var relBtns  = document.querySelectorAll('.rel-tpl-btn');
  var modal    = overlay.querySelector('.payment-modal');

  function openProductModal() {
    if (modal) modal.classList.remove('showing-crypto');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeProductModal() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  if (buyBtn)   buyBtn.addEventListener('click', openProductModal);
  relBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); openProductModal(); });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeProductModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeProductModal(); });

  injectCryptoPayment(overlay);
}

document.addEventListener('DOMContentLoaded', () => {

  applyLanguage(localStorage.getItem('pp_lang') || 'en');

  initCounterAnimation();
  initWordReveal('.hero-headline');
  initWordReveal('.banner-title');
  initWordReveal('.footer-cta-headline');
  initTestimonialAnimation();
  initBundleAnimation();
  initMobileMenu();
  initNavSearch();
  initLanguageSwitcher();
  initYoutubeFacade();
  initStarRatingAccessibility();
  initStripCardAnimation();
  initBlogFilter();
  initBlogCardAnimation();
  initFaqAccordion();
  initContactForm();
  initTemplateCatalog();
  initProductPage();
});
