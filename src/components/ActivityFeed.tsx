"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

function getColorForName(name: string): string {
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

export default function ActivityFeed() {
  const [mounted, setMounted] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("[ActivityFeed] Mounted");
  }, []);

  useEffect(() => {
    if (!mounted || dismissed) return;

    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;
    let active = true;

    const cycle = () => {
      if (!active || dismissed) return;
      const next = getRandomActivity();
      console.log("[ActivityFeed] Showing:", next);
      setActivity(next);
      setVisible(true);
      hideTimer = setTimeout(() => {
        if (!active) return;
        setVisible(false);
        cycleTimer = setTimeout(cycle, 8000 + Math.random() * 6000);
      }, 6000);
    };

    // First show after 3 seconds
    const startTimer = setTimeout(cycle, 3000);

    return () => {
      active = false;
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
  }, [mounted, dismissed]);

  if (!mounted || dismissed) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "12px",
        zIndex: 99995,
        maxWidth: "320px",
        opacity: visible && activity ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: visible && activity ? "auto" : "none",
      }}
    >
      {activity && (
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 32px 10px 12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            background:
              "linear-gradient(135deg, rgba(17,17,25,0.95) 0%, rgba(13,13,20,0.95) 100%)",
            color: "#fff",
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                background: `linear-gradient(135deg, ${getColorForName(activity.name)})`,
              }}
            >
              {activity.name[0]}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                width: "16px",
                height: "16px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #00e5ff, #2979ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                border: "2px solid #111119",
              }}
            >
              {activity.emoji}
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "12px", margin: 0, lineHeight: "1.3" }}>
              <span style={{ fontWeight: 600 }}>{activity.name}</span>
              <span style={{ color: "#6b7280" }}> from </span>
              <span style={{ color: "#d1d5db" }}>{activity.location}</span>
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                margin: "2px 0 0 0",
                lineHeight: "1.3",
              }}
            >
              {activity.action}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "#10b981",
                }}
                className="animate-pulse"
              />
              <p style={{ fontSize: "9px", color: "#6b7280", margin: 0 }}>
                {timeAgo(activity.minutesAgo)}
              </p>
              <span style={{ color: "#4b5563" }}>·</span>
              <p style={{ fontSize: "9px", color: "rgba(0,229,255,0.8)", margin: 0 }}>
                ✓ Verified
              </p>
            </div>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
            }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
