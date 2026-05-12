const audioCache = new Map<string, AudioBuffer>();
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function createToneBuffer(frequency: number, duration: number, volume: number, type: OscillatorType = "sine"): AudioBuffer {
  const ctx = getAudioContext();
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * (1 / duration) * 5);
    let wave = 0;
    if (type === "sine") {
      wave = Math.sin(2 * Math.PI * frequency * t);
    } else if (type === "triangle") {
      wave = 2 * Math.abs(2 * ((frequency * t) % 1) - 1) - 1;
    }
    data[i] = wave * envelope * volume;
  }
  return buffer;
}

export function playClick() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const key = "click";
    if (!audioCache.has(key)) {
      audioCache.set(key, createToneBuffer(2200, 0.06, 0.08, "triangle"));
    }
    const source = ctx.createBufferSource();
    source.buffer = audioCache.get(key)!;
    source.connect(ctx.destination);
    source.start();
  } catch {}
}

export function playHover() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const key = "hover";
    if (!audioCache.has(key)) {
      audioCache.set(key, createToneBuffer(1800, 0.03, 0.03, "sine"));
    }
    const source = ctx.createBufferSource();
    source.buffer = audioCache.get(key)!;
    source.connect(ctx.destination);
    source.start();
  } catch {}
}

export function playNav() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const key = "nav";
    if (!audioCache.has(key)) {
      audioCache.set(key, createToneBuffer(1400, 0.08, 0.06, "sine"));
    }
    const source = ctx.createBufferSource();
    source.buffer = audioCache.get(key)!;
    source.connect(ctx.destination);
    source.start();
  } catch {}
}
