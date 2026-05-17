"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Lightbulb, Rocket, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAccentCycle } from "@/lib/useAccentCycle";

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
  const { accent, accent2, transition: ct } = useAccentCycle();
  return (
    <WorkScene className="p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            transition: ct,
          }}
        >
          N
        </div>
        <div>
          <div className="text-xs font-medium text-white">Design Review</div>
          <div className="text-[10px] text-gray-500">In Progress</div>
        </div>
        <div className="ml-auto flex gap-1 items-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div
          className="h-20 rounded-lg border border-white/5 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accent}26, ${accent2}1a)`,
            transition: ct,
          }}
        >
          <Palette className="w-6 h-6" style={{ color: `${accent}66`, transition: ct }} />
        </div>
        <div
          className="h-20 rounded-lg border border-white/5 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accent2}26, ${accent}1a)`,
            transition: ct,
          }}
        >
          <Sparkles className="w-6 h-6" style={{ color: `${accent2}66`, transition: ct }} />
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
          <div
            className="w-5 h-5 rounded flex items-center justify-center"
            style={{ background: `${accent}33`, transition: ct }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: accent, transition: ct }}
            />
          </div>
          <div className="h-2 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </WorkScene>
  );
}

// Each line: indent (px) + array of {t:text, c:colorClass} tokens
const CODE_LINES: { indent: number; tokens: { t: string; c: string }[] }[] = [
  { indent: 0, tokens: [{ t: "const ", c: "text-purple-400" }, { t: "App", c: "text-cyan-300" }, { t: " = ", c: "text-gray-500" }, { t: "() => {", c: "text-gray-400" }] },
  { indent: 12, tokens: [{ t: "return ", c: "text-purple-400" }, { t: "(", c: "text-gray-400" }] },
  { indent: 20, tokens: [{ t: "<Layout>", c: "text-emerald-400" }] },
  { indent: 28, tokens: [{ t: "<Hero ", c: "text-blue-400" }, { t: "title", c: "text-orange-300" }, { t: "=", c: "text-gray-500" }, { t: '"NOVA"', c: "text-emerald-300" }, { t: " />", c: "text-blue-400" }] },
  { indent: 28, tokens: [{ t: "<Services />", c: "text-blue-400" }] },
  { indent: 28, tokens: [{ t: "<Booking ", c: "text-blue-400" }, { t: "realTime", c: "text-orange-300" }, { t: " />", c: "text-blue-400" }] },
  { indent: 28, tokens: [{ t: "<AIChat />", c: "text-blue-400" }] },
  { indent: 20, tokens: [{ t: "</Layout>", c: "text-emerald-400" }] },
  { indent: 12, tokens: [{ t: ")", c: "text-gray-400" }] },
  { indent: 0, tokens: [{ t: "}", c: "text-gray-400" }] },
];

function CodeScene() {
  const { accent, transition: ct } = useAccentCycle();
  // typed = total characters typed so far across all lines
  const [typed, setTyped] = useState(0);

  const totalChars = CODE_LINES.reduce(
    (sum, l) => sum + l.tokens.reduce((s, tk) => s + tk.t.length, 0),
    0
  );

  useEffect(() => {
    if (typed < totalChars) {
      // Type 2 chars per tick at 60ms — same visual speed, ~half the re-renders
      const id = setTimeout(
        () => setTyped((p) => Math.min(p + 2, totalChars)),
        60
      );
      return () => clearTimeout(id);
    }
    // Finished — hold, then restart the live demo
    const id = setTimeout(() => setTyped(0), 2600);
    return () => clearTimeout(id);
  }, [typed, totalChars]);

  // Render lines up to the current typed position
  let remaining = typed;
  const rendered: React.ReactNode[] = [];
  for (let li = 0; li < CODE_LINES.length; li++) {
    const line = CODE_LINES[li];
    const lineLen = line.tokens.reduce((s, tk) => s + tk.t.length, 0);
    if (remaining <= 0) break;
    const take = Math.min(remaining, lineLen);
    let used = 0;
    const tokenEls: React.ReactNode[] = [];
    for (let ti = 0; ti < line.tokens.length; ti++) {
      const tk = line.tokens[ti];
      if (used >= take) break;
      const slice = tk.t.slice(0, Math.max(0, take - used));
      if (slice)
        tokenEls.push(
          <span key={ti} className={tk.c}>
            {slice}
          </span>
        );
      used += tk.t.length;
    }
    rendered.push(
      <div key={li} style={{ paddingLeft: line.indent }}>
        {tokenEls}
        {take < lineLen && (
          <span
            className="inline-block w-[6px] h-[10px] align-middle ml-px animate-pulse"
            style={{ background: accent, transition: ct }}
          />
        )}
      </div>
    );
    remaining -= lineLen;
    if (take < lineLen) break;
  }

  return (
    <WorkScene className="p-5 h-full">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[10px] text-gray-600">app.tsx</span>
        <span
          className="ml-auto text-[8px] font-medium flex items-center gap-1"
          style={{ color: accent, transition: ct }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: accent }}
          />
          building…
        </span>
      </div>
      <div className="font-mono text-[10px] leading-relaxed space-y-0.5 min-h-[170px]">
        {rendered}
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
  const { accent } = useAccentCycle();

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
                <div
                  className="text-2xl font-bold"
                  style={{ color: accent, transition: "color 1s ease" }}
                >
                  100%
                </div>
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
