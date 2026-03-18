'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_NAVIGASYON } from '@/data/destekMakaleleri'
import DestekIkon from '@/components/destek/DestekIkon'

export default function MakaleSidebar() {
  const pathname = usePathname()
  const [acikGruplar, setAcikGruplar] = useState<string[]>(
    SIDEBAR_NAVIGASYON.map((g) => g.kategori)
  )

  const toggleGrup = (kategori: string) => {
    setAcikGruplar((prev) =>
      prev.includes(kategori) ? prev.filter((k) => k !== kategori) : [...prev, kategori]
    )
  }

  return (
    <nav className="space-y-1">
      {SIDEBAR_NAVIGASYON.map((grup) => {
        const acik = acikGruplar.includes(grup.kategori)
        return (
          <div key={grup.kategori}>
            <button
              onClick={() => toggleGrup(grup.kategori)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-foreground hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="flex items-center gap-2">
                <DestekIkon ad={grup.ikon} className="w-4 h-4" />
                <span>{grup.baslik}</span>
              </span>
              <svg
                className={`w-4 h-4 text-muted-foreground transition-transform ${acik ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {acik && (
              <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-200 pl-3">
                {grup.linkler.map((link) => {
                  const aktif = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                        aktif
                          ? 'text-primary bg-primary/5 font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
                      }`}
                    >
                      {link.baslik}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
