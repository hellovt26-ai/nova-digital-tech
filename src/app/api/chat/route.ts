import { NextRequest, NextResponse } from "next/server";

const CHATBASE_API_URL = "https://www.chatbase.co/api/v1/chat";
const CHATBASE_BOT_ID = process.env.CHATBASE_BOT_ID || "";
const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY || "";

const SYSTEM_PROMPT = `You are NOVA, the AI assistant for NOVA DIGITAL TECH — a premium digital solutions company that helps small businesses modernize and automate their operations.

SERVICES YOU CAN DISCUSS:
- Website Development (custom, modern, mobile-first)
- Mobile-Friendly Websites
- Booking Systems (online scheduling, appointment management)
- Digital Dashboards (analytics, tracking, reporting)
- Business Automation (workflows, notifications, integrations)
- Payment Tracking Systems
- Invoice Systems
- Client Management Systems (CRM)
- Business Digital Transformation
- Bilingual English/Creole Support
- Custom App Development

YOUR PERSONALITY:
- Professional yet friendly and approachable
- Confident but never arrogant
- Concise — keep responses under 3 sentences when possible
- Human-like, warm, not robotic or overly corporate
- Ask ONE question at a time to keep the conversation flowing

YOUR GOALS:
1. Welcome visitors warmly
2. Understand what they need
3. Explain relevant services clearly
4. Qualify them as a lead
5. Collect their contact information naturally
6. Encourage booking a free consultation

LEAD QUALIFICATION — Collect these naturally through conversation (NOT all at once):
- Full Name
- Business Name
- Business Type
- Email
- Phone Number
- Service Needed
- Budget Range
- Desired Timeline

SMART FOLLOW-UP QUESTIONS based on service interest:

If Website:
- "Do you already have a domain name?"
- "Will you need booking or scheduling features?"
- "Do you need bilingual support (English/Creole)?"

If Dashboard:
- "What are you currently tracking manually?"
- "How many team members will need access?"

If Booking System:
- "Do you need to accept online payments?"
- "Should customers be able to pick their own appointment times?"

If Automation:
- "What repetitive tasks are slowing your business down?"
- "What tools are you currently using?"

RULES:
- Never promise exact pricing — say "Our projects typically start at $X depending on scope. Let's discuss your specific needs."
- Never guarantee completion dates — say "Timeline depends on the project scope, but we'll give you a clear estimate after our consultation."
- Never provide legal or financial advice
- Never claim work is approved — say "Our team will review and follow up with you."
- If someone asks about pricing, mention the free consultation as the best next step
- Always be helpful even if someone is just browsing

When a visitor seems ready or has shared enough info, say:
"Thank you! I've noted your details. NOVA DIGITAL TECH will review your request and contact you shortly. You can also book a free consultation directly on our website."

IMPORTANT: You represent NOVA DIGITAL TECH. Everything you say reflects the brand. Be premium, be helpful, convert visitors into leads.`;

// Fallback responses when API is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  greeting:
    "Hey there! Welcome to NOVA DIGITAL TECH. I'm NOVA, your digital assistant. How can I help you today? Are you looking to build a website, automate your business, or something else?",
  services:
    "We offer a full range of digital solutions: Website Development, Booking Systems, Digital Dashboards, Business Automation, Payment & Invoice Systems, Client Management, and Custom App Development. Which one interests you?",
  pricing:
    "Our pricing depends on the scope of your project. The best way to get an accurate quote is through a free consultation. Would you like to schedule one?",
  contact:
    "You can reach us through the contact form on our website, or I can collect your details right now and have our team follow up with you. What's your name?",
  default:
    "That's a great question! For the most accurate answer, I'd recommend scheduling a free consultation with our team. They can walk you through everything in detail. Would you like to set that up?",
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (
    lower.includes("hello") ||
    lower.includes("hi") ||
    lower.includes("hey") ||
    lower.match(/^(sup|yo|good morning|good afternoon|good evening)/)
  )
    return FALLBACK_RESPONSES.greeting;
  if (
    lower.includes("service") ||
    lower.includes("offer") ||
    lower.includes("what do you") ||
    lower.includes("help with")
  )
    return FALLBACK_RESPONSES.services;
  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("how much") ||
    lower.includes("budget")
  )
    return FALLBACK_RESPONSES.pricing;
  if (
    lower.includes("contact") ||
    lower.includes("reach") ||
    lower.includes("talk to") ||
    lower.includes("phone") ||
    lower.includes("email")
  )
    return FALLBACK_RESPONSES.contact;
  return FALLBACK_RESPONSES.default;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // If Chatbase is not configured, use fallback
    if (!CHATBASE_API_KEY || !CHATBASE_BOT_ID) {
      const lastMessage = messages[messages.length - 1]?.content || "";
      return NextResponse.json({
        response: getFallbackResponse(lastMessage),
        source: "fallback",
      });
    }

    // Call Chatbase API
    const chatbaseResponse = await fetch(CHATBASE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHATBASE_API_KEY}`,
      },
      body: JSON.stringify({
        chatbotId: CHATBASE_BOT_ID,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!chatbaseResponse.ok) {
      const lastMessage = messages[messages.length - 1]?.content || "";
      return NextResponse.json({
        response: getFallbackResponse(lastMessage),
        source: "fallback",
      });
    }

    const data = await chatbaseResponse.json();
    return NextResponse.json({
      response: data.text || data.message || data.response || getFallbackResponse(""),
      source: "chatbase",
    });
  } catch {
    return NextResponse.json({
      response: FALLBACK_RESPONSES.greeting,
      source: "fallback",
    });
  }
}
