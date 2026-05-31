// @ts-nocheck
'use client'

import { ThemeRenderer, ECZANE_ORGANIK_CONFIG, ECZANE_ORGANIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ECZANE_ORGANIK_CONFIG}
        page={ECZANE_ORGANIK_CONFIG.pages[0]}
        business={ECZANE_ORGANIK_BUSINESS}
      />
    </div>
  )
}
