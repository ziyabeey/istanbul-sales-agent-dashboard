import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'
import SikKarsilasilanSorunlar from '@/components/destek/SikKarsilasilanSorunlar'

export const metadata: Metadata = {
  title: 'Siteyi Yayınlama',
  description: 'KPNK sitenizi tek tıkla yayına alın. Yayınlama süreci, güncelleme ve versiyon yönetimi rehberi.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/yayinlama' },
  openGraph: {
    title: 'Siteyi Yayınlama — KPNK',
    description: 'Sitenizi tek tıkla yayına alın ve güncellemeleri anında uygulayın.',
    url: 'https://destek.kepenk.ai/editor/yayinlama',
    type: 'article',
  },
}

export default function Yayinlama() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Siteyi Yayınlama
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Editörde yaptığınız tüm değişiklikleri tek tıkla canlıya alın.
        KPNK&apos;nın global CDN ağı sayesinde siteniz saniyeler içinde güncellenir ve
        dünyanın her yerinden hızlı erişilebilir olur.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">İlk Yayınlama</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Editörde değişikliklerinizi tamamlayın', aciklama: 'İçerik, görseller, renkler ve blok düzenini kontrol edin. Mobil önizleme ile mobil görünümü de doğrulayın.' },
          { baslik: 'Üst bardaki "Yayınla" butonuna tıklayın', aciklama: 'Yeşil "Yayınla" butonu editörün sağ üst köşesinde yer alır. Bu buton sadece kaydedilmemiş değişiklik varken aktiftir.' },
          { baslik: 'Yayınlama onayını verin', aciklama: 'Açılan pencerede değişikliklerin özetini göreceksiniz. "Evet, Yayınla" butonuna tıklayarak işlemi onaylayın.' },
          { baslik: 'Siteniz canlıda!', aciklama: 'Yayınlama genellikle 5-15 saniye sürer. Tamamlandığında sitenizin canlı bağlantısını göreceksiniz.' },
        ]}
      />

      <BilgiKutusu tip="tip" baslik="Hızlı Yayınlama">
        Ctrl+Shift+P (Windows) veya Cmd+Shift+P (Mac) kısayolu ile yayınlama işlemini doğrudan başlatabilirsiniz.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Güncelleme Yayınlama</h2>
      <p className="text-muted-foreground mb-4">
        İlk yayınlama sonrasında her değişikliğiniz taslak olarak kaydedilir. Canlı siteyi güncellemek için
        tekrar &quot;Yayınla&quot; butonuna tıklamanız yeterlidir. Ziyaretçiler değişiklikleri anında görürler.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Versiyon Geçmişi</h2>
      <p className="text-muted-foreground mb-4">
        KPNK her yayınlama işleminde sitenizin bir versiyonunu saklar. Bir hata yaptıysanız veya
        önceki tasarıma dönmek isterseniz, versiyon geçmişinden eski bir versiyona geri dönebilirsiniz.
      </p>
      <AdimAdim
        adimlar={[
          { baslik: 'Dashboard > Sitem sayfasına gidin', aciklama: 'Ana dashboard menüsünden Sitem sekmesini açın.' },
          { baslik: '"Versiyon Geçmişi" bölümünü bulun', aciklama: 'Sayfa altında yayınlama geçmişinizi gösteren bir tablo göreceksiniz.' },
          { baslik: 'Geri dönmek istediğiniz versiyonu seçin', aciklama: '"Geri Yükle" butonuna tıklayarak o versiyonu aktif edin. Mevcut site otomatik olarak eski versiyonla değiştirilir.' },
        ]}
      />

      <BilgiKutusu tip="warning" baslik="Versiyon Limiti">
        Temel ve Standart paketlerde son 5 versiyon saklanır. Büyüme ve üzeri paketlerde son 20 versiyon saklanır.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Yayınlama Kontrol Listesi</h2>
      <p className="text-muted-foreground mb-2">Yayınlamadan önce şunları kontrol edin:</p>
      <ul className="space-y-2 text-muted-foreground mb-6">
        <li className="flex items-center gap-2"><span className="text-primary">☐</span> Tüm metinlerde yazım hatası yok</li>
        <li className="flex items-center gap-2"><span className="text-primary">☐</span> Telefon numarası ve adres doğru</li>
        <li className="flex items-center gap-2"><span className="text-primary">☐</span> Görseller düzgün yükleniyor</li>
        <li className="flex items-center gap-2"><span className="text-primary">☐</span> Mobil görünüm kontrol edildi</li>
        <li className="flex items-center gap-2"><span className="text-primary">☐</span> SEO başlık ve açıklaması girildi</li>
        <li className="flex items-center gap-2"><span className="text-primary">☐</span> WhatsApp butonu çalışıyor</li>
      </ul>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
          { baslik: 'Domain Bağlama', href: '/destek/editor/domain-baglama' },
          { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
          { baslik: 'İlk Kurulum', href: '/destek/baslangic/ilk-kurulum' },
        ]}
      />

      <SikKarsilasilanSorunlar sorunIdleri={['yayinlama-hatasi', 'uretim-devam-ediyor', 'eski-icerik']} />
      <SayfaDegerlendirme />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KPNK Sitenizi Yayınlama',
            description: 'Sitenizi tek tıkla yayına alın.',
            step: [
              { '@type': 'HowToStep', name: 'Değişiklikleri tamamlayın', text: 'Editörde düzenlemelerinizi tamamlayın.' },
              { '@type': 'HowToStep', name: 'Yayınla butonuna tıklayın', text: 'Sağ üst köşedeki Yayınla butonunu tıklayın.' },
              { '@type': 'HowToStep', name: 'Onaylayın', text: 'Değişikliklerin özetini kontrol edip onaylayın.' },
            ],
          }),
        }}
      />
    </article>
  )
}
