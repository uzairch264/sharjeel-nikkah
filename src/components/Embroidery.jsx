import React from "react";

/* =========================================================
   "Embroidered linen" artwork, drawn in code (no image files):
   ivy, wisteria of pearls, orchids, roses, lemons, stone arch, columns, chiffon bow.
   ========================================================= */

const f = (n) => +n.toFixed(1);
const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const bez = ([x0, y0], [x1, y1], [x2, y2], [x3, y3], n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n; const u = 1 - t;
    return [u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
      u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3];
  });

/** One set of gradients/patterns for every drawing on the page (render once, near the top of the app). */
export function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="e-leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b3c19a" /><stop offset="1" stopColor="#728760" /></linearGradient>
        <linearGradient id="e-leaf2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#cdd4b4" /><stop offset="1" stopColor="#97a67e" /></linearGradient>
        <linearGradient id="e-leaf3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#869a6d" /><stop offset="1" stopColor="#566b49" /></linearGradient>
        <radialGradient id="e-pearl" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#fffdf7" /><stop offset=".55" stopColor="#f3ecda" /><stop offset="1" stopColor="#d6ccb0" /></radialGradient>
        <linearGradient id="e-petal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#f6f1e4" /><stop offset="1" stopColor="#e3dac3" /></linearGradient>
        <linearGradient id="e-lemon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3e9a9" /><stop offset="1" stopColor="#d8c668" /></linearGradient>
        <linearGradient id="e-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#cdc4ad" /><stop offset=".45" stopColor="#f0ebdd" /><stop offset="1" stopColor="#c6bca3" /></linearGradient>
        <linearGradient id="e-stone-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f1ecdf" /><stop offset="1" stopColor="#d3cab3" /></linearGradient>
        <linearGradient id="e-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eceee9" /><stop offset=".55" stopColor="#d6e1ea" /><stop offset="1" stopColor="#bfd1e4" /></linearGradient>
        <linearGradient id="e-lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b6c6dc" /><stop offset="1" stopColor="#86a0c4" /></linearGradient>
        <linearGradient id="e-chiffon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fffdf7" /><stop offset=".55" stopColor="#f3eee0" /><stop offset="1" stopColor="#e2dccb" /></linearGradient>
        <linearGradient id="e-chiffon-d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e4decd" /><stop offset=".5" stopColor="#faf7ee" /><stop offset="1" stopColor="#e0dac8" /></linearGradient>
        <pattern id="e-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="3" stroke="#fff" strokeOpacity=".13" strokeWidth=".9" />
        </pattern>
        <pattern id="e-hlines" width="4" height="3" patternUnits="userSpaceOnUse">
          <line x1="0" y1="1.5" x2="4" y2="1.5" stroke="#fff" strokeOpacity=".32" strokeWidth=".8" />
        </pattern>
        <filter id="e-fray" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" />
        </filter>
        <filter id="e-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="2" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        {/* white roses (used by the urns and the arch) */}
        <radialGradient id="fl-base" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#ffffff" /><stop offset=".7" stopColor="#f1ede4" /><stop offset="1" stopColor="#e2dccf" /></radialGradient>
        <linearGradient id="fl-petal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e9e3d6" /></linearGradient>
        <linearGradient id="fl-leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b3c4ae" /><stop offset="1" stopColor="#6f8a6c" /></linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- single motifs ---------- */

const LEAF = "M0 0 C10 -9 30 -9 44 0 C30 9 10 9 0 0Z";
const IVY = "M0 0 C-4 -3 -14 -2 -20 -8 C-26 -14 -24 -22 -18 -22 C-24 -26 -20 -36 -12 -34 C-10 -40 -4 -46 0 -52 C4 -46 10 -40 12 -34 C20 -36 24 -26 18 -22 C24 -22 26 -14 20 -8 C14 -2 4 -3 0 0Z";
const tone = (t) => `url(#e-leaf${t === 2 ? "2" : t === 3 ? "3" : ""})`;

export function Leaf({ x = 0, y = 0, rot = 0, s = 1, t = 1 }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})`}>
      <path d={LEAF} fill={tone(t)} stroke="#8a8a63" strokeWidth=".7" />
      <path d={LEAF} fill="url(#e-hatch)" />
      <path d="M2 0 C16 -.5 30 -.3 42 0 M12 0 L20 -5 M12 0 L20 5 M24 0 L31 -4 M24 0 L31 4" stroke="#f4f2e0" strokeOpacity=".65" strokeWidth=".6" fill="none" />
    </g>
  );
}

export function Ivy({ x = 0, y = 0, rot = 0, s = 1, t = 1 }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})`}>
      <path d={IVY} fill={tone(t)} stroke="#80825a" strokeWidth=".9" strokeLinejoin="round" />
      <path d={IVY} fill="url(#e-hatch)" />
      <path d="M0 0 L0 -46 M0 -8 L-17 -16 M0 -8 L17 -16 M0 -22 L-14 -30 M0 -22 L14 -30" stroke="#f4f2e0" strokeOpacity=".7" strokeWidth=".8" fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Pearl({ x = 0, y = 0, rx = 4.6, ry = 6, rot = 0 }) {
  return <ellipse cx={f(x)} cy={f(y)} rx={rx} ry={ry} transform={`rotate(${f(rot)} ${f(x)} ${f(y)})`} fill="url(#e-pearl)" stroke="#c9bd9b" strokeWidth=".55" />;
}

/** A hanging cluster of pearls, widest at the top. (x, y) is where it hangs from. */
export function Wisteria({ x = 0, y = 0, rows = 11, s = 1, seed = 3, lean = 0 }) {
  const r = rng(seed);
  const pearls = [];
  for (let k = 0; k < rows; k++) {
    const t = k / (rows - 1);
    const count = Math.max(1, Math.round(5.4 * (1 - t) ** 0.85 + 0.6));
    const sway = Math.sin(t * Math.PI) * 3 + lean * t * 12;
    for (let j = 0; j < count; j++) {
      pearls.push([
        sway + (j - (count - 1) / 2) * 8.6 + (r() - 0.5) * 2.2,
        6 + k * 10.2 + (r() - 0.5) * 2.4,
        (1 - 0.22 * t),
        (r() - 0.5) * 24,
      ]);
    }
  }
  return (
    <g transform={`translate(${f(x)} ${f(y)}) scale(${s})`}>
      <path d={`M0 -14 C2 -8 -1 -3 ${f(lean * 2)} 4`} fill="none" stroke="#a79e77" strokeWidth="1.1" strokeLinecap="round" />
      {pearls.map(([px, py, sc, rot], i) => <Pearl key={i} x={px} y={py} rx={4.7 * sc} ry={6.1 * sc} rot={rot} />)}
    </g>
  );
}

const petal = (cx, cy, rx, ry, rot) => (
  <g key={`${cx}${cy}`} transform={`rotate(${rot} ${cx} ${cy})`}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#e-petal)" stroke="#b7ab8a" strokeWidth=".65" />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#e-hatch)" />
    <path d={`M${cx} ${f(cy + ry * 0.7)} L${cx} ${f(cy - ry * 0.5)}`} stroke="#d9cfb4" strokeWidth=".6" />
  </g>
);

export function Orchid({ x = 0, y = 0, s = 1, rot = 0 }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})`}>
      {petal(-9, 14, 7.5, 14, 28)}
      {petal(9, 14, 7.5, 14, -28)}
      {petal(0, -15, 10, 15, 0)}
      {petal(-16, -3, 16, 12, -14)}
      {petal(16, -3, 16, 12, 14)}
      <ellipse cx="0" cy="4" rx="6.5" ry="8.5" fill="#f2dc9f" stroke="#c4a864" strokeWidth=".6" />
      <ellipse cx="0" cy="6" rx="3.2" ry="4.2" fill="#e5b45e" opacity=".8" />
      <circle cx="0" cy="-3" r="3" fill="#fbf3d6" stroke="#c9b784" strokeWidth=".5" />
    </g>
  );
}

export function Bud({ x = 0, y = 0, s = 1, rot = 0 }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C-9 -6 -9 -20 0 -26 C9 -20 9 -6 0 0Z" fill="url(#e-petal)" stroke="#b7ab8a" strokeWidth=".7" />
      <path d="M0 0 C-9 -6 -9 -20 0 -26 C9 -20 9 -6 0 0Z" fill="url(#e-hatch)" />
      <path d="M0 -2 L0 -22" stroke="#d9cfb4" strokeWidth=".6" />
    </g>
  );
}

export function Lemon({ x = 0, y = 0, s = 1, rot = 0 }) {
  const d = "M-13 0 C-13 -10 -6 -12 0 -12 C6 -12 13 -10 14 -2 L17 0 L14 2 C13 10 6 12 0 12 C-6 12 -13 10 -13 0Z";
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})`}>
      <path d={d} fill="url(#e-lemon)" stroke="#b5a35a" strokeWidth=".8" />
      <path d={d} fill="url(#e-hatch)" />
      <path d="M-7 -5 C-3 -9 3 -9 6 -6" stroke="#fffbe2" strokeOpacity=".7" strokeWidth=".9" fill="none" />
    </g>
  );
}

/** White rose, embroidered. */
export function Rose({ x = 0, y = 0, r = 16, rot = 0 }) {
  const petalPath = (k, s) => (
    <path
      key={`${k}-${s}`}
      d={`M0 0 C${f(r * 0.95 * s)} ${f(-r * 0.15 * s)} ${f(r * 0.95 * s)} ${f(-r * 0.98 * s)} 0 ${f(-r * 0.82 * s)}`}
      transform={`rotate(${k * 72 + (s < 1 ? 36 : 0)})`}
      fill="url(#fl-petal)" stroke="#bdb293" strokeWidth=".6"
    />
  );
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      <circle r={r} fill="url(#fl-base)" stroke="#c4b99b" strokeWidth=".7" />
      {[0, 1, 2, 3, 4].map((k) => petalPath(k, 1))}
      {[0, 1, 2, 3, 4].map((k) => petalPath(k, 0.62))}
      <circle r={r} fill="url(#e-hatch)" />
      <path d={`M0 0 C${f(r * 0.2)} ${f(-r * 0.05)} ${f(r * 0.2)} ${f(-r * 0.3)} 0 ${f(-r * 0.26)} C${f(-r * 0.18)} ${f(-r * 0.22)} ${f(-r * 0.12)} ${f(r * 0.1)} ${f(r * 0.04)} ${f(r * 0.1)}`} fill="none" stroke="#b9a98f" strokeWidth=".8" />
      <circle r={f(r * 0.1)} fill="#ead8b4" />
    </g>
  );
}

/** A curving stem with leaves (or ivy) alternating along it. p = [p0, p1, p2, p3] bezier points. */
export function Vine({ p, n = 8, size = 1, ivy = true, seed = 1 }) {
  const r = rng(seed);
  const pts = bez(...p, n);
  const [a, b, c, d] = p;
  return (
    <g>
      <path d={`M${a} C${b} ${c} ${d}`} fill="none" stroke="#a09873" strokeWidth="1.4" strokeLinecap="round" />
      {pts.slice(1).map(([x, y], i) => {
        const [px, py] = pts[i];
        const ang = (Math.atan2(y - py, x - px) * 180) / Math.PI;
        const side = i % 2 ? 1 : -1;
        const rot = ang + side * (48 + r() * 28);
        const sc = size * (0.8 + r() * 0.5);
        const tn = [1, 2, 3][Math.floor(r() * 3)];
        return ivy
          ? <Ivy key={i} x={x} y={y} rot={rot + 90} s={sc * 0.62} t={tn} />
          : <Leaf key={i} x={x} y={y} rot={rot} s={sc * 0.8} t={tn} />;
      })}
    </g>
  );
}

/** Ivy leaves fanning out of a point — fills a corner. */
export function IvyFan({ x = 0, y = 0, rot = 0, s = 1, count = 8, spread = 150, seed = 5 }) {
  const r = rng(seed);
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      {Array.from({ length: count }, (_, i) => {
        const a = -spread / 2 + (spread * i) / (count - 1) + (r() - 0.5) * 14;
        const k = (0.8 + r() * 0.65) * s;
        return <Ivy key={i} x={Math.sin((a * Math.PI) / 180) * 6} y={0} rot={a} s={k} t={[1, 3, 2, 1][i % 4]} />;
      })}
    </g>
  );
}

/* ---------- stone pieces ---------- */

const STONE_LINE = "#b6aa8c";

function Pillar() {
  return (
    <g>
      <rect x="48" y="232" width="40" height="308" fill="url(#e-stone)" stroke={STONE_LINE} strokeWidth="1" />
      {[55, 62, 69, 76, 83].map((x) => <line key={x} x1={x} y1="236" x2={x} y2="538" stroke={STONE_LINE} strokeOpacity=".55" strokeWidth=".8" />)}
      <rect x="40" y="540" width="56" height="16" rx="2" fill="url(#e-stone)" stroke={STONE_LINE} />
      <path d="M36 232 L36 216 Q36 204 50 204 H86 Q100 204 100 216 V232Z" fill="url(#e-stone)" stroke={STONE_LINE} />
      <path d="M44 214 C44 224 52 226 56 218 M92 214 C92 224 84 226 80 218" fill="none" stroke={STONE_LINE} strokeWidth="1.1" />
      <circle cx="52" cy="217" r="5" fill="none" stroke={STONE_LINE} strokeWidth="1" />
      <circle cx="84" cy="217" r="5" fill="none" stroke={STONE_LINE} strokeWidth="1" />
      <rect x="30" y="196" width="76" height="9" rx="2" fill="url(#e-stone)" stroke={STONE_LINE} />
    </g>
  );
}

function Plinth() {
  return (
    <g>
      <rect x="10" y="556" width="110" height="164" fill="url(#e-stone-v)" stroke={STONE_LINE} />
      <rect x="28" y="590" width="74" height="106" rx="3" fill="none" stroke={STONE_LINE} strokeWidth=".9" />
      <g fill="none" stroke={STONE_LINE} strokeWidth="1.2" strokeLinecap="round">
        <path d="M65 604 C58 622 58 644 65 664 C72 644 72 622 65 604Z" />
        <path d="M65 646 C48 642 44 622 50 610 M65 646 C82 642 86 622 80 610" />
        <path d="M54 668 H76" />
      </g>
      <rect x="10" y="556" width="110" height="10" fill="url(#e-stone)" stroke={STONE_LINE} />
    </g>
  );
}

const BALUSTER = "M-8 0 H8 V6 C8 10 5 12 5 18 C14 26 14 44 6 52 C4 58 8 62 10 66 H-10 C-8 62 -4 58 -6 52 C-14 44 -14 26 -5 18 C-5 12 -8 10 -8 6Z";

/**
 * Hero backdrop: a stone arch framing a lake and mountains, wrapped in ivy, orchids,
 * roses and wisteria. viewBox 400 x 720; the opening is x 88–312.
 */
export function ArchScene({ className = "" }) {
  const vox = [];
  for (let a = 180; a <= 360; a += 15) {
    const t = (a * Math.PI) / 180;
    vox.push([200 + 112 * Math.cos(t), 198 + 112 * Math.sin(t), 200 + 140 * Math.cos(t), 198 + 140 * Math.sin(t)]);
  }
  const waves = [[110, 470, 60], [190, 486, 70], [130, 506, 90], [230, 520, 60], [100, 540, 50], [200, 552, 80], [150, 458, 40], [240, 466, 50]];

  return (
    <svg className={className} viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <clipPath id="arch-clip"><path d="M88 640 V198 A112 112 0 0 1 312 198 V640Z" /></clipPath>
      </defs>
      <rect width="400" height="720" fill="#e6e2d8" />
      <rect width="400" height="720" filter="url(#e-noise)" opacity=".1" style={{ mixBlendMode: "multiply" }} />

      {/* the view */}
      <g clipPath="url(#arch-clip)">
        <rect x="80" y="70" width="240" height="380" fill="url(#e-sky)" />
        <path d="M80 432 L88 372 L120 330 L146 352 L190 296 L222 340 L252 316 L290 352 L312 338 L320 432Z" fill="#aab5d2" />
        <path d="M190 296 L176 322 L190 316 L204 326Z M120 330 L110 346 L122 342 L132 350Z M252 316 L242 334 L254 330 L264 338Z" fill="#e7ebf2" opacity=".8" />
        <path d="M80 440 L88 396 L130 362 L170 394 L214 350 L262 388 L300 366 L320 380 V440Z" fill="#8c9fc1" />
        <path d="M80 452 C130 412 190 428 222 416 C262 406 290 418 320 424 V470 H80Z" fill="#9aab9a" />
        <rect x="80" y="430" width="240" height="220" fill="url(#e-lake)" />
        <path d="M120 436 L140 470 L160 436 M200 420 L222 476 L246 420" fill="#8c9fc1" opacity=".28" />
        {waves.map(([x, y, w], i) => <path key={i} d={`M${x} ${y} h${w}`} stroke="#e1eaf4" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />)}
        <rect x="80" y="70" width="240" height="580" fill="url(#e-hlines)" opacity=".55" />
      </g>

      {/* arch band */}
      <path d="M60 198 A140 140 0 0 1 340 198 L312 198 A112 112 0 0 0 88 198Z" fill="url(#e-stone)" stroke={STONE_LINE} strokeWidth="1.1" />
      {vox.map(([x1, y1, x2, y2], i) => <line key={i} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke={STONE_LINE} strokeOpacity=".7" strokeWidth=".8" />)}
      <path d="M184 48 H216 L220 90 H180Z" fill="url(#e-stone-v)" stroke={STONE_LINE} strokeWidth="1.1" />
      <path d="M200 58 C192 66 192 76 200 84 C208 76 208 66 200 58Z" fill="none" stroke={STONE_LINE} strokeWidth="1" />

      <Pillar />
      <g transform="translate(400 0) scale(-1 1)"><Pillar /></g>

      {/* balustrade */}
      <rect x="116" y="574" width="168" height="22" rx="2" fill="url(#e-stone-v)" stroke={STONE_LINE} />
      {[142, 171, 200, 229, 258].map((x) => <path key={x} d={BALUSTER} transform={`translate(${x} 596)`} fill="url(#e-stone)" stroke={STONE_LINE} strokeWidth=".9" />)}
      <rect x="116" y="660" width="168" height="60" fill="url(#e-stone-v)" stroke={STONE_LINE} />
      <Plinth />
      <g transform="translate(400 0) scale(-1 1)"><Plinth /></g>

      {/* wisteria hanging inside the arch */}
      <Wisteria x={112} y={136} rows={12} s={1} seed={11} lean={-0.2} />
      <Wisteria x={152} y={112} rows={10} s={0.95} seed={12} lean={0.1} />
      <Wisteria x={290} y={134} rows={11} s={1} seed={13} lean={0.2} />
      <Wisteria x={250} y={110} rows={9} s={0.95} seed={14} lean={-0.1} />

      {/* top-left: ivy */}
      <Vine p={[[6, 4], [10, 90], [40, 150], [84, 196]]} n={9} size={1.25} seed={21} />
      <IvyFan x={52} y={86} rot={-20} s={1.25} count={9} spread={170} seed={22} />
      <IvyFan x={14} y={30} rot={60} s={1.1} count={6} spread={120} seed={23} />
      <Ivy x={96} y={122} rot={-30} s={0.8} t={2} />
      <Vine p={[[70, 206], [100, 270], [40, 330], [80, 400]]} n={7} size={1.1} seed={24} />

      {/* top-right: orchids and ivy */}
      <Vine p={[[394, 6], [388, 90], [360, 150], [316, 196]]} n={9} size={1.2} ivy={false} seed={31} />
      <IvyFan x={352} y={56} rot={24} s={1.15} count={7} spread={140} seed={32} />
      <Rose x={338} y={140} r={17} rot={20} />
      <Orchid x={352} y={92} s={1.05} rot={14} />
      <Orchid x={372} y={158} s={0.85} rot={-18} />
      <Bud x={318} y={104} s={0.9} rot={-28} />
      <Ivy x={326} y={170} rot={150} s={0.75} t={3} />

      {/* lower-left: orchids and a rose beside the pillar */}
      <Vine p={[[22, 568], [10, 520], [50, 480], [92, 448]]} n={7} size={1.1} ivy={false} seed={41} />
      <Orchid x={52} y={452} s={1.15} rot={-22} />
      <Orchid x={34} y={500} s={0.9} rot={14} />
      <Rose x={92} y={486} r={15} rot={10} />
      <Bud x={104} y={444} s={0.9} rot={22} />
      <IvyFan x={74} y={560} rot={-10} s={1} count={7} spread={150} seed={42} />

      {/* lower-right: roses and an orchid */}
      <Vine p={[[380, 568], [392, 520], [352, 470], [310, 440]]} n={7} size={1.1} ivy={false} seed={51} />
      <Rose x={338} y={478} r={18} rot={-12} />
      <Rose x={304} y={512} r={13} rot={30} />
      <Orchid x={366} y={436} s={1} rot={20} />
      <IvyFan x={330} y={560} rot={10} s={1} count={7} spread={150} seed={52} />
    </svg>
  );
}

/** Columns with roses climbing them — flanks the verse. viewBox 140 x 600; draw once, mirror in CSS for the right. */
export function ColumnArt({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 140 600" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g transform="translate(-4 0)">
        <rect x="42" y="78" width="54" height="440" fill="url(#e-stone)" stroke={STONE_LINE} />
        {[50, 59, 68, 77, 86].map((x) => <line key={x} x1={x} y1="84" x2={x} y2="514" stroke={STONE_LINE} strokeOpacity=".5" strokeWidth=".9" />)}
        <path d="M34 78 V60 Q34 44 52 44 H86 Q104 44 104 60 V78Z" fill="url(#e-stone)" stroke={STONE_LINE} />
        <path d="M40 60 C40 74 52 76 58 66 M98 60 C98 74 86 76 80 66" fill="none" stroke={STONE_LINE} strokeWidth="1.3" />
        <circle cx="56" cy="63" r="6" fill="none" stroke={STONE_LINE} strokeWidth="1.1" />
        <circle cx="82" cy="63" r="6" fill="none" stroke={STONE_LINE} strokeWidth="1.1" />
        <rect x="28" y="30" width="82" height="14" rx="2" fill="url(#e-stone)" stroke={STONE_LINE} />
        <rect x="34" y="516" width="70" height="18" rx="2" fill="url(#e-stone)" stroke={STONE_LINE} />
        <rect x="26" y="532" width="86" height="22" rx="2" fill="url(#e-stone-v)" stroke={STONE_LINE} />
      </g>

      <Vine p={[[40, 10], [10, 70], [60, 120], [30, 180]]} n={6} size={1.1} seed={61} />
      <IvyFan x={26} y={104} rot={-30} s={1} count={6} spread={110} seed={62} />
      <Orchid x={22} y={160} s={0.9} rot={-24} />
      <Bud x={44} y={140} s={0.9} rot={26} />

      <Vine p={[[80, 160], [112, 230], [56, 330], [92, 440]]} n={9} size={1.2} ivy={false} seed={63} />
      <Rose x={76} y={236} r={21} rot={14} />
      <Rose x={98} y={288} r={17} rot={-20} />
      <Rose x={66} y={332} r={19} rot={40} />
      <Orchid x={96} y={204} s={0.85} rot={20} />
      <Rose x={88} y={394} r={14} rot={8} />
      <Orchid x={30} y={420} s={0.95} rot={16} />
      <IvyFan x={74} y={520} rot={0} s={1} count={7} spread={160} seed={64} />
      <Leaf x={90} y={440} rot={-70} s={0.9} t={3} />
    </svg>
  );
}

/** One half of the linen double-door — the left panel; the right is this mirrored. viewBox 200 x 720. */
export function DoorArt({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 720" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      <g transform="translate(26 0)">
      {/* top-left corner */}
      <Vine p={[[0, 96], [30, 66], [70, 40], [112, 12]]} n={7} size={1.2} seed={71} />
      <IvyFan x={34} y={78} rot={-24} s={1.5} count={8} spread={160} seed={72} />
      <IvyFan x={104} y={10} rot={70} s={1.05} count={5} spread={110} seed={73} />
      <Leaf x={0} y={140} rot={20} s={1.3} t={3} />

      {/* wisteria */}
      <Wisteria x={84} y={50} rows={17} s={1.1} seed={74} lean={-0.2} />
      <Wisteria x={140} y={18} rows={14} s={1.1} seed={75} lean={0.2} />
      <Ivy x={112} y={40} rot={40} s={0.8} t={2} />
      <Ivy x={164} y={12} rot={-20} s={0.75} t={3} />

      {/* orchid and bud, left edge */}
      <Vine p={[[0, 232], [30, 214], [60, 226], [104, 236]]} n={5} size={1} ivy={false} seed={76} />
      <Orchid x={30} y={238} s={1.5} rot={-8} />
      <Bud x={104} y={236} s={1.1} rot={70} />
      <Bud x={88} y={232} s={0.9} rot={50} />
      <Leaf x={60} y={258} rot={60} s={1.1} t={1} />
      <Leaf x={0} y={300} rot={-20} s={1.4} t={3} />

      {/* rose and lemons, below the bow */}
      <Rose x={10} y={452} r={28} rot={20} />
      <Leaf x={20} y={410} rot={-40} s={1.25} t={1} />
      <Leaf x={34} y={478} rot={40} s={1.4} t={3} />
      <Vine p={[[0, 560], [30, 520], [70, 500], [110, 520]]} n={6} size={1.2} ivy={false} seed={77} />
      <Lemon x={26} y={545} s={1.5} rot={-12} />
      <Lemon x={74} y={520} s={1.25} rot={10} />
      <Vine p={[[0, 700], [40, 650], [20, 610], [70, 580]]} n={7} size={1.2} seed={78} />
      <Leaf x={10} y={640} rot={-30} s={1.5} t={3} />
      <Leaf x={52} y={690} rot={-70} s={1.3} t={1} />
      <Ivy x={86} y={716} rot={20} s={1.1} t={2} />
      <Bud x={90} y={590} s={1} rot={50} />
      </g>
    </svg>
  );
}

/** Flora for the empty sides of wide screens. Left side; its right edge (x = 320) meets the main scene. */
export function SideArt({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 320 720" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
      <Vine p={[[0, 24], [90, 80], [170, 16], [262, 64]]} n={9} size={1.2} seed={91} />
      <IvyFan x={150} y={44} rot={-10} s={1.3} count={8} spread={150} seed={92} />
      <Wisteria x={274} y={6} rows={14} s={1.15} seed={93} lean={-0.2} />
      <Wisteria x={206} y={-4} rows={11} s={1.1} seed={94} lean={0.2} />
      <Wisteria x={138} y={0} rows={8} s={1} seed={95} lean={-0.1} />
      <Vine p={[[320, 300], [250, 346], [200, 316], [140, 352]]} n={6} size={1.1} ivy={false} seed={96} />
      <Orchid x={254} y={330} s={1.25} rot={12} />
      <Orchid x={198} y={378} s={1.05} rot={-18} />
      <Bud x={150} y={346} s={1} rot={-70} />
      <Rose x={272} y={410} r={19} rot={20} />
      <Vine p={[[300, 720], [244, 610], [304, 520], [236, 440]]} n={9} size={1.2} seed={97} />
      <Rose x={262} y={540} r={16} rot={-10} />
      <Vine p={[[320, 650], [250, 620], [190, 650], [120, 640]]} n={6} size={1.1} ivy={false} seed={98} />
      <Lemon x={196} y={640} s={1.4} rot={-10} />
      <Lemon x={140} y={652} s={1.2} rot={14} />
      <IvyFan x={236} y={716} rot={0} s={1.3} count={8} spread={150} seed={99} />
    </svg>
  );
}

/** Frayed chiffon bow with two long tails. viewBox 400 x 480. */
export function Bow({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 400 480" aria-hidden="true">
      <g filter="url(#e-fray)" style={{ filter: "url(#e-fray) drop-shadow(0 6px 8px rgba(70,64,40,.25))" }}>
        <path className="bow-tail bow-tail--l" d="M196 176 C166 262 112 360 58 470 L130 478 C166 400 206 300 212 188Z" fill="url(#e-chiffon-d)" opacity=".95" />
        <path className="bow-tail bow-tail--r" d="M204 178 C238 270 292 368 346 468 L276 474 C246 404 202 304 190 188Z" fill="url(#e-chiffon-d)" opacity=".95" />
        <path className="bow-loop bow-loop--l" d="M200 168 C150 84 70 52 22 98 C-2 124 20 180 72 196 C122 212 170 192 200 168Z" fill="url(#e-chiffon)" />
        <path className="bow-loop bow-loop--r" d="M200 168 C250 84 330 52 378 98 C402 124 380 180 328 196 C278 212 230 192 200 168Z" fill="url(#e-chiffon)" />
        <g fill="none" stroke="#d7d0bb" strokeOpacity=".8" strokeLinecap="round">
          <path d="M190 166 C150 112 90 96 48 118 M190 172 C150 150 100 150 62 168" strokeWidth="1.4" />
          <path d="M210 166 C250 112 310 96 352 118 M210 172 C250 150 300 150 338 168" strokeWidth="1.4" />
          <path d="M184 196 C170 270 130 350 90 430 M216 196 C230 270 270 350 310 430" strokeWidth="1.2" />
        </g>
        <path className="bow-knot" d="M182 160 C182 142 218 142 218 160 C222 176 218 196 200 200 C182 196 178 176 182 160Z" fill="url(#e-chiffon)" stroke="#d9d2bd" strokeWidth="1" />
        <path d="M190 156 C196 164 196 180 192 192 M208 154 C204 164 206 180 210 192" stroke="#d3ccb5" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

/** Small embroidered garland that crowns each event card. viewBox 300 x 100. */
export function Garland({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 300 100" aria-hidden="true">
      <Vine p={[[8, 84], [30, 40], [90, 22], [140, 38]]} n={6} size={0.9} seed={81} />
      <g transform="translate(300 0) scale(-1 1)"><Vine p={[[8, 84], [30, 40], [90, 22], [140, 38]]} n={6} size={0.9} seed={82} /></g>
      <Wisteria x={64} y={22} rows={6} s={0.7} seed={83} />
      <Wisteria x={236} y={22} rows={6} s={0.7} seed={84} />
      <Rose x={110} y={38} r={11} rot={10} />
      <Rose x={190} y={38} r={11} rot={-20} />
      <Orchid x={150} y={42} s={0.9} />
    </svg>
  );
}
