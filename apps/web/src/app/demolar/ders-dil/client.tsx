// @ts-nocheck
'use client'

import { ThemeRenderer, OZELDERS_DIL_CONFIG, OZELDERS_DIL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={OZELDERS_DIL_CONFIG}
        page={OZELDERS_DIL_CONFIG.pages[0]}
        business={OZELDERS_DIL_BUSINESS}
      />
    </div>
  )
}
