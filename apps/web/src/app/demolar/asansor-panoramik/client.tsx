// @ts-nocheck
'use client'
import { ThemeRenderer, ASANSOR_PANORAMIK_CONFIG, ASANSOR_PANORAMIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={ASANSOR_PANORAMIK_CONFIG} page={ASANSOR_PANORAMIK_CONFIG.pages[0]} business={ASANSOR_PANORAMIK_BUSINESS} />
    </div>
  )
}
