import { Terminal, ShieldCheck, Zap, Code2, HeartHandshake } from "lucide-react";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";

export default function AboutPage() {
  const pillars = [
    {
      icon: Code2,
      title: "Real Code, No Hand-Waving",
      desc: "Every architectural pattern is backed by concrete code snippets, benchmarks, and production-tested patterns.",
    },
    {
      icon: Zap,
      title: "Performance by Default",
      desc: "Zero-bloat frontends, sub-millisecond edge execution, and deterministic caching strategies.",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Downtime Reliability",
      desc: "Pragmatic distributed systems engineering, database migrations without lockouts, and multi-region resilience.",
    },
    {
      icon: HeartHandshake,
      title: "Community & Peer Review",
      desc: "Open discussions, interactive comment threads, and knowledge sharing from senior engineers across top tech teams.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Intro */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 mx-auto">
          <Terminal className="h-6 w-6" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About DevLog Engineering
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          DevLog is a premier engineering publication dedicated to modern software architecture, edge networks, TypeScript systems, and agentic AI tooling.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/40 space-y-3 shadow-sm"
            >
              <div className="p-2.5 w-fit rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Editorial Guidelines */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Editorial & Contribution Standards
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          We welcome submissions from staff engineers, architects, and open-source maintainers. All articles undergo technical peer review to ensure accuracy, reproducible code examples, and clear architectural diagrams.
        </p>
      </div>

      {/* Newsletter */}
      <NewsletterCTA />
    </div>
  );
}
