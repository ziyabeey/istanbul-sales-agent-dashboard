import type { Metadata } from 'next'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'
import SikKarsilasilanSorunlar from '@/components/destek/SikKarsilasilanSorunlar'

export const metadata: Metadata = {
  title: 'Ödeme Yöntemleri',
  description: 'KPNK ödeme yöntemleri: kredi kartı, banka kartı, 3D Secure güvenli ödeme. iyzico altyapısı ile güvenli işlem.',
  alternates: { canonical: 'https://destek.kepenk.ai/odeme-fatura/odeme-yontemleri' },
  openGraph: { title: 'Ödeme Yöntemleri — KPNK', url: 'https://destek.kepenk.ai/odeme-fatura/odeme-yontemleri', type: 'article' },
}

export default function OdemeYontemleri() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Ödeme Yöntemleri</h1>
      <p className="text-lg text-muted-foreground mb-8">KPNK, iyzico altyapısı ile güvenli ödeme sunar. Tüm ödemeler 3D Secure ile korunur.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Kabul Edilen Ödeme Yöntemleri</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { ad: 'Kredi Kartı', aciklama: 'Visa, Mastercard, Troy — tüm bankalar desteklenir. 3D Secure ile güvenli ödeme.' },
          { ad: 'Banka Kartı (Debit)', aciklama: 'Banka kartınız ile doğrudan hesabınızdan ödeme yapabilirsiniz.' },
          { ad: 'Sanal Kart', aciklama: 'Bankanızın mobil uygulamasından oluşturduğunuz sanal kartlar desteklenir.' },
          { ad: 'Taksit', aciklama: 'Yıllık ödemelerde 2, 3 veya 6 taksit seçeneği mevcuttur (banka anlaşmalarına göre).' },
        ].map((y) => (
          <div key={y.ad} className="p-5 bg-gray-50 rounded-xl">
            <p className="font-semibold text-foreground mb-1">{y.ad}</p>
            <p className="text-muted-foreground text-sm">{y.aciklama}</p>
          </div>
        ))}
      </div>

      <BilgiKutusu tip="info" baslik="Güvenlik">
        Tüm ödeme işlemleri iyzico tarafından işlenir. Kart bilgileriniz KPNK sunucularında saklanmaz. iyzico, BDDK lisanslı bir ödeme kuruluşudur.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Ödeme Döngüsü</h2>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">•</span> <strong>Aylık ödeme:</strong> Her ay aynı tarihte kartınızdan otomatik çekim yapılır.</li>
        <li className="flex items-center gap-2"><span className="text-primary">•</span> <strong>Yıllık ödeme:</strong> 12 aylık tutar tek seferde alınır. %15 indirim uygulanır.</li>
        <li className="flex items-center gap-2"><span className="text-primary">•</span> <strong>Yenileme:</strong> Dönem sonunda otomatik yenilenir. İptal etmek isterseniz dönem bitiminden 3 gün önce bildirim yapmanız gerekir.</li>
      </ul>

      <BilgiKutusu tip="warning" baslik="Ödeme Başarısız Olursa">
        Kartınızda yeterli bakiye yoksa veya 3D Secure doğrulaması başarısız olursa ödeme alınamaz. 3 gün içinde tekrar denenir. 3 başarısız denemeden sonra hesabınız pasif duruma geçer.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Fatura İndirme', href: '/destek/odeme-fatura/fatura-indirme' },
        { baslik: 'Paket Değiştirme', href: '/destek/odeme-fatura/paket-degistirme' },
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
      ]} />
      <SikKarsilasilanSorunlar sorunIdleri={['odeme-basarisiz', 'kart-reddedildi', '3d-secure-zaman-asimi', 'odeme-basarili-site-yok']} />
      <SayfaDegerlendirme />
    </article>
  )
}
