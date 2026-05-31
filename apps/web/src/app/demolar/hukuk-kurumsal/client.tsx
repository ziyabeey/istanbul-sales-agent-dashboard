// @ts-nocheck
'use client'
import { ThemeRenderer, HUKUK_KURUMSAL_CONFIG, HUKUK_KURUMSAL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={HUKUK_KURUMSAL_CONFIG} page={HUKUK_KURUMSAL_CONFIG.pages[0]} business={HUKUK_KURUMSAL_BUSINESS} />
    </div>
  )
}
