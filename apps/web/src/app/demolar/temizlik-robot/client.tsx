// @ts-nocheck
'use client'

import { ThemeRenderer, TEMIZLIK_ROBOT_CONFIG, TEMIZLIK_ROBOT_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TEMIZLIK_ROBOT_CONFIG}
        page={TEMIZLIK_ROBOT_CONFIG.pages[0]}
        business={TEMIZLIK_ROBOT_BUSINESS}
      />
    </div>
  )
}
