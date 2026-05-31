import { Metadata } from 'next';
import CilingirLuxClient from './client';
import { CILINGIR_LUX_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CILINGIR_LUX_CONFIG.name} | Kepenk.ai Demo`,
  description: CILINGIR_LUX_CONFIG.description,
};

export default function CilingirLuxPage() {
  return <CilingirLuxClient />;
}