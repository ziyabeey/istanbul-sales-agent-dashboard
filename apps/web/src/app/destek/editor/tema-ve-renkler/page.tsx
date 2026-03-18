import type { Metadata } from 'next'
import AdimAdim from '@/components/destek/AdimAdim'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

export const metadata: Metadata = {
  title: 'Tema ve Renk Değiştirme',
  description: 'KPNK editöründe sitenizin renk paletini, yazı tiplerini ve temasını değiştirin. Markanıza uygun tasarım oluşturun.',
  alternates: { canonical: 'https://destek.kepenk.ai/editor/tema-ve-renkler' },
  openGraph: {
    title: 'Tema ve Renk Değiştirme — KPNK Editör',
    description: 'Sitenizin renklerini ve temasını özelleştirin.',
    url: 'https://destek.kepenk.ai/editor/tema-ve-renkler',
    type: 'article',
  },
}

export default function TemaVeRenkler() {
  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        Tema ve Renk Değiştirme
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        İşletmenizin kimliğini yansıtan bir web sitesi için doğru renk paleti ve tema seçimi kritiktir.
        KPNK editörü ile renkleri, arka planları ve genel görünümü birkaç tıkla değiştirebilirsiniz.
      </p>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Renk Paleti Değiştirme</h2>
      <AdimAdim
        adimlar={[
          { baslik: 'Editörü açın', aciklama: 'Dashboard > Sitem > Editör yolunu izleyerek editörü açın.' },
          { baslik: 'Üst bardaki "Tema" butonuna tıklayın', aciklama: 'Editörün üst araç çubuğunda boya fırçası simgesiyle gösterilen "Tema" butonunu tıklayın.' },
          { baslik: 'Hazır paletlerden birini seçin', aciklama: 'KPNK, sektörünüze uygun hazır renk paletleri sunar. Berber için koyu tonlar, çiçekçi için pastel renkler gibi sektöre özel seçenekler mevcuttur.' },
          { baslik: 'Veya özel renkler belirleyin', aciklama: 'Renk seçiciden ana renk (primary), arka plan rengi ve metin rengini manuel olarak ayarlayabilirsiniz. HEX kodu da girebilirsiniz.' },
          { baslik: 'Önizleme yapın ve kaydedin', aciklama: 'Değişiklikler anında önizlemede görünür. Beğendiyseniz "Kaydet" butonuna tıklayın.' },
        ]}
      />

      <BilgiKutusu tip="tip" baslik="Sektör Önerisi">
        Sektörünüzü kayıt sırasında seçtiyseniz, KPNK otomatik olarak sektörünüze uygun bir renk paleti önerir.
        Örneğin restoran sektörü için sıcak tonlar, hukuk büroları için koyu ve ciddi renkler önerilir.
      </BilgiKutusu>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Hazır Renk Paletleri</h2>
      <p className="text-muted-foreground mb-4">
        KPNK editöründe sektörünüze göre optimize edilmiş hazır paletler bulunur:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {[
          { ad: 'Okyanus', renk: 'bg-sky-500', aciklama: 'Güven ve sakinlik' },
          { ad: 'Gece Mavisi', renk: 'bg-indigo-600', aciklama: 'Profesyonel ve ciddi' },
          { ad: 'Orman', renk: 'bg-emerald-600', aciklama: 'Doğal ve organik' },
          { ad: 'Gün Batımı', renk: 'bg-orange-500', aciklama: 'Enerjik ve sıcak' },
          { ad: 'Beton', renk: 'bg-gray-600', aciklama: 'Modern ve minimal' },
          { ad: 'Bordo', renk: 'bg-red-800', aciklama: 'Lüks ve klasik' },
        ].map((p) => (
          <div key={p.ad} className="p-4 bg-gray-50 rounded-xl text-center">
            <div className={`w-10 h-10 rounded-full ${p.renk} mx-auto mb-2`} />
            <p className="font-semibold text-foreground text-sm">{p.ad}</p>
            <p className="text-muted-foreground text-xs">{p.aciklama}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Arka Plan Modu</h2>
      <p className="text-muted-foreground mb-4">
        Siteniz açık (light) veya koyu (dark) modda görüntülenebilir. Editördeki tema panelinden
        arka plan modunu değiştirebilirsiniz. Koyu mod özellikle berber, dövme salonu ve gece kulübü gibi
        sektörlerde popülerdir.
      </p>

      <BilgiKutusu tip="info" baslik="Yazı Tipleri">
        Renk paletinin yanı sıra başlık ve gövde yazı tiplerini de değiştirebilirsiniz.
        KPNK, Türkçe karakterleri tam destekleyen Google Fonts kütüphanesinden seçim yapmanızı sağlar.
      </BilgiKutusu>

      <IlgiliMakaleler
        makaleler={[
          { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
          { baslik: 'Görsel Yükleme', href: '/destek/editor/gorsel-yukleme' },
          { baslik: 'Siteyi Yayınlama', href: '/destek/editor/yayinlama' },
          { baslik: 'Sektör Rehberleri', href: '/destek/sektorler' },
        ]}
      />

      <SayfaDegerlendirme />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'KPNK Editörde Tema ve Renk Değiştirme',
            description: 'Sitenizin renk paletini ve temasını özelleştirin.',
            step: [
              { '@type': 'HowToStep', name: 'Editörü açın', text: 'Dashboard > Sitem > Editör yolunu izleyin.' },
              { '@type': 'HowToStep', name: 'Tema butonuna tıklayın', text: 'Üst bardaki Tema butonunu tıklayın.' },
              { '@type': 'HowToStep', name: 'Palet seçin', text: 'Hazır paletlerden birini seçin veya özel renk belirleyin.' },
              { '@type': 'HowToStep', name: 'Kaydedin', text: 'Değişiklikleri önizleyin ve kaydedin.' },
            ],
          }),
        }}
      />
    </article>
  )
}
