import React from "react";
import { archPath, archPoints, domePath, merlons } from "../lib/arch";

/*
 * All artwork, drawn in SVG code after Badshahi Masjid, Lahore:
 * red sandstone, white marble inlay, onion domes, octagonal minarets, cusped Mughal arches.
 * Colours come from CSS classes (see "MUGHAL ART" in styles.css), so the same drawing works by day and by night.
 *   sd  sandstone      sdl lit sandstone     sdd shaded sandstone     rc arch recess
 *   ln  marble line    gd  gilded            fl  courtyard floor
 */

const open = (d) => d.replace(/Z$/, "");

/* ---------- small ornaments ---------- */

/** Eight-petal marble rosette (pietra dura). Fill comes from `className`. */
export function Rosette({ cx = 0, cy = 0, r = 10, className = "" }) {
  const petal = `M0 0C${r * 0.36} ${-r * 0.28} ${r * 0.36} ${-r * 0.74} 0 ${-r}C${-r * 0.36} ${-r * 0.74} ${-r * 0.36} ${-r * 0.28} 0 0Z`;
  return (
    <g className={`rosette ${className}`} transform={`translate(${cx} ${cy})`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d={petal} transform={`rotate(${a})`} />)}
      <circle r={r * 0.24} className="rosette-c" />
    </g>
  );
}

/** A spray of tulips and leaves, the classic Mughal inlay motif. Drawn in a 40 x 120 box. */
export function FloralSpray({ x = 0, y = 0, s = 1, className = "" }) {
  return (
    <g className={`spray ${className}`} transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="stem" d="M20 120C18 98 22 76 20 40M20 86C14 78 10 70 9 60M20 70C26 64 30 56 31 47" />
      <path d="M20 104C10 100 4 92 5 83C13 86 18 94 20 104ZM20 104C30 100 36 92 35 83C27 86 22 94 20 104Z" />
      <path d="M20 80C13 79 8 74 8 68C14 69 18 74 20 80ZM20 74C27 73 32 68 32 62C26 63 22 68 20 74Z" />
      <path d="M20 40C14 31 15 19 20 9C25 19 26 31 20 40ZM20 41C11 37 7 28 8 18C14 23 18 31 20 41ZM20 41C29 37 33 28 32 18C26 23 22 31 20 41Z" />
      <path d="M9 61C5 56 6 50 9 46C12 50 13 56 9 61ZM31 48C27 43 28 37 31 33C34 37 35 43 31 48Z" />
    </g>
  );
}

/** Gold rule with an eight-point star in the middle. */
export function Divider({ className = "" }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 220 20" aria-hidden="true">
      <path d="M0 10H84M136 10H220" />
      <path className="fill" d="M76 10l4-4 4 4-4 4zM136 10l4-4 4 4-4 4z" />
      <g className="fill" transform="translate(110 10)">
        <rect x="-7" y="-7" width="14" height="14" />
        <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
      </g>
      <circle cx="110" cy="10" r="3.2" className="hole" />
    </svg>
  );
}

/** Tiny silhouette of the masjid (three domes, two minarets), for the venue line. */
export function DomeIcon({ className = "" }) {
  return (
    <svg className={`dome-icon ${className}`} viewBox="0 0 96 50" aria-hidden="true">
      <path d={domePath(48, 28, 11, 14, 20)} />
      <path d={domePath(30, 33, 6, 8, 12)} />
      <path d={domePath(66, 33, 6, 8, 12)} />
      <path d="M48 8V3M30 21V17M66 21V17" className="stroke" />
      <rect x="20" y="32" width="56" height="16" />
      <path d="M8 48V14h4v34zM84 48V14h4v34zM6 14l4-7 4 7zM82 14l4-7 4 7z" />
    </svg>
  );
}

/* ---------- shared defs (gradients) ---------- */

function Defs({ p }) {
  return (
    <>
      <radialGradient id={`${p}-dome`} cx=".34" cy=".3" r=".85">
        <stop offset="0" className="st-dome-hi" />
        <stop offset=".55" className="st-dome" />
        <stop offset="1" className="st-dome-sh" />
      </radialGradient>
      <linearGradient id={`${p}-sky`} gradientUnits="userSpaceOnUse" x1="0" y1="-300" x2="0" y2="200">
        <stop offset="0" className="st-sky-top" />
        <stop offset="1" className="st-sky-bot" />
      </linearGradient>
    </>
  );
}

function Finial({ cx, y, s = 1 }) {
  return (
    <g className="gd">
      <rect x={cx - 0.7 * s} y={y - 15 * s} width={1.4 * s} height={15 * s} />
      <circle cx={cx} cy={y - 3.5 * s} r={2.6 * s} />
      <circle cx={cx} cy={y - 8.5 * s} r={1.9 * s} />
      <path d={`M${cx} ${y - 19 * s}l${1.6 * s} ${4.5 * s}h${-3.2 * s}z`} />
    </g>
  );
}

function Dome({ p, cx, base, w0, w1, h, fin = 1 }) {
  return (
    <g>
      <path className="dome" fill={`url(#${p}-dome)`} d={domePath(cx, base, w0, w1, h)} />
      <path className="dome-ring" d={`M${cx - w0 * 0.98} ${base - 1.5}Q${cx} ${base + 3} ${cx + w0 * 0.98} ${base - 1.5}`} />
      <Finial cx={cx} y={base - h + 1} s={fin} />
    </g>
  );
}

/** Small domed pavilion that crowns every minaret and turret. */
function Chhatri({ p, cx, base, w }) {
  const ph = w * 0.85;
  const top = base - ph;
  const eave = w * 0.18;
  return (
    <g>
      <rect className="sdl" x={cx - w * 0.62} y={base - 3} width={w * 1.24} height={4} />
      <rect className="rc" x={cx - w * 0.5} y={top} width={w} height={ph - 3} />
      {[-0.5, -0.17, 0.17, 0.5].map((k) => (
        <rect key={k} className="sdl" x={cx + k * w - w * 0.055} y={top} width={w * 0.11} height={ph - 3} />
      ))}
      <path className="sdd" d={`M${cx - w * 0.78} ${top}H${cx + w * 0.78}L${cx + w * 0.56} ${top - eave}H${cx - w * 0.56}Z`} />
      <Dome p={p} cx={cx} base={top - eave + 1} w0={w * 0.4} w1={w * 0.5} h={w * 0.82} fin={w / 34} />
    </g>
  );
}

/** Octagonal red-sandstone minaret with marble stripes, three balconies and a chhatri on top. */
function Minaret({ p, cx, base, top, w }) {
  const plinth = base - 34;
  const hw = (y) => w / 2 - (w * 0.09) * ((plinth - y) / (plinth - top));
  const bands = [0.3, 0.58, 0.84].map((k) => plinth - (plinth - top) * k);
  return (
    <g>
      <rect className="sdl" x={cx - w * 0.95} y={plinth} width={w * 1.9} height={base - plinth} />
      <rect className="ln" x={cx - w * 0.95 + 3} y={plinth + 3} width={w * 1.9 - 6} height={base - plinth - 6} />
      <path className="rc" d={archPath({ x1: cx - w * 0.3, x2: cx + w * 0.3, bottom: base - 3, spring: plinth + 18, apex: plinth + 9 })} />
      <path className="sdl" d={`M${cx - hw(plinth)} ${plinth}L${cx - hw(top)} ${top}H${cx}V${plinth}Z`} />
      <path className="sdd" d={`M${cx} ${plinth}V${top}H${cx + hw(top)}L${cx + hw(plinth)} ${plinth}Z`} />
      <path
        className="ln thin"
        d={`M${cx} ${plinth}V${top}M${cx - hw(plinth) * 0.55} ${plinth}L${cx - hw(top) * 0.55} ${top}M${cx + hw(plinth) * 0.55} ${plinth}L${cx + hw(top) * 0.55} ${top}`}
      />
      {bands.map((y) => {
        const b = hw(y) * 1.7;
        let posts = "";
        for (let x = cx - b + 3; x < cx + b - 1; x += 4) posts += `M${x} ${y - 8}V${y}`;
        return (
          <g key={y}>
            <path className="sdd" d={`M${cx - b} ${y}H${cx + b}L${cx + hw(y)} ${y + 11}H${cx - hw(y)}Z`} />
            <rect className="sdl" x={cx - b} y={y - 8} width={b * 2} height={8} />
            <path className="ln thin" d={`M${cx - b} ${y - 8}H${cx + b}M${cx - b} ${y}H${cx + b}${posts}`} />
          </g>
        );
      })}
      <Chhatri p={p} cx={cx} base={top} w={w * 1.25} />
    </g>
  );
}

/** A tall slender turret (guldasta) beside the main gateway. */
function Turret({ p, cx, top, bottom, w }) {
  return (
    <g>
      <rect className="sdl" x={cx - w / 2} y={top} width={w / 2} height={bottom - top} />
      <rect className="sdd" x={cx} y={top} width={w / 2} height={bottom - top} />
      <path className="ln thin" d={`M${cx} ${top}V${bottom}M${cx - w / 2} ${top}V${bottom}M${cx + w / 2} ${top}V${bottom}`} />
      <Chhatri p={p} cx={cx} base={top} w={w * 1.6} />
    </g>
  );
}

/* ---------- the masjid ---------- */

/**
 * Badshahi Masjid from its courtyard: prayer hall with the great central iwan, three marble domes,
 * corner towers, two of the great minarets, the arcades, and the courtyard pool with a reflection.
 * viewBox 1200 x 600, ground line at y = 470. Ground and arcades run far past the sides so the
 * drawing can be cropped or widened freely.
 */
export function MasjidScene({ p = "hero", night = false, birds = false, className = "" }) {
  const bays = (x0) => [0, 1, 2, 3].map((i) => x0 + i * 35);
  const hallMerlons = merlons(380, 535, 324, 8) + merlons(665, 820, 324, 8);
  return (
    <svg className={`mz ${night ? "night" : "day"} ${className}`} viewBox="0 0 1200 600" aria-hidden="true">
      <defs>
        <Defs p={p} />
        <radialGradient id={`${p}-glow`}>
          <stop offset="0" className="st-glow" />
          <stop offset="1" className="st-glow" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="st-water-a" />
          <stop offset="1" className="st-water-b" />
        </linearGradient>
        <pattern id={`${p}-arc`} patternUnits="userSpaceOnUse" x="0" y="400" width="36" height="70">
          <rect className="sd" width="36" height="70" />
          <rect className="ln thin" x="4" y="10" width="28" height="58" />
          <path className="rc" d={archPath({ x1: 9, x2: 27, bottom: 68, spring: 36, apex: 22, lobes: 2 })} />
        </pattern>
        <clipPath id={`${p}-pool`}>
          <path d="M458 506H742L786 574H414Z" />
        </clipPath>
      </defs>

      {/* sun glow or moon */}
      <circle cx="600" cy="170" r="330" fill={`url(#${p}-glow)`} />
      {night && (
        <path className="moon" d="M820 52A24 24 0 0 0 820 100A28 28 0 0 1 820 52Z" />
      )}

      <g id={`${p}-bldg`}>
        {/* side arcades of the courtyard */}
        <rect x="-1700" y="400" width="2080" height="70" fill={`url(#${p}-arc)`} />
        <rect x="820" y="400" width="2080" height="70" fill={`url(#${p}-arc)`} />
        <rect className="sdl" x="-1700" y="394" width="4600" height="7" />
        <path className="sdl" d={merlons(-1700, 2900, 394, 7)} />

        {/* great minarets */}
        <Minaret p={p} cx={270} base={480} top={132} w={34} />
        <Minaret p={p} cx={930} base={480} top={132} w={34} />

        {/* domes, behind the hall */}
        <rect className="sdl" x="418" y="298" width="64" height="30" />
        <rect className="sdl" x="718" y="298" width="64" height="30" />
        <rect className="sdl" x="548" y="221" width="104" height="36" />
        <path className="ln thin" d="M548 229H652M418 305H482M718 305H782" />
        {[560, 580, 600, 620, 640].map((x) => (
          <path key={x} className="rc" d={archPath({ x1: x - 5, x2: x + 5, bottom: 254, spring: 241, apex: 234 })} />
        ))}
        <Dome p={p} cx={450} base={301} w0={30} w1={39} h={72} fin={1.1} />
        <Dome p={p} cx={750} base={301} w0={30} w1={39} h={72} fin={1.1} />
        <Dome p={p} cx={600} base={224} w0={50} w1={64} h={118} fin={1.6} />

        {/* prayer hall */}
        <rect className="sd" x="380" y="324" width="440" height="146" />
        <rect className="sdl" x="380" y="324" width="440" height="9" />
        <path className="sdl" d={hallMerlons} />
        <path className="ln thin" d="M380 333H820M380 324H820" />
        {[...bays(392), ...bays(668)].map((x) => (
          <g key={x}>
            <rect className="ln" x={x + 2} y="362" width="31" height="108" />
            <path className="rc" d={archPath({ x1: x + 7, x2: x + 28, bottom: 470, spring: 402, apex: 381, lobes: 2 })} />
            <path className="ln thin" d={open(archPath({ x1: x + 7, x2: x + 28, bottom: 470, spring: 402, apex: 381, lobes: 2 }))} />
            <rect className="ln thin" x={x + 7} y="340" width="21" height="15" />
          </g>
        ))}

        {/* corner towers */}
        {[380, 820].map((cx) => (
          <g key={cx}>
            <rect className="sdl" x={cx - 9} y="250" width="9" height="220" />
            <rect className="sdd" x={cx} y="250" width="9" height="220" />
            <path className="ln thin" d={`M${cx - 9} 330H${cx + 9}M${cx - 9} 400H${cx + 9}M${cx} 250V470`} />
            <Chhatri p={p} cx={cx} base={250} w={24} />
          </g>
        ))}

        {/* the great iwan (pishtaq) */}
        <rect className="sd" x="535" y="250" width="130" height="220" />
        <rect className="sdl" x="535" y="245" width="130" height="8" />
        <path className="sdl" d={merlons(535, 665, 245, 8)} />
        <rect className="ln" x="541" y="259" width="118" height="211" />
        <rect className="ln thin" x="546" y="264" width="108" height="206" />
        <path className="ln thin" d={open(archPath({ x1: 552, x2: 648, bottom: 470, spring: 352, apex: 284 }))} />
        <path className="rc" d={archPath({ x1: 558, x2: 642, bottom: 470, spring: 352, apex: 292, lobes: 3 })} />
        <path className="ln" d={open(archPath({ x1: 558, x2: 642, bottom: 470, spring: 352, apex: 292, lobes: 3 }))} />
        <Rosette cx={562} cy={279} r={7} className="r-marble" />
        <Rosette cx={638} cy={279} r={7} className="r-marble" />
        <g className="iwan-inner">
          <path className="ln thin" d="M572 352V470M628 352V470M572 388H628" />
          {[580, 600, 620].map((x) => (
            <path key={x} className="sdd" d={archPath({ x1: x - 6, x2: x + 6, bottom: 384, spring: 370, apex: 361 })} />
          ))}
          <path className="sdd door-glow" d={archPath({ x1: 586, x2: 614, bottom: 470, spring: 432, apex: 412, lobes: 2 })} />
          <path className="ln thin" d={open(archPath({ x1: 586, x2: 614, bottom: 470, spring: 432, apex: 412, lobes: 2 }))} />
        </g>
        <Turret p={p} cx={535} top={236} bottom={470} w={9} />
        <Turret p={p} cx={665} top={236} bottom={470} w={9} />

        {/* raised plinth */}
        <rect className="sdd" x="-1700" y="466" width="4600" height="8" />
        <path className="ln" d="M-1700 466H2900" />
      </g>

      {/* courtyard */}
      <rect className="fl" x="-1700" y="474" width="4600" height="600" />
      <path
        className="ln floor-lines"
        d={
          [-34, -30, -26, -22, -18, -14, -10, -6, -2, 2, 6, 10, 14, 18, 22, 26, 30, 34]
            .map((k) => {
              const xb = 600 + k * 110;
              return `M${600 + (xb - 600) * ((474 - 380) / 320)} 474L${xb} 700`;
            })
            .join("") + [482, 494, 510, 532, 560, 596].map((y) => `M-1700 ${y}H2900`).join("")
        }
      />
      <path className="sdd" d="M450 500H750L798 580H402Z" />
      <path d="M458 506H742L786 574H414Z" fill={`url(#${p}-water)`} />
      <g clipPath={`url(#${p}-pool)`}>
        <use href={`#${p}-bldg`} className="reflection" transform="translate(0 506) scale(1 -0.17) translate(0 -470)" />
      </g>
      <path className="ln" d="M450 500H750L798 580H402Z" />

      {birds && (
        <g className="birds">
          {Array.from({ length: 9 }, (_, i) => (
            <g className="bird" key={i}>
              <path d="M-7 0Q-3.5 -4.5 0 0Q3.5 -4.5 7 0" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ---------- the gateway (opening screen) ---------- */

export const GATE = { x1: 90, x2: 310, spring: 380, apex: 236, bottom: 661 };
const GATE_HOLE = archPath({ ...GATE, lobes: 5 });

/**
 * The great gateway of the masjid: a marble-inlaid sandstone iwan with a cusped arch and a dome behind it.
 * viewBox 400 x 720; wall, sky and steps run far past the edges so it fills any screen.
 * The arch opening is cut out with a mask so the doors (separate elements) show through it.
 */
export function GateFrame({ className = "" }) {
  const p = "gate";
  let posts = "";
  for (let x = -1700; x < 2100; x += 80) posts += `M${x} 190V250`;
  return (
    <svg className={`mz day ${className}`} viewBox="0 0 400 720" aria-hidden="true">
      <defs>
        <Defs p={p} />
        <pattern id="gate-wall" patternUnits="userSpaceOnUse" x="0" y="196" width="80" height="120">
          <rect className="sd" width="80" height="120" />
          <rect className="ln thin" x="6" y="8" width="68" height="106" />
          <path className="rc" d={archPath({ x1: 20, x2: 60, bottom: 104, spring: 58, apex: 26, lobes: 3 })} />
          <path className="ln thin" d={open(archPath({ x1: 20, x2: 60, bottom: 104, spring: 58, apex: 26, lobes: 3 }))} />
        </pattern>
        <mask id="gate-mask" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="4400" height="4800">
          <rect x="-2000" y="-2000" width="4400" height="4800" fill="#fff" />
          <path d={GATE_HOLE} fill="#000" />
        </mask>
      </defs>

      <rect x="-2000" y="-2000" width="4400" height="2300" fill={`url(#${p}-sky)`} />

      {/* the great minarets far out to the sides (seen on wide screens) */}
      <Minaret p={p} cx={-150} base={230} top={-40} w={34} />
      <Minaret p={p} cx={550} base={230} top={-40} w={34} />

      {/* dome over the gateway */}
      <rect className="sdl" x="138" y="118" width="124" height="40" />
      <path className="ln thin" d="M138 128H262" />
      {[156, 178, 200, 222, 244].map((x) => (
        <path key={x} className="rc" d={archPath({ x1: x - 6, x2: x + 6, bottom: 156, spring: 142, apex: 134 })} />
      ))}
      <Dome p={p} cx={200} base={121} w0={60} w1={78} h={104} fin={1.4} />

      <g mask="url(#gate-mask)">
        {/* sandstone wall with marble-framed niches */}
        <rect className="sd" x="-2000" y="190" width="4400" height="2600" />
        <rect x="-2000" y="196" width="4400" height="480" fill="url(#gate-wall)" />
        <rect className="sdl" x="-2000" y="188" width="4400" height="8" />
        <path className="sdl" d={merlons(-2000, 2400, 188, 8)} />
        <path className="ln thin" d={`M-2000 196H2400${posts}`} />

        {/* the iwan */}
        <rect className="sd" x="40" y="150" width="320" height="520" />
        <rect className="sdl" x="40" y="146" width="320" height="9" />
        <path className="sdl" d={merlons(40, 360, 146, 9)} />
        <rect className="ln" x="48" y="160" width="304" height="520" />
        <rect className="ln thin" x="55" y="167" width="290" height="520" />
        <rect className="inscription" x="72" y="174" width="256" height="38" />
        <rect className="ln gold-line" x="75" y="177" width="250" height="32" />
        <text className="inscription-text" x="200" y="200" textAnchor="middle">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</text>
        <path className="ln" d={open(archPath({ x1: 76, x2: 324, bottom: 670, spring: 380, apex: 220 }))} />
        <path className="ln thin" d={open(archPath({ x1: 82, x2: 318, bottom: 670, spring: 380, apex: 228 }))} />
        <Rosette cx={88} cy={244} r={15} className="r-marble" />
        <Rosette cx={312} cy={244} r={15} className="r-marble" />
        <FloralSpray x={61} y={250} s={0.38} className="r-marble" />
        <FloralSpray x={324} y={250} s={0.38} className="r-marble" />
        <FloralSpray x={59} y={440} s={0.42} className="r-marble" />
        <FloralSpray x={324} y={440} s={0.42} className="r-marble" />
        <path className="ln" d="M57 430H74M326 430H343M57 600H74M326 600H343" />
        <path className="arch-band" d={GATE_HOLE} />
        <path className="arch-band-in" d={GATE_HOLE} />
        <Turret p={p} cx={40} top={110} bottom={680} w={14} />
        <Turret p={p} cx={360} top={110} bottom={680} w={14} />

        {/* steps */}
        <rect className="step1" x="-2000" y="661" width="4400" height="20" />
        <rect className="step2" x="-2000" y="681" width="4400" height="20" />
        <rect className="step3" x="-2000" y="701" width="4400" height="2000" />
        <path className="ln" d="M-2000 661H2400M-2000 681H2400M-2000 701H2400" />
        <path className="ln thin" d="M-2000 724H2400M-2000 750H2400M-2000 780H2400M-2000 816H2400M-2000 858H2400" />
      </g>

      {/* hanging brass lamp */}
      <g className="lamp">
        <path className="chain" d="M200 236V266" />
        <circle className="lamp-glow" cx="200" cy="286" r="34" />
        <path className="gd" d="M190 268h20l-3 -5h-14z" />
        <path className="gd" d={domePath(200, 270, 9, 11, 13)} />
        <path className="lamp-body" d="M189 271h22l-3 24h-16z" />
        <path className="gd-line" d="M189 271h22l-3 24h-16zM195 271l1 24M205 271l-1 24M190 280h20M191 288h18" />
        <path className="gd" d="M192 295h16l-8 9z" />
      </g>
    </svg>
  );
}

/** Left door leaf: carved wood, brass studs and a ring; the right leaf is the same drawing mirrored. */
export function DoorLeaf({ className = "" }) {
  const top = archPoints(104, 296, 382, 254, 16).slice(0, 17);
  const panel = `M104 392${top.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join("")}L192 254V392Z`;
  const studs = [];
  for (let y = 410; y <= 640; y += 76) {
    for (let x = 110; x <= 184; x += 12) studs.push([x, y - 8]);
  }
  return (
    <svg className={`leaf ${className}`} viewBox="90 236 110 425" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a2410" />
          <stop offset=".7" stopColor="#6a361a" />
          <stop offset="1" stopColor="#3a1a0a" />
        </linearGradient>
      </defs>
      <rect x="90" y="236" width="110" height="425" fill="url(#wood)" />
      <path className="grain" d="M100 236V661M118 236V661M137 236V661M151 236V661M170 236V661M186 236V661" />
      <path className="wood-d" d={panel} />
      <path className="brass-line" d={panel} />
      {[0.25, 0.5, 0.75].map((k) => {
        const [x, y] = top[Math.round(k * 16)];
        return <path key={k} className="brass-line thin" d={`M192 392L${x.toFixed(1)} ${y.toFixed(1)}`} />;
      })}
      <Rosette cx={192} cy={392} r={14} className="r-brass" />
      {[[404, 482], [494, 572], [584, 646]].map(([y1, y2]) => (
        <g key={y1}>
          <rect className="wood-d" x="104" y={y1} width="84" height={y2 - y1} />
          <rect className="brass-line" x="104" y={y1} width="84" height={y2 - y1} />
          <rect className="brass-line thin" x="110" y={y1 + 6} width="72" height={y2 - y1 - 12} />
          <Rosette cx={146} cy={(y1 + y2) / 2} r={Math.min(14, (y2 - y1) / 3.4)} className="r-brass" />
        </g>
      ))}
      {studs.map(([x, y]) => <circle key={`${x}-${y}`} className="stud" cx={x} cy={y} r="2" />)}
      <rect className="brass" x="193" y="236" width="7" height="425" />
      <circle className="brass-ring" cx="181" cy="488" r="10" />
      <circle className="brass" cx="181" cy="476" r="4.5" />
    </svg>
  );
}

/* ---------- arched card frame ---------- */

const CAP = { x1: 0.75, x2: 299.25, bottom: 190, spring: 186, apex: 1, lobes: 5, depth: 0.28 };
const CAP_FILL = archPath(CAP);
const CAP_LINE = open(CAP_FILL);
const CAP_INNER = open(archPath({ x1: 9, x2: 291, bottom: 190, spring: 186, apex: 12, lobes: 5, depth: 0.28 }));

/** A panel shaped like a Mughal arch niche (mihrab). `tone`: "marble" or "sand". */
export function ArchCard({ tone = "marble", className = "", children }) {
  return (
    <div className={`arch-card arch-card--${tone} ${className}`}>
      <svg className="arch-cap" viewBox="0 0 300 190" preserveAspectRatio="none" aria-hidden="true">
        <path className="cap-fill" d={CAP_FILL} />
        <path className="cap-line" d={CAP_LINE} vectorEffect="non-scaling-stroke" />
        <path className="cap-line2" d={CAP_INNER} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="arch-panel" aria-hidden="true" />
      <div className="arch-line" aria-hidden="true" />
      <div className="arch-body">{children}</div>
    </div>
  );
}
