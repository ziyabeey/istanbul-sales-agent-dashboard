import type { Metadata } from 'next'
import MakaleCard from '@/components/destek/MakaleCard'

export const metadata: Metadata = {
  title: 'Başlangıç Rehberi',
  description: 'KPNK platformuna ilk adımlar. Hesap oluşturma, paket seçimi, işletme bilgileri girme ve WhatsApp bağlantısı.',
  alternates: { canonical: 'https://destek.kepenk.ai/baslangic' },
}

const REHBERLER = [
  { baslik: 'İlk Kurulum Adımları', ozet: 'KPNK hesabınızı oluşturun ve ilk web sitenizi 5 dakikada kurun.', href: '/destek/baslangic/ilk-kurulum' },
  { baslik: 'Hangi Paket Bana Uygun?', ozet: 'İşletme büyüklüğüne göre doğru paketi seçmenize yardımcı oluyoruz.', href: '/destek/baslangic/paket-secimi' },
  { baslik: 'İşletme Bilgilerini Girme', ozet: 'İşletme adı, adres, telefon ve çalışma saatlerini nasıl girersiniz?', href: '/destek/baslangic/isletme-bilgileri' },
  { baslik: 'WhatsApp Bağlantısı', ozet: 'WhatsApp Business numaranızı KPNK ile bağlayın.', href: '/destek/baslangic/whatsapp-baglantisi' },
]

export default function BaslangicHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Başlangıç Rehberi</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        KPNK platformuna hoş geldiniz! Aşağıdaki rehberlerle platformu adım adım keşfedin ve işletmenizi dijitale taşıyın.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REHBERLER.map((r) => (
          <MakaleCard key={r.href} baslik={r.baslik} ozet={r.ozet} href={r.href} ikon="🚀" kategoriRenk="bg-emerald-100 text-emerald-700" />
        ))}
      </div>
    </div>
  )
}
