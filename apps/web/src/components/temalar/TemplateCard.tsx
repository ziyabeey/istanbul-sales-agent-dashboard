'use client'

import { motion } from 'framer-motion'
import { Eye, Edit3 } from 'lucide-react'
import type { TemaKartiItem } from '@/types/temaKatalogu'

const PAKET_RENK: Record<string, { bg: string; text: string; border: string }> = {
  TEMEL: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.25)' },
  STANDART: { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
  BUYUME: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  PREMIUM: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.25)' },
  PREMIUMPLUS: { bg: 'rgba(236,72,153,0.12)', text: '#ec4899', border: 'rgba(236,72,153,0.25)' },
}

interface TemplateCardProps {
  tema: TemaKartiItem
  previewHtml?: string
  onOnizle: () => void
}

export default function TemplateCard({ tema, previewHtml, onOnizle }: TemplateCardProps) {
  const paketRenk = PAKET_RENK[tema.minPaket] || PAKET_RENK.TEMEL

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="template-card group relative bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300"
      onClick={onOnizle}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
        {previewHtml ? (
          /* Canlı iframe preview */
          <div
            className="absolute inset-0 origin-top-left"
            style={{ width: '400%', height: '400%', transform: 'scale(0.25)', transformOrigin: 'top left' }}
          >
            <iframe
              className="w-full h-full border-none pointer-events-none"
              srcDoc={previewHtml}
              title={`${tema.ad} Önizleme`}
              tabIndex={-1}
              loading="lazy"
              sandbox="allow-same-origin"
              style={{ background: '#fff' }}
            />
          </div>
        ) : (
          /* Gradient placeholder */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: tema.thumbnailGradient }}
          >
            <span className="text-4xl opacity-60">{tema.sektorEmoji}</span>
          </div>
        )}

        {/* Paket badge — sağ üst */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md border backdrop-blur-md"
            style={{ background: paketRenk.bg, color: paketRenk.text, borderColor: paketRenk.border }}
          >
            {tema.minPaket}
          </span>
        </div>

        {/* Yeni badge — sol üst */}
        {tema.yeni && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
              Yeni
            </span>
          </div>
        )}

        {/* Popüler badge — sol üst (yeni yoksa) */}
        {tema.populer && !tema.yeni && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-white">
              Popüler
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="template-card-overlay absolute inset-0 bg-black/40 flex items-center justify-center gap-3 z-10">
          <button
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
            onClick={(e) => { e.stopPropagation(); onOnizle() }}
            aria-label="Önizle"
          >
            <Eye className="w-4 h-4" />
            Önizle
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-2 bg-rust text-white rounded-lg text-sm font-medium hover:bg-rust/90 transition-colors"
            onClick={(e) => { e.stopPropagation(); onOnizle() }}
            aria-label="Bu temayı seç"
          >
            <Edit3 className="w-4 h-4" />
            Seç
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 border-t border-white/[0.04]">
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="text-lg">{tema.sektorEmoji}</span>
          <h3 className="text-sm font-bold text-white group-hover:text-rust transition-colors line-clamp-1 flex-1">
            {tema.ad}
          </h3>
        </div>
        <p className="text-white/40 text-[11px] line-clamp-1 leading-relaxed mb-2">
          {tema.sektorAd} · {tema.temaStilAd}
        </p>
        {/* Renk önizleme */}
        <div className="flex gap-1.5">
          {tema.thumbnailRenkler.map((renk, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm border border-white/10"
              style={{ background: renk }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
