// @ts-nocheck
'use client'

import { ThemeRenderer, KAHVECI_LOCAL_CONFIG, KAHVECI_LOCAL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={KAHVECI_LOCAL_CONFIG}
        page={KAHVECI_LOCAL_CONFIG.pages[0]}
        business={KAHVECI_LOCAL_BUSINESS}
      />
    </div>
  )
}
