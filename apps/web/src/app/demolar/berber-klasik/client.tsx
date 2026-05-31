// @ts-nocheck
'use client'

import { ThemeRenderer, BERBER_KLASIK_CONFIG, BERBER_KLASIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={BERBER_KLASIK_CONFIG}
        page={BERBER_KLASIK_CONFIG.pages[0]}
        business={BERBER_KLASIK_BUSINESS}
      />
    </div>
  )
}
