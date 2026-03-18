import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Editör Nasıl Kullanılır?',
  description: 'KPNK sürükle-bırak editörü ile web sitenizi kolayca düzenleyin. Adım adım kullanım kılavuzu.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/kullanim-kilavuzu' },
  openGraph: {
    title: 'KPNK Editör Nasıl Kullanılır?',
    description: 'Web sitenizi kod yazmadan düzenleyin — sürükle-bırak editör rehberi.',
    url: 'https://destek.kepenk.ai/editor/kullanim-kilavuzu',
    type: 'article',
  },
}

export default function EditorKullanimKilavuzu() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Editör Nasıl Kullanılır?
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        KPNK editörü, web sitenizi kod yazmadan düzenlemenizi sağlayan güçlü bir sürükle-bırak aracıdır.
        Bu rehberde editörün temel özelliklerini adım adım öğreneceksiniz.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Editöre Nasıl Ulaşılır?</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Dashboard\'a giriş yapın', aciklama: 'kepenk.ai/giris adresinden telefon numaranız ile giriş yapın. Doğrulama kodu WhatsApp\'a gelecektir.' },
          { baslik: 'Sol menüden "Sitem" sekmesine tıklayın', aciklama: 'Dashboard\'un sol menüsünde "Sitem" başlığını bulun ve tıklayın. Editör, modüller ve domain yönetimi bu bölümde yer alır.' },
          { baslik: '"Editör" butonuna tıklayın', aciklama: 'Sitem sayfasındaki "Editörü Aç" butonuna tıklayarak görsel düzenleyiciye geçin. Editör yeni bir sayfada açılacaktır.' },
        ]}
      />

      <BilgiKutusu tip="tip" baslik="Hızlı Erişim">
        Editöre doğrudan <strong>edit.kepenk.ai</strong> adresinden de ulaşabilirsiniz. Giriş yaptıktan sonra otomatik olarak editör sayfasına yönlendirilirsiniz.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Editör Arayüzü</h2>
      <p className="text-muted-foreground mb-4">
        Editör açıldığında üç ana bölüm göreceksiniz:
      </p>
      <ul className="space-y-3 mb-6">
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
          <div>
            <span className="font-semibold text-foreground">Sol Panel (Bileşenler)</span>
            <span className="text-muted-foreground"> — Sitenize ekleyebileceğiniz bloklar: Hero, Hizmetler, Galeri, İletişim ve daha fazlası. Sürükleyip bırakarak sayfanıza ekleyin.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
          <div>
            <span className="font-semibold text-foreground">Orta Alan (Canlı Önizleme)</span>
            <span className="text-muted-foreground"> — Sitenizin gerçek zamanlı görünümü. Blokların üzerine tıklayarak içeriklerini düzenleyebilirsiniz.</span>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
          <div>
            <span className="font-semibold text-foreground">Üst Bar (Araçlar)</span>
            <span className="text-muted-foreground"> — Geri al/ileri al, cihaz önizleme (mobil/tablet/masaüstü), kaydet ve yayınla butonları burada yer alır.</span>
          </div>
        </li>
      </ul>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Temel İşlemler</h2>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Metin Düzenleme</h3>
      <p className="text-muted-foreground mb-4">
        Herhangi bir metin blokunun üzerine tıklayın. Metin düzenleme modu aktif olacak ve yazıyı doğrudan değiştirebilirsiniz.
        Kalın, italik, bağlantı ekleme gibi biçimlendirme seçenekleri üst araç çubuğunda görünecektir.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Blok Sırasını Değiştirme</h3>
      <p className="text-muted-foreground mb-4">
        Bir bloğun sol kenarındaki tutma noktasına (⠿) basılı tutun ve yukarı veya aşağı sürükleyin.
        Blok yeni konumuna yerleşecektir. Bu işlem geri alınabilir (Ctrl+Z).
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">AI ile Düzenleme</h3>
      <p className="text-muted-foreground mb-4">
        Editörün üst barındaki AI butonuna tıklayarak yapay zeka desteğini aktifleştirin.
        &quot;Bu bölümü daha profesyonel yaz&quot; veya &quot;Hizmetlerime uygun bir açıklama oluştur&quot; gibi komutlar vererek
        içeriklerinizi saniyeler içinde iyileştirebilirsiniz.
      </p>

      <BilgiKutusu tip="info" baslik="AI Kredi Kullanımı">
        AI düzenleme her kullanımda paketinize dahil işlem kredisi harcar.
        Kalan kredinizi Dashboard &gt; Profil sayfasından takip edebilirsiniz.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Kaydetme ve Yayınlama</h2>
      <p className="text-muted-foreground mb-4">
        Yaptığınız değişiklikler otomatik olarak taslak olarak kaydedilir.
        Değişikliklerinizi canlıya almak için üst bardaki <strong>&quot;Yayınla&quot;</strong> butonuna tıklayın.
        Yayınlama işlemi genellikle birkaç saniye sürer ve siteniz anında güncellenir.
      </p>

      <BilgiKutusu tip="warning" baslik="Önemli">
        Yayınla butonuna basmadan çıkarsanız değişiklikleriniz taslak olarak saklanır ancak ziyaretçiler göremez.
        Değişikliklerin canlıya yansıması için mutlaka &quot;Yayınla&quot; butonuna tıklayın.
      </BilgiKutusu>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Blok Ekleme ve Silme', href: '/destek/editor/blok-ekleme-silme' },
          { baslik: 'Tema ve Renk Değiştirme', href: '/destek/editor/tema-ve-renkler' },
          { baslik: 'Görsel Yükleme', href: '/destek/editor/gorsel-yukleme' },
          { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
        ]}
      />

      <SayfaDegerlendirme />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KPNK Editör Nasıl Kullanılır?',
            description: 'Web sitenizi KPNK sürükle-bırak editör ile düzenleme rehberi',
            step: [
              { '@type': 'HowToStep', name: 'Dashboard\'a giriş yapın', text: 'kepenk.ai/giris adresinden telefon numaranız ile giriş yapın.' },
              { '@type': 'HowToStep', name: 'Sitem sekmesine tıklayın', text: 'Dashboard\'un sol menüsünde "Sitem" başlığını tıklayın.' },
              { '@type': 'HowToStep', name: 'Editörü açın', text: '"Editörü Aç" butonuna tıklayarak görsel düzenleyiciye geçin.' },
            ],
          }),
        }}
      />
    </article>
  )
}
