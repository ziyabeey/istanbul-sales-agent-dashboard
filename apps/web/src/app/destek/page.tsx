import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, TicketCheck } from 'lucide-react'
import { DESTEK_KATEGORILERI, POPULER_MAKALELER, TUM_DESTEK_SAYFALARI } from '@/data/destekMakaleleri'
import MakaleCard from '@/components/destek/MakaleCard'
import DestekIkon from '@/components/destek/DestekIkon'

export const metadata: Metadata = {
  title: 'Destek Merkezi | KPNK',
  description: 'KPNK platformu kullanım rehberleri, editör kılavuzu, WhatsApp AI kurulumu, modül bilgileri ve paket karşılaştırması.',
  alternates: { canonical: 'https://destek.kepenk.ai' },
  openGraph: {
    title: 'KPNK Destek Merkezi',
    description: 'Editör kullanımı, modüller, paketler, sektör rehberleri ve daha fazlası.',
    url: 'https://destek.kepenk.ai',
    type: 'website',
  },
}

export default function DestekAnaSayfa() {
  // Get popular article details
  const populerDetaylar = POPULER_MAKALELER.map(
    (href) => TUM_DESTEK_SAYFALARI.find((s) => s.href === href)
  ).filter(Boolean)

  // Find category meta for an article
  const kategoriMeta = (kategoriId: string) =>
    DESTEK_KATEGORILERI.find((k) => k.id === kategoriId)

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-foreground mb-4">
          Nasıl yardımcı olabiliriz?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Editör kullanımı, modüller, paketler, WhatsApp AI kurulumu ve daha fazlası —
          aradığınız her şey burada.
        </p>
      </div>

      {/* Kategori Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-bold font-syne text-foreground mb-6">Kategoriler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTEK_KATEGORILERI.map((kat) => (
            <Link
              key={kat.id}
              href={`/destek/${kat.id === 'google' ? 'google-yorumlar' : kat.id === 'odeme' ? 'odeme-fatura' : kat.id === 'seo' ? 'seo-rehberi' : kat.id}`}
              className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all"
            >
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${kat.renk}`}>
                <DestekIkon ad={kat.ikon} className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                  {kat.baslik}
                </h3>
                <p className="text-muted-foreground text-sm mt-0.5">{kat.aciklama}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popüler Makaleler */}
      <section>
        <h2 className="text-xl font-bold font-syne text-foreground mb-6">En Çok Okunan Makaleler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {populerDetaylar.map((makale) => {
            if (!makale) return null
            const km = kategoriMeta(makale.kategori)
            return (
              <MakaleCard
                key={makale.href}
                baslik={makale.baslik}
                ozet={makale.ozet}
                href={makale.href}
                ikon={km?.ikon}
                kategoriRenk={km?.renk}
              />
            )
          })}
        </div>
      </section>

      {/* Sorun / Talep Banner */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/destek/sorun-giderme"
          className="group flex items-center gap-4 p-5 bg-orange-50 border border-orange-200 rounded-2xl hover:border-orange-300 hover:shadow-md transition-all"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100">
            <Wrench className="w-6 h-6 text-orange-700" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">Sorun mu yaşıyorsunuz?</h3>
            <p className="text-muted-foreground text-sm mt-0.5">Bilinen sorunlara hızlı çözümler</p>
          </div>
        </Link>
        <Link
          href="/destek/talep"
          className="group flex items-center gap-4 p-5 bg-teal-50 border border-teal-200 rounded-2xl hover:border-teal-300 hover:shadow-md transition-all"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100">
            <TicketCheck className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">Destek Talebi Oluştur</h3>
            <p className="text-muted-foreground text-sm mt-0.5">Sorununuzu bize bildirin, takip edin</p>
          </div>
        </Link>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'KPNK Destek Merkezi',
            url: 'https://destek.kepenk.ai',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://destek.kepenk.ai?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </div>
  )
}
