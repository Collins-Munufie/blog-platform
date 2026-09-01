"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { slugify } from "@/lib/utils";

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-xl bg-slate-950 text-slate-100 shadow-xl border border-slate-800">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ArticleContent({ content }: { content: string }) {
  // Simple custom parser for markdown elements in the mock frontend
  const renderContent = () => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block start / end
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <CodeBlock
              key={`code-${i}`}
              language={codeLanguage}
              code={codeBuffer.join("\n")}
            />
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Headings
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        elements.push(
          <h3
            key={`h3-${i}`}
            id={slugify(text)}
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8 mb-4 scroll-mt-24"
          >
            {text}
          </h3>
        );
        continue;
      }

      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        elements.push(
          <h2
            key={`h2-${i}`}
            id={slugify(text)}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-10 mb-4 scroll-mt-24"
          >
            {text}
          </h2>
        );
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-6 border-l-4 border-primary-500 bg-primary-50/50 p-4 rounded-r-xl text-slate-700 italic dark:bg-primary-950/20 dark:text-slate-300 text-sm leading-relaxed"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
        continue;
      }

      // Bullet points
      if (line.startsWith("* ") || line.startsWith("- ")) {
        elements.push(
          <li
            key={`li-${i}`}
            className="text-slate-700 dark:text-slate-300 text-base leading-relaxed ml-6 list-disc mb-1"
          >
            {line.replace(/^(\*|-)\s+/, "")}
          </li>
        );
        continue;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li
            key={`oli-${i}`}
            className="text-slate-700 dark:text-slate-300 text-base leading-relaxed ml-6 list-decimal mb-1"
          >
            {line.replace(/^\d+\.\s+/, "")}
          </li>
        );
        continue;
      }

      // Paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p
            key={`p-${i}`}
            className="text-base text-slate-700 dark:text-slate-300 leading-relaxed my-4 font-normal"
          >
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return <div className="prose-container max-w-none">{renderContent()}</div>;
}
