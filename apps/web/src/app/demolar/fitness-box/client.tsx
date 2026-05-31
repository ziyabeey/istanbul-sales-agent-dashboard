// @ts-nocheck
'use client'

import { ThemeRenderer, FITNESS_BOX_CONFIG, FITNESS_BOX_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={FITNESS_BOX_CONFIG}
        page={FITNESS_BOX_CONFIG.pages[0]}
        business={FITNESS_BOX_BUSINESS}
      />
    </div>
  )
}
