"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { playClick } from "@/lib/sounds";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        playClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center text-white shadow-lg shadow-nova-cyan/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
