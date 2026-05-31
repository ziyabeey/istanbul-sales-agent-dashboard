import type { Metadata } from 'next'
import ClientPage from './client'
export const metadata: Metadata = { title: 'Apex Garage | Büyüme Otomotiv Demo', description: 'Karanlık kinetik mod, neon detaylar ve Custom Before/After Kaporta Kaydırıcısı.' }
export default function Page() { return <ClientPage /> }
