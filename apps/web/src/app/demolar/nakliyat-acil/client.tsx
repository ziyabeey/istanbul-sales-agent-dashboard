// @ts-nocheck
'use client'

import { ThemeRenderer, NAKLIYAT_ACIL_CONFIG, NAKLIYAT_ACIL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={NAKLIYAT_ACIL_CONFIG}
        page={NAKLIYAT_ACIL_CONFIG.pages[0]}
        business={NAKLIYAT_ACIL_BUSINESS}
      />
    </div>
  )
}
