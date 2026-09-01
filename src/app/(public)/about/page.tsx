import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Linkedin, MessageCircle, Mail, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-3xl card-lift bg-white dark:bg-[#08214e]">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
          alt="Khophi"
          width={120}
          height={120}
          className="rounded-3xl object-cover ring-4 ring-[#f59e0b] shadow-xl"
        />

        <div className="space-y-3 text-center sm:text-left flex-1">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fff9eb] dark:bg-[#f59e0b]/10 text-[#d97706] dark:text-[#f59e0b] border border-[#ffe299] dark:border-[#f59e0b]/20">
              <Sparkles className="h-3.5 w-3.5" /> Founder &amp; Lead Storyteller
            </span>
            <h1 className="text-3xl font-black text-[#08214e] dark:text-white font-heading">
              Khophi <span className="text-base text-[#93a0b4] font-mono">(@khophi_the_blogger)</span>
            </h1>
            <p className="text-xs text-[#20509b] dark:text-[#8ab1e3] font-semibold flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="h-3.5 w-3.5" /> Accra, Ghana 🇬🇭
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
            Software architect, tech journalist, and cultural commentator documenting West Africa’s digital transformation, mobile money innovations, Afrobeats economics, and Ghanaian lifestyle.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
            <a
              href="https://wa.me/233240000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] text-slate-950 font-bold text-xs shadow-md"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" /> WhatsApp Khophi
            </a>
            <a
              href="https://twitter.com/khophi_blogger"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#08214e] dark:text-white font-semibold text-xs"
            >
              <Twitter className="h-3.5 w-3.5" /> @khophi_blogger
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Standards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#08214e] dark:text-white font-heading">
          Editorial Mission &amp; Standards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-lift p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#08214e] dark:text-white">
              <CheckCircle2 className="h-4 w-4 text-[#f59e0b]" />
              <span>Ground Truth in African Tech</span>
            </div>
            <p className="text-xs text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
              We interview real founders, review actual transaction volume data, and demystify financial infrastructure across Ghana and Africa.
            </p>
          </div>

          <div className="card-lift p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#08214e] dark:text-white">
              <CheckCircle2 className="h-4 w-4 text-[#f59e0b]" />
              <span>Multilingual &amp; Accessible</span>
            </div>
            <p className="text-xs text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
              Bridging English analysis with Ghanaian indigenous languages (Twi, Ga, Ewe, Hausa) to ensure inclusive digital literacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
