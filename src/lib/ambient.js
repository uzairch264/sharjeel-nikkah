// Generated qawwali-style background music, made with the Web Audio API. No audio file needed.
// Harmonium over a Sa–Pa drone in a Kafi/Bhairavi-like scale, tabla playing keherwa (8 beats),
// and group handclaps (taali). It opens with a slow harmonium alaap; tabla and claps then join.
// If `music` in config.js points at a real file that plays, that file is used instead.

const SA = 293.66;           // Sa = D4
const MATRA = 0.31;          // seconds per beat (~97 bpm)
const LEVEL = 0.45;

// Scale degrees as semitones from Sa: Sa 0, komal Re 1, komal Ga 3, Ma 5, Pa 7, komal Dha 8, komal Ni 10, Sa' 12
// Each note is [semitones, beats]. Every phrase is 16 beats (two keherwa cycles).
const ALAAP = [[7, 4], [8, 2], [7, 2], [5, 4], [3, 2], [1, 2], [0, 8]]; // 24 beats, no percussion
const PHRASES = [
  [[0, 2], [1, 1], [3, 1], [5, 2], [3, 1], [1, 1], [0, 4], [-2, 2], [0, 2]],
  [[7, 2], [8, 1], [7, 1], [5, 2], [3, 2], [5, 1], [7, 1], [5, 1], [3, 1], [1, 2], [0, 2]],
  [[5, 2], [7, 2], [8, 2], [10, 2], [12, 4], [10, 1], [8, 1], [7, 2]],
  [[12, 3], [10, 1], [8, 2], [7, 2], [8, 1], [7, 1], [5, 2], [3, 2], [1, 1], [0, 1]],
];
const INTRO = ALAAP.reduce((s, [, d]) => s + d, 0);

// Keherwa theka: dha ge na ti | na ka dhi na
const THEKA = ["dha", "ge", "na", "ti", "na", "ka", "dhi", "na"];

const hz = (semi) => SA * 2 ** (semi / 12);

export function createAmbient() {
  let ctx = null, master = null, bus = null, harm = null, noise = null, drone = [];
  let timer = 0, pos = 0, nextTime = 0, noteEnd = 0, noteIdx = 0, lastFreq = 0;
  let muted = false, started = false;

  const impulse = (c, secs) => {
    const len = Math.floor(c.sampleRate * secs);
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    return buf;
  };

  const build = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 3;
    master.connect(comp);
    comp.connect(ctx.destination);

    // a small hall
    const verb = ctx.createConvolver();
    verb.buffer = impulse(ctx, 1.8);
    const wet = ctx.createGain();
    wet.gain.value = 0.28;
    bus = ctx.createGain();
    bus.connect(master);
    bus.connect(verb);
    verb.connect(wet);
    wet.connect(master);

    // harmonium: reedy tone through a soft low-pass, with bellows tremolo
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2300;
    tone.Q.value = 0.6;
    harm = ctx.createGain();
    const lfo = ctx.createOscillator();
    const depth = ctx.createGain();
    lfo.frequency.value = 5.2;
    depth.gain.value = 0.07;
    lfo.connect(depth);
    depth.connect(harm.gain);
    lfo.start();
    tone.connect(harm);
    harm.connect(bus);
    harm.input = tone;

    const n = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = n.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noise = n;
  };

  /* ---------- harmonium ---------- */

  const startDrone = () => {
    const t = ctx.currentTime;
    drone = [[SA / 2, 0.022], [hz(7) / 2, 0.016], [SA / 4, 0.014]].flatMap(([f, v]) => [-4, 4].map((det) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.detune.value = det;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 2.5);
      o.connect(g);
      g.connect(harm.input);
      o.start(t);
      return { o, g };
    }));
  };
  const stopDrone = () => {
    const t = ctx.currentTime;
    drone.forEach(({ o, g }) => { g.gain.setTargetAtTime(0, t, 0.1); o.stop(t + 0.6); });
    drone = [];
  };

  const note = (semi, t, dur, v = 0.075) => {
    const f = hz(semi);
    const from = lastFreq && Math.abs(Math.log2(f / lastFreq)) < 0.6 ? lastFreq : f;
    lastFreq = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.045);
    g.gain.setValueAtTime(v, t + dur - 0.02);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.09);
    g.connect(harm.input);
    [["sawtooth", 1, 0, 1], ["square", 1, 7, 0.5], ["sawtooth", 2, -5, 0.28]].forEach(([type, mul, det, lvl]) => {
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.type = type;
      o.detune.value = det;
      o.frequency.setValueAtTime(from * mul, t);
      o.frequency.exponentialRampToValueAtTime(f * mul, t + 0.06); // a little meend between notes
      og.gain.value = lvl;
      o.connect(og);
      og.connect(g);
      o.start(t);
      o.stop(t + dur + 0.12);
    });
  };

  /* ---------- tabla & claps ---------- */

  const tone1 = (t, f0, f1, decay, v, type = "sine") => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + decay * 0.6);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    o.connect(g);
    g.connect(bus);
    o.start(t);
    o.stop(t + decay + 0.05);
  };

  const hiss = (t, freq, q, decay, v) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    s.connect(bp);
    bp.connect(g);
    g.connect(bus);
    s.start(t, Math.random() * 0.8);
    s.stop(t + decay + 0.02);
  };

  const bayan = (t, v) => tone1(t, 120, 62, 0.5, 0.42 * v);                 // deep bass stroke (ge)
  const dayan = (t, v) => {                                                 // ringing treble stroke (na)
    tone1(t, SA * 1.01, SA, 0.32, 0.16 * v);
    tone1(t, SA * 2, SA * 2, 0.16, 0.06 * v);
    tone1(t, SA * 3.02, SA * 3, 0.09, 0.03 * v);
    hiss(t, 3200, 1.2, 0.025, 0.08 * v);
  };
  const muted1 = (t, v) => hiss(t, 1700, 1.4, 0.06, 0.16 * v);              // closed stroke (ti / ka)

  const bol = (b, t, v) => {
    if (b === "dha") { bayan(t, v); dayan(t, v); }
    else if (b === "dhi") { bayan(t, v * 0.8); dayan(t, v * 0.7); }
    else if (b === "ge") bayan(t, v * 0.85);
    else if (b === "na") dayan(t, v * 0.8);
    else if (b === "ti") muted1(t, v);
    else if (b === "ka") { muted1(t, v * 0.8); tone1(t, 90, 70, 0.12, 0.12 * v); }
  };

  // a group of hands clapping: several slightly offset noise bursts
  const clap = (t, v) => {
    for (let k = 0; k < 4; k++) hiss(t + k * 0.009 + Math.random() * 0.006, 1100 + Math.random() * 300, 0.9, 0.11, 0.1 * v);
  };

  /* ---------- sequencer ---------- */

  const nextNote = () => {
    if (noteIdx < ALAAP.length) return ALAAP[noteIdx++];
    const all = PHRASES.flat();
    return all[(noteIdx++ - ALAAP.length) % all.length];
  };

  const beat = (p, t) => {
    if (p >= noteEnd) {
      const [semi, dur] = nextNote();
      note(semi, t, dur * MATRA);
      noteEnd = p + dur;
    }
    if (p < INTRO) return;
    const m = (p - INTRO) % 8;
    const cycle = Math.floor((p - INTRO) / 8);
    const swing = () => (Math.random() - 0.5) * 0.008;
    bol(THEKA[m], t + swing(), m === 0 ? 1 : 0.85);
    // fill (tirakita) at the end of every fourth cycle
    if (cycle % 4 === 3 && m >= 6) {
      muted1(t + MATRA / 2, 0.8);
      dayan(t + MATRA * 0.75, 0.6);
    } else if (m === 3 || m === 7) {
      dayan(t + MATRA / 2, 0.45);
    }
    if (p >= INTRO + 16 && m % 2 === 0) clap(t + swing(), m === 0 || m === 4 ? 1 : 0.7);
  };

  const tick = () => {
    while (nextTime < ctx.currentTime + 0.3) {
      beat(pos, nextTime);
      nextTime += MATRA;
      pos++;
    }
  };

  const run = (on) => {
    clearInterval(timer);
    if (!on) return;
    nextTime = Math.max(nextTime, ctx.currentTime + 0.1);
    timer = setInterval(tick, 60);
    tick();
  };

  return {
    /** Must be called from a user gesture the first time. */
    async start() {
      if (!ctx) build();
      await ctx.resume();
      started = true;
      muted = false;
      startDrone();
      run(true);
      master.gain.setTargetAtTime(LEVEL, ctx.currentTime, 1.2);
    },
    async setMuted(m) {
      if (!started) return;
      muted = m;
      if (m) {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
        run(false);
        setTimeout(() => { if (muted) { stopDrone(); ctx.suspend(); } }, 900);
      } else {
        await ctx.resume();
        if (!drone.length) startDrone();
        run(true);
        master.gain.setTargetAtTime(LEVEL, ctx.currentTime, 0.6);
      }
    },
    stop() { run(false); ctx?.close(); ctx = null; started = false; },
  };
}
