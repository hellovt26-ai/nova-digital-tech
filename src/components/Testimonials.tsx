"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const testimonialKeys = ["1", "2", "3"] as const;

const avatarGradients = [
  "from-cyan-400 to-blue-500",
  "from-purple-400 to-pink-500",
  "from-emerald-400 to-cyan-500",
];

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
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
            {t("testimonials.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("testimonials.title")}{" "}
            <span className="text-gradient">{t("testimonials.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonialKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl glass p-6 lg:p-8 group hover:bg-white/[0.04] transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-nova-cyan/20 mb-4" />
              <p className="text-sm text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{t(`testimonials.items.${key}.quote`)}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[i]} flex items-center justify-center text-white text-sm font-bold`}>
                  {t(`testimonials.items.${key}.name`).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {t(`testimonials.items.${key}.name`)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t(`testimonials.items.${key}.role`)}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="w-3 h-3 text-yellow-500/80" fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
