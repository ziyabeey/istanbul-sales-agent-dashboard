import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Görsel Yükleme ve Düzenleme',
  description: 'KPNK editörüne fotoğraf yükleyin, boyutlandırın ve optimize edin. Unsplash entegrasyonu ile ücretsiz stok fotoğraflar.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/gorsel-yukleme' },
  openGraph: {
    title: 'Görsel Yükleme — KPNK Editör',
    description: 'Fotoğraf yükleyin, boyutlandırın ve optimize edin.',
    url: 'https://destek.kepenk.ai/editor/gorsel-yukleme',
    type: 'article',
  },
}

export default function GorselYukleme() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Görsel Yükleme ve Düzenleme
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Profesyonel görseller sitenizin etkisini katlayarak artırır. KPNK editörü ile kendi fotoğraflarınızı
        yükleyebilir veya Unsplash&apos;ın ücretsiz stok fotoğraf kütüphanesinden seçim yapabilirsiniz.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Görsel Yükleme</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Görsel bloğuna tıklayın', aciklama: 'Editörde herhangi bir görsel alanına (hero arka planı, galeri, logo vb.) tıklayın. Görsel yükleme paneli açılacaktır.' },
          { baslik: 'Dosya seçin veya sürükleyin', aciklama: '"Dosya Seç" butonuna tıklayarak bilgisayarınızdan fotoğraf seçin veya doğrudan editör üzerine sürükleyip bırakın.' },
          { baslik: 'Boyut ve konum ayarlayın', aciklama: 'Yüklenen görsel otomatik optimize edilir. İsterseniz kırpma aracıyla görselin hangi bölümünün gösterileceğini seçebilirsiniz.' },
        ]}
      />

      <BilgiKutusu tip="info" baslik="Desteklenen Formatlar">
        JPG, PNG, WebP ve SVG formatları desteklenir. Maksimum dosya boyutu 10 MB&apos;dır.
        Görseller otomatik olarak WebP formatına dönüştürülerek sayfa hızı optimize edilir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Unsplash Stok Fotoğraflar</h2>
      <p className="text-muted-foreground mb-4">
        Profesyonel fotoğrafınız yoksa endişelenmeyin. KPNK editörü Unsplash entegrasyonu ile
        milyonlarca ücretsiz, yüksek kaliteli stok fotoğrafa erişmenizi sağlar.
      </p>
      <AdimAdim
        adimlar={[
          { baslik: 'Görsel panelinde "Unsplash" sekmesine geçin', aciklama: 'Görsel yükleme panelinin üst kısmındaki "Unsplash" sekmesine tıklayın.' },
          { baslik: 'Anahtar kelime ile arayın', aciklama: '"berber dükkanı", "restoran yemek" gibi anahtar kelimeler girin. Türkçe ve İngilizce aramalar desteklenir.' },
          { baslik: 'Görseli seçin', aciklama: 'Beğendiğiniz görsele tıklayın. Otomatik olarak sitenize eklenecektir.' },
        ]}
      />

      <BilgiKutusu tip="tip" baslik="Görsel İpuçları">
        Kendi çektiğiniz orijinal fotoğraflar her zaman stok fotoğraflardan daha etkilidir.
        Müşterileriniz gerçek işletmenizi, gerçek çalışanlarınızı ve gerçek ürünlerinizi görmek ister.
        Mümkünse profesyonel fotoğraf çektirin veya iyi ışıkta telefonla çekin.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Görsel Optimizasyonu</h2>
      <p className="text-muted-foreground mb-4">
        KPNK, yüklediğiniz görselleri otomatik olarak optimize eder:
      </p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> WebP formatına otomatik dönüşüm (daha hızlı yükleme)</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Responsive boyutlandırma (mobil, tablet, masaüstü için farklı boyutlar)</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Lazy loading (sayfa açılışını hızlandırır)</li>
        <li className="flex items-center gap-2"><span className="text-primary">✓</span> CDN dağıtımı (dünyanın her yerinden hızlı erişim)</li>
      </ul>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
          { baslik: 'Tema ve Renk Değiştirme', href: '/destek/editor/tema-ve-renkler' },
          { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
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
            name: 'KPNK Editöre Görsel Yükleme',
            description: 'Fotoğraf yükleyin, boyutlandırın ve optimize edin.',
            step: [
              { '@type': 'HowToStep', name: 'Görsel bloğuna tıklayın', text: 'Editörde görsel alanına tıklayın.' },
              { '@type': 'HowToStep', name: 'Dosya seçin', text: 'Bilgisayardan seçin veya Unsplash kullanın.' },
              { '@type': 'HowToStep', name: 'Ayarlayın', text: 'Boyut ve konum ayarlayın.' },
            ],
          }),
        }}
      />
    </article>
  )
}
