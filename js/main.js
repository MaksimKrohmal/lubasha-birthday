/* ═══════════════════════════════════════════
   LUBASHA BIRTHDAY SITE — main.js (v2)
   ═══════════════════════════════════════════ */

// ── ENVELOPE INTRO ────────────────────────
const envOverlay = document.getElementById('envelope-overlay');
const envelope   = document.getElementById('envelope');
const envCta     = document.getElementById('env-cta');

function openEnvelope() {
  envelope.classList.add('opening');
  envCta.style.opacity = '0';
  setTimeout(() => {
    envOverlay.classList.add('gone');
    // Стартуем главную музыку при первом взаимодействии
    if (!audioPlaying) {
      mainAudio.play().catch(() => {});
      audioBtn.textContent = '🎵';
      audioPlaying = true;
    }
    // Запускаем конфетти
    launchConfetti(5000);
  }, 1100);
}
envelope.addEventListener('click', openEnvelope);

// ── AUDIO ──────────────────────────────────
const mainAudio = new Audio('audio/main-bg.mp3');
const quizAudio = new Audio('audio/quiz-bg.mp3');
mainAudio.loop = true;
mainAudio.volume = 0.35;
quizAudio.loop = true;
quizAudio.volume = 0.4;

let audioPlaying = false;
const audioBtn = document.getElementById('audio-btn');

function toggleAudio() {
  if (audioPlaying) {
    mainAudio.pause();
    quizAudio.pause();
    audioBtn.textContent = '🔇';
    audioPlaying = false;
  } else {
    mainAudio.play().catch(() => {});
    audioBtn.textContent = '🎵';
    audioPlaying = true;
  }
}
audioBtn.addEventListener('click', toggleAudio);

// ── HERO SLIDER ────────────────────────────
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 6000);

// ── COUNTER ────────────────────────────────
function updateCounter() {
  const birthDate = new Date(1989, 4, 29, 13, 30, 0);
  const now = new Date();
  const diff = now - birthDate;
  const totalSecs  = Math.floor(diff / 1000);
  const totalMins  = Math.floor(totalSecs / 60);
  const totalHours = Math.floor(totalMins / 60);
  const totalDays  = Math.floor(totalHours / 24);
  const years  = Math.floor(totalDays / 365.25);
  const months = Math.floor((totalDays % 365.25) / 30.44);
  const days   = Math.floor((totalDays % 365.25) % 30.44);
  const hours  = totalHours % 24;
  const mins   = totalMins % 60;
  const secs   = totalSecs % 60;
  const fmt = (n) => String(n).padStart(2, '0');
  document.getElementById('cnt-years').textContent  = years;
  document.getElementById('cnt-months').textContent = fmt(months);
  document.getElementById('cnt-days').textContent   = fmt(days);
  document.getElementById('cnt-hours').textContent  = fmt(hours);
  document.getElementById('cnt-mins').textContent   = fmt(mins);
  document.getElementById('cnt-secs').textContent   = fmt(secs);
}
updateCounter();
setInterval(updateCounter, 1000);

// ── SCROLL REVEAL ──────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('visible');
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── TYPEWRITER LETTER ──────────────────────
const letterParagraphs = [
  'Зайка, ты сейчас далеко, в солнечной Валенсии, и между нами километры, горы, моря и пара часовых поясов.',
  'Сегодня тебе исполняется 37, но для меня ты всё та же родная, удивительная девочка, которая искренне верит в чудеса. Моя невероятная трудяжка, которая способна опоздать на самолёт, но ни за что на свете не бросит недоделанную работу. Моя любимая «потом-потом» — человек, который может откладывать до последнего, а потом взять и сделать всё лучше всех.',
  'Да, ты бываешь упрямой. Бываешь вредной. Ты целеустремлённая до безумия. И именно за это, за каждую твою чёрточку, я люблю тебя ещё сильнее. Люблю за каждое твоё ворчливое «потом», за твою сумасшедшую самоотдачу.',
  'Я безумно люблю тебя. Очень жду дома и крепко обнимаю через все эти тысячи километров.',
];

const typoMap = {
  'а':'о','о':'а','е':'и','и':'е','т':'г','г':'т','н':'м','м':'н',
  'с':'а','р':'е','к':'л','л':'к','в':'а','д':'л','у':'и','п':'р',
  'з':'х','х':'з','ь':'б','б':'ь','ю':'я','я':'ю'
};

let letterStarted = false;
function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function getTypoChar(char) {
  const lower = char.toLowerCase();
  if (typoMap[lower] && Math.random() < 0.045) {
    const typo = typoMap[lower];
    return char === char.toUpperCase() ? typo.toUpperCase() : typo;
  }
  return null;
}
function charDelay(char) {
  if (char === '.' || char === '!' || char === '?') return randomBetween(40, 80);
  if (char === ',' || char === ';' || char === '—') return randomBetween(20, 40);
  if (char === ' ') return randomBetween(5, 10);
  return randomBetween(8, 18);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeText(textEl, cursorEl, text) {
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    const typo = getTypoChar(char);
    if (typo) {
      textEl.textContent += typo;
      await sleep(randomBetween(6, 15));
      textEl.textContent = textEl.textContent.slice(0, -1);
      await sleep(randomBetween(3, 6));
      await sleep(randomBetween(4, 10));
    }
    textEl.textContent += char;
    await sleep(charDelay(char));
    i++;
  }
}

async function startTypewriterLetter() {
  if (letterStarted) return;
  letterStarted = true;
  const paragraphIds = ['letter-p1','letter-p2','letter-p3','letter-p4','letter-p5'];
  for (let i = 0; i < letterParagraphs.length; i++) {
    const p = document.getElementById(paragraphIds[i]);
    const textEl   = p.querySelector('.tw-text');
    const cursorEl = p.querySelector('.tw-cursor');
    p.style.display = 'block';
    cursorEl.style.display = 'inline';
    await typeText(textEl, cursorEl, letterParagraphs[i]);
    await sleep(randomBetween(13, 20));
    if (i < letterParagraphs.length - 1) cursorEl.style.display = 'none';
  }
  await sleep(833);
  const lastCursor = document.querySelector('#letter-p5 .tw-cursor');
  if (lastCursor) lastCursor.style.display = 'none';
  const sign = document.getElementById('letter-sign');
  sign.style.transition = 'opacity 1.2s ease';
  sign.style.opacity = '1';
  await sleep(333);
  document.getElementById('distance-badge-wrap').style.opacity = '1';
}

const letterSection = document.getElementById('letter');
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(startTypewriterLetter, 400);
      letterObserver.disconnect();
    }
  });
}, { threshold: 0.25 });
letterObserver.observe(letterSection);

// ── PARTICLES ──────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const SYMBOLS = ['❤', '🌸', '✨', '🌹', '💕'];
const particles = [];
class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : -30;
    this.size = Math.random() * 14 + 8;
    this.speedY = Math.random() * 1.2 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.4 + 0.15;
    this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.angleSpeed;
    if (this.y > canvas.height + 30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillText(this.symbol, 0, 0);
    ctx.restore();
  }
}
for (let i = 0; i < 30; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── CONFETTI ───────────────────────────────
const confettiCanvas = document.getElementById('confetti-canvas');
const cctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiBits = [];
let confettiActive = false;

function launchConfetti(duration = 4000) {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiActive = true;
  confettiBits = [];
  const colors = ['#c9637a','#c9a96e','#e8a0b0','#e8d5b0','#fff','#f7c6d0','#a03050'];
  for (let i = 0; i < 180; i++) {
    confettiBits.push({
      x: Math.random() * confettiCanvas.width,
      y: -20,
      w: Math.random() * 12 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 3,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.15,
      opacity: 1,
    });
  }
  setTimeout(() => { confettiActive = false; }, duration);
  animateConfetti();
}
function animateConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiBits.forEach(c => {
    c.y += c.speedY;
    c.x += c.speedX;
    c.angle += c.angleSpeed;
    if (c.y > confettiCanvas.height - 100) c.opacity -= 0.02;
    if (c.opacity <= 0) return;
    cctx.save();
    cctx.globalAlpha = Math.max(0, c.opacity);
    cctx.translate(c.x, c.y);
    cctx.rotate(c.angle);
    cctx.fillStyle = c.color;
    cctx.fillRect(-c.w/2, -c.h/2, c.w, c.h);
    cctx.restore();
  });
  if (confettiActive || confettiBits.some(c => c.opacity > 0)) {
    requestAnimationFrame(animateConfetti);
  } else {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// ── PETAL FALL on reason card flip ─────────
const PETALS = ['🌹','🌸','💕','❤'];
const petalLayer = document.getElementById('petal-layer');
function spawnPetals(originEl) {
  const rect = originEl.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    p.style.left = (startX + (Math.random() - 0.5) * 60) + 'px';
    p.style.top  = startY + 'px';
    const dx = ((Math.random() - 0.5) * 200) + 'px';
    const rot = (Math.random() * 720 - 360) + 'deg';
    const dur = (2 + Math.random() * 2) + 's';
    p.style.setProperty('--dx', dx);
    p.style.setProperty('--rot', rot);
    p.style.animationDuration = dur;
    p.style.fontSize = (16 + Math.random() * 12) + 'px';
    petalLayer.appendChild(p);
    setTimeout(() => p.remove(), 4500);
  }
}
window.spawnPetals = spawnPetals;

// ── ROTATING CALL BUTTON SUBTITLE ──────────
const callSubtitles = [
  'Одно спасибо — и я уже счастлив',
  'Жду как никогда',
  'Люблю тебя ❤',
  'Целую ❤',
  'Обнимаю ❤'
];
let callIdx = 0;
const callSubEl = document.getElementById('call-btn-sub');
if (callSubEl) {
  setInterval(() => {
    callSubEl.style.opacity = '0';
    setTimeout(() => {
      callIdx = (callIdx + 1) % callSubtitles.length;
      callSubEl.textContent = callSubtitles[callIdx];
      callSubEl.style.opacity = '1';
    }, 500);
  }, 3500);
}

// ── CAPSULE (time capsule) ─────────────────
const CAPSULE_KEY = 'lubasha-capsule-v1';
const capsuleForm   = document.getElementById('capsule-form');
const capsuleLocked = document.getElementById('capsule-locked');
const capsuleOpen   = document.getElementById('capsule-open');
const capsuleInput  = document.getElementById('capsule-input');
const capsuleSave   = document.getElementById('capsule-save');
const capsuleReset  = document.getElementById('capsule-reset');
const capsuleMsgEl  = document.getElementById('capsule-message');
const capsuleMeta   = document.getElementById('capsule-locked-meta');

function showCapsuleState() {
  const raw = localStorage.getItem(CAPSULE_KEY);
  capsuleForm.style.display   = 'none';
  capsuleLocked.classList.remove('show');
  capsuleOpen.classList.remove('show');

  if (!raw) {
    capsuleForm.style.display = 'block';
    return;
  }
  try {
    const data = JSON.parse(raw);
    const openDate = new Date(data.openAt);
    if (Date.now() >= data.openAt) {
      capsuleMsgEl.textContent = data.text;
      capsuleOpen.classList.add('show');
    } else {
      const d = openDate.toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' });
      capsuleMeta.textContent = `Откроется ${d}`;
      capsuleLocked.classList.add('show');
    }
  } catch {
    capsuleForm.style.display = 'block';
  }
}
capsuleSave.addEventListener('click', () => {
  const text = capsuleInput.value.trim();
  if (!text) {
    capsuleInput.focus();
    capsuleInput.style.borderColor = 'var(--rose)';
    return;
  }
  const openAt = Date.now() + 365 * 24 * 60 * 60 * 1000;
  localStorage.setItem(CAPSULE_KEY, JSON.stringify({ text, openAt, sealedAt: Date.now() }));
  showCapsuleState();
  launchConfetti(2500);
});
capsuleReset.addEventListener('click', () => {
  if (confirm('Переписать желание? Старое исчезнет.')) {
    localStorage.removeItem(CAPSULE_KEY);
    showCapsuleState();
  }
});
showCapsuleState();

// ── QUIZ ───────────────────────────────────
const quizData = [
  {
    q: "Сколько чашек кофе — это «нормально»?",
    options: ["Одна, я слежу за собой", "Две — утром и после обеда", "Сколько налито — столько и выпито"],
    correct: 2,
    feedback: "☕ Именно! Кофе не считают — его просто пьют."
  },
  {
    q: "Ты заходишь в магазин «просто посмотреть». Что происходит?",
    options: ["Выхожу с тем, зачем пришла", "Беру одну лишнюю мелочь", "Выхожу с новой посудой, которая «была нужна»"],
    correct: 2,
    feedback: "🛍 Посуда сама себя не купит! И она действительно была нужна."
  },
  {
    q: "До встречи 20 минут. Ты...",
    options: ["Уже на месте, жду", "Выхожу прямо сейчас", "Только крашусь — успею"],
    correct: 2,
    feedback: "💄 Опоздать красиво — тоже искусство!"
  },
  {
    q: "Еда должна быть:",
    options: ["Нежной и лёгкой", "Сытной и домашней", "Острой. Очень острой. Ещё острее"],
    correct: 2,
    feedback: "🌶 Муж страдает, но молчит. Потому что любит."
  },
  {
    q: "Что означает фраза «потом-потом»?",
    options: ["Я займусь этим прямо сейчас", "Это вообще не важно", "Я это сделаю в самый последний момент"],
    correct: 2,
    feedback: "😄 Потом-потом — это целая философия жизни!"
  },
  {
    q: "Что важнее самолёта?",
    options: ["Ничего, самолёт ждать не будет", "Укроп, петрушка, грибы... и работа", "Красивый маникюр перед вылетом"],
    correct: 1,
    feedback: "✈️ Самолёт подождёт. Укроп — нет."
  },
  {
    q: "Сколько часов в сутки Люба сидит в Instagram?",
    options: ["Я не сижу в Instagram 20 часов в сутки", "Ну... иногда", "Постоянно, это моя работа"],
    correct: 0,
    feedback: "📱 Конечно! Это вообще не Instagram, это... исследование рынка."
  },
  {
    q: "Каков главный жизненный принцип Любы?",
    options: ["Всё что ни делается — к лучшему", "Живи и давай жить другим", "Всруся, но не покорюся"],
    correct: 2,
    feedback: "💪 Это не просто принцип — это суперсила!"
  },
  // Бонусный — все правильные
  {
    q: "БОНУС: кто здесь самая красивая, самая любимая и самая-самая?",
    options: ["Я. Конечно я.", "Кто бы сомневался — я.", "Ну а кто ещё, как не я?"],
    correct: -1, // любой ответ
    feedback: "💕 Правильно! Ты вообще всегда права."
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

const quizQuestionEl   = document.getElementById('quiz-question');
const quizOptionsEl    = document.getElementById('quiz-options');
const quizFeedbackEl   = document.getElementById('quiz-feedback');
const quizNextBtn      = document.getElementById('quiz-next');
const quizProgressBar  = document.getElementById('quiz-progress');
const quizQNum         = document.getElementById('quiz-q-num');
const quizContent      = document.getElementById('quiz-content');
const quizResult       = document.getElementById('quiz-result');
const quizVideoReveal  = document.getElementById('quiz-video-reveal');

function loadQuestion() {
  answered = false;
  const q = quizData[currentQ];
  quizQNum.textContent = `Вопрос ${currentQ + 1} из ${quizData.length}`;
  quizQuestionEl.textContent = q.q;
  quizFeedbackEl.textContent = '';
  quizNextBtn.classList.remove('show');
  quizProgressBar.style.width = `${(currentQ / quizData.length) * 100}%`;

  quizOptionsEl.innerHTML = '';
  const letters = ['А', 'Б', 'В'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${opt}`;
    btn.addEventListener('click', () => selectOption(i, btn));
    quizOptionsEl.appendChild(btn);
  });
}

function selectOption(idx, btn) {
  if (answered) return;
  answered = true;
  const q = quizData[currentQ];
  const allBtns = quizOptionsEl.querySelectorAll('.quiz-option');
  allBtns.forEach(b => b.classList.add('disabled'));

  if (q.correct === -1) {
    // Бонус: любой ответ верный
    btn.classList.add('correct');
    score++;
    quizFeedbackEl.textContent = q.feedback;
  } else if (idx === q.correct) {
    btn.classList.add('correct');
    score++;
    quizFeedbackEl.textContent = q.feedback;
  } else {
    btn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    quizFeedbackEl.textContent = '😅 Почти... но нет! Правильный ответ выделен.';
  }
  quizNextBtn.classList.add('show');
}

quizNextBtn.addEventListener('click', () => {
  currentQ++;
  if (currentQ < quizData.length) loadQuestion();
  else showResult();
});

function showResult() {
  quizProgressBar.style.width = '100%';
  quizContent.style.display = 'none';
  quizResult.classList.add('show');
  const pct = score / quizData.length;
  let emoji, title, diagnosis;
  if (pct === 1) {
    emoji = '🏆'; title = 'Идеально!';
    diagnosis = 'Высшая степень самосознания с примесью кофейной зависимости.';
  } else if (pct >= 0.7) {
    emoji = '🌹'; title = 'Ты очень хорошо знаешь себя!';
    diagnosis = 'Умеренное самопознание при хроническом синдроме «Потом-потом».';
  } else if (pct >= 0.5) {
    emoji = '☕'; title = 'Ты знаешь себя... примерно!';
    diagnosis = 'Возможно, часть ответов откладывалась на потом?';
  } else {
    emoji = '😄'; title = 'Себя познать сложнее всего!';
    diagnosis = 'Загадочная личность. Даже ты сама — тайна.';
  }
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-diagnosis').textContent = diagnosis;
  document.getElementById('result-score').textContent = `Правильных ответов: ${score} из ${quizData.length}`;
  launchConfetti(5000);
  quizAudio.pause();
  quizAudio.currentTime = 0;
  if (audioPlaying) mainAudio.play().catch(() => {});
  setTimeout(() => quizVideoReveal.classList.add('show'), 1500);
}

const quizSection = document.getElementById('quiz');
const quizObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && audioPlaying) {
      mainAudio.pause();
      quizAudio.play().catch(() => {});
    } else if (!e.isIntersecting && audioPlaying) {
      quizAudio.pause();
      mainAudio.play().catch(() => {});
    }
  });
}, { threshold: 0.5 });
quizObserver.observe(quizSection);

loadQuestion();


// ── PLAYLIST PLAYER ────────────────────────
const plAudio   = document.getElementById('playlist-audio');
const plBtns    = document.querySelectorAll('.track-play');
const plTracks  = document.querySelectorAll('.track[data-src]');
let   plCurrent = -1;

function plStop() {
  plAudio.pause();
  plAudio.currentTime = 0;
  plBtns.forEach(b => { b.textContent = '▶'; b.classList.remove('playing'); });
  plTracks.forEach(t => t.classList.remove('active'));
  plCurrent = -1;
}

function plPlay(idx) {
  const src = plTracks[idx].dataset.src;
  if (plCurrent === idx) {
    if (plAudio.paused) {
      plAudio.play().catch(() => {});
      plBtns[idx].textContent = '⏸';
      plBtns[idx].classList.add('playing');
    } else {
      plAudio.pause();
      plBtns[idx].textContent = '▶';
      plBtns[idx].classList.remove('playing');
    }
    return;
  }
  plStop();
  plCurrent = idx;
  mainAudio.pause();
  quizAudio.pause();
  plAudio.src = src;
  plAudio.volume = 0.85;
  plAudio.play().catch(() => {});
  plBtns[idx].textContent = '⏸';
  plBtns[idx].classList.add('playing');
  plTracks[idx].classList.add('active');
}

plAudio.addEventListener('ended', () => {
  const next = plCurrent + 1;
  if (next < plTracks.length) {
    plPlay(next);
  } else {
    plStop();
    if (audioPlaying) mainAudio.play().catch(() => {});
  }
});

plBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    plPlay(i);
  });
});
