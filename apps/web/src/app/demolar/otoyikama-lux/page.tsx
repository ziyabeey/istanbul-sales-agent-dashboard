import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'VIP Seramik | Demo',
  description: 'Premium seramik kaplama ve yıkama demo önizlemesi',
};

export default function OtoyikamaLuxPage() {
  return <ClientPage />;
}