'use client'

import { Search } from 'lucide-react'

interface TemaHeroProps {
  aramaValue: string
  onAramaChange: (val: string) => void
  toplamSayi: number
}

export default function TemaHero({ aramaValue, onAramaChange, toplamSayi }: TemaHeroProps) {
  return (
    <section className="bg-[#0F0F1A] pt-32 pb-16 px-4">
      <div className="max-w-[700px] mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Sektörüne Uygun{' '}
          <span className="text-rust">Şablonu</span>{' '}
          Keşfet
        </h1>
        <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
          {toplamSayi}+ profesyonel tasarım. Seç, özelleştir, yayınla.
        </p>

        {/* Arama */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Sektör, stil veya tema adı ara..."
            value={aramaValue}
            onChange={(e) => onAramaChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rust/50 focus:ring-1 focus:ring-rust/50 transition-all"
            aria-label="Tema ara"
          />
        </div>

        {/* İstatistikler */}
        <div className="flex gap-4 justify-center text-sm text-white/30">
          <span>{toplamSayi}+ Tasarım</span>
          <span>·</span>
          <span>29 Sektör</span>
          <span>·</span>
          <span>12 Stil</span>
        </div>
      </div>
    </section>
  )
}
