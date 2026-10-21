import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { useLang } from "../lib/i18n";
import { DoorArt, SideArt, Bow } from "./Embroidery";

const PEARLS = ["#fffdf6", "#efe7d2", "#c9b27a", "#a9bba5", "#8fa383", "#f6efdc"];

export default function GiftIntro({ guest, title, onOpen, onDone }) {
  const { t } = useLang();
  const root = useRef(null);
  const busy = useRef(false);
  const [gone, setGone] = useState(false);

  // idle: the bow breathes, the hint pulses
  useGSAP(() => {
    if (reducedMotion()) return;
    gsap.to(".bow", { y: -5, rotate: 0.6, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.from(".door", { autoAlpha: 0, duration: 1.1, stagger: 0.1 });
    gsap.from(".bow", { autoAlpha: 0, y: 30, duration: 1.3, delay: 0.3, ease: "power3.out" });
    gsap.from(".intro-label, .tap-btn", { autoAlpha: 0, y: 12, duration: 1, delay: 0.9, stagger: 0.2 });
  }, { scope: root });

  const { contextSafe } = useGSAP({ scope: root });

  const open = contextSafe(() => {
    if (busy.current) return;
    busy.current = true;
    onOpen?.();

    const finish = () => { setGone(true); onDone?.(); };
    if (reducedMotion()) {
      gsap.to(root.current, { autoAlpha: 0, duration: 0.4, onComplete: finish });
      return;
    }

    gsap.killTweensOf(".bow");
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: finish });
    tl.to(".intro-label, .tap-btn", { autoAlpha: 0, y: 10, duration: 0.4 }, 0)
      // the bow lets go: loops fold in, the tails fall away
      .to(".bow-loop--l", { x: 26, scaleX: 0.6, svgOrigin: "200 170", duration: 0.55 }, 0.1)
      .to(".bow-loop--r", { x: -26, scaleX: 0.6, svgOrigin: "200 170", duration: 0.55 }, 0.1)
      .to(".bow-tail", { y: 90, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power2.in" }, 0.35)
      .to(".bow", { y: 70, rotate: 5, scale: 0.92, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, 0.55)
      // the doors swing open
      .to(".door--l", { rotateY: -82, duration: 1.7 }, 0.85)
      .to(".door--r", { rotateY: 82, duration: 1.7 }, 0.85)
      .add(() => {
        const fire = (n, spread, vel, scalar) => confetti({
          particleCount: n, spread, startVelocity: vel, origin: { x: 0.5, y: 0.55 }, colors: PEARLS, scalar, ticks: 200, gravity: 0.7, shapes: ["circle"],
        });
        fire(70, 110, 38, 0.9);
        setTimeout(() => fire(40, 150, 24, 0.7), 200);
      }, 1.0)
      .to(".door", { autoAlpha: 0, duration: 0.55, ease: "power1.in" }, 2.0)
      .to(root.current, { autoAlpha: 0, duration: 0.3 }, 2.5);
  });

  if (gone) return null;

  return (
    <div id="intro" ref={root} role="dialog" aria-label="Your invitation" onClick={open}>
      <div className="door door--l"><SideArt className="side" /><DoorArt className="door-art" /></div>
      <div className="door door--r"><SideArt className="side" /><DoorArt className="door-art" /></div>
      <div className="intro-stage">
        <p className="intro-label">
          <small>{title}</small>
          {guest && <b>{t("giftFor")} {guest}</b>}
        </p>
        <Bow className="bow" />
        <button className="tap-btn" aria-label={t("tapHint")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.69-5.1c.01-.07.02-.13.02-.2 0-.62-.38-1.16-.91-1.38z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
