// @ts-nocheck
'use client'

import { ThemeRenderer, OZELDERS_LISE_CONFIG, OZELDERS_LISE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={OZELDERS_LISE_CONFIG}
        page={OZELDERS_LISE_CONFIG.pages[0]}
        business={OZELDERS_LISE_BUSINESS}
      />
    </div>
  )
}
