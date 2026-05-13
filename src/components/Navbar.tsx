"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick, playNav } from "@/lib/sounds";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.whyUs"), href: "#why-us" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.process"), href: "#process" },
    { label: t("nav.packages"), href: "#packages" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          <a href="#" className="flex items-center group" onClick={playClick}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nova-digital-tech/logo.png"
              alt="NOVA Digital Tech"
              width={156}
              height={156}
              className="w-[156px] h-[156px] object-contain drop-shadow-[0_0_15px_rgba(0,136,255,0.5)]"
            />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={playNav}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 active:scale-95"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3">
              <LanguageSwitcher />
            </div>
            <a
              href="#contact"
              onClick={playClick}
              className="ml-3 px-5 py-2.5 text-sm font-medium text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-lg hover:shadow-lg hover:shadow-nova-cyan/20 transition-all active:scale-95"
            >
              {t("nav.cta")}
            </a>
          </div>

          <button
            onClick={() => { setMobileOpen(!mobileOpen); playClick(); }}
            className="lg:hidden p-2 text-gray-400 hover:text-white active:scale-90 transition-transform"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => { setMobileOpen(false); playNav(); }}
                  className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors active:scale-[0.98]"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-1">
                <LanguageSwitcher mobile />
              </div>
              <a
                href="#contact"
                onClick={() => { setMobileOpen(false); playClick(); }}
                className="block mt-2 px-4 py-3 text-sm font-medium text-center text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-lg active:scale-[0.98]"
              >
                {t("nav.cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
