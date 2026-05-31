// @ts-nocheck
'use client'

import { ThemeRenderer, FITNESS_PREMIUM_CONFIG, FITNESS_PREMIUM_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FITNESS_PREMIUM_CONFIG}
        page={FITNESS_PREMIUM_CONFIG.pages[0]}
        business={FITNESS_PREMIUM_BUSINESS}
      />
    </div>
  )
}
