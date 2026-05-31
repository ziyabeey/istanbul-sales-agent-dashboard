// @ts-nocheck
'use client'

import { ThemeRenderer, BERBER_GENTLEMAN_CONFIG, BERBER_GENTLEMAN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={BERBER_GENTLEMAN_CONFIG}
        page={BERBER_GENTLEMAN_CONFIG.pages[0]}
        business={BERBER_GENTLEMAN_BUSINESS}
      />
    </div>
  )
}
