"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Scissors,
  SprayCan,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";


const projectKeys = [
  {
    key: "restaurant",
    icon: UtensilsCrossed,
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    accentColor: "text-orange-400",
    borderColor: "hover:border-orange-500/20",
  },
  {
    key: "barber",
    icon: Scissors,
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentColor: "text-blue-400",
    borderColor: "hover:border-blue-500/20",
  },
  {
    key: "cleaning",
    icon: SprayCan,
    gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    accentColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/20",
  },
];

export default function Portfolio() {
  const { t, tArray } = useI18n();

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("portfolio.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("portfolio.title")}{" "}
            <span className="text-gradient">{t("portfolio.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projectKeys.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group rounded-2xl glass overflow-hidden border border-transparent ${project.borderColor} transition-all duration-500`}
            >
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center">
                    <project.icon className={`w-8 h-8 ${project.accentColor}`} />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-medium ${project.accentColor} glass px-3 py-1 rounded-full`}>
                    {t(`portfolio.items.${project.key}.type`)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-semibold text-white mb-2">
                  {t(`portfolio.items.${project.key}.title`)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {t(`portfolio.items.${project.key}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {tArray(`portfolio.items.${project.key}.tags`).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-gray-500 px-2.5 py-1 rounded-full bg-white/5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm text-nova-cyan hover:text-white transition-colors group/link"
                >
                  {t("portfolio.viewConcept")}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
