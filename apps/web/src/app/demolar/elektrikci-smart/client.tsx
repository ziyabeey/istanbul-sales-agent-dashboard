// @ts-nocheck
'use client'

import { ThemeRenderer, ELEKTRIKCI_SMART_CONFIG, ELEKTRIKCI_SMART_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ELEKTRIKCI_SMART_CONFIG}
        page={ELEKTRIKCI_SMART_CONFIG.pages[0]}
        business={ELEKTRIKCI_SMART_BUSINESS}
      />
    </div>
  )
}
