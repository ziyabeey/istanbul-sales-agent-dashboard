// @ts-nocheck
'use client'

import { ThemeRenderer, TERZI_BUTIK_CONFIG, TERZI_BUTIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TERZI_BUTIK_CONFIG}
        page={TERZI_BUTIK_CONFIG.pages[0]}
        business={TERZI_BUTIK_BUSINESS}
      />
    </div>
  )
}
