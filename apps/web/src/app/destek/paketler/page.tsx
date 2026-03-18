import type { Metadata } from 'next'
import Link from 'next/link'
import { PAKETLER } from '@/data/paketler'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Paket Karşılaştırma',
  description: 'KPNK paketlerini detaylı karşılaştırın. Temel, Standart, Büyüme, Premium ve Premium Plus — fiyat, özellik ve AI kredi karşılaştırması.',
  alternates: { canonical: 'https://destek.kepenk.ai/paketler' },
}

export default function PaketlerHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Paket Karşılaştırma</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        İşletmenize en uygun KPNK paketini seçin. Tüm paketlerin detaylı özellik, fiyat ve AI kredi karşılaştırması.
      </p>

      <div className="space-y-4 mb-8">
        {PAKETLER.map((p) => (
          <Link
            key={p.id}
            href={`/destek/paketler/${p.id}`}
            className="group block p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h2 className="text-xl font-bold font-syne text-foreground group-hover:text-primary transition-colors">{p.name}</h2>
              <div className="text-right">
                <p className="text-primary font-bold text-lg">₺{p.aylikFiyat.toLocaleString('tr-TR')}<span className="text-sm font-normal text-muted-foreground">/ay</span></p>
                <p className="text-xs text-muted-foreground">Yıllık: ₺{p.yillikFiyatAylik.toLocaleString('tr-TR')}/ay</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{p.teknoloji} · {p.aiKredi}</p>
            <div className="flex flex-wrap gap-2">
              {p.ozellikler.map((o) => (
                <span key={o} className="inline-flex items-center gap-1 text-xs text-foreground bg-gray-50 px-2 py-1 rounded-md">
                  <span className="text-primary">✓</span> {o}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <BilgiKutusu tip="tip" baslik="Yıllık Ödeme Avantajı">
        Tüm paketlerde yıllık ödeme seçeneğinde %15 indirim uygulanır. Yıllık ödemede toplam tasarrufunuz ₺1.800 ile ₺13.500 arasında değişir.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Hangi Paket Bana Uygun?', href: '/destek/baslangic/paket-secimi' },
        { baslik: 'Paket Yükseltme/Düşürme', href: '/destek/odeme-fatura/paket-degistirme' },
        { baslik: 'Ödeme Yöntemleri', href: '/destek/odeme-fatura/odeme-yontemleri' },
      ]} />
      <SayfaDegerlendirme />
    </div>
  )
}
