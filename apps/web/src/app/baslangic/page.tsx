import { notFound } from 'next/navigation'
import CoreEntry from '@/components/core/CoreEntry'
import { isCoreEntryEnabled } from '@/lib/core/entryGate'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'İlk gün · Kepenk', robots: { index: false, follow: false } }

export default function BaslangicPage() {
  if (!isCoreEntryEnabled()) notFound()
  return <CoreEntry />
}
