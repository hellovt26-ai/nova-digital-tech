"use client";

import { useEffect, useState } from "react";

/* ─── Types ─── */
interface Activity {
  name: string;
  location: string;
  action: string;
  emoji: string;
  minutesAgo: number;
}

/* ─── Activity Pool ─── */
const FIRST_NAMES = [
  "Marc", "Sophia", "Jean", "Daniela", "Alex", "Maria", "Carlos", "Jasmine",
  "Pierre", "Rachel", "David", "Nathalie", "Mike", "Sandra", "Patrick",
  "Stephanie", "Jonathan", "Emily", "Kervens", "Fabienne", "Ricardo",
  "Tanya", "Anthony", "Jessica", "Wood", "Christine", "Marcus", "Lisa",
];

const LOCATIONS = [
  "Miami", "Brooklyn", "Boston", "Montreal", "Port-au-Prince", "Orlando",
  "Atlanta", "Queens", "Newark", "Hialeah", "Cap-Haïtien", "Toronto",
  "Houston", "Philadelphia", "Tampa", "Bronx", "Fort Lauderdale", "Chicago",
  "Pétion-Ville", "Washington DC", "Brockton", "Spring Valley",
];

const ACTIONS: { text: string; emoji: string }[] = [
  { text: "booked a free consultation", emoji: "📅" },
  { text: "started a website project", emoji: "🌐" },
  { text: "requested a quote", emoji: "💼" },
  { text: "purchased the Pro Plan", emoji: "💎" },
  { text: "launched their new website", emoji: "🚀" },
  { text: "signed up for AI automation", emoji: "⚡" },
  { text: "ordered a booking system", emoji: "📲" },
  { text: "got their custom dashboard", emoji: "📊" },
  { text: "booked a strategy call", emoji: "📞" },
  { text: "started a branding package", emoji: "🎨" },
  { text: "upgraded to a mobile app", emoji: "📱" },
  { text: "completed their consultation", emoji: "✅" },
];

const NotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

function getRandomActivity(): Activity {
  const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const actionItem = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const minutesAgo = Math.floor(Math.random() * 30) + 1;
  return {
    name,
    location,
    action: actionItem.text,
    emoji: actionItem.emoji,
    minutesAgo,
  };
}

function timeAgo(min: number): string {
  if (min < 1) return "just now";
  if (min === 1) return "1 min ago";
  if (min < 60) return `${min} mins ago`;
  const h = Math.floor(min / 60);
  return h === 1 ? "1 hour ago" : `${h} hours ago`;
}

export default function ActivityFeed() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      if (paused || dismissed) return;
      // Show new activity
      setActivity(getRandomActivity());
      setVisible(true);

      // Hide after 6 seconds
      hideTimer = setTimeout(() => {
        setVisible(false);
        // Schedule next show in 8-14 seconds
        cycleTimer = setTimeout(cycle, 8000 + Math.random() * 6000);
      }, 6000);
    };

    // First show after 3 seconds
    showTimer = setTimeout(cycle, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
  }, [paused, dismissed]);

  if (dismissed || !activity) return null;

  return (
    <div
      className={`fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-[99995] max-w-[320px] transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 translate-x-0"
          : "opacity-0 -translate-x-4 pointer-events-none"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative flex items-center gap-3 pl-3 pr-8 py-2.5 rounded-xl border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(17,17,25,0.95) 0%, rgba(13,13,20,0.95) 100%)",
        }}
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${getColorForName(activity.name)})`,
            }}
          >
            {activity.name[0]}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center text-[8px] border-2 border-[#111119]">
            {activity.emoji}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] text-white leading-tight">
            <span className="font-semibold">{activity.name}</span>
            <span className="text-gray-500"> from </span>
            <span className="text-gray-300">{activity.location}</span>
          </p>
          <p className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">
            {activity.action}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[9px] text-gray-600">{timeAgo(activity.minutesAgo)}</p>
            <span className="text-gray-700">·</span>
            <p className="text-[9px] text-nova-cyan/80 flex items-center gap-1">
              <NotifyIcon />
              <span>Verified</span>
            </p>
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function getColorForName(name: string): string {
  // Generate consistent gradient based on name
  const palettes = [
    "#00e5ff, #2979ff",
    "#a855f7, #ec4899",
    "#f59e0b, #ef4444",
    "#10b981, #06b6d4",
    "#8b5cf6, #6366f1",
    "#f43f5e, #f97316",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palettes[Math.abs(hash) % palettes.length];
}
