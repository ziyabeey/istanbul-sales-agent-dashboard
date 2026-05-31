// @ts-nocheck
'use client'

import { ThemeRenderer, TEMIZLIK_ELITE_CONFIG, TEMIZLIK_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TEMIZLIK_ELITE_CONFIG}
        page={TEMIZLIK_ELITE_CONFIG.pages[0]}
        business={TEMIZLIK_ELITE_BUSINESS}
      />
    </div>
  )
}
