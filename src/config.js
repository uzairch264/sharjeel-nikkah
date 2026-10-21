/* =========================================================
   ✏️  EDIT EVERYTHING HERE — no need to touch any other file.
   Content taken from the printed invitation cards.
   ========================================================= */
const WEDDING = {
  // The couple — shown in this order. `prefix` is a small line above the name.
  couple: [
    { name: "Muhammad Farhan", family: "Shamshad Mughal" },
    { prefix: "Daughter of", name: "M. Akhtar Mughal", family: "Akhtar Mughal" },
  ],
  connector: "weds",
  city: "Haroonabad", // shown on the closing page

  // Hosts line on the main invitation
  hosts: "Mr. & Mrs. Shamshad Ahmed Mughal",
  hostsLine: "request the honour of your presence at the wedding ceremony of our beloved son",
  elders: "",

  // Letters on the wax seal of the gift box
  initials: "MF",

  // Shown on the no-event (announcement) version
  announcementLine: "A new beginning, InshaAllah",
  announcementSub: "Kindly keep them in your duas.",

  // Contact numbers shown (tap-to-call) in the closing section. Local format.
  rsvpContacts: [
    { name: "Zeeshan Ahmed", phone: "0304-8481466" },
    { name: "Allah Ditta" },
    { name: "Mirza Ali Asad" },
    { name: "Shazad Mughal" },
    { name: "Shahbaz Mughal" },
    { name: "M. Inam Ullah" },
  ],

  lookingForward: "All family members, relatives & friends",

  // Background music. Leave "" to use the built-in soft generated music (no file needed).
  // To use your own track: put it in public/assets/ and set e.g. "assets/music.mp3".
  music: "",

  signOff: "With love & duas — the families",

  // Events. `code` is what goes in the guest's link: ?0317 = Mehndi, ?812 = Barat, ?1554 = Walima
  // (combine them: ?0317&812, ?0317&1554, ?0317&812&1554). Names in the URL do not work.
  // Times are Pakistan Standard Time (+05:00). `start`/`end` drive the countdown and
  // calendar button (`end` is an estimate); `program` is what guests see.
  // `map`: a Google Maps link. Without `map` or `address`, the "View on map" link is hidden.
  events: {
    mehndi: {
      title: "Mehndi",
      code: "0317",
      tagline: "An evening of Rasm-e-Hina",
      blurb: "An evening of henna, colour and togetherness.",
      start: "2026-11-20T20:00:00+05:00",
      end: "2026-11-20T23:00:00+05:00",
      program: [{ label: "Rasm-e-Hina", time: "8:00 PM" }],
      venue: "Chak No. 54/4-R",
      address: "Tehsil Haroonabad",
      map: "",
    },
    barat: {
      title: "Barat",
      code: "812",
      tagline: "Sehra bandi & the departure of the barat",
      blurb: "The sehra and the happiest procession.",
      start: "2026-11-21T11:00:00+05:00",
      end: "2026-11-21T15:00:00+05:00",
      program: [{ label: "Sehra Bandi", time: "11:00 AM" }, { label: "Departure of Barat", time: "12:00 PM" }],
      venue: "Chak No. 54/4-R",
      address: "Tehsil Haroonabad",
      map: "",
    },
    walima: {
      title: "Walima",
      code: "1554",
      tagline: "Reception & Lunch",
      blurb: "A golden afternoon to bless the new beginning.",
      start: "2026-11-22T12:00:00+05:00",
      end: "2026-11-22T15:00:00+05:00",
      program: [{ label: "Reception of Guests", time: "12:00 PM" }, { label: "Lunch", time: "1:00 PM" }],
      venue: "Al-Faisal Marquee",
      address: "Dahranwala Road, Haroonabad",
      map: "",
    },
  },

  // Urdu version of every piece of text above. Same shape; anything missing falls back to English.
  ur: {
    couple: [
      { name: "محمد فرحان", family: "شمشاد مغل" },
      { prefix: "بنتِ", name: "ایم۔ اختر مغل", family: "اختر مغل" },
    ],
    connector: "کی شادی",
    city: "ہارون آباد",
    hosts: "مسٹر اینڈ مسز شمشاد احمد مغل",
    hostsLine: "اپنے لختِ جگر کی تقریبِ شادی میں آپ کی شرکت کے خواہشمند ہیں",
    announcementLine: "ایک نئے سفر کا آغاز، ان شاء اللہ",
    announcementSub: "ان کے لیے دعاؤں کی درخواست ہے۔",
    rsvpContacts: [{ name: "ذیشان احمد" }, { name: "اللہ دتہ" }, { name: "مرزا علی اسد" }, { name: "شہزاد مغل" }, { name: "شہباز مغل" }, { name: "ایم۔ انعام اللہ" }],
    lookingForward: "تمام اہلِ خانہ، رشتہ دار اور دوست احباب",
    signOff: "محبت اور دعاؤں کے ساتھ — دونوں خاندان",
    events: {
      mehndi: {
        title: "مہندی",
        tagline: "رسمِ حنا کی شام",
        blurb: "مہندی، رنگوں اور خوشیوں سے بھری ایک شام۔",
        program: [{ label: "رسمِ حنا" }],
        venue: "چک نمبر 54/4-آر",
        address: "تحصیل ہارون آباد",
      },
      barat: {
        title: "بارات",
        tagline: "سہرا بندی اور بارات کی روانگی",
        blurb: "سہرا اور خوشیوں بھرا قافلہ۔",
        program: [{ label: "سہرا بندی" }, { label: "روانگیٔ بارات" }],
        venue: "چک نمبر 54/4-آر",
        address: "تحصیل ہارون آباد",
      },
      walima: {
        title: "ولیمہ",
        tagline: "استقبالیہ اور لنچ",
        blurb: "نئی زندگی کی دعاؤں سے بھرپور ایک سنہری دوپہر۔",
        program: [{ label: "استقبالِ مہمانان" }, { label: "لنچ" }],
        venue: "الفیصل میرج ہال",
        address: "ڈاہرانوالہ روڈ، ہارون آباد",
      },
    },
  },
};

export default WEDDING;
