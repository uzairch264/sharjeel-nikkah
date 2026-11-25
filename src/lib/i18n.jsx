import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import WEDDING from "../config";

/** UI strings. People, date and venue text live in config.js (`ur` block). */
const STR = {
  en: {
    gateKicker: "You are invited to",
    gateTitle: "The Nikaah",
    giftFor: "For",
    tapHint: "Tap to open",
    heroKicker: "The Nikaah Ceremony of",
    dear: "Dear {name},",
    scrollDown: "Scroll down",
    verse: "“And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.”",
    verseRef: "Surah Ar-Rum · 30:21",
    ceremony: "The Ceremony",
    date: "Date",
    time: "Time",
    venue: "Venue",
    nikaahVenue: "Nikaah Venue",
    dinnerVenue: "Dinner Venue",
    viewMap: "View on map",
    addCal: "Add to calendar",
    countdownTo: "Counting down to the Nikaah",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    dua: "May Allah bless you both, shower His blessings upon you, and unite you in goodness.",
    finaleLine: "Your presence and your prayers will make the day complete.",
    mute: "Mute music",
    unmute: "Play music",
    langBtn: "اردو",
  },
  ur: {
    gateKicker: "آپ مدعو ہیں",
    gateTitle: "تقریبِ نکاح",
    giftFor: "برائے",
    tapHint: "کھولنے کے لیے ٹیپ کریں",
    heroKicker: "تقریبِ نکاح",
    dear: "محترم {name}،",
    scrollDown: "نیچے جائیں",
    verse: "“اور اس کی نشانیوں میں سے ہے کہ اس نے تمہارے لیے تم ہی میں سے جوڑے پیدا کیے تاکہ تم ان کے پاس سکون پاؤ، اور اس نے تمہارے درمیان محبت اور رحمت رکھ دی۔”",
    verseRef: "سورۃ الروم · 30:21",
    ceremony: "تقریب",
    date: "تاریخ",
    time: "وقت",
    venue: "مقام",
    nikaahVenue: "مقامِ نکاح",
    dinnerVenue: "مقامِ عشائیہ",
    viewMap: "نقشہ دیکھیں",
    addCal: "کیلنڈر میں شامل کریں",
    countdownTo: "نکاح میں باقی وقت",
    days: "دن", hours: "گھنٹے", minutes: "منٹ", seconds: "سیکنڈ",
    dua: "اللہ آپ دونوں کو برکت دے، آپ پر برکتیں نازل فرمائے اور آپ کو خیر میں جمع رکھے۔",
    finaleLine: "آپ کی شرکت اور دعائیں اس دن کو مکمل کریں گی۔",
    mute: "موسیقی بند کریں",
    unmute: "موسیقی چلائیں",
    langBtn: "EN",
  },
};

const merge = (base, over) => {
  if (over === undefined || over === null || over === "") return base;
  if (Array.isArray(base)) return base.map((b, i) => merge(b, over[i]));
  if (base && typeof base === "object") {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over;
};

const LangCtx = createContext(null);
export const useLang = () => useContext(LangCtx);

const initialLang = () => {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "ur" || q === "en") return q;
    const saved = window.localStorage.getItem("nikaah-lang");
    if (saved === "ur" || saved === "en") return saved;
  } catch { /* storage may be blocked */ }
  return "en";
};

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { window.localStorage.setItem("nikaah-lang", l); } catch { /* ignore */ }
  }, []);

  const value = useMemo(() => {
    const { ur, ...en } = WEDDING;
    const W = lang === "ur" ? merge(en, ur) : en;
    const t = (key, vars = {}) =>
      (STR[lang][key] ?? STR.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
    return { lang, setLang, W, t, locale: lang === "ur" ? "ur-PK" : "en-GB" };
  }, [lang, setLang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}
