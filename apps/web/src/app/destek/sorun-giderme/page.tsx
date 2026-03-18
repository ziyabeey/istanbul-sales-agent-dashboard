import type { Metadata } from 'next'
import Link from 'next/link'
import { SORUN_GIDERME_KATEGORILERI } from '@/data/sorunGidermeVerileri'
import DestekIkon from '@/components/destek/DestekIkon'

export const metadata: Metadata = {
  title: 'Sorun Giderme | KPNK Destek',
  description: 'Ödeme, giriş, site, WhatsApp, domain ve editör sorunları için adım adım çözüm rehberleri.',
  alternates: { canonical: 'https://destek.kepenk.ai/sorun-giderme' },
}

export default function SorunGidermeHub() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-syne text-foreground mb-3">Sorun Giderme</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Yaşadığınız soruna göre kategoriye tıklayın. Her sorun için adım adım çözüm rehberleri hazırladık.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SORUN_GIDERME_KATEGORILERI.map((kat) => (
          <Link
            key={kat.slug}
            href={`/destek/sorun-giderme/${kat.slug}`}
            className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all"
          >
            <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${kat.renk}`}>
              <DestekIkon ad={kat.ikon} className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                {kat.baslik}
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">{kat.aciklama}</p>
              <span className="text-xs text-muted-foreground mt-2 block">{kat.sorunlar.length} sorun</span>
            </div>
          </Link>
        ))}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'KPNK Sorun Giderme Merkezi',
            description: 'Ödeme, giriş, site, WhatsApp, domain ve editör sorunları için çözüm rehberleri.',
            url: 'https://destek.kepenk.ai/sorun-giderme',
          }),
        }}
      />
    </div>
  )
}
