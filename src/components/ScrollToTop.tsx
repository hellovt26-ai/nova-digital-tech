"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { playClick } from "@/lib/sounds";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      // Hide if modal is open
      if (document.body.classList.contains("modal-open")) {
        setVisible(false);
        return;
      }
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", update, { passive: true });

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
    <button
      onClick={() => {
        playClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Back to top"
      className={`scroll-to-top fixed bottom-20 lg:bottom-6 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center text-nova-cyan shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 hover:bg-white/15 hover:border-nova-cyan/30 active:scale-95 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
