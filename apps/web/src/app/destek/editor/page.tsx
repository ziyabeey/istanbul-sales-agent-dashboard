import type { Metadata } from 'next'
import MakaleCard from '@/components/destek/MakaleCard'

export const metadata: Metadata = {
  title: 'Editör Kullanım Rehberi',
  description: 'KPNK sürükle-bırak editörünü kullanarak web sitenizi kolayca düzenleyin. Blok ekleme, tema değiştirme, görsel yükleme ve daha fazlası.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor' },
}

const EDITOR_REHBERLERI = [
  { baslik: 'Editör Nasıl Kullanılır?', ozet: 'Sürükle-bırak editör ile web sitenizi kolayca düzenleyin. Temel kullanım kılavuzu.', href: '/destek/editor/kullanim-kilavuzu' },
  { baslik: 'Blok Ekleme ve Silme', ozet: 'Sitenize yeni bloklar ekleyin, mevcut blokları düzenleyin veya kaldırın.', href: '/destek/editor/blok-ekleme-silme' },
  { baslik: 'Tema ve Renk Değiştirme', ozet: 'Sitenizin renk paletini, yazı tiplerini ve genel temasını özelleştirin.', href: '/destek/editor/tema-ve-renkler' },
  { baslik: 'Görsel Yükleme ve Düzenleme', ozet: 'Fotoğraf yükleyin, boyutlandırın, kırpın ve optimize edin.', href: '/destek/editor/gorsel-yukleme' },
  { baslik: 'SEO Başlık ve Açıklama', ozet: 'Google arama sonuçlarında nasıl görüneceğinizi kontrol edin.', href: '/destek/editor/seo-ayarlari' },
  { baslik: 'Özel Domain Bağlama', ozet: 'Kendi alan adınızı (ör. isletmem.com) KPNK sitenize bağlayın.', href: '/destek/editor/domain-baglama' },
  { baslik: 'Siteyi Yayınlama', ozet: 'Sitenizi tek tıkla yayına alın ve güncellemeleri anında uygulayın.', href: '/destek/editor/yayinlama' },
]

export default function EditorHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Editör Kullanım Rehberi
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        KPNK editörü ile web sitenizi kod yazmadan, sürükle-bırak yöntemiyle düzenleyin.
        Aşağıdaki rehberlerle her özelliği adım adım öğrenin.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EDITOR_REHBERLERI.map((r) => (
          <MakaleCard
            key={r.href}
            baslik={r.baslik}
            ozet={r.ozet}
            href={r.href}
            ikon="✏️"
            kategoriRenk="bg-blue-100 text-blue-700"
          />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'KPNK Editör Kullanım Rehberi',
            description: 'Web sitenizi KPNK editörü ile düzenleme rehberleri',
            url: 'https://destek.kepenk.ai/editor',
          }),
        }}
      />
    </div>
  )
}
