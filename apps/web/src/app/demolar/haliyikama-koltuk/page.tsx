import { Metadata } from 'next';
import HaliyikamaKoltukDemoClient from './client';

export const metadata: Metadata = {
  title: 'Koltuk Ve Yatak Yıkama Demo | Kepenk.ai',
  description: 'Mobil randevulu çalışan koltuk ve döşeme yıkama temizlik şirketleri.',
};

export default function HaliyikamaKoltukDemoPage() {
  return <HaliyikamaKoltukDemoClient />;
}