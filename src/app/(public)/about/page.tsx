import Image from "next/image";
import Link from "next/link";
import {
  Twitter,
  Github,
  MessageCircle,
  Mail,
  MapPin,
  Coffee,
  Cpu,
  Heart,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header Profile */}
      <div className="space-y-6">
        <div className="flex items-center gap-5">
          <Image
            src="/khophi_profile.jpg"
            alt="Khophi"
            width={88}
            height={88}
            priority
            className="rounded-3xl object-cover ring-2 ring-amber-500 shadow-md h-[88px] w-[88px]"
          />
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 font-heading">
              Khophi
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
              Software Engineer &amp; Writer based in <span className="font-bold text-stone-900 dark:text-white">Accra, Ghana 🇬🇭</span>
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
              <a
                href="https://x.com/cmunufie17588?s=11"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 dark:hover:text-white flex items-center gap-1 font-semibold"
              >
                <Twitter className="h-3.5 w-3.5 text-sky-500" /> @cmunufie17588
              </a>
              <span>•</span>
              <a
                href="https://wa.me/233559689849"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 dark:hover:text-white flex items-center gap-1 text-[#25D366] font-semibold"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" /> WhatsApp: 0559689849
              </a>
            </div>
          </div>
        </div>

        {/* First Person Narrative */}
        <div className="space-y-4 text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed pt-4 border-t border-stone-200 dark:border-stone-800">
          <p>
            Hey! Thanks for stopping by my corner of the internet.
          </p>
          <p>
            I’m a software architect and writer. I grew up in Ghana, studied computer science, spent a few years working with remote fintech teams across Europe, and eventually moved back to Accra to build full-time.
          </p>
          <p>
            I started <strong className="text-stone-900 dark:text-white">khophi_the_blogger</strong> because most coverage of African tech either felt like corporate PR or distant theoretical analysis. I wanted a space to write honest, ground-truth essays on what building software here actually looks like — from Mobile Money (MoMo) settlement quirks to the thriving music and culture scene in Osu and Tema.
          </p>
        </div>
      </div>

      {/* What I Write About */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-heading">
          What You’ll Find Here
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-1.5 shadow-sm">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-amber-600" />
              <span>Real African Tech &amp; Fintech</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Dissecting Mobile Money APIs, GhIPSS interoperability, Starlink deployments, and distributed systems.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-1.5 shadow-sm">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-600" />
              <span>Culture, Music &amp; Accra Life</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Behind the scenes in Tema home studios, Afrobeats streaming economics, and living in Accra.
            </p>
          </div>
        </div>
      </div>

      {/* My Workstation & Hardware Setup */}
      <div className="p-6 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
        <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading flex items-center gap-2">
          <Coffee className="h-4 w-4 text-amber-600" />
          <span>My Daily Workstation in Osu</span>
        </h2>
        <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 list-disc list-inside">
          <li><strong>Computer:</strong> MacBook Pro M3 Max (36GB RAM)</li>
          <li><strong>Power:</strong> 5kWh Lithium Solar Hybrid Backup (Zero-downtime during outages)</li>
          <li><strong>Connectivity:</strong> 200Mbps Fiber + Starlink Mini failover</li>
          <li><strong>Editor:</strong> VS Code with Tokyo Night + JetBrains Mono</li>
        </ul>
      </div>

      {/* Get in Touch */}
      <div className="space-y-3 pt-2">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">
          Get in Touch
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          I read every message. If you’re building something interesting in Accra, want to discuss an essay, or just want to grab a coffee in Labone, send me a note:
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://wa.me/233559689849"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-stone-950 font-bold text-xs shadow-sm hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="h-4 w-4 fill-stone-950" />
            <span>WhatsApp (0559689849)</span>
          </a>
          <a
            href="mailto:khophi@khophitheblogger.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs shadow-sm hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            <span>Email Khophi</span>
          </a>
        </div>
      </div>
    </div>
  );
}
