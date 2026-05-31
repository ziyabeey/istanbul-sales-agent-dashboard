// @ts-nocheck
'use client'

import { ThemeRenderer, TEMIZLIK_EXPRESS_CONFIG, TEMIZLIK_EXPRESS_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TEMIZLIK_EXPRESS_CONFIG}
        page={TEMIZLIK_EXPRESS_CONFIG.pages[0]}
        business={TEMIZLIK_EXPRESS_BUSINESS}
      />
    </div>
  )
}
