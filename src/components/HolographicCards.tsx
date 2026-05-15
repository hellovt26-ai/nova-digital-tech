"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface CardData {
  icon: string;
  title: string;
  description: string;
  features: string[];
  accent: string; // gradient colors
}

const CARDS: CardData[] = [
  {
    icon: "🌐",
    title: "Custom Websites",
    description: "Premium, mobile-first sites that convert visitors into customers.",
    features: ["Lightning fast", "Mobile-optimized", "SEO-ready"],
    accent: "from-nova-cyan via-blue-400 to-nova-blue",
  },
  {
    icon: "📅",
    title: "Booking Systems",
    description: "Online scheduling with payments, reminders, and customer profiles.",
    features: ["Online payments", "Auto reminders", "Calendar sync"],
    accent: "from-violet-400 via-purple-400 to-pink-400",
  },
  {
    icon: "⚡",
    title: "AI Automation",
    description: "Automate emails, invoices, and follow-ups. Save hours every week.",
    features: ["Smart workflows", "Email automation", "Lead routing"],
    accent: "from-amber-400 via-orange-400 to-rose-400",
  },
  {
    icon: "📊",
    title: "Digital Dashboards",
    description: "See your sales, customers, and performance all in one place.",
    features: ["Real-time data", "Custom metrics", "Visual reports"],
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
  },
];

/* ─── Tilt Card ─── */
function TiltCard({ card, delay = 0 }: { card: CardData; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0.5, y: 0.5 });
    setHovered(false);
  };

  const handleMouseEnter = () => setHovered(true);

  // Tilt math: ±10deg
  const tiltX = (mouse.y - 0.5) * -10;
  const tiltY = (mouse.x - 0.5) * 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          background:
            "linear-gradient(135deg, rgba(17,17,25,0.95) 0%, rgba(13,13,20,0.95) 100%)",
        }}
      >
        {/* Holographic shimmer overlay (follows cursor) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${mouse.x * 100}% ${
              mouse.y * 100
            }%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 50%)`,
          }}
        />

        {/* Rainbow holographic edge */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 0.6 : 0,
            background: `conic-gradient(from ${mouse.x * 360}deg at ${
              mouse.x * 100
            }% ${mouse.y * 100}%,
              transparent 0deg,
              rgba(0,229,255,0.15) 60deg,
              rgba(168,85,247,0.15) 120deg,
              rgba(236,72,153,0.15) 180deg,
              rgba(245,158,11,0.15) 240deg,
              rgba(0,229,255,0.15) 300deg,
              transparent 360deg)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Glow border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `linear-gradient(135deg, transparent, transparent), linear-gradient(135deg, ${card.accent.replace(
              /from-|via-|to-/g,
              ""
            )})`,
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content */}
        <div className="relative p-5 sm:p-6 h-full flex flex-col" style={{ transform: "translateZ(40px)" }}>
          {/* Icon with floating effect */}
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center text-3xl mb-4 shadow-lg`}
            style={{
              transform: hovered ? "translateZ(30px) scale(1.05)" : "translateZ(0) scale(1)",
              transition: "transform 0.3s ease",
              boxShadow: hovered
                ? "0 10px 40px rgba(0,229,255,0.3)"
                : "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <span style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
              {card.icon}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-base sm:text-lg font-bold text-white mb-2"
            style={{
              transform: hovered ? "translateZ(20px)" : "translateZ(0)",
              transition: "transform 0.3s ease",
            }}
          >
            {card.title}
          </h3>

          {/* Description */}
          <p
            className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 flex-1"
            style={{
              transform: hovered ? "translateZ(15px)" : "translateZ(0)",
              transition: "transform 0.3s ease",
            }}
          >
            {card.description}
          </p>

          {/* Features */}
          <ul
            className="space-y-1.5"
            style={{
              transform: hovered ? "translateZ(10px)" : "translateZ(0)",
              transition: "transform 0.3s ease",
            }}
          >
            {card.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.accent}`}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Corner highlight */}
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 0.6 : 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function HolographicCards() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-nova-cyan/[0.03] via-transparent to-nova-blue/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-nova-cyan font-medium">
            Hover to Explore
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Built With{" "}
            <span className="text-gradient">Premium Tech</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Every solution we build looks this good — and works even better.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CARDS.map((card, i) => (
            <TiltCard key={card.title} card={card} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
