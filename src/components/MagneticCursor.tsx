"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouseX: -100,
    mouseY: -100,
    cursorX: -100,
    cursorY: -100,
    ringX: -100,
    ringY: -100,
    hovering: false,
    lastHovering: false,
    pressed: false,
  });

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
    setMounted(true);
    if (isTouch) return;

    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    const s = stateRef.current;

    const onMouseMove = (e: MouseEvent) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
    };
    const onMouseDown = () => {
      s.pressed = true;
    };
    const onMouseUp = () => {
      s.pressed = false;
    };

    // Throttled hover detection — elementFromPoint forces layout, so we
    // only run it a few times per second instead of every frame.
    let lastHoverCheck = 0;
    const HOVER_INTERVAL = 120;
    const checkHover = (now: number) => {
      if (now - lastHoverCheck < HOVER_INTERVAL) return;
      lastHoverCheck = now;
      const el = document.elementFromPoint(s.mouseX, s.mouseY);
      s.hovering = el
        ? !!el.closest(
            'button, a, input, textarea, select, [role="button"], [data-magnetic]'
          )
        : false;
    };

    let frame: number;
    const animate = (now: number) => {
      // Cheap transform-only lerp updates
      s.cursorX += (s.mouseX - s.cursorX) * 0.35;
      s.cursorY += (s.mouseY - s.cursorY) * 0.35;
      s.ringX += (s.mouseX - s.ringX) * 0.18;
      s.ringY += (s.mouseY - s.ringY) * 0.18;

      checkHover(now);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${s.cursorX - 4}px, ${
          s.cursorY - 4
        }px, 0) scale(${s.pressed ? 0.6 : s.hovering ? 0.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.ringX - 20}px, ${
          s.ringY - 20
        }px, 0) scale(${s.pressed ? 0.8 : s.hovering ? 1.6 : 1})`;
        // Only touch colors when the hover state actually changes
        if (s.hovering !== s.lastHovering) {
          ringRef.current.style.borderColor = s.hovering
            ? "rgba(0, 229, 255, 0.8)"
            : "rgba(0, 229, 255, 0.35)";
          ringRef.current.style.background = s.hovering
            ? "rgba(0, 229, 255, 0.08)"
            : "transparent";
          s.lastHovering = s.hovering;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted || isTouchDevice) return null;

  return createPortal(
    <>
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
          transition: "scale 0.15s ease",
          willChange: "transform",
        }}
      />
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
          boxShadow: "0 0 12px rgba(0, 229, 255, 0.7)",
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
