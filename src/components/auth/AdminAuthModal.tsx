"use client";

import * as React from "react";
import { ShieldAlert, KeyRound, Lock, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { loginAdmin } from "@/lib/api/auth";
import { Button } from "@/components/ui/Button";

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
      setError("Please enter the admin passcode or PIN.");
      return;
    }

    if (failedAttempts >= 5) {
      setError("Too many failed attempts. Please wait 30 seconds before trying again.");
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
        setError("Invalid security passcode or PIN. Default: khophi2026 or 8899");
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08214e]/90 backdrop-blur-xl animate-in fade-in">
      <div className="bg-white dark:bg-[#141a24] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-stone-900 to-[#08214e] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
          
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-inner">
            <Lock className="h-7 w-7 text-amber-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
            Studio Security Gate
          </h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xs mx-auto leading-relaxed">
            Enter your admin passcode or security PIN to access the Studio Dashboard &amp; Command Console.
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-in slide-in-from-top-1">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <p className="font-semibold leading-snug">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              Admin Passcode or PIN
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                placeholder="Enter passcode (e.g. khophi2026)"
                autoFocus
                className="w-full pl-10 pr-10 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm font-mono text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Security Credentials</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 font-mono text-[10px]">
              Passcode: <strong className="text-amber-700 dark:text-amber-300">khophi2026</strong> &nbsp;|&nbsp; PIN: <strong className="text-amber-700 dark:text-amber-300">8899</strong>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !passcode.trim()}
            className="w-full py-3.5 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-sm shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "Verifying Credentials..." : "Authenticate & Unlock"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
