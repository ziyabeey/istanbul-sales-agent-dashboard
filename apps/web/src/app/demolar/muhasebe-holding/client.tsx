// @ts-nocheck
'use client'

import { ThemeRenderer, MUHASEBE_HOLDING_CONFIG, MUHASEBE_HOLDING_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={MUHASEBE_HOLDING_CONFIG}
        page={MUHASEBE_HOLDING_CONFIG.pages[0]}
        business={MUHASEBE_HOLDING_BUSINESS}
      />
    </div>
  )
}
