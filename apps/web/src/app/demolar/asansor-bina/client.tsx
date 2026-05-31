// @ts-nocheck
'use client'
import { ThemeRenderer, ASANSOR_BINA_CONFIG, ASANSOR_BINA_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={ASANSOR_BINA_CONFIG} page={ASANSOR_BINA_CONFIG.pages[0]} business={ASANSOR_BINA_BUSINESS} />
    </div>
  )
}
