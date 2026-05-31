import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'VIP Motors | Demo',
  description: 'Süper araçlara süper hizmet demo önizlemesi',
};

export default function OtoVipPage() {
  return <ClientPage />;
}
