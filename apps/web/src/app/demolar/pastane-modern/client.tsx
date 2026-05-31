// @ts-nocheck
'use client'

import { ThemeRenderer, PASTANE_MODERN_CONFIG, PASTANE_MODERN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={PASTANE_MODERN_CONFIG}
        page={PASTANE_MODERN_CONFIG.pages[0]}
        business={PASTANE_MODERN_BUSINESS}
      />
    </div>
  )
}
