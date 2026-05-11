"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "AI / ML", color: "#00E5FF" },
  { name: "iOS", color: "#ffffff" },
  { name: "Android", color: "#3DDC84" },
  { name: "Node.js", color: "#68A063" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind", color: "#38BDF8" },
  { name: "PostgreSQL", color: "#336791" },
];

export default function TechStack() {
  const { t } = useI18n();

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.3em] text-gray-500 mb-10"
        >
          {t("techStack.label")}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass hover:bg-white/[0.06] transition-all cursor-default"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tech.color, opacity: 0.7 }}
              />
              <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
