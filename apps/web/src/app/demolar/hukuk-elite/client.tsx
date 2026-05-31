// @ts-nocheck
'use client'
import { ThemeRenderer, HUKUK_ELITE_CONFIG, HUKUK_ELITE_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={HUKUK_ELITE_CONFIG} page={HUKUK_ELITE_CONFIG.pages[0]} business={HUKUK_ELITE_BUSINESS} />
    </div>
  )
}
