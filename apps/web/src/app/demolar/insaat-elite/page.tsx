import { Metadata } from 'next';
import { INSAAT_ELITE_CONFIG, INSAAT_ELITE_BUSINESS } from '@kepenk/templates/src/themes/configs/_archive/108-insaat-elite';
import ClientPage from './client';

export const metadata: Metadata = {
  title: `${INSAAT_ELITE_CONFIG.name} | ${INSAAT_ELITE_BUSINESS?.name || 'Insaat Elite'}`,
  description: INSAAT_ELITE_CONFIG.description,
};

export default function Page() {
  return <ClientPage />;
}
