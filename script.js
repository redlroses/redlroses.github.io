/**
 * Evgeny Batenkov — Engineering Portfolio
 * Theme & Language Controller
 */

(function () {
  'use strict';

  // --- Theme Controller ---
  const themeToggle = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (_) {}
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || getPreferredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  // --- Language Controller ---
  const langButtons = document.querySelectorAll('.lang-btn');

  function getPreferredLanguage() {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved === 'ru' || saved === 'en') {
      return saved;
    }
    // Default to Russian for Russian browser/locale or RU priority
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('portfolio-lang', lang);
    } catch (_) {}

    // Update browser tab title
    document.title = lang === 'en'
      ? 'Evgeny Batenkov — Unity / XR Developer & Software Engineer'
      : 'Евгений Батенков — Unity / XR Developer & Software Engineer';

    langButtons.forEach((btn) => {
      const choice = btn.getAttribute('data-lang-choice');
      btn.classList.toggle('active', choice === lang);
      btn.setAttribute('aria-pressed', choice === lang ? 'true' : 'false');
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-lang-choice');
      if (choice) {
        applyLanguage(choice);
      }
    });
  });

  // Initialize Language
  const initialLang = getPreferredLanguage();
  applyLanguage(initialLang);
})();
