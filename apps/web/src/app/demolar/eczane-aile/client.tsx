// @ts-nocheck
'use client'

import { ThemeRenderer, ECZANE_AILE_CONFIG, ECZANE_AILE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ECZANE_AILE_CONFIG}
        page={ECZANE_AILE_CONFIG.pages[0]}
        business={ECZANE_AILE_BUSINESS}
      />
    </div>
  )
}
