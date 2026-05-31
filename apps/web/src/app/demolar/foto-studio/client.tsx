// @ts-nocheck
'use client'

import { ThemeRenderer, FOTO_STUDIO_CONFIG, FOTO_STUDIO_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FOTO_STUDIO_CONFIG}
        page={FOTO_STUDIO_CONFIG.pages[0]}
        business={FOTO_STUDIO_BUSINESS}
      />
    </div>
  )
}
