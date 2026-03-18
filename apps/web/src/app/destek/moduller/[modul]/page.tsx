import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MODULLER } from '@/data/moduller'
import { SEKTORLER } from '@/data/sektorler'
import { PAKETLER } from '@/data/paketler'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

interface Props {
  params: Promise<{ modul: string }>
}

export async function generateStaticParams() {
  return MODULLER.map((m) => ({ modul: m.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modul } = await params
  const m = MODULLER.find((mod) => mod.id === modul)
  if (!m) return { title: 'Modül Bulunamadı' }
  return {
    title: `${m.ad} Nasıl Kullanılır?`,
    description: `${m.ad} modülünü adım adım öğrenin. ${m.aciklama}. Minimum paket: ${m.minPaket}.`,
    alternates: { canonical: `https://destek.kepenk.ai/moduller/${m.id}` },
    openGraph: {
      title: `${m.ad} Rehberi — KPNK`,
      description: m.aciklama,
      url: `https://destek.kepenk.ai/moduller/${m.id}`,
      type: 'article',
    },
  }
}

// Paket sıralaması
const PAKET_SIRASI = ['TEMEL', 'STANDART', 'BÜYÜME', 'PREMIUM', 'PREMIUM PLUS']

export default async function ModulDetay({ params }: Props) {
  const { modul } = await params
  const m = MODULLER.find((mod) => mod.id === modul)
  if (!m) notFound()

  // Bu modülü kullanan sektörler
  const kullananSektorler = SEKTORLER.filter((s) => s.moduller.includes(m.id)).slice(0, 8)

  // Bu modülü içeren paketler
  const minPaketIndex = PAKET_SIRASI.indexOf(m.minPaket)
  const uygunPaketler = PAKETLER.filter((_, i) => i >= minPaketIndex)

  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        {m.ad}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">{m.aciklama}</p>

      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-lg">
          Min. Paket: {m.minPaket}
        </span>
        {m.kategori && (
          <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
            {m.kategori === 'donusum' ? '💰 Dönüşüm' : m.kategori === 'guven' ? '🤝 Güven' : m.kategori === 'operasyon' ? '⚙️ Operasyon' : '🎨 Görsel'}
          </span>
        )}
      </div>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Nasıl Aktifleştirilir?</h2>
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
          <div>
            <p className="font-semibold text-foreground">Dashboard &gt; Sitem &gt; Modüller sayfasına gidin</p>
            <p className="text-muted-foreground text-sm">Sol menüden Sitem sekmesine, ardından Modüller sayfasına geçin.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
          <div>
            <p className="font-semibold text-foreground">&quot;{m.ad}&quot; modülünü bulun ve aktifleştirin</p>
            <p className="text-muted-foreground text-sm">Modül kartının üzerindeki toggle butonunu aktif konumuna getirin.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
          <div>
            <p className="font-semibold text-foreground">Editörde bloğu ekleyin</p>
            <p className="text-muted-foreground text-sm">Modül aktifleştirildikten sonra editörde sol panelde görünür. Sürükle-bırak ile sayfanıza ekleyin.</p>
          </div>
        </div>
      </div>

      <BilgiKutusu tip="info" baslik="Paket Gereksinimi">
        {m.ad} modülü <strong>{m.minPaket}</strong> ve üzeri paketlerde kullanılabilir.
        {minPaketIndex > 0 && ` Mevcut paketiniz uygun değilse Dashboard > Profil > Aboneliğim sayfasından yükseltme yapabilirsiniz.`}
      </BilgiKutusu>

      {uygunPaketler.length > 0 && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Hangi Paketlerde Mevcut?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {uygunPaketler.map((p) => (
              <div key={p.id} className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="font-semibold text-foreground text-sm">{p.name}</p>
                <p className="text-primary text-sm font-bold mt-1">₺{p.aylikFiyat.toLocaleString('tr-TR')}/ay</p>
              </div>
            ))}
          </div>
        </>
      )}

      {kullananSektorler.length > 0 && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Bu Modülü Kullanan Sektörler</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {kullananSektorler.map((s) => (
              <a
                key={s.id}
                href={`/destek/sektorler/${s.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-foreground transition-colors"
              >
                <span>{s.emoji}</span> {s.ad}
              </a>
            ))}
          </div>
        </>
      )}

      <IlgiliMakaleler makaleler={[
        { baslik: 'Tüm Modüller', href: '/destek/moduller' },
        { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
        { baslik: 'Blok Ekleme ve Silme', href: '/destek/editor/blok-ekleme-silme' },
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
      ]} />

      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: `${m.ad} Nasıl Kullanılır?`,
        description: m.aciklama,
        url: `https://destek.kepenk.ai/moduller/${m.id}`,
      }) }} />
    </article>
  )
}
