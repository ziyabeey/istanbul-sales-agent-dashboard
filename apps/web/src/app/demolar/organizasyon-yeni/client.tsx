// @ts-nocheck
'use client'

import { ThemeRenderer, ORGANIZASYON_YENI_CONFIG, ORGANIZASYON_YENI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ORGANIZASYON_YENI_CONFIG}
        page={ORGANIZASYON_YENI_CONFIG.pages[0]}
        business={ORGANIZASYON_YENI_BUSINESS}
      />
    </div>
  )
}
