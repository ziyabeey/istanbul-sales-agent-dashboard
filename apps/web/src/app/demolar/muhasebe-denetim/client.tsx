// @ts-nocheck
'use client'

import { ThemeRenderer, MUHASEBE_DENETIM_CONFIG, MUHASEBE_DENETIM_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={MUHASEBE_DENETIM_CONFIG}
        page={MUHASEBE_DENETIM_CONFIG.pages[0]}
        business={MUHASEBE_DENETIM_BUSINESS}
      />
    </div>
  )
}
