import { Metadata } from 'next';
import { INSAAT_SADE_CONFIG, INSAAT_SADE_BUSINESS } from '@kepenk/templates';
import ClientPage from './client';

export const metadata: Metadata = {
  title: `${INSAAT_SADE_CONFIG.name} | ${INSAAT_SADE_BUSINESS?.name || 'Insaat Sade'}`,
  description: INSAAT_SADE_CONFIG.description,
};

export default function Page() {
  return <ClientPage />;
}
