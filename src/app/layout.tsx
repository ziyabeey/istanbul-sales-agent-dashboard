import type { Metadata } from "next";
import { Syne, Lora } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "kepenk.ai — Esnafın 7/24 Dijital Asistanı",
  description: "Türkiye'nin 3.5 milyon esnafına özel, 7/24 uyumayan, yorulmayan dijital iş arkadaşınız kepenk.ai ile tanışın.",
  manifest: "/manifest.json",
  themeColor: "#0E0D0B",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "kepenk.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${syne.variable} ${lora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
