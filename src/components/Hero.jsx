import React, { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { useLang } from "../lib/i18n";
import { dateRange } from "../lib/invite";
import Chars from "./Chars";
import { ArchScene, SideArt } from "./Embroidery";

export default function Hero({ opened, events, guest }) {
  const root = useRef(null);
  const { W, t, lang, locale } = useLang();
  const [a, b] = W.couple;
  const announce = events.length === 0;
  const range = dateRange(events.map((k) => W.events[k]), locale);

  useGSAP(() => {
    const items = ".greeting, .kicker, .amp, .name-prefix, .hero-meta, .hero-line, .hero-sub, .scroll-pill, .names .ch";
    if (!opened) { gsap.set(items, { autoAlpha: 0 }); gsap.set(".scene", { autoAlpha: 0 }); return; }
    if (reducedMotion()) { gsap.set(items, { autoAlpha: 1 }); gsap.set(".scene", { autoAlpha: 1 }); return; }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".scene", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.2, transformOrigin: "50% 40%" }, 0)
      .fromTo(".greeting, .kicker", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.15 }, 0.9)
      .fromTo(".name:first-child .ch", { autoAlpha: 0, y: 26, rotate: -4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1, stagger: 0.05 }, 1.4)
      .fromTo(".amp", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(2)" }, 1.9)
      .fromTo(".name-prefix", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 2.1)
      .fromTo(".name:last-child .ch", { autoAlpha: 0, y: 26, rotate: 4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1, stagger: 0.05 }, 2.1)
      .fromTo(".hero-meta, .hero-line, .hero-sub", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.18 }, 2.8)
      .fromTo(".scroll-pill", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 3.4);
  }, { scope: root, dependencies: [opened, lang] });

  return (
    <section className="hero" id="hero" ref={root}>
      <SideArt className="side side--l" />
      <SideArt className="side side--r" />
      <div className="hero-stage">
        <ArchScene className="scene" />
        <div className="hero-inner">
          {guest && <p className="greeting">{t("dear", { name: guest })}</p>}
          <p className="kicker">{announce ? t("bigNewsKicker") : t("theInvitation")}</p>
          <h1 className="names">
            <span className="name"><Chars text={a.name} /></span>
            <span className="amp">{W.connector}</span>
            <span className="name">
              {b.prefix && <small className="name-prefix">{b.prefix}</small>}
              <Chars text={b.name} />
            </span>
          </h1>
          {announce ? (
            <>
              <p className="hero-line">{W.announcementLine}</p>
              <p className="hero-sub">{W.announcementSub}</p>
            </>
          ) : (
            <p className="hero-meta">{range}<br />{W.city}</p>
          )}
        </div>
        {!announce && (
          <a className="scroll-pill" href="#together" onClick={(e) => { e.preventDefault(); document.getElementById("together")?.scrollIntoView({ behavior: "smooth" }); }}>
            {t("scrollDown")} <span aria-hidden="true">↓</span>
          </a>
        )}
      </div>
    </section>
  );
}
