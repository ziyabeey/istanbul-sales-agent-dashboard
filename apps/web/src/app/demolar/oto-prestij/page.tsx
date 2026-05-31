import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Prestij Auto Gallery | Demo',
  description: 'İkinci el lüks araçlarda güvenilir adres demo önizlemesi',
};

export default function OtoPrestijPage() {
  return <ClientPage />;
}
