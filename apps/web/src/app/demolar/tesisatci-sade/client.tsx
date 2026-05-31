// @ts-nocheck
'use client'

import { ThemeRenderer, TESISATCI_SADE_CONFIG, TESISATCI_SADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TESISATCI_SADE_CONFIG}
        page={TESISATCI_SADE_CONFIG.pages[0]}
        business={TESISATCI_SADE_BUSINESS}
      />
    </div>
  )
}
