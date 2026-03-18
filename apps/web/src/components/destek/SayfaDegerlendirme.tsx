'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

export default function SayfaDegerlendirme() {
  const [durum, setDurum] = useState<'bekleniyor' | 'evet' | 'hayir'>('bekleniyor')

  if (durum !== 'bekleniyor') {
    return (
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-muted-foreground">
          {durum === 'evet' ? 'Geri bildiriminiz için teşekkürler!' : 'Geri bildiriminiz için teşekkürler. İyileştirmeye devam ediyoruz.'}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
      <p className="text-sm text-foreground font-medium mb-3">Bu sayfa yardımcı oldu mu?</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setDurum('evet')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-sm font-medium transition-colors"
        >
          <ThumbsUp className="w-4 h-4" /> Evet
        </button>
        <button
          onClick={() => setDurum('hayir')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
        >
          <ThumbsDown className="w-4 h-4" /> Hayır
        </button>
      </div>
    </div>
  )
}
