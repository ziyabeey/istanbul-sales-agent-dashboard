import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Detaylı Oto Yıkama | Demo',
  description: 'Detaylı oto temizlik demo önizlemesi',
};

export default function OtoyikamaDetayPage() {
  return <ClientPage />;
}