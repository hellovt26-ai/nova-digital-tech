"use client";

import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const update = () => {
      // Hide if modal is open (body class set by Contact.tsx)
      if (document.body.classList.contains("modal-open")) {
        setVisible(false);
        return;
      }
      // Hide if form input is focused
      if (document.body.classList.contains("form-focused")) {
        setVisible(false);
        return;
      }
      // Hide if user is near the contact section (within 200px of it)
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisible(false);
          return;
        }
      }
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", update, { passive: true });

    // Watch for body class changes (modal open/close, form focus)
    const observer = new MutationObserver(update);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`sticky-mobile-cta fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-bottom">
        <a
          href="#contact"
          onClick={playClick}
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all active:scale-[0.98]"
        >
          <Rocket className="w-4 h-4" />
          {t("nav.cta")}
        </a>
      </div>
    </div>
  );
}
