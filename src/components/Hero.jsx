import React, { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { useLang } from "../lib/i18n";
import { describeEvent } from "../lib/invite";
import Chars from "./Chars";
import { MasjidScene, Divider } from "./Mughal";

export default function Hero({ opened, guest }) {
  const root = useRef(null);
  const { W, t, lang, locale } = useLang();
  const d = describeEvent(W.event, locale);

  useGSAP(() => {
    const items = ".greeting, .kicker, .name-prefix, .amp, .hero-div, .hero-meta, .scroll-pill, .names .ch";
    if (!opened) { gsap.set([items, ".scene"].join(","), { autoAlpha: 0 }); return; }
    if (reducedMotion()) { gsap.set([items, ".scene"].join(","), { autoAlpha: 1 }); return; }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".scene", { autoAlpha: 0, y: 50, scale: 1.04 }, { autoAlpha: 1, y: 0, scale: 1, duration: 2.4, transformOrigin: "50% 100%" }, 0.2)
      .fromTo(".greeting, .kicker", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.15 }, 0.9)
      .fromTo(".name-prefix", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.2)
      .fromTo(".name--a .ch", { autoAlpha: 0, y: 26, rotate: -4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1, stagger: 0.04 }, 1.3)
      .fromTo(".amp", { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(2)" }, 2)
      .fromTo(".name--b .ch", { autoAlpha: 0, y: 26, rotate: 4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1, stagger: 0.05 }, 2.2)
      .fromTo(".hero-div", { autoAlpha: 0, scaleX: 0.2 }, { autoAlpha: 1, scaleX: 1, duration: 1 }, 2.8)
      .fromTo(".hero-meta", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1 }, 3)
      .fromTo(".scroll-pill", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 3.5);

    // pigeons lift off from the domes and wheel away across the sky
    gsap.utils.toArray(".bird").forEach((b, i) => {
      const dir = i % 2 ? 1 : -1;
      gsap.to(b.querySelector("path"), { scaleY: -0.35, svgOrigin: "0 0", duration: 0.16 + (i % 3) * 0.04, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.fromTo(b,
        { x: 600 + dir * (10 + i * 6), y: 250 + (i % 3) * 14, scale: 0.4, autoAlpha: 0 },
        {
          x: 600 + dir * (380 + i * 70), y: -120 - (i % 4) * 40, scale: 1.2, autoAlpha: 1,
          duration: 8 + (i % 4), delay: 2 + i * 0.3, ease: "power1.in",
          repeat: -1, repeatDelay: 7 + (i % 5) * 2,
        });
    });
  }, { scope: root, dependencies: [opened, lang] });

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero-inner">
        {guest && <p className="greeting">{t("dear", { name: guest })}</p>}
        <p className="kicker">{t("heroKicker")}</p>
        <h1 className="names">
          {W.groom.prefix && <small className="name-prefix">{W.groom.prefix}</small>}
          <span className="name name--a"><Chars text={W.groom.name} /></span>
          <span className="amp">{W.connector}</span>
          <span className="name name--b"><Chars text={W.bride.name} /></span>
        </h1>
        <Divider className="hero-div" />
        <p className="hero-meta">
          {d.weekday} · {d.day} {d.month} {d.year}<br />{W.event.venue} · {W.event.address}
        </p>
      </div>
      <div className="scene-wrap">
        <MasjidScene p="hero" birds className="scene" />
      </div>
      <a className="scroll-pill" href="#invitation" onClick={(e) => { e.preventDefault(); document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" }); }}>
        {t("scrollDown")} <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
