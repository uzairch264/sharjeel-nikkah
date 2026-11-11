/** ?to=Khan%20Family personalises the greeting. `lang=ur` is read in i18n.jsx. */
export function parseInvite(search = window.location.search) {
  const params = new URLSearchParams(search);
  const guest = (params.get("to") || params.get("guest") || "").trim().slice(0, 40);
  return { guest };
}

const fmt = (opts, d, locale) => new Intl.DateTimeFormat(locale, { timeZone: "Asia/Karachi", ...opts }).format(d);

export function describeEvent(ev, locale = "en-GB") {
  const s = new Date(ev.start);
  return {
    weekday: fmt({ weekday: "long" }, s, locale),
    day: fmt({ day: "numeric" }, s, "en-GB"),
    month: fmt({ month: "long" }, s, locale),
    year: fmt({ year: "numeric" }, s, "en-GB"),
  };
}

export const mapUrl = (ev) =>
  ev.map || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ev.venue} ${ev.address}`.trim())}`;

const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function calendarHref(ev, label) {
  const title = `${ev.title} — ${label}`;
  const where = [ev.venue, ev.address].filter(Boolean).join(", ");
  const apple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && "ontouchend" in document;
  if (apple) {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nikaah//EN", "BEGIN:VEVENT",
      `UID:${stamp(ev.start)}-nikaah@invite`, `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(ev.start)}`, `DTEND:${stamp(ev.end)}`,
      `SUMMARY:${title}`, `LOCATION:${where}`, "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    return { href: `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`, download: "Nikaah.ics" };
  }
  const q = new URLSearchParams({
    action: "TEMPLATE", text: title, dates: `${stamp(ev.start)}/${stamp(ev.end)}`, location: where,
  });
  return { href: `https://calendar.google.com/calendar/render?${q}`, download: undefined };
}
