"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, Check, Monitor, Smartphone, CalendarCheck, Palette, Bot, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const transformKeys = ["1", "2", "3"] as const;

const transformIcons = {
  before: [Monitor, CalendarCheck, Palette],
  after: [Smartphone, Bot, Clock],
};

function BeforeVisual({ index }: { index: number }) {
  const visuals = [
    <div key="web" className="w-full h-full rounded-lg bg-gray-900 border border-gray-800 p-2 overflow-hidden">
      <div className="flex gap-1 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
      </div>
      <div className="h-2 w-3/4 bg-gray-800 rounded mb-1.5" />
      <div className="h-2 w-1/2 bg-gray-800 rounded mb-1.5" />
      <div className="h-6 w-full bg-gray-800/50 rounded" />
      <div className="mt-1.5 grid grid-cols-2 gap-1">
        <div className="h-4 bg-gray-800/30 rounded" />
        <div className="h-4 bg-gray-800/30 rounded" />
      </div>
    </div>,
    <div key="book" className="w-full h-full rounded-lg bg-gray-900 border border-gray-800 p-2 flex flex-col items-center justify-center gap-1.5">
      <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
        <Clock className="w-4 h-4 text-gray-600" />
      </div>
      <div className="h-1.5 w-12 bg-gray-800 rounded" />
      <div className="h-1.5 w-8 bg-gray-800/50 rounded" />
    </div>,
    <div key="brand" className="w-full h-full rounded-lg bg-gray-900 border border-gray-800 p-2 flex flex-col items-center justify-center gap-1.5">
      <div className="w-10 h-6 rounded bg-gray-800 flex items-center justify-center text-[8px] text-gray-600 font-bold">LOGO</div>
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded bg-gray-700" />
        <div className="w-3 h-3 rounded bg-gray-700" />
        <div className="w-3 h-3 rounded bg-gray-700" />
      </div>
    </div>,
  ];
  return visuals[index];
}

function AfterVisual({ index }: { index: number }) {
  const visuals = [
    <div key="web" className="w-full h-full rounded-lg bg-gradient-to-br from-[#0d1117] to-[#0a0a15] border border-nova-cyan/20 p-2 overflow-hidden">
      <div className="flex gap-1 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
      </div>
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-3/4 bg-gradient-to-r from-nova-cyan/30 to-nova-blue/20 rounded mb-1.5" />
      <div className="h-2 w-1/2 bg-white/10 rounded mb-1.5" />
      <div className="h-6 w-full bg-gradient-to-r from-nova-cyan/20 to-nova-blue/10 rounded" />
      <div className="mt-1.5 grid grid-cols-2 gap-1">
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} className="h-4 bg-nova-cyan/10 rounded" />
        <div className="h-4 bg-nova-blue/10 rounded" />
      </div>
    </div>,
    <div key="book" className="w-full h-full rounded-lg bg-gradient-to-br from-[#0d1117] to-[#0a0a15] border border-emerald-500/20 p-2 flex flex-col items-center justify-center gap-1.5">
      <div className="w-8 h-8 rounded bg-emerald-500/15 flex items-center justify-center">
        <CalendarCheck className="w-4 h-4 text-emerald-400" />
      </div>
      <motion.div animate={{ width: ["2rem", "3rem", "2rem"] }} transition={{ duration: 2, repeat: Infinity }} className="h-1.5 bg-emerald-400/30 rounded" />
      <div className="h-1.5 w-8 bg-emerald-400/15 rounded" />
    </div>,
    <div key="brand" className="w-full h-full rounded-lg bg-gradient-to-br from-[#0d1117] to-[#0a0a15] border border-purple-500/20 p-2 flex flex-col items-center justify-center gap-1.5">
      <div className="w-10 h-6 rounded bg-gradient-to-r from-nova-cyan/30 to-nova-blue/30 flex items-center justify-center text-[8px] text-nova-cyan font-bold">NOVA</div>
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded bg-nova-cyan/30" />
        <div className="w-3 h-3 rounded bg-nova-blue/30" />
        <div className="w-3 h-3 rounded bg-purple-500/30" />
      </div>
    </div>,
  ];
  return visuals[index];
}

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
              className="rounded-2xl glass p-6 lg:p-8 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 hidden sm:block">
                    <BeforeVisual index={i} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </div>
                      <p className="text-xs text-red-400/70 uppercase tracking-wider font-medium">
                        {t("transformation.before")}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {t(`transformation.items.${key}.before`)}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-nova-cyan to-nova-blue flex items-center justify-center shadow-lg shadow-nova-cyan/20"
                  >
                    <ArrowRight className="w-4 h-4 text-black" />
                  </motion.div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 hidden sm:block">
                    <AfterVisual index={i} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-xs text-emerald-400/70 uppercase tracking-wider font-medium">
                        {t("transformation.after")}
                      </p>
                    </div>
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
