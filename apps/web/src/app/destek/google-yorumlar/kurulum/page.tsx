import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Google Yorum Kurulumu',
  description: 'Google My Business hesabınızı KPNK ile bağlayın. Yorumlarınızı tek panelden takip edin ve yönetin.',
  alternates: { canonical: 'https://destek.kepenk.ai/google-yorumlar/kurulum' },
  openGraph: { title: 'Google Yorum Kurulumu — KPNK', description: 'GMB hesabınızı KPNK ile bağlayın.', url: 'https://destek.kepenk.ai/google-yorumlar/kurulum', type: 'article' },
}

export default function GoogleKurulum() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Google Yorum Kurulumu</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Google My Business (GMB) hesabınızı KPNK ile bağlayarak yorumlarınızı tek panelden takip edin, AI destekli yanıtlar verin ve müşteri memnuniyetinizi artırın.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Bağlantı Adımları</h2>
      <AdimAdim adimlar={[
        { baslik: 'Google My Business hesabınız olmalı', aciklama: 'Henüz yoksa business.google.com adresinden ücretsiz hesap oluşturun. İşletme adı, adres ve telefon bilgilerinizi girin.' },
        { baslik: 'Dashboard > Ayarlar > Google Yorumlar', aciklama: 'KPNK dashboard\'unda sol menüden Ayarlar > Google Yorumlar bölümüne gidin.' },
        { baslik: '"Google ile Bağlan" butonuna tıklayın', aciklama: 'Google hesabınız ile giriş yapın ve KPNK\'nın yorumlarınıza erişmesine izin verin.' },
        { baslik: 'İşletmenizi seçin', aciklama: 'Birden fazla GMB işletmeniz varsa KPNK ile bağlamak istediğinizi seçin.' },
        { baslik: 'Bağlantı tamamlandı', aciklama: 'Artık KPNK dashboard\'unda tüm Google yorumlarınızı görebilir ve yanıtlayabilirsiniz.' },
      ]} />

      <BilgiKutusu tip="info" baslik="Minimum Paket">
        Google Yorum yönetimi Standart paket ve üzerinde aktiftir. AI otomatik yanıtlama ise Premium ve Premium Plus paketlerinde kullanılabilir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Neden Google Yorumları Önemli?</h2>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Müşterilerin %93&apos;ü bir işletmeyi ziyaret etmeden önce Google yorumlarını okur</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> 4+ yıldız ortalaması, tıklama oranını %30 artırır</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Yorumlara yanıt veren işletmeler, vermeyenlere göre daha güvenilir algılanır</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Aktif yorum yönetimi, Google yerel sıralamalarında üst sıralara çıkmanızı sağlar</li>
      </ul>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Otomatik Yorum Yanıtlama', href: '/destek/google-yorumlar/otomatik-yanitlar' },
        { baslik: 'Google My Business Optimizasyonu', href: '/destek/seo-rehberi/google-my-business' },
        { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
      ]} />
      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'Google Yorumları KPNK ile Bağlama',
        description: 'Google My Business hesabınızı KPNK ile bağlayın.',
        step: [
          { '@type': 'HowToStep', name: 'GMB hesabı oluşturun', text: 'business.google.com adresinden hesap oluşturun.' },
          { '@type': 'HowToStep', name: 'Ayarlar sayfasına gidin', text: 'Dashboard > Ayarlar > Google Yorumlar.' },
          { '@type': 'HowToStep', name: 'Google ile bağlanın', text: 'Google hesabınızla giriş yapın.' },
          { '@type': 'HowToStep', name: 'İşletmenizi seçin', text: 'Bağlamak istediğiniz işletmeyi seçin.' },
        ],
      }) }} />
    </article>
  )
}
