"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Independent accent-color cycle.
 *
 * Each component that calls this hook gets its OWN timer and its own
 * randomized starting color + slightly varied interval — so different
 * mockups across the site show different colors at the same time.
 * Matches the AI Receptionist demo palette.
 */
export const ACCENT_PAIRS: [string, string][] = [
  ["#00e5ff", "#2979ff"], // cyan → blue
  ["#f59e0b", "#ef4444"], // amber → red
  ["#10b981", "#06b6d4"], // emerald → cyan
  ["#8b5cf6", "#6366f1"], // purple → indigo
  ["#ec4899", "#a855f7"], // pink → purple
];

export interface AccentCycle {
  accent: string;
  accent2: string;
  index: number;
  /** CSS transition string for smooth color changes */
  transition: string;
}

export function useAccentCycle(): AccentCycle {
  // Random starting color so sections don't begin in lockstep
  const startRef = useRef(Math.floor(Math.random() * ACCENT_PAIRS.length));
  // Slightly varied interval (2.8s–3.8s) so they drift independently
  const intervalRef = useRef(2800 + Math.floor(Math.random() * 1000));
  const [index, setIndex] = useState(startRef.current);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % ACCENT_PAIRS.length);
    }, intervalRef.current);
    return () => clearInterval(id);
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
