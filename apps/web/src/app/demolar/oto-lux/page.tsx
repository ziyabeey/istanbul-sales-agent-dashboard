import { Metadata } from 'next';
import ClientPage from './client';

export const metadata: Metadata = {
  title: 'AutoLux Premium Servis | Demo',
  description: 'Lüks araçlara özel premium servis demo önizlemesi',
};

export default function OtoLuxPage() {
  return <ClientPage />;
}