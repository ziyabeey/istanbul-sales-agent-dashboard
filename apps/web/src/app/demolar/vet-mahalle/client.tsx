// @ts-nocheck
'use client'

import { ThemeRenderer, VET_MAHALLE_CONFIG, VET_MAHALLE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={VET_MAHALLE_CONFIG}
        page={VET_MAHALLE_CONFIG.pages[0]}
        business={VET_MAHALLE_BUSINESS}
      />
    </div>
  )
}
