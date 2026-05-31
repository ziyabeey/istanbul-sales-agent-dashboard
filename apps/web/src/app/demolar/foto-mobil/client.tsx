// @ts-nocheck
'use client'

import { ThemeRenderer, FOTO_MOBIL_CONFIG, FOTO_MOBIL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FOTO_MOBIL_CONFIG}
        page={FOTO_MOBIL_CONFIG.pages[0]}
        business={FOTO_MOBIL_BUSINESS}
      />
    </div>
  )
}
