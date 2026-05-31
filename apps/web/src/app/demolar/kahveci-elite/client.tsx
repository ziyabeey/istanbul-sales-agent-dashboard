// @ts-nocheck
'use client'

import { ThemeRenderer, KAHVECI_ELITE_CONFIG, KAHVECI_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={KAHVECI_ELITE_CONFIG}
        page={KAHVECI_ELITE_CONFIG.pages[0]}
        business={KAHVECI_ELITE_BUSINESS}
      />
    </div>
  )
}
