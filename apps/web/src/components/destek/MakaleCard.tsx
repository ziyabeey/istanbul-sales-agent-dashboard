import Link from 'next/link'
import DestekIkon from '@/components/destek/DestekIkon'

interface MakaleCardProps {
  baslik: string
  ozet: string
  href: string
  ikon?: string
  kategoriRenk?: string
}

export default function MakaleCard({ baslik, ozet, href, ikon, kategoriRenk = 'bg-gray-100 text-gray-700' }: MakaleCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {ikon && (
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${kategoriRenk}`}>
          <DestekIkon ad={ikon} className="w-5 h-5" />
        </span>
      )}
      <h3 className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {baslik}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
        {ozet}
      </p>
      <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Okumaya devam et
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
