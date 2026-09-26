import { Metadata } from 'next';
import { INSAAT_PRESTIJ_CONFIG, INSAAT_PRESTIJ_BUSINESS } from '@kepenk/templates/src/themes/configs/_archive/111-insaat-prestij';
import ClientPage from './client';

export const metadata: Metadata = {
  title: `${INSAAT_PRESTIJ_CONFIG.name} | ${INSAAT_PRESTIJ_BUSINESS?.name || 'Insaat Prestij'}`,
  description: INSAAT_PRESTIJ_CONFIG.description,
};

export default function Page() {
  return <ClientPage />;
}
