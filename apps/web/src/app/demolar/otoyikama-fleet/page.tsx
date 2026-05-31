import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Filo Yıkama | Demo',
  description: 'Filo ve ticari araç yıkama demo önizlemesi',
};

export default function OtoyikamaFleetPage() {
  return <ClientPage />;
}