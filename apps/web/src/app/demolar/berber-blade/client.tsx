// @ts-nocheck
'use client'

import { ThemeRenderer, BERBER_BLADE_CONFIG, BERBER_BLADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={BERBER_BLADE_CONFIG}
        page={BERBER_BLADE_CONFIG.pages[0]}
        business={BERBER_BLADE_BUSINESS}
      />
    </div>
  )
}
