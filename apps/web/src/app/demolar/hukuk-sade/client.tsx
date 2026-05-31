// @ts-nocheck
'use client'
import { ThemeRenderer, HUKUK_SADE_CONFIG, HUKUK_SADE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={HUKUK_SADE_CONFIG} page={HUKUK_SADE_CONFIG.pages[0]} business={HUKUK_SADE_BUSINESS} />
    </div>
  )
}
