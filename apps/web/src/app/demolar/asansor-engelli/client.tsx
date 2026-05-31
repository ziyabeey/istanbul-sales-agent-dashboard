// @ts-nocheck
'use client'
import { ThemeRenderer, ASANSOR_ENGELLI_CONFIG, ASANSOR_ENGELLI_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={ASANSOR_ENGELLI_CONFIG} page={ASANSOR_ENGELLI_CONFIG.pages[0]} business={ASANSOR_ENGELLI_BUSINESS} />
    </div>
  )
}
