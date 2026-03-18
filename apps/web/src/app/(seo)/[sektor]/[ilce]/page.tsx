import { Metadata } from 'next'
import { SEKTORLER } from '@/data/sektorler'
import Link from 'next/link'

/* ── İstanbul İlçeleri ──────────────────────────────────────────────────────── */
const ILCELER = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler',
  'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
  'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
  'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
  'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
  'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla',
  'Ümraniye', 'Üsküdar', 'Zeytinburnu',
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export function generateStaticParams() {
  const params: { sektor: string; ilce: string }[] = []
  for (const s of SEKTORLER) {
    for (const ilce of ILCELER) {
      params.push({ sektor: s.id, ilce: slugify(ilce) })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ sektor: string; ilce: string }> }): Promise<Metadata> {
  const { sektor, ilce } = await params
  const sektorData = SEKTORLER.find(s => s.id === sektor)
  const ilceAd = ILCELER.find(i => slugify(i) === ilce) || ilce
  if (!sektorData) return { title: 'Sayfa Bulunamadı' }

  return {
    title: `${ilceAd} ${sektorData.ad} — kepenk.ai | 7/24 AI Destekli Web Sitesi`,
    description: `${ilceAd}'da ${sektorData.ad.toLowerCase()} işletmeniz için AI destekli web sitesi ve dijital asistan. ${sektorData.slogan}. Hemen kepenginizi açın!`,
    openGraph: {
      title: `${ilceAd} ${sektorData.ad} — kepenk.ai`,
      description: sektorData.altBaslik || sektorData.slogan,
    },
  }
}

export default async function IlceSektorPage({ params }: { params: Promise<{ sektor: string; ilce: string }> }) {
  const { sektor, ilce } = await params
  const sektorData = SEKTORLER.find(s => s.id === sektor)
  const ilceAd = ILCELER.find(i => slugify(i) === ilce) || ilce

  if (!sektorData) {
    return <div className="p-12 text-center text-muted-foreground">Sektör bulunamadı.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-background text-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-5xl mb-4">{sektorData.emoji}</p>
          <h1 className="font-syne font-extrabold text-3xl md:text-5xl mb-4 leading-tight">
            {ilceAd} <span className="text-rust">{sektorData.ad}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {sektorData.heroBaslik || sektorData.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/onboarding?sektor=${sektor}`}
              className="bg-rust hover:bg-rust/90 text-foreground px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Hemen Başla — Ücretsiz Dene
            </Link>
            <Link
              href={`/demolar/vitrin?filtre=${sektor}`}
              className="border-2 border-cream/30 hover:border-cream text-foreground px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Demo Siteyi Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl text-foreground text-center mb-8">
            {ilceAd} {sektorData.ad} Hizmetleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sektorData.hizmetler.map(h => (
              <div key={h} className="bg-white border border-border rounded-xl p-4 text-center">
                <p className="font-semibold text-foreground text-sm">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock WhatsApp Diyalog */}
      {sektorData.mockDiyalog && sektorData.mockDiyalog.length > 0 && (
        <section className="py-16 px-4 bg-warm/30">
          <div className="max-w-lg mx-auto">
            <h2 className="font-syne font-bold text-2xl text-foreground text-center mb-6">
              AI Asistanınız Böyle Çalışır
            </h2>
            <div className="bg-[#0B141A] rounded-2xl p-4 space-y-3 shadow-xl">
              {sektorData.mockDiyalog.map((d, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-[#005C4B] text-white text-sm p-3 rounded-xl rounded-tr-sm max-w-[80%]">
                      {d.musteri}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[#202C33] text-white text-sm p-3 rounded-xl rounded-tl-sm max-w-[80%]">
                      {d.ai}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-background text-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-3xl mb-4">
            {ilceAd}&apos;da Öne Çıkın
          </h2>
          <p className="text-muted-foreground mb-8">
            {sektorData.altBaslik || `${ilceAd}'daki ${sektorData.ad.toLowerCase()} işletmeniz için AI destekli web sitesi ve dijital asistan.`}
          </p>
          <Link
            href={`/onboarding?sektor=${sektor}`}
            className="inline-block bg-rust hover:bg-rust/90 text-foreground px-10 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            {sektorData.cta || 'Hemen Başla'} 🚀
          </Link>
        </div>
      </section>
    </div>
  )
}
