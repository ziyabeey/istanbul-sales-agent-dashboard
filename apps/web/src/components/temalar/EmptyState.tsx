'use client'

import { SearchX, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  onSifirla: () => void
}

export default function EmptyState({ onSifirla }: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <SearchX className="w-12 h-12 text-white/20 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">
        Aramanızla eşleşen tasarım bulunamadı
      </h3>
      <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">
        Farklı filtreler deneyin veya AI ile kendi tasarımınızı oluşturun.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onSifirla}
          className="px-5 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Filtreleri Temizle
        </button>
        <Link
          href="/onboarding"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-rust text-white text-sm font-medium hover:bg-rust/90 transition-colors"
        >
          AI ile Oluştur
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
