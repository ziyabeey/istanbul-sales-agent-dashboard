// @ts-nocheck
'use client'

import { ThemeRenderer, ELEKTRIKCI_ACIL_CONFIG, ELEKTRIKCI_ACIL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ELEKTRIKCI_ACIL_CONFIG}
        page={ELEKTRIKCI_ACIL_CONFIG.pages[0]}
        business={ELEKTRIKCI_ACIL_BUSINESS}
      />
    </div>
  )
}
