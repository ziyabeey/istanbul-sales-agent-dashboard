// @ts-nocheck
'use client'

import { ThemeRenderer, NAKLIYAT_OGRENCI_CONFIG, NAKLIYAT_OGRENCI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={NAKLIYAT_OGRENCI_CONFIG}
        page={NAKLIYAT_OGRENCI_CONFIG.pages[0]}
        business={NAKLIYAT_OGRENCI_BUSINESS}
      />
    </div>
  )
}
