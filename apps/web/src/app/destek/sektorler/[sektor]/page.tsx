import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEKTORLER } from '@/data/sektorler'
import { PAKETLER } from '@/data/paketler'
import BilgiKutusu from '@/components/destek/BilgiKutusu'
import IlgiliMakaleler from '@/components/destek/IlgiliMakaleler'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

interface Props {
  params: Promise<{ sektor: string }>
}

export async function generateStaticParams() {
  return SEKTORLER.map((s) => ({ sektor: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sektor } = await params
  const s = SEKTORLER.find((sek) => sek.id === sektor)
  if (!s) return { title: 'Sektör Bulunamadı' }
  return {
    title: `${s.ad} İçin Dijital Asistan Rehberi`,
    description: `${s.ad} sektörüne özel KPNK kullanım kılavuzu. AI asistan ayarları, önerilen modüller ve WhatsApp diyalog örnekleri.`,
    alternates: { canonical: `https://destek.kepenk.ai/sektorler/${s.id}` },
    openGraph: {
      title: `${s.ad} — KPNK Sektör Rehberi`,
      description: `${s.ad} için dijital asistan, modüller ve paket önerileri.`,
      url: `https://destek.kepenk.ai/sektorler/${s.id}`,
      type: 'article',
    },
  }
}

export default async function SektorDetay({ params }: Props) {
  const { sektor } = await params
  const s = SEKTORLER.find((sek) => sek.id === sektor)
  if (!s) notFound()

  const onerilenPaket = s.onerilenPaket ? PAKETLER.find(p => p.name === s.onerilenPaket) : null

  return (
    <article className="prose-custom">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{s.emoji}</span>
        <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground">
          {s.ad}
        </h1>
      </div>
      <p className="text-lg text-muted-foreground mb-8">
        {s.ad} sektörüne özel KPNK kullanım rehberi. AI asistan davranışı, önerilen modüller, paket seçimi ve WhatsApp diyalog örnekleri.
      </p>

      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">{s.kategori}</span>
        {s.onerilenPaket && (
          <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-lg">
            Önerilen: {s.onerilenPaket}
          </span>
        )}
      </div>

      {s.knowHow && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">AI Asistan Bilgi Tabanı</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{s.knowHow}</p>
        </>
      )}

      {s.aiDavranisi && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">AI Davranış Profili</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{s.aiDavranisi}</p>
        </>
      )}

      {s.satisStratejisi && (
        <BilgiKutusu tip="tip" baslik="Satış Stratejisi">
          {s.satisStratejisi}
        </BilgiKutusu>
      )}

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Hizmetler</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {s.hizmetler.map((h) => (
          <span key={h} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-foreground">{h}</span>
        ))}
      </div>

      {s.mockDiyalog && s.mockDiyalog.length > 0 && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Örnek WhatsApp Diyaloğu</h2>
          <div className="space-y-3 mb-6 max-w-lg">
            {s.mockDiyalog.map((d, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-emerald-100 text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                    {d.musteri}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[80%]">
                    {d.ai}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {onerilenPaket && (
        <>
          <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Önerilen Paket</h2>
          <div className="p-6 bg-white border-2 border-primary/20 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold font-syne text-foreground">{onerilenPaket.name}</h3>
              <span className="text-primary font-bold">₺{onerilenPaket.aylikFiyat.toLocaleString('tr-TR')}/ay</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{onerilenPaket.teknoloji} · {onerilenPaket.aiKredi}</p>
            <ul className="space-y-1.5">
              {onerilenPaket.ozellikler.map((o) => (
                <li key={o} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span> {o}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <h2 className="text-xl font-bold font-syne text-foreground mt-10 mb-4">Önerilen Modüller</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {s.moduller.slice(0, 12).map((mid) => (
          <a
            key={mid}
            href={`/destek/moduller/${mid}`}
            className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary transition-colors"
          >
            {mid.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </a>
        ))}
      </div>

      <IlgiliMakaleler makaleler={[
        { baslik: 'Tüm Sektör Rehberleri', href: '/destek/sektorler' },
        { baslik: 'WhatsApp AI Kurulumu', href: '/destek/whatsapp/kurulum' },
        { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
        { baslik: 'Editör Nasıl Kullanılır?', href: '/destek/editor/kullanim-kilavuzu' },
      ]} />

      <SayfaDegerlendirme />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: `${s.ad} İçin Dijital Asistan Rehberi`,
        description: `${s.ad} sektörüne özel KPNK kullanım kılavuzu.`,
        url: `https://destek.kepenk.ai/sektorler/${s.id}`,
      }) }} />
    </article>
  )
}
