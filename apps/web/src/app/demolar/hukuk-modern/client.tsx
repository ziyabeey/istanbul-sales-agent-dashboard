// @ts-nocheck
'use client'
import { ThemeRenderer, HUKUK_MODERN_CONFIG, HUKUK_MODERN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={HUKUK_MODERN_CONFIG} page={HUKUK_MODERN_CONFIG.pages[0]} business={HUKUK_MODERN_BUSINESS} />
    </div>
  )
}
