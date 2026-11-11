import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { useLang } from "../lib/i18n";
import { GateFrame, DoorLeaf } from "./Mughal";

const PETALS = ["#a8442a", "#c4553a", "#f6efe2", "#e7c983", "#c99a3e", "#7a2b18"];

/** Opening screen: the masjid gateway. Tap anywhere and its carved doors swing open, then we walk through. */
export default function Gate({ guest, onOpen, onDone }) {
  const { t } = useLang();
  const root = useRef(null);
  const busy = useRef(false);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    if (reducedMotion()) return;
    gsap.to(".lamp", { rotate: 2.5, svgOrigin: "200 236", duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".lamp-glow", { opacity: 0.55, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.from(".gate-stage", { autoAlpha: 0, scale: 1.06, duration: 1.6, ease: "power2.out" });
    gsap.from(".plaque, .tap-btn", { autoAlpha: 0, y: 14, duration: 1, delay: 0.8, stagger: 0.2 });
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

    gsap.killTweensOf(".lamp");
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: finish });
    tl.to(".plaque, .tap-btn", { autoAlpha: 0, y: 10, duration: 0.4 }, 0)
      .to(".lamp", { rotate: -7, svgOrigin: "200 236", duration: 0.5, ease: "power2.out" }, 0.1)
      .to(".lamp", { rotate: 0, svgOrigin: "200 236", duration: 1.6, ease: "elastic.out(1, 0.35)" }, 0.6)
      .to(".gate-light", { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, 0.3)
      .to(".door--l", { rotateY: -108, duration: 2, ease: "power2.inOut" }, 0.35)
      .to(".door--r", { rotateY: 108, duration: 2, ease: "power2.inOut" }, 0.35)
      .add(() => {
        const fire = (n, spread, vel, scalar) => confetti({
          particleCount: n, spread, startVelocity: vel, origin: { x: 0.5, y: 0.6 }, colors: PETALS, scalar, ticks: 220, gravity: 0.6, shapes: ["circle", "square"],
        });
        fire(60, 100, 36, 0.9);
        setTimeout(() => fire(40, 160, 24, 0.7), 220);
      }, 0.95)
      .to(".gate-light", { autoAlpha: 0, duration: 1, ease: "power1.in" }, 1.7)
      .to(".gate-stage", { scale: 2.6, duration: 1.4, ease: "power2.in" }, 1.75)
      .to(root.current, { autoAlpha: 0, duration: 0.7, ease: "power1.in" }, 2.45);
  });

  if (gone) return null;

  return (
    <div id="intro" ref={root} role="dialog" aria-label={t("gateTitle")} onClick={open}>
      <div className="gate-stage">
        <div className="gate-light" />
        <div className="doors">
          <div className="door door--l"><DoorLeaf /></div>
          <div className="door door--r"><DoorLeaf /></div>
        </div>
        <GateFrame className="gate-frame" />
        <div className="plaque">
          <small>{t("gateKicker")}</small>
          <b>{t("gateTitle")}</b>
          {guest && <span>{t("giftFor")} {guest}</span>}
        </div>
        <button className="tap-btn" aria-label={t("tapHint")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.69-5.1c.01-.07.02-.13.02-.2 0-.62-.38-1.16-.91-1.38z" />
          </svg>
          <span>{t("tapHint")}</span>
        </button>
      </div>
    </div>
  );
}
