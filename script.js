/**
 * ============================================================================
 * Madhumitha S. - Next-Gen Interactive Portfolio Engine
 * - Interactive Particle Constellation Ambient Canvas
 * - 3D Perspective Card Tilt & Mouse Spotlight Sheen
 * - Animated Numbers Counter (CGPA & Scores)
 * - Dynamic Typewriter with Syntax Highlighting
 * - Interactive Recruiter Terminal Tabs
 * - Skill Matrix Category Filter
 * - Active Navigation Scroll Spy
 * - Modal System, Toast Notifications, & Contact Form
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Ambient Particle Constellation Canvas
  // --------------------------------------------------------------------------
  function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 65);
    const colors = [
      'rgba(0, 242, 254, ',
      'rgba(139, 92, 246, ',
      'rgba(236, 72, 153, ',
      'rgba(59, 130, 246, '
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }

      draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = (dx / dist) * force * this.density * 0.4;
            const dirY = (dy / dist) * force * this.density * 0.4;
            this.x -= dirX;
            this.y -= dirY;
          }
        }
      }
    }

    function createParticles() {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connect() {
      const maxDist = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function animate() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
        connect();
      }
      requestAnimationFrame(animate);
    }

    createParticles();
    animate();
  }

  // --------------------------------------------------------------------------
  // 2. Mouse Spotlight & 3D Perspective Tilt on Cards
  // --------------------------------------------------------------------------
  function initSpotlightAndTilt() {
    const cards = document.querySelectorAll('.spotlight-box, .featured-project-card, .skill-card');

    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt for larger cards
        if (card.classList.contains('featured-project-card') || card.classList.contains('bento-card-story')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        }
      });

      card.addEventListener('pointerleave', () => {
        if (card.classList.contains('featured-project-card') || card.classList.contains('bento-card-story')) {
          card.style.transform = '';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Typewriter Subtitle Effect
  // --------------------------------------------------------------------------
  const typewriterText = document.getElementById('typewriterText');
  const roles = [
    'Full Stack Engineer',
    'React & Python Developer',
    '3rd-Year CSE Undergrad @ KSRCE',
    'Geospatial & Web App Builder',
    'Open for Internships 2026'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    if (!typewriterText) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // --------------------------------------------------------------------------
  // 4. Interactive Recruiter Terminal
  // --------------------------------------------------------------------------
  const codeRender = document.getElementById('codeRender');
  const termTabBtns = document.querySelectorAll('.term-tab-btn');

  const terminalData = {
    profile: `{
  <span class="code-prop">"candidate"</span>: <span class="code-str">"Madhumitha S."</span>,
  <span class="code-prop">"role"</span>: <span class="code-str">"Full Stack Web Developer &amp; CSE Undergrad"</span>,
  <span class="code-prop">"college"</span>: <span class="code-str">"K.S.R. College of Engineering, Tiruchengode"</span>,
  <span class="code-prop">"degree"</span>: <span class="code-str">"B.E. Computer Science &amp; Engineering"</span>,
  <span class="code-prop">"current_cgpa"</span>: <span class="code-num">8.023</span>,
  <span class="code-prop">"hsc_percentage"</span>: <span class="code-str">"84.00%"</span>,
  <span class="code-prop">"graduation_year"</span>: <span class="code-num">2026</span>,
  <span class="code-prop">"hometown"</span>: <span class="code-str">"Tiruppur, Tamil Nadu"</span>,
  <span class="code-prop">"email"</span>: <span class="code-str">"madhumithas2231@gmail.com"</span>,
  <span class="code-prop">"phone"</span>: <span class="code-str">"+91 76038 52702"</span>,
  <span class="code-prop">"placement_status"</span>: <span class="code-str">"✨ Ready for Summer / Placement Internships"</span>
}`,
    stack: `<span class="code-keyword">interface</span> <span class="code-prop">MadhumithaTechStack</span> {
  frontend: [<span class="code-str">"HTML5"</span>, <span class="code-str">"CSS3 / Glassmorphism"</span>, <span class="code-str">"JavaScript ES6+"</span>, <span class="code-str">"React.js"</span>];
  backend: [<span class="code-str">"Python"</span>, <span class="code-str">"REST APIs"</span>];
  database: [<span class="code-str">"MySQL"</span>, <span class="code-str">"Relational Normalization"</span>];
  libraries: [<span class="code-str">"Leaflet.js Geospatial"</span>, <span class="code-str">"Tailwind CSS"</span>];
  tools: [<span class="code-str">"Git"</span>, <span class="code-str">"GitHub"</span>, <span class="code-str">"Vercel Cloud"</span>, <span class="code-str">"VS Code"</span>];
  coreCS: [<span class="code-str">"Data Structures"</span>, <span class="code-str">"Algorithms"</span>, <span class="code-str">"OOP Principles"</span>, <span class="code-str">"DBMS"</span>];
}`,
    pitch: `<span class="code-comment">#!/bin/bash</span>
<span class="code-comment"># Recruiter Quick Evaluation: Why hire Madhumitha S.?</span>

<span class="code-keyword">echo</span> <span class="code-str">"1. Proven Academic Consistency:"</span>
<span class="code-keyword">echo</span> <span class="code-str">"   - 8.023 CGPA in B.E. Computer Science; 84% in HSC Science stream."</span>

<span class="code-keyword">echo</span> <span class="code-str">"2. Deployed Production Projects (Not Just Tutorials):"</span>
<span class="code-keyword">echo</span> <span class="code-str">"   - MoneyMate: Live React expense &amp; budget engine on Vercel."</span>
<span class="code-keyword">echo</span> <span class="code-str">"   - AI-IDR: Dead Reckoning inertial telemetry navigation on GitHub Pages."</span>

<span class="code-keyword">echo</span> <span class="code-str">"3. Work Ethic &amp; Team Culture:"</span>
<span class="code-keyword">echo</span> <span class="code-str">"   - Fast learner, clean UI architect, and eager to drive high-impact outcomes!"</span>

<span class="code-keyword">echo</span> <span class="code-str">"Ready for immediate technical interviews &amp; coding assessments!"</span>`
  };

  function setTerminalTab(tabKey) {
    if (!codeRender) return;
    codeRender.innerHTML = terminalData[tabKey] || terminalData.profile;

    termTabBtns.forEach((btn) => {
      const active = btn.getAttribute('data-tab') === tabKey;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  termTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      setTerminalTab(tab);
    });
  });

  // --------------------------------------------------------------------------
  // 5. Skills Category Tab Filter
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. Theme Toggle (Cosmic Dark / Quartz Light)
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'madhumitha_portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlEl = document.documentElement;

  function getActiveTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  applyTheme(getActiveTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --------------------------------------------------------------------------
  // 8. Navbar Scroll State & Active Scroll Spy
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill-link');

  function onScroll() {
    const scrollY = window.pageYOffset;

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 25);
    }

    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navItem = document.querySelector(`.nav-pill-link[href*="#${id}"]`);

      if (navItem) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((l) => l.classList.remove('active'));
          navItem.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --------------------------------------------------------------------------
  // 9. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Copy Email Utility & Toast Notification
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotice = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastNotice || !toastMsg) return;
    toastMsg.textContent = msg;
    toastNotice.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-copy') || 'madhumithas2231@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const temp = document.createElement('input');
          temp.value = email;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }
        showToast('Email address copied to clipboard!');
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => { copyEmailBtn.textContent = 'Copy'; }, 2000);
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. Contact Form Handler
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('userName')?.value || '').trim();
      const email = (document.getElementById('userEmail')?.value || '').trim();
      const message = (document.getElementById('userMessage')?.value || '').trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback-toast error';
        formFeedback.textContent = 'Please provide your name, email, and message.';
        return;
      }

      if (!emailRegex.test(email)) {
        formFeedback.className = 'form-feedback-toast error';
        formFeedback.textContent = 'Please enter a valid email address.';
        return;
      }

      formFeedback.className = 'form-feedback-toast success';
      formFeedback.innerHTML = `
        <strong>Thank you, ${escapeHtml(name)}!</strong><br>
        Your inquiry has been received. Madhumitha will respond to <em>${escapeHtml(email)}</em> promptly.
      `;
      showToast('Message sent successfully!');
      contactForm.reset();
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // --------------------------------------------------------------------------
  // 12. Smooth Back to Top & Dynamic Year
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 13. Initialization
  // --------------------------------------------------------------------------
  initParticleCanvas();
  initSpotlightAndTilt();
  typeEffect();
  setTerminalTab('profile');
})();
