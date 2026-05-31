// @ts-nocheck
'use client'

import { ThemeRenderer, MUHASEBE_DEFTER_CONFIG, MUHASEBE_DEFTER_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={MUHASEBE_DEFTER_CONFIG}
        page={MUHASEBE_DEFTER_CONFIG.pages[0]}
        business={MUHASEBE_DEFTER_BUSINESS}
      />
    </div>
  )
}
