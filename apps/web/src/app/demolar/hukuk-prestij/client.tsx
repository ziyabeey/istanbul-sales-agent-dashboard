// @ts-nocheck
'use client'
import { ThemeRenderer, HUKUK_PRESTIJ_CONFIG, HUKUK_PRESTIJ_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={HUKUK_PRESTIJ_CONFIG} page={HUKUK_PRESTIJ_CONFIG.pages[0]} business={HUKUK_PRESTIJ_BUSINESS} />
    </div>
  )
}
