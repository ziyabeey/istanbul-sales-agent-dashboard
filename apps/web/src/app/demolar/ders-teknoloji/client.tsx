// @ts-nocheck
'use client'

import { ThemeRenderer, OZELDERS_TEKNOLOJI_CONFIG, OZELDERS_TEKNOLOJI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={OZELDERS_TEKNOLOJI_CONFIG}
        page={OZELDERS_TEKNOLOJI_CONFIG.pages[0]}
        business={OZELDERS_TEKNOLOJI_BUSINESS}
      />
    </div>
  )
}
