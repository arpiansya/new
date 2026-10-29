// ==========================================
// ⚙️ KONFIGURASI NAMA & PESAN KASIH SAYANG
// ==========================================
const CONFIG = {
  crushName: "Princess Hylu",                // Nama panggilan pasangan
  senderName: "KEBO KESAYANGANNYA HYLU",     // Nama kamu / identitas pengirim
  whatsappNumber: "628982616165",           // Nomor WhatsApp kamu (08982616165 -> 628982616165)
  musicUrl: "music.mp3",                     // File lagu MP3 kamu (letakkan lagu di folder yang sama) atau link audio URL
  whatsappMessage: "Halo sayangku! ❤️ Makasih banyak ya buat web dan pesan indahnya, aku terharu banget... Princess Hylu juga sayang banget sama kamu! 👑💖 Peluk erat dari jauh! 🫂",
  quotes: [
    "Satu pelukan paling hangat khusus untukmu, Princess Hylu... 🫂👑",
    "Semoga senyuman manismu selalu bersinar menyinari hari-hariku ✨",
    "Terima kasih sudah selalu menjadi alasan aku tersenyum dan bersemangat setiap hari 😊",
    "Kapan pun kamu lelah, ingat ya aku selalu ada menjadi tempat pulang ternyamanmu 🏡❤️",
    "Princess Hylu jauh lebih berharga, cantik, dan kuat dari yang kamu bayangkan 🌸",
    "Rasa sayangku kepadamu sudah melampaui batas, tak terhitung lagi! ♾️👑💖"
  ],
  boosters: {
    tired: {
      icon: "🌧️",
      title: "Saat Harimu Terasa Melelahkan",
      desc: "Tarik napas perlahan ya sayang... Kamu sudah berjuang sangat hebat hari ini. Istirahatlah sejenak dan jangan merasa harus memikul semuanya sendirian. Ada aku di sini yang selalu siap mendengarkan, memeluk, dan menampung semua lelahmu. 🫂❤️"
    },
    miss: {
      icon: "💭",
      title: "Saat Kamu Merasa Rindu",
      desc: "Pejamkan matamu sejenak dan rasakan kehangatannya. Walaupun raga kadang terhalang jarak, hatiku tidak pernah sedetik pun beranjak darimu. Namamu selalu mengalir di setiap hembusan doaku. 💖"
    },
    doubt: {
      icon: "🥺",
      title: "Saat Hatimu Ragu / Cemas",
      desc: "Ingatlah sayang, di mataku kamu adalah sosok yang begitu indah, tangguh, dan sangat berharga. Kamu tidak perlu menjadi sempurna untuk kucintai. Aku menyayangimu seutuhnya, apa adanya. 👑✨"
    },
    happy: {
      icon: "☀️",
      title: "Saat Hatimu Sedang Bahagia",
      desc: "Melihatmu tersenyum lepas dan bahagia adalah anugerah terindah bagiku. Nikmati hari indahmu ini ya Princess, dan aku akan selalu berusaha menjaga agar senyuman manismu tidak pernah pudar! 🥰🌸"
    }
  }
};

// ==========================================
// MANAJEMEN TAHAPAN (8 STEPS)
// ==========================================
let currentStep = 1;
const totalSteps = 8;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Terapkan Nama ke Seluruh Elemen
  document.querySelectorAll(".crush-name").forEach(el => el.textContent = CONFIG.crushName);
  document.querySelectorAll(".sender-name").forEach(el => el.textContent = CONFIG.senderName);

  // Link WhatsApp dengan encode pesan manis
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  const waBtn = document.getElementById("waButton");
  if (waBtn) waBtn.href = waUrl;

  // Background Floating Hearts & Icons
  initFloatingHearts();

  // Web Audio Synthesizer (Lofi & SFX)
  setupAudio();

  // Inisialisasi Navigasi Step
  setupStepNavigations();

  // Inisialisasi Mood Booster Tabs
  setupMoodBooster();

  // Inisialisasi Virtual Hug / Love Meter
  setupVirtualHug();

  // Update progress awal
  updateProgress(1);
});

// ==========================================
// 1. BACKGROUND FLOATING HEARTS & ICONS
// ==========================================
function initFloatingHearts() {
  const container = document.getElementById("heartBg");
  const heartSymbols = ["❤️", "👑", "💖", "🌸", "✨", "🫂", "💕"];

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 95 + "vw";
    heart.style.fontSize = (Math.random() * 18 + 14) + "px";
    heart.style.animationDuration = (Math.random() * 5 + 6) + "s";
    heart.style.opacity = Math.random() * 0.6 + 0.3;

    container.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 11000);
  }

  for (let i = 0; i < 16; i++) {
    setTimeout(createHeart, i * 380);
  }
  setInterval(createHeart, 850);
}

// ==========================================
// 2. AUDIO SYNTHESIZER (ROMANTIC LOFI & CHIMES)
// ==========================================
let audioCtx = null;
let isMusicPlaying = false;
let bgMusicInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration = 0.5, type = 'sine', gainVal = 0.08) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playChime() {
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.4, 'triangle', 0.09), i * 80);
  });
}

function playPop() {
  playTone(880, 0.15, 'sine', 0.07);
}

// Melodi lembut arpeggio romantis berulang
const romanticProgression = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [196.00, 246.94, 293.66, 349.23]  // G7
];

function startRomanticLofi() {
  let chordIndex = 0;
  let noteIndex = 0;

  bgMusicInterval = setInterval(() => {
    if (!isMusicPlaying) return;
    const currentChord = romanticProgression[chordIndex];
    const freq = currentChord[noteIndex];
    playTone(freq, 0.9, 'sine', 0.06);

    noteIndex++;
    if (noteIndex >= currentChord.length) {
      noteIndex = 0;
      chordIndex = (chordIndex + 1) % romanticProgression.length;
    }
  }, 480);
}

function stopRomanticLofi() {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

function setupAudio() {
  const musicBtn = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const bgAudio = document.getElementById("bgMusic");

  if (CONFIG.musicUrl && bgAudio) {
    bgAudio.src = CONFIG.musicUrl;
  }

  function startMusic() {
    isMusicPlaying = true;
    musicBtn.classList.add("playing");
    musicIcon.textContent = "🎵";

    if (CONFIG.musicUrl && bgAudio) {
      bgAudio.play().then(() => {
        stopRomanticLofi();
      }).catch(() => {
        startRomanticLofi();
      });
    } else {
      startRomanticLofi();
    }
  }

  function pauseMusic() {
    isMusicPlaying = false;
    musicBtn.classList.remove("playing");
    musicIcon.textContent = "🔇";

    if (bgAudio) {
      bgAudio.pause();
    }
    stopRomanticLofi();
  }

  musicBtn.addEventListener("click", () => {
    getAudioContext();
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  });

  if (bgAudio) {
    bgAudio.addEventListener("error", () => {
      if (isMusicPlaying) {
        startRomanticLofi();
      }
    });
  }
}

// ==========================================
// 3. STEP PROGRESSION & TRANSITIONS
// ==========================================
function updateProgress(stepNum) {
  const progressFill = document.getElementById("progressFill");
  const stepBadge = document.getElementById("stepBadge");
  const pct = (stepNum / totalSteps) * 100;
  progressFill.style.width = `${pct}%`;
  stepBadge.textContent = `${stepNum} / ${totalSteps}`;
}

function goToStep(targetStep) {
  if (targetStep < 1 || targetStep > totalSteps) return;

  playChime();
  const currentCard = document.getElementById(`step${currentStep}`);
  const targetCard = document.getElementById(`step${targetStep}`);

  currentCard.style.opacity = '0';
  currentCard.style.transform = 'translateY(-20px) scale(0.96)';

  setTimeout(() => {
    currentCard.classList.remove("active");
    targetCard.classList.add("active");
    currentStep = targetStep;
    updateProgress(currentStep);

    setTimeout(() => {
      targetCard.style.opacity = '1';
      targetCard.style.transform = 'translateY(0) scale(1)';
    }, 50);

    // Sampai di tahap akhir (Step 8): luncurkan konfeti meriah!
    if (currentStep === 8) {
      triggerConfetti();
    }
  }, 350);
}

function setupStepNavigations() {
  // Step 1: Amplop Pembuka
  const btnOpenLetter = document.getElementById("btnOpenLetter");
  const envelope = document.getElementById("envelope");
  const envelopeWrapper = document.getElementById("envelopeWrapper");

  function openLetterAction() {
    envelope.classList.add("open");
    playChime();
    if (!isMusicPlaying) {
      const musicBtn = document.getElementById("musicToggle");
      musicBtn.click();
    }
    setTimeout(() => {
      goToStep(2);
    }, 900);
  }

  btnOpenLetter.addEventListener("click", openLetterAction);
  envelopeWrapper.addEventListener("click", openLetterAction);

  // Navigasi Next & Prev
  document.querySelectorAll(".card").forEach((card, index) => {
    const stepNum = index + 1;
    const btnNext = card.querySelector(".btn-next");
    const btnPrev = card.querySelector(".btn-prev");

    if (btnNext) {
      btnNext.addEventListener("click", () => goToStep(stepNum + 1));
    }
    if (btnPrev) {
      btnPrev.addEventListener("click", () => goToStep(stepNum - 1));
    }
  });

  // Replay Button (Step 8 -> Step 1)
  const btnReplay = document.getElementById("btnReplay");
  if (btnReplay) {
    btnReplay.addEventListener("click", () => {
      envelope.classList.remove("open");
      resetHugMeter();
      goToStep(1);
    });
  }
}

// ==========================================
// 4. MOOD BOOSTER TABS (STEP 4)
// ==========================================
function setupMoodBooster() {
  const tabs = document.querySelectorAll(".pill-tab");
  const iconEl = document.getElementById("boosterIcon");
  const titleEl = document.getElementById("boosterTitle");
  const descEl = document.getElementById("boosterDesc");
  const displayBox = document.getElementById("boosterDisplay");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      playPop();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const pillKey = tab.dataset.pill;
      const data = CONFIG.boosters[pillKey];

      displayBox.style.opacity = '0';
      displayBox.style.transform = 'scale(0.96)';

      setTimeout(() => {
        iconEl.textContent = data.icon;
        titleEl.textContent = data.title;
        descEl.textContent = `"${data.desc}"`;

        displayBox.style.opacity = '1';
        displayBox.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

// ==========================================
// 5. VIRTUAL HUG & LOVE METER (STEP 5)
// ==========================================
let lovePercentage = 25;
let quoteIdx = 0;

function resetHugMeter() {
  lovePercentage = 25;
  const meterBar = document.getElementById("meterBar");
  const meterLabel = document.getElementById("meterLabel");
  const quoteEl = document.getElementById("sweetQuote");

  meterBar.style.width = "25%";
  meterLabel.textContent = "Kasih Sayang: 25%";
  quoteEl.textContent = `"${CONFIG.quotes[0]}"`;
}

function setupVirtualHug() {
  const btnHug = document.getElementById("btnHug");
  const meterBar = document.getElementById("meterBar");
  const meterLabel = document.getElementById("meterLabel");
  const quoteEl = document.getElementById("sweetQuote");

  btnHug.addEventListener("click", (e) => {
    playChime();

    // Naikkan persentase kasih sayang
    lovePercentage += 25;
    const displayWidth = Math.min(lovePercentage, 100);
    meterBar.style.width = `${displayWidth}%`;

    if (lovePercentage <= 100) {
      meterLabel.textContent = `Kasih Sayang: ${lovePercentage}%`;
    } else if (lovePercentage <= 500) {
      meterLabel.textContent = `Meluap: ${lovePercentage}%! 💖`;
    } else {
      meterLabel.textContent = `Kasih Sayang: Tak Terhingga! ♾️👑❤️`;
    }

    // Pergantian kutipan manis
    quoteIdx = (quoteIdx + 1) % CONFIG.quotes.length;
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = `"${CONFIG.quotes[quoteIdx]}"`;
      quoteEl.style.opacity = '1';
    }, 200);

    // Letupan hati & mahkota kecil dari kursor/sentuhan
    createMiniHearts(e.clientX || (window.innerWidth / 2), e.clientY || (window.innerHeight / 2));
  });
}

function createMiniHearts(x, y) {
  const icons = ["❤️", "👑", "🌸", "✨", "💖"];
  for (let i = 0; i < 6; i++) {
    const mini = document.createElement("div");
    mini.textContent = icons[Math.floor(Math.random() * icons.length)];
    mini.style.position = "fixed";
    mini.style.left = `${x}px`;
    mini.style.top = `${y}px`;
    mini.style.fontSize = "1.3rem";
    mini.style.pointerEvents = "none";
    mini.style.zIndex = "999";
    mini.style.transition = "all 0.8s ease-out";

    document.body.appendChild(mini);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 80 + 40;
    const destX = Math.cos(angle) * dist;
    const destY = Math.sin(angle) * dist;

    setTimeout(() => {
      mini.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
      mini.style.opacity = "0";
    }, 20);

    setTimeout(() => mini.remove(), 850);
  }
}

// ==========================================
// 6. CONFETTI CELEBRATION (STEP 8)
// ==========================================
function triggerConfetti() {
  if (typeof confetti !== "function") return;

  playChime();

  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.6 },
    colors: ['#e63946', '#ff758f', '#ffccd5', '#ffb703', '#ffffff']
  });

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e63946', '#ff758f', '#ffccd5', '#ffd166']
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#e63946', '#ff758f', '#ffccd5', '#ffd166']
    });
  }, 350);
}
