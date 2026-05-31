// @ts-nocheck
'use client'

import { ThemeRenderer, KAHVECI_BLEND_CONFIG, KAHVECI_BLEND_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={KAHVECI_BLEND_CONFIG}
        page={KAHVECI_BLEND_CONFIG.pages[0]}
        business={KAHVECI_BLEND_BUSINESS}
      />
    </div>
  )
}
