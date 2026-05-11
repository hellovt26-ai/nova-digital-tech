"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, AtSign } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const serviceOptionKeys = [
  "website",
  "mobileApp",
  "bookingSystem",
  "branding",
  "aiAutomation",
  "notSure",
] as const;

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New Inquiry from ${formData.name} — ${formData.service}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nBusiness: ${formData.business}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hellovt26@gmail.com?subject=${subject}&body=${body}`;
  };

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
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
          >
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

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                {t("contact.form.service")}
              </label>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white focus:outline-none focus:ring-1 focus:ring-nova-cyan/30 transition-all bg-[#111119] appearance-none cursor-pointer"
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

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-nova-cyan to-nova-blue rounded-xl hover:shadow-lg hover:shadow-nova-cyan/25 transition-all hover:scale-[1.02]"
            >
              {t("contact.form.submit")}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>

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
                <a
                  href="mailto:hellovt26@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center group-hover:bg-nova-cyan/20 transition-colors">
                    <Mail className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {t("contact.info.emailLabel")}
                    </p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      hellovt26@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center">
                    <AtSign className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {t("contact.info.socialLabel")}
                    </p>
                    <p className="text-sm text-gray-300">@novadigitaltech</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {t("contact.info.locationLabel")}
                    </p>
                    <p className="text-sm text-gray-300">
                      {t("contact.info.locationValue")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl glass p-6">
              <h4 className="text-sm font-semibold text-white mb-2">
                {t("contact.guarantee.title")}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("contact.guarantee.description")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
