import React, { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { useLang } from "../lib/i18n";
import { ArchCard, Divider, Rosette } from "./Mughal";

/** Bismillah, Ar-Rum 30:21 and the formal invitation, on a marble mihrab panel. */
export default function Invitation() {
  const root = useRef(null);
  const { W, t } = useLang();

  useGSAP(() => {
    if (reducedMotion()) return;
    const st = { trigger: root.current, start: "top 75%", once: true };
    gsap.from(".arch-card", { autoAlpha: 0, y: 50, duration: 1.4, ease: "power3.out", scrollTrigger: st });
    gsap.from(".arch-body > *", {
      autoAlpha: 0, y: 18, duration: 1, stagger: 0.12, delay: 0.4, ease: "power3.out", scrollTrigger: st,
    });
  }, { scope: root });

  return (
    <section className="page sand invitation" id="invitation" ref={root}>
      <ArchCard tone="marble">
        <svg className="card-rosette" viewBox="-20 -20 40 40" aria-hidden="true"><Rosette r={18} className="r-sand" /></svg>
        <p className="bismillah" lang="ar">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        <p className="verse-en">{t("verse")}</p>
        <p className="verse-ref">{t("verseRef")}</p>
        <Divider />
        <p className="hosts">{W.hosts}</p>
        <p className="hosts-line">{W.hostsLine}</p>
        {W.groom.prefix && <p className="inv-prefix">{W.groom.prefix}</p>}
        <p className="inv-name">{W.groom.name}</p>
        <p className="inv-with">{W.connector}</p>
        <p className="inv-name">{W.bride.name}</p>
      </ArchCard>
    </section>
  );
}
