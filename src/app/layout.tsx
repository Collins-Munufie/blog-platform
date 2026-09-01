import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevLog — Engineering & Architecture Publication",
    template: "%s | DevLog",
  },
  description:
    "An engineering-first publication covering modern web architectures, distributed systems, high-performance TypeScript, and AI systems.",
  keywords: [
    "Next.js",
    "TypeScript",
    "Software Architecture",
    "PostgreSQL",
    "Distributed Systems",
    "React",
  ],
  authors: [{ name: "DevLog Engineering Team" }],
  creator: "DevLog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
