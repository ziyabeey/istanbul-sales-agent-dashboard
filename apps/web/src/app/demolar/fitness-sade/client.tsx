// @ts-nocheck
'use client'

import { ThemeRenderer, FITNESS_SADE_CONFIG, FITNESS_SADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FITNESS_SADE_CONFIG}
        page={FITNESS_SADE_CONFIG.pages[0]}
        business={FITNESS_SADE_BUSINESS}
      />
    </div>
  )
}
