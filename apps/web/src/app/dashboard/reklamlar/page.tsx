'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'
import { toast } from 'sonner'
import {
    Megaphone, CircleDollarSign, Users, TrendingUp,
    Play, Pause, Gauge, Zap, ArrowRight, Info
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
//  SABİTLER
// ═══════════════════════════════════════════════════════════════════════════════

const MIN_BUTCE = 500
const MAX_BUTCE = 20000
const ADIM     = 250

// Basit benchmark metrikler (sektör ortalamaları, UI tahmin için)
const ORTALAMA_CPC_TL = 3.5   // Tıklama başı maliyet (TL)
const MESAJ_ORANI = 0.04       // Ziyaretçinin %4'ü mesaj atar
const MUSTERI_ORANI = 0.12     // Ziyaretçinin %12'si müşteriye döner

function tahminHesapla(aylikButce: number) {
    const tahminiTiklama = Math.round(aylikButce / ORTALAMA_CPC_TL)
    const tahminiMesaj = Math.round(tahminiTiklama * MESAJ_ORANI)
    const tahminiMusteri = Math.round(tahminiTiklama * MUSTERI_ORANI)
    return { tahminiTiklama, tahminiMesaj, tahminiMusteri }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HIZ GÖSTERGESİ (Speedometer) BİLEŞENİ
// ═══════════════════════════════════════════════════════════════════════════════

function HizGostergesi({ harcanan, gelenMusteri, butce }: { harcanan: number; gelenMusteri: number; butce: number }) {
    const oran = butce > 0 ? Math.min((harcanan / butce) * 100, 100) : 0
    const yuzde = Math.round(oran)
    const renkClass = yuzde < 40 ? 'text-emerald-400' : yuzde < 70 ? 'text-amber-400' : 'text-rose-400'
    const arcLength = 251.2 // Circle circumference (2πr where r=40)
    const dashOffset = arcLength - (arcLength * oran / 100)

    return (
        <div className="bg-background border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Performans Göstergesi</span>
            </div>

            <div className="flex items-center justify-around">
                {/* SVG Hız Göstergesi */}
                <div className="relative w-28 h-28">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke={yuzde < 40 ? '#34d399' : yuzde < 70 ? '#fbbf24' : '#f87171'}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={arcLength}
                            strokeDashoffset={dashOffset}
                            className="transition-all duration-700"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`font-syne font-bold text-2xl ${renkClass}`}>%{yuzde}</span>
                        <span className="text-muted-foreground text-[9px]">kullanıldı</span>
                    </div>
                </div>

                {/* Skor Kartları */}
                <div className="space-y-4">
                    <div>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Harcanan</p>
                        <p className="text-slate-100 font-syne font-bold text-xl">₺{harcanan.toLocaleString('tr-TR')}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Gelen Müşteri</p>
                        <p className="text-emerald-400 font-syne font-bold text-xl">{gelenMusteri}</p>
                    </div>
                    {gelenMusteri > 0 && (
                        <div>
                            <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Müşteri Başı</p>
                            <p className="text-amber-400 font-syne font-bold text-xl">
                                ₺{Math.round(harcanan / gelenMusteri).toLocaleString('tr-TR')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ANA SAYFA
// ═══════════════════════════════════════════════════════════════════════════════

export default function ReklamlarPage() {
    const router = useRouter()
    const { esnafId, esnaf } = useEsnaf()

    const [aylikButce, setAylikButce] = useState(2000)
    const [baslatiliyor, setBaslatiliyor] = useState(false)
    const [aktifKampanya, setAktifKampanya] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // Mevcut kampanyayı yükle
    useEffect(() => {
        if (!esnafId) return
        fetch(`/api/dashboard/reklamlar?esnafId=${esnafId}`)
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                const aktif = Array.isArray(data) ? data.find((r: any) => r.durum === 'aktif') : null
                setAktifKampanya(aktif || null)
            })
            .catch(() => { toast.error('Reklam verileri yüklenemedi') })
            .finally(() => setLoading(false))
    }, [esnafId])

    const tahmin = useMemo(() => tahminHesapla(aylikButce), [aylikButce])

    const handleBaslat = useCallback(async () => {
        if (!esnafId) return
        setBaslatiliyor(true)
        try {
            const res = await fetch('/api/reklam/kampanya', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, aylikButce }),
            })
            const data = await res.json()
            if (res.ok) {
                toast.success('🚀 Kampanya başlatıldı! AI reklam metinlerinizi hazırlıyor...', { duration: 5000 })
                setAktifKampanya({ durum: 'aktif', butce: aylikButce, harcanan: 0, gelenMusteri: 0 })
            } else {
                toast.error(data.error || 'Bir hata oluştu')
            }
        } catch {
            toast.error('Bağlantı hatası')
        } finally {
            setBaslatiliyor(false)
        }
    }, [esnafId, aylikButce])

    const handleDuraklat = useCallback(async () => {
        if (!esnafId || !aktifKampanya) return
        try {
            await fetch('/api/reklam/kampanya', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, aksiyon: 'duraklat' }),
            })
            setAktifKampanya(null)
            toast.info('Kampanya duraklatıldı')
        } catch { /* */ }
    }, [esnafId, aktifKampanya])

    if (loading) {
        return (
            <div className="p-6 max-w-lg mx-auto animate-pulse space-y-4">
                <div className="h-20 bg-background rounded-2xl" />
                <div className="h-60 bg-background rounded-2xl" />
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 max-w-lg mx-auto space-y-6 pb-24">
            {/* ── Header ──────────────────────────────────────────────── */}
            <div>
                <button onClick={() => router.back()} className="text-muted-foreground text-xs uppercase tracking-widest mb-2 hover:text-muted-foreground transition-colors">
                    ← Geri
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500/15 rounded-xl flex items-center justify-center">
                        <Megaphone className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                        <h1 className="font-syne font-bold text-xl text-slate-100">Reklam Motoru</h1>
                        <p className="text-muted-foreground text-xs">AI bütçenizi yönetir, siz müşterilere odaklanın</p>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                 AKTİF KAMPANYA YOKSA → BÜTÇE SLIDER
                 ═══════════════════════════════════════════════════════════ */}
            {!aktifKampanya ? (
                <>
                    {/* ── Bütçe Slider Kartı ──────────────────────────────── */}
                    <div className="bg-background border border-border/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <CircleDollarSign className="w-4 h-4 text-emerald-400" />
                                <span className="text-muted-foreground font-semibold text-sm">Aylık Bütçe</span>
                            </div>
                            <span className="text-emerald-400 font-syne font-bold text-2xl">
                                ₺{aylikButce.toLocaleString('tr-TR')}
                            </span>
                        </div>

                        {/* Slider */}
                        <input
                            type="range"
                            min={MIN_BUTCE}
                            max={MAX_BUTCE}
                            step={ADIM}
                            value={aylikButce}
                            onChange={e => setAylikButce(Number(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer
                                       bg-card
                                       [&::-webkit-slider-thumb]:appearance-none
                                       [&::-webkit-slider-thumb]:w-6
                                       [&::-webkit-slider-thumb]:h-6
                                       [&::-webkit-slider-thumb]:rounded-full
                                       [&::-webkit-slider-thumb]:bg-emerald-400
                                       [&::-webkit-slider-thumb]:shadow-lg
                                       [&::-webkit-slider-thumb]:shadow-emerald-400/30
                                       [&::-webkit-slider-thumb]:border-2
                                       [&::-webkit-slider-thumb]:border-emerald-300
                                       [&::-webkit-slider-thumb]:transition-all
                                       [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                        <div className="flex justify-between mt-2 text-slate-700 text-[10px] font-mono">
                            <span>₺{MIN_BUTCE.toLocaleString('tr-TR')}</span>
                            <span>₺{MAX_BUTCE.toLocaleString('tr-TR')}</span>
                        </div>

                        {/* Günlük bütçe */}
                        <div className="mt-4 bg-card/50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                            <span className="text-muted-foreground text-xs">Günlük harcama limiti</span>
                            <span className="text-muted-foreground font-mono text-sm font-bold">
                                ₺{Math.round(aylikButce / 30).toLocaleString('tr-TR')}/gün
                            </span>
                        </div>
                    </div>

                    {/* ── Tahmin Kartları ──────────────────────────────────── */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Ziyaretçi', value: `~${tahmin.tahminiTiklama.toLocaleString('tr-TR')}`, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'Mesaj', value: `~${tahmin.tahminiMesaj}`, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                            { label: 'Müşteri', value: `~${tahmin.tahminiMusteri}`, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        ].map(({ label, value, icon: Icon, color, bg }) => (
                            <div key={label} className="bg-background border border-border/50 rounded-xl p-3.5 text-center">
                                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mx-auto mb-2`}>
                                    <Icon className={`w-4 h-4 ${color}`} />
                                </div>
                                <p className={`font-syne font-bold text-lg ${color}`}>{value}</p>
                                <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 text-muted-foreground text-xs">
                        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <p>Tahminler sektör ortalamalarına dayanır. Gerçek sonuçlar hedef kitle ve reklam kalitesine göre değişir.</p>
                    </div>

                    {/* ── Başlat Butonu ────────────────────────────────────── */}
                    <button
                        onClick={handleBaslat}
                        disabled={baslatiliyor}
                        className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400
                                   text-white py-4 rounded-2xl font-syne font-bold text-lg
                                   transition-all shadow-lg shadow-violet-600/20
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex items-center justify-center gap-3
                                   active:scale-[0.98]"
                    >
                        {baslatiliyor ? (
                            <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        ) : (
                            <Play className="w-5 h-5" />
                        )}
                        {baslatiliyor ? 'AI Reklam Metinleri Hazırlanıyor...' : 'Kampanyayı Başlat'}
                    </button>

                    {/* Neler olacak? */}
                    <div className="bg-background/50 border border-border/30 rounded-xl p-4 space-y-3">
                        <p className="text-muted-foreground text-xs font-semibold">🤖 "Başlat" dediğinizde neler olacak?</p>
                        {[
                            'AI, sektörünüze özel 3 farklı reklam metni yazacak',
                            'Dükkânınıza 5km yarıçapta hedef kitle belirleyecek',
                            'Meta + Google\'da kampanyayı otonom yönetecek',
                            'Günlük bütçe limitinizi ASLA aşmayacak',
                        ].map((s, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-emerald-500 text-xs mt-0.5">✓</span>
                                <p className="text-muted-foreground text-xs">{s}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* ═══════════════════════════════════════════════════════════
                   AKTİF KAMPANYA VAR → HIZ GÖSTERGESİ + DURAKLAT
                   ═════════════════════════════════════════════════════════ */
                <>
                    {/* Durum Barı */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-5 py-3 flex items-center gap-3">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                        <span className="text-emerald-400 text-sm font-semibold">Kampanya Yayında</span>
                        <span className="text-emerald-600 text-xs ml-auto font-mono">
                            ₺{(aktifKampanya.butce || aylikButce).toLocaleString('tr-TR')}/ay
                        </span>
                    </div>

                    {/* Hız Göstergesi */}
                    <HizGostergesi
                        harcanan={aktifKampanya.harcanan || 0}
                        gelenMusteri={aktifKampanya.gelenMusteri || 0}
                        butce={aktifKampanya.butce || aylikButce}
                    />

                    {/* Platform Kartları */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background border border-[#1877F2]/20 rounded-xl p-4 text-center">
                            <p className="text-[#1877F2] font-bold text-sm mb-1">Meta Ads</p>
                            <p className="text-muted-foreground text-xs">Instagram + Facebook</p>
                            <p className="text-slate-100 font-syne font-bold text-lg mt-2">
                                ₺{Math.round((aktifKampanya.harcanan || 0) * 0.6).toLocaleString('tr-TR')}
                            </p>
                        </div>
                        <div className="bg-background border border-[#EA4335]/20 rounded-xl p-4 text-center">
                            <p className="text-[#EA4335] font-bold text-sm mb-1">Google Ads</p>
                            <p className="text-muted-foreground text-xs">Arama + Haritalar</p>
                            <p className="text-slate-100 font-syne font-bold text-lg mt-2">
                                ₺{Math.round((aktifKampanya.harcanan || 0) * 0.4).toLocaleString('tr-TR')}
                            </p>
                        </div>
                    </div>

                    {/* Duraklat */}
                    <button
                        onClick={handleDuraklat}
                        className="w-full bg-card hover:bg-slate-700 text-muted-foreground py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <Pause className="w-4 h-4" />
                        Kampanyayı Duraklat
                    </button>
                </>
            )}
        </div>
    )
}
