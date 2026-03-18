import type { Metadata } from 'next'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Temel SEO Bilgileri',
  description: 'Küçük işletmeler için arama motoru optimizasyonu (SEO) temelleri. Google sıralamanızı artırmanın pratik yolları.',
  alternates: { canonical: 'https://destek.kepenk.ai/seo-rehberi/temel-seo' },
  openGraph: { title: 'Temel SEO — KPNK', url: 'https://destek.kepenk.ai/seo-rehberi/temel-seo', type: 'article' },
}

export default function TemelSeo() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Temel SEO Bilgileri</h1>
      <p className="text-lg text-muted-foreground mb-8">SEO (Arama Motoru Optimizasyonu), web sitenizin Google arama sonuçlarında üst sıralarda görünmesini sağlayan tekniklerdir. İşte esnaflar için en önemli SEO temelleri.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">1. Doğru Başlık ve Açıklama</h2>
      <p className="text-muted-foreground mb-4">Her sayfanızın benzersiz bir başlığı (title) ve açıklaması (meta description) olmalıdır. KPNK bunu sektörünüze göre otomatik oluşturur, ancak özelleştirmeniz önerilir.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">2. Mobil Uyumluluk</h2>
      <p className="text-muted-foreground mb-4">Google, mobil uyumlu siteleri önceliklendirir. KPNK ile oluşturulan tüm siteler otomatik olarak mobil uyumludur — ekstra bir işlem yapmanız gerekmez.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">3. Sayfa Hızı</h2>
      <p className="text-muted-foreground mb-4">Hızlı yüklenen siteler hem Google hem de kullanıcılar tarafından tercih edilir. KPNK siteleri CDN altyapısı ve otomatik görsel optimizasyonu ile yüksek hız sunar.</p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">4. Yerel SEO</h2>
      <p className="text-muted-foreground mb-4">Esnaflar için en önemli SEO türü yerel SEO&apos;dur. &quot;Yakınımdaki berber&quot;, &quot;Kadıköy elektrikçi&quot; gibi aramalarda görünmek için:</p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Google My Business profilinizi optimize edin</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> NAP bilgilerinizi (İsim, Adres, Telefon) tutarlı tutun</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Müşteri yorumları toplayın ve yanıtlayın</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Sitenizde hizmet bölgenizi belirtin</li>
      </ul>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">5. İçerik Kalitesi</h2>
      <p className="text-muted-foreground mb-4">Google, faydalı ve özgün içerikleri ödüllendirir. Hizmetlerinizi detaylı açıklayın, sık sorulan soruları yanıtlayın ve blog yazıları paylaşın.</p>

      <BilgiKutusu tip="tip" baslik="KPNK SEO Avantajı">
        KPNK, sitenizi oluştururken otomatik SEO optimizasyonu yapar: doğru HTML yapısı, hızlı yükleme, mobil uyumluluk, sitemap oluşturma ve yapılandırılmış veri (JSON-LD) ekleme. Siz sadece içeriğinizi güncel tutun.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Google My Business', href: '/destek/seo-rehberi/google-my-business' },
        { baslik: 'SEO Başlık Ayarları', href: '/destek/editor/seo-ayarlari' },
        { baslik: 'Google Yorum Kurulumu', href: '/destek/google-yorumlar/kurulum' },
      ]} />
      <SayfaDegerlendirme />
    </article>
  )
}
