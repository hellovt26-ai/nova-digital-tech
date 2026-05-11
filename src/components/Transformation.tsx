"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, Check, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const transformKeys = ["1", "2", "3"] as const;

export default function Transformation() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32">
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
            {t("transformation.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("transformation.title")}{" "}
            <span className="text-gradient">{t("transformation.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {transformKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl glass p-6 lg:p-8"
            >
              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-red-400/70 uppercase tracking-wider mb-1">
                      {t("transformation.before")}
                    </p>
                    <p className="text-sm text-gray-400">
                      {t(`transformation.items.${key}.before`)}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nova-cyan to-nova-blue flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400/70 uppercase tracking-wider mb-1">
                      {t("transformation.after")}
                    </p>
                    <p className="text-sm text-gray-300 font-medium">
                      {t(`transformation.items.${key}.after`)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
