import React, { useRef } from "react";
import { describeEvent, mapUrl, calendarHref } from "../lib/invite";
import { useLang } from "../lib/i18n";
import { gsap, useGSAP, reducedMotion } from "../lib/gsap";
import { ArchCard, DomeIcon, Divider } from "./Mughal";
import Countdown from "./Countdown";

/** The Nikaah and dinner details, followed by the countdown to the Nikaah. */
export default function Ceremony() {
  const root = useRef(null);
  const { W, t, locale } = useLang();
  const ev = W.event;
  const dinner = ev.dinner;
  const d = describeEvent(ev, locale);
  const cal = calendarHref(ev, `${W.groom.name} & ${W.bride.name}`);
  const dinnerCal = calendarHref(dinner, `${W.groom.name} & ${W.bride.name}`);

  useGSAP(() => {
    if (reducedMotion()) return;
    const st = { trigger: root.current, start: "top 75%", once: true };
    gsap.from(".arch-card", { autoAlpha: 0, y: 50, duration: 1.4, ease: "power3.out", scrollTrigger: st });
    gsap.from(".arch-body > *", { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.1, delay: 0.4, ease: "power2.out", scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="page marble ceremony" id="ceremony" ref={root}>
      <ArchCard tone="sand">
        <DomeIcon className="card-dome" />
        <p className="kicker">{t("ceremony")}</p>
        <h2 className="event-title">{ev.title}</h2>
        <div className="date-row">
          <span>{d.weekday}</span>
          <b>{d.day}</b>
          <span>{d.month}<br />{d.year}</span>
        </div>
        <Divider />
        <div className="detail">
          <p className="kicker">{t("time")}</p>
          <p className="detail-main">{ev.time}</p>
        </div>
        <div className="detail">
          <p className="kicker">{t("nikaahVenue")}</p>
          <p className="detail-main">{ev.venue}</p>
          {ev.address && <p className="detail-sub">{ev.address}</p>}
        </div>
        <div className="links">
          <a className="btn" href={mapUrl(ev)} target="_blank" rel="noopener noreferrer">{t("viewMap")}</a>
          <a className="btn" href={cal.href} download={cal.download} target={cal.download ? undefined : "_blank"} rel="noopener noreferrer">{t("addCal")}</a>
        </div>
        {dinner && (
          <>
            <Divider />
            <div className="detail">
              <p className="kicker">{t("dinnerVenue")}</p>
              <p className="detail-main">{dinner.venue}</p>
              {dinner.address && <p className="detail-sub">{dinner.address}</p>}
            </div>
            <div className="detail">
              <p className="kicker">{t("time")}</p>
              <p className="detail-main">{dinner.time}</p>
            </div>
            <div className="links">
              <a className="btn" href={mapUrl(dinner)} target="_blank" rel="noopener noreferrer">{t("viewMap")}</a>
              <a className="btn" href={dinnerCal.href} download={dinnerCal.download} target={dinnerCal.download ? undefined : "_blank"} rel="noopener noreferrer">{t("addCal")}</a>
            </div>
          </>
        )}
      </ArchCard>
      <Countdown />
    </section>
  );
}
