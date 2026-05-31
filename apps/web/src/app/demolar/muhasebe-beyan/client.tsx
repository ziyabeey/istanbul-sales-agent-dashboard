// @ts-nocheck
'use client'

import { ThemeRenderer, MUHASEBE_BEYAN_CONFIG, MUHASEBE_BEYAN_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={MUHASEBE_BEYAN_CONFIG}
        page={MUHASEBE_BEYAN_CONFIG.pages[0]}
        business={MUHASEBE_BEYAN_BUSINESS}
      />
    </div>
  )
}
