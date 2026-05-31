import { Metadata } from 'next';
import { INSAAT_MODERN_CONFIG, INSAAT_MODERN_BUSINESS } from '@kepenk/templates';
import ClientPage from './client';

export const metadata: Metadata = {
  title: `${INSAAT_MODERN_CONFIG.name} | ${INSAAT_MODERN_BUSINESS?.name || 'Insaat Modern'}`,
  description: INSAAT_MODERN_CONFIG.description,
};

export default function Page() {
  return <ClientPage />;
}
