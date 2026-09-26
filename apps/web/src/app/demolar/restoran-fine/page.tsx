import type { Metadata } from 'next'
import ClientPage from './client'

// Source recovery is still open. Never read unavailable business data at import time.
export const metadata: Metadata = {
  title: 'Demo henüz kullanılamıyor | Kepenk.ai',
  description: 'Bu temanın kaynak dosyası henüz doğrulanmadığı için demo kullanıma açık değildir.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ClientPage />
}
