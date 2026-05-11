"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  CalendarCheck,
  Palette,
  Bot,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const serviceKeys = [
  { key: "web", icon: Globe, color: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { key: "mobile", icon: Smartphone, color: "from-blue-500/20 to-indigo-500/20", iconColor: "text-blue-400" },
  { key: "booking", icon: CalendarCheck, color: "from-emerald-500/20 to-cyan-500/20", iconColor: "text-emerald-400" },
  { key: "branding", icon: Palette, color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
  { key: "ai", icon: Bot, color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400" },
  { key: "setup", icon: Layers, color: "from-pink-500/20 to-rose-500/20", iconColor: "text-pink-400" },
];

export default function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("services.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("services.title")}{" "}
            <span className="text-gradient">{t("services.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceKeys.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl glass p-6 lg:p-8 hover:bg-white/[0.06] transition-all duration-500 cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}
              >
                <service.icon className={`w-6 h-6 ${service.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t(`services.items.${service.key}.description`)}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-nova-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                {t("services.learnMore")} <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
