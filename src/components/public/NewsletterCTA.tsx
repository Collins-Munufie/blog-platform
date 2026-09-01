"use client";

import * as React from "react";
import { Mail, CheckCircle2, Coffee, MessageCircle, Send } from "lucide-react";
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
    <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl relative overflow-hidden">
      <div className="relative max-w-xl mx-auto text-center space-y-4 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b] text-stone-950 mx-auto shadow-sm">
          <Coffee className="h-3.5 w-3.5" />
          <span>The Sunday Dispatch</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading leading-tight !text-white">
          A personal letter from Accra, delivered every Sunday
        </h3>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto font-normal">
          Every Sunday morning, I share honest notes on building startups in West Africa, breakdown local fintech infrastructure, and share new music. No spam, just real thoughts.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 rounded-2xl py-3.5 px-5 max-w-md mx-auto animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold">
              Akwaaba! You&apos;re in. Check your inbox for the welcome note.
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
              placeholder="Your preferred email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl bg-stone-800/90 px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
            />
            <Button
              type="submit"
              isLoading={loading}
              className="bg-[#f59e0b] text-stone-950 hover:bg-[#fbbf24] font-bold rounded-xl px-5 text-xs sm:text-sm shadow-md"
            >
              Subscribe
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
            <MessageCircle className="h-3.5 w-3.5 fill-current" /> Or join the WhatsApp updates channel
          </a>
        </div>
      </div>
    </div>
  );
}
