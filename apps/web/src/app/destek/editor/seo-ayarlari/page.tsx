import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'SEO Başlık ve Açıklama Ayarları',
  description: 'KPNK editöründe sitenizin Google arama sonuçlarında nasıl görüneceğini ayarlayın. Meta başlık, açıklama ve SEO optimizasyonu.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/seo-ayarlari' },
  openGraph: {
    title: 'SEO Ayarları — KPNK Editör',
    description: 'Sitenizin Google arama sonuçlarındaki görünümünü kontrol edin.',
    url: 'https://destek.kepenk.ai/editor/seo-ayarlari',
    type: 'article',
  },
}

export default function SeoAyarlari() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        SEO Başlık ve Açıklama Ayarları
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        SEO (Arama Motoru Optimizasyonu) ayarları, sitenizin Google&apos;da nasıl göründüğünü belirler.
        Doğru başlık ve açıklama, potansiyel müşterilerin sitenize tıklama oranını önemli ölçüde artırır.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">SEO Ayarlarına Erişim</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Editörü açın', aciklama: 'Dashboard > Sitem > Editör yolunu izleyin.' },
          { baslik: 'Üst bardaki "SEO" butonuna tıklayın', aciklama: 'Editörün üst araç çubuğundaki arama motoru simgesiyle gösterilen "SEO" butonunu tıklayın.' },
          { baslik: 'Başlık ve açıklamayı düzenleyin', aciklama: 'SEO panelinde sayfa başlığı (title) ve meta açıklama (description) alanlarını göreceksiniz. Bu alanlar Google arama sonuçlarında görünecek metinlerdir.' },
        ]}
      />

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Etkili Başlık Yazma</h2>
      <p className="text-muted-foreground mb-4">
        Sayfa başlığı (title), Google arama sonuçlarında mavi bağlantı olarak görünen metindir.
        İyi bir başlık yazarken şu kurallara dikkat edin:
      </p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> <strong>60 karakter</strong> ile sınırlı tutun (uzun başlıklar kesilir)</li>
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> İşletme adınızı ve sektörünüzü ekleyin</li>
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Konum bilgisi ekleyin (ör. &quot;Kadıköy Berber&quot;)</li>
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Ana hizmetinizi belirtin</li>
      </ul>

      <BilgiKutusu tip="tip" baslik="Örnek Başlıklar">
        ✅ &quot;Ali Usta Berber — Kadıköy Erkek Kuaförü | Randevu Al&quot;<br />
        ✅ &quot;Lezzet Köşesi Restoran — Kadıköy | Online Sipariş&quot;<br />
        ❌ &quot;Hoş Geldiniz&quot; (çok genel, arama motorları için bilgi vermiyor)
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Meta Açıklama Yazma</h2>
      <p className="text-muted-foreground mb-4">
        Meta açıklama, Google arama sonuçlarında başlığın altında görünen kısa tanıtım metnidir.
        Müşterilerin sitenize tıklamasını sağlayan en önemli etkendir.
      </p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> <strong>155 karakter</strong> ile sınırlı tutun</li>
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Sunduğunuz hizmetleri kısaca belirtin</li>
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Harekete geçirici bir ifade ekleyin (&quot;Hemen randevu alın&quot;)</li>
        <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Benzersiz değer önerinizi vurgulayın</li>
      </ul>

      <BilgiKutusu tip="info" baslik="Otomatik SEO">
        KPNK, sitenizi ilk oluşturduğunda sektörünüze uygun SEO başlık ve açıklamayı otomatik olarak oluşturur.
        İsterseniz bunları istediğiniz zaman düzenleyebilirsiniz.
      </BilgiKutusu>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Temel SEO Bilgileri', href: '/destek/seo-rehberi/temel-seo' },
          { baslik: 'Google My Business', href: '/destek/seo-rehberi/google-my-business' },
          { baslik: 'Domain Bağlama', href: '/destek/editor/domain-baglama' },
          { baslik: 'Siteyi Yayınlama', href: '/destek/editor/yayinlama' },
        ]}
      />

      <SayfaDegerlendirme />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KPNK SEO Başlık ve Açıklama Ayarlama',
            description: 'Sitenizin Google arama sonuçlarındaki görünümünü kontrol edin.',
            step: [
              { '@type': 'HowToStep', name: 'Editörü açın', text: 'Dashboard > Sitem > Editör yolunu izleyin.' },
              { '@type': 'HowToStep', name: 'SEO butonuna tıklayın', text: 'Üst bardaki SEO butonunu tıklayın.' },
              { '@type': 'HowToStep', name: 'Başlık ve açıklamayı düzenleyin', text: 'Sayfa başlığı ve meta açıklamayı girin.' },
            ],
          }),
        }}
      />
    </article>
  )
}
