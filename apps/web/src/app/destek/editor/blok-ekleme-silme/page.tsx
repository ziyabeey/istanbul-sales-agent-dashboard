import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Blok Ekleme ve Silme',
  description: 'KPNK editöründe sitenize yeni bloklar ekleyin, mevcut blokları düzenleyin veya kaldırın. Adım adım rehber.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/blok-ekleme-silme' },
  openGraph: {
    title: 'Blok Ekleme ve Silme — KPNK Editör',
    description: 'Sitenize yeni bölümler ekleyin veya kaldırın.',
    url: 'https://destek.kepenk.ai/editor/blok-ekleme-silme',
    type: 'article',
  },
}

export default function BlokEklemeSilme() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Blok Ekleme ve Silme
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        KPNK editörü blok tabanlı çalışır. Her bölüm (hero, hizmetler, galeri, iletişim vb.) ayrı bir bloktur.
        Blokları ekleyerek, silerek veya sırasını değiştirerek sitenizi özgürce tasarlayabilirsiniz.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Yeni Blok Ekleme</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Sol paneli açın', aciklama: 'Editörün sol tarafındaki "+" butonuna veya "Blok Ekle" sekmesine tıklayın. Kullanılabilir blok kategorileri listelenecektir.' },
          { baslik: 'Blok kategorisi seçin', aciklama: 'Dönüşüm, Güven, Operasyon veya Görsel kategorilerinden birini seçin. Her kategoride farklı blok tipleri bulunur.' },
          { baslik: 'Bloğu sürükleyin veya tıklayın', aciklama: 'İstediğiniz bloğu sayfanızdaki konuma sürükleyin veya üzerine tıklayarak sayfanın sonuna ekleyin.' },
          { baslik: 'İçeriği düzenleyin', aciklama: 'Eklenen bloğun metin, görsel ve ayarlarını tıklayarak özelleştirin. Her blok kendi düzenleme paneline sahiptir.' },
        ]}
      />

      <BilgiKutusu tip="tip" baslik="Blok Türleri">
        Paketinize göre kullanabileceğiniz blok sayısı değişir. Temel pakette standart bloklar, Büyüme paketinde randevu ve ödeme blokları, Premium pakette tüm bloklar aktiftir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Blok Silme</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Silmek istediğiniz bloğun üzerine gelin', aciklama: 'Bloğun sağ üst köşesinde bir araç çubuğu belirecektir.' },
          { baslik: 'Çöp kutusu ikonuna tıklayın', aciklama: 'Kırmızı çöp kutusu simgesine tıklayın. Onay penceresi açılacaktır.' },
          { baslik: 'Silme işlemini onaylayın', aciklama: '"Evet, Sil" butonuna tıklayarak bloğu kaldırın. Bu işlem Ctrl+Z ile geri alınabilir.' },
        ]}
      />

      <BilgiKutusu tip="warning" baslik="Dikkat">
        Bir bloğu sildiğinizde o bloktaki tüm içerik (metin, görseller) kaldırılır. Yayınla butonuna basmadığınız sürece silme işlemi sadece taslakta geçerlidir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Blok Sırasını Değiştirme</h2>
      <p className="text-muted-foreground mb-4">
        Bloğun sol kenarındaki tutma noktasına (⠿) basılı tutarak yukarı veya aşağı sürükleyin.
        Sayfa yapınızı istediğiniz sırayla düzenleyebilirsiniz. Önerilen sıralama: Hero → Hizmetler → Referanslar → İletişim.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Mevcut Blok Türleri</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { ad: 'Hero Banner', aciklama: 'Ana sayfa üst bölüm — başlık, açıklama ve CTA butonu' },
          { ad: 'Hizmetler', aciklama: 'Sunduğunuz hizmetlerin kartlar halinde listesi' },
          { ad: 'Galeri', aciklama: 'İşlerinizin fotoğraf galerisi' },
          { ad: 'İletişim Formu', aciklama: 'Ad, telefon, mesaj alanlarıyla müşteri iletişim formu' },
          { ad: 'Google Yorumlar', aciklama: 'Google\'dan çekilen gerçek müşteri yorumları' },
          { ad: 'Hakkımızda', aciklama: 'İşletmenizin hikayesi ve değerleri' },
          { ad: 'Randevu', aciklama: 'Online randevu ve rezervasyon modülü' },
          { ad: 'QR Menü', aciklama: 'Restoran ve kafeler için dijital menü' },
        ].map((b) => (
          <div key={b.ad} className="p-4 bg-gray-50 rounded-xl">
            <p className="font-semibold text-foreground text-sm">{b.ad}</p>
            <p className="text-muted-foreground text-xs mt-1">{b.aciklama}</p>
          </div>
        ))}
      </div>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
          { baslik: 'Tema ve Renk Değiştirme', href: '/destek/editor/tema-ve-renkler' },
          { baslik: 'Görsel Yükleme', href: '/destek/editor/gorsel-yukleme' },
          { baslik: 'Modül Rehberleri', href: '/destek/moduller' },
        ]}
      />

      <SayfaDegerlendirme />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KPNK Editörde Blok Ekleme ve Silme',
            description: 'Web sitenize yeni bloklar ekleyin veya mevcut blokları kaldırın.',
            step: [
              { '@type': 'HowToStep', name: 'Sol paneli açın', text: 'Blok Ekle sekmesine tıklayın.' },
              { '@type': 'HowToStep', name: 'Blok kategorisi seçin', text: 'Dönüşüm, Güven, Operasyon veya Görsel kategorisini seçin.' },
              { '@type': 'HowToStep', name: 'Bloğu ekleyin', text: 'Sürükle-bırak ile sayfanıza ekleyin.' },
              { '@type': 'HowToStep', name: 'İçeriği düzenleyin', text: 'Metin ve görselleri özelleştirin.' },
            ],
          }),
        }}
      />
    </article>
  )
}
