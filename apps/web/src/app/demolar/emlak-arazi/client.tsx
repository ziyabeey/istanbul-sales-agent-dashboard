// @ts-nocheck
'use client'

import { ThemeRenderer, EMLAK_ARAZI_CONFIG, EMLAK_ARAZI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={EMLAK_ARAZI_CONFIG}
        page={EMLAK_ARAZI_CONFIG.pages[0]}
        business={EMLAK_ARAZI_BUSINESS}
      />
    </div>
  )
}
