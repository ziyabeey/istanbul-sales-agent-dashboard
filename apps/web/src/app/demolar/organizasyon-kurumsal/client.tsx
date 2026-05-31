// @ts-nocheck
'use client'

import { ThemeRenderer, ORGANIZASYON_KURUMSAL_CONFIG, ORGANIZASYON_KURUMSAL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ORGANIZASYON_KURUMSAL_CONFIG}
        page={ORGANIZASYON_KURUMSAL_CONFIG.pages[0]}
        business={ORGANIZASYON_KURUMSAL_BUSINESS}
      />
    </div>
  )
}
