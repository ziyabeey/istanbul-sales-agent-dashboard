import { Metadata } from 'next';
import CicekciLuxClient from './client';
import { CICEKCI_LUX_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CICEKCI_LUX_CONFIG.name} | Kepenk.ai Demo`,
  description: CICEKCI_LUX_CONFIG.description,
};

export default function CicekciLuxPage() {
  return <CicekciLuxClient />;
}
