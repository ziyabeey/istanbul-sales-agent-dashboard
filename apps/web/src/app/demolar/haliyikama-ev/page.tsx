import { Metadata } from 'next';
import HaliyikamaEvClient from './client';
import { HALIYIKAMA_EV_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${HALIYIKAMA_EV_CONFIG.name} | Kepenk.ai Demo`,
  description: HALIYIKAMA_EV_CONFIG.description,
};

export default function HaliyikamaEvPage() {
  return <HaliyikamaEvClient />;
}