'use client'

import { useEffect, useState, useCallback } from 'react'
import {
    MessageCircle, Globe, Loader2, X, ChevronRight, Save,
    ExternalLink, Plus, Trash2, ChevronUp, ChevronDown, AlertTriangle,
    Instagram, Check
} from 'lucide-react'

const ADMIN_TOKEN = 'kepenk-admin-2026'

const WEB_MODULLER = [
    { id: 'randevu',              ad: 'Randevu Sistemi' },
    { id: 'menu',                 ad: 'Dijital Menü' },
    { id: 'galeri',               ad: 'Galeri' },
    { id: 'santiye-gunlugu',      ad: 'Şantiye Günlüğü' },
    { id: 'online-rezervasyon',   ad: 'Online Rezervasyon' },
    { id: 'iletisim-formu',       ad: 'İletişim Formu' },
    { id: 'acil-buton',           ad: 'Acil Buton' },
    { id: 'hizmet-bolgeleri',     ad: 'Hizmet Bölgeleri' },
    { id: 'hizmet-fiyat-listesi', ad: 'Fiyat Listesi' },
    { id: 'ucretsiz-kesif',       ad: 'Ücretsiz Keşif' },
    { id: 'paket-listesi',        ad: 'Paket Listesi' },
    { id: 'katalog',              ad: 'Ürün Kataloğu' },
    { id: 'fiyat-hesaplayici',    ad: 'Fiyat Hesaplayıcı' },
    { id: 'nobet-takvimi',        ad: 'Nöbet Takvimi' },
    { id: 'siparis-linki',        ad: 'Sipariş Linki' },
    { id: 'gunun-ozel',           ad: 'Günün Özel' },
    { id: 'instagram-feed',       ad: 'Instagram Feed' },
    { id: 'online-danisma',       ad: 'Online Danışma' },
    { id: 'evrak-listesi',        ad: 'Evrak Listesi' },
    { id: 'proje-portfoy',        ad: 'Proje Portföy' },
    { id: 'arac-sorgulama',       ad: 'Araç Sorgulama' },
    { id: 'uyelik-paketleri',     ad: 'Üyelik Paketleri' },
    { id: 'ders-programi',        ad: 'Ders Programı' },
    { id: 'kayit-formu',          ad: 'Kayıt Formu' },
    { id: 'recete-iletme',        ad: 'Reçete İletme' },
    { id: 'ilac-hatirlatici',     ad: 'İlaç Hatırlatıcı' },
    { id: 'qr-menu',              ad: 'QR Menü' },
    { id: 'masadan-siparis',      ad: 'Masadan Sipariş' },
    { id: 'seviye-tespit-formu',  ad: 'Seviye Tespit Formu' },
    { id: 'oncesi-sonrasi-slider',ad: 'Öncesi/Sonrası' },
    { id: 'canli-destek',         ad: 'Canlı Destek' },
    { id: 'sss-genis',            ad: 'SSS (Geniş)' },
    { id: 'ekip-uyeleri',         ad: 'Ekip Üyeleri' },
]

interface EsnafRow {
    id: string
    ad: string
    sektor: string
    ilce: string
    sehir: string | null
    email: string | null
    paket: string
    durum: string
    churnSkoru: number
    saglikSkoru: number
    telefon: string
    telefonTemiz: string
    waNumarasi: string
    instagramUsername: string | null
    twilioNumarasi: string | null
    ayarlar: Record<string, any>
    subdomainUrl?: string | null
    aktifWebModulleri?: string[]
    notlar?: string
    kayitTarihi?: any
}

interface PanelState {
    durum: string
    paket: string
    botAktif: boolean
    twilioNumarasi: string
    aktifWebModulleri: string[]
    notlar: string
}

interface YeniEsnafForm {
    ad: string
    telefon: string
    sektor: string
    paket: string
    email: string
    ilce: string
    sehir: string
}

type SortKey = 'ad' | 'paket' | 'churnSkoru' | 'kayitTarihi'

const CARPAN: Record<string, string> = {
    TEMEL: 'x1', STANDART: 'x2', BUYUME: 'x5', PREMIUM: 'x20', PREMIUMPLUS: '∞',
}
const PAKET_BADGE: Record<string, string> = {
    TEMEL:       'border-border text-muted-foreground bg-card/50',
    STANDART:    'border-blue-800 text-blue-400 bg-blue-900/20',
    BUYUME:      'border-violet-800 text-violet-400 bg-violet-900/20',
    PREMIUM:     'border-amber-800 text-amber-400 bg-amber-900/20',
    PREMIUMPLUS: 'border-rose-800 text-rose-400 bg-rose-900/20',
}
const DURUM_DOT: Record<string, string> = {
    aktif: 'bg-emerald-400', pasif: 'bg-slate-600', riskli: 'bg-amber-400',
    onboarding: 'bg-blue-400', silindi: 'bg-rose-400',
}
const DURUM_TEXT: Record<string, string> = {
    aktif: 'text-emerald-400', pasif: 'text-muted-foreground', riskli: 'text-amber-400',
    onboarding: 'text-blue-400', silindi: 'text-rose-400',
}

// ─── Toast ───────────────────────────────────────────────────────────────────
interface Toast { id: number; msg: string; type: 'ok' | 'err' }
function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([])
    const show = useCallback((msg: string, type: 'ok' | 'err' = 'ok') => {
        const id = Date.now()
        setToasts(p => [...p, { id, msg, type }])
        setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
    }, [])
    return { toasts, show }
}

export default function EsnaflarPage() {
    const [esnaflar, setEsnaflar] = useState<EsnafRow[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [arama, setArama] = useState('')
    const [paketFiltre, setPaketFiltre] = useState('TÜMÜ')
    const [durumFiltre, setDurumFiltre] = useState('TÜMÜ')
    const [siteUretiyor, setSiteUretiyor] = useState<string | null>(null)
    const [secili, setSecili] = useState<EsnafRow | null>(null)
    const [panel, setPanel] = useState<PanelState | null>(null)
    const [kaydediyor, setKaydediyor] = useState(false)
    const [kaydetOk, setKaydetOk] = useState(false)
    // Sort
    const [sortKey, setSortKey] = useState<SortKey>('kayitTarihi')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
    // Silme modalı
    const [silinecek, setSilinecek] = useState<EsnafRow | null>(null)
    const [siliyor, setSiliyor] = useState(false)
    // Yeni esnaf modalı
    const [yeniModal, setYeniModal] = useState(false)
    const [yeniForm, setYeniForm] = useState<YeniEsnafForm>({
        ad: '', telefon: '', sektor: '', paket: 'TEMEL', email: '', ilce: '', sehir: '',
    })
    const [yeniKaydediyor, setYeniKaydediyor] = useState(false)
    const { toasts, show: showToast } = useToast()

    function yukleEsnaflar() {
        fetch('/api/admin/stats', { headers: { 'x-admin-token': ADMIN_TOKEN } })
            .then(r => r.json())
            .then(d => setEsnaflar(d.esnaflar || []))
            .catch(() => showToast('Veriler yüklenemedi', 'err'))
            .finally(() => setYukleniyor(false))
    }

    useEffect(() => { yukleEsnaflar() }, [])

    // ── Detail panel open ────────────────────────────────────────────────────
    function handleRowClick(e: EsnafRow) {
        setSecili(e)
        setPanel({
            durum: e.durum || 'aktif',
            paket: e.paket || 'TEMEL',
            botAktif: e.ayarlar?.botAktif !== false,
            twilioNumarasi: e.twilioNumarasi || '',
            aktifWebModulleri: e.aktifWebModulleri || [],
            notlar: e.notlar || '',
        })
        setKaydetOk(false)
    }

    function handlePanelKapat() { setSecili(null); setPanel(null) }

    function toggleModul(id: string) {
        if (!panel) return
        setPanel(prev => {
            if (!prev) return prev
            const mevcut = prev.aktifWebModulleri
            return {
                ...prev,
                aktifWebModulleri: mevcut.includes(id)
                    ? mevcut.filter(m => m !== id)
                    : [...mevcut, id],
            }
        })
    }

    // ── Save ─────────────────────────────────────────────────────────────────
    async function handleKaydet() {
        if (!secili || !panel) return
        setKaydediyor(true)
        try {
            const res = await fetch(`/api/admin/esnaf/${secili.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify({
                    durum: panel.durum,
                    paket: panel.paket,
                    ayarlar: { ...secili.ayarlar, botAktif: panel.botAktif },
                    twilioNumarasi: panel.twilioNumarasi || null,
                    aktifWebModulleri: panel.aktifWebModulleri,
                    notlar: panel.notlar,
                }),
            })
            if (res.ok) {
                setKaydetOk(true)
                showToast(`${secili.ad} güncellendi`)
                yukleEsnaflar()
                setTimeout(() => setKaydetOk(false), 3000)
            } else {
                showToast('Kaydetme başarısız', 'err')
            }
        } finally {
            setKaydediyor(false)
        }
    }

    // ── Delete ────────────────────────────────────────────────────────────────
    async function handleSil() {
        if (!silinecek) return
        setSiliyor(true)
        try {
            const res = await fetch(`/api/admin/esnaf/${silinecek.id}`, {
                method: 'DELETE',
                headers: { 'x-admin-token': ADMIN_TOKEN },
            })
            if (res.ok) {
                showToast(`${silinecek.ad} silindi`)
                setSilinecek(null)
                if (secili?.id === silinecek.id) handlePanelKapat()
                yukleEsnaflar()
            } else {
                const d = await res.json()
                showToast(d.error || 'Silme başarısız', 'err')
            }
        } finally {
            setSiliyor(false)
        }
    }

    // ── New esnaf ─────────────────────────────────────────────────────────────
    async function handleYeniEsnaf() {
        if (!yeniForm.ad.trim() || !yeniForm.telefon.trim() || !yeniForm.sektor.trim()) {
            showToast('Ad, telefon ve sektör zorunludur', 'err')
            return
        }
        setYeniKaydediyor(true)
        try {
            const res = await fetch('/api/admin/esnaf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify(yeniForm),
            })
            if (res.ok) {
                showToast(`${yeniForm.ad} oluşturuldu`)
                setYeniModal(false)
                setYeniForm({ ad: '', telefon: '', sektor: '', paket: 'TEMEL', email: '', ilce: '', sehir: '' })
                yukleEsnaflar()
            } else {
                const d = await res.json()
                showToast(d.error || 'Oluşturma başarısız', 'err')
            }
        } finally {
            setYeniKaydediyor(false)
        }
    }

    // ── Site üret ────────────────────────────────────────────────────────────
    async function handleSiteUret(esnafId: string, e?: React.MouseEvent) {
        e?.stopPropagation()
        setSiteUretiyor(esnafId)
        try {
            await fetch('/api/site/uret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify({ esnafId }),
            })
            setTimeout(() => {
                yukleEsnaflar()
                setSiteUretiyor(null)
            }, 5000)
        } catch {
            setSiteUretiyor(null)
        }
    }

    // ── Sort & Filter ─────────────────────────────────────────────────────────
    function handleSort(key: SortKey) {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        else { setSortKey(key); setSortDir('asc') }
    }

    const filtered = esnaflar
        .filter(e => {
            const t = arama.toLowerCase()
            const aramaGec = !t ||
                e.ad?.toLowerCase().includes(t) ||
                e.telefon?.toLowerCase().includes(t) ||
                e.sektor?.toLowerCase().includes(t) ||
                e.email?.toLowerCase().includes(t)
            const paketGec = paketFiltre === 'TÜMÜ' || e.paket === paketFiltre
            const durumGec = durumFiltre === 'TÜMÜ' || e.durum === durumFiltre
            return aramaGec && paketGec && durumGec
        })
        .sort((a, b) => {
            let av: any, bv: any
            if (sortKey === 'ad') { av = a.ad?.toLowerCase() || ''; bv = b.ad?.toLowerCase() || '' }
            else if (sortKey === 'paket') { av = a.paket || ''; bv = b.paket || '' }
            else if (sortKey === 'churnSkoru') { av = a.churnSkoru || 0; bv = b.churnSkoru || 0 }
            else {
                av = a.kayitTarihi?.seconds || 0
                bv = b.kayitTarihi?.seconds || 0
            }
            if (av < bv) return sortDir === 'asc' ? -1 : 1
            if (av > bv) return sortDir === 'asc' ? 1 : -1
            return 0
        })

    function SortIcon({ col }: { col: SortKey }) {
        if (sortKey !== col) return <span className="text-slate-700 ml-1 inline-block">↕</span>
        return sortDir === 'asc'
            ? <ChevronUp className="w-3 h-3 inline-block ml-1 text-muted-foreground" />
            : <ChevronDown className="w-3 h-3 inline-block ml-1 text-muted-foreground" />
    }

    function formatTarih(ts: any) {
        if (!ts) return '—'
        // Firestore Timestamps serialize as {_seconds} or {seconds}
        const secs = ts._seconds ?? ts.seconds
        const d = secs ? new Date(secs * 1000) : new Date(ts)
        if (isNaN(d.getTime())) return '—'
        return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: '2-digit' })
    }

    return (
        <div className="p-8 min-h-screen bg-slate-950 relative">

            {/* ── Toast Container ─────────────────────────────────────── */}
            <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded shadow-lg text-sm font-medium pointer-events-none animate-in fade-in slide-in-from-right-4 duration-200 ${
                            t.type === 'ok'
                                ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-800'
                                : 'bg-rose-900/90 text-rose-200 border border-rose-800'
                        }`}
                    >
                        {t.type === 'ok'
                            ? <Check className="w-4 h-4 flex-shrink-0" />
                            : <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        }
                        {t.msg}
                    </div>
                ))}
            </div>

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-syne text-xl font-bold text-slate-100 tracking-tight">Esnaf Yönetimi</h1>
                    <p className="text-muted-foreground text-xs mt-1 font-mono">
                        {yukleniyor ? '...' : `${filtered.length} / ${esnaflar.length} kayıt`}
                    </p>
                </div>
                <button
                    onClick={() => setYeniModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Yeni Esnaf
                </button>
            </div>

            {/* ── Filtreler ──────────────────────────────────────────── */}
            <div className="flex items-center gap-3 mb-6">
                <input
                    type="text"
                    value={arama}
                    onChange={e => setArama(e.target.value)}
                    placeholder="Esnaf, telefon, email, sektör ara..."
                    className="bg-background border border-border/50 text-slate-100 placeholder-slate-600 text-sm rounded px-3 py-2 w-80 font-mono focus:outline-none focus:border-slate-600"
                />
                <select
                    value={paketFiltre}
                    onChange={e => setPaketFiltre(e.target.value)}
                    className="bg-background border border-border/50 text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none focus:border-slate-600"
                >
                    <option>TÜMÜ</option>
                    {['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'].map(p => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
                <select
                    value={durumFiltre}
                    onChange={e => setDurumFiltre(e.target.value)}
                    className="bg-background border border-border/50 text-muted-foreground text-sm rounded px-3 py-2 focus:outline-none focus:border-slate-600"
                >
                    <option>TÜMÜ</option>
                    {['aktif', 'pasif', 'riskli', 'onboarding', 'silindi'].map(d => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* ── Tablo ───────────────────────────────────────────────── */}
            <div className="bg-background rounded overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/50">
                            <th className="px-3 py-3 w-4" />
                            <th
                                className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal cursor-pointer hover:text-muted-foreground select-none"
                                onClick={() => handleSort('ad')}
                            >
                                Esnaf <SortIcon col="ad" />
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Sektör</th>
                            <th
                                className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal cursor-pointer hover:text-muted-foreground select-none"
                                onClick={() => handleSort('paket')}
                            >
                                Paket <SortIcon col="paket" />
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Tahsis</th>
                            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Bot</th>
                            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Durum</th>
                            <th
                                className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal cursor-pointer hover:text-muted-foreground select-none"
                                onClick={() => handleSort('churnSkoru')}
                            >
                                Churn <SortIcon col="churnSkoru" />
                            </th>
                            <th
                                className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal cursor-pointer hover:text-muted-foreground select-none"
                                onClick={() => handleSort('kayitTarihi')}
                            >
                                Kayıt <SortIcon col="kayitTarihi" />
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Site</th>
                            <th className="px-4 py-3 w-8" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/30">
                        {yukleniyor && (
                            <tr><td colSpan={11} className="px-4 py-8 text-center text-muted-foreground font-mono text-xs">Yükleniyor...</td></tr>
                        )}
                        {!yukleniyor && filtered.length === 0 && (
                            <tr><td colSpan={11} className="px-4 py-8 text-center text-muted-foreground font-mono text-xs">Kayıt bulunamadı</td></tr>
                        )}
                        {filtered.map(e => (
                            <tr
                                key={e.id}
                                onClick={() => handleRowClick(e)}
                                className={`hover:bg-card/40 transition-colors cursor-pointer ${secili?.id === e.id ? 'bg-card/50 ring-1 ring-inset ring-slate-700' : ''}`}
                            >
                                <td className="pl-3 pr-0 py-3 w-4">
                                    <ChevronRight className={`w-3 h-3 text-muted-foreground transition-transform ${secili?.id === e.id ? 'rotate-90 text-muted-foreground' : ''}`} />
                                </td>
                                {/* Esnaf */}
                                <td className="px-4 py-3">
                                    <p className="text-foreground text-sm">{e.ad || '—'}</p>
                                    <p className="text-muted-foreground text-xs font-mono mt-0.5">{e.email || e.telefonTemiz || e.telefon || '—'}</p>
                                </td>
                                {/* Sektör */}
                                <td className="px-4 py-3 text-muted-foreground text-xs">{e.sektor || '—'}</td>
                                {/* Paket */}
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${PAKET_BADGE[e.paket] || PAKET_BADGE.TEMEL}`}>
                                        {CARPAN[e.paket] || 'x1'} {e.paket}
                                    </span>
                                </td>
                                {/* Tahsis Numara */}
                                <td className="px-4 py-3">
                                    {e.twilioNumarasi
                                        ? <span className="text-muted-foreground text-xs font-mono">{e.twilioNumarasi}</span>
                                        : <span className="text-slate-700 text-xs">—</span>
                                    }
                                </td>
                                {/* Bot */}
                                <td className="px-4 py-3">
                                    {e.ayarlar?.botAktif !== false
                                        ? <span className="text-xs text-emerald-400">Devrede</span>
                                        : <span className="text-xs text-amber-400">Manuel</span>
                                    }
                                </td>
                                {/* Durum */}
                                <td className="px-4 py-3">
                                    <span className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DURUM_DOT[e.durum] || 'bg-slate-600'}`} />
                                        <span className={`text-xs ${DURUM_TEXT[e.durum] || 'text-muted-foreground'}`}>{e.durum}</span>
                                    </span>
                                </td>
                                {/* Churn */}
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-mono font-bold ${e.churnSkoru > 70 ? 'text-rose-400' : e.churnSkoru > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                        {e.churnSkoru ?? '—'}
                                    </span>
                                </td>
                                {/* Kayıt Tarihi */}
                                <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{formatTarih(e.kayitTarihi)}</td>
                                {/* Site */}
                                <td className="px-4 py-3" onClick={ev => ev.stopPropagation()}>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(ev) => handleSiteUret(e.id, ev)}
                                            disabled={siteUretiyor === e.id}
                                            className="px-2 py-1 bg-card hover:bg-slate-700 disabled:opacity-50 text-muted-foreground text-xs font-mono rounded transition-colors flex items-center gap-1"
                                        >
                                            {siteUretiyor === e.id
                                                ? <><Loader2 className="w-3 h-3 animate-spin" /> Üretiliyor</>
                                                : 'Site Üret'
                                            }
                                        </button>
                                        {e.subdomainUrl && (
                                            <a href={e.subdomainUrl} target="_blank" rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-blue-400 transition-colors" title="Önizle">
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </td>
                                {/* Sil butonu (tablo satırında) */}
                                <td className="px-2 py-3" onClick={ev => ev.stopPropagation()}>
                                    <button
                                        onClick={() => setSilinecek(e)}
                                        title="Kalıcı Sil"
                                        className="text-slate-700 hover:text-rose-400 transition-colors p-1 rounded hover:bg-rose-500/10"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Overlay ─────────────────────────────────────────────── */}
            {secili && (
                <div className="fixed inset-0 bg-black/40 z-40" onClick={handlePanelKapat} />
            )}

            {/* ── Detail Panel ──────────────────────────────────────── */}
            <div className={`fixed top-0 right-0 bottom-0 w-[440px] bg-background border-l border-border z-50 flex flex-col transition-transform duration-300 ${secili ? 'translate-x-0' : 'translate-x-full'}`}>
                {secili && panel && (
                    <>
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-slate-100 font-syne font-semibold truncate">{secili.ad}</p>
                                <p className="text-muted-foreground text-xs font-mono mt-0.5 truncate">{secili.id}</p>
                            </div>
                            <button onClick={handlePanelKapat} className="text-muted-foreground hover:text-muted-foreground flex-shrink-0 mt-0.5">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

                            {/* Kimlik */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Kimlik</p>
                                <div className="space-y-2 text-sm">
                                    {[
                                        ['Sektör', secili.sektor],
                                        ['İlçe / Şehir', [secili.ilce, secili.sehir].filter(Boolean).join(', ') || '—'],
                                        ['Telefon', secili.telefon || '—'],
                                        ['Email', secili.email || '—'],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex items-center justify-between">
                                            <span className="text-muted-foreground">{k}</span>
                                            <span className="text-muted-foreground font-mono text-xs">{v}</span>
                                        </div>
                                    ))}
                                    {secili.waNumarasi && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">WhatsApp</span>
                                            <a href={`https://wa.me/${secili.waNumarasi.replace(/\D/g, '')}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-emerald-400 text-xs hover:underline font-mono">
                                                {secili.waNumarasi}
                                                <MessageCircle className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                    {secili.instagramUsername && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Instagram</span>
                                            <a href={`https://instagram.com/${secili.instagramUsername}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-pink-400 text-xs hover:underline font-mono">
                                                @{secili.instagramUsername}
                                                <Instagram className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Risk & Sağlık */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Risk & Sağlık</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-card/50 rounded p-3 text-center">
                                        <p className="text-muted-foreground text-[10px] mb-1">Churn Skoru</p>
                                        <p className={`font-syne font-bold text-xl ${secili.churnSkoru > 70 ? 'text-rose-400' : secili.churnSkoru > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                            {secili.churnSkoru ?? '—'}
                                        </p>
                                    </div>
                                    <div className="bg-card/50 rounded p-3 text-center">
                                        <p className="text-muted-foreground text-[10px] mb-1">Sağlık Skoru</p>
                                        <p className={`font-syne font-bold text-xl ${(secili.saglikSkoru ?? 50) > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {secili.saglikSkoru ?? '—'}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Paket & Durum */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Paket & Durum</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Paket</label>
                                        <select
                                            value={panel.paket}
                                            onChange={e => setPanel(p => p ? { ...p, paket: e.target.value } : p)}
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-2 py-1.5 focus:outline-none focus:border-slate-500"
                                        >
                                            {['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'].map(p => (
                                                <option key={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Durum</label>
                                        <select
                                            value={panel.durum}
                                            onChange={e => setPanel(p => p ? { ...p, durum: e.target.value } : p)}
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-2 py-1.5 focus:outline-none focus:border-slate-500"
                                        >
                                            {['aktif', 'pasif', 'riskli', 'onboarding', 'silindi'].map(d => (
                                                <option key={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Sohbet Botu */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Sohbet Botu</p>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-muted-foreground">Bot Aktif</span>
                                    <div
                                        onClick={() => setPanel(p => p ? { ...p, botAktif: !p.botAktif } : p)}
                                        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${panel.botAktif ? 'bg-emerald-500' : 'bg-slate-700'}`}
                                    >
                                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${panel.botAktif ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                    </div>
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {panel.botAktif ? 'Gelen mesajlara AI yanıt verir' : 'Esnaf mesajları manuel yönetir'}
                                </p>
                            </section>

                            {/* Twilio Numara */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Tahsis Numara</p>
                                <input
                                    type="text"
                                    value={panel.twilioNumarasi}
                                    onChange={e => setPanel(p => p ? { ...p, twilioNumarasi: e.target.value } : p)}
                                    placeholder="+905XXXXXXXXX"
                                    className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 font-mono focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                />
                            </section>

                            {/* Site */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Web Sitesi</p>
                                {secili.subdomainUrl ? (
                                    <a href={secili.subdomainUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-400 text-xs font-mono hover:underline mb-2">
                                        <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                                        <span className="truncate">{secili.subdomainUrl}</span>
                                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                    </a>
                                ) : (
                                    <p className="text-muted-foreground text-xs mb-2">Henüz site oluşturulmadı</p>
                                )}
                                <button
                                    onClick={() => handleSiteUret(secili.id)}
                                    disabled={siteUretiyor === secili.id}
                                    className="w-full py-1.5 bg-card hover:bg-slate-700 disabled:opacity-50 text-muted-foreground text-xs font-mono rounded border border-border transition-colors flex items-center justify-center gap-2"
                                >
                                    {siteUretiyor === secili.id
                                        ? <><Loader2 className="w-3 h-3 animate-spin" /> Üretiliyor...</>
                                        : 'Site Üret / Yenile'
                                    }
                                </button>
                            </section>

                            {/* Web Modülleri */}
                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Web Modülleri</p>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                                        {panel.aktifWebModulleri.length} / {WEB_MODULLER.length} aktif
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    {WEB_MODULLER.map(m => (
                                        <label key={m.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-card/50 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={panel.aktifWebModulleri.includes(m.id)}
                                                onChange={() => toggleModul(m.id)}
                                                className="w-3 h-3 accent-emerald-500 flex-shrink-0"
                                            />
                                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">{m.ad}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>

                            {/* Notlar */}
                            <section>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Admin Notları</p>
                                <textarea
                                    value={panel.notlar}
                                    onChange={e => setPanel(p => p ? { ...p, notlar: e.target.value } : p)}
                                    rows={3}
                                    placeholder="Dahili not..."
                                    className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-2 font-mono focus:outline-none focus:border-slate-500 placeholder-slate-700 resize-none"
                                />
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-border space-y-2">
                            <button
                                onClick={handleKaydet}
                                disabled={kaydediyor}
                                className={`w-full py-2 rounded text-sm font-syne font-semibold transition-all flex items-center justify-center gap-2 ${
                                    kaydetOk
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-100 disabled:opacity-50'
                                }`}
                            >
                                {kaydediyor
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor...</>
                                    : kaydetOk
                                        ? '✓ Kaydedildi'
                                        : <><Save className="w-4 h-4" /> Kaydet</>
                                }
                            </button>
                            <button
                                onClick={() => setSilinecek(secili)}
                                className="w-full py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 border border-rose-900/50 text-rose-500 hover:bg-rose-500/10 hover:border-rose-700 hover:text-rose-400"
                            >
                                <Trash2 className="w-4 h-4" />
                                Kalıcı Sil
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* ── Silme Onay Modalı ──────────────────────────────────── */}
            {silinecek && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => !siliyor && setSilinecek(null)} />
                    <div className="relative bg-background border border-border rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-rose-500/15 flex items-center justify-center flex-shrink-0">
                                <Trash2 className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                                <p className="text-slate-100 font-semibold">Kaydı Sil</p>
                                <p className="text-muted-foreground text-xs mt-0.5">Bu işlem geri alınamaz</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-6">
                            <span className="text-foreground font-medium">{silinecek.ad}</span> adlı esnafı
                            Firebase'den kalıcı olarak silmek istediğinize emin misiniz?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSilinecek(null)}
                                disabled={siliyor}
                                className="flex-1 py-2 rounded text-sm text-muted-foreground bg-card hover:bg-slate-700 transition-colors disabled:opacity-50"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSil}
                                disabled={siliyor}
                                className="flex-1 py-2 rounded text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {siliyor
                                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Siliniyor...</>
                                    : 'Evet, Sil'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Yeni Esnaf Modalı ─────────────────────────────────── */}
            {yeniModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => !yeniKaydediyor && setYeniModal(false)} />
                    <div className="relative bg-background border border-border rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-slate-100 font-syne font-semibold">Yeni Esnaf Ekle</p>
                            <button onClick={() => setYeniModal(false)} className="text-muted-foreground hover:text-muted-foreground">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {/* Zorunlu alanlar */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                                        İşletme Adı <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={yeniForm.ad}
                                        onChange={e => setYeniForm(f => ({ ...f, ad: e.target.value }))}
                                        placeholder="Örn: Ahmet Berber"
                                        className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                                        Telefon <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={yeniForm.telefon}
                                        onChange={e => setYeniForm(f => ({ ...f, telefon: e.target.value }))}
                                        placeholder="+905XXXXXXXXX"
                                        className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 font-mono focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                                    Sektör <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={yeniForm.sektor}
                                    onChange={e => setYeniForm(f => ({ ...f, sektor: e.target.value }))}
                                    placeholder="Örn: Berber, Restoran, Oto Tamir..."
                                    className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Paket</label>
                                <select
                                    value={yeniForm.paket}
                                    onChange={e => setYeniForm(f => ({ ...f, paket: e.target.value }))}
                                    className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 focus:outline-none focus:border-slate-500"
                                >
                                    {['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'].map(p => (
                                        <option key={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Opsiyonel alanlar */}
                            <div className="pt-1">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Opsiyonel</p>
                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        value={yeniForm.email}
                                        onChange={e => setYeniForm(f => ({ ...f, email: e.target.value }))}
                                        placeholder="Email adresi"
                                        className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={yeniForm.ilce}
                                            onChange={e => setYeniForm(f => ({ ...f, ilce: e.target.value }))}
                                            placeholder="İlçe"
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                        />
                                        <input
                                            type="text"
                                            value={yeniForm.sehir}
                                            onChange={e => setYeniForm(f => ({ ...f, sehir: e.target.value }))}
                                            placeholder="Şehir"
                                            className="w-full bg-card border border-border text-muted-foreground text-sm rounded px-3 py-1.5 focus:outline-none focus:border-slate-500 placeholder-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setYeniModal(false)}
                                disabled={yeniKaydediyor}
                                className="flex-1 py-2 rounded text-sm text-muted-foreground bg-card hover:bg-slate-700 transition-colors disabled:opacity-50"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleYeniEsnaf}
                                disabled={yeniKaydediyor}
                                className="flex-1 py-2 rounded text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {yeniKaydediyor
                                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Oluşturuluyor...</>
                                    : <><Plus className="w-4 h-4" /> Oluştur</>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
