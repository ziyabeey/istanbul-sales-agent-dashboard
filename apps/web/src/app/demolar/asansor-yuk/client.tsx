// @ts-nocheck
'use client'
import { ThemeRenderer, ASANSOR_YUK_CONFIG, ASANSOR_YUK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={ASANSOR_YUK_CONFIG} page={ASANSOR_YUK_CONFIG.pages[0]} business={ASANSOR_YUK_BUSINESS} />
    </div>
  )
}
