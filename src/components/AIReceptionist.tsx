"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/* ─────────────────────────────────────────────
   INDUSTRY DEMO DATA
   Static = brand names, colors, icons, customers (proper nouns / design)
   Translatable = service, time, messages (pulled from i18n)
───────────────────────────────────────────── */
interface ChatMsg {
  role: "user" | "ai" | "confirm";
  text: string;
}
interface Industry {
  id: string;
  business: string;
  icon: string;
  accent: string;
  accent2: string;
  service: string;
  customer: string;
  time: string;
  messages: ChatMsg[];
}

// Fixed message roles (same order across all languages)
const MESSAGE_ROLES: ChatMsg["role"][] = ["user", "ai", "user", "ai", "confirm"];

const INDUSTRY_META = [
  { id: "barber", business: "FadeMaster Barbers", icon: "💈", accent: "#00e5ff", accent2: "#2979ff", customer: "Marcus J." },
  { id: "restaurant", business: "Bella Cucina", icon: "🍝", accent: "#f59e0b", accent2: "#ef4444", customer: "Sophia R." },
  { id: "cleaning", business: "FreshFlow Cleaning", icon: "🧼", accent: "#10b981", accent2: "#06b6d4", customer: "Daniela P." },
  { id: "dental", business: "BrightSmile Dental", icon: "🦷", accent: "#8b5cf6", accent2: "#6366f1", customer: "Anthony W." },
  { id: "salon", business: "Bella Beauty Studio", icon: "💅", accent: "#ec4899", accent2: "#a855f7", customer: "Jasmine L." },
];

/* ─────────────────────────────────────────────
   COUNT-UP NUMBER
───────────────────────────────────────────── */
function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   AI CHAT SIMULATION
───────────────────────────────────────────── */
function ChatSimulation({
  industry,
  onCycleComplete,
}: {
  industry: Industry;
  onCycleComplete: () => void;
}) {
  const { t } = useI18n();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const playStep = (i: number) => {
      if (cancelled) return;
      if (i >= industry.messages.length) {
        // Hold the completed conversation, then cycle
        timers.push(
          setTimeout(() => {
            if (!cancelled) onCycleComplete();
          }, 3400)
        );
        return;
      }
      const msg = industry.messages[i];
      if (msg.role === "user") {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setVisibleCount(i + 1);
            playStep(i + 1);
          }, 900)
        );
      } else {
        // AI / confirm — show typing indicator first
        setTyping(true);
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(false);
            setVisibleCount(i + 1);
            playStep(i + 1);
          }, msg.role === "confirm" ? 900 : 1500)
        );
      }
    };

    timers.push(setTimeout(() => playStep(0), 700));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [industry, onCycleComplete]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleCount, typing]);

  return (
    <div
      className="relative rounded-3xl border border-white/10 overflow-hidden backdrop-blur-2xl"
      style={{
        background:
          "linear-gradient(165deg, rgba(20,20,32,0.92) 0%, rgba(11,11,18,0.96) 100%)",
        boxShadow: `0 0 60px ${industry.accent}14, 0 24px 60px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]"
        style={{
          background: `linear-gradient(135deg, ${industry.accent}12 0%, ${industry.accent2}10 100%)`,
        }}
      >
        <div className="relative">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
            style={{
              background: `linear-gradient(135deg, ${industry.accent}33, ${industry.accent2}33)`,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span aria-hidden>{industry.icon}</span>
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
            style={{
              background: "#22c55e",
              borderColor: "#0b0b12",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white truncate">
            {t("aiReceptionist.headerName")}
          </p>
          <p className="text-[11px] flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t("aiReceptionist.status")}
          </p>
        </div>
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
          style={{
            background: `${industry.accent}1a`,
            color: industry.accent,
            border: `1px solid ${industry.accent}33`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: industry.accent }} />
          {industry.business}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="px-4 sm:px-5 py-5 space-y-3 overflow-y-auto"
        style={{ height: "min(380px, 52vh)", scrollbarWidth: "thin" }}
      >
        {industry.messages.slice(0, visibleCount).map((msg, i) => {
          if (msg.role === "confirm") {
            return (
              <div
                key={i}
                className="flex justify-center pt-1 animate-in fade-in zoom-in duration-500"
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${industry.accent}1f, ${industry.accent2}1f)`,
                    border: `1px solid ${industry.accent}40`,
                    boxShadow: `0 0 24px ${industry.accent}33`,
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{
                      background: `linear-gradient(135deg, ${industry.accent}, ${industry.accent2})`,
                    }}
                  >
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {msg.text}
                  </span>
                </div>
              </div>
            );
          }
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-400`}
            >
              <div
                className="max-w-[82%] px-4 py-2.5 text-[13px] leading-relaxed"
                style={
                  isUser
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.05))",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "18px 18px 4px 18px",
                        color: "#fff",
                      }
                    : {
                        background: `linear-gradient(135deg, ${industry.accent}1c, ${industry.accent2}14)`,
                        border: `1px solid ${industry.accent}30`,
                        borderRadius: "18px 18px 18px 4px",
                        color: "#e8eef5",
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${industry.accent}1c, ${industry.accent2}14)`,
                border: `1px solid ${industry.accent}30`,
              }}
            >
              <span className="text-[10px] text-gray-400 mr-1">{t("aiReceptionist.typing")}</span>
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: industry.accent,
                    animationDelay: `${d * 150}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VOICE BUTTON — real Web Speech API
───────────────────────────────────────────── */
interface ISpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
type SpeechRecognitionCtor = new () => ISpeechRecognition;
type VoiceState =
  | "idle"
  | "listening"
  | "processing"
  | "responding"
  | "error"
  | "unsupported";

function VoiceButton({ accent, accent2 }: { accent: string; accent2: string }) {
  const { t, locale } = useI18n();
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const recRef = useRef<ISpeechRecognition | null>(null);

  // Browser STT doesn't support Haitian Creole — fall back to French
  const recLang =
    locale === "fr" ? "fr-FR" : locale === "ht" ? "fr-FR" : "en-US";

  const generateReply = (text: string): string => {
    const l = text.toLowerCase();
    if (/book|appoint|schedul|reserv|rendez|randevou|rezev|rezève/.test(l))
      return t("aiReceptionist.voiceReplyBooking");
    if (/hour|open|clos|\btime\b|heure|ouvert|\blè\b|louvri/.test(l))
      return t("aiReceptionist.voiceReplyHours");
    if (/price|cost|how much|pricing|prix|co[uû]t|combien|\bpri\b|konbyen/.test(l))
      return t("aiReceptionist.voiceReplyPricing");
    return t("aiReceptionist.voiceReplyDefault");
  };

  const speak = (text: string) => {
    try {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = recLang;
      u.rate = 1;
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
  };

  const startListening = () => {
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setState("unsupported");
      return;
    }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = recLang;
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    setTranscript("");
    setReply("");
    setState("listening");

    let finalText = "";

    rec.onresult = (e) => {
      let txt = "";
      for (let i = 0; i < e.results.length; i++) {
        txt += e.results[i][0].transcript;
      }
      finalText = txt;
      setTranscript(txt);
    };

    rec.onerror = () => setState("error");

    rec.onend = () => {
      if (!finalText.trim()) {
        setState((s) => (s === "listening" ? "error" : s));
        return;
      }
      setState("processing");
      const r = generateReply(finalText);
      setTimeout(() => {
        setReply(r);
        setState("responding");
        speak(r);
        setTimeout(() => {
          setState("idle");
          setTranscript("");
          setReply("");
        }, Math.min(3500 + r.length * 30, 9000));
      }, 650);
    };

    try {
      rec.start();
    } catch {
      setState("error");
    }
  };

  const handleClick = () => {
    if (state === "listening") {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
      return;
    }
    if (state === "idle" || state === "error" || state === "unsupported") {
      startListening();
    }
  };

  useEffect(() => {
    return () => {
      try {
        recRef.current?.abort();
        window.speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const active =
    state === "listening" || state === "processing" || state === "responding";

  const statusText =
    state === "idle"
      ? t("aiReceptionist.voiceIdle")
      : state === "listening"
        ? t("aiReceptionist.voiceListening")
        : state === "processing"
          ? t("aiReceptionist.voiceProcessing")
          : state === "responding"
            ? t("aiReceptionist.voiceResponding")
            : state === "unsupported"
              ? t("aiReceptionist.voiceUnsupported")
              : t("aiReceptionist.voiceError");

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={handleClick}
        className="relative group"
        aria-label="Voice AI assistant"
      >
        {state === "listening" && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: `${accent}40` }}
            />
            <span
              className="absolute -inset-3 rounded-full animate-ping"
              style={{ background: `${accent}20`, animationDelay: "0.3s" }}
            />
          </>
        )}
        <span
          className="relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-active:scale-90"
          style={{
            background: active
              ? `linear-gradient(135deg, ${accent}, ${accent2})`
              : "rgba(255,255,255,0.05)",
            border: `1.5px solid ${active ? accent : "rgba(255,255,255,0.12)"}`,
            boxShadow: active
              ? `0 0 30px ${accent}66, 0 0 60px ${accent}33`
              : "none",
          }}
        >
          {state === "listening" ? (
            <span className="flex items-end gap-1 h-7">
              {[0.4, 0.9, 0.55, 1, 0.65, 0.85, 0.45].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-white"
                  style={{
                    height: `${h * 100}%`,
                    animation: `voiceBar 0.6s ease-in-out ${i * 0.08}s infinite alternate`,
                  }}
                />
              ))}
            </span>
          ) : (
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke={active ? "#fff" : "#9ca3af"}
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          )}
        </span>
      </button>

      <p
        className="text-xs font-medium transition-colors text-center max-w-[260px]"
        style={{
          color:
            state === "unsupported" || state === "error"
              ? "#f87171"
              : active
                ? accent
                : "#9ca3af",
        }}
      >
        {statusText}
      </p>

      {/* Live transcript */}
      {transcript && (state === "listening" || state === "processing") && (
        <div className="w-full max-w-xs text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
            {t("aiReceptionist.voiceYouSaid")}
          </p>
          <p className="text-sm text-white italic">
            &ldquo;{transcript}&rdquo;
          </p>
        </div>
      )}

      {/* AI spoken reply */}
      {reply && state === "responding" && (
        <div
          className="w-full max-w-sm rounded-xl p-3.5 text-center animate-in fade-in slide-in-from-bottom-2 duration-400"
          style={{
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
          }}
        >
          <p className="text-sm text-gray-200 leading-relaxed">{reply}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
// Static SVG icon paths (one per feature, order matches i18n features array)
const FEATURE_ICONS = [
  <path key="0" strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6 2 2 4-4" />,
  <path key="1" strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />,
  <path key="2" strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />,
  <path key="3" strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />,
  <path key="4" strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.949 8.949 0 0 0 12 21Zm3-11.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
];

const STAT_VALUES = [
  { key: "faster", value: 63, prefix: "+", suffix: "%" },
  { key: "availability", value: 24, suffix: "/7" },
  { key: "bookings", value: 40, prefix: "+", suffix: "%" },
  { key: "missed", value: 0, isZero: true },
];

export default function AIReceptionist() {
  const { t, tArray } = useI18n();
  const [idx, setIdx] = useState(0);

  // Build industries from static meta + translated content
  const INDUSTRIES: Industry[] = useMemo(
    () =>
      INDUSTRY_META.map((meta, i) => {
        const texts = tArray(`aiReceptionist.industries.${i}.messages`);
        return {
          ...meta,
          service: t(`aiReceptionist.industries.${i}.service`),
          time: t(`aiReceptionist.industries.${i}.time`),
          messages: MESSAGE_ROLES.map((role, j) => ({
            role,
            text: texts[j] || "",
          })),
        };
      }),
    [t, tArray]
  );

  const industry = useMemo(
    () => INDUSTRIES[idx] || INDUSTRIES[0],
    [INDUSTRIES, idx]
  );

  const handleCycle = () => setIdx((p) => (p + 1) % INDUSTRIES.length);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const openLiveDemo = () => {
    window.dispatchEvent(new CustomEvent("nova-open-chat"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="ai-receptionist"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ paddingBottom: "max(4rem, env(safe-area-inset-bottom))" }}
    >
      {/* Animated atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/4 w-[28rem] h-[28rem] rounded-full blur-[120px] animate-glow-pulse"
          style={{ background: `${industry.accent}14`, transition: "background 1s ease" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[26rem] h-[26rem] rounded-full blur-[120px] animate-glow-pulse"
          style={{
            background: `${industry.accent2}12`,
            transition: "background 1s ease",
            animationDelay: "2s",
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              background: industry.accent,
              opacity: 0.4,
              left: `${12 + i * 15}%`,
              top: `${20 + ((i * 13) % 60)}%`,
              animationDelay: `${i * 0.7}s`,
              boxShadow: `0 0 6px ${industry.accent}`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold mb-5"
            style={{
              background: `${industry.accent}14`,
              color: industry.accent,
              border: `1px solid ${industry.accent}30`,
              boxShadow: `0 0 20px ${industry.accent}22`,
              transition: "all 0.6s ease",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: industry.accent }}
            />
            {t("aiReceptionist.tag")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {t("aiReceptionist.title1")}{" "}
            <span className="text-gradient">{t("aiReceptionist.title2")}</span>
          </h2>
          <p className="mt-5 text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("aiReceptionist.subtitle")}
          </p>
        </motion.div>

        {/* Main 2-column */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* LEFT — Chat + Voice */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <ChatSimulation industry={industry} onCycleComplete={handleCycle} />

            {/* Industry indicator dots */}
            <div className="flex items-center justify-center gap-2">
              {INDUSTRIES.map((ind, i) => (
                <button
                  key={ind.id}
                  onClick={() => setIdx(i)}
                  aria-label={`Show ${ind.business} demo`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === idx ? "24px" : "8px",
                    height: "8px",
                    background:
                      i === idx ? industry.accent : "rgba(255,255,255,0.15)",
                    boxShadow: i === idx ? `0 0 10px ${industry.accent}` : "none",
                  }}
                />
              ))}
            </div>

            {/* Voice demo */}
            <div
              className="rounded-3xl border border-white/10 p-6 flex flex-col items-center gap-1 backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(165deg, rgba(20,20,32,0.7), rgba(11,11,18,0.8))",
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-3">
                {t("aiReceptionist.voicePrompt")}
              </p>
              <VoiceButton accent={industry.accent} accent2={industry.accent2} />
            </div>
          </motion.div>

          {/* RIGHT — Features + Stats + Booking */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Mini booking preview */}
            <div
              className="relative rounded-2xl border overflow-hidden p-5"
              style={{
                background: `linear-gradient(135deg, ${industry.accent}14, ${industry.accent2}10)`,
                borderColor: `${industry.accent}33`,
                boxShadow: `0 0 36px ${industry.accent}1f`,
                transition: "all 0.6s ease",
              }}
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                  {t("aiReceptionist.liveBooking")}
                </span>
                <span
                  className="flex items-center gap-1.5 text-[11px] font-semibold"
                  style={{ color: industry.accent }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: industry.accent }}
                  />
                  {t("aiReceptionist.automated")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${industry.accent}33, ${industry.accent2}33)`,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {industry.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {industry.customer}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {industry.service}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">{industry.time}</p>
                  <p
                    className="text-[11px] font-semibold flex items-center gap-1 justify-end mt-0.5"
                    style={{ color: "#22c55e" }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px]"
                      style={{ background: "#22c55e" }}
                    >
                      ✓
                    </span>
                    {t("aiReceptionist.confirmed")}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STAT_VALUES.map((s) => (
                <div
                  key={s.key}
                  className="glass rounded-xl p-3.5 border border-white/[0.06] text-center"
                >
                  <p
                    className="text-2xl sm:text-3xl font-bold tabular-nums"
                    style={{ color: industry.accent, transition: "color 0.6s" }}
                  >
                    {s.isZero ? (
                      t("aiReceptionist.stats.zero")
                    ) : (
                      <CountUp
                        target={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                      />
                    )}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    {t(`aiReceptionist.stats.${s.key}`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature cards */}
            <div className="space-y-2.5">
              {FEATURE_ICONS.map((iconPath, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="group flex items-start gap-3.5 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                  style={{ position: "relative" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${industry.accent}22, ${industry.accent2}1a)`,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={industry.accent}
                      strokeWidth={1.6}
                      style={{ transition: "stroke 0.6s" }}
                    >
                      {iconPath}
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      {t(`aiReceptionist.features.${i}.title`)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {t(`aiReceptionist.features.${i}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-14 sm:mt-20 text-center"
        >
          <div
            className="relative rounded-3xl border border-white/10 px-6 py-10 sm:py-14 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${industry.accent}10, ${industry.accent2}0c)`,
              transition: "background 0.6s ease",
            }}
          >
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            <h3 className="relative text-2xl sm:text-4xl font-bold tracking-tight">
              {t("aiReceptionist.ctaTitle1")}{" "}
              <span className="text-gradient">{t("aiReceptionist.ctaTitle2")}</span>
            </h3>
            <p className="relative mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
              {t("aiReceptionist.ctaSubtitle")}
            </p>
            <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${industry.accent}, ${industry.accent2})`,
                  boxShadow: `0 0 30px ${industry.accent}55`,
                }}
              >
                {t("aiReceptionist.ctaBook")}
              </button>
              <button
                onClick={openLiveDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.03] active:scale-95"
              >
                {t("aiReceptionist.ctaDemo")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes voiceBar {
          from {
            transform: scaleY(0.4);
          }
          to {
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
