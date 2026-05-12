"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

const transformations = [
  {
    key: "restaurant",
    gradient: "from-orange-500/20 to-red-500/20",
    accent: "text-orange-400",
    borderAccent: "border-orange-500/20",
  },
  {
    key: "barber",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-400",
    borderAccent: "border-blue-500/20",
  },
  {
    key: "cleaning",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    borderAccent: "border-emerald-500/20",
  },
  {
    key: "startup",
    gradient: "from-purple-500/20 to-violet-500/20",
    accent: "text-purple-400",
    borderAccent: "border-purple-500/20",
  },
];

function TransformationCard({ item, index }: { item: typeof transformations[0]; index: number }) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl glass overflow-hidden hover:bg-white/[0.04] transition-all duration-500 card-lift`}
    >
      <div className={`aspect-[16/10] bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full p-4">
            <div className="w-full h-full rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 p-3 overflow-hidden">
              <div className="flex gap-1 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
              </div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="space-y-1.5"
              >
                <div className="h-8 rounded bg-white/10" />
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-6 rounded bg-white/5" />
                  <div className="h-6 rounded bg-white/5" />
                  <div className="h-6 rounded bg-white/5" />
                </div>
                <div className="h-4 w-2/3 rounded bg-white/8" />
                <div className="h-4 w-1/2 rounded bg-white/5" />
                <div className="h-6 w-20 rounded bg-gradient-to-r from-nova-cyan/30 to-nova-blue/20" />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className={`text-[10px] uppercase tracking-wider ${item.accent} font-medium mb-1`}>
          {t(`latestTransformations.items.${item.key}.type`)}
        </div>
        <h3 className="text-sm font-semibold text-white mb-1.5">
          {t(`latestTransformations.items.${item.key}.title`)}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {t(`latestTransformations.items.${item.key}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

export default function LatestTransformations() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nova-blue/[0.015] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("latestTransformations.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("latestTransformations.title")}{" "}
            <span className="text-gradient">{t("latestTransformations.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("latestTransformations.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {transformations.map((item, i) => (
            <TransformationCard key={item.key} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            onClick={playClick}
            className="inline-flex items-center gap-2 text-sm text-nova-cyan hover:text-white transition-colors"
          >
            {t("latestTransformations.cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
