'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { TUM_DESTEK_SAYFALARI, type AranabilirSayfa } from '@/data/destekMakaleleri'

export default function AramaCubugu() {
  const [sorgu, setSorgu] = useState('')
  const [acik, setAcik] = useState(false)

  const sonuclar = useMemo(() => {
    if (sorgu.length < 2) return []
    const q = sorgu.toLowerCase()
    return TUM_DESTEK_SAYFALARI.filter(
      (s) =>
        s.baslik.toLowerCase().includes(q) ||
        s.ozet.toLowerCase().includes(q) ||
        s.anahtarlar.some((a) => a.toLowerCase().includes(q))
    ).slice(0, 6)
  }, [sorgu])

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={sorgu}
          onChange={(e) => { setSorgu(e.target.value); setAcik(true) }}
          onFocus={() => setAcik(true)}
          onBlur={() => setTimeout(() => setAcik(false), 200)}
          placeholder="Nasıl yapılır? Ne arıyorsunuz?"
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {acik && sonuclar.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          {sonuclar.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex flex-col px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <span className="text-sm font-medium text-foreground">{s.baslik}</span>
              <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{s.ozet}</span>
            </Link>
          ))}
        </div>
      )}

      {acik && sorgu.length >= 2 && sonuclar.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-5 text-center">
          <p className="text-sm text-muted-foreground">Sonuç bulunamadı. Farklı bir anahtar kelime deneyin.</p>
        </div>
      )}
    </div>
  )
}
