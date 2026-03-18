import type { Metadata } from 'next'
import DestekShell from './DestekShell'

export const metadata: Metadata = {
  title: {
    template: '%s | KPNK Destek',
    default: 'Destek Merkezi | KPNK',
  },
  description: 'KPNK platformu kullanım rehberleri, editör kılavuzu, modül bilgileri ve destek makaleleri.',
  alternates: { canonical: 'https://destek.kepenk.ai' },
  openGraph: {
    title: 'KPNK Destek Merkezi',
    description: 'Editör kullanımı, modüller, paketler ve daha fazlası.',
    url: 'https://destek.kepenk.ai',
    siteName: 'KPNK Destek',
    type: 'website',
  },
}

export default function DestekLayout({ children }: { children: React.ReactNode }) {
  return <DestekShell>{children}</DestekShell>
}
