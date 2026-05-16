"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  CalendarCheck,
  Palette,
  Rocket,
  Check,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";
import { useAccentCycle } from "@/lib/useAccentCycle";

const features = [
  { icon: Globe, key: 0 },
  { icon: Smartphone, key: 1 },
  { icon: CalendarCheck, key: 2 },
  { icon: Palette, key: 3 },
  { icon: Rocket, key: 4 },
];

export default function FeaturedOffer() {
  const { t } = useI18n();
  const { accent, accent2, transition: ct } = useAccentCycle();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-nova-cyan/[0.04] rounded-full blur-[180px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nova-cyan/10 border border-nova-cyan/20 text-xs text-nova-cyan font-medium mb-5">
              <Zap className="w-3.5 h-3.5" />
              {t("featuredOffer.badge")}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t("featuredOffer.title")}{" "}
              <span className="text-gradient">{t("featuredOffer.titleAccent")}</span>
            </h2>

            <p className="mt-5 text-gray-400 leading-relaxed text-lg">
              {t("featuredOffer.description")}
            </p>

            <div className="mt-8 space-y-3">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-gray-300">{t(`featuredOffer.features.${i}`)}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                {t("featuredOffer.cta")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t("featuredOffer.availability")}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="rounded-2xl glass-strong p-6"
              style={{
                boxShadow: `0 0 30px ${accent}26, 0 0 60px ${accent}0d`,
                transition: ct,
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="ml-3 flex-1 h-5 rounded bg-white/5 flex items-center px-2">
                  <span className="text-[9px] text-gray-600">yourbusiness.com</span>
                </div>
              </div>

              <div className="space-y-3">
                <div
                  className="rounded-xl border border-white/5 p-4"
                  style={{
                    background: `linear-gradient(135deg, ${accent}1a, ${accent2}0d)`,
                    transition: ct,
                  }}
                >
                  <div className="h-3 w-2/3 bg-white/15 rounded mb-2" />
                  <div className="h-2 w-full bg-white/5 rounded mb-1" />
                  <div className="h-2 w-4/5 bg-white/5 rounded" />
                  <div className="mt-3 flex gap-2">
                    <div
                      className="h-7 px-4 rounded-lg flex items-center"
                      style={{
                        background: `linear-gradient(90deg, ${accent}4d, ${accent2}4d)`,
                        transition: ct,
                      }}
                    >
                      <span className="text-[9px] text-white/60">Book Now</span>
                    </div>
                    <div className="h-7 px-4 rounded-lg bg-white/5 flex items-center">
                      <span className="text-[9px] text-white/40">Learn More</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: Globe, label: "Website" },
                    { icon: CalendarCheck, label: "Booking" },
                    { icon: Smartphone, label: "Mobile" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-lg bg-white/[0.03] border border-white/5 p-3 text-center"
                    >
                      <item.icon
                        className="w-4 h-4 mx-auto mb-1"
                        style={{ color: `${accent}80`, transition: ct }}
                      />
                      <span className="text-[9px] text-gray-500">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] text-gray-400">Booking System</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] text-emerald-400">Active</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const hot = [3, 5, 8, 11].includes(i);
                      return (
                        <div
                          key={i}
                          className={`h-4 rounded text-[7px] flex items-center justify-center ${
                            hot ? "" : "bg-white/5 text-gray-700"
                          }`}
                          style={
                            hot
                              ? {
                                  background: `${accent}33`,
                                  color: `${accent}99`,
                                  transition: ct,
                                }
                              : undefined
                          }
                        >
                          {i + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-12 rounded-xl glass-strong p-3"
              style={{
                boxShadow: `0 0 30px ${accent2}26, 0 0 60px ${accent2}0d`,
                transition: ct,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-medium text-white">Mobile Ready</div>
                  <div className="text-[9px] text-gray-500">98% Score</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
