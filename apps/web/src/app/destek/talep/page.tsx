import type { Metadata } from 'next'
import TalepFormu from '@/components/destek/TalepFormu'

export const metadata: Metadata = {
  title: 'Destek Talebi Oluştur | KPNK Destek',
  description: 'KPNK destek ekibine ulaşın. Sorununuzu bildirin, en kısa sürede dönüş yapalım.',
  alternates: { canonical: 'https://destek.kepenk.ai/talep' },
}

export default function TalepSayfasi() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold font-syne text-foreground mb-2">Destek Talebi Oluştur</h1>
      <p className="text-muted-foreground mb-8">
        Sorununuzu aşağıdaki formu doldurarak bize bildirin. En kısa sürede dönüş yapacağız.
      </p>
      <TalepFormu />
    </div>
  )
}
