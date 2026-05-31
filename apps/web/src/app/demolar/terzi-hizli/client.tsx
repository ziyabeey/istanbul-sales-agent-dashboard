// @ts-nocheck
'use client'

import { ThemeRenderer, TERZI_HIZLI_CONFIG, TERZI_HIZLI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TERZI_HIZLI_CONFIG}
        page={TERZI_HIZLI_CONFIG.pages[0]}
        business={TERZI_HIZLI_BUSINESS}
      />
    </div>
  )
}
