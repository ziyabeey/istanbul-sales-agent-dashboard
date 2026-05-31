import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Standart Yıkama | Demo',
  description: 'Standart oto yıkama demo önizlemesi',
};

export default function OtoyikamaOtoPage() {
  return <ClientPage />;
}