import React, { useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import MusicButton from "./MusicButton";

/** Fixed top-right controls: language switch + music mute/unmute. */
export default function TopBar({ opened }) {
  const { lang, setLang, t } = useLang();
  const languageTimer = useRef(null);

  useEffect(() => () => clearTimeout(languageTimer.current), []);

  const toggleLanguage = () => {
    clearTimeout(languageTimer.current);
    languageTimer.current = setTimeout(() => {
      setLang(lang === "ur" ? "en" : "ur");
      languageTimer.current = null;
    }, 220);
  };

  return (
    <div className="topbar">
      <button className="pill-btn lang" onClick={toggleLanguage} aria-label={lang === "ur" ? "Switch to English" : "اردو میں دیکھیں"}>
        {t("langBtn")}
      </button>
      <MusicButton start={opened} />
    </div>
  );
}
