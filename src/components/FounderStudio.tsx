"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Lightbulb, Rocket, Users, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const studioValues = [
  { icon: Code2, color: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { icon: Palette, color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
  { icon: Lightbulb, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
  { icon: Rocket, color: "from-emerald-500/20 to-cyan-500/20", iconColor: "text-emerald-400" },
];

function WorkScene({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl glass-strong overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DesignReviewScene() {
  return (
    <WorkScene className="p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">N</div>
        <div>
          <div className="text-xs font-medium text-white">Design Review</div>
          <div className="text-[10px] text-gray-500">In Progress</div>
        </div>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="h-20 rounded-lg bg-gradient-to-br from-nova-cyan/15 to-nova-blue/10 border border-white/5 flex items-center justify-center">
          <Palette className="w-6 h-6 text-nova-cyan/40" />
        </div>
        <div className="h-20 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/5 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-400/40" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div className="h-2 flex-1 rounded bg-white/10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div className="h-2 w-3/4 rounded bg-white/10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-nova-cyan/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-nova-cyan animate-pulse" />
          </div>
          <div className="h-2 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </WorkScene>
  );
}

function CodeScene() {
  return (
    <WorkScene className="p-5 h-full">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[10px] text-gray-600">app.tsx</span>
      </div>
      <div className="font-mono text-[10px] leading-relaxed space-y-0.5">
        <div><span className="text-purple-400">const</span> <span className="text-cyan-300">App</span> <span className="text-gray-500">=</span> <span className="text-gray-400">() =&gt; {"{"}</span></div>
        <div className="pl-3"><span className="text-purple-400">return</span> <span className="text-gray-400">(</span></div>
        <div className="pl-5"><span className="text-emerald-400">&lt;Layout&gt;</span></div>
        <div className="pl-7"><span className="text-blue-400">&lt;Hero</span> <span className="text-orange-300">title</span><span className="text-gray-500">=</span><span className="text-emerald-300">&quot;...&quot;</span> <span className="text-blue-400">/&gt;</span></div>
        <div className="pl-7"><span className="text-blue-400">&lt;Services /&gt;</span></div>
        <div className="pl-7"><span className="text-blue-400">&lt;Booking</span> <span className="text-orange-300">realTime</span> <span className="text-blue-400">/&gt;</span></div>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="pl-7"
        >
          <span className="text-gray-600">|</span>
        </motion.div>
      </div>
    </WorkScene>
  );
}

function CollabScene() {
  return (
    <WorkScene className="p-5 h-full">
      <div className="text-xs font-medium text-white mb-3">Team Activity</div>
      <div className="space-y-3">
        {[
          { name: "Design", color: "from-purple-400 to-pink-400", progress: 95, initial: "D" },
          { name: "Development", color: "from-cyan-400 to-blue-400", progress: 72, initial: "C" },
          { name: "Launch Prep", color: "from-emerald-400 to-cyan-400", progress: 40, initial: "L" },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-[8px] font-bold text-white`}>{item.initial}</div>
              <span className="text-[10px] text-gray-400">{item.name}</span>
              <span className="ml-auto text-[10px] text-gray-500">{item.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex -space-x-2">
        {["from-cyan-400 to-blue-500", "from-purple-400 to-pink-500", "from-emerald-400 to-cyan-500", "from-amber-400 to-orange-500"].map((g, i) => (
          <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${g} border-2 border-[#0a0a0f] flex items-center justify-center text-[8px] font-bold text-white`}>
            {["N", "D", "S", "A"][i]}
          </div>
        ))}
        <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#0a0a0f] flex items-center justify-center text-[8px] text-gray-400">+2</div>
      </div>
    </WorkScene>
  );
}

export default function FounderStudio() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-nova-blue/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nova-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
              {t("founder.label")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t("founder.title")}{" "}
              <span className="text-gradient">{t("founder.titleAccent")}</span>
            </h2>
            <p className="mt-5 text-gray-400 leading-relaxed">
              {t("founder.description")}
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed text-sm">
              {t("founder.description2")}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {studioValues.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${val.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <val.icon className={`w-4 h-4 ${val.iconColor}`} />
                  </div>
                  <span className="text-sm text-gray-300">
                    {t(`founder.values.${i}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <DesignReviewScene />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl glass-strong p-4 text-center"
              >
                <div className="text-2xl font-bold text-gradient">100%</div>
                <div className="text-[10px] text-gray-500 mt-1">{t("founder.stat")}</div>
              </motion.div>
            </div>
            <div className="space-y-3 pt-6">
              <CodeScene />
              <CollabScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
