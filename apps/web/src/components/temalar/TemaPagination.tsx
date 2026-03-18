'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TemaPaginationProps {
  sayfa: number
  toplamSayfa: number
  onSayfaDegistir: (sayfa: number) => void
}

export default function TemaPagination({ sayfa, toplamSayfa, onSayfaDegistir }: TemaPaginationProps) {
  if (toplamSayfa <= 1) return null

  // Sayfa numaralarını hesapla
  const sayfalar: (number | '...')[] = []
  if (toplamSayfa <= 7) {
    for (let i = 1; i <= toplamSayfa; i++) sayfalar.push(i)
  } else {
    sayfalar.push(1)
    if (sayfa > 3) sayfalar.push('...')

    const baslangic = Math.max(2, sayfa - 1)
    const bitis = Math.min(toplamSayfa - 1, sayfa + 1)
    for (let i = baslangic; i <= bitis; i++) sayfalar.push(i)

    if (sayfa < toplamSayfa - 2) sayfalar.push('...')
    sayfalar.push(toplamSayfa)
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-6">
      {/* Önceki */}
      <button
        onClick={() => onSayfaDegistir(sayfa - 1)}
        disabled={sayfa === 1}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Önceki sayfa"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Sayfa numaraları — Desktop */}
      <div className="hidden sm:flex gap-1">
        {sayfalar.map((s, i) =>
          s === '...' ? (
            <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-white/30 text-sm">
              ...
            </span>
          ) : (
            <button
              key={s}
              onClick={() => onSayfaDegistir(s)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                sayfa === s
                  ? 'bg-rust text-white'
                  : 'text-white/50 hover:bg-white/5'
              }`}
              aria-label={`Sayfa ${s}`}
              aria-current={sayfa === s ? 'page' : undefined}
            >
              {s}
            </button>
          ),
        )}
      </div>

      {/* Mobile — basit gösterim */}
      <span className="sm:hidden text-sm text-white/50 font-medium px-3">
        {sayfa} / {toplamSayfa}
      </span>

      {/* Sonraki */}
      <button
        onClick={() => onSayfaDegistir(sayfa + 1)}
        disabled={sayfa === toplamSayfa}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Sonraki sayfa"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
