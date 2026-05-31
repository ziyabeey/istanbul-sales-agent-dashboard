// @ts-nocheck
'use client'

import { ThemeRenderer, TEMIZLIK_KURUMSAL_CONFIG, TEMIZLIK_KURUMSAL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={TEMIZLIK_KURUMSAL_CONFIG}
        page={TEMIZLIK_KURUMSAL_CONFIG.pages[0]}
        business={TEMIZLIK_KURUMSAL_BUSINESS}
      />
    </div>
  )
}
