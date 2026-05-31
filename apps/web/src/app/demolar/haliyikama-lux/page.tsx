import { Metadata } from 'next';
import HaliyikamaLuxDemoClient from './client';

export const metadata: Metadata = {
  title: 'Lüks & Antika Halı Restorasyon Demo | Kepenk.ai',
  description: 'Değerli İran ve ipek halılar için restorasyon odaklı lüks varyant.',
};

export default function HaliyikamaLuxDemoPage() {
  return <HaliyikamaLuxDemoClient />;
}