import type { Metadata } from 'next'
import TalepTakipFormu from '@/components/destek/TalepTakipFormu'

export const metadata: Metadata = {
  title: 'Talep Takip | KPNK Destek',
  description: 'Destek talebinizin durumunu referans numaranızla takip edin.',
  alternates: { canonical: 'https://destek.kepenk.ai/talep/takip' },
}

export default function TalepTakipSayfasi() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-syne text-foreground mb-2">Talep Takip</h1>
        <p className="text-muted-foreground">
          Referans numaranızı girerek destek talebinizin durumunu görüntüleyin.
        </p>
      </div>
      <TalepTakipFormu />
    </div>
  )
}
