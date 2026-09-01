"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { LanguageCode } from "@/lib/types";

const LANGUAGES: { code: LanguageCode; name: string; nativeName: string; greeting: string }[] = [
  { code: "en", name: "English", nativeName: "English", greeting: "Welcome to khophi_the_blogger" },
  { code: "twi", name: "Twi (Akan)", nativeName: "Twi", greeting: "Akwaaba kɔ khophi_the_blogger — Yɛma wo akwaaba!" },
  { code: "ga", name: "Ga", nativeName: "Gã", greeting: "Oyiwaladonn kɛ ba khophi_the_blogger" },
  { code: "ewe", name: "Ewe", nativeName: "Eʋegbe", greeting: "Woezor de khophi_the_blogger gbɔ" },
  { code: "hausa", name: "Hausa", nativeName: "Harshen Hausa", greeting: "Sannu da zuwa khophi_the_blogger" },
];

export function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = React.useState<LanguageCode>("en");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("devlog_lang_pref") as LanguageCode;
    if (saved) setSelectedLang(saved);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setSelectedLang(code);
    localStorage.setItem("devlog_lang_pref", code);
    setIsOpen(false);
    // Dispatch custom event for reactive localized greeting banners
    window.dispatchEvent(new CustomEvent("lang-change", { detail: code }));
  };

  const current = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#eef3fa] dark:bg-[#12346e]/50 hover:bg-[#e2e8f2] dark:hover:bg-[#12346e] text-xs font-semibold text-[#08214e] dark:text-slate-200 border border-[#e2e8f2] dark:border-[#1e3a6a] transition-all"
        title="Select Language (English, Twi, Ga, Ewe, Hausa)"
      >
        <Globe className="h-3.5 w-3.5 text-[#f59e0b]" />
        <span className="hidden sm:inline font-bold">{current.nativeName}</span>
        <span className="text-[10px] text-[#93a0b4]">🇬🇭</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#08214e] border border-[#e2e8f2] dark:border-[#1e3a6a] shadow-2xl p-2 z-50 animate-in fade-in space-y-1">
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#93a0b4]">
                Languages of Ghana &amp; Region
              </p>
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                  selectedLang === lang.code
                    ? "bg-[#20509b] text-white font-bold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div>
                  <p className="font-semibold">{lang.name}</p>
                  <p className={`text-[10px] ${selectedLang === lang.code ? "text-amber-300" : "text-[#93a0b4]"}`}>
                    {lang.greeting.slice(0, 24)}...
                  </p>
                </div>
                {selectedLang === lang.code && <Check className="h-4 w-4 text-amber-300" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function LocalizedGreetingBanner() {
  const [greeting, setGreeting] = React.useState(LANGUAGES[0].greeting);

  React.useEffect(() => {
    const update = () => {
      const code = (localStorage.getItem("devlog_lang_pref") as LanguageCode) || "en";
      const match = LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
      setGreeting(match.greeting);
    };
    update();
    window.addEventListener("lang-change", update);
    return () => window.removeEventListener("lang-change", update);
  }, []);

  return (
    <div className="bg-[#08214e] text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-blue-900/50 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="text-[#f59e0b] font-bold">🇬🇭 {greeting}</span>
        <span className="hidden sm:inline text-blue-200">• Tech, Culture, Afrobeats &amp; Accra Chronicles</span>
      </div>
    </div>
  );
}
