import CoreEntry from '@/components/core/CoreEntry'
import { isCoreEntryEnabled } from '@/lib/core/entryGate'
import LegacyGirisPage from './LegacyGirisPage'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Giriş · Kepenk', robots: { index: false, follow: false } }

export default function GirisPage() {
  return isCoreEntryEnabled() ? <CoreEntry /> : <LegacyGirisPage />
}
