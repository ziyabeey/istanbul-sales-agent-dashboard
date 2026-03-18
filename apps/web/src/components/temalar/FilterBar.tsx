'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'
import type { TemalarFiltreleri, FiltreSecenegi } from '@/types/temaKatalogu'
import {
  PAKET_FILTRELERI,
  STIL_FILTRELERI,
  SITE_TIPI_FILTRELERI,
  OZELLIK_FILTRELERI,
} from '@/data/temaKatalogu'

interface FilterBarProps {
  filtreler: TemalarFiltreleri
  filtreGuncelle: (key: keyof TemalarFiltreleri, value: string) => void
  filtreleriSifirla: () => void
  aktifFiltreSayisi: number
  toplamSonuc: number
}

interface DropdownProps {
  label: string
  options: FiltreSecenegi[]
  value: string
  onChange: (val: string) => void
}

function FilterDropdown({ label, options, value, onChange }: DropdownProps) {
  const [acik, setAcik] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Dışına tıklayınca kapat
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAcik(false)
    }
    if (acik) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [acik])

  const aktifLabel = value ? options.find(o => o.value === value)?.label : null

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setAcik(!acik)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
          value
            ? 'border-rust/30 bg-rust/10 text-rust'
            : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
        }`}
        aria-expanded={acik}
        aria-haspopup="listbox"
      >
        {aktifLabel || label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${acik ? 'rotate-180' : ''}`} />
      </button>

      {acik && (
        <div className="dropdown-enter absolute top-full mt-1 bg-[#1a1a2e] rounded-xl shadow-lg border border-white/10 py-2 min-w-[180px] z-20">
          {/* Temizle seçeneği */}
          {value && (
            <button
              onClick={() => { onChange(''); setAcik(false) }}
              className="w-full px-4 py-2.5 text-sm text-left text-white/40 hover:bg-white/5 transition-colors"
            >
              Tümü
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setAcik(false) }}
              className={`w-full px-4 py-2.5 text-sm text-left transition-colors flex items-center gap-2 ${
                value === opt.value
                  ? 'bg-rust/10 text-rust font-medium'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              }`}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.emoji && <span>{opt.emoji}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FilterBar({
  filtreler,
  filtreGuncelle,
  filtreleriSifirla,
  aktifFiltreSayisi,
  toplamSonuc,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 mt-4">
      <FilterDropdown
        label="Paket"
        options={PAKET_FILTRELERI}
        value={filtreler.paket}
        onChange={(v) => filtreGuncelle('paket', v)}
      />
      <FilterDropdown
        label="Tasarım Stili"
        options={STIL_FILTRELERI}
        value={filtreler.stil}
        onChange={(v) => filtreGuncelle('stil', v)}
      />
      <FilterDropdown
        label="Site Tipi"
        options={SITE_TIPI_FILTRELERI}
        value={filtreler.siteTipi}
        onChange={(v) => filtreGuncelle('siteTipi', v)}
      />
      <FilterDropdown
        label="Özellik"
        options={OZELLIK_FILTRELERI}
        value={filtreler.ozellik}
        onChange={(v) => filtreGuncelle('ozellik', v)}
      />

      {/* Sonuç sayısı + temizle */}
      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-white/30">{toplamSonuc} tasarım bulundu</span>
        {aktifFiltreSayisi > 0 && (
          <button
            onClick={filtreleriSifirla}
            className="flex items-center gap-1 text-xs text-rust hover:text-rust/80 font-medium transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Filtreleri Temizle
          </button>
        )}
      </div>
    </div>
  )
}
