// @ts-nocheck
'use client'

import { ThemeRenderer, ORGANIZASYON_SADE_CONFIG, ORGANIZASYON_SADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ORGANIZASYON_SADE_CONFIG}
        page={ORGANIZASYON_SADE_CONFIG.pages[0]}
        business={ORGANIZASYON_SADE_BUSINESS}
      />
    </div>
  )
}
