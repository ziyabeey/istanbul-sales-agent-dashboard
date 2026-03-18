import type { Metadata } from 'next'
import { sorunKategorisiBul } from '@/data/sorunGidermeVerileri'
import DestekIkon from '@/components/destek/DestekIkon'
import SorunGidermeKart from '@/components/destek/SorunGidermeKart'
import SayfaDegerlendirme from '@/components/destek/SayfaDegerlendirme'

const SLUG = 'odeme-sorunlari'

export const metadata: Metadata = {
  title: 'Ödeme Sorunları | KPNK Sorun Giderme',
  description: 'Ödeme başarısızlıkları, kart reddi, 3D Secure sorunları ve fatura çözümleri.',
  alternates: { canonical: `https://destek.kepenk.ai/sorun-giderme/${SLUG}` },
}

export default function Page() {
  const kategori = sorunKategorisiBul(SLUG)
  if (!kategori) return <p>Kategori bulunamadı.</p>

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${kategori.renk}`}>
          <DestekIkon ad={kategori.ikon} className="w-5 h-5" />
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-syne text-foreground">{kategori.baslik}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{kategori.aciklama}</p>

      <div className="space-y-3">
        {kategori.sorunlar.map((sorun) => (
          <SorunGidermeKart key={sorun.id} sorun={sorun} />
        ))}
      </div>

      <SayfaDegerlendirme />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: kategori.baslik,
            description: kategori.aciklama,
            step: kategori.sorunlar.map((s) => ({
              '@type': 'HowToStep',
              name: s.baslik,
              text: s.cozumAdimlar.join(' '),
            })),
          }),
        }}
      />
    </div>
  )
}
