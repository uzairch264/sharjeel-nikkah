import React, { useRef } from "react";
import { useLang } from "../lib/i18n";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { FloralSpray } from "./Mughal";

export default function Closing() {
  const root = useRef(null);
  const { W, t } = useLang();

  useGSAP(() => {
    if (reducedMotion()) return;
    gsap.from(root.current.children, {
      autoAlpha: 0, y: 20, duration: 1, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
    });
  }, { scope: root });

  return (
    <section className="page sand closing" ref={root}>
      <svg className="closing-spray" viewBox="0 0 40 120" aria-hidden="true"><FloralSpray className="r-marble" /></svg>
      <p className="dua" lang="ar">بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
      <p className="dua-en">{t("dua")}</p>
      <p className="signoff">{W.signOff}</p>
      <p className="signoff-by">{W.signOffBy}</p>
    </section>
  );
}
