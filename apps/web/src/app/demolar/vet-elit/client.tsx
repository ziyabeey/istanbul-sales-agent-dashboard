// @ts-nocheck
'use client'

import { ThemeRenderer, VET_ELIT_CONFIG, VET_ELIT_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={VET_ELIT_CONFIG}
        page={VET_ELIT_CONFIG.pages[0]}
        business={VET_ELIT_BUSINESS}
      />
    </div>
  )
}
