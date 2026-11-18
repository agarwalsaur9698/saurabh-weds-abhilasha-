// Wedding Website Configuration
// Customized for Saurabh & Abhilasha

window.WEDDING_CONFIG = {
  // Couple Information
  groom: "Saurabh",
  bride: "Abhilasha",
  monogram: "S & A",
  tagline: "Saurabh ki Abhilasha",
  introQuote: "Two hearts, one lifelong adventure",
  story: "With the love and blessings of our parents and families, we joyfully invite you to celebrate the wedding festivities of Saurabh and Abhilasha. Your presence, love, and blessings will make our special days truly unforgettable.",
  
  // Date and Main Location
  weddingDateISO: "2026-12-09T19:00:00+05:30",
  weddingDateText: "Wednesday, 9 December 2026",
  city: "Visakhapatnam, Andhra Pradesh",
  mainVenueMapsUrl: "https://maps.app.goo.gl/fgjNGMJme6YNEHjG8",

  // Music Settings
  // "Mangal Rang" by A.R. Rahman, sung by Arijit Singh & Shreya Ghoshal
  // Trimmed to start right from the joyful chorus: "ये तेरा-मेरा रंग है, रंग है, मंगल रंग है"
  musicUrl: "music.mp3",
  musicTitle: "Mangal Rang - A.R. Rahman",

  // Schedule of Events (3 Events: Mehendi & Sangeet, Haldi, Wedding Ceremony)
  events: [
    {
      id: "mehendi-sangeet",
      number: "01",
      label: "A NIGHT OF MUSIC, DANCE & MEHENDI",
      name: "Mehendi & Sangeet",
      date: "Tuesday, 8 December 2026",
      time: "11:00 AM onwards",
      venue: "Wedding Venue, Visakhapatnam",
      dress: "Festive Glam & Indo-Western",
      themeColor: "#2e7d5e", // Festive Mehndi / Emerald accent
      maps: "https://maps.app.goo.gl/fgjNGMJme6YNEHjG8"
    },
    {
      id: "haldi",
      number: "02",
      label: "SUNSHINE & MARIGOLD BLESSINGS",
      name: "Haldi Ceremony",
      date: "Wednesday, 9 December 2026",
      time: "10:00 AM onwards",
      venue: "Wedding Venue, Visakhapatnam",
      dress: "Sunshine Yellow & Traditional Festive",
      themeColor: "#d99726", // Warm Marigold Gold
      maps: "https://maps.app.goo.gl/fgjNGMJme6YNEHjG8"
    },
    {
      id: "wedding",
      number: "03",
      label: "THE SACRED UNION & PHERE",
      name: "Wedding Ceremony",
      date: "Wednesday, 9 December 2026",
      time: "7:00 PM onwards (Auspicious Muhurtham)",
      venue: "Wedding Venue, Visakhapatnam",
      dress: "Royal Traditional Indian Attire",
      themeColor: "#b24343", // Regal Vermilion / Ruby
      maps: "https://maps.app.goo.gl/fgjNGMJme6YNEHjG8"
    }
  ],

  // Family Residences & Hospitality (Kolkata & Visakhapatnam)
  familyResidences: [
    {
      title: "Family Residence (Kolkata)",
      name: "Merlin the One, Kolkata",
      note: "Family home & hospitality in Kolkata.",
      maps: "https://maps.app.goo.gl/uoFAp9ynkmee6ghy5",
      hasLocationBtn: true
    },
    {
      title: "Guest Accommodation (Visakhapatnam)",
      name: "Rambhaka Towers, Visakhapatnam",
      note: "Welcoming out-of-town guests and family to join us in Visakhapatnam.",
      maps: null,
      hasLocationBtn: false
    }
  ],

  // RSVP details
  rsvp: {
    phone: "919727737090",
    displayPhone: "+91 97277 37090",
    message: "Hello Saurabh & Abhilasha! We would love to RSVP for your wedding celebrations on 8-9 December 2026 in Visakhapatnam."
  }
};
