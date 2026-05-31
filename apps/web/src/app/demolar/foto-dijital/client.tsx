// @ts-nocheck
'use client'

import { ThemeRenderer, FOTO_DIJITAL_CONFIG, FOTO_DIJITAL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FOTO_DIJITAL_CONFIG}
        page={FOTO_DIJITAL_CONFIG.pages[0]}
        business={FOTO_DIJITAL_BUSINESS}
      />
    </div>
  )
}
