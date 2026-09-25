'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { isCoreEntryPage } from '@/lib/core/entryGate'
import { EsnafProvider } from './EsnafContext'

/** The isolated Core entry never fetches or consumes the legacy identity. */
export default function BusinessSessionBoundary({ coreEntryEnabled, children }: { coreEntryEnabled: boolean; children: ReactNode }) {
  const pathname = usePathname()
  return coreEntryEnabled && isCoreEntryPage(pathname ?? '') ? children : <EsnafProvider>{children}</EsnafProvider>
}
