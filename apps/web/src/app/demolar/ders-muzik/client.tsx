// @ts-nocheck
'use client'

import { ThemeRenderer, OZELDERS_MUZIK_CONFIG, OZELDERS_MUZIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={OZELDERS_MUZIK_CONFIG}
        page={OZELDERS_MUZIK_CONFIG.pages[0]}
        business={OZELDERS_MUZIK_BUSINESS}
      />
    </div>
  )
}
