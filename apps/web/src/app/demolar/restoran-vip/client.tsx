// @ts-nocheck
'use client'

import { ThemeRenderer, RESTORAN_VIP_CONFIG, RESTORAN_VIP_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={RESTORAN_VIP_CONFIG}
        page={RESTORAN_VIP_CONFIG.pages[0]}
        business={RESTORAN_VIP_BUSINESS}
      />
    </div>
  )
}
