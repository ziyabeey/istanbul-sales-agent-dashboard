import { Metadata } from 'next';
import HaliyikamaOrganikDemoClient from './client';

export const metadata: Metadata = {
  title: 'Biyo Halı Yıkama Demo | Kepenk.ai',
  description: 'Zararsız organik bileşenlerle hizmet veren yenilikçi yıkama modeli.',
};

export default function HaliyikamaOrganikDemoPage() {
  return <HaliyikamaOrganikDemoClient />;
}