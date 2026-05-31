import type { Metadata } from 'next'
import ClientPage from './client'
export const metadata: Metadata = { title: 'Avukat Bio-Link | Temel Hukuk Demo', description: 'Tek sütun, yalın avukat bilgi kartı.' }
export default function Page() { return <ClientPage /> }
