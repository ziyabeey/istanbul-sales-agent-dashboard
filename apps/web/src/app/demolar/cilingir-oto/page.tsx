import { Metadata } from 'next';
import CilingirOtoClient from './client';
import { CILINGIR_OTO_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CILINGIR_OTO_CONFIG.name} | Kepenk.ai Demo`,
  description: CILINGIR_OTO_CONFIG.description,
};

export default function CilingirOtoPage() {
  return <CilingirOtoClient />;
}