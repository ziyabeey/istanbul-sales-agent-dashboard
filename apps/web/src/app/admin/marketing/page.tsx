'use client'

import { useEffect, useState } from 'react'
import { Loader2, X, Send, TrendingUp, Users, Mail, Search, Globe, Plus, Pause, Play, RefreshCw, MessageCircle, ExternalLink } from 'lucide-react'

const ADMIN_TOKEN = 'kepenk-admin-2026'

const ILCELER = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Maltepe', 'Kartal',
    'Pendik', 'Ataşehir', 'Fatih', 'Beyoğlu', 'Sarıyer', 'Bakırköy',
    'Bağcılar', 'Bahçelievler', 'Güngören', 'Esenler', 'Esenyurt',
    'Beylikdüzü', 'Avcılar', 'Küçükçekmece', 'Sultangazi', 'Gaziosmanpaşa',
]

const SEKTORLER = [
    'elektrikçi', 'tesisatçı', 'kuaför', 'boyacı', 'camcı',
    'terzi', 'marangoz', 'tamirci', 'çilingir', 'temizlik',
    'nakliyat', 'çiçekçi', 'kuru temizleyici', 'fırın',
]

const DURUM_BADGE: Record<string, string> = {
    bekliyor:      'border-amber-800 text-amber-400 bg-amber-900/20',
    gonderildi:    'border-blue-800 text-blue-400 bg-blue-900/20',
    cevapladi:     'border-emerald-800 text-emerald-400 bg-emerald-900/20',
    kapandi:       'border-border text-muted-foreground bg-card/30',
    musteri_oldu:  'border-violet-800 text-violet-400 bg-violet-900/20',
}

const KANAL_ICON: Record<string, string> = {
    whatsapp: '📱', instagram_dm: '📸', telefon: '📞',
}

interface Lead {
    id: string
    isletme: string
    ilce: string
    telefon: string | null
    instagramUsername: string | null
    leadSkoru: number
    mesajTonu: string
    hazirMesaj: string
    durum: string
    kayitTarihi: string | null
    onerilenKanal?: string
}

interface LeadStats {
    bekliyor: number
    gonderildi: number
    cevapladi: number
    kapandi: number
}

interface Kampanya {
    id: string
    kampanyaId: string
    baslik: string
    platform: string
    gunlukButce: number
    gun: number
    durum: string
    baslangic: string | null
    bitis: string | null
    performans: { gosterim: number; tiklama: number; harcama: number; donusum: number }
    hedefSehir: string
    hedefSektorler: string[]
}

type Tab = 'leadler' | 'email' | 'google-ads' | 'performans'

export default function MarketingPage() {
    const [aktifTab, setAktifTab] = useState<Tab>('leadler')

    // ── Lead State ─────────────────────────────────────────────────────────
    const [leadler, setLeadler] = useState<Lead[]>([])
    const [leadStats, setLeadStats] = useState<LeadStats | null>(null)
    const [leadFiltre, setLeadFiltre] = useState('TÜMÜ')
    const [leadYukleniyor, setLeadYukleniyor] = useState(true)
    const [seciliLead, setSeciliLead] = useState<Lead | null>(null)
    const [leadDurumGuncelleniyor, setLeadDurumGuncelleniyor] = useState<string | null>(null)

    // Lead Tara Modal
    const [taraModal, setTaraModal] = useState(false)
    const [taraIlce, setTaraIlce] = useState(ILCELER[0])
    const [taraSektor, setTaraSektor] = useState(SEKTORLER[0])
    const [taraLimit, setTaraLimit] = useState(15)
    const [taraniyor, setTaraniyor] = useState(false)
    const [taraResult, setTaraResult] = useState<any>(null)

    // ── Email State ────────────────────────────────────────────────────────
    const [emailSegment, setEmailSegment] = useState('aktif_esnaflar')
    const [emailKonu, setEmailKonu] = useState('')
    const [emailHtml, setEmailHtml] = useState(EMAIL_SABLON)
    const [emailGonderiyor, setEmailGonderiyor] = useState(false)
    const [emailResult, setEmailResult] = useState<any>(null)
    const [emailGecmis, setEmailGecmis] = useState<any[]>([])
    const [emailOnizleme, setEmailOnizleme] = useState(false)

    // ── Google Ads State ──────────────────────────────────────────────────
    const [kampanyalar, setKampanyalar] = useState<Kampanya[]>([])
    const [buAyHarcama, setBuAyHarcama] = useState(0)
    const [kampanyaYukleniyor, setKampanyaYukleniyor] = useState(true)
    const [yeniKampanyaModal, setYeniKampanyaModal] = useState(false)
    const [yeniKampanya, setYeniKampanya] = useState({
        baslik: 'kepenk.ai — Esnaf Dijital Çözüm',
        platform: 'google',
        gunlukButce: 100,
        gun: 30,
        hedefSehir: 'İstanbul',
        hedefSektorler: ['elektrikçi', 'tesisatçı', 'kuaför'],
    })
    const [kampanyaKaydediyor, setKampanyaKaydediyor] = useState(false)

    // ── Data Fetch ─────────────────────────────────────────────────────────
    useEffect(() => {
        fetchLeadler()
        fetchKampanyalar()
        fetchEmailGecmis()
    }, [])

    async function fetchLeadler(durum?: string) {
        setLeadYukleniyor(true)
        const url = durum && durum !== 'TÜMÜ'
            ? `/api/admin/marketing/leadler?durum=${durum}&limit=100`
            : `/api/admin/marketing/leadler?limit=100`
        try {
            const r = await fetch(url, { headers: { 'x-admin-token': ADMIN_TOKEN } })
            const d = await r.json()
            setLeadler(d.leadler || [])
            setLeadStats(d.stats || null)
        } finally {
            setLeadYukleniyor(false)
        }
    }

    async function fetchKampanyalar() {
        setKampanyaYukleniyor(true)
        try {
            const r = await fetch('/api/admin/marketing/google-ads', { headers: { 'x-admin-token': ADMIN_TOKEN } })
            const d = await r.json()
            setKampanyalar(d.kampanyalar || [])
            setBuAyHarcama(d.buAyHarcama || 0)
        } finally {
            setKampanyaYukleniyor(false)
        }
    }

    async function fetchEmailGecmis() {
        try {
            const r = await fetch('/api/admin/marketing/email-kampanya', { headers: { 'x-admin-token': ADMIN_TOKEN } })
            const d = await r.json()
            setEmailGecmis(d.kampanyalar || [])
        } catch { /* sessiz */ }
    }

    function handleLeadFiltreChange(filtre: string) {
        setLeadFiltre(filtre)
        fetchLeadler(filtre)
    }

    async function handleLeadDurumGuncelle(leadId: string, durum: string) {
        setLeadDurumGuncelleniyor(leadId)
        try {
            await fetch('/api/admin/marketing/leadler', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify({ leadId, durum }),
            })
            setLeadler(prev => prev.map(l => l.id === leadId ? { ...l, durum } : l))
            if (seciliLead?.id === leadId) setSeciliLead(prev => prev ? { ...prev, durum } : null)
        } finally {
            setLeadDurumGuncelleniyor(null)
        }
    }

    async function handleLeadTara() {
        setTaraniyor(true)
        setTaraResult(null)
        try {
            const r = await fetch('/api/admin/marketing/lead-tara', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify({ ilce: taraIlce, sektor: taraSektor, limit: taraLimit }),
            })
            const d = await r.json()
            setTaraResult(d)
            if (d.ok) {
                setTimeout(() => {
                    fetchLeadler(leadFiltre)
                    setTaraModal(false)
                    setTaraResult(null)
                }, 3000)
            }
        } finally {
            setTaraniyor(false)
        }
    }

    async function handleEmailGonder() {
        if (!emailKonu || !emailHtml) return
        setEmailGonderiyor(true)
        setEmailResult(null)
        try {
            const r = await fetch('/api/admin/marketing/email-kampanya', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify({ segment: emailSegment, konu: emailKonu, html: emailHtml }),
            })
            const d = await r.json()
            setEmailResult(d)
            if (d.ok) fetchEmailGecmis()
        } finally {
            setEmailGonderiyor(false)
        }
    }

    async function handleYeniKampanya() {
        setKampanyaKaydediyor(true)
        try {
            await fetch('/api/admin/marketing/google-ads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify(yeniKampanya),
            })
            setYeniKampanyaModal(false)
            fetchKampanyalar()
        } finally {
            setKampanyaKaydediyor(false)
        }
    }

    async function handleKampanyaDurumToggle(id: string, mevcutDurum: string) {
        const yeniDurum = mevcutDurum === 'aktif' ? 'duraklatildi' : 'aktif'
        await fetch('/api/admin/marketing/google-ads', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
            body: JSON.stringify({ id, durum: yeniDurum }),
        })
        setKampanyalar(prev => prev.map(k => k.id === id ? { ...k, durum: yeniDurum } : k))
    }

    // ── Performans KPIs ───────────────────────────────────────────────────
    const toplamLead = (leadStats?.bekliyor || 0) + (leadStats?.gonderildi || 0) +
        (leadStats?.cevapladi || 0) + (leadStats?.kapandi || 0)
    const cevapOrani = leadStats?.gonderildi
        ? Math.round(((leadStats.cevapladi) / leadStats.gonderildi) * 100)
        : 0
    const toplamAktifKampanya = kampanyalar.filter(k => k.durum === 'aktif').length
    const toplamGosterim = kampanyalar.reduce((s, k) => s + (k.performans?.gosterim || 0), 0)

    const TABS: { id: Tab; label: string; icon: typeof Users }[] = [
        { id: 'leadler',    label: 'Lead Havuzu',      icon: Users    },
        { id: 'email',      label: 'Email Kampanya',   icon: Mail     },
        { id: 'google-ads', label: 'Google Ads',       icon: Globe    },
        { id: 'performans', label: 'Performans',       icon: TrendingUp },
    ]

    return (
        <div className="p-8 min-h-screen bg-slate-950">
            {/* Başlık */}
            <div className="mb-8">
                <h1 className="font-syne text-xl font-bold text-slate-100 tracking-tight">Marketing Merkezi</h1>
                <p className="text-muted-foreground text-xs mt-1 font-mono">
                    kepenk.ai kendi kendini pazarlar — Lead madencisi + Email + Google Ads
                </p>
            </div>

            {/* KPI Bar */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Toplam Lead', value: toplamLead, sub: `${leadStats?.bekliyor || 0} bekliyor` },
                    { label: 'Cevap Oranı', value: `%${cevapOrani}`, sub: `${leadStats?.cevapladi || 0} cevaplayandı` },
                    { label: 'Aktif Kampanya', value: toplamAktifKampanya, sub: `${kampanyalar.length} toplam` },
                    { label: 'Bu Ay Görüntüleme', value: toplamGosterim.toLocaleString('tr-TR'), sub: 'tüm platformlar' },
                ].map(kpi => (
                    <div key={kpi.label} className="bg-background rounded p-5">
                        <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">{kpi.label}</p>
                        <p className="font-syne text-2xl font-bold text-slate-100">{kpi.value}</p>
                        <p className="text-muted-foreground text-xs mt-1 font-mono">{kpi.sub}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border/50 mb-6 gap-1">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setAktifTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 text-sm font-syne transition-colors border-b-2 -mb-px ${
                            aktifTab === tab.id
                                ? 'border-slate-400 text-slate-100'
                                : 'border-transparent text-muted-foreground hover:text-muted-foreground'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── LEADLER TAB ────────────────────────────────────────────────────── */}
            {aktifTab === 'leadler' && (
                <div>
                    {/* Araçlar */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {(['TÜMÜ', 'bekliyor', 'gonderildi', 'cevapladi', 'kapandi'] as const).map(d => (
                                <button
                                    key={d}
                                    onClick={() => handleLeadFiltreChange(d)}
                                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                                        leadFiltre === d
                                            ? 'bg-slate-700 text-slate-100'
                                            : 'text-muted-foreground hover:text-muted-foreground'
                                    }`}
                                >
                                    {d === 'TÜMÜ' ? 'Tümü' : d}
                                    {d === 'bekliyor' && leadStats && (
                                        <span className="ml-1.5 bg-amber-500/20 text-amber-400 rounded px-1">{leadStats.bekliyor}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchLeadler(leadFiltre)}
                                className="p-2 text-muted-foreground hover:text-muted-foreground transition-colors"
                                title="Yenile"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTaraModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-syne rounded transition-colors"
                            >
                                <Search className="w-4 h-4" />
                                Lead Madencisi — Tara
                            </button>
                        </div>
                    </div>

                    {/* Lead Tablosu */}
                    <div className="bg-background rounded overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border/50">
                                    {['İşletme', 'İlçe', 'Kanal', 'Skor', 'Hazır Mesaj', 'Durum', 'Eylem'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                                {leadYukleniyor && (
                                    <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground font-mono text-xs">Yükleniyor...</td></tr>
                                )}
                                {!leadYukleniyor && leadler.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-12 text-center">
                                            <p className="text-muted-foreground text-sm mb-2">Henüz lead yok</p>
                                            <p className="text-slate-700 text-xs font-mono">Lead Madencisi → Tara butonunu kullanın</p>
                                        </td>
                                    </tr>
                                )}
                                {leadler.map(lead => (
                                    <tr
                                        key={lead.id}
                                        onClick={() => setSeciliLead(lead)}
                                        className="hover:bg-card/30 cursor-pointer transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="text-foreground text-sm">{lead.isletme}</p>
                                            {lead.telefon && (
                                                <p className="text-muted-foreground text-xs font-mono">{lead.telefon}</p>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs">{lead.ilce}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {KANAL_ICON[lead.onerilenKanal || 'whatsapp'] || '📱'}
                                            <span className="ml-1.5 text-muted-foreground text-xs">{lead.onerilenKanal || 'whatsapp'}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`font-mono font-bold text-sm ${
                                                lead.leadSkoru >= 70 ? 'text-emerald-400' :
                                                lead.leadSkoru >= 40 ? 'text-amber-400' : 'text-muted-foreground'
                                            }`}>{lead.leadSkoru}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-muted-foreground text-xs line-clamp-1 max-w-xs">
                                                {lead.hazirMesaj?.slice(0, 60)}...
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded border ${DURUM_BADGE[lead.durum] || DURUM_BADGE.bekliyor}`}>
                                                {lead.durum}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                                            <div className="flex items-center gap-2">
                                                {lead.telefon && (
                                                    <a
                                                        href={`https://wa.me/${lead.telefon.replace(/\D/g, '')}?text=${encodeURIComponent(lead.hazirMesaj || '')}`}
                                                        target="_blank" rel="noopener noreferrer"
                                                        onClick={() => handleLeadDurumGuncelle(lead.id, 'gonderildi')}
                                                        className="text-emerald-600 hover:text-emerald-400 transition-colors"
                                                        title="WhatsApp Gönder"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {lead.instagramUsername && (
                                                    <a
                                                        href={`https://instagram.com/${lead.instagramUsername}`}
                                                        target="_blank" rel="noopener noreferrer"
                                                        className="text-pink-600 hover:text-pink-400 transition-colors"
                                                        title="Instagram Profil"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <select
                                                    value={lead.durum}
                                                    onChange={e => handleLeadDurumGuncelle(lead.id, e.target.value)}
                                                    disabled={leadDurumGuncelleniyor === lead.id}
                                                    className="bg-card border border-border text-muted-foreground text-xs rounded px-1.5 py-0.5 focus:outline-none"
                                                >
                                                    {['bekliyor', 'gonderildi', 'cevapladi', 'kapandi', 'musteri_oldu'].map(d => (
                                                        <option key={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Lead Detay Modal */}
                    {seciliLead && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                            <div className="bg-background rounded-lg border border-border max-w-lg w-full p-6">
                                <div className="flex items-start justify-between mb-5">
                                    <div>
                                        <p className="text-slate-100 font-syne font-semibold text-lg">{seciliLead.isletme}</p>
                                        <p className="text-muted-foreground text-xs mt-1">{seciliLead.ilce} · Skor: {seciliLead.leadSkoru}</p>
                                    </div>
                                    <button onClick={() => setSeciliLead(null)} className="text-muted-foreground hover:text-muted-foreground">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Hazır Mesaj</p>
                                        <div className="bg-slate-950 rounded p-3 text-muted-foreground text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
                                            {seciliLead.hazirMesaj || 'Mesaj yok'}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {seciliLead.telefon && (
                                            <a
                                                href={`https://wa.me/${seciliLead.telefon.replace(/\D/g, '')}?text=${encodeURIComponent(seciliLead.hazirMesaj || '')}`}
                                                target="_blank" rel="noopener noreferrer"
                                                onClick={() => handleLeadDurumGuncelle(seciliLead.id, 'gonderildi')}
                                                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded text-sm font-syne transition-colors"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                WhatsApp Gönder
                                            </a>
                                        )}
                                        <select
                                            value={seciliLead.durum}
                                            onChange={e => handleLeadDurumGuncelle(seciliLead.id, e.target.value)}
                                            className="bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none"
                                        >
                                            {['bekliyor', 'gonderildi', 'cevapladi', 'kapandi', 'musteri_oldu'].map(d => (
                                                <option key={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lead Tara Modal */}
                    {taraModal && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                            <div className="bg-background rounded-lg border border-border max-w-md w-full p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-slate-100 font-syne font-semibold">Lead Madencisi — Tara</p>
                                    <button onClick={() => { setTaraModal(false); setTaraResult(null) }} className="text-muted-foreground hover:text-muted-foreground">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">İlçe</label>
                                        <select value={taraIlce} onChange={e => setTaraIlce(e.target.value)}
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none">
                                            {ILCELER.map(i => <option key={i}>{i}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">Sektör</label>
                                        <select value={taraSektor} onChange={e => setTaraSektor(e.target.value)}
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none">
                                            {SEKTORLER.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">
                                            İşletme Limiti: {taraLimit}
                                        </label>
                                        <input type="range" min={5} max={50} step={5} value={taraLimit}
                                            onChange={e => setTaraLimit(Number(e.target.value))}
                                            className="w-full accent-emerald-500" />
                                    </div>

                                    {taraResult && (
                                        <div className={`rounded p-3 text-sm ${taraResult.ok ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-300' : 'bg-rose-900/20 border border-rose-800 text-rose-300'}`}>
                                            {taraResult.ok
                                                ? `✓ ${taraResult.kaydedilen || 0} lead kaydedildi — ${taraResult.uyari || ''}`
                                                : taraResult.uyari || taraResult.error
                                            }
                                        </div>
                                    )}

                                    <button
                                        onClick={handleLeadTara}
                                        disabled={taraniyor}
                                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-syne rounded transition-colors flex items-center justify-center gap-2"
                                    >
                                        {taraniyor ? <><Loader2 className="w-4 h-4 animate-spin" /> Tarıyor...</> : 'Taramayı Başlat'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── EMAIL TAB ──────────────────────────────────────────────────────── */}
            {aktifTab === 'email' && (
                <div className="grid grid-cols-3 gap-6">
                    {/* Kampanya Oluştur */}
                    <div className="col-span-2 space-y-4">
                        <div className="bg-background rounded p-5">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Yeni Email Kampanyası</p>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Segment</label>
                                    <select value={emailSegment} onChange={e => setEmailSegment(e.target.value)}
                                        className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none">
                                        <option value="aktif_esnaflar">Aktif Esnaflar (müşteri)</option>
                                        <option value="leadler">Lead Havuzu (email adresi olanlar)</option>
                                        <option value="paket:TEMEL">TEMEL Paket Esnaflar (upsell)</option>
                                        <option value="paket:STANDART">STANDART Paket Esnaflar</option>
                                        <option value="paket:BUYUME">BÜYÜME Paket Esnaflar</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Email Konusu</label>
                                    <input
                                        type="text"
                                        value={emailKonu}
                                        onChange={e => setEmailKonu(e.target.value)}
                                        placeholder="🚀 kepenk.ai'de yenilikler — Paketinizi yükseltin"
                                        className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider">HTML İçerik</label>
                                        <button onClick={() => setEmailOnizleme(!emailOnizleme)}
                                            className="text-[10px] text-muted-foreground hover:text-muted-foreground transition-colors">
                                            {emailOnizleme ? 'Kodu Gör' : 'Önizle'}
                                        </button>
                                    </div>
                                    {emailOnizleme ? (
                                        <div className="bg-white rounded overflow-hidden h-64">
                                            <iframe
                                                srcDoc={emailHtml}
                                                className="w-full h-full"
                                                title="Email Önizleme"
                                            />
                                        </div>
                                    ) : (
                                        <textarea
                                            value={emailHtml}
                                            onChange={e => setEmailHtml(e.target.value)}
                                            rows={10}
                                            className="w-full bg-card border border-border text-muted-foreground text-xs rounded px-3 py-2 font-mono focus:outline-none focus:border-slate-500 resize-none"
                                        />
                                    )}
                                </div>

                                {emailResult && (
                                    <div className={`rounded p-3 text-sm ${emailResult.ok ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-300' : 'bg-rose-900/20 border border-rose-800 text-rose-300'}`}>
                                        {emailResult.ok
                                            ? `✓ ${emailResult.gonderilen} email gönderildi (${emailResult.hata} hata)`
                                            : emailResult.error
                                        }
                                    </div>
                                )}

                                <button
                                    onClick={handleEmailGonder}
                                    disabled={emailGonderiyor || !emailKonu || !emailHtml}
                                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-syne rounded transition-colors flex items-center justify-center gap-2"
                                >
                                    {emailGonderiyor ? <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</> : <><Send className="w-4 h-4" /> Kampanyayı Gönder</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Geçmiş Kampanyalar */}
                    <div className="bg-background rounded p-5">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Geçmiş Kampanyalar</p>
                        {emailGecmis.length === 0 ? (
                            <p className="text-slate-700 text-xs">Henüz gönderilmiş kampanya yok</p>
                        ) : (
                            <div className="space-y-3">
                                {emailGecmis.map(k => (
                                    <div key={k.id} className="bg-card/50 rounded p-3">
                                        <p className="text-muted-foreground text-xs font-medium truncate">{k.konu}</p>
                                        <p className="text-muted-foreground text-[10px] mt-1">{k.segment}</p>
                                        <div className="flex items-center gap-3 mt-2 text-[10px] font-mono">
                                            <span className="text-emerald-400">{k.gonderilen} ✓</span>
                                            {k.hata > 0 && <span className="text-rose-400">{k.hata} ✗</span>}
                                            <span className="text-muted-foreground">{k.tarih?.slice(0, 10)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── GOOGLE ADS TAB ─────────────────────────────────────────────────── */}
            {aktifTab === 'google-ads' && (
                <div className="space-y-6">
                    {/* Üst Araçlar */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Bu ay harcama: <span className="text-amber-400 font-mono font-bold">₺{buAyHarcama.toLocaleString('tr-TR')}</span>
                            </p>
                            <p className="text-muted-foreground text-xs mt-0.5">kepenk.ai kendi B2B esnaf edinme kampanyaları</p>
                        </div>
                        <button
                            onClick={() => setYeniKampanyaModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-syne rounded transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Yeni Kampanya
                        </button>
                    </div>

                    {/* Kampanya Tablosu */}
                    <div className="bg-background rounded overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border/50">
                                    {['Kampanya', 'Platform', 'Günlük Bütçe', 'Görüntüleme', 'Tıklama', 'Dönüşüm', 'Durum', 'İşlem'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                                {kampanyaYukleniyor && (
                                    <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-xs">Yükleniyor...</td></tr>
                                )}
                                {!kampanyaYukleniyor && kampanyalar.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-12 text-center">
                                            <p className="text-muted-foreground text-sm mb-2">Henüz kampanya yok</p>
                                            <p className="text-slate-700 text-xs font-mono">Yeni Kampanya butonunu kullanın</p>
                                        </td>
                                    </tr>
                                )}
                                {kampanyalar.map(k => (
                                    <tr key={k.id} className="hover:bg-card/20 transition-colors">
                                        <td className="px-4 py-3">
                                            <p className="text-foreground text-sm">{k.baslik}</p>
                                            <p className="text-muted-foreground text-xs font-mono mt-0.5">{k.hedefSehir} · {k.gun}g</p>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground text-xs uppercase">{k.platform}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-sm">₺{k.gunlukButce}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{(k.performans?.gosterim || 0).toLocaleString('tr-TR')}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{k.performans?.tiklama || 0}</td>
                                        <td className="px-4 py-3 text-emerald-400 font-mono text-xs font-bold">{k.performans?.donusum || 0}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded border ${k.durum === 'aktif' ? 'border-emerald-800 text-emerald-400 bg-emerald-900/20' : 'border-border text-muted-foreground bg-card/30'}`}>
                                                {k.durum}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleKampanyaDurumToggle(k.id, k.durum)}
                                                className="text-muted-foreground hover:text-muted-foreground transition-colors"
                                                title={k.durum === 'aktif' ? 'Duraklat' : 'Başlat'}
                                            >
                                                {k.durum === 'aktif'
                                                    ? <Pause className="w-4 h-4" />
                                                    : <Play className="w-4 h-4" />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Yeni Kampanya Modal */}
                    {yeniKampanyaModal && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                            <div className="bg-background rounded-lg border border-border max-w-md w-full p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-slate-100 font-syne font-semibold">Yeni Kampanya Oluştur</p>
                                    <button onClick={() => setYeniKampanyaModal(false)} className="text-muted-foreground hover:text-muted-foreground">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">Kampanya Başlığı</label>
                                        <input
                                            type="text"
                                            value={yeniKampanya.baslik}
                                            onChange={e => setYeniKampanya(p => ({ ...p, baslik: e.target.value }))}
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">Platform</label>
                                        <select value={yeniKampanya.platform}
                                            onChange={e => setYeniKampanya(p => ({ ...p, platform: e.target.value }))}
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none">
                                            <option value="google">Google Ads</option>
                                            <option value="meta">Meta (Facebook/Instagram)</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">
                                                Günlük Bütçe (₺)
                                            </label>
                                            <input
                                                type="number"
                                                value={yeniKampanya.gunlukButce}
                                                onChange={e => setYeniKampanya(p => ({ ...p, gunlukButce: Number(e.target.value) }))}
                                                min={50} step={50}
                                                className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5">
                                                Süre (Gün)
                                            </label>
                                            <input
                                                type="number"
                                                value={yeniKampanya.gun}
                                                onChange={e => setYeniKampanya(p => ({ ...p, gun: Number(e.target.value) }))}
                                                min={7} step={7}
                                                className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                                            Tahmini Toplam Bütçe: <span className="text-amber-400 font-mono">₺{(yeniKampanya.gunlukButce * yeniKampanya.gun).toLocaleString('tr-TR')}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleYeniKampanya}
                                        disabled={kampanyaKaydediyor}
                                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-syne rounded transition-colors flex items-center justify-center gap-2"
                                    >
                                        {kampanyaKaydediyor
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Oluşturuluyor...</>
                                            : <><Plus className="w-4 h-4" /> Kampanya Oluştur</>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── PERFORMANS TAB ─────────────────────────────────────────────────── */}
            {aktifTab === 'performans' && (
                <div className="space-y-6">
                    {/* Funnel */}
                    <div className="bg-background rounded p-6">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-6">Marketing Funneli</p>
                        <div className="flex items-end gap-4">
                            {[
                                { label: 'Lead Tarındı', value: toplamLead, color: 'bg-blue-600', pct: 100 },
                                { label: 'Mesaj Gönderildi', value: (leadStats?.gonderildi || 0) + (leadStats?.cevapladi || 0), color: 'bg-violet-600', pct: toplamLead > 0 ? Math.round(((leadStats?.gonderildi || 0) + (leadStats?.cevapladi || 0)) / toplamLead * 100) : 0 },
                                { label: 'Cevap Verdi', value: leadStats?.cevapladi || 0, color: 'bg-amber-500', pct: toplamLead > 0 ? Math.round((leadStats?.cevapladi || 0) / toplamLead * 100) : 0 },
                                { label: 'Müşteri Oldu', value: 0, color: 'bg-emerald-500', pct: 0 },
                            ].map((step, i) => (
                                <div key={i} className="flex-1 text-center">
                                    <p className="font-syne font-bold text-2xl text-slate-100 mb-1">{step.value}</p>
                                    <div className="mx-auto w-full">
                                        <div className={`${step.color} rounded-t mx-auto transition-all`}
                                            style={{ height: `${Math.max(step.pct * 1.2, 8)}px`, width: `${Math.max(step.pct, 30)}%` }} />
                                    </div>
                                    <p className="text-muted-foreground text-[10px] mt-2">{step.label}</p>
                                    <p className="text-muted-foreground text-[10px] font-mono">%{step.pct}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kanal Dağılımı */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'WhatsApp Leadler', value: leadler.filter(l => l.onerilenKanal === 'whatsapp' || !l.onerilenKanal).length, color: 'text-emerald-400' },
                            { label: 'Instagram DM Leadler', value: leadler.filter(l => l.onerilenKanal === 'instagram_dm').length, color: 'text-pink-400' },
                            { label: 'Telefon Leadler', value: leadler.filter(l => l.onerilenKanal === 'telefon').length, color: 'text-amber-400' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-background rounded p-5">
                                <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className={`font-syne font-bold text-3xl ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Kampanya Performansı */}
                    <div className="bg-background rounded p-5">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Aktif Kampanya Performansı</p>
                        {kampanyalar.filter(k => k.durum === 'aktif').length === 0 ? (
                            <p className="text-slate-700 text-sm">Aktif kampanya yok</p>
                        ) : (
                            <div className="space-y-3">
                                {kampanyalar.filter(k => k.durum === 'aktif').map(k => (
                                    <div key={k.id} className="flex items-center justify-between p-3 bg-card/50 rounded">
                                        <div>
                                            <p className="text-muted-foreground text-sm">{k.baslik}</p>
                                            <p className="text-muted-foreground text-xs font-mono">{k.platform} · ₺{k.gunlukButce}/gün</p>
                                        </div>
                                        <div className="flex items-center gap-6 text-xs font-mono">
                                            <span className="text-muted-foreground">{(k.performans?.gosterim || 0).toLocaleString('tr-TR')} görüntüleme</span>
                                            <span className="text-blue-400">{k.performans?.tiklama || 0} tıklama</span>
                                            <span className="text-emerald-400">{k.performans?.donusum || 0} dönüşüm</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// ── Email Şablon ──────────────────────────────────────────────────────────────
const EMAIL_SABLON = `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0E0D0B;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">
    <div style="text-align:center;margin-bottom:32px">
      <span style="font-size:28px;font-weight:900;letter-spacing:-1px">
        <span style="color:#C04B1E">K</span><span style="color:#F8F4EE">EPENK</span><span style="color:#C04B1E">.ai</span>
      </span>
    </div>
    <div style="background:#1C1A17;border-radius:16px;padding:32px;margin-bottom:24px">
      <h1 style="color:#F8F4EE;font-size:22px;margin:0 0 16px">İşletmenize Özel Teklif</h1>
      <p style="color:#C9B49A;font-size:15px;line-height:1.6;margin:0">
        Kepenk.ai ile işletmenizi dijitalleştirin. WhatsApp otomasyonu, AI destekli müşteri yönetimi ve kendi web siteniz — hepsi bir arada.
      </p>
    </div>
    <div style="text-align:center;margin-bottom:32px">
      <a href="https://kepenk.ai/onboarding"
         style="background:#C04B1E;color:#F8F4EE;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:700;font-size:16px;display:inline-block">
        14 Gün Ücretsiz Deneyin →
      </a>
    </div>
    <p style="color:#4A4438;font-size:11px;text-align:center">
      kepenk.ai · <a href="https://kepenk.ai/gizlilik" style="color:#4A4438">Abonelikten Çık</a>
    </p>
  </div>
</body>
</html>`
