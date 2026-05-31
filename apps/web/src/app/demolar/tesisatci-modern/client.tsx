// @ts-nocheck
'use client'

import { ThemeRenderer, TESISATCI_MODERN_CONFIG, TESISATCI_MODERN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TESISATCI_MODERN_CONFIG}
        page={TESISATCI_MODERN_CONFIG.pages[0]}
        business={TESISATCI_MODERN_BUSINESS}
      />
    </div>
  )
}
