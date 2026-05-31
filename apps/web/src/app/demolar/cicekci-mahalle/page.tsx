import { Metadata } from 'next';
import CicekciMahalleClient from './client';
import { CICEKCI_MAHALLE_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CICEKCI_MAHALLE_CONFIG.name} | Kepenk.ai Demo`,
  description: CICEKCI_MAHALLE_CONFIG.description,
};

export default function CicekciMahallePage() {
  return <CicekciMahalleClient />;
}
