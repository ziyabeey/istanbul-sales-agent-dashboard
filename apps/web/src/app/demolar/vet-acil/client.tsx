// @ts-nocheck
'use client'

import { ThemeRenderer, VET_ACIL_CONFIG, VET_ACIL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={VET_ACIL_CONFIG}
        page={VET_ACIL_CONFIG.pages[0]}
        business={VET_ACIL_BUSINESS}
      />
    </div>
  )
}
