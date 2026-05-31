import { Metadata } from 'next';
import CilingirCelikClient from './client';
import { CILINGIR_CELIK_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CILINGIR_CELIK_CONFIG.name} | Kepenk.ai Demo`,
  description: CILINGIR_CELIK_CONFIG.description,
};

export default function CilingirCelikPage() {
  return <CilingirCelikClient />;
}