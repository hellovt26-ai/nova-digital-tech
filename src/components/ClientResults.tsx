"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Eye, Smartphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const statIcons = [TrendingUp, Clock, Eye, Smartphone];

export default function ClientResults() {
  const { t } = useI18n();

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-nova-cyan/[0.03] via-transparent to-nova-blue/[0.03]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {["1", "2", "3", "4"].map((key, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-nova-cyan/10 mb-4">
                  <Icon className="w-5 h-5 text-nova-cyan" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {t(`clientResults.items.${key}.value`)}
                </div>
                <p className="text-sm text-gray-400">
                  {t(`clientResults.items.${key}.label`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
