// @ts-nocheck
'use client'

import { ThemeRenderer, NAKLIYAT_ELITE_CONFIG, NAKLIYAT_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={NAKLIYAT_ELITE_CONFIG}
        page={NAKLIYAT_ELITE_CONFIG.pages[0]}
        business={NAKLIYAT_ELITE_BUSINESS}
      />
    </div>
  )
}
