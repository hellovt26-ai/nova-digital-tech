"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

const packageKeys = [
  { key: "starter", popular: false },
  { key: "pro", popular: true },
  { key: "app", popular: false },
];

export default function Packages() {
  const { t, tArray } = useI18n();

  return (
    <section id="packages" className="relative py-24 lg:py-32">
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
            {t("packages.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("packages.title")}{" "}
            <span className="text-gradient">{t("packages.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("packages.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-5">
          {packageKeys.map((pkg, i) => {
            const features = tArray(`packages.items.${pkg.key}.features`);

            return (
              <motion.div
                key={pkg.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-500 ${
                  pkg.popular
                    ? "glass-strong border border-nova-cyan/20 glow-cyan"
                    : "glass hover:bg-white/[0.04]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 text-xs font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-full">
                      <Star className="w-3 h-3" fill="currentColor" />
                      {t("packages.mostPopular")}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {t(`packages.items.${pkg.key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {t(`packages.items.${pkg.key}.subtitle`)}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-nova-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-nova-cyan" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={playClick}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                    pkg.popular
                      ? "text-black bg-gradient-to-r from-nova-cyan to-nova-blue hover:shadow-lg hover:shadow-nova-cyan/25"
                      : "text-white glass hover:bg-white/10"
                  }`}
                >
                  {t(`packages.items.${pkg.key}.cta`)}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          {t("packages.customNote")}
        </motion.p>
      </div>
    </section>
  );
}
