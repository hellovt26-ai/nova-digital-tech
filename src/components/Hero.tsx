"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Bot,
  TrendingUp,
  CalendarCheck,
  Palette,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  const trustBadges = [
    { icon: Rocket, label: t("hero.trustBadges.fastDelivery") },
    { icon: Zap, label: t("hero.trustBadges.modernTech") },
    { icon: Smartphone, label: t("hero.trustBadges.mobileFriendly") },
    { icon: TrendingUp, label: t("hero.trustBadges.growthFocused") },
  ];

  const floatingCards = [
    { label: t("hero.floatingCards.moreCustomers"), icon: TrendingUp, delay: 0 },
    { label: t("hero.floatingCards.onlineBooking"), icon: CalendarCheck, delay: 0.2 },
    { label: t("hero.floatingCards.aiAutomation"), icon: Bot, delay: 0.4 },
    { label: t("hero.floatingCards.modernBranding"), icon: Palette, delay: 0.6 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nova-cyan/5 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-nova-blue/5 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-nova-cyan font-medium mb-6">
              <Shield className="w-3.5 h-3.5" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {t("hero.headline")}{" "}
              <span className="text-gradient">{t("hero.headlineAccent")}</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl">
              {t("hero.subheadline")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.02]"
              >
                {t("hero.ctaPrimary")}
                <Rocket className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white glass rounded-xl hover:bg-white/10 transition-all"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <badge.icon className="w-4 h-4 text-nova-cyan/60" />
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl glass-strong overflow-hidden glow-cyan">
                <div className="absolute inset-0 bg-gradient-to-br from-nova-cyan/10 to-nova-blue/10" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <div className="ml-4 flex-1 h-6 rounded-md bg-white/5" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-1/3 h-24 rounded-lg bg-gradient-to-br from-nova-cyan/20 to-transparent border border-white/5 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-nova-cyan/50" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 rounded bg-white/10" />
                        <div className="h-3 w-1/2 rounded bg-white/5" />
                        <div className="h-8 w-full rounded-lg bg-gradient-to-r from-nova-cyan/20 to-nova-blue/20 mt-2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 rounded-lg bg-white/5 border border-white/5" />
                      ))}
                    </div>
                    <div className="h-20 rounded-lg bg-white/5 border border-white/5" />
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-8 w-32 rounded-xl glass-strong p-3 glow-blue"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-nova-blue" />
                  <span className="text-[10px] text-gray-400">{t("hero.mobileApp")}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full rounded bg-white/10" />
                  <div className="h-2 w-2/3 rounded bg-white/5" />
                  <div className="h-6 rounded bg-gradient-to-r from-nova-blue/30 to-transparent mt-1" />
                </div>
              </motion.div>

              {floatingCards.map((card, i) => {
                const positions = [
                  "-left-12 top-4",
                  "-left-8 bottom-16",
                  "-right-10 bottom-8",
                  "right-16 -top-4",
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + card.delay }}
                    className={`absolute ${positions[i]} z-10`}
                  >
                    <motion.div
                      animate={{ y: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg glass-strong text-[11px] text-gray-300 whitespace-nowrap"
                    >
                      <card.icon className="w-3.5 h-3.5 text-nova-cyan" />
                      {card.label}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
