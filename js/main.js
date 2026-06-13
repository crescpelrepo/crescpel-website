/* ============================================================
   CRESCPEL — Site interactions
   Mobile nav, FAQ accordion, contact form validation,
   scroll reveal, dynamic footer year.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu when a link is clicked (mobile)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on resize back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all (single-open accordion)
        items.forEach(function (other) {
          other.classList.remove('open');
          var a = other.querySelector('.faq-answer');
          var b = other.querySelector('.faq-question');
          if (a) a.style.maxHeight = null;
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  function initForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = document.getElementById('form-status');

    function setError(field, hasError) {
      field.classList.toggle('invalid', hasError);
    }

    function validateField(input) {
      var field = input.closest('.field');
      if (!field) return true;
      var value = input.value.trim();
      var valid = true;

      if (input.hasAttribute('required') && value === '') {
        valid = false;
      } else if (input.type === 'email' && value !== '') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      setError(field, !valid);
      return valid;
    }

    // Live re-validation once a field has been flagged
    form.querySelectorAll('input, textarea, select').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll('input[required], textarea[required], input[type="email"]');
      var allValid = true;
      fields.forEach(function (input) {
        if (!validateField(input)) allValid = false;
      });

      if (!allValid) {
        if (status) {
          status.textContent = 'Please correct the highlighted fields and try again.';
          status.style.background = '#fef2f2';
          status.style.borderColor = '#fecaca';
          status.style.color = '#b91c1c';
          status.classList.add('show');
        }
        return;
      }

      // No backend — simulate a successful submission.
      if (status) {
        status.textContent = 'Thank you! Your message has been sent. We’ll reply within 1–2 business days.';
        status.style.background = '';
        status.style.borderColor = '';
        status.style.color = '';
        status.classList.add('show');
      }
      form.reset();
      form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initFaq();
    initForm();
    initReveal();
    initYear();
  });
})();
