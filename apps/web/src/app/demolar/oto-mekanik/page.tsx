import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Master Mekanik | Demo',
  description: 'Her marka, her model, çözüm odaklı mekanik demo önizlemesi',
};

export default function OtoMekanikPage() {
  return <ClientPage />;
}