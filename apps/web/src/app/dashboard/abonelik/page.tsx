'use client'
import { useState } from 'react'
import { useEsnaf } from '@/context/EsnafContext'
import { PAKETLER } from '@/data/paketler'

export default function AbonelikPage() {
  const { esnaf } = useEsnaf()
  const [iptalModal, setIptalModal] = useState(false)
  const [iptalYukleniyor, setIptalYukleniyor] = useState(false)
  const [iptalSonGun, setIptalSonGun] = useState<string | null>(null)

  if (!esnaf) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="h-8 bg-card rounded-xl animate-pulse w-1/2 mb-4" />
        <div className="h-32 bg-card rounded-2xl animate-pulse mb-4" />
        <div className="h-24 bg-card rounded-2xl animate-pulse" />
      </div>
    )
  }

  const mevcutPaket = PAKETLER.find(p => p.id === esnaf.paket?.toLowerCase()) ?? PAKETLER[0]

  const getPaketRenk = (id: string) => {
    switch (id.toUpperCase()) {
      case 'TEMEL': return '#6b7280'
      case 'STANDART': return '#3b82f6'
      case 'BUYUME': return '#8b5cf6'
      case 'PREMIUM': return '#c04b1e'
      case 'PREMIUMPLUS': return '#d4a843'
      default: return '#6b7280'
    }
  }

  const yenilemeTarihi = esnaf.yenilenmeTarihi?.toDate?.()
  const kalanGun = yenilemeTarihi
    ? Math.ceil((yenilemeTarihi.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  const aktifModuller: string[] = (esnaf as any).aktifModuller ?? []
  const iptalTalebi: boolean = (esnaf as any).iptalTalebi === true

  async function handleIptal() {
    setIptalYukleniyor(true)
    try {
      const res = await fetch('/api/payment/iptal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ esnafId: esnaf!.id }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setIptalSonGun(data.sonGun)
        setIptalModal(false)
      }
    } catch {
      // hata kullanıcıya gösterilmez, modal açık kalır
    } finally {
      setIptalYukleniyor(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-5">
      <h1 className="text-foreground font-syne font-bold text-xl">Aboneliğim</h1>

      {/* Mevcut paket */}
      <div
        className="rounded-2xl p-5 border-2"
        style={{ borderColor: getPaketRenk(mevcutPaket.id) + '60' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Mevcut Paket</p>
            <p className="text-foreground font-syne font-extrabold text-2xl mt-0.5">
              {mevcutPaket.name}
            </p>
          </div>
          <div
            className="text-2xl font-syne font-extrabold"
            style={{ color: getPaketRenk(mevcutPaket.id) }}
          >
            ₺{mevcutPaket.aylikFiyat}
            <span className="text-muted-foreground text-sm font-normal">/ay</span>
          </div>
        </div>

        {/* İptal talebi uyarısı */}
        {(iptalTalebi || iptalSonGun) && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 mt-2">
            <p className="text-red-400 text-sm">
              İptal talebi işlendi. Hizmet{' '}
              <span className="font-bold">
                {iptalSonGun
                  ? new Date(iptalSonGun).toLocaleDateString('tr-TR')
                  : yenilemeTarihi?.toLocaleDateString('tr-TR') ?? 'dönem sonu'}
              </span>{' '}
              tarihine kadar aktif.
            </p>
          </div>
        )}

        {kalanGun !== null && !iptalTalebi && !iptalSonGun && (
          <div className="bg-warm rounded-xl px-4 py-2.5">
            <p className="text-foreground text-sm">
              <span className="font-bold">{kalanGun} gün</span> kaldı
              {yenilemeTarihi && (
                <span className="text-muted-foreground ml-2">
                  ({yenilemeTarihi.toLocaleDateString('tr-TR')} yenileniyor)
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Aktif modüller */}
      {aktifModuller.length > 0 && (
        <div className="bg-card rounded-2xl p-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">
            Aktif Özellikler
          </p>
          <div className="flex flex-wrap gap-2">
            {aktifModuller.map((m: string) => (
              <span
                key={m}
                className="text-xs bg-warm text-foreground px-3 py-1 rounded-full"
              >
                ✓ {m.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Üst pakete geçiş — iptal talebi yoksa göster */}
      {mevcutPaket.id !== 'PREMIUMPLUS' && !iptalTalebi && !iptalSonGun && (
        <div className="bg-card rounded-2xl p-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">
            Paket Yükselt
          </p>
          <div className="space-y-2">
            {PAKETLER.filter(p => p.aylikFiyat > mevcutPaket.aylikFiyat).map(p => (
              <a
                key={p.id}
                href={`/odeme?paket=${p.id}&esnafId=${esnaf.id}`}
                className="w-full flex items-center justify-between
                           border border-border rounded-xl px-4 py-3
                           hover:border-rust transition-all text-left block"
              >
                <div>
                  <p className="text-foreground text-sm font-syne font-bold">{p.name}</p>
                  <p className="text-muted-foreground text-xs">{p.teknoloji}</p>
                </div>
                <p className="text-rust font-syne font-bold text-sm">
                  ₺{p.aylikFiyat}/ay →
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Son ödeme */}
      <div className="bg-card rounded-2xl p-4">
        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Son Ödeme</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground text-sm">{mevcutPaket.name} Paketi</p>
            <p className="text-muted-foreground text-xs">
              {yenilemeTarihi
                ? new Date(yenilemeTarihi.getTime() - 30 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('tr-TR')
                : '-'}
            </p>
          </div>
          <p className="text-foreground font-bold">₺{mevcutPaket.aylikFiyat}</p>
        </div>
      </div>

      {/* İptal butonu — zaten iptal talep edilmemişse göster */}
      {!iptalTalebi && !iptalSonGun && (
        <button
          onClick={() => setIptalModal(true)}
          className="w-full text-muted-foreground text-sm py-3 border border-border
                     rounded-xl hover:border-red-500 hover:text-red-400 transition-all"
        >
          Aboneliği İptal Et
        </button>
      )}

      {/* İptal Modal */}
      {iptalModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end z-50 px-4 pb-6">
          <div className="w-full max-w-md mx-auto bg-card rounded-2xl p-6 space-y-4">
            <h3 className="text-foreground font-syne font-bold text-lg">
              Aboneliği İptal Et
            </h3>
            <p className="text-muted-foreground text-sm">
              Aboneliğiniz{' '}
              {yenilemeTarihi?.toLocaleDateString('tr-TR') ?? 'dönem sonu'}{' '}
              tarihine kadar aktif kalır. İptal sonrası yenileme yapılmaz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIptalModal(false)}
                disabled={iptalYukleniyor}
                className="flex-1 border border-border text-muted-foreground py-3 rounded-xl text-sm disabled:opacity-50"
              >
                Vazgeç
              </button>
              <button
                onClick={handleIptal}
                disabled={iptalYukleniyor}
                className="flex-1 bg-red-600 text-foreground font-bold py-3 rounded-xl
                           text-sm disabled:opacity-60"
              >
                {iptalYukleniyor ? 'İşleniyor...' : 'İptal İste'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
