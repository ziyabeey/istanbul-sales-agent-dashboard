'use client'

import { useRef } from 'react'
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import type { TemaKartiItem } from '@/types/temaKatalogu'

interface InspirationCarouselProps {
  temalar: TemaKartiItem[]
  onOnizle: (tema: TemaKartiItem) => void
}

export default function InspirationCarousel({ temalar, onOnizle }: InspirationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (temalar.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 360
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-10 mt-2">
      {/* Başlık */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rust" />
          <h2 className="text-lg font-bold text-white">İlham Al</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"
            aria-label="Sola kaydır"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"
            aria-label="Sağa kaydır"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="overflow-x-auto flex gap-5 snap-x snap-mandatory hide-scrollbar"
      >
        {temalar.map((tema) => (
          <div
            key={tema.id}
            onClick={() => onOnizle(tema)}
            className="inspirational-card min-w-[340px] max-w-[340px] snap-center bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden cursor-pointer hover:border-white/15 transition-all shrink-0"
          >
            {/* Görsel */}
            <div
              className="relative w-full aspect-[16/9]"
              style={{ background: tema.thumbnailGradient }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl opacity-40">{tema.sektorEmoji}</span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-rust text-white">
                  İlham Verici
                </span>
              </div>
            </div>

            {/* Bilgi */}
            <div className="p-4">
              <h3 className="text-sm font-bold text-white mb-1">{tema.ad}</h3>
              <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed mb-3">
                {tema.aciklama}
              </p>

              {/* Özellik pilleri */}
              <div className="flex flex-wrap gap-1.5">
                {tema.ozellikler.slice(0, 3).map((ozellik) => (
                  <span
                    key={ozellik}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/[0.06]"
                  >
                    {ozellik}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
