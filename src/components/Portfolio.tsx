"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Star,
  Clock,
  Bell,
  UtensilsCrossed,
  ShoppingCart,
  MapPin,
  SprayCan,
  Home,
  ArrowRight,
  Smartphone,
  Monitor,
  Music,
  Headphones,
  Sliders,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { playClick, playHover } from "@/lib/sounds";
import { useAccentCycle } from "@/lib/useAccentCycle";

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[260px] mx-auto">
      <div className="rounded-[2.5rem] glass-strong border border-white/10 overflow-hidden shadow-2xl shadow-black/60 p-1.5">
        <div className="rounded-[2rem] bg-[#0c0c14] overflow-hidden">
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-20 h-5 rounded-full bg-black border border-white/5" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function LaptopMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="rounded-t-xl glass-strong border border-white/10 border-b-0 overflow-hidden shadow-2xl shadow-black/60">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <div className="ml-3 flex-1 h-4 rounded bg-white/5 max-w-[200px]" />
        </div>
        <div className="bg-[#0c0c14]">
          {children}
        </div>
      </div>
      <div className="h-3 bg-gradient-to-b from-white/10 to-white/5 rounded-b-lg mx-4" />
    </div>
  );
}

const BARBERS = [
  { name: "DJ Cuts", rating: "4.9", time: "3:00 PM", avail: true, specialty: "Fades & Tapers" },
  { name: "Mike Style", rating: "4.8", time: "4:15 PM", avail: true, specialty: "Beard Design" },
  { name: "Ray Fresh", rating: "5.0", time: "Full", avail: false, specialty: "Kids Cuts" },
  { name: "Tony Blendz", rating: "4.9", time: "5:30 PM", avail: true, specialty: "Skin Fades" },
  { name: "Sam Sharp", rating: "4.7", time: "6:00 PM", avail: true, specialty: "Classic Cuts" },
  { name: "Lou Lining", rating: "5.0", time: "Full", avail: false, specialty: "Line-ups" },
];

function BarberProject() {
  const { accent, accent2, transition: ct } = useAccentCycle();
  return (
    <PhoneMockup>
      <div
        className="p-4"
        style={{
          background: `linear-gradient(to bottom, ${accent}14, transparent)`,
          transition: ct,
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] text-gray-500">Good Morning</p>
            <p className="text-sm font-semibold text-white">Marcus J.</p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent2})`,
              transition: ct,
            }}
          >
            MJ
          </div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="w-3.5 h-3.5" style={{ color: accent, transition: ct }} />
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
        <div className="rounded-xl bg-white/5 border border-white/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-medium text-white">Reminder Sent</span>
          </div>
          <p className="text-[10px] text-gray-500">Client notified 1 hour before appointment</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Available Barbers</p>
        {/* Auto-scrolling live demo list */}
        <div className="overflow-hidden" style={{ height: 156 }}>
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            className="space-y-2"
          >
            {[...BARBERS, ...BARBERS].map((barber, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${accent}80, ${accent2}80)`,
                    transition: ct,
                  }}
                >
                  {barber.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-medium text-white">{barber.name}</span>
                    <Star className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" />
                    <span className="text-[9px] text-gray-500">{barber.rating}</span>
                  </div>
                  <p className="text-[8px] text-gray-600">{barber.specialty}</p>
                </div>
                <span
                  className="text-[9px] font-medium"
                  style={
                    barber.avail
                      ? { color: accent, transition: ct }
                      : { color: "#4b5563" }
                  }
                >
                  {barber.time}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {["Fade", "Lineup", "Beard"].map((s) => (
            <div key={s} className="text-center py-2 rounded-lg bg-white/5 border border-white/5 text-[9px] text-gray-400">{s}</div>
          ))}
        </div>
        <button
          className="w-full mt-2 py-2.5 rounded-xl text-[11px] font-semibold text-black"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent2})`,
            transition: ct,
          }}
        >
          Book Appointment
        </button>
      </div>
    </PhoneMockup>
  );
}

function RestaurantProject() {
  const { accent, accent2, transition: ct } = useAccentCycle();
  return (
    <LaptopMockup>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accent}4d, ${accent2}4d)`,
                transition: ct,
              }}
            >
              <UtensilsCrossed
                className="w-3.5 h-3.5"
                style={{ color: accent, transition: ct }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Bella Cucina</p>
              <div className="flex items-center gap-1">
                <Star className="w-2 h-2 text-yellow-500" fill="currentColor" />
                <span className="text-[8px] text-gray-500">4.8 (324)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 text-[9px] text-gray-500">
            <span className="text-white">Menu</span>
            <span>Reservations</span>
            <span>About</span>
          </div>
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-gray-400" />
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-[6px] font-bold text-white"
              style={{ background: accent, transition: ct }}
            >
              3
            </div>
          </div>
        </div>

        <div
          className="rounded-xl border p-4 mb-4"
          style={{
            background: `linear-gradient(90deg, ${accent}1a, ${accent2}0d)`,
            borderColor: `${accent}1a`,
            transition: ct,
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">Order Online</p>
          <p className="text-[10px] text-gray-400 mb-3">Fresh Italian cuisine delivered to your door</p>
          <div className="flex gap-2">
            {["Popular", "Pizza", "Pasta", "Salads", "Desserts"].map((cat, i) => (
              <span
                key={cat}
                className={`px-2.5 py-1 rounded-full text-[8px] font-medium ${i === 0 ? "" : "bg-white/5 text-gray-500"}`}
                style={
                  i === 0
                    ? { background: `${accent}33`, color: accent, transition: ct }
                    : undefined
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { name: "Margherita Pizza", price: "$14.99", time: "20 min" },
            { name: "Truffle Pasta", price: "$18.99", time: "25 min" },
            { name: "Caesar Salad", price: "$11.99", time: "10 min" },
            { name: "Tiramisu", price: "$9.99", time: "5 min" },
          ].map((item) => (
            <div key={item.name} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
              <div
                className="w-full h-12 rounded-md flex items-center justify-center mb-2"
                style={{
                  background: `linear-gradient(135deg, ${accent}1a, ${accent2}0d)`,
                  transition: ct,
                }}
              >
                <UtensilsCrossed
                  className="w-4 h-4"
                  style={{ color: `${accent}66`, transition: ct }}
                />
              </div>
              <p className="text-[10px] font-medium text-white">{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: accent, transition: ct }}
                >
                  {item.price}
                </span>
                <span className="text-[8px] text-gray-600"><Clock className="w-2 h-2 inline mr-0.5" />{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-lg border p-3 flex items-center justify-between"
          style={{
            background: `linear-gradient(90deg, ${accent}1a, transparent)`,
            borderColor: `${accent}1a`,
            transition: ct,
          }}
        >
          <div>
            <p className="text-[10px] text-gray-400">Cart Total (3 items)</p>
            <p className="text-sm font-bold text-white">$45.97</p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-[10px] font-semibold text-white"
            style={{ background: accent, transition: ct }}
          >
            Checkout
          </button>
        </div>
      </div>
    </LaptopMockup>
  );
}

function CleaningProject() {
  const { accent, accent2, transition: ct } = useAccentCycle();
  return (
    <LaptopMockup>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accent}4d, ${accent2}4d)`,
                transition: ct,
              }}
            >
              <SprayCan
                className="w-3.5 h-3.5"
                style={{ color: accent, transition: ct }}
              />
            </div>
            <p className="text-xs font-semibold text-white">CleanPro Services</p>
          </div>
          <div className="flex gap-3 text-[9px] text-gray-500">
            <span className="text-white">Services</span>
            <span>Pricing</span>
            <span>Areas</span>
            <span>Book Now</span>
          </div>
        </div>

        <div
          className="rounded-xl border p-4 mb-4"
          style={{
            background: `linear-gradient(90deg, ${accent}1a, ${accent2}0d)`,
            borderColor: `${accent}1a`,
            transition: ct,
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">Book Your Clean</p>
          <p className="text-[10px] text-gray-400 mb-3">Professional cleaning, hassle-free scheduling</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "Standard", price: "$120", icon: Home },
              { name: "Deep Clean", price: "$220", icon: SprayCan },
              { name: "Move-In/Out", price: "$350", icon: MapPin },
            ].map((pkg) => {
              const active = pkg.name === "Deep Clean";
              return (
                <div
                  key={pkg.name}
                  className={`rounded-lg p-2.5 text-center border ${active ? "" : "bg-white/[0.03] border-white/5"}`}
                  style={
                    active
                      ? {
                          background: `${accent}1a`,
                          borderColor: `${accent}33`,
                          transition: ct,
                        }
                      : undefined
                  }
                >
                  <pkg.icon
                    className="w-4 h-4 mx-auto mb-1"
                    style={
                      active
                        ? { color: accent, transition: ct }
                        : { color: "#6b7280" }
                    }
                  />
                  <p className="text-[9px] font-medium text-white">{pkg.name}</p>
                  <p
                    className="text-[10px] font-semibold"
                    style={
                      active
                        ? { color: accent, transition: ct }
                        : { color: "#9ca3af" }
                    }
                  >
                    {pkg.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <p className="text-[10px] font-medium text-gray-400 mb-2">Select Date</p>
            <div className="grid grid-cols-5 gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                <div
                  key={d}
                  className={`text-center py-1.5 rounded text-[8px] ${i === 2 ? "font-medium" : "bg-white/5 text-gray-500"}`}
                  style={
                    i === 2
                      ? { background: `${accent}33`, color: accent, transition: ct }
                      : undefined
                  }
                >
                  <p>{d}</p>
                  <p className="font-semibold">{12 + i}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <p className="text-[10px] font-medium text-gray-400 mb-2">Time Slots</p>
            <div className="space-y-1">
              {["9:00 AM", "11:00 AM", "2:00 PM"].map((time, i) => (
                <div
                  key={time}
                  className={`px-2 py-1.5 rounded text-[9px] text-center ${i === 1 ? "" : "bg-white/5 text-gray-500"}`}
                  style={
                    i === 1
                      ? { background: `${accent}33`, color: accent, transition: ct }
                      : undefined
                  }
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border p-3 flex items-center justify-between"
          style={{
            background: `linear-gradient(90deg, ${accent}1a, transparent)`,
            borderColor: `${accent}1a`,
            transition: ct,
          }}
        >
          <div>
            <p className="text-[10px] text-gray-400">Deep Clean — Wed, Jan 14</p>
            <p className="text-sm font-bold text-white">$220.00</p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-[10px] font-semibold text-white"
            style={{ background: accent, transition: ct }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </LaptopMockup>
  );
}

const projects = [
  {
    key: "barber",
    MockupComponent: BarberProject,
    deviceIcon: Smartphone,
    deviceLabel: "Mobile App",
    color: "from-cyan-500/20 to-blue-500/20",
    accentColor: "text-nova-cyan",
  },
  {
    key: "restaurant",
    MockupComponent: RestaurantProject,
    deviceIcon: Monitor,
    deviceLabel: "Website + Ordering",
    color: "from-orange-500/20 to-red-500/20",
    accentColor: "text-orange-400",
  },
  {
    key: "cleaning",
    MockupComponent: CleaningProject,
    deviceIcon: Monitor,
    deviceLabel: "Website + Booking",
    color: "from-emerald-500/20 to-cyan-500/20",
    accentColor: "text-emerald-400",
  },
];

export default function Portfolio() {
  const { t, tArray } = useI18n();

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
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
            {t("portfolio.label")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("portfolio.title")}{" "}
            <span className="text-gradient">{t("portfolio.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl glass-strong border border-nova-cyan/20 glow-cyan overflow-hidden mb-24"
        >
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <CheckCircle className="w-3 h-3" />
              {t("portfolio.live")}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10 items-center">
            <div>
              <PhoneMockup>
                <div className="bg-gradient-to-b from-purple-500/10 to-transparent p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Mix-MasterPro</p>
                      <p className="text-[9px] text-gray-500">Studio Session</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-gray-400">Track 1 — Vocals</span>
                      <Headphones className="w-3 h-3 text-purple-400" />
                    </div>
                    <div className="h-8 rounded-lg bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-purple-500/10 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-purple-500/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
                        {[65,42,88,35,72,50,95,28,60,78,40,85,55,30,92,48,70,38,82,58,25,75,45,90,33,68,52,80,44,62].map((h, i) => (
                          <div key={i} className="w-[2px] bg-purple-400/60 rounded-full" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-gray-400">Track 2 — Beat</span>
                      <Sliders className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div className="h-8 rounded-lg bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-cyan-500/5 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
                        {[50,72,35,85,42,68,28,78,55,90,38,62,48,75,30,82,58,40,70,25,88,45,65,32,80,52,74,36,60,46].map((h, i) => (
                          <div key={i} className="w-[2px] bg-cyan-400/50 rounded-full" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {["EQ", "Reverb", "Delay", "Filter"].map((fx) => (
                      <div key={fx} className="text-center py-2 rounded-lg bg-white/5 border border-white/5 text-[8px] text-gray-400">{fx}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-2 text-center">
                      <p className="text-[9px] text-purple-400 font-medium">Vocal Preset</p>
                    </div>
                    <div className="rounded-lg bg-white/5 border border-white/5 p-2 text-center">
                      <p className="text-[9px] text-gray-500">Master Preset</p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-[11px] font-semibold text-white">
                    Export Mix
                  </button>
                </div>
              </PhoneMockup>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">iOS App — Live on App Store</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Mix-MasterPro
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t("portfolio.items.mixmaster.description")}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["iOS App", "Audio Engine", "Multi-Track Mixing", "Studio UI", "Subscription Model"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full glass text-[11px] text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="https://apps.apple.com/ca/app/mix-masterpro/id6761647582"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                {t("portfolio.viewAppStore")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              onMouseEnter={playHover}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <project.MockupComponent />
              </div>

              <div className={i % 2 === 1 ? "lg:col-start-1" : ""}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <project.deviceIcon className={`w-4 h-4 ${project.accentColor}`} />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {t(`portfolio.items.${project.key}.type`)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {t(`portfolio.items.${project.key}.title`)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {t(`portfolio.items.${project.key}.description`)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tArray(`portfolio.items.${project.key}.tags`).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full glass text-[11px] text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 text-sm text-nova-cyan hover:text-white transition-colors font-medium"
                >
                  {t("portfolio.cta")}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
