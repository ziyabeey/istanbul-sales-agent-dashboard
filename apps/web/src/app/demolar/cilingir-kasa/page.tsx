import { Metadata } from 'next';
import CilingirKasaClient from './client';
import { CILINGIR_KASA_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CILINGIR_KASA_CONFIG.name} | Kepenk.ai Demo`,
  description: CILINGIR_KASA_CONFIG.description,
};

export default function CilingirKasaPage() {
  return <CilingirKasaClient />;
}