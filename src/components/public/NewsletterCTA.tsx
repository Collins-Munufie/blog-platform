"use client";

import * as React from "react";
import { Mail, CheckCircle2 } from "lucide-react";
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
    }, 600);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-indigo-950 to-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-primary-500/20">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-primary-300 mx-auto mb-2 border border-white/10">
          <Mail className="h-6 w-6" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Stay on the cutting edge of engineering
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
          Join 24,000+ senior developers and architects receiving our bi-weekly breakdown of distributed systems, Next.js architecture, and AI infrastructure.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-xl py-3 px-4 max-w-md mx-auto animate-in fade-in">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">You&apos;re in! Check your inbox for the welcome digest.</span>
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
              className="flex-1 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 text-sm text-white placeholder:text-slate-400 border border-white/15 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <Button
              type="submit"
              isLoading={loading}
              className="bg-white text-slate-950 hover:bg-slate-100 font-semibold rounded-xl px-6"
            >
              Subscribe
            </Button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 pt-1">
          No spam, ever. Unsubscribe at any time with a single click.
        </p>
      </div>
    </div>
  );
}
