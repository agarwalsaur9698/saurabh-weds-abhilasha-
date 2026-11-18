# 💍 Saurabh weds Abhilasha - Luxury Wedding Invitation Website

A luxury Indian wedding invitation web app inspired by [sunaina-weds-atul.vercel.app](https://sunaina-weds-atul.vercel.app/), crafted for **Saurabh & Abhilasha**.

---

## ✨ Features Included

1. **Interactive Wax-Seal Envelope Screen**:
   - 3D envelope with personalized wax seal monogram (`S & A`).
   - "Tap to open" realistic flap-opening animation with gold & rose confetti burst.
   - Smooth transition into the main wedding invitation.

2. **Built-in Audio & Music Player**:
   - Floating glassmorphic toggle (`MUSIC ON / MUSIC OFF`).
   - Autoplays gentle ambient sound on opening the envelope.
   - Ready for your own custom MP3 (just drop `music.mp3` in the root folder).

3. **Royal Typography & Aesthetic**:
   - Regal Gold (`#cba45c`), Deep Noir Espresso (`#17120f`), and Warm Cream.
   - Fonts: *Great Vibes* (Romantic script), *Cormorant Garamond* (Serif), and *DM Sans*.
   - Live vertical golden scroll progress bar.

4. **Multi-Theme Switcher (Live Preview)**:
   - **Royal Noir & Gold** (Default luxury espresso dark theme)
   - **Imperial Ivory & Gold** (Bright daylight royal luxury)
   - **Heritage Emerald & Gold** (Deep royal velvet green)
   - **Regal Crimson & Gold** (Auspicious royal maroon & gold)

5. **Live Countdown Timer**:
   - Counts down days, hours, minutes, and seconds dynamically to **9 December 2026**.

6. **Wedding Festivities & Schedule**:
   - **Mehendi & Sangeet**: 8th Dec 2026 (Evening)
   - **Haldi Ceremony**: 9th Dec 2026 (Morning)
   - **Wedding Ceremony (Phere)**: 9th Dec 2026 (Evening Auspicious Muhurtham)
   - **Grand Reception**: 9th Dec 2026 (Night)
   - Direct **Google Maps navigation links** for Visakhapatnam venue.
   - **"+ Add to Google Calendar"** button for each event.

7. **Family Residence & Hospitality**:
   - **Merlin the One** with direct Google Maps route link for out-of-town guests.

8. **One-Tap WhatsApp RSVP**:
   - Directly launches WhatsApp to `+91 97277 37090` with pre-filled confirmation text:
     *"Hello Saurabh & Abhilasha! We would love to RSVP for your wedding celebrations on 8-9 December 2026."*

---

## 🚀 Quick Start / How to Run Locally

### Option 1: Python HTTP Server (Recommended)
Open your terminal in this directory and run:
```bash
python3 -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Double click `index.html`
You can open `index.html` directly in any web browser!

---

## 🎨 How to Customize

All texts, dates, event timings, dress codes, and links are neatly organized in **`config.js`**:
- **To change texts or times**: Edit `config.js`.
- **To add your own music**: Place your audio file as `music.mp3` in this folder.
- **To add your couple photo**: Replace the background in `styles.css` under `.hero` or add an `<img>` tag in `index.html`.

---

## 🌐 Free 1-Minute Deployment to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave settings as default (Framework Preset: *Other*) and click **Deploy**.
5. Your custom URL (e.g. `saurabh-weds-abhilasha.vercel.app`) will be live instantly with free SSL!
