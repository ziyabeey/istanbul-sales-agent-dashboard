// @ts-nocheck
'use client'

import { ThemeRenderer, KAHVECI_SADE_CONFIG, KAHVECI_SADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={KAHVECI_SADE_CONFIG}
        page={KAHVECI_SADE_CONFIG.pages[0]}
        business={KAHVECI_SADE_BUSINESS}
      />
    </div>
  )
}
