'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Loader2, FileText } from 'lucide-react'
import { TALEP_KATEGORILERI } from '@/data/destekTalepConfig'

interface KBOneri {
  baslik: string
  href: string
  ozet: string
}

export default function TalepFormu() {
  const router = useRouter()
  const [form, setForm] = useState({
    ad: '',
    eposta: '',
    telefon: '',
    kategori: '',
    konu: '',
    aciklama: '',
  })
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState('')
  const [oneriler, setOneriler] = useState<KBOneri[]>([])

  // Debounced KB suggestions
  useEffect(() => {
    const metin = `${form.konu} ${form.aciklama}`.trim()
    if (metin.length < 5) {
      setOneriler([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/destek/talep/oneri', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metin }),
        })
        const data = await res.json()
        if (data.ok) setOneriler(data.oneriler || [])
      } catch { /* ignore */ }
    }, 500)

    return () => clearTimeout(timer)
  }, [form.konu, form.aciklama])

  const gonder = useCallback(async () => {
    setHata('')

    if (!form.ad || !form.eposta || !form.kategori || !form.konu || !form.aciklama) {
      setHata('Lütfen tüm zorunlu alanları doldurun.')
      return
    }
    if (form.konu.length < 5) {
      setHata('Konu en az 5 karakter olmalıdır.')
      return
    }
    if (form.aciklama.length < 20) {
      setHata('Açıklama en az 20 karakter olmalıdır.')
      return
    }

    setYukleniyor(true)
    try {
      const res = await fetch('/api/destek/talep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        router.push(`/destek/talep/olusturuldu?referans=${data.referans}`)
      } else {
        setHata(data.hata || 'Bir hata oluştu.')
      }
    } catch {
      setHata('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setYukleniyor(false)
    }
  }, [form, router])

  const guncelle = (alan: string, deger: string) => {
    setForm((prev) => ({ ...prev, [alan]: deger }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ad Soyad *</label>
              <input
                type="text"
                value={form.ad}
                onChange={(e) => guncelle('ad', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">E-posta *</label>
              <input
                type="email"
                value={form.eposta}
                onChange={(e) => guncelle('eposta', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Telefon <span className="text-muted-foreground">(opsiyonel)</span></label>
              <input
                type="tel"
                value={form.telefon}
                onChange={(e) => guncelle('telefon', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="05XX XXX XX XX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kategori *</label>
              <select
                value={form.kategori}
                onChange={(e) => guncelle('kategori', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white"
              >
                <option value="">Seçiniz...</option>
                {TALEP_KATEGORILERI.map((kat) => (
                  <option key={kat.id} value={kat.id}>{kat.etiket}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Konu *</label>
            <input
              type="text"
              value={form.konu}
              onChange={(e) => guncelle('konu', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Sorununuzu kısaca özetleyin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Açıklama * <span className="text-muted-foreground">({form.aciklama.length}/20 min)</span>
            </label>
            <textarea
              value={form.aciklama}
              onChange={(e) => guncelle('aciklama', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
              placeholder="Sorununuzu detaylı olarak açıklayın. Ne zaman başladı? Hangi adımları denediniz?"
            />
          </div>

          {hata && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {hata}
            </div>
          )}

          <button
            onClick={gonder}
            disabled={yukleniyor}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {yukleniyor ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</>
            ) : (
              <><Send className="w-4 h-4" /> Talep Gönder</>
            )}
          </button>
        </div>
      </div>

      {/* KB Suggestions Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Belki bu makaleler yardımcı olabilir</h3>
          </div>
          {oneriler.length > 0 ? (
            <ul className="space-y-3">
              {oneriler.map((oneri, i) => (
                <li key={i}>
                  <a
                    href={oneri.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <p className="text-sm font-medium text-foreground">{oneri.baslik}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{oneri.ozet}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">
              Konunuzu yazmaya başladığınızda ilgili yardım makaleleri burada görünecek.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
