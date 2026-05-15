"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  createdAt: number;
}

export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouseX: -100,
    mouseY: -100,
    cursorX: -100,
    cursorY: -100,
    ringX: -100,
    ringY: -100,
    hovering: false,
    pressed: false,
  });
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    // Skip on touch devices
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
    setMounted(true);
    if (isTouch) return;

    // Hide default cursor on interactive elements
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    const state = stateRef.current;

    const onMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
    };

    const onMouseDown = () => {
      state.pressed = true;
    };
    const onMouseUp = () => {
      state.pressed = false;
    };

    const checkHover = () => {
      const el = document.elementFromPoint(state.mouseX, state.mouseY);
      if (!el) return false;
      // Check if hovering over an interactive element
      return !!el.closest(
        'button, a, input, textarea, select, [role="button"], [data-magnetic]'
      );
    };

    // Animation loop
    let frame: number;
    const animate = () => {
      const s = stateRef.current;

      // Smooth lerp for cursor dot (fast)
      const dotEase = 0.35;
      s.cursorX += (s.mouseX - s.cursorX) * dotEase;
      s.cursorY += (s.mouseY - s.cursorY) * dotEase;

      // Smoother lerp for outer ring (slower, gives trailing effect)
      const ringEase = 0.18;
      s.ringX += (s.mouseX - s.ringX) * ringEase;
      s.ringY += (s.mouseY - s.ringY) * ringEase;

      // Update hover state
      const hovering = checkHover();
      s.hovering = hovering;

      // Apply transforms
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${s.cursorX - 4}px, ${
          s.cursorY - 4
        }px, 0) scale(${s.pressed ? 0.6 : hovering ? 0.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.ringX - 20}px, ${
          s.ringY - 20
        }px, 0) scale(${s.pressed ? 0.8 : hovering ? 1.6 : 1})`;
        ringRef.current.style.borderColor = hovering
          ? "rgba(0, 229, 255, 0.8)"
          : "rgba(0, 229, 255, 0.35)";
        ringRef.current.style.background = hovering
          ? "rgba(0, 229, 255, 0.08)"
          : "transparent";
      }

      // Add trail point every few frames
      if (frame % 3 === 0) {
        trailPointsRef.current.push({
          x: s.cursorX,
          y: s.cursorY,
          id: trailIdRef.current++,
          createdAt: performance.now(),
        });
      }

      // Remove old trail points (> 500ms)
      const now = performance.now();
      trailPointsRef.current = trailPointsRef.current.filter(
        (p) => now - p.createdAt < 500
      );

      // Render trail
      if (trailRef.current) {
        trailRef.current.innerHTML = trailPointsRef.current
          .map((p) => {
            const age = (now - p.createdAt) / 500;
            const opacity = (1 - age) * 0.5;
            const size = 6 * (1 - age);
            return `<div style="position:absolute;left:${p.x - size / 2}px;top:${
              p.y - size / 2
            }px;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle, rgba(0,229,255,${opacity}), transparent);pointer-events:none;"></div>`;
          })
          .join("");
      }

      frame = requestAnimationFrame(animate);
    };

    let frameCount = 0;
    const tick = () => {
      frameCount++;
      animate();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    frame = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(frame);
      // Avoid unused var warning
      void tick;
      void frameCount;
    };
  }, []);

  if (!mounted || isTouchDevice) return null;

  return createPortal(
    <>
      {/* Trail layer */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99990,
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 229, 255, 0.35)",
          pointerEvents: "none",
          zIndex: 99991,
          mixBlendMode: "screen",
          transition:
            "scale 0.15s ease, border-color 0.2s ease, background 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* Inner dot */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,1) 0%, rgba(41,121,255,1) 100%)",
          boxShadow:
            "0 0 12px rgba(0, 229, 255, 0.8), 0 0 24px rgba(0, 229, 255, 0.4)",
          pointerEvents: "none",
          zIndex: 99992,
          willChange: "transform",
          transition: "scale 0.15s ease",
        }}
      />
    </>,
    document.body
  );
}
