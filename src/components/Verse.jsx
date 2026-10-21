import React, { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { useLang } from "../lib/i18n";
import { ColumnArt } from "./Embroidery";

export default function Verse({ events }) {
  const root = useRef(null);
  const { W, t, num, lang } = useLang();
  const [a, b] = W.couple;
  const n = events.length;
  const line = n === 1
    ? t("homesOne", { title: W.events[events[0]].title })
    : t("homesMany", { n: num(n) });

  useGSAP(() => {
    if (reducedMotion()) return;
    const from = (targets, trigger, extra = {}) => gsap.from(targets, {
      autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.16, ease: "power3.out",
      scrollTrigger: { trigger, start: "top 78%", once: true }, ...extra,
    });
    from(".verse-core > *", ".verse-top");
    from(".col", ".verse-top", { y: 0, stagger: 0.1, duration: 1.6 });
    from(".verse-bottom > *", ".verse-bottom");
  }, { scope: root, dependencies: [lang] });

  return (
    <section className="page verse" id="together" ref={root}>
      <div className="verse-top">
        <ColumnArt className="col col--l" />
        <ColumnArt className="col col--r" />
        <div className="verse-core">
          <p className="kicker">{t("inTheName")}</p>
          <p className="bismillah" lang="ar">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          <p className="verse-en">{t("verse")}</p>
          <p className="verse-ref">{t("verseRef")}</p>
        </div>
      </div>
      <div className="verse-bottom">
        <p className="verse-hosts"><b>{W.hosts}</b><br />{W.hostsLine}</p>
        <span className="rule" aria-hidden="true" />
        <p className="verse-line">{line}</p>
        <div className="families">
          <div><b>{a.family}</b><small>{t("family")}</small></div>
          <i aria-hidden="true" />
          <div><b>{b.family}</b><small>{t("family")}</small></div>
        </div>
      </div>
    </section>
  );
}
