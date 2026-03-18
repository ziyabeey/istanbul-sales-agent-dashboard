'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'

export default function TalepTakipFormu() {
  const router = useRouter()
  const [referans, setReferans] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')

  const ara = useCallback(async () => {
    setHata('')
    const temiz = referans.trim().toUpperCase()
    if (!temiz) {
      setHata('Referans numarası giriniz.')
      return
    }

    setYukleniyor(true)
    try {
      const res = await fetch('/api/destek/talep/ara', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referans: temiz }),
      })
      const data = await res.json()
      if (data.ok && data.talep) {
        router.push(`/destek/talep/takip/${data.talep.id}`)
      } else {
        setHata(data.hata || 'Talep bulunamadı.')
      }
    } catch {
      setHata('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setYukleniyor(false)
    }
  }, [referans, router])

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold font-syne text-foreground mb-4">Talep Takip</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Destek talebinizi oluştururken aldığınız referans numarasını girin (ör: KPNK-A3F8).
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={referans}
            onChange={(e) => setReferans(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ara()}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors uppercase"
            placeholder="KPNK-XXXX"
          />
          <button
            onClick={ara}
            disabled={yukleniyor}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {yukleniyor ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Ara
          </button>
        </div>

        {hata && (
          <p className="mt-3 text-sm text-red-600">{hata}</p>
        )}
      </div>
    </div>
  )
}
