// Wedding Application Logic
(function () {
  'use strict';

  const cfg = window.WEDDING_CONFIG || {};

  // DOM Elements
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelope = document.getElementById('envelope');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicLabel = document.getElementById('musicLabel');
  const scrollProgress = document.getElementById('scrollProgress');

  // Countdown elements
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  let isAudioPlaying = false;
  let audioEl = null;

  // Initialize Elements with Config
  function initContent() {
    // Monogram & Names
    document.querySelectorAll('.js-monogram').forEach(el => el.textContent = cfg.monogram || 'S & A');
    document.querySelectorAll('.js-groom').forEach(el => el.textContent = cfg.groom || 'Saurabh');
    document.querySelectorAll('.js-bride').forEach(el => el.textContent = cfg.bride || 'Abhilasha');
    document.querySelectorAll('.js-date-text').forEach(el => el.textContent = cfg.weddingDateText || '9 December 2026');
    document.querySelectorAll('.js-city').forEach(el => el.textContent = cfg.city || 'Visakhapatnam');
    document.querySelectorAll('.js-tagline').forEach(el => el.textContent = `"${cfg.tagline}"` || '"Saurabh ki Abhilasha"');
    document.querySelectorAll('.js-story').forEach(el => el.textContent = cfg.story || '');

    // WhatsApp RSVP links
    const rsvpUrl = `https://wa.me/${cfg.rsvp.phone}?text=${encodeURIComponent(cfg.rsvp.message)}`;
    document.querySelectorAll('.js-rsvp-link').forEach(el => {
      el.href = rsvpUrl;
    });

    // Render Events List (3 Events)
    renderEvents();

    // Render Family Residences (Kolkata & Visakhapatnam)
    renderResidences();

    // Setup Calendar Invite Link
    setupCalendarLink();

    // Setup Photo Switcher
    setupPhotoSwitcher();
  }

  // Render Event Cards
  function renderEvents() {
    const listEl = document.getElementById('eventsList');
    if (!listEl || !cfg.events) return;

    listEl.innerHTML = cfg.events.map((evt) => {
      const calTitle = encodeURIComponent(`${evt.name} - Saurabh & Abhilasha Wedding`);
      const calDetails = encodeURIComponent(`Dress code: ${evt.dress}. Venue: ${evt.venue}`);
      const calLoc = encodeURIComponent(evt.venue);
      const calDates = evt.date.includes('8') ? '20261208T053000Z/20261208T113000Z' : '20261209T133000Z/20261209T193000Z';
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLoc}&dates=${calDates}`;

      return `
        <article class="event-card" style="--event-accent: ${evt.themeColor || '#c9972c'};">
          <div>
            <div class="event-header">
              <span class="eyebrow">${evt.label}</span>
              <span class="event-number">${evt.number}</span>
            </div>
            <h3>${evt.name}</h3>
            <div class="event-details">
              <div class="detail-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="18" y2="10"></line>
                </svg>
                <span>${evt.date}</span>
              </div>
              <div class="detail-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${evt.time}</span>
              </div>
              <div class="detail-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${evt.venue}</span>
              </div>
            </div>
            <p class="dress-code">Dress code: ${evt.dress}</p>
          </div>
          <div class="event-actions">
            <a href="${evt.maps}" target="_blank" rel="noopener noreferrer" class="btn-map-link">
              VIEW LOCATION ↗
            </a>
            <a href="${calUrl}" target="_blank" rel="noopener noreferrer" class="btn-cal-link">
              + Add to Calendar
            </a>
          </div>
          <div class="event-watermark">✿</div>
        </article>
      `;
    }).join('');
  }

  // Render Residences
  function renderResidences() {
    const gridEl = document.getElementById('residenceGrid');
    if (!gridEl || !cfg.familyResidences) return;

    gridEl.innerHTML = cfg.familyResidences.map((res) => {
      const actionHtml = res.hasLocationBtn && res.maps ? `
        <div style="margin-top: auto;">
          <a href="${res.maps}" target="_blank" rel="noopener noreferrer" class="btn-luxury" style="padding: 12px 22px; font-size: 11px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            GET RESIDENCE DIRECTIONS
          </a>
        </div>
      ` : `
        <div style="margin-top: auto;">
          <span class="guest-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Guest Stay &amp; Hospitality
          </span>
        </div>
      `;

      return `
        <div class="residence-card">
          <div>
            <span class="eyebrow">${res.title}</span>
            <h3>${res.name}</h3>
            <p class="residence-note">${res.note}</p>
          </div>
          ${actionHtml}
        </div>
      `;
    }).join('');
  }

  // Photo Switcher Logic (Watercolour Artwork vs Original Photograph)
  function setupPhotoSwitcher() {
    const coupleImg = document.getElementById('couplePhoto');
    const btnArtistic = document.getElementById('btnShowArtistic');
    const btnOriginal = document.getElementById('btnShowOriginal');

    if (!coupleImg || !btnArtistic || !btnOriginal) return;

    btnArtistic.addEventListener('click', () => {
      btnArtistic.classList.add('active');
      btnOriginal.classList.remove('active');
      coupleImg.style.opacity = '0';
      setTimeout(() => {
        coupleImg.src = 'couple_artistic.png';
        coupleImg.style.opacity = '1';
      }, 200);
    });

    btnOriginal.addEventListener('click', () => {
      btnOriginal.classList.add('active');
      btnArtistic.classList.remove('active');
      coupleImg.style.opacity = '0';
      setTimeout(() => {
        coupleImg.src = 'couple_original.jpeg';
        coupleImg.style.opacity = '1';
      }, 200);
    });
  }

  // Setup Overall Wedding Google Calendar Link
  function setupCalendarLink() {
    const btn = document.getElementById('addToCalendarBtn');
    if (!btn) return;
    const title = encodeURIComponent("Saurabh & Abhilasha Wedding Celebration");
    const details = encodeURIComponent("Join us to celebrate the wedding festivities of Saurabh & Abhilasha in Visakhapatnam!");
    const location = encodeURIComponent("Visakhapatnam, Andhra Pradesh");
    const dates = "20261208T053000Z/20261209T183000Z";
    btn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  }

  // Countdown Calculation
  function updateCountdown() {
    const target = new Date(cfg.weddingDateISO).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
  }

  // Scroll Progress
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && scrollProgress) {
      const pct = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.height = `${pct}%`;
    }
  });

  // Confetti Animation (Golden Sparkles & Soft Petals)
  function fireConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#c9972c', '#f5e4bd', '#d99726', '#c45873', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#c9972c', '#ecd09a', '#c45873', '#ffffff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#c9972c', '#ecd09a', '#c45873', '#ffffff']
        });
      }, 250);
    }
  }

  // Play audio (Mangal Rang)
  function playMusic() {
    if (!audioEl) {
      audioEl = new Audio(cfg.musicUrl || 'music.mp3');
      audioEl.loop = true;
      audioEl.volume = 0.45;
    }
    audioEl.play().then(() => {
      isAudioPlaying = true;
      updateAudioButtonUI(true);
    }).catch((e) => {
      console.warn("Autoplay notice: ", e);
      isAudioPlaying = false;
      updateAudioButtonUI(false);
    });
  }

  function toggleMusic() {
    if (isAudioPlaying) {
      if (audioEl) audioEl.pause();
      isAudioPlaying = false;
      updateAudioButtonUI(false);
    } else {
      playMusic();
    }
  }

  function updateAudioButtonUI(playing) {
    if (!musicLabel) return;
    musicLabel.textContent = playing ? 'MUSIC ON' : 'MUSIC OFF';
    const icon = musicToggleBtn.querySelector('svg');
    if (icon) {
      icon.style.opacity = playing ? '1' : '0.5';
    }
  }

  // Envelope Opening Interaction
  function openEnvelope() {
    if (envelope.classList.contains('opened')) return;

    envelope.classList.add('opened');
    fireConfetti();
    playMusic();

    setTimeout(() => {
      envelopeScreen.classList.add('hidden');
    }, 1000);
  }

  // Theme Switcher Logic
  function setupThemeSwitcher() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeMenu = document.getElementById('themeMenu');
    if (!themeBtn || !themeMenu) return;

    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      themeMenu.classList.remove('show');
    });

    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme');
        document.body.className = selectedTheme;
        themeMenu.classList.remove('show');
      });
    });
  }

  // Event Listeners
  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  // Init
  initContent();
  setupThemeSwitcher();
  updateCountdown();
  setInterval(updateCountdown, 1000);

})();
