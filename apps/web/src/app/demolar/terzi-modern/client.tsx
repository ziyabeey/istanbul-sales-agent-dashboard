// @ts-nocheck
'use client'

import { ThemeRenderer, TERZI_MODERN_CONFIG, TERZI_MODERN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TERZI_MODERN_CONFIG}
        page={TERZI_MODERN_CONFIG.pages[0]}
        business={TERZI_MODERN_BUSINESS}
      />
    </div>
  )
}
