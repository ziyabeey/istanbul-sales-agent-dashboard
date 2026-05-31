// @ts-nocheck
'use client'

import { ThemeRenderer, MUHASEBE_BILANCO_CONFIG, MUHASEBE_BILANCO_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={MUHASEBE_BILANCO_CONFIG}
        page={MUHASEBE_BILANCO_CONFIG.pages[0]}
        business={MUHASEBE_BILANCO_BUSINESS}
      />
    </div>
  )
}
