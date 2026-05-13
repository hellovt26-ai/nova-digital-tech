"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CreditCard,
  ArrowRight,
  Check,
  Sparkles,
  Globe,
  Palette,
  Code2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick, playHover } from "@/lib/sounds";

const ApplePayIcon = () => (
  <svg className="h-5" viewBox="0 0 50 20" fill="currentColor">
    <path d="M9.6 3.5c-.6.7-1.6 1.3-2.5 1.2-.1-1 .4-2 .9-2.6C8.6 1.4 9.7.8 10.5.8c.1 1-.3 2-.9 2.7zm.9 1.4c-1.4-.1-2.6.8-3.2.8-.7 0-1.7-.7-2.8-.7C3 5 1.5 6 .7 7.5c-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.7 0 0-2.5-1-2.5-3.8 0-2.4 2-3.5 2-3.5-1.1-1.6-2.8-1.8-3.3-1.8z"/>
    <path d="M21.6 1.3c3.3 0 5.6 2.3 5.6 5.6 0 3.3-2.3 5.6-5.7 5.6h-3.6v5.8h-2.7V1.3h6.4zm-3.7 9h3c2.3 0 3.6-1.2 3.6-3.4 0-2.2-1.3-3.4-3.6-3.4h-3v6.8zm10 5.2c0-2.1 1.6-3.4 4.5-3.6l3.3-.2v-.9c0-1.3-.9-2.1-2.4-2.1-1.4 0-2.3.7-2.5 1.7h-2.5c.1-2.2 2-3.8 5.1-3.8 3 0 4.9 1.6 4.9 4v8.5h-2.5v-2h-.1c-.7 1.4-2.3 2.3-3.9 2.3-2.4 0-3.9-1.5-3.9-3.9zm7.8-1.2V13l-3 .2c-1.5.1-2.3.8-2.3 1.8 0 1.1.9 1.8 2.2 1.8 1.7 0 3.1-1.2 3.1-2.7zm5 8.4v-2.1c.2 0 .6.1.8.1 1.2 0 1.8-.5 2.2-1.7l.2-.7L39 6.7h2.8l3 9.8h.1l3-9.8H51l-4.6 13.1c-1.1 3-2.3 4-4.8 4-.3 0-.7 0-.9-.1z"/>
  </svg>
);

const GooglePayIcon = () => (
  <svg className="h-5" viewBox="0 0 41 17" fill="none">
    <path d="M19.5 8.3v4.9h-1.6V1.3h4.1c1 0 1.9.3 2.6 1 .7.7 1.1 1.5 1.1 2.5 0 1-.4 1.8-1.1 2.5-.7.7-1.6 1-2.6 1h-2.5zm0-5.5v4h2.6c.6 0 1.1-.2 1.5-.6.4-.4.6-.9.6-1.4 0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.5-.6h-2.6z" fill="currentColor" opacity="0.7"/>
    <path d="M30.2 5.2c1.2 0 2.1.3 2.8 1 .7.7 1 1.6 1 2.8v4.2h-1.5v-.9h-.1c-.6 1-1.5 1.1-2.3 1.1-.8 0-1.6-.2-2.1-.7-.6-.5-.8-1.1-.8-1.8 0-.8.3-1.4.9-1.9.6-.4 1.4-.7 2.4-.7.9 0 1.6.2 2.1.5v-.3c0-.5-.2-1-.6-1.3-.4-.4-.9-.5-1.4-.5-.8 0-1.5.3-1.9 1L27.3 7c.6-.9 1.6-1.4 2.9-1.4zm-1.8 6.2c0 .4.2.7.5.9.3.3.7.4 1.1.4.6 0 1.2-.2 1.6-.7.5-.4.7-.9.7-1.5-.4-.4-1-.5-1.8-.5-.6 0-1.1.1-1.4.4-.5.2-.7.5-.7.9z" fill="currentColor" opacity="0.7"/>
    <path d="M40.7 5.5l-5.3 12.2h-1.6l2-4.3-3.5-7.9h1.7l2.5 6.1h0l2.5-6.1h1.7z" fill="currentColor" opacity="0.7"/>
    <path d="M13.1 7.3c0-.5 0-.9-.1-1.4H6.7v2.6h3.6c-.2.9-.7 1.6-1.4 2.1v1.7h2.3c1.3-1.2 2-3 2-5z" fill="#4285F4"/>
    <path d="M6.7 13.9c1.9 0 3.5-.6 4.7-1.7l-2.3-1.7c-.6.4-1.4.7-2.4.7-1.8 0-3.4-1.2-3.9-2.9H.4v1.8c1.2 2.3 3.5 3.8 6.3 3.8z" fill="#34A853"/>
    <path d="M2.8 9.2c-.3-.9-.3-1.8 0-2.7V4.8H.4C-.5 6.5-.5 8.5.4 10.2l2.4-1z" fill="#FBBC04"/>
    <path d="M6.7 3.6c1 0 2 .4 2.7 1.1l2-2C10.2 1.5 8.5.8 6.7.8 3.9.8 1.6 2.3.4 4.7l2.4 1.8c.5-1.6 2.1-2.9 3.9-2.9z" fill="#EA4335"/>
  </svg>
);

const deposits = [
  {
    key: "website",
    icon: Globe,
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    amount: "$150",
    stripeLink: "https://buy.stripe.com/cNi5kwaGc4nccdb327fjG00",
  },
  {
    key: "branding",
    icon: Palette,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    amount: "$75",
    stripeLink: "https://buy.stripe.com/9B67sEcOk4nc5ON5affjG01",
  },
  {
    key: "app",
    icon: Code2,
    color: "from-emerald-500/20 to-cyan-500/20",
    iconColor: "text-emerald-400",
    amount: "$250",
    stripeLink: "https://buy.stripe.com/3cI6oAcOk9HwdhfauzfjG02",
  },
];

const trustPoints = [
  { icon: Lock, key: 0 },
  { icon: Shield, key: 1 },
  { icon: CreditCard, key: 2 },
  { icon: Sparkles, key: 3 },
];

export default function ProjectDeposit() {
  const { t } = useI18n();

  return (
    <section id="deposit" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nova-cyan/[0.01] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("deposit.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("deposit.title")}{" "}
            <span className="text-gradient">{t("deposit.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            {t("deposit.subtitle")}
          </p>
        </motion.div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-nova-cyan/10 border border-nova-cyan/20 flex items-center justify-center text-[10px] font-bold text-nova-cyan">
                {i + 1}
              </div>
              <span className="text-xs text-gray-500">{t(`deposit.steps.${i}`)}</span>
              {i < 2 && <ArrowRight className="w-3 h-3 text-gray-700 ml-2 hidden sm:block" />}
            </div>
          ))}
        </motion.div>

        {/* Deposit cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {deposits.map((dep, i) => (
            <motion.div
              key={dep.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={playHover}
              className="group relative rounded-2xl glass p-6 hover:bg-white/[0.05] transition-all duration-300 card-lift text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dep.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <dep.icon className={`w-6 h-6 ${dep.iconColor}`} />
              </div>

              <h3 className="text-base font-semibold text-white mb-1">
                {t(`deposit.items.${dep.key}.title`)}
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {t(`deposit.items.${dep.key}.description`)}
              </p>

              <div className="text-2xl font-bold text-gradient mb-1">
                {dep.amount}
              </div>
              <p className="text-[10px] text-gray-600 mb-5">
                {t("deposit.depositNote")}
              </p>

              <a
                href={dep.stripeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white glass rounded-xl hover:bg-white/10 transition-all active:scale-95 group-hover:border-nova-cyan/20"
              >
                <Lock className="w-3.5 h-3.5 text-nova-cyan" />
                {t("deposit.cta")}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Scope note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-600 mb-10"
        >
          {t("deposit.scopeNote")}
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl glass p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {trustPoints.map((tp, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-nova-cyan/10 flex items-center justify-center flex-shrink-0">
                  <tp.icon className="w-4 h-4 text-nova-cyan" />
                </div>
                <span className="text-xs text-gray-400 leading-tight">
                  {t(`deposit.trust.${i}`)}
                </span>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-center gap-5">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">{t("deposit.acceptedLabel")}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-gray-500">
                <CreditCard className="w-4 h-4" />
                <span className="text-[11px]">Visa / Mastercard</span>
              </div>
              <div className="text-gray-500">
                <ApplePayIcon />
              </div>
              <div className="text-gray-500">
                <GooglePayIcon />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
