import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "khophi_the_blogger — Tech, Culture & Pan-African Chronicles",
    template: "%s | khophi_the_blogger",
  },
  description:
    "Accra-based digital publication reporting on Silicon Accra tech innovation, mobile money economics, Afrobeats, and Ghanaian culture.",
  keywords: [
    "Khophi",
    "khophi_the_blogger",
    "Ghana Tech",
    "Accra Startups",
    "Mobile Money Ghana",
    "Afrobeats",
    "Black Stars Football",
  ],
  authors: [{ name: "Khophi", url: "https://khophitheblogger.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#f7f9fc] dark:bg-[#041536] text-[#08214e] dark:text-slate-100 min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
