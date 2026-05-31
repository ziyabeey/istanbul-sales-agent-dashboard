// @ts-nocheck
'use client'

import { ThemeRenderer, ECZANE_SMART_CONFIG, ECZANE_SMART_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ECZANE_SMART_CONFIG}
        page={ECZANE_SMART_CONFIG.pages[0]}
        business={ECZANE_SMART_BUSINESS}
      />
    </div>
  )
}
