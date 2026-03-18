import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PAKETLER } from '@/data/paketler'
import { SEKTORLER } from '@/data/sektorler'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

interface Props {
  params: Promise<{ paket: string }>
}

export async function generateStaticParams() {
  return PAKETLER.map((p) => ({ paket: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { paket } = await params
  const p = PAKETLER.find((pk) => pk.id === paket)
  if (!p) return { title: 'Paket Bulunamadı' }
  return {
    title: `${p.name} Paketi Detayları`,
    description: `KPNK ${p.name} paketi: ₺${p.aylikFiyat}/ay, ${p.aiKredi}, ${p.teknoloji}. Tüm özellikler ve dahil olan modüller.`,
    alternates: { canonical: `https://destek.kepenk.ai/paketler/${p.id}` },
    openGraph: {
      title: `${p.name} Paketi — KPNK`,
      description: `${p.teknoloji}, ${p.aiKredi}. ₺${p.aylikFiyat}/ay.`,
      url: `https://destek.kepenk.ai/paketler/${p.id}`,
      type: 'article',
    },
  }
}

export default async function PaketDetay({ params }: Props) {
  const { paket } = await params
  const p = PAKETLER.find((pk) => pk.id === paket)
  if (!p) notFound()

  // Bu paketi öneren sektörler
  const onerenSektorler = SEKTORLER.filter(s => s.onerilenPaket === p.name).slice(0, 8)

  return (
    <article className="prose-custom">
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">
        {p.name} Paketi
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {p.teknoloji} altyapısı, {p.aiKredi} ve daha fazlası — {p.name} paketinin tüm detayları.
      </p>

      <div className="p-6 bg-white border-2 border-primary/20 rounded-2xl mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">₺{p.aylikFiyat.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-muted-foreground">Aylık</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">₺{p.yillikFiyatAylik.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-muted-foreground">Yıllık (aylık)</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{p.aiKredi}</p>
            <p className="text-xs text-muted-foreground">AI Kredi</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{p.teknoloji.split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground">Site Tipi</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Dahil Özellikler</h2>
      <ul className="space-y-2 mb-6">
        {p.ozellikler.map((o) => (
          <li key={o} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-primary text-lg">✓</span>
            <span className="text-foreground">{o}</span>
          </li>
        ))}
      </ul>

      {onerenSektorler.length > 0 && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Bu Paketi Öneren Sektörler</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {onerenSektorler.map((s) => (
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

      <BilgiKutusu tip="info" baslik="Paket Değiştirme">
        İstediğiniz zaman paketinizi yükseltebilir veya düşürebilirsiniz.
        Dashboard &gt; Profil &gt; Aboneliğim sayfasından işlem yapabilirsiniz.
      </BilgiKutusu>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Tüm Paketleri Karşılaştır', href: '/destek/paketler' },
        { baslik: 'Paket Yükseltme/Düşürme', href: '/destek/odeme-fatura/paket-degistirme' },
        { baslik: 'Ödeme Yöntemleri', href: '/destek/odeme-fatura/odeme-yontemleri' },
        { baslik: 'İlk Kurulum', href: '/destek/baslangic/ilk-kurulum' },
      ]} />

      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Product',
        name: `KPNK ${p.name} Paketi`,
        description: `${p.teknoloji}, ${p.aiKredi}.`,
        url: `https://destek.kepenk.ai/paketler/${p.id}`,
        offers: {
          '@type': 'Offer',
          price: p.aylikFiyat,
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
        },
      }) }} />
    </article>
  )
}
