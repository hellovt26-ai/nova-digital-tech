"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  options?: string[];
}

interface LeadData {
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

/* ─── Icons ─── */
const BotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
  </svg>
);

/* ─── Greeting ─── */
const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hey! 👋 I'm NOVA, your digital assistant. I help businesses like yours get online and grow faster. What can I help you with today?",
  timestamp: new Date(),
  options: [
    "🌐 I need a website",
    "📅 Booking system",
    "📊 Dashboard / Analytics",
    "⚡ Business automation",
    "💰 What does it cost?",
    "📞 Talk to someone",
  ],
};

/* ─── Helper: extract lead info from conversation ─── */
function extractLeadFromMessages(messages: Message[]): Partial<LeadData> {
  const lead: Partial<LeadData> = {};
  const allText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");

  // Email
  const emailMatch = allText.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  if (emailMatch) lead.email = emailMatch[0];

  // Phone
  const phoneMatch = allText.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  if (phoneMatch) lead.phone = phoneMatch[0];

  return lead;
}

/* ─── Smart client-side responder (instant) ─── */
function getSmartResponse(
  message: string,
  history: Message[]
): { text: string; options?: string[] } {
  const lower = message.toLowerCase().trim();
  const userMessages = history.filter((m) => m.role === "user").length;

  const SERVICE_OPTIONS = [
    "🌐 Website",
    "📅 Booking System",
    "📊 Dashboard",
    "⚡ Automation",
    "💰 Pricing info",
  ];

  const YES_NO = ["✅ Yes", "❌ No", "🤔 Tell me more"];
  const CONSULT_OPTIONS = ["📞 Book consultation", "💬 Ask another question"];

  // Greetings
  if (/^(hi|hello|hey|sup|yo|good (morning|afternoon|evening)|hola|bonjour)/i.test(lower)) {
    return {
      text: "Hey! 👋 Great to have you here. I'm NOVA, the digital assistant for NOVA DIGITAL TECH. What's bringing you by today?",
      options: SERVICE_OPTIONS,
    };
  }

  // Thanks
  if (/(thank|thanks|thx|appreciate)/i.test(lower)) {
    return {
      text: "You're welcome! Is there anything else you'd like to know?",
      options: ["📞 Book consultation", "🛠 See more services", "✅ I'm good"],
    };
  }

  // Goodbye
  if (/^(bye|goodbye|see you|later|cya|thanks bye|im good|i'm good)/i.test(lower)) {
    return {
      text: "Thanks for stopping by! Feel free to come back anytime, or book a free consultation through our contact form. Have a great day! 🚀",
    };
  }

  // Website-related
  if (/website|web site|landing page|web page|web design|🌐/i.test(lower)) {
    return {
      text: "Great choice! We build premium, mobile-friendly websites that convert visitors into customers. 🌐\n\nDo you already own a domain name?",
      options: YES_NO,
    };
  }

  // Booking system
  if (/booking|appointment|schedule|reservation|calendar|📅/i.test(lower)) {
    return {
      text: "Booking systems are one of our specialties! 📅\n\nCustomers book online, you accept payments, and get automatic reminders.\n\nDo you also need to accept online payments?",
      options: YES_NO,
    };
  }

  // Dashboard
  if (/dashboard|analytics|track|report|stats|📊/i.test(lower)) {
    return {
      text: "Digital dashboards help you see everything that matters at a glance — sales, customers, inventory. 📊\n\nWhat are you currently tracking manually?",
      options: ["💰 Sales/Revenue", "👥 Customers", "📦 Inventory", "📋 Other"],
    };
  }

  // Automation
  if (/automat|workflow|automatic|integrat|⚡/i.test(lower)) {
    return {
      text: "Automation is a game-changer! ⚡\n\nWe automate emails, invoices, reminders, follow-ups, and more — saving you hours every week.\n\nWhat tasks are slowing you down?",
      options: ["📧 Email follow-ups", "💳 Invoicing", "📅 Reminders", "💼 Lead management"],
    };
  }

  // App development
  if (/app|application|mobile app|📱/i.test(lower)) {
    return {
      text: "We build custom mobile apps for iOS and Android! 📱 What kind of app are you envisioning?",
      options: ["🛍 E-commerce", "📅 Service booking", "💎 Loyalty/Rewards", "🏢 Internal tools"],
    };
  }

  // Payment / Invoice
  if (/payment|invoice|billing|stripe|paypal|💳/i.test(lower)) {
    return {
      text: "We set up payment & invoice systems that make getting paid effortless. 💳\n\nDo you currently send invoices manually?",
      options: YES_NO,
    };
  }

  // CRM / Client management
  if (/crm|client management|customer manage|database|👥/i.test(lower)) {
    return {
      text: "Client management systems keep all your customers, leads, and communications organized. 👥\n\nHow many clients do you typically manage?",
      options: ["Under 50", "50-200", "200-1000", "1000+"],
    };
  }

  // Pricing
  if (/price|cost|how much|pricing|expensive|cheap|afford|budget|rate|💰/i.test(lower)) {
    return {
      text: "Our pricing depends on what you need — every business is different. 💰\n\nThe best way to get an accurate quote is through a **free consultation**.",
      options: CONSULT_OPTIONS,
    };
  }

  // Timeline
  if (/how long|timeline|when|how fast|delivery|turnaround|deadline/i.test(lower)) {
    return {
      text: "Most projects take 2-6 weeks depending on complexity. ⏱️\n\nWhen are you hoping to launch?",
      options: ["🔥 ASAP", "📅 1-2 months", "🗓 3+ months", "🤔 Flexible"],
    };
  }

  // Services general
  if (/service|offer|what do you|what can you|help with|do you do|🛠/i.test(lower)) {
    return {
      text: "We help small businesses go digital with:\n\n🌐 Custom Websites\n📅 Booking Systems\n📊 Digital Dashboards\n⚡ Business Automation\n💳 Payment & Invoice Systems\n👥 Client Management (CRM)\n📱 Custom Mobile Apps\n\nWhich one catches your interest?",
      options: SERVICE_OPTIONS,
    };
  }

  // Bilingual
  if (/creole|french|bilingual|haitian|kreyol|languages/i.test(lower)) {
    return {
      text: "Yes! We offer full **bilingual English/Creole support** 🇭🇹 — your website, content, and our communication can be in both languages.\n\nIs your business serving a Creole-speaking community?",
      options: YES_NO,
    };
  }

  // Contact / talk to human
  if (/contact|talk to|reach|speak to|call|human|person|owner|📞/i.test(lower)) {
    return {
      text: "Of course! 👋 The fastest way is to share your contact info, and our team will reach out within 24 hours.\n\nWhat's your name?",
    };
  }

  // Yes/No follow-ups
  if (/^(yes|yeah|yep|sure|ok|okay|✅)/i.test(lower)) {
    return {
      text: "Perfect! 🎯 Let's get you connected with our team. What's your name and email?",
    };
  }
  if (/^(no|nope|nah|❌)/i.test(lower)) {
    return {
      text: "No problem! Is there something else you'd like to know more about?",
      options: SERVICE_OPTIONS,
    };
  }
  if (/tell me more|🤔/i.test(lower)) {
    return {
      text: "Of course! What specifically would you like to know more about?",
      options: SERVICE_OPTIONS,
    };
  }

  // Location
  if (/location|where|based|country|address|haiti|usa/i.test(lower)) {
    return {
      text: "We're a fully digital agency — we work with clients worldwide! 🌍 All meetings happen online, everything delivered digitally.\n\nWhere is your business based?",
    };
  }

  // Trust / portfolio / experience
  if (/portfolio|example|past work|previous|experience|reviews|testimonial|trust|legit/i.test(lower)) {
    return {
      text: "Great question! Scroll down on this page — you'll find our portfolio, client transformations, and testimonials. We've helped restaurants, salons, startups, cleaning services, and more. 💼",
      options: CONSULT_OPTIONS,
    };
  }

  // Email detection (lead capture)
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(message)) {
    return {
      text: "Thanks! 📧 Got your email. Can you share your phone number too so we can reach out faster?",
    };
  }

  // Phone detection
  if (/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(message)) {
    return {
      text: "Got your number! 📱 NOVA DIGITAL TECH will reach out to you shortly. Which service are you most interested in?",
      options: SERVICE_OPTIONS,
    };
  }

  // Default — push toward consultation
  if (userMessages > 4) {
    return {
      text: "I'd love to help you get answers tailored to your business. The best next step is a **free 15-min consultation**.",
      options: CONSULT_OPTIONS,
    };
  }

  return {
    text: "That's a great question! Could you tell me a bit more — what industry are you in?",
    options: ["🍽 Restaurant/Food", "💇 Salon/Beauty", "🧹 Cleaning", "🏢 Other"],
  };
}

/* ─── Main Component ─── */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Check if lead info has been collected
  const checkAndSubmitLead = useCallback(
    async (allMessages: Message[]) => {
      if (leadSubmitted) return;
      const lead = extractLeadFromMessages(allMessages);
      if (lead.email && lead.phone) {
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...lead,
              name: lead.name || "Chat Visitor",
              message: allMessages
                .map((m) => `${m.role}: ${m.content}`)
                .join("\n"),
            }),
          });
          setLeadSubmitted(true);
        } catch {
          // Silent fail
        }
      }
    },
    [leadSubmitted]
  );

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Instant client-side response — no server roundtrip
    const response = getSmartResponse(content.trim(), updatedMessages);

    // Small natural typing delay (feels human, not robotic)
    const typingDelay = Math.min(400 + response.text.length * 6, 1100);

    setTimeout(() => {
      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
        options: response.options,
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      setIsTyping(false);

      // Submit lead in background if we have enough info
      checkAndSubmitLead(finalMessages);
    }, typingDelay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply: string) => {
    // Special action: scroll to contact section
    if (/book consultation|📞 book/i.test(reply)) {
      setIsOpen(false);
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }
    sendMessage(reply);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setHasNewMessage(false);
    } else {
      setIsOpen(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-[99998] transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ width: "min(400px, calc(100vw - 24px))" }}
      >
        <div
          className={`flex flex-col rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[min(580px,calc(100dvh-140px))]"
          }`}
          style={{
            background: "linear-gradient(180deg, #111119 0%, #0d0d14 100%)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-white/5 cursor-pointer flex-shrink-0"
            onClick={() => isMinimized && setIsMinimized(false)}
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(41,121,255,0.08) 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/20 border border-white/10 flex items-center justify-center text-nova-cyan">
                  <BotIcon />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#111119]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white leading-tight">
                  NOVA Assistant
                </h3>
                <p className="text-[10px] text-emerald-400 font-medium">
                  Online now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Minimize"
              >
                <MinimizeIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          {!isMinimized && (
            <>
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0,229,255,0.2) transparent",
                }}
              >
                {messages.map((msg, idx) => {
                  const isLast = idx === messages.length - 1;
                  return (
                    <div key={msg.id}>
                      <div
                        className={`flex gap-2.5 ${
                          msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        {msg.role === "assistant" && (
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nova-cyan/20 to-nova-blue/20 border border-white/10 flex items-center justify-center text-nova-cyan flex-shrink-0 mt-0.5">
                            <BotIcon />
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-nova-cyan/20 to-nova-blue/20 text-white border border-nova-cyan/20 rounded-br-md"
                              : "bg-white/[0.04] text-gray-200 border border-white/[0.06] rounded-bl-md"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <p
                            className={`text-[9px] mt-1.5 ${
                              msg.role === "user"
                                ? "text-nova-cyan/40 text-right"
                                : "text-gray-600"
                            }`}
                          >
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>

                      {/* Option chips below assistant message (only on last) */}
                      {msg.role === "assistant" && isLast && msg.options && !isTyping && (
                        <div className="flex flex-wrap gap-2 mt-3 ml-9 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {msg.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleQuickReply(opt)}
                              className="text-[12px] px-3 py-1.5 rounded-full bg-nova-cyan/[0.06] border border-nova-cyan/25 text-nova-cyan/90 hover:bg-nova-cyan/15 hover:text-white hover:border-nova-cyan/50 transition-all active:scale-95"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nova-cyan/20 to-nova-blue/20 border border-white/10 flex items-center justify-center text-nova-cyan flex-shrink-0">
                      <BotIcon />
                    </div>
                    <div className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-nova-cyan/60 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-nova-cyan/60 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-nova-cyan/60 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── Input ── */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-3 py-3 border-t border-white/5 flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,17,25,0) 0%, rgba(17,17,25,1) 100%)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder:text-gray-600 focus:outline-none focus:border-nova-cyan/30 transition-colors"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-nova-cyan to-nova-blue flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-nova-cyan/20 transition-all active:scale-90 flex-shrink-0"
                >
                  <SendIcon />
                </button>
              </form>

              {/* ── Powered By ── */}
              <div className="text-center pb-2">
                <p className="text-[9px] text-gray-700">
                  Powered by NOVA DIGITAL TECH
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Floating Button ── */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-[99997] w-14 h-14 rounded-2xl shadow-lg transition-all duration-300 active:scale-90 group ${
          isOpen
            ? "bg-white/10 border border-white/10 hover:bg-white/15"
            : "bg-gradient-to-br from-nova-cyan to-nova-blue hover:shadow-xl hover:shadow-nova-cyan/30 hover:scale-105"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <>
            <div className="flex items-center justify-center text-white">
              <BotIcon />
            </div>
            {/* Notification badge */}
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0a0a0f] animate-pulse" />
            )}
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nova-cyan to-nova-blue opacity-40 animate-ping pointer-events-none" />
          </>
        )}
      </button>

      {/* ── Welcome tooltip (shows briefly) ── */}
      <WelcomeTooltip isOpen={isOpen} onOpen={toggleChat} />
    </>,
    document.body
  );
}

/* ─── Welcome Tooltip ─── */
function WelcomeTooltip({
  isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isOpen || dismissed) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => setShow(true), 3000);
    const hideTimer = setTimeout(() => setShow(false), 13000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen, dismissed]);

  if (!show || isOpen) return null;

  return (
    <div
      className="fixed bottom-20 sm:bottom-[88px] right-3 sm:right-6 z-[99996] max-w-[260px] animate-in fade-in slide-in-from-bottom-2 cursor-pointer"
      onClick={() => {
        setDismissed(true);
        onOpen();
      }}
    >
      <div className="bg-[#111119] border border-white/10 rounded-2xl rounded-br-md px-4 py-3 shadow-xl shadow-black/40">
        <p className="text-[13px] text-gray-200 leading-relaxed">
          👋 Hey! Need help with your business? I&apos;m here to chat!
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
            setShow(false);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white text-[10px]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
