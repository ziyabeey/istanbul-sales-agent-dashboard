// @ts-nocheck
'use client'

import { ThemeRenderer, VET_SPA_CONFIG, VET_SPA_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={VET_SPA_CONFIG}
        page={VET_SPA_CONFIG.pages[0]}
        business={VET_SPA_BUSINESS}
      />
    </div>
  )
}
