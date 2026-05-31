// @ts-nocheck
'use client'
import { ThemeRenderer, OTO_DINAMIK_CONFIG, OTO_DINAMIK_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer theme={OTO_DINAMIK_CONFIG} page={OTO_DINAMIK_CONFIG.pages[0]} business={OTO_DINAMIK_BUSINESS} />
    </div>
  )
}
