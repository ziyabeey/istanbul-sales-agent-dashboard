// @ts-nocheck
'use client'

import { ThemeRenderer, FOTO_BELGESEL_CONFIG, FOTO_BELGESEL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FOTO_BELGESEL_CONFIG}
        page={FOTO_BELGESEL_CONFIG.pages[0]}
        business={FOTO_BELGESEL_BUSINESS}
      />
    </div>
  )
}
