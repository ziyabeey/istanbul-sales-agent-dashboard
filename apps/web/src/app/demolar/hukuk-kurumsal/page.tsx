import type { Metadata } from 'next'
import ClientPage from './client'
export const metadata: Metadata = { title: 'Karaağaç Hukuk Bürosu | Standart Demo', description: '30/70 Sticky Sidebar mimarisi, krem/altın palet.' }
export default function Page() { return <ClientPage /> }
