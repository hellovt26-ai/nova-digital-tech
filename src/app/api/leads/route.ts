import { NextRequest, NextResponse } from "next/server";

export interface Lead {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  date: string;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hellovt26@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const lead: Partial<Lead> = await req.json();

    // Validate required fields — at minimum we need an email to send to
    if (!lead.email && !lead.phone) {
      return NextResponse.json(
        { error: "Email or phone required" },
        { status: 400 }
      );
    }

    // Build a nicely-formatted payload for Formsubmit (table template)
    const formsubmitPayload = {
      _subject: `🔥 NEW Chat Lead: ${lead.name || "Visitor"} — ${
        lead.service || "General"
      }`,
      _template: "table",
      _captcha: "false",
      "👤 Name": lead.name || "Chat Visitor",
      "🏢 Business Name": lead.businessName || "N/A",
      "🏷 Business Type": lead.businessType || "N/A",
      "📧 Email": lead.email || "N/A",
      "📱 Phone": lead.phone || "N/A",
      "🛠 Service": lead.service || "N/A",
      "💰 Budget": lead.budget || "N/A",
      "⏱ Timeline": lead.timeline || "N/A",
      "📅 Date": new Date().toLocaleString(),
      "💬 Conversation": lead.message || "N/A",
    };

    const formsubmitRes = await fetch(
      `https://formsubmit.co/ajax/${ADMIN_EMAIL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formsubmitPayload),
      }
    );

    const formsubmitResult = await formsubmitRes.json();
    console.log("[Leads API] Formsubmit response:", formsubmitResult);

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
      formsubmit: formsubmitResult,
      lead: {
        ...lead,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("[Leads API] Error:", err);
    return NextResponse.json(
      { error: "Failed to submit lead", details: String(err) },
      { status: 500 }
    );
  }
}
