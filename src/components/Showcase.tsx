"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  Calendar,
  Clock,
  User,
  Star,
  Bell,
  Check,
  TrendingUp,
  BarChart3,
  Users,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Scissors,
  UtensilsCrossed,
  SprayCan,
  DollarSign,
  ShoppingCart,
  MapPin,
} from "lucide-react";

function BarberBookingMockup() {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="rounded-[2rem] glass-strong border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
        <div className="bg-gradient-to-b from-nova-cyan/10 to-transparent p-4 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] text-gray-500">Good Morning</p>
              <p className="text-sm font-semibold text-white">Marcus J.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">MJ</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/5 p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Scissors className="w-3.5 h-3.5 text-nova-cyan" />
              <span className="text-xs font-medium text-white">Next Appointment</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-gray-400">Fade + Beard Trim</p>
                <p className="text-[10px] text-gray-500">Today, 2:30 PM</p>
              </div>
              <div className="px-2 py-1 rounded-md bg-emerald-500/20 text-[9px] text-emerald-400 font-medium">Confirmed</div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 space-y-2">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Available Today</p>
          {[
            { name: "DJ Cuts", rating: "4.9", time: "3:00 PM", avail: true },
            { name: "Mike Style", rating: "4.8", time: "4:15 PM", avail: true },
            { name: "Ray Fresh", rating: "5.0", time: "Full", avail: false },
          ].map((barber) => (
            <div key={barber.name} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400/50 to-pink-400/50 flex items-center justify-center text-[8px] font-bold text-white">
                {barber.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-medium text-white">{barber.name}</span>
                  <Star className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" />
                  <span className="text-[9px] text-gray-500">{barber.rating}</span>
                </div>
              </div>
              <span className={`text-[9px] font-medium ${barber.avail ? "text-nova-cyan" : "text-gray-600"}`}>{barber.time}</span>
            </div>
          ))}
          <button className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-nova-cyan to-nova-blue text-[11px] font-semibold text-black">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function RestaurantOrderMockup() {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="rounded-[2rem] glass-strong border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
        <div className="bg-gradient-to-b from-orange-500/10 to-transparent p-4 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-white">Bella Cucina</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" />
                <span className="text-[10px] text-gray-400">4.8 (324 reviews)</span>
              </div>
            </div>
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center text-[7px] font-bold text-white">3</div>
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            {["Popular", "Pizza", "Pasta", "Salads"].map((cat, i) => (
              <span key={cat} className={`px-2.5 py-1 rounded-full text-[9px] font-medium ${i === 0 ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-gray-500"}`}>{cat}</span>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4 space-y-2">
          {[
            { name: "Margherita Pizza", price: "$14.99", cal: "850 cal" },
            { name: "Truffle Pasta", price: "$18.99", cal: "720 cal" },
            { name: "Caesar Salad", price: "$11.99", cal: "380 cal" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-orange-400/60" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium text-white">{item.name}</p>
                <p className="text-[9px] text-gray-500">{item.cal}</p>
              </div>
              <span className="text-[11px] font-semibold text-orange-400">{item.price}</span>
            </div>
          ))}
          <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Order Total</span>
              <span className="text-sm font-bold text-white">$45.97</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="w-full rounded-2xl glass-strong border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-[10px] text-gray-500">Business Dashboard — Nova CRM</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: "Revenue", value: "$12,450", change: "+18%", icon: DollarSign },
            { label: "Bookings", value: "284", change: "+45%", icon: Calendar },
            { label: "Customers", value: "1,203", change: "+22%", icon: Users },
            { label: "Messages", value: "38", change: "New", icon: MessageSquare },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[8px] font-medium text-emerald-400">{stat.change}</span>
              </div>
              <p className="text-base font-bold text-white">{stat.value}</p>
              <p className="text-[9px] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium text-gray-400">Revenue Overview</span>
              <BarChart3 className="w-3.5 h-3.5 text-nova-cyan/50" />
            </div>
            <div className="flex items-end gap-1 h-16">
              {[35, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-nova-cyan/40 to-nova-blue/20" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <span className="text-[10px] font-medium text-gray-400">Recent</span>
            <div className="mt-2 space-y-2">
              {[
                { name: "Sarah M.", action: "Booked" },
                { name: "James K.", action: "Paid" },
                { name: "Lisa R.", action: "Review" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-500/40 flex items-center justify-center text-[7px] font-bold text-white">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[9px] text-white">{item.name}</p>
                    <p className="text-[7px] text-gray-500">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
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
            {t("showcase.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("showcase.title")}{" "}
            <span className="text-gradient">{t("showcase.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <DashboardMockup />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("showcase.dashboard.title")}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t("showcase.dashboard.description")}
            </p>
            <div className="space-y-3">
              {["1", "2", "3"].map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-nova-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-nova-cyan" />
                  </div>
                  <span className="text-sm text-gray-300">{t(`showcase.dashboard.features.${key}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <BarberBookingMockup />
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              {t("showcase.barber.title")}
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              {t("showcase.barber.description")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center"
          >
            <RestaurantOrderMockup />
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">
              {t("showcase.restaurant.title")}
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              {t("showcase.restaurant.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
