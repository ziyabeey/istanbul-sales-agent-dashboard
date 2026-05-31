import { Metadata } from 'next';
import CilingirEvClient from './client';
import { CILINGIR_EV_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CILINGIR_EV_CONFIG.name} | Kepenk.ai Demo`,
  description: CILINGIR_EV_CONFIG.description || '7/24 Acil Çilingir Hizmeti',
};

export default function CilingirEvPage() {
  return <CilingirEvClient />;
}