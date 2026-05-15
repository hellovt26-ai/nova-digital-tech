"use client";

import { useState, useEffect } from "react";

interface Lead {
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

const ADMIN_PASSWORD = "nova2024admin";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");

  // Load leads from localStorage
  useEffect(() => {
    if (authenticated) {
      const stored = localStorage.getItem("nova-leads");
      if (stored) {
        try {
          setLeads(JSON.parse(stored));
        } catch {
          setLeads([]);
        }
      }
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem("nova-leads", JSON.stringify(updated));
    if (selectedLead?.id === id) setSelectedLead(null);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-nova-cyan" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">NOVA Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Lead Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-nova-cyan/30"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-nova-cyan to-nova-blue text-white text-sm font-semibold hover:shadow-lg hover:shadow-nova-cyan/20 transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nova-cyan/20 to-nova-blue/20 border border-white/10 flex items-center justify-center text-nova-cyan">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold">NOVA Admin</h1>
              <p className="text-[10px] text-gray-500">Lead Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              {leads.length} lead{leads.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: leads.length, color: "from-nova-cyan/20 to-nova-blue/20" },
            { label: "This Week", value: leads.filter((l) => { const d = new Date(l.date); const week = new Date(); week.setDate(week.getDate() - 7); return d > week; }).length, color: "from-emerald-500/20 to-emerald-700/20" },
            { label: "Website", value: leads.filter((l) => l.service?.toLowerCase().includes("website")).length, color: "from-purple-500/20 to-purple-700/20" },
            { label: "Other", value: leads.filter((l) => !l.service?.toLowerCase().includes("website")).length, color: "from-amber-500/20 to-amber-700/20" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} border border-white/[0.06] rounded-xl px-4 py-3`}
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No leads yet</p>
            <p className="text-gray-600 text-xs mt-1">
              Leads from the AI chatbot will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lead List */}
            <div className="lg:col-span-2 space-y-3">
              {leads
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedLead?.id === lead.id
                        ? "border-nova-cyan/30 bg-nova-cyan/5"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{lead.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {lead.businessName || "No business name"} &middot;{" "}
                          {lead.service || "General"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-600">
                          {formatDate(lead.date)}
                        </p>
                        {lead.budget && (
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {lead.budget}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2 text-[11px] text-gray-500">
                      {lead.email && <span>{lead.email}</span>}
                      {lead.phone && <span>{lead.phone}</span>}
                    </div>
                  </div>
                ))}
            </div>

            {/* Lead Detail */}
            {selectedLead && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 h-fit sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">Lead Details</h3>
                  <button
                    onClick={() => deleteLead(selectedLead.id)}
                    className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Name", value: selectedLead.name },
                    { label: "Business", value: selectedLead.businessName },
                    { label: "Type", value: selectedLead.businessType },
                    { label: "Email", value: selectedLead.email },
                    { label: "Phone", value: selectedLead.phone },
                    { label: "Service", value: selectedLead.service },
                    { label: "Budget", value: selectedLead.budget },
                    { label: "Timeline", value: selectedLead.timeline },
                    { label: "Date", value: formatDate(selectedLead.date) },
                  ].map((field) =>
                    field.value ? (
                      <div key={field.label}>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                          {field.label}
                        </p>
                        <p className="text-sm text-gray-200 mt-0.5">
                          {field.value}
                        </p>
                      </div>
                    ) : null
                  )}
                  {selectedLead.message && (
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Conversation
                      </p>
                      <p className="text-xs text-gray-400 mt-1 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                        {selectedLead.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
