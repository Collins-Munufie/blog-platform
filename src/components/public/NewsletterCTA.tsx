"use client";

import * as React from "react";
import { Mail, CheckCircle2, Zap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NewsletterCTA() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 500);
  };

  return (
    <div className="brand-atmosphere rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-amber-400/20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#f59e0b]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#20509b]/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center space-y-5 z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#f59e0b] text-[#08214e] mx-auto shadow-md">
          <Zap className="h-3.5 w-3.5 fill-[#08214e]" />
          Accra Tech &amp; Culture Dispatch
        </div>

        <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-heading leading-tight">
          Get the pulse of Silicon Accra in your inbox &amp; WhatsApp
        </h3>

        <p className="text-sm text-blue-100/90 leading-relaxed max-w-lg mx-auto">
          Join 28,000+ engineers, founders, and cultural leaders receiving weekly investigations into West African fintech, Afrobeats economics, and Ghanaian startups.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 rounded-2xl py-3.5 px-5 max-w-md mx-auto animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold">
              Akwaaba! You&apos;re subscribed. Check your inbox for the welcome dispatch.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 text-sm text-white placeholder:text-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
            />
            <Button
              type="submit"
              isLoading={loading}
              className="bg-[#f59e0b] text-[#08214e] hover:bg-[#fbbf24] font-bold rounded-xl px-6 shadow-lg"
            >
              Subscribe Free
            </Button>
          </form>
        )}

        <div className="pt-2 flex items-center justify-center gap-3">
          <a
            href="https://wa.me/233240000000"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" /> Or join our WhatsApp broadcast channel
          </a>
        </div>
      </div>
    </div>
  );
}
