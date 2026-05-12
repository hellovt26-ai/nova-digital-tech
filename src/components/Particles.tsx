"use client";

import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const c = cvs.getContext("2d");
    if (!c) return;

    // Assign to const so TypeScript knows they're non-null in closures
    const canvas = cvs;
    const ctx = c;
    const isMobile = window.innerWidth < 768;

    let animId: number;
    let time = 0;
    const count = isMobile ? 12 : 45;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; pulse: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Draw hexagon
    function drawHexagon(cx: number, cy: number, r: number, opacity: number) {
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI / 3) * j - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw hexagonal grid
    function drawHexGrid() {
      const hexSize = 60;
      const hexH = hexSize * Math.sqrt(3);
      const scrollY = window.scrollY;

      for (let row = -1; row < canvas.height / hexH + 2; row++) {
        for (let col = -1; col < canvas.width / (hexSize * 1.5) + 2; col++) {
          const cx = col * hexSize * 1.5;
          const cy = row * hexH + (col % 2 ? hexH / 2 : 0);

          // Only draw hexagons near viewport for performance
          const screenY = cy - scrollY;
          if (screenY < -100 || screenY > window.innerHeight + 100) continue;

          // Subtle distance-based opacity with scroll parallax
          const distFromCenter = Math.hypot(
            cx - canvas.width / 2,
            cy - scrollY - window.innerHeight / 2
          );
          const maxDist = Math.hypot(canvas.width / 2, window.innerHeight / 2);
          const baseOpacity = 0.035 * (1 - distFromCenter / maxDist);
          const pulseOpacity = baseOpacity + Math.sin(time * 0.5 + cx * 0.01 + cy * 0.01) * 0.01;

          if (pulseOpacity > 0.005) {
            drawHexagon(cx, cy, hexSize * 0.48, pulseOpacity);
          }
        }
      }
    }

    // Draw glowing arcs
    function drawArcs() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Left arc
      ctx.beginPath();
      ctx.arc(-canvas.width * 0.3, scrollY + vh * 0.5, canvas.width * 0.7, -0.4, 0.4);
      const leftGrad = ctx.createLinearGradient(0, scrollY, 0, scrollY + vh);
      leftGrad.addColorStop(0, "rgba(0, 136, 255, 0)");
      leftGrad.addColorStop(0.5, `rgba(0, 180, 255, ${0.06 + Math.sin(time * 0.3) * 0.02})`);
      leftGrad.addColorStop(1, "rgba(0, 136, 255, 0)");
      ctx.strokeStyle = leftGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Right arc
      ctx.beginPath();
      ctx.arc(canvas.width * 1.3, scrollY + vh * 0.5, canvas.width * 0.7, Math.PI - 0.4, Math.PI + 0.4);
      const rightGrad = ctx.createLinearGradient(0, scrollY, 0, scrollY + vh);
      rightGrad.addColorStop(0, "rgba(0, 136, 255, 0)");
      rightGrad.addColorStop(0.5, `rgba(0, 180, 255, ${0.06 + Math.sin(time * 0.3 + 1) * 0.02})`);
      rightGrad.addColorStop(1, "rgba(0, 136, 255, 0)");
      ctx.strokeStyle = rightGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Draw particles
    function drawParticles() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < scrollY - 50) p.y = scrollY + vh + 50;
        if (p.y > scrollY + vh + 50) p.y = scrollY - 50;

        const pulseSize = p.size + Math.sin(p.pulse) * 0.5;
        const pulseOpacity = p.opacity + Math.sin(p.pulse * 1.5) * 0.1;

        // Sparkle glow
        const glowR = pulseSize * 3;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, `rgba(0, 229, 255, ${pulseOpacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(0, 180, 255, ${pulseOpacity * 0.15})`);
        grad.addColorStop(1, "rgba(0, 150, 255, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core sparkle
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${pulseOpacity})`;
        ctx.fill();
      });

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.08 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    const animate = () => {
      time += 0.016;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Only clear visible area + buffer
      ctx.clearRect(0, scrollY - 50, canvas.width, vh + 100);

      drawHexGrid();
      drawArcs();
      drawParticles();

      animId = requestAnimationFrame(animate);
    };

    // Re-size canvas on scroll to cover full page
    const onScroll = () => {
      const newHeight = document.documentElement.scrollHeight;
      if (canvas.height !== newHeight) {
        canvas.height = newHeight;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
