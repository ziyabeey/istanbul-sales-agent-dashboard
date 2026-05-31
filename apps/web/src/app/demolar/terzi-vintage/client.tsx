// @ts-nocheck
'use client'

import { ThemeRenderer, TERZI_VINTAGE_CONFIG, TERZI_VINTAGE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TERZI_VINTAGE_CONFIG}
        page={TERZI_VINTAGE_CONFIG.pages[0]}
        business={TERZI_VINTAGE_BUSINESS}
      />
    </div>
  )
}
