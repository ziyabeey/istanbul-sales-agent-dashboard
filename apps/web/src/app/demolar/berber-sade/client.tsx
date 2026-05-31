// @ts-nocheck
'use client'

import { ThemeRenderer, BERBER_SADE_CONFIG, BERBER_SADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={BERBER_SADE_CONFIG}
        page={BERBER_SADE_CONFIG.pages[0]}
        business={BERBER_SADE_BUSINESS}
      />
    </div>
  )
}
