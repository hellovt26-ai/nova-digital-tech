"use client";

import { useEffect, useState } from "react";

/**
 * Shared, synchronized accent-color cycle.
 *
 * Every component that calls this hook reads from ONE module-level timer,
 * so the whole site shifts colors at the exact same moment — cohesive,
 * intentional, premium. Matches the AI Receptionist demo palette.
 */
export const ACCENT_PAIRS: [string, string][] = [
  ["#00e5ff", "#2979ff"], // cyan → blue
  ["#f59e0b", "#ef4444"], // amber → red
  ["#10b981", "#06b6d4"], // emerald → cyan
  ["#8b5cf6", "#6366f1"], // purple → indigo
  ["#ec4899", "#a855f7"], // pink → purple
];

const INTERVAL_MS = 3200;

let sharedIndex = 0;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<(i: number) => void>();

function ensureTimer() {
  if (timer || typeof window === "undefined") return;
  timer = setInterval(() => {
    sharedIndex = (sharedIndex + 1) % ACCENT_PAIRS.length;
    listeners.forEach((fn) => fn(sharedIndex));
  }, INTERVAL_MS);
}

function maybeStopTimer() {
  if (listeners.size === 0 && timer) {
    clearInterval(timer);
    timer = null;
  }
}

export interface AccentCycle {
  accent: string;
  accent2: string;
  index: number;
  /** CSS transition string for smooth color changes */
  transition: string;
}

export function useAccentCycle(): AccentCycle {
  const [index, setIndex] = useState(sharedIndex);

  useEffect(() => {
    const listener = (i: number) => setIndex(i);
    listeners.add(listener);
    ensureTimer();
    // Sync immediately in case timer already advanced
    setIndex(sharedIndex);
    return () => {
      listeners.delete(listener);
      maybeStopTimer();
    };
  }, []);

  const [accent, accent2] = ACCENT_PAIRS[index];
  return {
    accent,
    accent2,
    index,
    transition:
      "background 1s ease, box-shadow 1s ease, color 1s ease, border-color 1s ease",
  };
}
