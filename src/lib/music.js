import WEDDING from "../config";
import { gsap } from "./gsap";
import { createAmbient } from "./ambient";

const FILE_LEVEL = 0.45;

let started = false;
let muted = true;
let ambient = null;
let file = null;

/**
 * Call this synchronously from the tap handler. Browsers (iOS Safari especially) only allow audio
 * that is started inside the tap itself, so nothing here waits on the network first.
 * Music is initialized only after the user explicitly enables it. If `music` in config.js points at
 * a real file that plays successfully, it takes over from the generated music when enabled.
 */
export function startMusic() {
  if (started || muted) return;
  started = true;

  ambient = createAmbient();
  ambient.start().catch(() => {});

  if (!WEDDING.music) return;
  const a = new Audio(WEDDING.music);
  a.loop = true;
  a.volume = 0;
  a.play().then(() => {
    file = a;
    ambient?.setMuted(true);
    if (muted) { a.pause(); return; }
    gsap.to(a, { volume: FILE_LEVEL, duration: 3 });
  }).catch(() => { /* missing or blocked file: keep the generated music */ });
}

export function setMusicMuted(m) {
  muted = m;
  if (!started && !m) {
    startMusic();
    return;
  }
  if (file) {
    if (!m) file.play().catch(() => {});
    gsap.to(file, { volume: m ? 0 : FILE_LEVEL, duration: 0.5, onComplete: () => { if (m) file.pause(); } });
  } else {
    ambient?.setMuted(m);
  }
}
