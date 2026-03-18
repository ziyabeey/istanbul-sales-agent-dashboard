'use client'

import { SEKTOR_FILTRELERI } from '@/data/temaKatalogu'

interface SektorPillsProps {
  aktifSektor: string
  onSektorChange: (val: string) => void
  sektorSayilari: Record<string, number>
}

export default function SektorPills({ aktifSektor, onSektorChange, sektorSayilari }: SektorPillsProps) {
  return (
    <div className="relative mt-8 mb-4">
      <div className="overflow-x-auto flex gap-2 pb-2 hide-scrollbar">
        {/* Tümü pill */}
        <button
          onClick={() => onSektorChange('')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            !aktifSektor
              ? 'border-rust bg-rust/10 text-rust'
              : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
          }`}
          aria-label="Tüm sektörler"
        >
          Tümü
        </button>

        {SEKTOR_FILTRELERI.map((s) => (
          <button
            key={s.value}
            onClick={() => onSektorChange(s.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              aktifSektor === s.value
                ? 'border-rust bg-rust/10 text-rust'
                : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
            }`}
            aria-label={s.label}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Sağ kenar gradient */}
      <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#0F0F1A] to-transparent pointer-events-none" />
    </div>
  )
}
