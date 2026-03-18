import Link from 'next/link'

interface IlgiliMakale {
  baslik: string
  href: string
}

interface IlgiliMakalelerProps {
  makaleler: IlgiliMakale[]
}

export default function IlgiliMakaleler({ makaleler }: IlgiliMakalelerProps) {
  if (!makaleler.length) return null

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-foreground font-semibold font-syne text-lg mb-4">İlgili Makaleler</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {makaleler.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm text-foreground group-hover:text-primary transition-colors font-medium">
              {m.baslik}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
