import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'Gelin Buketi | Botanik Tasarım',
  description: 'Düğün ve organizasyon çiçekçisi demo önizlemesi',
};

export default function CicekciDugunPage() {
  return <ClientPage />;
}
