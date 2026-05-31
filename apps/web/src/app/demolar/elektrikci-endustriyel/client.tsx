// @ts-nocheck
'use client'

import { ThemeRenderer, ELEKTRIKCI_ENDUSTRIYEL_CONFIG, ELEKTRIKCI_ENDUSTRIYEL_BUSINESS } from '@kepenk/templates'

export default function ClientPage() {
  return (
    <div lang="tr">
      <ThemeRenderer
        theme={ELEKTRIKCI_ENDUSTRIYEL_CONFIG}
        page={ELEKTRIKCI_ENDUSTRIYEL_CONFIG.pages[0]}
        business={ELEKTRIKCI_ENDUSTRIYEL_BUSINESS}
      />
    </div>
  )
}
