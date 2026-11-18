// Wedding Application Logic
(function () {
  'use strict';

  const cfg = window.WEDDING_CONFIG || {};

  // DOM Elements
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelope = document.getElementById('envelope');
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
    document.querySelectorAll('.js-tagline').forEach(el => el.textContent = cfg.tagline || '#SaurabhKiAbhilasha');
    document.querySelectorAll('.js-story').forEach(el => el.textContent = cfg.story || '');

    // WhatsApp RSVP links
    const rsvpUrl = `https://wa.me/${cfg.rsvp.phone}?text=${encodeURIComponent(cfg.rsvp.message)}`;
    document.querySelectorAll('.js-rsvp-link').forEach(el => {
      el.href = rsvpUrl;
    });

    // Render Events List (4 Separate Boxes with Timings & Dress Codes)
    renderEvents();

    // Render Accommodations & Residences
    renderAccommodations();

    // Setup Calendar Invite Link
    setupCalendarLink();
  }

  // Render Event Cards (4 Events with Dress Code)
  function renderEvents() {
    const listEl = document.getElementById('eventsList');
    if (!listEl || !cfg.events) return;

    listEl.innerHTML = cfg.events.map((evt) => {
      const calTitle = encodeURIComponent(`${evt.name} - Saurabh & Abhilasha Wedding`);
      const calDetails = encodeURIComponent(`Dress code: ${evt.dress}. Venue: ${evt.venue}`);
      const calLoc = encodeURIComponent(evt.venue);
      const calDates = evt.date.includes('8') ? '20261208T050000Z/20261208T113000Z' : '20261209T120000Z/20261209T180000Z';
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
                <span style="font-weight: 600; color: #2c1b12;">${evt.time}</span>
              </div>
              <div class="detail-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${evt.venue}</span>
              </div>
            </div>
            <p class="dress-code">Dress code: <strong>${evt.dress}</strong></p>
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

  // Render Accommodations & Residences (Clean titles, no notes)
  function renderAccommodations() {
    const gridEl = document.getElementById('residenceGrid');
    if (!gridEl || !cfg.accommodations) return;

    gridEl.innerHTML = cfg.accommodations.map((acc) => {
      const locationsHtml = acc.locations.map((loc) => {
        const mapBtn = loc.maps ? `
          <div style="margin-top: 12px;">
            <a href="${loc.maps}" target="_blank" rel="noopener noreferrer" class="btn-luxury" style="padding: 10px 20px; font-size: 11px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              GET DIRECTIONS
            </a>
          </div>
        ` : '';

        return `
          <div class="residence-location-item" style="padding: 16px 0; border-bottom: 1px dashed rgba(201, 151, 44, 0.25);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <h3 style="font-family: var(--font-serif); font-size: 24px; font-weight: 500; margin: 0; color: var(--text-main);">
                ${loc.name}
              </h3>
            </div>
            ${mapBtn}
          </div>
        `;
      }).join('');

      return `
        <div class="residence-card" style="padding: 32px 28px;">
          <div>
            <span class="eyebrow" style="color: var(--gold-dark);">${acc.categoryTitle}</span>
            <div style="margin-top: 14px;">
              ${locationsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Setup Overall Wedding Google Calendar Link
  function setupCalendarLink() {
    const btn = document.getElementById('addToCalendarBtn');
    if (!btn) return;
    const title = encodeURIComponent("Saurabh & Abhilasha Wedding Celebration");
    const details = encodeURIComponent("Join us to celebrate the wedding festivities of Saurabh & Abhilasha at Casa Beach Front, Bheemli, Visakhapatnam!");
    const location = encodeURIComponent("Casa Beach Front, Bheemli, Visakhapatnam");
    const dates = "20261208T050000Z/20261209T180000Z";
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

  // Play audio (Mangal Rang - Always On)
  function playMusic() {
    if (!audioEl) {
      audioEl = new Audio(cfg.musicUrl || 'music.mp3');
      audioEl.loop = true;
      audioEl.volume = 0.5;
    }
    audioEl.play().then(() => {
      isAudioPlaying = true;
    }).catch((e) => {
      console.warn("Autoplay notice: ", e);
      document.body.addEventListener('click', function resume() {
        if (audioEl) audioEl.play();
        document.body.removeEventListener('click', resume);
      }, { once: true });
    });
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

  // Event Listeners
  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
  }

  // Init
  initContent();
  updateCountdown();
  setInterval(updateCountdown, 1000);

})();
