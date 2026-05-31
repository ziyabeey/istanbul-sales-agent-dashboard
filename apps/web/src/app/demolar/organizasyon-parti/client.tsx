// @ts-nocheck
'use client'

import { ThemeRenderer, ORGANIZASYON_PARTI_CONFIG, ORGANIZASYON_PARTI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ORGANIZASYON_PARTI_CONFIG}
        page={ORGANIZASYON_PARTI_CONFIG.pages[0]}
        business={ORGANIZASYON_PARTI_BUSINESS}
      />
    </div>
  )
}
