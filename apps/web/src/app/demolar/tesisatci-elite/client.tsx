// @ts-nocheck
'use client'

import { ThemeRenderer, TESISATCI_ELITE_CONFIG, TESISATCI_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TESISATCI_ELITE_CONFIG}
        page={TESISATCI_ELITE_CONFIG.pages[0]}
        business={TESISATCI_ELITE_BUSINESS}
      />
    </div>
  )
}
