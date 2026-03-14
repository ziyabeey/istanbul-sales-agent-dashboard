import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'kepenk.ai | Esnaf Sitesi',
  description: 'Müşteri Odaklı Web Sitesi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
