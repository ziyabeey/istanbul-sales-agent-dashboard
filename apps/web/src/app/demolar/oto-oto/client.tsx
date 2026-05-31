// @ts-nocheck
'use client'

import { ThemeRenderer, OTO_VIP_CONFIG, OTO_VIP_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={OTO_VIP_CONFIG}
        page={OTO_VIP_CONFIG.pages[0]}
        business={OTO_VIP_BUSINESS}
      />
    </div>
  )
}
