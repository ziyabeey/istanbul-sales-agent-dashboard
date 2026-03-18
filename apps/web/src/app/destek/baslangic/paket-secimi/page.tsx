import type { Metadata } from 'next'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Hangi Paket Bana Uygun?',
  description: 'KPNK paketlerini karşılaştırın ve işletmenize en uygun planı seçin. Temel, Standart, Büyüme, Premium ve Premium Plus.',
  alternates: { canonical: 'https://destek.kepenk.ai/baslangic/paket-secimi' },
  openGraph: { title: 'Hangi Paket Bana Uygun? — KPNK', description: 'İşletme büyüklüğüne göre doğru paketi seçin.', url: 'https://destek.kepenk.ai/baslangic/paket-secimi', type: 'article' },
}

export default function PaketSecimi() {
  const paketler = [
    { ad: 'TEMEL', fiyat: '₺999/ay', hedef: 'Yeni başlayan, tek kişilik işletmeler', ozellikler: ['Statik HTML site', '100 AI işlem/ay', 'İletişim formu', 'WhatsApp destek butonu', 'kepenk.ai subdomain'] },
    { ad: 'STANDART', fiyat: '₺1.799/ay', hedef: '1-3 çalışanlı büyüyen işletmeler', ozellikler: ['Statik HTML site', '250 AI işlem/ay', 'Müşteri CRM (temel)', 'Sosyal medya önerileri', 'Temel SEO optimizasyonu'] },
    { ad: 'BÜYÜME', fiyat: '₺2.999/ay', hedef: 'Aktif müşteri trafiği olan işletmeler', ozellikler: ['Next.js dinamik site', '750 AI işlem/ay', 'AI randevu & rezervasyon', 'WhatsApp otomasyonu', 'Ön ödeme (kapora) alma'] },
    { ad: 'PREMIUM', fiyat: '₺4.999/ay', hedef: 'Profesyonel ve çok şubeli işletmeler', ozellikler: ['3D & parallax animasyon', '2.000 AI işlem/ay', 'Hediye .com.tr domain', 'Google/Meta reklam asistanı', 'Kriz & yorum yönetimi'] },
    { ad: 'PREMIUM PLUS', fiyat: '₺7.499/ay', hedef: 'Kurumsal düzeyde dijitalleşme', ozellikler: ['Özel tasarım 3D matrix', '5.000 AI işlem/ay', 'Hediye .com veya .com.tr', 'Trendyol/Yemeksepeti entegre', 'Kişisel AI asistan (7/24)'] },
  ]

  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Hangi Paket Bana Uygun?</h1>
      <p className="text-lg text-muted-foreground mb-8">
        KPNK, her büyüklükteki işletme için uygun paketler sunar. İşletmenizin ihtiyaçlarına göre doğru paketi seçmenize yardımcı olalım.
      </p>

      <div className="space-y-6 mb-8">
        {paketler.map((p) => (
          <div key={p.ad} className="p-6 bg-white border border-gray-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h3 className="text-lg font-bold font-syne text-foreground">{p.ad}</h3>
              <span className="text-primary font-bold">{p.fiyat}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{p.hedef}</p>
            <ul className="space-y-1.5">
              {p.ozellikler.map((o) => (
                <li key={o} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span> {o}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <BilgiKutusu tip="tip" baslik="Paket Önerisi">
        Eğer müşterilerinizle WhatsApp üzerinden sık iletişim kuruyorsanız ve randevu alıyorsanız, Büyüme paketi ideal başlangıçtır. Yıllık ödemede %15 indirim uygulanır.
      </BilgiKutusu>

      <BilgiKutusu tip="info" baslik="Paket Değiştirme">
        İstediğiniz zaman paketinizi yükseltebilir veya düşürebilirsiniz. Yükseltmede fark ücreti alınır, düşürmede sonraki dönem geçerli olur.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'İlk Kurulum Adımları', href: '/destek/baslangic/ilk-kurulum' },
        { baslik: 'Paket Karşılaştırma Detayları', href: '/destek/paketler' },
        { baslik: 'Paket Yükseltme/Düşürme', href: '/destek/odeme-fatura/paket-degistirme' },
        { baslik: 'Ödeme Yöntemleri', href: '/destek/odeme-fatura/odeme-yontemleri' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Hangi KPNK Paketi Bana Uygun?',
        description: 'İşletme büyüklüğüne göre doğru KPNK paketini seçme rehberi.',
        url: 'https://destek.kepenk.ai/baslangic/paket-secimi',
      }) }} />
    </article>
  )
}
