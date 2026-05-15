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

// In production, replace with a database (e.g., Supabase, Firebase, MongoDB)
// For now, leads are sent via email through Formsubmit
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hellovt26@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const lead: Partial<Lead> = await req.json();

    // Validate required fields
    if (!lead.name || !lead.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Send lead via Formsubmit
    const formData = new FormData();
    formData.append("name", lead.name || "");
    formData.append("email", lead.email || "");
    formData.append("phone", lead.phone || "N/A");
    formData.append("_subject", `New AI Chat Lead: ${lead.name} — ${lead.service || "General Inquiry"}`);
    formData.append(
      "message",
      [
        `Business Name: ${lead.businessName || "N/A"}`,
        `Business Type: ${lead.businessType || "N/A"}`,
        `Service Needed: ${lead.service || "N/A"}`,
        `Budget Range: ${lead.budget || "N/A"}`,
        `Timeline: ${lead.timeline || "N/A"}`,
        `Additional Info: ${lead.message || "N/A"}`,
        `Source: AI Chatbot`,
        `Date: ${new Date().toISOString()}`,
      ].join("\n")
    );
    formData.append("_captcha", "false");
    formData.append("_template", "box");

    await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: "POST",
      body: formData,
    });

    // Also store in localStorage-compatible format for admin dashboard
    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
      lead: {
        ...lead,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
