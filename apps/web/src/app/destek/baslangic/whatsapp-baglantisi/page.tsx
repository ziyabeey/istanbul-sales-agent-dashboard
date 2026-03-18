import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'WhatsApp Bağlantısı',
  description: 'WhatsApp Business numaranızı KPNK platformuyla bağlayın ve AI asistan ile müşterilerinize 7/24 yanıt verin.',
  alternates: { canonical: 'https://destek.kepenk.ai/baslangic/whatsapp-baglantisi' },
  openGraph: { title: 'WhatsApp Bağlantısı — KPNK', description: 'WhatsApp AI asistanınızı bağlayın.', url: 'https://destek.kepenk.ai/baslangic/whatsapp-baglantisi', type: 'article' },
}

export default function WhatsAppBaglantisi() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">WhatsApp Bağlantısı</h1>
      <p className="text-lg text-muted-foreground mb-8">
        WhatsApp Business numaranızı KPNK ile bağlayarak AI asistanınızın müşteri mesajlarına otomatik yanıt vermesini sağlayın. Randevu alma, fiyat bilgisi verme ve müşteri sorularını cevaplama — hepsi otomatik.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Bağlantı Adımları</h2>
      <AdimAdim adimlar={[
        { baslik: 'WhatsApp Business uygulamasını kurun', aciklama: 'Henüz yoksa App Store veya Google Play\'den WhatsApp Business uygulamasını indirin ve işletme numaranızla kayıt olun.' },
        { baslik: 'KPNK kayıt sırasında numaranızı girin', aciklama: 'Kayıt formunda WhatsApp Business numaranızı girin. Bu numara doğrulama için kullanılır.' },
        { baslik: 'Doğrulama kodunu girin', aciklama: 'WhatsApp\'a gelen 6 haneli kodu KPNK kayıt formuna girin. Bağlantı otomatik kurulur.' },
        { baslik: 'AI asistanı test edin', aciklama: 'Bağlantı kurulduktan sonra kendi numaranızdan işletme numaranıza bir mesaj gönderin. AI asistanın yanıt verdiğini doğrulayın.' },
      ]} />

      <BilgiKutusu tip="warning" baslik="Önemli">
        WhatsApp Business API entegrasyonu Büyüme paketi ve üzeri paketlerde aktiftir. Temel ve Standart paketlerde sadece WhatsApp butonu (wa.me linki) kullanılabilir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">WhatsApp Business vs Normal WhatsApp</h2>
      <p className="text-muted-foreground mb-4">
        KPNK, WhatsApp Business hesabınızla çalışır. Normal WhatsApp hesabı ile bağlantı kurulamaz. WhatsApp Business&apos;ın avantajları:
      </p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> İşletme profili (adres, saat, web sitesi)</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Otomatik karşılama mesajı</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Hızlı yanıt şablonları</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Katalog özelliği</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> İstatistikler ve analiz</li>
      </ul>

      <BilgiKutusu tip="tip" baslik="Numara Taşıma">
        Mevcut kişisel WhatsApp numaranızı WhatsApp Business&apos;a taşıyabilirsiniz. Ancak ayrı bir numara kullanmanızı öneririz — böylece kişisel ve iş mesajlarınız karışmaz.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'WhatsApp AI Kurulumu', href: '/destek/whatsapp/kurulum' },
        { baslik: 'Otomatik Yanıt Ayarları', href: '/destek/whatsapp/otomatik-yanitlar' },
        { baslik: 'İlk Kurulum Adımları', href: '/destek/baslangic/ilk-kurulum' },
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'KPNK WhatsApp Bağlantısı Kurma',
        description: 'WhatsApp Business numaranızı KPNK ile bağlayın.',
        step: [
          { '@type': 'HowToStep', name: 'WhatsApp Business kurun', text: 'Uygulamayı indirin ve kayıt olun.' },
          { '@type': 'HowToStep', name: 'Numaranızı girin', text: 'KPNK kayıt formunda numaranızı girin.' },
          { '@type': 'HowToStep', name: 'Doğrulama kodu', text: '6 haneli kodu girin.' },
          { '@type': 'HowToStep', name: 'Test edin', text: 'AI asistanı test mesajıyla doğrulayın.' },
        ],
      }) }} />
    </article>
  )
}
