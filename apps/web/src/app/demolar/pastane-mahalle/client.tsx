// @ts-nocheck
'use client'

import { ThemeRenderer, PASTANE_MAHALLE_CONFIG, PASTANE_MAHALLE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={PASTANE_MAHALLE_CONFIG}
        page={PASTANE_MAHALLE_CONFIG.pages[0]}
        business={PASTANE_MAHALLE_BUSINESS}
      />
    </div>
  )
}
