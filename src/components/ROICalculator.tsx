"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAccentCycle } from "@/lib/useAccentCycle";

/* ─── Animated Counter ─── */
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 800,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = display;
    const change = value - start;
    const startTime = performance.now();
    let frame: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + change * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ─── Slider Component ─── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = "",
  suffix = "",
  icon,
  accent,
  accent2,
  ct,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  icon: string;
  accent: string;
  accent2: string;
  ct: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium">
          <span className="text-base">{icon}</span>
          {label}
        </label>
        <span
          className="text-sm sm:text-base font-bold tabular-nums"
          style={{ color: accent, transition: ct }}
        >
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer slider-input"
          style={{
            background: `linear-gradient(to right, ${accent} 0%, ${accent2} ${percent}%, rgba(255,255,255,0.05) ${percent}%, rgba(255,255,255,0.05) 100%)`,
            transition: ct,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Main ROI Calculator ─── */
export default function ROICalculator() {
  const { accent, accent2, transition: ct } = useAccentCycle();
  const [customers, setCustomers] = useState(50);
  const [avgRevenue, setAvgRevenue] = useState(150);
  const [hoursWasted, setHoursWasted] = useState(10);

  const results = useMemo(() => {
    const monthlyRevenue = customers * avgRevenue;
    // Industry stats: pro websites + automation = ~35% new customer growth
    const newCustomersFromWeb = Math.round(customers * 0.35);
    const additionalMonthlyRevenue = newCustomersFromWeb * avgRevenue;
    // Time saved (4 weeks/month × $25/hr value)
    const hoursPerMonth = hoursWasted * 4;
    const timeSavingsMonthly = hoursPerMonth * 25;
    // Total annual impact
    const totalAnnualImpact = (additionalMonthlyRevenue + timeSavingsMonthly) * 12;
    // 5-year impact
    const fiveYearImpact = totalAnnualImpact * 5;
    return {
      monthlyRevenue,
      newCustomersFromWeb,
      additionalMonthlyRevenue,
      hoursPerMonth,
      timeSavingsMonthly,
      totalAnnualImpact,
      fiveYearImpact,
    };
  }, [customers, avgRevenue, hoursWasted]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={
        {
          "--roi-accent": accent,
          "--roi-accent2": accent2,
        } as React.CSSProperties
      }
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: `${accent}0d`, transition: ct }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: `${accent2}0d`, transition: ct }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium"
            style={{ color: accent, transition: ct }}
          >
            ROI Calculator
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            See What NOVA Can{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: ct,
              }}
            >
              Earn You
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Move the sliders to match your business. Watch the numbers update live.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {/* ─── LEFT: Inputs ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong rounded-xl p-4 sm:p-5 space-y-5 border border-white/10"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <div
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-sm"
                style={{
                  background: `linear-gradient(135deg, ${accent}33, ${accent2}33)`,
                  transition: ct,
                }}
              >
                📊
              </div>
              <div>
                <h3 className="text-sm font-bold">Your Business</h3>
                <p className="text-[10px] text-gray-500">Adjust to your numbers</p>
              </div>
            </div>

            <Slider
              icon="👥"
              label="Monthly customers"
              value={customers}
              min={10}
              max={500}
              step={5}
              onChange={setCustomers}
              accent={accent}
              accent2={accent2}
              ct={ct}
            />

            <Slider
              icon="💵"
              label="Avg revenue per customer"
              value={avgRevenue}
              min={10}
              max={2000}
              step={10}
              prefix="$"
              onChange={setAvgRevenue}
              accent={accent}
              accent2={accent2}
              ct={ct}
            />

            <Slider
              icon="⏰"
              label="Hours/week on manual tasks"
              value={hoursWasted}
              min={0}
              max={40}
              step={1}
              suffix=" hrs"
              onChange={setHoursWasted}
              accent={accent}
              accent2={accent2}
              ct={ct}
            />

            {/* Current state */}
            <div className="pt-3 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Current monthly revenue</span>
                <span className="font-semibold text-white text-sm">
                  <AnimatedNumber value={results.monthlyRevenue} prefix="$" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: Results ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {/* Hero result */}
            <div
              className="relative rounded-xl p-4 sm:p-5 border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accent}14 0%, ${accent2}14 100%)`,
                borderColor: `${accent}4d`,
                transition: ct,
              }}
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <p
                className="text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{ color: accent, transition: ct }}
              >
                Potential Annual Impact
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <p
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tabular-nums"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transition: ct,
                  }}
                >
                  <AnimatedNumber value={results.totalAnnualImpact} prefix="$" />
                </p>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Extra revenue + time savings, every year
              </p>

              {/* 5 year projection */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Over 5 years</span>
                  <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                    <AnimatedNumber value={results.fiveYearImpact} prefix="$" />
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown cards — 2x2 grid, compact */}
            <div className="grid grid-cols-2 gap-2">
              <div className="glass rounded-lg p-2.5 border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-0.5">
                  <span>🚀</span>
                  <span>New customers</span>
                </div>
                <p className="text-base font-bold text-white tabular-nums">
                  +<AnimatedNumber value={results.newCustomersFromWeb} />
                </p>
              </div>

              <div className="glass rounded-lg p-2.5 border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-0.5">
                  <span>💰</span>
                  <span>Extra/month</span>
                </div>
                <p className="text-base font-bold text-white tabular-nums">
                  <AnimatedNumber
                    value={results.additionalMonthlyRevenue}
                    prefix="$"
                  />
                </p>
              </div>

              <div className="glass rounded-lg p-2.5 border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-0.5">
                  <span>⏱</span>
                  <span>Hrs saved/mo</span>
                </div>
                <p className="text-base font-bold text-white tabular-nums">
                  <AnimatedNumber value={results.hoursPerMonth} suffix=" hrs" />
                </p>
              </div>

              <div className="glass rounded-lg p-2.5 border border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-0.5">
                  <span>💎</span>
                  <span>Time value</span>
                </div>
                <p className="text-base font-bold text-white tabular-nums">
                  <AnimatedNumber
                    value={results.timeSavingsMonthly}
                    prefix="$"
                  />
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={scrollToContact}
              className="w-full mt-1 py-3 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              style={{
                background: `linear-gradient(90deg, ${accent}, ${accent2})`,
                boxShadow: `0 8px 24px ${accent}33`,
                transition: ct,
              }}
            >
              <span>🎯 Get This For My Business</span>
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <p className="text-[9px] text-center text-gray-600">
              *Based on industry averages for small businesses
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider-input::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--roi-accent, #00e5ff),
            var(--roi-accent2, #2979ff)
          );
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }
        .slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .slider-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(
            135deg,
            var(--roi-accent, #00e5ff),
            var(--roi-accent2, #2979ff)
          );
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }
        .slider-input::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}
