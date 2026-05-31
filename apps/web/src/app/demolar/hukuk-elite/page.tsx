import type { Metadata } from 'next'
import ClientPage from './client'
export const metadata: Metadata = { title: 'Elit Hukuk | Premium+ Demo', description: 'SVG Hotspots hukuk dalları haritası, bronz/siyah Awwwards seviyesi.' }
export default function Page() { return <ClientPage /> }
