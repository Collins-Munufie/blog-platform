"use client";

import * as React from "react";
import { Shield, KeyRound, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { loginAdmin } from "@/lib/api/auth";

interface AdminAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export function AdminAuthModal({ isOpen, onSuccess }: AdminAuthModalProps) {
  const [passcode, setPasscode] = React.useState("");
  const [showPasscode, setShowPasscode] = React.useState(false);
  const [error, setError] = React.useState("");
  const [failedAttempts, setFailedAttempts] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Authentication credentials required.");
      return;
    }

    if (failedAttempts >= 5) {
      setError("Security rate-limit active. Please wait 30 seconds.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const success = loginAdmin(passcode);
      if (success) {
        setPasscode("");
        setError("");
        setFailedAttempts(0);
        onSuccess();
      } else {
        setFailedAttempts((prev) => prev + 1);
        setError("Invalid security passcode or PIN. Valid: khophi2026 or 8899");
      }
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041536]/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-[#0b1d3a] border border-[#1e3a6a] rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Senior UI Header */}
        <div className="p-7 bg-gradient-to-b from-[#08214e] via-[#071d44] to-[#0b1d3a] border-b border-[#1e3a6a] relative overflow-hidden text-center space-y-3">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-[#f59e0b]/10 blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a6a]/60 border border-[#2e528d] text-[10px] font-bold font-mono tracking-widest text-[#f59e0b] uppercase shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-[#f59e0b]" />
            <span>Studio Enterprise Security Gate</span>
          </div>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#08214e] border border-[#2e528d] shadow-inner my-1">
            <Lock className="h-7 w-7 text-[#f59e0b]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
              Administrator Verification
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
              Authenticate with your security key to open the Author Studio &amp; Command Console.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-7 space-y-5 bg-[#0b1d3a]">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 flex items-center gap-2.5 text-xs text-rose-200 animate-in slide-in-from-top-1">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <p className="font-medium leading-snug">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-300">
                Security Passcode / PIN
              </label>
              <span className="text-[10px] text-slate-400 font-mono">256-bit Encrypted</span>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="h-4 w-4 text-[#f59e0b]" />
              </div>
              <input
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                placeholder="Enter passcode or 4-digit PIN"
                autoFocus
                className="w-full pl-10 pr-10 py-3.5 bg-[#041536] border border-[#1e3a6a] rounded-2xl text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#041536]/80 border border-[#1e3a6a] text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Shield className="h-3.5 w-3.5 text-[#f59e0b]" /> Active Passcode Keys
              </span>
              <span className="text-[10px] text-[#f59e0b] font-mono">AUTHORIZED</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#08214e] border border-[#1e3a6a] font-mono text-[11px] text-white font-bold">
                khophi2026
              </span>
              <span className="text-slate-500 text-xs">or</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#08214e] border border-[#1e3a6a] font-mono text-[11px] text-[#f59e0b] font-bold">
                8899
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !passcode.trim()}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#f59e0b] to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Verifying Credentials..." : "Authenticate & Unlock Access"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
