import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Ekspres Yıkama | Demo',
  description: 'Hızlı oto yıkama demo önizlemesi',
};

export default function OtoyikamaEkspresPage() {
  return <ClientPage />;
}