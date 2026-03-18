import type { Metadata } from 'next'
import MakaleCard from '@/components/destek/MakaleCard'

export const metadata: Metadata = {
  title: 'Ödeme & Fatura',
  description: 'KPNK ödeme yöntemleri, fatura indirme ve paket değiştirme rehberleri.',
  alternates: { canonical: 'https://destek.kepenk.ai/odeme-fatura' },
}

const REHBERLER = [
  { baslik: 'Ödeme Yöntemleri', ozet: 'Kredi kartı, banka havalesi ve diğer ödeme seçenekleri.', href: '/destek/odeme-fatura/odeme-yontemleri' },
  { baslik: 'Fatura İndirme', ozet: 'Geçmiş faturalarınızı görüntüleyin ve PDF olarak indirin.', href: '/destek/odeme-fatura/fatura-indirme' },
  { baslik: 'Paket Yükseltme/Düşürme', ozet: 'Mevcut paketinizi değiştirmek için adım adım rehber.', href: '/destek/odeme-fatura/paket-degistirme' },
]

export default function OdemeFaturaHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Ödeme & Fatura</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">Ödeme işlemleri, fatura yönetimi ve paket değişiklikleri hakkında her şey.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REHBERLER.map((r) => (<MakaleCard key={r.href} baslik={r.baslik} ozet={r.ozet} href={r.href} ikon="💳" kategoriRenk="bg-rose-100 text-rose-700" />))}
      </div>
    </div>
  )
}
