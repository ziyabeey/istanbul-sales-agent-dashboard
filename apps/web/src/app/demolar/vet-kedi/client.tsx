// @ts-nocheck
'use client'

import { ThemeRenderer, VET_KEDI_CONFIG, VET_KEDI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={VET_KEDI_CONFIG}
        page={VET_KEDI_CONFIG.pages[0]}
        business={VET_KEDI_BUSINESS}
      />
    </div>
  )
}
