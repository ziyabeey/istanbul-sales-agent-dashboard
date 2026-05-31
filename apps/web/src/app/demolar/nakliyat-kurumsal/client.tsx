// @ts-nocheck
'use client'

import { ThemeRenderer, NAKLIYAT_KURUMSAL_CONFIG, NAKLIYAT_KURUMSAL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={NAKLIYAT_KURUMSAL_CONFIG}
        page={NAKLIYAT_KURUMSAL_CONFIG.pages[0]}
        business={NAKLIYAT_KURUMSAL_BUSINESS}
      />
    </div>
  )
}
