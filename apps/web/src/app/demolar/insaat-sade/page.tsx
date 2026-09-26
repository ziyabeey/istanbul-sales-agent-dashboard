import { Metadata } from 'next';
import { INSAAT_SADE_CONFIG, INSAAT_SADE_BUSINESS } from '@kepenk/templates/src/themes/configs/_archive/112-insaat-sade';
import ClientPage from './client';

export const metadata: Metadata = {
  title: `${INSAAT_SADE_CONFIG.name} | ${INSAAT_SADE_BUSINESS?.name || 'Insaat Sade'}`,
  description: INSAAT_SADE_CONFIG.description,
};

export default function Page() {
  return <ClientPage />;
}
