import React, { useRef } from "react";
import { describeEvent } from "../lib/invite";
import { useLang } from "../lib/i18n";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { MasjidScene } from "./Mughal";

/** Last page: the masjid lit up at night under a crescent moon, with the monogram and names. */
export default function Finale() {
  const root = useRef(null);
  const { W, t, locale, lang } = useLang();
  const d = describeEvent(W.event, locale);
  const [i1, i2] = W.initials;

  useGSAP(() => {
    if (reducedMotion()) return;
    const st = { trigger: root.current, start: "top 70%", once: true };
    gsap.from(".finale-inner > *", { autoAlpha: 0, y: 22, duration: 1.1, stagger: 0.18, ease: "power3.out", scrollTrigger: st });
    gsap.from(".finale .scene", { autoAlpha: 0, y: 60, duration: 1.8, ease: "power3.out", scrollTrigger: st });
    gsap.to(".finale .door-glow, .finale .rc", { opacity: 0.82, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.02, from: "random" } });
  }, { scope: root, dependencies: [lang] });

  return (
    <section className="finale" ref={root}>
      <div className="finale-inner">
        <p className="monogram" aria-hidden="true"><span>{i1}</span><i>✦</i><span>{i2}</span></p>
        <h2 className="finale-names">
          {W.groom.prefix && <small>{W.groom.prefix}</small>}
          {W.groom.name}
          <em>{W.connector}</em>
          {W.bride.name}
        </h2>
        <p className="finale-meta">{d.weekday} · {d.day} {d.month} {d.year}<br />{W.event.venue} · {W.event.address}</p>
        <p className="finale-line">{t("finaleLine")}</p>
      </div>
      <div className="scene-wrap">
        <MasjidScene p="night" night className="scene" />
      </div>
    </section>
  );
}
