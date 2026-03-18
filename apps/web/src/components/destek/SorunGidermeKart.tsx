'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SorunCozum } from '@/data/sorunGidermeVerileri'

const ONEM_RENKLERI: Record<string, { bg: string; text: string; etiket: string }> = {
  kritik: { bg: 'bg-red-100', text: 'text-red-700', etiket: 'Kritik' },
  yuksek: { bg: 'bg-orange-100', text: 'text-orange-700', etiket: 'Yüksek' },
  orta: { bg: 'bg-blue-100', text: 'text-blue-700', etiket: 'Orta' },
  dusuk: { bg: 'bg-gray-100', text: 'text-gray-600', etiket: 'Düşük' },
}

interface SorunGidermeKartProps {
  sorun: SorunCozum
}

export default function SorunGidermeKart({ sorun }: SorunGidermeKartProps) {
  const [acik, setAcik] = useState(false)
  const onem = ONEM_RENKLERI[sorun.onemDerecesi]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm">
      <button
        onClick={() => setAcik(!acik)}
        className="flex items-center justify-between w-full p-5 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${onem.bg} ${onem.text}`}>
            {onem.etiket}
          </span>
          <h3 className="text-foreground font-semibold truncate">{sorun.baslik}</h3>
        </div>
        <svg
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-2 transition-transform ${acik ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {acik && (
        <div className="px-5 pb-5 border-t border-gray-100">
          {/* Belirtiler */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Belirtiler</h4>
            <ul className="space-y-1.5">
              {sorun.belirtiler.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Çözüm Adımları */}
          <div className="mt-5">
            <h4 className="text-sm font-semibold text-foreground mb-2">Çözüm Adımları</h4>
            <ol className="space-y-2">
              {sorun.cozumAdimlar.map((adim, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="mt-0.5">{adim}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* İlgili Makale */}
          {sorun.ilgiliSayfa && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <Link
                href={sorun.ilgiliSayfa}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                İlgili Makale
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
