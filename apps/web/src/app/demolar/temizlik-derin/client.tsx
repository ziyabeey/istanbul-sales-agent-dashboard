// @ts-nocheck
'use client'

import { ThemeRenderer, TEMIZLIK_DERIN_CONFIG, TEMIZLIK_DERIN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TEMIZLIK_DERIN_CONFIG}
        page={TEMIZLIK_DERIN_CONFIG.pages[0]}
        business={TEMIZLIK_DERIN_BUSINESS}
      />
    </div>
  )
}
