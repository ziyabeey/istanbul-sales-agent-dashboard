import { Metadata } from 'next';
import CicekciOnlineClient from './client';
import { CICEKCI_ONLINE_CONFIG } from '@kepenk/templates';

export const metadata: Metadata = {
  title: `${CICEKCI_ONLINE_CONFIG.name} | Kepenk.ai Demo`,
  description: CICEKCI_ONLINE_CONFIG.description,
};

export default function CicekciOnlinePage() {
  return <CicekciOnlineClient />;
}
