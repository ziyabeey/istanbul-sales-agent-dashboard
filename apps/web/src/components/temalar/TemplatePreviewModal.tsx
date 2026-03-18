'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import type { TemaKartiItem } from '@/types/temaKatalogu'

const PAKET_RENK: Record<string, { bg: string; text: string; border: string }> = {
  TEMEL: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.25)' },
  STANDART: { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
  BUYUME: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  PREMIUM: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.25)' },
  PREMIUMPLUS: { bg: 'rgba(236,72,153,0.12)', text: '#ec4899', border: 'rgba(236,72,153,0.25)' },
}

interface TemplatePreviewModalProps {
  tema: TemaKartiItem | null
  previewHtml: string | null
  onClose: () => void
}

export default function TemplatePreviewModal({ tema, previewHtml, onClose }: TemplatePreviewModalProps) {
  return (
    <AnimatePresence>
      {tema && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col"
        >
          {/* Üst Bar */}
          <div className="flex items-center justify-between px-4 md:px-6 h-14 bg-[#111] border-b border-white/10 shrink-0 z-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Şablonlara Dön</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-lg">{tema.sektorEmoji}</span>
              <span className="text-white font-bold text-sm md:text-base line-clamp-1">
                {tema.ad}
              </span>
              <span
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border hidden sm:inline"
                style={{
                  background: (PAKET_RENK[tema.minPaket] || PAKET_RENK.TEMEL).bg,
                  color: (PAKET_RENK[tema.minPaket] || PAKET_RENK.TEMEL).text,
                  borderColor: (PAKET_RENK[tema.minPaket] || PAKET_RENK.TEMEL).border,
                }}
              >
                {tema.minPaket}
              </span>
            </div>

            <button
              onClick={() => window.location.href = '/onboarding'}
              className="bg-rust hover:bg-rust/90 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-all group"
            >
              <span className="hidden sm:inline">Ücretsiz Düzenle</span>
              <span className="sm:hidden">Düzenle</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Demo iframe */}
          <div className="flex-1 relative">
            {previewHtml ? (
              <iframe
                className="w-full h-full border-none absolute inset-0"
                srcDoc={previewHtml}
                title={`${tema.ad} Demo`}
                style={{ background: '#fff' }}
              />
            ) : (
              /* Gradient fallback */
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: tema.thumbnailGradient }}
              >
                <div className="text-center">
                  <span className="text-6xl block mb-4">{tema.sektorEmoji}</span>
                  <h2 className="text-2xl font-bold text-white mb-2">{tema.ad}</h2>
                  <p className="text-white/50 text-sm max-w-md">{tema.aciklama}</p>
                  <p className="text-white/30 text-xs mt-6">
                    Canlı önizleme bu şablon için yakında eklenecek.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
