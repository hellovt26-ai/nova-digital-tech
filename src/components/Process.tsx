"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, Headphones } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const stepKeys = [
  { key: "discover", icon: Search, number: "01" },
  { key: "design", icon: PenTool, number: "02" },
  { key: "build", icon: Code2, number: "03" },
  { key: "launch", icon: Rocket, number: "04" },
  { key: "support", icon: Headphones, number: "05" },
];

export default function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nova-blue/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("process.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("process.title")}{" "}
            <span className="text-gradient">{t("process.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {stepKeys.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-flex mb-5">
                  <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center relative z-10">
                    <step.icon className="w-6 h-6 text-nova-cyan" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center text-[10px] font-bold text-black z-20">
                    {step.number.replace("0", "")}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t(`process.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t(`process.steps.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
