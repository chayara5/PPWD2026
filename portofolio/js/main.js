document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. TYPING EFFECT
  // ==========================================
  const typingText = document.getElementById('typing-text');

  if (typingText) {
    const names = ['Chabiru!', 'a Web Developer', 'an Information Systems Student', 'a UI/UX Enthusiast', 'a Tech Explorer'];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentName = names[nameIndex];

      if (isDeleting) {
        typingText.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentName.length) {
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        delay = 400;
      }

      setTimeout(typeEffect, delay);
    }

    typeEffect();
  }

  // ==========================================
  // 3. VALIDASI FORM CONTACT
  // ==========================================
  const form = document.getElementById('contact-form');

  if (form) {
    const successMsg = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      if (successMsg) successMsg.style.display = 'none';

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name === '') {
        document.getElementById('name-error').textContent = 'Nama wajib diisi.';
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        document.getElementById('email-error').textContent = 'Email wajib diisi.';
        isValid = false;
      } else if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'Format email tidak valid.';
        isValid = false;
      }

      if (message === '') {
        document.getElementById('message-error').textContent = 'Pesan wajib diisi.';
        isValid = false;
      } else if (message.length < 10) {
        document.getElementById('message-error').textContent = 'Pesan minimal 10 karakter.';
        isValid = false;
      }

      if (isValid) {
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
      }
    });
  }

  // ==========================================
  // 4. DARK / LIGHT MODE TOGGLE
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ==========================================
  // 5. SCROLL-SPY: highlight menu sesuai section aktif
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

});