"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

const transformations = [
  {
    key: "restaurant",
    gradient: "from-orange-500/20 to-red-500/20",
    accent: "text-orange-400",
    videoId: "V6iChXof_Ek",
    thumbnail: "https://img.youtube.com/vi/V6iChXof_Ek/hqdefault.jpg",
  },
  {
    key: "barber",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-400",
    videoId: "NZTVJ57hDGk",
    thumbnail: "https://img.youtube.com/vi/NZTVJ57hDGk/hqdefault.jpg",
  },
  {
    key: "cleaning",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    videoId: "K0XmP-SSvYU",
    thumbnail: "https://img.youtube.com/vi/K0XmP-SSvYU/hqdefault.jpg",
  },
  {
    key: "startup",
    gradient: "from-purple-500/20 to-violet-500/20",
    accent: "text-purple-400",
    videoId: "gpyX0euLJdo",
    thumbnail: "https://img.youtube.com/vi/gpyX0euLJdo/hqdefault.jpg",
  },
];

function TransformationCard({ item, index }: { item: typeof transformations[0]; index: number }) {
  const [playing, setPlaying] = useState(false);
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl glass overflow-hidden hover:bg-white/[0.04] transition-all duration-500 card-lift"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        {playing ? (
          <div className="w-full h-full relative">
            {/* Scale up and shift to crop out Veo watermark */}
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-[-5%] left-[-2%] w-[104%] h-[115%]"
              />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(false); playClick(); }}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setPlaying(true); playClick(); }}
            className={`w-full h-full bg-gradient-to-br ${item.gradient} relative cursor-pointer`}
          >
            {/* YouTube thumbnail as background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: `url(${item.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white/80">
              0:08
            </div>
          </button>
        )}
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
