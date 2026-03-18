import type { Metadata } from 'next'
import Link from 'next/link'
import { MODULLER, MODUL_KATEGORILERI, type ModulKategori } from '@/data/moduller'

export const metadata: Metadata = {
  title: 'Modül Rehberleri',
  description: 'KPNK platformundaki tüm modüllerin detaylı kullanım rehberleri. Randevu, QR menü, galeri, iletişim formu ve daha fazlası.',
  alternates: { canonical: 'https://destek.kepenk.ai/moduller' },
}

// Only show modules that have meaningful unique content (exclude universal/generic ones)
const GOSTERILECEK_MODULLER = MODULLER.filter(m =>
  m.kategori && ['donusum', 'guven', 'operasyon', 'gorsel'].includes(m.kategori)
).slice(0, 40)

export default function ModullerHub() {
  const kategoriler = Object.entries(MODUL_KATEGORILERI) as [ModulKategori, typeof MODUL_KATEGORILERI[ModulKategori]][]

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">Modül Rehberleri</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        KPNK platformundaki her modülün ne işe yaradığını, nasıl aktifleştirildiğini ve hangi paketlerde mevcut olduğunu öğrenin.
      </p>

      {kategoriler.map(([katId, kat]) => {
        const moduller = GOSTERILECEK_MODULLER.filter(m => m.kategori === katId)
        if (!moduller.length) return null
        return (
          <section key={katId} className="mb-10">
            <h2 className="text-xl font-bold font-syne text-foreground mb-4 flex items-center gap-2">
              <span>{kat.emoji}</span> {kat.ad}
              <span className="text-sm font-normal text-muted-foreground">— {kat.aciklama}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {moduller.map((m) => (
                <Link
                  key={m.id}
                  href={`/destek/moduller/${m.id}`}
                  className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <h3 className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">{m.ad}</h3>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{m.aciklama}</p>
                  <span className="inline-block mt-2 text-xs text-primary/70 font-medium">{m.minPaket} +</span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
