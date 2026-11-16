/* =========================================================
   EDIT EVERYTHING HERE. No need to touch any other file.
   One event: the Nikaah at Badshahi Masjid, Lahore.
   ========================================================= */
const WEDDING = {
  // Hosts line, word for word from the invitation
  hosts: "Mr. and Mrs. Altaf Hussain Chaudhary",
  hostsLine: "Request the pleasure of your company at the Nikaah Ceremony of their beloved son",

  // The couple. `prefix` is a small line above the name.
  groom: { prefix: "", name: "Captain Muhammad Sharjeel Altaf" },
  connector: "with",
  bride: { name: "Sameen Shahbaz" },

  // Letters in the monogram on the last page
  initials: ["S", "S"],

  signOff: "With love & duas",
  signOffBy: "Mr. & Mrs. Altaf Hussain Chaudhary",

  // Background music. Leave "" to use the built-in soft generated music (no file needed).
  // To use your own track: put it in public/assets/ and set e.g. "assets/music.mp3".
  music: "assets/music.mp3",

  // Pakistan Standard Time (+05:00). `start`/`end` drive the countdown and the calendar button.
  event: {
    title: "Nikaah",
    start: "2026-12-19T14:00:00+05:00",
    end: "2026-12-19T16:00:00+05:00",
    time: "2:00 PM – 4:00 PM",
    venue: "Badshahi Masjid",
    address: "Lahore",
    map: "https://www.google.com/maps/search/?api=1&query=Badshahi+Mosque%2C+Lahore",
  },

  // Urdu version of the text above. Same shape; anything missing falls back to English.
  ur: {
    hosts: "جناب و بیگم الطاف حسین چوہدری",
    hostsLine: "اپنے لختِ جگر کی تقریبِ نکاح میں آپ کی شرکت کے متمنی ہیں",
    groom: { prefix: "کیپٹن", name: "محمد شرجیل الطاف" },
    connector: "ہمراہ",
    bride: { name: "ثمین شہباز" },
    signOff: "دعاؤں کے ساتھ",
    signOffBy: "جناب و بیگم الطاف حسین چوہدری",
    event: {
      title: "نکاح",
      time: "دوپہر 2 بجے تا 4 بجے",
      venue: "بادشاہی مسجد",
      address: "لاہور",
    },
  },
};

export default WEDDING;
