// @ts-nocheck
'use client'

import { ThemeRenderer, PASTANE_BUTIK_CONFIG, PASTANE_BUTIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={PASTANE_BUTIK_CONFIG}
        page={PASTANE_BUTIK_CONFIG.pages[0]}
        business={PASTANE_BUTIK_BUSINESS}
      />
    </div>
  )
}
