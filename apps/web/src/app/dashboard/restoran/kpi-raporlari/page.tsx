'use client'

/**
 * Patron Radarı — KPI Raporları & Liderlik Tablosu
 * ══════════════════════════════════════════════════════════════════════
 * - Günün Özeti (Ort. Mutfak / Servis süresi)
 * - Leaderboard: En hızlı garsonlar & aşçılar
 * - AI Darboğaz Radarı — kırmızı/turuncu uyarılar
 *
 * Firestore'dan personel_kpi koleksiyonunu okur.
 * Gün içi gerçek zamanlı tamamlanmış siparişlerden de hesap yapar.
 */

import { useState, useEffect, useMemo } from 'react'

// Firebase Client SDK
import { initializeApp, getApps } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    type DocumentData,
} from 'firebase/firestore'

import {
    siparisKpiHesapla,
    sureFormat,
    darbograzAnaliz,
    type SiparisKpiSonuc,
    type DarbograzUyari,
} from '@/lib/kpiHesaplayici'
import { SLA_HEDEFLERI, type PersonelKpi } from '@/lib/restoran/tipler'

// ─── Firebase Init ─────────────────────────────────────────────────────

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

// ─── Yardımcılar ───────────────────────────────────────────────────────

function kurusToTL(k: number) { return (k / 100).toFixed(2).replace('.', ',') + ' ₺' }

function slaRenk(basarili: boolean): string {
    return basarili ? 'text-emerald-400' : 'text-red-400'
}

function slaBar(oran: number): string {
    if (oran >= 90) return 'bg-emerald-500'
    if (oran >= 70) return 'bg-amber-500'
    return 'bg-red-500'
}

// ─── Component ─────────────────────────────────────────────────────────

export default function KPIRaporlariPage() {
    const [esnafId, setEsnafId] = useState<string>('')
    const [siparisKpileri, setSiparisKpileri] = useState<SiparisKpiSonuc[]>([])
    const [personelKpileri, setPersonelKpileri] = useState<PersonelKpi[]>([])
    const [loading, setLoading] = useState(true)
    const [seciliGun, setSeciliGun] = useState<string>(
        new Date().toISOString().split('T')[0]
    )

    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
    }, [])

    // ── Tamamlanmış siparişleri çek → KPI hesapla ──
    useEffect(() => {
        if (!esnafId) return
        setLoading(true)

        async function fetchData() {
            try {
                // Bugünün tamamlanmış adisyonları
                const bugunBaslangic = new Date(seciliGun + 'T00:00:00')
                const bugunBitis = new Date(seciliGun + 'T23:59:59')

                const adisyonQ = query(
                    collection(db, 'esnaflar', esnafId, 'aktif_adisyonlar'),
                    where('durum', '==', 'masaya_teslim_edildi'),
                    orderBy('garson_teslim_ani', 'desc'),
                    limit(200)
                )

                const adisyonSnap = await getDocs(adisyonQ)
                const kpiler: SiparisKpiSonuc[] = []

                adisyonSnap.docs.forEach((d) => {
                    const data = d.data() as DocumentData
                    const kpi = siparisKpiHesapla({
                        siparis_ani: data.siparis_ani,
                        mutfak_bitis_ani: data.mutfak_bitis_ani,
                        garson_teslim_ani: data.garson_teslim_ani,
                    })
                    if (kpi) kpiler.push(kpi)
                })

                setSiparisKpileri(kpiler)

                // Personel KPI koleksiyonu (günlük aggregate)
                const kpiQ = query(
                    collection(db, 'esnaflar', esnafId, 'personel_kpi'),
                    where('tarih', '==', seciliGun),
                    orderBy('toplamPuan', 'desc')
                )

                try {
                    const kpiSnap = await getDocs(kpiQ)
                    const pkpi: PersonelKpi[] = kpiSnap.docs.map((d) => d.data() as PersonelKpi)
                    setPersonelKpileri(pkpi)
                } catch {
                    // Koleksiyon henüz yok, boş dön
                    setPersonelKpileri([])
                }
            } catch (err) {
                console.error('[kpi-raporlari] Hata:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [esnafId, seciliGun])

    // ── Hesaplamalar ──
    const gunOzeti = useMemo(() => {
        if (siparisKpileri.length === 0) return null
        const n = siparisKpileri.length
        const ortMutfak = Math.round(siparisKpileri.reduce((s, k) => s + k.mutfakSureSaniye, 0) / n)
        const ortGarson = Math.round(siparisKpileri.reduce((s, k) => s + k.garsonSureSaniye, 0) / n)
        const ortToplam = Math.round(siparisKpileri.reduce((s, k) => s + k.toplamSureSaniye, 0) / n)
        const mutfakSla = Math.round(siparisKpileri.filter(k => k.mutfakSlaBasarili).length / n * 100)
        const garsonSla = Math.round(siparisKpileri.filter(k => k.garsonSlaBasarili).length / n * 100)
        return { n, ortMutfak, ortGarson, ortToplam, mutfakSla, garsonSla }
    }, [siparisKpileri])

    const uyarilar = useMemo(() => {
        return darbograzAnaliz(personelKpileri, siparisKpileri)
    }, [personelKpileri, siparisKpileri])

    const garsonLiderleri = useMemo(() => {
        return [...personelKpileri]
            .filter(p => p.rol === 'garson')
            .sort((a, b) => a.ortSureSaniye - b.ortSureSaniye)
            .slice(0, 10)
    }, [personelKpileri])

    const asciLiderleri = useMemo(() => {
        return [...personelKpileri]
            .filter(p => p.rol === 'asci')
            .sort((a, b) => a.ortSureSaniye - b.ortSureSaniye)
            .slice(0, 10)
    }, [personelKpileri])

    if (!esnafId) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <p className="text-neutral-400">Esnaf ID bulunamadı.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-white">📊 Patron Radarı</h1>
                    <p className="text-neutral-500 text-sm mt-1">KPI & SLA Performans Raporları</p>
                </div>
                <input
                    type="date"
                    value={seciliGun}
                    onChange={(e) => setSeciliGun(e.target.value)}
                    className="bg-neutral-800 text-white border border-neutral-700 rounded-xl px-4 py-2 text-sm"
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center mt-20">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                </div>
            ) : (
                <>
                    {/* ═══ AI DARBOĞAZ UYARILARI ═══ */}
                    {uyarilar.length > 0 && (
                        <div className="mb-8 space-y-3">
                            {uyarilar.map((u, i) => (
                                <div
                                    key={i}
                                    className={`rounded-2xl p-4 border ${
                                        u.seviye === 'kritik'
                                            ? 'bg-red-950/40 border-red-500/50'
                                            : u.seviye === 'uyari'
                                            ? 'bg-amber-950/40 border-amber-500/50'
                                            : 'bg-blue-950/40 border-blue-500/50'
                                    }`}
                                >
                                    <p className="text-sm text-white">{u.mesaj}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ═══ GÜNÜN ÖZETİ ═══ */}
                    {gunOzeti ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                            <OzetKart
                                baslik="Toplam Sipariş"
                                deger={gunOzeti.n.toString()}
                                alt="tamamlandı"
                                renk="text-blue-400"
                            />
                            <OzetKart
                                baslik="Ort. Mutfak"
                                deger={sureFormat(gunOzeti.ortMutfak)}
                                alt={`SLA: ${sureFormat(SLA_HEDEFLERI.mutfak_sure_saniye)}`}
                                renk={gunOzeti.ortMutfak <= SLA_HEDEFLERI.mutfak_sure_saniye ? 'text-emerald-400' : 'text-red-400'}
                            />
                            <OzetKart
                                baslik="Ort. Garson"
                                deger={sureFormat(gunOzeti.ortGarson)}
                                alt={`SLA: ${sureFormat(SLA_HEDEFLERI.garson_sure_saniye)}`}
                                renk={gunOzeti.ortGarson <= SLA_HEDEFLERI.garson_sure_saniye ? 'text-emerald-400' : 'text-red-400'}
                            />
                            <OzetKart
                                baslik="Ort. Toplam"
                                deger={sureFormat(gunOzeti.ortToplam)}
                                alt="sipariş→teslim"
                                renk="text-purple-400"
                            />
                            <SLAKart
                                baslik="Mutfak SLA"
                                oran={gunOzeti.mutfakSla}
                            />
                            <SLAKart
                                baslik="Garson SLA"
                                oran={gunOzeti.garsonSla}
                            />
                        </div>
                    ) : (
                        <div className="bg-neutral-900 rounded-2xl p-8 text-center mb-8">
                            <p className="text-neutral-500">Seçili günde tamamlanmış sipariş bulunamadı.</p>
                        </div>
                    )}

                    {/* ═══ LEADERBOARD ═══ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* En Hızlı Garsonlar */}
                        <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                            <h2 className="text-lg font-bold text-white mb-4">
                                🏃 En Hızlı Garsonlar
                            </h2>
                            {garsonLiderleri.length === 0 ? (
                                <p className="text-neutral-500 text-sm">Henüz veri yok.</p>
                            ) : (
                                <div className="space-y-2">
                                    {garsonLiderleri.map((g, i) => (
                                        <LiderSatir
                                            key={g.personelId}
                                            sira={i + 1}
                                            ad={g.personelAdi}
                                            ortSure={g.ortSureSaniye}
                                            siparisSayisi={g.toplamSiparis}
                                            slaOrani={g.slaBasariOrani}
                                            puan={g.toplamPuan}
                                            hedefSaniye={SLA_HEDEFLERI.garson_sure_saniye}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* En Hızlı Aşçılar */}
                        <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                            <h2 className="text-lg font-bold text-white mb-4">
                                👨‍🍳 En Hızlı Aşçılar
                            </h2>
                            {asciLiderleri.length === 0 ? (
                                <p className="text-neutral-500 text-sm">Henüz veri yok.</p>
                            ) : (
                                <div className="space-y-2">
                                    {asciLiderleri.map((a, i) => (
                                        <LiderSatir
                                            key={a.personelId}
                                            sira={i + 1}
                                            ad={a.personelAdi}
                                            ortSure={a.ortSureSaniye}
                                            siparisSayisi={a.toplamSiparis}
                                            slaOrani={a.slaBasariOrani}
                                            puan={a.toplamPuan}
                                            hedefSaniye={SLA_HEDEFLERI.mutfak_sure_saniye}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ═══ DETAY TABLOSU ═══ */}
                    {siparisKpileri.length > 0 && (
                        <div className="mt-8 bg-neutral-900 rounded-2xl p-5 border border-neutral-800 overflow-x-auto">
                            <h2 className="text-lg font-bold text-white mb-4">
                                📋 Sipariş Bazlı KPI Detayı ({siparisKpileri.length} adet)
                            </h2>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-neutral-500 border-b border-neutral-800">
                                        <th className="text-left py-2 px-3">#</th>
                                        <th className="text-left py-2 px-3">Mutfak</th>
                                        <th className="text-left py-2 px-3">Garson</th>
                                        <th className="text-left py-2 px-3">Toplam</th>
                                        <th className="text-center py-2 px-3">Mutfak SLA</th>
                                        <th className="text-center py-2 px-3">Garson SLA</th>
                                        <th className="text-right py-2 px-3">M.Puan</th>
                                        <th className="text-right py-2 px-3">G.Puan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {siparisKpileri.slice(0, 50).map((k, i) => (
                                        <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/50">
                                            <td className="py-2 px-3 text-neutral-500">{i + 1}</td>
                                            <td className={`py-2 px-3 font-mono ${slaRenk(k.mutfakSlaBasarili)}`}>
                                                {sureFormat(k.mutfakSureSaniye)}
                                            </td>
                                            <td className={`py-2 px-3 font-mono ${slaRenk(k.garsonSlaBasarili)}`}>
                                                {sureFormat(k.garsonSureSaniye)}
                                            </td>
                                            <td className="py-2 px-3 font-mono text-purple-400">
                                                {sureFormat(k.toplamSureSaniye)}
                                            </td>
                                            <td className="text-center py-2 px-3">
                                                {k.mutfakSlaBasarili
                                                    ? <span className="text-emerald-400">✅</span>
                                                    : <span className="text-red-400">❌</span>}
                                            </td>
                                            <td className="text-center py-2 px-3">
                                                {k.garsonSlaBasarili
                                                    ? <span className="text-emerald-400">✅</span>
                                                    : <span className="text-red-400">❌</span>}
                                            </td>
                                            <td className="text-right py-2 px-3 font-bold text-white">
                                                {k.mutfakPuan > 0 ? '+' : ''}{k.mutfakPuan}
                                            </td>
                                            <td className="text-right py-2 px-3 font-bold text-white">
                                                {k.garsonPuan > 0 ? '+' : ''}{k.garsonPuan}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

// ─── Alt Komponentler ──────────────────────────────────────────────────

function OzetKart({ baslik, deger, alt, renk }: {
    baslik: string; deger: string; alt: string; renk: string
}) {
    return (
        <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
            <p className="text-neutral-500 text-xs uppercase tracking-wide mb-1">{baslik}</p>
            <p className={`text-2xl font-black ${renk}`}>{deger}</p>
            <p className="text-neutral-600 text-[10px] mt-1">{alt}</p>
        </div>
    )
}

function SLAKart({ baslik, oran }: { baslik: string; oran: number }) {
    return (
        <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
            <p className="text-neutral-500 text-xs uppercase tracking-wide mb-1">{baslik}</p>
            <p className={`text-2xl font-black ${oran >= 80 ? 'text-emerald-400' : oran >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                %{oran}
            </p>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-2">
                <div
                    className={`h-2 rounded-full transition-all ${slaBar(oran)}`}
                    style={{ width: `${oran}%` }}
                />
            </div>
        </div>
    )
}

function LiderSatir({ sira, ad, ortSure, siparisSayisi, slaOrani, puan, hedefSaniye }: {
    sira: number; ad: string; ortSure: number; siparisSayisi: number
    slaOrani: number; puan: number; hedefSaniye: number
}) {
    const medali = sira === 1 ? '🥇' : sira === 2 ? '🥈' : sira === 3 ? '🥉' : `${sira}.`
    const basarili = ortSure <= hedefSaniye

    return (
        <div className="flex items-center justify-between bg-neutral-800/50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
                <span className="text-lg w-7 text-center">{medali}</span>
                <div>
                    <p className="text-white font-medium text-sm">{ad}</p>
                    <p className="text-neutral-500 text-[10px]">{siparisSayisi} sipariş</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className={`font-mono font-bold text-sm ${basarili ? 'text-emerald-400' : 'text-red-400'}`}>
                        {sureFormat(ortSure)}
                    </p>
                    <p className="text-neutral-600 text-[9px]">SLA %{slaOrani}</p>
                </div>
                <span className={`font-bold text-sm ${puan >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {puan > 0 ? '+' : ''}{puan}p
                </span>
            </div>
        </div>
    )
}
