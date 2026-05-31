// @ts-nocheck
'use client'

import { ThemeRenderer, NAKLIYAT_SEHIRICI_CONFIG, NAKLIYAT_SEHIRICI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={NAKLIYAT_SEHIRICI_CONFIG}
        page={NAKLIYAT_SEHIRICI_CONFIG.pages[0]}
        business={NAKLIYAT_SEHIRICI_BUSINESS}
      />
    </div>
  )
}
