import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XINXIA v5.0 - Esnaf Asistanı Ekosistemi",
  description: "Türkiye'nin 3.5 milyon esnafına özel, 7/24 uyumayan, yorulmayan dijital iş arkadaşınız XINXIA v5.0 ile tanışın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
