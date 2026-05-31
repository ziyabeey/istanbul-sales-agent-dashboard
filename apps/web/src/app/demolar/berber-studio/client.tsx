// @ts-nocheck
'use client'

import { ThemeRenderer, BERBER_STUDIO_CONFIG, BERBER_STUDIO_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={BERBER_STUDIO_CONFIG}
        page={BERBER_STUDIO_CONFIG.pages[0]}
        business={BERBER_STUDIO_BUSINESS}
      />
    </div>
  )
}
