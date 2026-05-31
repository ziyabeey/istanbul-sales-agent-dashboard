// @ts-nocheck
'use client'

import { ThemeRenderer, TEMIZLIK_HIJYEN_CONFIG, TEMIZLIK_HIJYEN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TEMIZLIK_HIJYEN_CONFIG}
        page={TEMIZLIK_HIJYEN_CONFIG.pages[0]}
        business={TEMIZLIK_HIJYEN_BUSINESS}
      />
    </div>
  )
}
