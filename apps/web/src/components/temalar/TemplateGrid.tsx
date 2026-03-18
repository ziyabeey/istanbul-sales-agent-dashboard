'use client'

import { AnimatePresence } from 'framer-motion'
import type { TemaKartiItem } from '@/types/temaKatalogu'
import TemplateCard from './TemplateCard'

interface TemplateGridProps {
  temalar: TemaKartiItem[]
  previewCache: Record<string, string>
  onOnizle: (tema: TemaKartiItem) => void
}

export default function TemplateGrid({ temalar, previewCache, onOnizle }: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {temalar.map((tema) => (
          <TemplateCard
            key={tema.id}
            tema={tema}
            previewHtml={tema.gercekSablonId ? previewCache[tema.gercekSablonId] : undefined}
            onOnizle={() => onOnizle(tema)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
