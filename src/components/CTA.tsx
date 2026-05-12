"use client";

import { motion } from "framer-motion";
import { Rocket, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

export default function CTA() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-nova-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("cta.headline")}{" "}
            <span className="text-gradient">{t("cta.headlineAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
            {t("cta.subheadline")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              {t("cta.ctaPrimary")}
              <Rocket className="w-4 h-4" />
            </a>
            <a
              href="mailto:hellovt26@gmail.com"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white glass rounded-xl hover:bg-white/10 transition-all active:scale-95"
            >
              <Mail className="w-4 h-4" />
              {t("cta.ctaSecondary")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
