"use client";

import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-bottom">
        <a
          href="#contact"
          onClick={playClick}
          className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all active:scale-[0.98]"
        >
          <Rocket className="w-4 h-4" />
          {t("nav.cta")}
        </a>
      </div>
    </div>
  );
}
