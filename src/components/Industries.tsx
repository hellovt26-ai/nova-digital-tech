"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Scissors,
  SprayCan,
  Rocket,
  Store,
  Sparkles,
  Truck,
  Briefcase,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playHover } from "@/lib/sounds";

const industryKeys = [
  { key: "restaurants", icon: UtensilsCrossed, color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400", glow: "group-hover:shadow-orange-500/10" },
  { key: "barbershops", icon: Scissors, color: "from-blue-500/20 to-indigo-500/20", iconColor: "text-blue-400", glow: "group-hover:shadow-blue-500/10" },
  { key: "cleaning", icon: SprayCan, color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400", glow: "group-hover:shadow-emerald-500/10" },
  { key: "startups", icon: Rocket, color: "from-purple-500/20 to-violet-500/20", iconColor: "text-purple-400", glow: "group-hover:shadow-purple-500/10" },
  { key: "local", icon: Store, color: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400", glow: "group-hover:shadow-cyan-500/10" },
  { key: "beauty", icon: Sparkles, color: "from-pink-500/20 to-rose-500/20", iconColor: "text-pink-400", glow: "group-hover:shadow-pink-500/10" },
  { key: "logistics", icon: Truck, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400", glow: "group-hover:shadow-amber-500/10" },
  { key: "entrepreneurs", icon: Briefcase, color: "from-indigo-500/20 to-purple-500/20", iconColor: "text-indigo-400", glow: "group-hover:shadow-indigo-500/10" },
];

export default function Industries() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nova-cyan/[0.015] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("industries.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("industries.title")}{" "}
            <span className="text-gradient">{t("industries.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("industries.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {industryKeys.map((industry, i) => (
            <motion.div
              key={industry.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onMouseEnter={playHover}
              className={`group relative rounded-2xl glass p-5 lg:p-6 hover:bg-white/[0.06] transition-all duration-300 cursor-default card-lift ${industry.glow} hover:shadow-lg`}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <industry.icon className={`w-5 h-5 ${industry.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {t(`industries.items.${industry.key}.title`)}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t(`industries.items.${industry.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
