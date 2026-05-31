import { Metadata } from 'next';
import HaliyikamaFabrikaDemoClient from './client';

export const metadata: Metadata = {
  title: 'Fabrika Halı Yıkama Demo | Kepenk.ai',
  description: 'Fabrika formatlı halı yıkama firmaları için tam otomatik demo.',
};

export default function HaliyikamaFabrikaDemoPage() {
  return <HaliyikamaFabrikaDemoClient />;
}