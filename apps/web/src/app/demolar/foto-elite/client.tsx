// @ts-nocheck
'use client'

import { ThemeRenderer, FOTO_ELITE_CONFIG, FOTO_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FOTO_ELITE_CONFIG}
        page={FOTO_ELITE_CONFIG.pages[0]}
        business={FOTO_ELITE_BUSINESS}
      />
    </div>
  )
}
