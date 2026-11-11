/* Geometry for Mughal arches, as seen on Badshahi Masjid. All functions return SVG path strings. */

const f = (n) => Math.round(n * 10) / 10;

/** Points along a pointed (two-centred) arch from the left spring point to the right one. */
export function archPoints(x1, x2, spring, apex, steps = 20) {
  const w = x2 - x1;
  const half = w / 2;
  const cx = x1 + half;
  const h = spring - apex;
  const d = Math.max(0, (h * h - half * half) / w);
  const R = half + d;
  const aEnd = Math.atan2(-Math.min(h, Math.sqrt(R * R - d * d)), -d) + 2 * Math.PI;
  const left = [];
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI + (aEnd - Math.PI) * (i / steps);
    left.push([cx + d + R * Math.cos(a), spring + R * Math.sin(a)]);
  }
  const right = left.slice(0, -1).reverse().map(([x, y]) => [2 * cx - x, y]);
  return [...left, ...right];
}

/**
 * Closed outline of an arch opening: straight jambs from `bottom` up to `spring`, then a pointed arch.
 * `lobes` > 0 makes it multifoil (cusped): each side is split into scallops that bulge outward.
 */
export function archPath({ x1, x2, bottom, spring, apex, lobes = 0, depth = 0.32 }) {
  const cx = (x1 + x2) / 2;
  if (!lobes) {
    const pts = archPoints(x1, x2, spring, apex, 24);
    return `M${f(x1)} ${f(bottom)}L${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}L${f(x2)} ${f(bottom)}Z`;
  }
  const pts = archPoints(x1, x2, spring, apex, lobes);
  const w = x2 - x1;
  const h = spring - apex;
  const d = Math.max(0, (h * h - (w / 2) ** 2) / w);
  let s = `M${f(x1)} ${f(bottom)}L${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2;
    const ccx = mx < cx ? cx + d : cx - d; // centre of the circle this side of the arch is drawn from
    const nx = mx - ccx;
    const ny = my - spring;
    const nl = Math.hypot(nx, ny) || 1;
    const len = Math.hypot(bx - ax, by - ay);
    s += `Q${f(mx + (nx / nl) * len * depth)} ${f(my + (ny / nl) * len * depth)} ${f(bx)} ${f(by)}`;
  }
  return `${s}L${f(x2)} ${f(bottom)}Z`;
}

/** Onion dome (base at y = `base`, centred on `cx`), with base half-width w0, belly half-width w1, height h. */
export function domePath(cx, base, w0, w1, h) {
  return [
    `M${f(cx - w0)} ${f(base)}`,
    `C${f(cx - w1 * 1.28)} ${f(base - h * 0.42)} ${f(cx - w1 * 0.55)} ${f(base - h * 0.8)} ${f(cx - 2)} ${f(base - h * 0.97)}`,
    `L${f(cx)} ${f(base - h)}L${f(cx + 2)} ${f(base - h * 0.97)}`,
    `C${f(cx + w1 * 0.55)} ${f(base - h * 0.8)} ${f(cx + w1 * 1.28)} ${f(base - h * 0.42)} ${f(cx + w0)} ${f(base)}Z`,
  ].join("");
}

/** A row of leaf-shaped merlons (kanguras) along a parapet. */
export function merlons(x1, x2, y, size = 9) {
  const n = Math.max(1, Math.round((x2 - x1) / size));
  const step = (x2 - x1) / n;
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x1 + i * step;
    s += `M${f(x + step * 0.08)} ${f(y)}Q${f(x + step * 0.1)} ${f(y - size * 0.55)} ${f(x + step / 2)} ${f(y - size)}Q${f(x + step * 0.9)} ${f(y - size * 0.55)} ${f(x + step * 0.92)} ${f(y)}Z`;
  }
  return s;
}
