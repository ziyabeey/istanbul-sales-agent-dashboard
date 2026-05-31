// @ts-nocheck
'use client'

import { ThemeRenderer, ECZANE_GECE_CONFIG, ECZANE_GECE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ECZANE_GECE_CONFIG}
        page={ECZANE_GECE_CONFIG.pages[0]}
        business={ECZANE_GECE_BUSINESS}
      />
    </div>
  )
}
