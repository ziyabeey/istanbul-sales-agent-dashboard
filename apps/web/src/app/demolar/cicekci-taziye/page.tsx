import { Metadata } from 'next';
import CicekciTaziyeClient from './client';
import { CICEKCI_TAZIYE_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CICEKCI_TAZIYE_CONFIG.name} | Kepenk.ai Demo`,
  description: CICEKCI_TAZIYE_CONFIG.description,
};

export default function CicekciTaziyePage() {
  return <CicekciTaziyeClient />;
}
