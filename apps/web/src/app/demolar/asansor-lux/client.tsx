// @ts-nocheck
'use client'
import { ThemeRenderer, ASANSOR_LUX_CONFIG, ASANSOR_LUX_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={ASANSOR_LUX_CONFIG} page={ASANSOR_LUX_CONFIG.pages[0]} business={ASANSOR_LUX_BUSINESS} />
    </div>
  )
}
