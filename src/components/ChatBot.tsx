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
    "📞 Free Consultation",
    "💬 Talk to someone",
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

  // Detect name (when bot asked "what's your name?")
  for (let i = 0; i < messages.length - 1; i++) {
    const assistantMsg = messages[i];
    const userMsg = messages[i + 1];
    if (
      assistantMsg.role === "assistant" &&
      userMsg?.role === "user" &&
      /what'?s your name/i.test(assistantMsg.content)
    ) {
      const nameText = userMsg.content.trim();
      // Simple validation: looks like a name (letters, 1-4 words)
      if (/^[a-zA-Z]+([\s'-][a-zA-Z]+){0,3}$/.test(nameText) && nameText.length < 50) {
        lead.name = nameText;
      }
    }
    // Business name detection
    if (
      assistantMsg.role === "assistant" &&
      userMsg?.role === "user" &&
      /business name|company name|what'?s the name of your business/i.test(assistantMsg.content)
    ) {
      lead.businessName = userMsg.content.trim();
    }
  }

  // Service detection (based on entire conversation)
  if (/website|web site|web design|🌐/i.test(allText)) lead.service = "Website Development";
  if (/booking|appointment|reservation|📅/i.test(allText)) lead.service = "Booking System";
  if (/dashboard|analytics|📊/i.test(allText)) lead.service = "Digital Dashboard";
  if (/automat|workflow|⚡/i.test(allText)) lead.service = "Business Automation";
  if (/app|mobile app|📱/i.test(allText)) lead.service = "Mobile App";
  if (/invoice|payment system|💳/i.test(allText)) lead.service = "Payment/Invoice System";
  if (/crm|client management|👥/i.test(allText)) lead.service = "CRM";

  // Business type / industry detection
  if (/restaurant|food|cafe|bakery|🍽/i.test(allText)) lead.businessType = "Restaurant/Food";
  else if (/salon|barber|spa|beauty|💇/i.test(allText)) lead.businessType = "Beauty/Salon";
  else if (/clean|janitor|🧹/i.test(allText)) lead.businessType = "Cleaning";
  else if (/retail|store|shop|ecommerce|🛍/i.test(allText)) lead.businessType = "Retail/E-commerce";
  else if (/real estate|realtor|property/i.test(allText)) lead.businessType = "Real Estate";

  // Budget detection
  if (/under\s*\$?5|less than\s*\$?5|\$?[0-4],?\d{3}\b/i.test(allText)) lead.budget = "Under $5,000";
  else if (/\$?5[,.]?000|\$?5k|5-10|5-15/i.test(allText)) lead.budget = "$5K-$15K";
  else if (/\$?15[,.]?000|\$?15k|15-30/i.test(allText)) lead.budget = "$15K-$30K";
  else if (/\$?30[,.]?000|\$?30k|30\+/i.test(allText)) lead.budget = "$30K+";

  // Timeline detection
  if (/asap|urgent|🔥/i.test(allText)) lead.timeline = "ASAP";
  else if (/1-2 month|next month/i.test(allText)) lead.timeline = "1-2 months";
  else if (/3\+ month|3 month|few month/i.test(allText)) lead.timeline = "3+ months";
  else if (/flexible|no rush|🤔 flexible/i.test(allText)) lead.timeline = "Flexible";

  return lead;
}

/* ─── Check if lead data is "complete enough" to submit ─── */
function isLeadComplete(lead: Partial<LeadData>): boolean {
  // Need at least: name, email, and either phone OR service
  return !!(lead.name && lead.email && (lead.phone || lead.service));
}

/* ─── Pick a random response from variations ─── */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Detect the context of the LAST assistant question ─── */
function getLastTopic(history: Message[]): string {
  const lastAssistant = [...history].reverse().find((m) => m.role === "assistant");
  if (!lastAssistant) return "";
  const t = lastAssistant.content.toLowerCase();
  if (/industry are you in/.test(t)) return "industry";
  if (/what are you currently tracking/.test(t)) return "tracking";
  if (/what tasks are slowing/.test(t)) return "automation_tasks";
  if (/kind of app/.test(t)) return "app_type";
  if (/how many clients/.test(t)) return "client_count";
  if (/launch|timeline|hoping to/.test(t)) return "timeline";
  if (/what's your name/.test(t)) return "ask_name";
  if (/email/.test(t)) return "ask_email";
  if (/phone number/.test(t)) return "ask_phone";
  if (/domain name/.test(t)) return "ask_domain";
  if (/online payments/.test(t)) return "ask_payments";
  if (/manage|where is your business/.test(t)) return "ask_location";
  if (/creole-speaking/.test(t)) return "ask_creole";
  if (/invoices manually/.test(t)) return "ask_invoicing";
  return "";
}

/* ─── Smart client-side responder (instant, context-aware) ─── */
function getSmartResponse(
  message: string,
  history: Message[]
): { text: string; options?: string[]; submitLead?: boolean } {
  const lower = message.toLowerCase().trim();
  const userMessages = history.filter((m) => m.role === "user").length;
  const lastTopic = getLastTopic(history);
  const currentLead = extractLeadFromMessages([
    ...history,
    {
      id: "temp",
      role: "user",
      content: message,
      timestamp: new Date(),
    },
  ]);

  const SERVICE_OPTIONS = [
    "🌐 Website",
    "📅 Booking System",
    "📊 Dashboard",
    "⚡ Automation",
    "💰 Pricing info",
  ];

  const YES_NO = ["✅ Yes", "❌ No", "🤔 Tell me more"];
  const CONSULT_OPTIONS = ["📞 Book consultation", "💬 Ask another question"];

  /* ── Ask another question — reset to service menu ── */
  if (/ask another|💬 ask|another question/i.test(lower)) {
    return {
      text: pick([
        "Of course! 😊 What would you like to know?",
        "Sure thing! What's on your mind?",
        "Go ahead! I'm all ears.",
        "Happy to help! What's your next question?",
      ]),
      options: SERVICE_OPTIONS,
    };
  }

  /* ── Done / I'm good — final goodbye ── */
  if (/^(✅ done|done|all good|thats it|that's it|nothing else|no more)/i.test(lower)) {
    return {
      text: pick([
        "Awesome! 🚀 Have a great day, and we'll be in touch soon!",
        "Perfect! 💙 Thanks for chatting with NOVA. Talk soon!",
        "Sounds good! 👋 We'll reach out shortly. Cheers!",
      ]),
    };
  }

  /* ── See more services — show services list ── */
  if (/see more services|🛠 see more/i.test(lower)) {
    return {
      text: "Here's everything we offer:\n\n🌐 Custom Websites\n📅 Booking Systems\n📊 Digital Dashboards\n⚡ Business Automation\n💳 Payment & Invoice Systems\n👥 Client Management (CRM)\n📱 Custom Mobile Apps\n\nWhich one would you like to learn more about?",
      options: SERVICE_OPTIONS,
    };
  }

  /* ── BOOK CONSULTATION — Start lead collection flow ── */
  if (/book consultation|free consultation|📞 free|📞 consultation|consultation/i.test(lower)) {
    if (!currentLead.name) {
      return {
        text: "Awesome! Let's get you set up with a free consultation. 🚀\n\nFirst — what's your name?",
      };
    }
    if (!currentLead.email) {
      return {
        text: `Great, ${currentLead.name.split(" ")[0]}! 📧 What's the best email to reach you at?`,
      };
    }
    if (!currentLead.phone) {
      return {
        text: "And your phone number? 📱 (Format: 555-555-5555)",
      };
    }
    if (!currentLead.service) {
      return {
        text: "Which service are you most interested in?",
        options: SERVICE_OPTIONS,
      };
    }
    // All collected — submit!
    return {
      text: `🎉 You're all set, ${currentLead.name.split(" ")[0]}!\n\nNOVA DIGITAL TECH will review your info and reach out within 24 hours to schedule your free consultation.\n\nIn the meantime, feel free to explore our portfolio below! 💼`,
      submitLead: true,
      options: ["💬 Ask another question", "✅ Done"],
    };
  }

  /* ── If we're in active lead collection — keep advancing ── */
  if (lastTopic === "ask_name" && currentLead.name && !currentLead.email) {
    return {
      text: `Nice to meet you, ${currentLead.name.split(" ")[0]}! 👋 What's the best email to reach you at?`,
    };
  }
  if (lastTopic === "ask_email" && currentLead.email && !currentLead.phone) {
    return {
      text: "Perfect! 📱 And your phone number? (Format: 555-555-5555)",
    };
  }
  if (lastTopic === "ask_phone" && currentLead.phone) {
    if (!currentLead.service) {
      return {
        text: "Awesome! 🎯 Last question — what service are you most interested in?",
        options: SERVICE_OPTIONS,
      };
    }
    return {
      text: `🎉 You're all set${currentLead.name ? ", " + currentLead.name.split(" ")[0] : ""}!\n\nNOVA DIGITAL TECH will review your info and reach out within 24 hours.\n\nThanks for choosing us! 💙`,
      submitLead: true,
      options: ["💬 Ask another question", "✅ Done"],
    };
  }

  /* ── Handle "Other" contextually based on last topic ── */
  if (/^(other|something else|else|different)/i.test(lower) || /🏢 Other|📋 Other/i.test(message)) {
    if (lastTopic === "industry") {
      return {
        text: pick([
          "Cool! What industry are you in? Feel free to type it out — I'm curious! 💼",
          "Got it! Tell me about your business — what do you do?",
          "Sure thing! Describe your business in your own words. What field are you in?",
        ]),
      };
    }
    if (lastTopic === "tracking") {
      return {
        text: pick([
          "Got it! Tell me what you're tracking — I want to make sure we build the right thing for you.",
          "Sounds like something specific! What kind of data are you trying to keep tabs on?",
        ]),
      };
    }
    if (lastTopic === "automation_tasks") {
      return {
        text: "Tell me about it! What's the most annoying repetitive task in your day? 😅",
      };
    }
    if (lastTopic === "app_type") {
      return {
        text: "Interesting! Tell me more about your app idea — what problem would it solve for your users?",
      };
    }
    return {
      text: pick([
        "Tell me more — what specifically did you have in mind?",
        "Sure! Describe it in your own words and I'll see how we can help.",
        "Got it! Type out what you're thinking and I'll do my best to help.",
      ]),
      options: SERVICE_OPTIONS,
    };
  }

  /* ── Industry-specific responses (when asked about industry) ── */
  if (lastTopic === "industry") {
    if (/restaurant|food|cafe|bakery|catering|🍽/i.test(lower)) {
      return {
        text: "Restaurants love what we build! 🍽 We do online menus, table reservations, online ordering, and loyalty systems. Want a full setup or just one piece?",
        options: ["🍽 Online menu", "📅 Reservations", "🛍 Online ordering", "🎁 Loyalty system"],
      };
    }
    if (/salon|beauty|spa|barber|hair|nail|💇/i.test(lower)) {
      return {
        text: "Beauty businesses are a perfect fit for our booking systems! 💇 Online appointments, deposits, automated reminders. What matters most to you?",
        options: ["📅 Online booking", "💳 Take deposits", "📲 Auto reminders", "📸 Showcase work"],
      };
    }
    if (/clean|janitor|housekeep|🧹/i.test(lower)) {
      return {
        text: "Cleaning businesses crush it with the right system! 🧹 Online quote requests, scheduling, customer portal. What's your biggest headache right now?",
        options: ["📝 Getting quotes", "📅 Scheduling jobs", "💰 Getting paid", "👥 New customers"],
      };
    }
    if (/retail|store|shop|ecommerce|sell/i.test(lower)) {
      return {
        text: "Retail and e-commerce are exciting! 🛍 We build online stores, inventory dashboards, and customer loyalty programs. What stage are you at?",
        options: ["🚀 Just starting", "📈 Already selling", "🔄 Need a redesign"],
      };
    }
    if (/real estate|realtor|property/i.test(lower)) {
      return {
        text: "Real estate websites are one of our favorites! 🏠 Listings, lead capture, property dashboards. Are you solo or with a team?",
        options: ["👤 Solo agent", "👥 Team/Agency"],
      };
    }
    return {
      text: `Cool, "${message.trim()}" — sounds interesting! 💡 What's the main thing you're trying to solve right now in your business?`,
      options: SERVICE_OPTIONS,
    };
  }

  // Greetings
  if (/^(hi|hello|hey|sup|yo|good (morning|afternoon|evening)|hola|bonjour)/i.test(lower)) {
    return {
      text: pick([
        "Hey! 👋 Great to have you here. What's bringing you by today?",
        "Hi there! 😊 Welcome to NOVA. What can I help you with?",
        "Hey! 🚀 Glad you stopped by. What are you working on?",
      ]),
      options: SERVICE_OPTIONS,
    };
  }

  // How are you / small talk
  if (/how are you|how's it going|how are things|whats up|what's up/i.test(lower)) {
    return {
      text: pick([
        "Doing great, thanks for asking! 😊 Ready to help you grow your business. What are you working on?",
        "Better now that you're here! 🎯 What can I help with today?",
        "All systems go! ⚡ What brings you to NOVA today?",
      ]),
      options: SERVICE_OPTIONS,
    };
  }

  // Who are you / what are you
  if (/who are you|what are you|are you (a )?bot|are you (a )?ai|are you human/i.test(lower)) {
    return {
      text: "I'm NOVA, the AI assistant for NOVA DIGITAL TECH! 🤖 I help answer questions and connect you with our team. Want me to tell you what we do?",
      options: ["🛠 Tell me about services", "💰 Pricing info", "📞 Talk to a human"],
    };
  }

  // Thanks
  if (/(thank|thanks|thx|appreciate)/i.test(lower)) {
    return {
      text: pick([
        "You're welcome! 😊 Anything else I can help with?",
        "Happy to help! 🙌 Got any other questions?",
        "Anytime! Need to know anything else?",
      ]),
      options: ["📞 Book consultation", "🛠 See more services", "✅ I'm good"],
    };
  }

  // Goodbye / I'm good
  if (/^(bye|goodbye|see you|later|cya|thanks bye|im good|i'm good|im ok|i'm ok|no thanks)/i.test(lower)) {
    return {
      text: pick([
        "Thanks for stopping by! 🚀 Come back anytime, or book a free consultation through our contact form. Have a great day!",
        "Take care! 👋 We're here whenever you're ready to take your business to the next level.",
        "Sounds good! 🙌 Feel free to reach out whenever — we're not going anywhere.",
      ]),
    };
  }

  // Help / what can you do
  if (/help|what can you do|capabilities/i.test(lower)) {
    return {
      text: "Lots of things! I can:\n\n💬 Answer questions about our services\n💰 Explain pricing options\n📅 Help you book a free consultation\n📞 Connect you with our team\n\nWhat would you like to do?",
      options: SERVICE_OPTIONS,
    };
  }

  // Website-related
  if (/website|web site|landing page|web page|web design|🌐/i.test(lower)) {
    return {
      text: pick([
        "Awesome choice! 🌐 We build premium, mobile-friendly websites that actually convert visitors into customers.\n\nDo you already own a domain name?",
        "Nice! Websites are our specialty. ✨ Premium design, mobile-first, fast loading.\n\nQuick question — do you have a domain yet?",
      ]),
      options: YES_NO,
    };
  }

  // Booking system
  if (/booking|appointment|schedule|reservation|calendar|📅 booking|📅 reservations|📅 online booking/i.test(lower)) {
    return {
      text: pick([
        "Booking systems = our bread and butter! 📅 Customers book online, you accept payments, and get auto reminders.\n\nDo you need to accept online payments too?",
        "Smart move! 📅 Online booking saves you hours and never misses a customer.\n\nWill clients pay when they book?",
      ]),
      options: YES_NO,
    };
  }

  // Dashboard
  if (/dashboard|analytics|track|report|stats|📊/i.test(lower)) {
    return {
      text: "Dashboards give you that 'CEO view' of your business at a glance. 📊\n\nWhat are you tracking manually right now?",
      options: ["💰 Sales/Revenue", "👥 Customers", "📦 Inventory", "📋 Other"],
    };
  }

  // Automation
  if (/automat|workflow|automatic|integrat|⚡/i.test(lower)) {
    return {
      text: "Automation = working smarter, not harder! ⚡ We can automate emails, invoices, reminders, follow-ups, and more.\n\nWhat's eating up your time right now?",
      options: ["📧 Email follow-ups", "💳 Invoicing", "📅 Reminders", "💼 Lead management"],
    };
  }

  // App development
  if (/app|application|mobile app|📱/i.test(lower)) {
    return {
      text: "Custom mobile apps for iOS and Android — we got you! 📱 What kind of app are you envisioning?",
      options: ["🛍 E-commerce", "📅 Service booking", "💎 Loyalty/Rewards", "🏢 Internal tools"],
    };
  }

  // Payment / Invoice
  if (/payment|invoice|billing|stripe|paypal|💳 invoicing|💳/i.test(lower)) {
    return {
      text: "Getting paid should be effortless. 💳 We set up systems where clients pay online and invoices auto-send.\n\nDo you currently send invoices manually?",
      options: YES_NO,
    };
  }

  // CRM / Client management
  if (/crm|client management|customer manage|database|👥 customers|💼 lead management/i.test(lower)) {
    return {
      text: "Keeping clients organized = more sales, less stress. 👥 How many clients are you managing?",
      options: ["Under 50", "50-200", "200-1000", "1000+"],
    };
  }

  // Pricing
  if (/price|cost|how much|pricing|expensive|cheap|afford|budget|rate|💰/i.test(lower)) {
    return {
      text: pick([
        "Pricing depends on what you need — no two projects are the same. 💰 The best way to get an accurate quote is through a **free consultation**.",
        "Every business is different, so we price each project based on what you need. 💰 Want to grab a free consultation to discuss?",
      ]),
      options: CONSULT_OPTIONS,
    };
  }

  // Timeline
  if (/how long|timeline|when|how fast|delivery|turnaround|deadline|🔥 asap|📅 1-2|🗓 3\+|🤔 flexible/i.test(lower)) {
    if (/asap|🔥/i.test(lower)) {
      return {
        text: "Got it — fast turnaround! 🔥 We've delivered projects in as little as 1-2 weeks for urgent needs. Let's chat about your specific scope.",
        options: CONSULT_OPTIONS,
      };
    }
    return {
      text: "Most projects take 2-6 weeks depending on complexity. ⏱️ When are you hoping to launch?",
      options: ["🔥 ASAP", "📅 1-2 months", "🗓 3+ months", "🤔 Flexible"],
    };
  }

  // Services general
  if (/service|offer|what do you|what can you|help with|do you do|🛠/i.test(lower)) {
    return {
      text: "Here's what we do best:\n\n🌐 Custom Websites\n📅 Booking Systems\n📊 Digital Dashboards\n⚡ Business Automation\n💳 Payment & Invoice Systems\n👥 Client Management (CRM)\n📱 Custom Mobile Apps\n\nWhich one fits your needs?",
      options: SERVICE_OPTIONS,
    };
  }

  // Bilingual
  if (/creole|french|bilingual|haitian|kreyol|languages/i.test(lower)) {
    return {
      text: "Yes! 🇭🇹 We offer full **bilingual English/Creole support** — your website, content, even our chats with you.\n\nIs your business serving a Creole-speaking community?",
      options: YES_NO,
    };
  }

  // Contact / talk to human
  if (/contact|talk to|reach|speak to|call|human|person|owner|📞 talk/i.test(lower)) {
    return {
      text: "Of course! 👋 Share your contact info and our team will reach out within 24 hours.\n\nWhat's your name?",
    };
  }

  /* ── Yes/No follow-ups (context-aware) ── */
  if (/^(yes|yeah|yep|sure|ok|okay|✅|of course|definitely|absolutely)/i.test(lower)) {
    if (lastTopic === "ask_domain") {
      return {
        text: "Perfect — that saves us time! 🎯 What's the website mainly for? (e.g., showcase your services, sell products, book appointments)",
        options: ["💼 Showcase services", "🛒 Sell products", "📅 Book appointments"],
      };
    }
    if (lastTopic === "ask_payments") {
      return {
        text: "Smart! 💳 Online payments boost conversions a lot. Let's get you a free consultation to map it out.",
        options: CONSULT_OPTIONS,
      };
    }
    if (lastTopic === "ask_creole") {
      return {
        text: "Excellent! 🇭🇹 Bilingual support is huge for connecting with Creole-speaking customers. Want to chat with our team about your project?",
        options: CONSULT_OPTIONS,
      };
    }
    if (lastTopic === "ask_invoicing") {
      return {
        text: "We'll save you hours! 💸 Auto-invoicing is one of our favorite things to set up. Want to grab a quick consultation?",
        options: CONSULT_OPTIONS,
      };
    }
    return {
      text: "Perfect! 🎯 Let's get you connected with our team. What's your name?",
    };
  }
  if (/^(no|nope|nah|❌|not really|i don't)/i.test(lower)) {
    if (lastTopic === "ask_domain") {
      return {
        text: "No worries — we'll help you pick the perfect domain too! 🌐 What kind of business is the site for?",
        options: ["🍽 Restaurant", "💇 Salon", "🏪 Retail", "🏢 Other"],
      };
    }
    if (lastTopic === "ask_payments") {
      return {
        text: "No problem! 👌 We can always add payments later if you need them. What's most important to you about the booking system?",
        options: ["📅 Easy scheduling", "📲 Reminders", "👥 Customer profiles"],
      };
    }
    return {
      text: pick([
        "No worries! Anything else you want to explore?",
        "All good! What else can I help with?",
      ]),
      options: SERVICE_OPTIONS,
    };
  }
  if (/tell me more|🤔/i.test(lower)) {
    return {
      text: "Sure! What specifically caught your eye? 👀",
      options: SERVICE_OPTIONS,
    };
  }

  // Location
  if (/location|where|based|country|address|haiti|usa|usa|america/i.test(lower)) {
    return {
      text: "We're a fully digital agency — clients worldwide! 🌍 All meetings happen online, delivery is 100% digital.\n\nWhere's your business based?",
    };
  }

  // Trust / portfolio / experience
  if (/portfolio|example|past work|previous|experience|reviews|testimonial|trust|legit|real/i.test(lower)) {
    return {
      text: "Great question! 💼 Scroll down on this page — you'll see our portfolio, client transformations, and testimonials. We've helped restaurants, salons, cleaning services, startups, and more.",
      options: CONSULT_OPTIONS,
    };
  }

  // Email detection (lead capture)
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(message)) {
    return {
      text: "Got your email! 📧 Can you also share your phone number? It helps our team reach you faster.",
    };
  }

  // Phone detection
  if (/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(message)) {
    return {
      text: "Got your number! 📱 NOVA DIGITAL TECH will reach out shortly. What service are you most interested in?",
      options: SERVICE_OPTIONS,
    };
  }

  /* ── Name detection (when asked for name) ── */
  if (lastTopic === "ask_name" && /^[a-zA-Z]+([\s'-][a-zA-Z]+)*$/.test(message.trim()) && message.trim().length < 40) {
    return {
      text: `Nice to meet you, ${message.trim().split(/\s+/)[0]}! 👋 What's the best email to reach you?`,
    };
  }

  // Industry-specific top-level mentions
  if (/restaurant|food|cafe|bakery|catering/i.test(lower)) {
    return {
      text: "Restaurants thrive with the right digital setup! 🍽 Online menu, reservations, ordering, loyalty — what's most important?",
      options: ["🍽 Online menu", "📅 Reservations", "🛍 Online ordering", "🎁 Loyalty"],
    };
  }
  if (/salon|barber|spa|beauty/i.test(lower)) {
    return {
      text: "Beauty businesses + our booking systems = magic! 💇 Online appointments, reminders, deposits.",
      options: ["📅 Online booking", "💳 Deposits", "📲 Reminders"],
    };
  }
  if (/clean|janitor|housekeep/i.test(lower)) {
    return {
      text: "Cleaning businesses scale fast with the right tools! 🧹 Quote requests, scheduling, customer portal.",
      options: ["📝 Quote requests", "📅 Scheduling", "💰 Payments"],
    };
  }

  // Tracking-specific (when asked what they track)
  if (lastTopic === "tracking") {
    if (/sales|revenue|money|💰/i.test(lower)) {
      return {
        text: "Sales dashboards are powerful! 💰 You'd see daily/weekly/monthly revenue, top products, trends — all in one place.",
        options: CONSULT_OPTIONS,
      };
    }
    if (/customer|client|👥/i.test(lower)) {
      return {
        text: "A customer dashboard helps you spot top spenders, repeat clients, and growth trends. 👥 Want to chat about it?",
        options: CONSULT_OPTIONS,
      };
    }
    if (/inventory|stock|📦/i.test(lower)) {
      return {
        text: "Inventory dashboards prevent stockouts and overstock. 📦 Real-time levels, alerts, sales-to-stock ratios.",
        options: CONSULT_OPTIONS,
      };
    }
  }

  // Default — push toward consultation
  if (userMessages > 4) {
    return {
      text: pick([
        "I think your project deserves a real conversation. 🎯 A free 15-min consultation with our team is the best next step.",
        "Sounds like we'd be a great fit! ✨ Want to grab a free consultation so we can dive deep into your goals?",
      ]),
      options: CONSULT_OPTIONS,
    };
  }

  // Final generic fallback (more varied + tries to engage)
  return {
    text: pick([
      `"${message.trim()}" — got it! 💡 Tell me a bit more about your business, what industry are you in?`,
      "Interesting! Can you tell me what kind of business you have, and what's the main thing you're trying to solve?",
      "Let me help! What's your business about, and what would you love to fix or improve?",
    ]),
    options: ["🍽 Restaurant/Food", "💇 Salon/Beauty", "🧹 Cleaning", "🏪 Retail", "🏠 Real Estate", "🏢 Other"],
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

  // Submit lead to server (called explicitly by submitLead flag or auto when complete)
  const submitLead = useCallback(
    async (allMessages: Message[]) => {
      if (leadSubmitted) return;
      const lead = extractLeadFromMessages(allMessages);
      try {
        const conversationLog = allMessages
          .filter((m) => m.id !== "greeting")
          .map((m) => `${m.role === "user" ? "Visitor" : "NOVA Bot"}: ${m.content}`)
          .join("\n\n");

        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: lead.name || "Chat Visitor",
            businessName: lead.businessName || "",
            businessType: lead.businessType || "",
            email: lead.email || "",
            phone: lead.phone || "",
            service: lead.service || "",
            budget: lead.budget || "",
            timeline: lead.timeline || "",
            message: `Full conversation transcript:\n\n${conversationLog}`,
          }),
        });

        // Save to localStorage for admin dashboard
        const stored = localStorage.getItem("nova-leads");
        const existing = stored ? JSON.parse(stored) : [];
        existing.push({
          id: crypto.randomUUID(),
          ...lead,
          name: lead.name || "Chat Visitor",
          message: conversationLog,
          date: new Date().toISOString(),
        });
        localStorage.setItem("nova-leads", JSON.stringify(existing));

        setLeadSubmitted(true);
      } catch {
        // Silent fail
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

      // Submit lead when bot signals it's complete, OR when we have full info
      const lead = extractLeadFromMessages(finalMessages);
      if (response.submitLead || isLeadComplete(lead)) {
        submitLead(finalMessages);
      }
    }, typingDelay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply: string) => {
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
