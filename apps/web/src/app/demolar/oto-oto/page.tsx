import type { Metadata } from 'next'
import ClientPage from './client'
export const metadata: Metadata = { title: 'Scan Auto | Premium+ Otomotiv Demo', description: 'Holografik Araç Teşhis - İnteraktif SVG Araç Haritası üzerinden mekanik onarım HUD paneli.' }
export default function Page() { return <ClientPage /> }
