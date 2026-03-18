'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'

interface Gider {
    id: string
    kategori: string
    tutar: number
    aciklama: string
    tarih: string
}

interface CariHesap {
    id: string
    musteriAd: string
    musteriTelefon: string
    tutar: number
    aciklama: string
    durum: string
    vadeTarihi?: string
}

interface Bilanco {
    toplamGelir: number
    toplamGider: number
    netKar: number
    toplamAlacak: number
    reklamHarcanan: number
    donem: string
    giderler: Gider[]
    acikHesaplar: CariHesap[]
}

export default function FinansPage() {
    const router = useRouter()
    const { esnafId } = useEsnaf()
    const [bilanco, setBilanco] = useState<Bilanco | null>(null)
    const [loading, setLoading] = useState(true)
    const [aktifSekme, setAktifSekme] = useState<'ozet' | 'giderler' | 'alacaklar'>('ozet')

    // Modals
    const [giderModalAcik, setGiderModalAcik] = useState(false)
    const [cariModalAcik, setCariModalAcik] = useState(false)

    // Form States
    const [giderForm, setGiderForm] = useState({ kategori: 'Malzeme', tutar: '', aciklama: '' })
    const [cariForm, setCariForm] = useState({ musteriAd: '', musteriTelefon: '', tutar: '', aciklama: '' })
    const [islemKaydediliyor, setIslemKaydediliyor] = useState(false)

    const fetchBilanco = async () => {
        if (!esnafId) return
        try {
            const res = await fetch(`/api/finans/bilanco?esnafId=${esnafId}`)
            if (res.ok) {
                const data = await res.json()
                setBilanco(data.bilanco)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBilanco()
    }, [esnafId])

    const handleGiderKaydet = async (e: React.FormEvent) => {
        e.preventDefault()
        setIslemKaydediliyor(true)
        try {
            await fetch('/api/finans/gider-ekle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, ...giderForm })
            })
            setGiderModalAcik(false)
            setGiderForm({ kategori: 'Malzeme', tutar: '', aciklama: '' })
            await fetchBilanco()
        } catch (error) {
            console.error(error)
        }
        setIslemKaydediliyor(false)
    }

    const handleCariKaydet = async (e: React.FormEvent) => {
        e.preventDefault()
        setIslemKaydediliyor(true)
        try {
            await fetch('/api/finans/cari-hesap-ekle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, ...cariForm })
            })
            setCariModalAcik(false)
            setCariForm({ musteriAd: '', musteriTelefon: '', tutar: '', aciklama: '' })
            await fetchBilanco()
        } catch (error) {
            console.error(error)
        }
        setIslemKaydediliyor(false)
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4 pb-24 border-t border-dgray-light/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 mt-2">
                <div>
                    <button onClick={() => router.back()} className="text-muted-foreground text-xs uppercase tracking-widest mb-1 hover:text-foreground">
                        ← Geri
                    </button>
                    <h1 className="text-foreground font-syne font-bold text-2xl">Ön Muhasebe</h1>
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse space-y-3 mt-6">
                    <div className="h-32 bg-card rounded-xl"></div>
                    <div className="h-24 bg-card rounded-xl"></div>
                </div>
            ) : bilanco ? (
                <>
                    {/* Bilanço Özeti Kartı */}
                    <div className="bg-rust/5 border border-rust/20 rounded-2xl p-5 mb-6 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-rust/10 rounded-full blur-2xl"></div>
                        <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-1">
                            Aylık Net Kâr ({bilanco.donem})
                        </p>
                        <p className={`text-4xl font-syne font-extrabold ${bilanco.netKar >= 0 ? 'text-sage' : 'text-red-400'}`}>
                            ₺{bilanco.netKar.toLocaleString('tr-TR')}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-border/10">
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Brüt Gelir</p>
                                <p className="text-foreground font-bold text-lg">₺{bilanco.toplamGelir.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Toplam Gider</p>
                                <p className="text-rust font-bold text-lg">₺{bilanco.toplamGider.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sekmeler */}
                    <div className="flex bg-card rounded-xl p-1 gap-1 mb-4">
                        {[
                            { id: 'ozet', label: 'Genel Durum' },
                            { id: 'giderler', label: 'Giderler' },
                            { id: 'alacaklar', label: 'Veresiye' }
                        ].map(sekme => (
                            <button
                                key={sekme.id}
                                onClick={() => setAktifSekme(sekme.id as any)}
                                className={`flex-1 py-2 rounded-lg text-xs font-syne font-bold transition-all ${aktifSekme === sekme.id ? 'bg-warm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {sekme.label}
                            </button>
                        ))}
                    </div>

                    {/* SEKMELER İÇERİĞİ */}
                    {aktifSekme === 'ozet' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-card border border-border/30 rounded-xl p-4 cursor-pointer hover:border-rust/50 transition" onClick={() => setAktifSekme('alacaklar')}>
                                    <p className="text-gold text-[10px] uppercase font-bold tracking-widest">Bekleyen Alacak</p>
                                    <p className="text-gold text-2xl font-syne font-extrabold mt-1">₺{bilanco.toplamAlacak.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{bilanco.acikHesaplar.length} Kalan Hesap</p>
                                </div>
                                <div className="bg-card border border-border/30 rounded-xl p-4">
                                    <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Reklam / Pazarlama</p>
                                    <p className="text-muted-foreground text-2xl font-syne font-extrabold mt-1">₺{bilanco.reklamHarcanan.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Son 30 Gün</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {aktifSekme === 'giderler' && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setGiderModalAcik(true)}
                                className="w-full bg-rust/10 text-rust border border-rust/20 py-3 rounded-xl font-bold text-sm hover:bg-rust hover:text-foreground transition"
                            >
                                + Yeni Gider Ekle
                            </button>
                            {bilanco.giderler.length === 0 ? (
                                <p className="text-center text-muted-foreground text-sm py-4">Kayıtlı gider bulunmuyor.</p>
                            ) : (
                                bilanco.giderler.map(g => (
                                    <div key={g.id} className="bg-card rounded-xl p-4 flex justify-between items-center border border-border/10">
                                        <div>
                                            <p className="text-foreground text-sm font-bold">{g.kategori}</p>
                                            <p className="text-muted-foreground text-xs">{g.aciklama}</p>
                                        </div>
                                        <p className="text-rust font-bold">₺{g.tutar}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {aktifSekme === 'alacaklar' && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setCariModalAcik(true)}
                                className="w-full bg-gold/10 text-gold border border-gold/20 py-3 rounded-xl font-bold text-sm hover:bg-gold hover:text-foreground transition"
                            >
                                + Veresiye (Açık Hesap) Ekle
                            </button>
                            {bilanco.acikHesaplar.length === 0 ? (
                                <p className="text-center text-muted-foreground text-sm py-4">Bekleyen alacak bulunmuyor.</p>
                            ) : (
                                bilanco.acikHesaplar.map(a => (
                                    <div key={a.id} className="bg-card rounded-xl p-4 flex justify-between items-center border border-border/10">
                                        <div>
                                            <p className="text-foreground text-sm font-bold">{a.musteriAd}</p>
                                            <p className="text-muted-foreground text-xs">{a.musteriTelefon}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gold font-bold">₺{a.tutar}</p>
                                            <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full mt-1 inline-block">Bekliyor</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* MODALLAR */}
                    {giderModalAcik && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                            <div className="bg-card w-full max-w-sm rounded-2xl p-6 border border-border relative">
                                <button onClick={() => setGiderModalAcik(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">✕</button>
                                <h2 className="text-lg font-syne font-bold text-foreground mb-4">Gider Kaydet</h2>
                                <form onSubmit={handleGiderKaydet} className="space-y-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">Kategori</label>
                                        <select
                                            value={giderForm.kategori}
                                            onChange={e => setGiderForm({ ...giderForm, kategori: e.target.value })}
                                            className="w-full bg-warm text-foreground p-3 rounded-xl"
                                        >
                                            {['Kira', 'Malzeme', 'Maaş', 'Fatura', 'Pazarlama', 'Diğer'].map(k => (
                                                <option key={k} value={k}>{k}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">Tutar (₺)</label>
                                        <input
                                            type="number"
                                            required
                                            value={giderForm.tutar}
                                            onChange={e => setGiderForm({ ...giderForm, tutar: e.target.value })}
                                            className="w-full bg-background text-foreground p-3 rounded-xl border border-border focus:border-rust outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">Açıklama</label>
                                        <input
                                            type="text"
                                            value={giderForm.aciklama}
                                            onChange={e => setGiderForm({ ...giderForm, aciklama: e.target.value })}
                                            className="w-full bg-background text-foreground p-3 rounded-xl border border-border focus:border-rust outline-none"
                                        />
                                    </div>
                                    <button disabled={islemKaydediliyor} type="submit" className="w-full bg-rust text-foreground py-3 rounded-xl font-bold mt-2">
                                        {islemKaydediliyor ? 'Kaydediliyor...' : 'Kaydet'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {cariModalAcik && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                            <div className="bg-card w-full max-w-sm rounded-2xl p-6 border border-border relative">
                                <button onClick={() => setCariModalAcik(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">✕</button>
                                <h2 className="text-lg font-syne font-bold text-foreground mb-4">Veresiye Ekle</h2>
                                <form onSubmit={handleCariKaydet} className="space-y-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">Müşteri Adı</label>
                                        <input
                                            type="text"
                                            required
                                            value={cariForm.musteriAd}
                                            onChange={e => setCariForm({ ...cariForm, musteriAd: e.target.value })}
                                            className="w-full bg-background text-foreground p-3 rounded-xl border border-border focus:border-gold outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">Telefon Numarası</label>
                                        <input
                                            type="tel"
                                            required
                                            value={cariForm.musteriTelefon}
                                            onChange={e => setCariForm({ ...cariForm, musteriTelefon: e.target.value })}
                                            className="w-full bg-background text-foreground p-3 rounded-xl border border-border focus:border-gold outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1 block">Tutar (₺)</label>
                                        <input
                                            type="number"
                                            required
                                            value={cariForm.tutar}
                                            onChange={e => setCariForm({ ...cariForm, tutar: e.target.value })}
                                            className="w-full bg-background text-foreground p-3 rounded-xl border border-border focus:border-gold outline-none"
                                        />
                                    </div>
                                    <button disabled={islemKaydediliyor} type="submit" className="w-full bg-gold text-foreground py-3 rounded-xl font-bold mt-2 hover:bg-gold/90">
                                        {islemKaydediliyor ? 'Ekleniyor...' : 'Hesabı Ekle'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                </>
            ) : null}
        </div>
    )
}
