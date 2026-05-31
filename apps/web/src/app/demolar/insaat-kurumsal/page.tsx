import { Metadata } from 'next';
import { INSAAT_KURUMSAL_CONFIG, INSAAT_KURUMSAL_BUSINESS } from '@kepenk/templates';
import ClientPage from './client';

export const metadata: Metadata = {
  title: `${INSAAT_KURUMSAL_CONFIG.name} | ${INSAAT_KURUMSAL_BUSINESS?.name || 'Insaat Kurumsal'}`,
  description: INSAAT_KURUMSAL_CONFIG.description,
};

export default function Page() {
  return <ClientPage />;
}
