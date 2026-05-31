// @ts-nocheck
'use client'

import { ThemeRenderer, ECZANE_DERMIS_CONFIG, ECZANE_DERMIS_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ECZANE_DERMIS_CONFIG}
        page={ECZANE_DERMIS_CONFIG.pages[0]}
        business={ECZANE_DERMIS_BUSINESS}
      />
    </div>
  )
}
