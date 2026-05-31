// @ts-nocheck
'use client'

import { ThemeRenderer, TESISATCI_ACIL_CONFIG, TESISATCI_ACIL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TESISATCI_ACIL_CONFIG}
        page={TESISATCI_ACIL_CONFIG.pages[0]}
        business={TESISATCI_ACIL_BUSINESS}
      />
    </div>
  )
}
