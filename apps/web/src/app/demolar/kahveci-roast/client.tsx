// @ts-nocheck
'use client'

import { ThemeRenderer, KAHVECI_ROAST_CONFIG, KAHVECI_ROAST_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={KAHVECI_ROAST_CONFIG}
        page={KAHVECI_ROAST_CONFIG.pages[0]}
        business={KAHVECI_ROAST_BUSINESS}
      />
    </div>
  )
}
