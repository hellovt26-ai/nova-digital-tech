"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Smartphone,
  Workflow,
  Cpu,
  Headphones,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const reasonKeys = [
  { key: "growth", icon: TrendingUp },
  { key: "premium", icon: Award },
  { key: "mobile", icon: Smartphone },
  { key: "workflow", icon: Workflow },
  { key: "ai", icon: Cpu },
  { key: "support", icon: Headphones },
];

export default function WhyChooseUs() {
  const { t } = useI18n();

  return (
    <section id="why-us" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nova-cyan/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("whyUs.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("whyUs.title")}{" "}
            <span className="text-gradient">{t("whyUs.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasonKeys.map((reason, i) => (
            <motion.div
              key={reason.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl p-6 lg:p-8 group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-11 h-11 rounded-lg bg-nova-cyan/10 flex items-center justify-center mb-4 group-hover:bg-nova-cyan/15 transition-colors">
                  <reason.icon className="w-5 h-5 text-nova-cyan" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t(`whyUs.items.${reason.key}.title`)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t(`whyUs.items.${reason.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
