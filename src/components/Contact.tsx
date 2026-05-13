"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  Globe,
  Palette,
  Code2,
  Check,
  ArrowRight,
  Shield,
  X,
  Sparkles,
  Home,
  FolderOpen,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sounds";

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const serviceOptionKeys = [
  "website",
  "mobileApp",
  "bookingSystem",
  "branding",
  "aiAutomation",
  "notSure",
] as const;

const budgetRanges = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const languageOptions = [
  { value: "English", label: "English" },
  { value: "French", label: "Français" },
  { value: "Haitian Creole", label: "Kreyòl Ayisyen" },
];

const consultationOptions = [
  {
    id: "website",
    title: "Website Consultation",
    description: "For business websites, landing pages, redesigns, and online presence help.",
    amount: 150,
    displayAmount: "$150",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30 hover:border-cyan-400",
    activeColor: "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10",
    iconColor: "text-cyan-400",
    popular: true,
    stripeLink: "https://buy.stripe.com/cNi5kwaGc4nccdb327fjG00",
  },
  {
    id: "branding",
    title: "Branding Consultation",
    description: "For logos, branding, flyers, social media visuals, and business identity.",
    amount: 75,
    displayAmount: "$75",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30 hover:border-purple-400",
    activeColor: "border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/10",
    iconColor: "text-purple-400",
    popular: false,
    stripeLink: "https://buy.stripe.com/9B67sEcOk4nc5ON5affjG01",
  },
  {
    id: "app",
    title: "App & Automation",
    description: "For mobile apps, booking systems, dashboards, AI tools, and automation workflows.",
    amount: 250,
    displayAmount: "$250",
    icon: Code2,
    color: "from-emerald-500 to-cyan-500",
    borderColor: "border-emerald-500/30 hover:border-emerald-400",
    activeColor: "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/10",
    iconColor: "text-emerald-400",
    popular: false,
    stripeLink: "https://buy.stripe.com/3cI6oAcOk9HwdhfauzfjG02",
  },
];

type FlowStep = "form" | "modal" | "processing" | "success" | "cancelled";

const STORAGE_KEY = "nova_consultation_data";

export default function Contact() {
  const { t } = useI18n();
  const [step, setStep] = useState<FlowStep>("form");
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    language: "",
    budget: "",
    message: "",
  });

  // Hide sticky CTA and scroll-to-top when modal is open
  useEffect(() => {
    if (step === "modal") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [step]);

  // Check URL params on mount for Stripe return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const consultationStatus = params.get("consultation");

    if (consultationStatus === "success") {
      // Send the saved form data email
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        sendEmail(data);
        localStorage.removeItem(STORAGE_KEY);
      }
      setStep("success");
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (consultationStatus === "cancelled") {
      setStep("cancelled");
      window.history.replaceState({}, "", window.location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendEmail = useCallback(async (data: Record<string, string>) => {
    try {
      await fetch("https://formsubmit.co/ajax/hellovt26@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Paid Consultation Request — NOVA DIGITAL TECH`,
          _template: "table",
          "Consultation Type": data.consultationType || "N/A",
          "Payment Amount": data.paymentAmount || "N/A",
          "Client Name": data.name,
          "Business Name": data.business || "N/A",
          "Client Email": data.email,
          "Phone Number": data.phone || "N/A",
          "Service Needed": data.service,
          "Preferred Language": data.language || "N/A",
          "Budget Range": data.budget || "N/A",
          "Project Message": data.message || "N/A",
          "Submitted At": new Date().toLocaleString(),
        }),
      });
    } catch {
      // Silently fail — payment already confirmed
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStep("modal");
  };

  const handleSecureConsultation = () => {
    if (!selectedConsultation) return;
    playClick();

    const option = consultationOptions.find((o) => o.id === selectedConsultation);
    if (!option) return;

    // Save form data + consultation info to localStorage
    const dataToSave = {
      ...formData,
      consultationType: option.title,
      paymentAmount: option.displayAmount,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    // Close modal first, then redirect
    setStep("processing");
    setTimeout(() => {
      window.location.href = option.stripeLink;
    }, 300);
  };

  const handleBackToForm = () => {
    playClick();
    setStep("form");
    setSelectedConsultation(null);
  };

  // ─── PROCESSING / REDIRECTING STATE ───
  if (step === "processing") {
    return (
      <section id="contact" className="relative py-24 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-20 h-20 rounded-full bg-nova-cyan/10 border border-nova-cyan/20 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-nova-cyan animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Redirecting to <span className="text-gradient">Secure Payment</span>
            </h2>
            <p className="text-gray-400 text-sm">
              You&apos;re being redirected to Stripe for secure checkout...
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── SUCCESS STATE ───
  if (step === "success") {
    return (
      <section id="contact" className="relative py-24 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Consultation <span className="text-gradient">Confirmed</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Thank you. Your consultation request has been received.
              We&apos;ll review your project details and contact you soon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all active:scale-95"
              >
                <Home className="w-4 h-4" />
                Back To Home
              </a>
              <a
                href="#portfolio"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white glass rounded-xl hover:bg-white/10 transition-all active:scale-95"
              >
                <FolderOpen className="w-4 h-4" />
                Visit Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── CANCELLED STATE ───
  if (step === "cancelled") {
    return (
      <section id="contact" className="relative py-24 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Consultation <span className="text-amber-400">Not Completed</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Your request was not submitted yet. Please complete your consultation
              payment to confirm your project request.
            </p>
            <button
              onClick={() => { setStep("form"); playClick(); }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all active:scale-95"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Return To Form
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── MAIN FORM + MODAL ───
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-cyan/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-nova-cyan font-medium">
            {t("contact.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("contact.title")}{" "}
            <span className="text-gradient">{t("contact.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleContinue}
            className="lg:col-span-3 space-y-5"
          >
            {/* Name + Business */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.form.namePlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {t("contact.form.business")}
                </label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder={t("contact.form.businessPlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-transparent"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("contact.form.phonePlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-transparent"
                />
              </div>
            </div>

            {/* Service + Language */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {t("contact.form.service")}
                </label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-[#111119] appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
                >
                  <option value="" disabled>
                    {t("contact.form.servicePlaceholder")}
                  </option>
                  {serviceOptionKeys.map((key) => (
                    <option key={key} value={t(`contact.form.serviceOptions.${key}`)} className="bg-[#111119]">
                      {t(`contact.form.serviceOptions.${key}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Preferred Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-[#111119] appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
                >
                  <option value="" disabled>Select language</option>
                  {languageOptions.map((lang) => (
                    <option key={lang.value} value={lang.value} className="bg-[#111119]">
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-[#111119] appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
              >
                <option value="" disabled>Select your budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range} className="bg-[#111119]">
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                {t("contact.form.message")}
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.form.messagePlaceholder")}
                className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-transparent resize-none"
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              Continue To Consultation Options
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          {/* Right sidebar — contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-5">
                <a href="mailto:hellovt26@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center group-hover:bg-nova-cyan/20 transition-colors">
                    <Mail className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t("contact.info.emailLabel")}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">hellovt26@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center">
                    <InstagramIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t("contact.info.socialLabel")}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <a href="https://www.instagram.com/novadigitaltech" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-nova-cyan transition-colors">Instagram</a>
                      <span className="text-gray-600">|</span>
                      <a href="https://www.facebook.com/share/19VhkMaqdY/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-nova-cyan transition-colors">Facebook</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                    <YouTubeIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Music</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <a href="https://www.youtube.com/@DjSonikmusic" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-red-400 transition-colors">DJ Sonik</a>
                      <span className="text-gray-600">|</span>
                      <a href="https://www.youtube.com/@Djpulzemusic1" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-red-400 transition-colors">DJ Pulze</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t("contact.info.locationLabel")}</p>
                    <p className="text-sm text-gray-300">{t("contact.info.locationValue")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl glass p-6">
              <h4 className="text-sm font-semibold text-white mb-2">{t("contact.guarantee.title")}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{t("contact.guarantee.description")}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── CONSULTATION OPTIONS MODAL ─── */}
      <AnimatePresence>
        {step === "modal" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={handleBackToForm}
            />

            {/* Modal — full screen on mobile, centered card on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full sm:max-w-3xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-[#0c0c14] sm:rounded-3xl sm:glass-strong border-t sm:border border-white/10 p-5 sm:p-8 shadow-2xl shadow-black/40"
            >
              {/* Close button — sticky on mobile so always visible */}
              <button
                onClick={handleBackToForm}
                className="sticky top-0 ml-auto p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/10 z-10 flex items-center gap-1.5 mb-2"
              >
                <span className="text-xs sm:hidden">Close</span>
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 pt-2">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-nova-cyan/10 border border-nova-cyan/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-nova-cyan" />
                </div>
                <h3 className="text-xl sm:text-3xl font-bold text-white">
                  Choose Your <span className="text-gradient">Consultation</span>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                  This fee reserves your review time and may be applied toward your project.
                </p>
              </div>

              {/* Consultation Cards — stacked on mobile, 3 cols on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
                {consultationOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => { setSelectedConsultation(option.id); playClick(); }}
                    className={`relative rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                      selectedConsultation === option.id ? option.activeColor : option.borderColor
                    }`}
                  >
                    {option.popular && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-full whitespace-nowrap">
                        Most Popular
                      </div>
                    )}

                    <div className="flex sm:block items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} bg-opacity-20 flex items-center justify-center sm:mb-3 flex-shrink-0`}>
                        <option.icon className={`w-5 h-5 ${option.iconColor}`} />
                      </div>
                      <div className="flex-1 sm:block">
                        <div className="flex sm:block items-center justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-white">{option.title}</h4>
                            <p className="text-[11px] text-gray-500 leading-relaxed hidden sm:block sm:mb-3 sm:mt-1">{option.description}</p>
                          </div>
                          <div className="text-right sm:text-left">
                            <div className="text-xl sm:text-2xl font-bold text-white">{option.displayAmount}</div>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed sm:hidden mt-0.5">{option.description}</p>
                      </div>
                    </div>

                    {selectedConsultation === option.id && (
                      <div className="absolute top-3 right-3 sm:top-3 sm:right-3 w-5 h-5 rounded-full bg-nova-cyan flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Reassurance text */}
              <p className="text-center text-[11px] text-gray-500 mb-5">
                No full project payment required today.
              </p>

              {/* Secure button — sticky on mobile */}
              <div className="sticky bottom-0 bg-[#0c0c14] sm:bg-transparent pt-3 pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
                <button
                  onClick={handleSecureConsultation}
                  disabled={!selectedConsultation}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <Lock className="w-4 h-4" />
                  Secure My Consultation
                </button>

                {/* Trust footer */}
                <div className="mt-3 flex items-center justify-center gap-4 text-[10px] sm:text-[11px] text-gray-600 pb-2">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-nova-cyan" />
                    Secure payment via Stripe
                  </span>
                  <span className="text-gray-700">•</span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-nova-cyan" />
                    256-bit SSL
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
