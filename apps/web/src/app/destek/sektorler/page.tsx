import type { Metadata } from 'next'
import Link from 'next/link'
import { SEKTORLER } from '@/data/sektorler'

export const metadata: Metadata = {
  title: 'Sektör Rehberleri',
  description: 'Sektörünüze özel KPNK kullanım rehberi. 28 sektör için AI asistan ayarları, modül önerileri ve WhatsApp diyalog örnekleri.',
  alternates: { canonical: 'https://destek.kepenk.ai/sektorler' },
}

// Group sectors by category
function grupla(sektorler: typeof SEKTORLER) {
  const gruplar: Record<string, typeof SEKTORLER> = {}
  for (const s of sektorler) {
    if (!gruplar[s.kategori]) gruplar[s.kategori] = []
    gruplar[s.kategori].push(s)
  }
  return gruplar
}

export default function SektorlerHub() {
  const gruplar = grupla(SEKTORLER)

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Sektör Rehberleri</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        Her sektörün kendine özgü ihtiyaçları vardır. KPNK, 28 farklı sektör için özelleştirilmiş AI asistan, modül önerileri ve kullanım kılavuzları sunar.
      </p>

      {Object.entries(gruplar).map(([kategori, sektorler]) => (
        <section key={kategori} className="mb-10">
          <h2 className="text-lg font-bold font-syne text-foreground mb-4">{kategori}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {sektorler.map((s) => (
              <Link
                key={s.id}
                href={`/destek/sektorler/${s.id}`}
                className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">{s.ad}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
