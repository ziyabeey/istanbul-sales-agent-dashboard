'use client'

import { useState, useCallback } from 'react'
import { Send, Loader2, User, Headphones, Bot } from 'lucide-react'

interface Mesaj {
  id: string
  gonderilenId: string
  gonderilenTip: 'customer' | 'agent' | 'ai'
  icerik: string
  tarih: string
}

interface TalepMesajlarProps {
  talepId: string
  mesajlar: Mesaj[]
  eposta: string
}

const TIP_IKONU = {
  customer: User,
  agent: Headphones,
  ai: Bot,
}

const TIP_ETIKET = {
  customer: 'Siz',
  agent: 'Destek Ekibi',
  ai: 'AI Asistan',
}

export default function TalepMesajlar({ talepId, mesajlar: ilkMesajlar, eposta }: TalepMesajlarProps) {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>(ilkMesajlar)
  const [yeniMesaj, setYeniMesaj] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)

  const gonder = useCallback(async () => {
    if (!yeniMesaj.trim()) return

    setYukleniyor(true)
    try {
      const res = await fetch(`/api/destek/talep/${talepId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gonderilenId: eposta, icerik: yeniMesaj.trim() }),
      })
      const data = await res.json()
      if (data.ok && data.mesaj) {
        setMesajlar((prev) => [...prev, data.mesaj])
        setYeniMesaj('')
      }
    } catch { /* ignore */ }
    finally {
      setYukleniyor(false)
    }
  }, [yeniMesaj, talepId, eposta])

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold font-syne text-foreground mb-4">Mesajlar</h3>

      {mesajlar.length === 0 ? (
        <p className="text-sm text-muted-foreground bg-gray-50 rounded-xl p-4">
          Henüz mesaj yok. Aşağıdan mesaj göndererek ekibimizle iletişime geçebilirsiniz.
        </p>
      ) : (
        <div className="space-y-3 mb-6">
          {mesajlar.map((m) => {
            const Icon = TIP_IKONU[m.gonderilenTip]
            const isCustomer = m.gonderilenTip === 'customer'
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isCustomer ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCustomer ? 'bg-primary/10' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-4 h-4 ${isCustomer ? 'text-primary' : 'text-gray-600'}`} />
                </div>
                <div className={`max-w-[75%] ${isCustomer ? 'text-right' : ''}`}>
                  <div className={`inline-block px-4 py-2.5 rounded-2xl text-sm ${
                    isCustomer
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-gray-100 text-foreground rounded-tl-sm'
                  }`}>
                    {m.icerik}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {TIP_ETIKET[m.gonderilenTip]} — {new Date(m.tarih).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* New message input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={yeniMesaj}
          onChange={(e) => setYeniMesaj(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !yukleniyor && gonder()}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
          placeholder="Mesajınızı yazın..."
          disabled={yukleniyor}
        />
        <button
          onClick={gonder}
          disabled={yukleniyor || !yeniMesaj.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {yukleniyor ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
