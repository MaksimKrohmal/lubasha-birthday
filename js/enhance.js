/* ═══════════════════════════════════════════════════════
   ENHANCE.JS — слой магии поверх сайта
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. Прогресс-бар прокрутки ───────────────────── */
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);
  const updateBar = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    bar.style.width = Math.min(100, Math.max(0, scrolled * 100)) + '%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar);
  updateBar();

  /* ── 2. Сердечки-курсор ──────────────────────────── */
  const isTouch = window.matchMedia('(hover: none)').matches;
  const symbols = ['❤', '💕', '✨', '🌹', '💖'];
  let lastSpawn = 0;
  if (!isTouch) {
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSpawn < 90) return;
      lastSpawn = now;
      const el = document.createElement('span');
      el.className = 'heart-trail';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.color = Math.random() > 0.5 ? '#c9637a' : '#c9a96e';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1400);
    });
  }

  /* ── 3. Лепестки роз ─────────────────────────────── */
  const petalSymbols = ['🌸', '🌹', '🍃', '✨', '❀'];
  function spawnPetal() {
    if (document.hidden) return;
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (12 + Math.random() * 14) + 'px';
    const dur = 9 + Math.random() * 9;
    el.style.animationDuration = dur + 's';
    el.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 200);
  }
  setInterval(spawnPetal, 1100);

  /* ── 4. Параллакс на hero-контент ─────────────────── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroContent.style.transform = `translateY(${y * 0.25}px)`;
        heroContent.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.8)));
      }
    }, { passive: true });
  }

  /* ── 5. Тильт на фото галереи и таймлайна ────────── */
  function attachTilt(selector, maxTilt = 8) {
    document.querySelectorAll(selector).forEach((card) => {
      card.style.transformStyle = 'preserve-3d';
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  // Запускаем после загрузки DOM
  const initTilt = () => {
    attachTilt('.gallery-item', 6);
    attachTilt('.tl-photo', 5);
    attachTilt('.spec-card', 4);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }

  /* ── 6. Click burst — взрыв сердечек ──────────────── */
  document.addEventListener('click', (e) => {
    // Игнорим клики по управляющим элементам
    const t = e.target;
    if (t.closest('button') || t.closest('input') || t.closest('a') || t.closest('video')) return;
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('span');
      el.className = 'heart-trail';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.color = Math.random() > 0.5 ? '#c9637a' : '#c9a96e';
      const angle = (Math.PI * 2 * i) / 8;
      const dist = 50 + Math.random() * 40;
      el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      el.style.animation = 'heartBurst 1s ease-out forwards';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }
  });

  // Добавляем keyframes для burst
  const style = document.createElement('style');
  style.textContent = `
    @keyframes heartBurst {
      0%   { opacity: 1; transform: translate(-50%, -50%) scale(0.6); }
      100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.4); }
    }
  `;
  document.head.appendChild(style);

  /* ── 7. Магнитные кнопки ─────────────────────────── */
  document.querySelectorAll('#audio-btn, .quiz-next-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.08)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  console.log('%c✨ Made with love · 2 700 км ❤', 'color:#c9637a;font-size:14px;font-family:serif;font-style:italic');
})();
