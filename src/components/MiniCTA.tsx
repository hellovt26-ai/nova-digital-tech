"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

export default function MiniCTA() {
  const { t } = useI18n();

  return (
    <section className="relative py-16">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl glass-strong p-8 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-nova-cyan/[0.03] via-transparent to-nova-blue/[0.03]" />
          <div className="relative">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {t("miniCta.headline")}
            </h3>
            <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto">
              {t("miniCta.subheadline")}
            </p>
            <a
              href="#contact"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              {t("miniCta.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
