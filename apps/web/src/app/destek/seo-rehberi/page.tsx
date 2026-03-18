import type { Metadata } from 'next'
import MakaleCard from '@/components/destek/MakaleCard'

export const metadata: Metadata = {
  title: 'SEO Büyüme Rehberi',
  description: 'Küçük işletmeler için SEO rehberi. Google arama sonuçlarında üst sıralara çıkın ve organik müşteri kazanın.',
  alternates: { canonical: 'https://destek.kepenk.ai/seo-rehberi' },
}

const REHBERLER = [
  { baslik: 'Temel SEO Bilgileri', ozet: 'Küçük işletmeler için arama motoru optimizasyonu temelleri.', href: '/destek/seo-rehberi/temel-seo' },
  { baslik: 'Google My Business Optimizasyonu', ozet: 'GMB profilinizi optimize ederek yerel aramalarda üst sıralara çıkın.', href: '/destek/seo-rehberi/google-my-business' },
]

export default function SeoRehberiHub() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold font-syne text-foreground mb-4">SEO Büyüme Rehberi</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">Google&apos;da üst sıralara çıkarak müşterilerinizin sizi bulmasını sağlayın. Esnaflar için pratik SEO rehberi.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REHBERLER.map((r) => (<MakaleCard key={r.href} baslik={r.baslik} ozet={r.ozet} href={r.href} ikon="📈" kategoriRenk="bg-indigo-100 text-indigo-700" />))}
      </div>
    </div>
  )
}
