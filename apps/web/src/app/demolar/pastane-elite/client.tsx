// @ts-nocheck
'use client'

import { ThemeRenderer, PASTANE_ELITE_CONFIG, PASTANE_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={PASTANE_ELITE_CONFIG}
        page={PASTANE_ELITE_CONFIG.pages[0]}
        business={PASTANE_ELITE_BUSINESS}
      />
    </div>
  )
}
