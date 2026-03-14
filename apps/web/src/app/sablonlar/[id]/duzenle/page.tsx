'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, Monitor, Tablet, Smartphone, Save, Rocket,
    X, Check, Crown, Zap, Star, Lock, Sparkles, Loader2,
    LogOut, User, AlertTriangle
} from 'lucide-react'
import { SABLONLAR } from '@/data/sablonlar'
import { MODULLER } from '@/data/moduller'
import { ortakCSS, ortakNav, ortakFooter } from '@/data/sablonlar/ortak'
import { sektorProfiliBul, profilCssDegerleri } from '@/data/sektorKatalogu'

/* ─── Auth & Quota helpers ─── */
interface KepenkUser {
    ad: string
    email: string
    avatar?: string
    girisZamani: number
}

const AYLIK_KOTA = 3

function kotaAnahtari(): string {
    const simdi = new Date()
    return `kepenk_kota_${simdi.getFullYear()}_${simdi.getMonth()}`
}

function kullaniciOku(): KepenkUser | null {
    try {
        const raw = localStorage.getItem('kepenk_user')
        return raw ? JSON.parse(raw) : null
    } catch { return null }
}

function kullaniciKaydet(user: KepenkUser) {
    localStorage.setItem('kepenk_user', JSON.stringify(user))
}

function kullaniciSil() {
    localStorage.removeItem('kepenk_user')
}

function kotaOku(): string[] {
    try {
        const raw = localStorage.getItem(kotaAnahtari())
        return raw ? JSON.parse(raw) : []
    } catch { return [] }
}

function kotaEkle(sablonId: string): boolean {
    const mevcut = kotaOku()
    if (mevcut.includes(sablonId)) return true // zaten sayılmış
    if (mevcut.length >= AYLIK_KOTA) return false // kota doldu
    mevcut.push(sablonId)
    localStorage.setItem(kotaAnahtari(), JSON.stringify(mevcut))
    return true
}

function kotaKalan(): number {
    return Math.max(0, AYLIK_KOTA - kotaOku().length)
}

/* ─── Draft interface ─── */
interface TaslaKalip {
    isletmeAdi: string
    kisaAd: string
    telefon: string
    adres: string
    ilce: string
    sehir: string
    heroBaslik: string
    heroSlogan: string
    ctaBirincil: string
    ctaIkincil: string
    hizmetlerHtml: string
    nedenBizHtml: string
    yorumlarHtml: string
    hikaye: string
}

const VARSAYILAN: TaslaKalip = {
    isletmeAdi: '',
    kisaAd: '',
    telefon: '',
    adres: '',
    ilce: 'Kadıköy',
    sehir: 'İstanbul',
    heroBaslik: '',
    heroSlogan: '',
    ctaBirincil: 'Hemen Başla',
    ctaIkincil: 'Bize Ulaşın',
    hizmetlerHtml: '',
    nedenBizHtml: '',
    yorumlarHtml: '',
    hikaye: '',
}

/* ─── Paket renkleri ─── */
const PAKET_RENK: Record<string, { bg: string; text: string; border: string }> = {
    TEMEL: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.25)' },
    STANDART: { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
    BUYUME: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    PREMIUM: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.25)' },
}

/* ─── Fiyat planları ─── */
const PLANLAR = [
    { id: 'STANDART', ad: 'Standart', fiyat: 299, emoji: '⚡', ozellikler: ['1 Web Sitesi', '5 Modül', 'SSL Sertifikası', 'E-posta Desteği'] },
    { id: 'BUYUME', ad: 'Büyüme', fiyat: 599, emoji: '🚀', ozellikler: ['1 Web Sitesi', '15 Modül', 'SSL + CDN', 'Whatsapp Desteği', 'AI İçerik Yazarı'], popüler: true },
    { id: 'PREMIUM', ad: 'Premium', fiyat: 999, emoji: '👑', ozellikler: ['3 Web Sitesi', 'Tüm Modüller', 'Özel Domain', '7/24 Destek', 'AI Tam Paket', 'Öncelikli Güncelleme'] },
]

export default function FreemiumEditorPage() {
    const params = useParams()
    const router = useRouter()
    const sablonId = params.id as string

    const sablon = useMemo(() => SABLONLAR.find(s => s.id === sablonId), [sablonId])

    // ─── Auth & Quota state ───
    const [kullanici, setKullanici] = useState<KepenkUser | null>(null)
    const [authYukleniyor, setAuthYukleniyor] = useState(true)
    const [girisModalAcik, setGirisModalAcik] = useState(false)
    const [kotaDoldu, setKotaDoldu] = useState(false)
    const [kalanHak, setKalanHak] = useState(AYLIK_KOTA)

    // Auth form state
    const [girisEmail, setGirisEmail] = useState('')
    const [girisSifre, setGirisSifre] = useState('')
    const [girisHata, setGirisHata] = useState('')
    const [girisYukleniyor, setGirisYukleniyor] = useState(false)
    const [girisAdim, setGirisAdim] = useState<'giris' | 'kayit'>('giris')
    const [kayitAd, setKayitAd] = useState('')

    // Draft state with localStorage persistence
    const [form, setForm] = useState<TaslaKalip>(VARSAYILAN)
    const [onizleme, setOnizleme] = useState<'masaustu' | 'tablet' | 'mobil'>('masaustu')
    const [kaydedildi, setKaydedildi] = useState(false)
    const [paywallAcik, setPaywallAcik] = useState(false)
    const [aiYukleniyor, setAiYukleniyor] = useState(false)
    const [aiUretildi, setAiUretildi] = useState(false)

    // ─── Auth check on mount ───
    useEffect(() => {
        const user = kullaniciOku()
        if (user) {
            setKullanici(user)
            // Check quota
            const kalan = kotaKalan()
            setKalanHak(kalan)
            const mevcut = kotaOku()
            if (!mevcut.includes(sablonId) && kalan <= 0) {
                setKotaDoldu(true)
            } else if (!mevcut.includes(sablonId)) {
                // Register this template usage
                kotaEkle(sablonId)
                setKalanHak(kotaKalan())
            }
        } else {
            setGirisModalAcik(true)
        }
        setAuthYukleniyor(false)
    }, [sablonId])

    // ─── Auth handlers ───
    const handleGiris = useCallback(() => {
        if (!girisEmail || !girisSifre) {
            setGirisHata('E-posta ve şifre gerekli')
            return
        }
        setGirisYukleniyor(true)
        setGirisHata('')
        // Simulate login delay
        setTimeout(() => {
            const user: KepenkUser = {
                ad: girisEmail.split('@')[0],
                email: girisEmail,
                girisZamani: Date.now(),
            }
            kullaniciKaydet(user)
            setKullanici(user)
            setGirisModalAcik(false)
            setGirisYukleniyor(false)
            // Register quota
            const ok = kotaEkle(sablonId)
            setKalanHak(kotaKalan())
            if (!ok) setKotaDoldu(true)
        }, 800)
    }, [girisEmail, girisSifre, sablonId])

    const handleKayit = useCallback(() => {
        if (!kayitAd || !girisEmail || !girisSifre) {
            setGirisHata('Tüm alanları doldurun')
            return
        }
        setGirisYukleniyor(true)
        setGirisHata('')
        setTimeout(() => {
            const user: KepenkUser = {
                ad: kayitAd,
                email: girisEmail,
                girisZamani: Date.now(),
            }
            kullaniciKaydet(user)
            setKullanici(user)
            setGirisModalAcik(false)
            setGirisYukleniyor(false)
            const ok = kotaEkle(sablonId)
            setKalanHak(kotaKalan())
            if (!ok) setKotaDoldu(true)
        }, 800)
    }, [kayitAd, girisEmail, girisSifre, sablonId])

    const handleCikis = useCallback(() => {
        kullaniciSil()
        setKullanici(null)
        setGirisModalAcik(true)
    }, [])

    // Load draft from localStorage on mount
    useEffect(() => {
        if (!sablonId) return
        const kayitli = localStorage.getItem(`kepenk_draft_${sablonId}`)
        if (kayitli) {
            try {
                setForm(JSON.parse(kayitli))
            } catch { /* ignore */ }
        }
    }, [sablonId])

    // Auto-save draft
    const kaydet = useCallback(() => {
        if (!sablonId) return
        localStorage.setItem(`kepenk_draft_${sablonId}`, JSON.stringify(form))
        setKaydedildi(true)
        setTimeout(() => setKaydedildi(false), 2000)
    }, [sablonId, form])

    // Auto-save on change
    useEffect(() => {
        if (!sablonId) return
        const timer = setTimeout(() => {
            localStorage.setItem(`kepenk_draft_${sablonId}`, JSON.stringify(form))
        }, 1000)
        return () => clearTimeout(timer)
    }, [form, sablonId])

    const alaniGuncelle = (alan: keyof TaslaKalip, deger: string) => {
        setForm(prev => ({ ...prev, [alan]: deger }))
    }

    // AI İçerik Üret
    const aiIcerikUret = useCallback(async () => {
        if (!form.isletmeAdi) return
        setAiYukleniyor(true)
        try {
            const res = await fetch('/api/site/ai-icerik-uret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    isletmeAdi: form.isletmeAdi,
                    sektor: sablon?.etiketler?.[0] || 'genel',
                    ilce: form.ilce,
                    sehir: form.sehir,
                    telefon: form.telefon,
                }),
            })
            const data = await res.json()
            if (data.ok && data.icerik) {
                const ic = data.icerik
                setForm(prev => ({
                    ...prev,
                    heroBaslik: ic.heroBaslik || prev.heroBaslik,
                    heroSlogan: ic.heroSlogan || prev.heroSlogan,
                    ctaBirincil: ic.ctaBirincil || prev.ctaBirincil,
                    ctaIkincil: ic.ctaIkincil || prev.ctaIkincil,
                    hizmetlerHtml: ic.hizmetlerHtml || prev.hizmetlerHtml,
                    nedenBizHtml: ic.nedenBizHtml || prev.nedenBizHtml,
                    yorumlarHtml: ic.yorumlarHtml || prev.yorumlarHtml,
                    hikaye: ic.hikaye || prev.hikaye,
                }))
                setAiUretildi(true)
                setTimeout(() => setAiUretildi(false), 3000)
            }
        } catch { /* sessizce geç */ }
        finally { setAiYukleniyor(false) }
    }, [form.isletmeAdi, form.ilce, form.sehir, form.telefon, sablon])

    // Build preview HTML with form data
    const previewHtml = useMemo(() => {
        if (!sablon) return ''
        const d = form

        const profil = sektorProfiliBul(sablon.id)
        const profilCss = profil ? profilCssDegerleri(profil) : null

        let preview = sablon.htmlKodu
            .replace(/\$\{ortakCSS\}/g, ortakCSS)
            .replace(/\$\{ortakNav\}/g, ortakNav)
            .replace(/\$\{ortakFooter\}/g, ortakFooter)

        preview = preview
            .replace(/\{\{ISLETME_ADI\}\}/g, d.isletmeAdi || 'İşletme Adınız')
            .replace(/\{\{ISLETME_KISAADI\}\}/g, d.kisaAd || 'İşletme')
            .replace(/\{\{SEKTOR\}\}/g, sablon.etiketler?.[0] || 'Sektör')
            .replace(/\{\{ILCE\}\}/g, d.ilce || 'Kadıköy')
            .replace(/\{\{SEHIR\}\}/g, d.sehir || 'İstanbul')
            .replace(/\{\{TELEFON\}\}/g, d.telefon || '05XX XXX XXXX')
            .replace(/\{\{TELEFON_GOSTERIM\}\}/g, d.telefon || '05XX XXX XXXX')
            .replace(/\{\{WHATSAPP\}\}/g, d.telefon?.replace(/\s/g, '') || '905XXXXXXXXX')
            .replace(/\{\{ADRES_METNI\}\}/g, d.adres || 'Adresiniz burada görünecek')
            .replace(/\{\{HARITA_URL\}\}/g, `https://maps.google.com/maps?q=${encodeURIComponent(d.adres || 'İstanbul')}&output=embed`)
            .replace(/\{\{OG_URL\}\}/g, '#')
            .replace(/\{\{WA_MESAJ\}\}/g, encodeURIComponent(`Merhaba, ${d.isletmeAdi || 'İşletme'} hakkında bilgi almak istiyorum`))
            .replace(/\{\{CSS_ARKAPLAN\}\}/g, profilCss?.CSS_ARKAPLAN || '#0f0f0f')
            .replace(/\{\{CSS_KART\}\}/g, profilCss?.CSS_KART || '#1a1a1a')
            .replace(/\{\{CSS_VURGU\}\}/g, profilCss?.CSS_VURGU || '#c9541e')
            .replace(/\{\{CSS_HOVER\}\}/g, profilCss?.CSS_HOVER || '#a8441a')
            .replace(/\{\{CSS_METIN\}\}/g, profilCss?.CSS_METIN || '#f5f1eb')
            .replace(/\{\{CSS_ALT\}\}/g, profilCss?.CSS_ALT || '#94877a')
            .replace(/\{\{CSS_GRADIENT\}\}/g, profilCss?.CSS_GRADIENT || 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)')
            .replace(/\{\{FONT_BASLIK\}\}/g, profilCss?.FONT_BASLIK || 'Syne')
            .replace(/\{\{FONT_METIN\}\}/g, profilCss?.FONT_METIN || 'Inter')
            .replace(/\{\{HERO_BASLIK\}\}/g, d.heroBaslik || 'Hoş Geldiniz')
            .replace(/\{\{HERO_SLOGAN\}\}/g, d.heroSlogan || 'İşletmenizin sloganı burada')
            .replace(/\{\{HERO_CTA_BIRINCIL\}\}/g, d.ctaBirincil || 'Hemen Başla')
            .replace(/\{\{HERO_CTA_IKINCIL\}\}/g, d.ctaIkincil || 'Bize Ulaşın')
            .replace(/\{\{HIZMETLER_HTML\}\}/g, d.hizmetlerHtml || '<div style="text-align:center;padding:20px;color:var(--renk-alt);">✨ AI ile içerik üretin</div>')
            .replace(/\{\{NEDEN_BIZ_HTML\}\}/g, d.nedenBizHtml || '<div style="text-align:center;padding:20px;color:var(--renk-alt);">✨ AI ile içerik üretin</div>')
            .replace(/\{\{YORUMLAR_HTML\}\}/g, d.yorumlarHtml || '<div style="text-align:center;padding:20px;color:var(--renk-alt);">✨ AI ile içerik üretin</div>')
            .replace(/\{\{SEO_BASLIK\}\}/g, d.isletmeAdi || 'İşletme Adınız')
            .replace(/\{\{SEO_ACIKLAMA\}\}/g, d.heroSlogan || 'İşletme açıklamanız')
            .replace(/\{\{INSTAGRAM_URL\}\}/g, '#')
            .replace(/\{\{FACEBOOK_URL\}\}/g, '#')
            .replace(/\{\{GMB_LINK\}\}/g, '#')

        // Modül yer tutucular
        preview = preview.replace(/\{\{MODUL_([A-Z_]+)\}\}/g, (match, modulAd) => {
            const id = modulAd.toLowerCase().replace(/_/g, '-')
            const mod = MODULLER.find(m => m.id === id)
            if (mod && mod.htmlSablon) {
                return mod.htmlSablon
                    .replace(/ISLETME_ADI/g, d.isletmeAdi || 'İşletme')
                    .replace(/WHATSAPP_NUMARA/g, d.telefon?.replace(/\s/g, '') || '905XXXXXXXXX')
                    .replace(/ESNAF_ID/g, 'draft')
                    .replace(/KEPENK_API_URL/g, 'https://kepenk.ai')
                    .replace(/TELEFON/g, d.telefon || '05XX XXX XXXX')
                    .replace(/ADRES_METNI/g, d.adres || 'Adres')
                    .replace(/HARITA_QUERY/g, encodeURIComponent(`${d.isletmeAdi || 'İşletme'} ${d.ilce} ${d.sehir}`))
                    .replace(/KURUCU_ADI/g, d.kisaAd || 'İşletme Sahibi')
                    .replace(/GMB_LINK/g, '#')
                    .replace(/INSTAGRAM_URL/g, '#')
                    .replace(/FACEBOOK_URL/g, '#')
                    .replace(/YOUTUBE_URL/g, '#')
                    .replace(/TIKTOK_URL/g, '#')
                    .replace(/TWITTER_URL/g, '#')
                    .replace(/BASVURU_LINK/g, '#')
                    .replace(/DUYURU_LINK/g, '#')
                    .replace(/DUYURU_METNI/g, '🎉 Yeni hizmetlerimiz yayında!')
                    .replace(/KAMPANYA_BASLIK/g, 'Özel Kampanya')
                    .replace(/KAMPANYA_ACIKLAMA/g, 'Sınırlı süre için geçerli')
                    .replace(/INDIRIM_YUZDESI/g, '20')
                    .replace(/SAATLER_JSON/g, JSON.stringify([
                        { gun: 'Pazartesi - Cuma', saat: '09:00 - 18:00' },
                        { gun: 'Cumartesi', saat: '10:00 - 15:00' }
                    ]))
                    .replace(/ISTATISTIKLER_JSON/g, JSON.stringify([
                        { deger: '10+', etiket: 'Yıllık Tecrübe' },
                        { deger: '1000+', etiket: 'Mutlu Müşteri' }
                    ]))
                    .replace(/ADIMLAR_JSON/g, JSON.stringify([
                        { baslik: 'İletişim', aciklama: 'Bize ulaşın.' },
                        { baslik: 'Planlama', aciklama: 'Planınızı yapalım.' },
                        { baslik: 'Uygulama', aciklama: 'Hızlıca uygulayalım.' }
                    ]))
                    .replace(/MAKALELER_JSON/g, JSON.stringify([
                        { baslik: 'Sektör Trendleri', oset: 'Bu yılın gelişmeleri.' }
                    ]))
                    .replace(/ILANLAR_JSON/g, JSON.stringify([
                        { baslik: 'Ekip Arkadaşı Arıyoruz', aciklama: 'Deneyimli çalışma arkadaşları.' }
                    ]))
                    .replace(/HIKAYE_METNI/g, d.hikaye || 'Hikayenizi buraya ekleyin.')
                    .replace(/MISYON_METNI/g, d.hikaye || 'Misyonunuzu buraya ekleyin.')
            }
            return ''
        })

        return preview
    }, [sablon, form])

    const onizlemeGenislik = onizleme === 'masaustu' ? '100%' : onizleme === 'tablet' ? '768px' : '375px'

    if (!sablon) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h1 className="text-white text-2xl font-bold mb-2">Şablon Bulunamadı</h1>
                    <p className="text-white/50 mb-6">Bu ID ile eşleşen bir şablon yok.</p>
                    <Link href="/sablonlar" className="text-rust hover:underline font-semibold">
                        ← Şablonlara Dön
                    </Link>
                </div>
            </div>
        )
    }

    const paketRenk = PAKET_RENK[sablon.minPaket] || PAKET_RENK.TEMEL

    /* ─── Form alanları ─── */
    const ALANLAR: { key: keyof TaslaKalip; label: string; placeholder: string; type?: string }[] = [
        { key: 'isletmeAdi', label: 'İşletme Adı', placeholder: 'ör. Kardelen Güzellik Merkezi' },
        { key: 'kisaAd', label: 'Kısa Ad / İşletme Sahibi', placeholder: 'ör. Kardelen' },
        { key: 'telefon', label: 'Telefon', placeholder: '0532 XXX XX XX', type: 'tel' },
        { key: 'adres', label: 'Adres', placeholder: 'Bağdat Cad. No:123, Kadıköy' },
        { key: 'ilce', label: 'İlçe', placeholder: 'Kadıköy' },
        { key: 'sehir', label: 'Şehir', placeholder: 'İstanbul' },
        { key: 'heroBaslik', label: 'Ana Başlık (Hero)', placeholder: 'İşletmenizi tanıtan güçlü başlık' },
        { key: 'heroSlogan', label: 'Slogan', placeholder: 'Kısa ve etkileyici alt başlık' },
        { key: 'ctaBirincil', label: 'Birincil Buton', placeholder: 'Hemen Başla' },
        { key: 'ctaIkincil', label: 'İkincil Buton', placeholder: 'Bize Ulaşın' },
    ]

    return (
        <div className="fixed inset-0 bg-[#020204] flex flex-col z-40">

            {/* ═══ GİRİŞ MODAL ═══ */}
            <AnimatePresence>
                {girisModalAcik && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full"
                        >
                            <div className="text-center mb-8">
                                <div className="text-4xl mb-3">✨</div>
                                <h2 className="text-white text-2xl font-bold">{girisAdim === 'giris' ? 'Hoş Geldiniz' : 'Ücretsiz Kayıt'}</h2>
                                <p className="text-white/40 text-sm mt-2">
                                    {girisAdim === 'giris'
                                        ? 'Editöre erişmek için giriş yapın'
                                        : 'Aylık 3 site ücretsiz özelleştirin'}
                                </p>
                            </div>

                            {/* Google Sign-In Mock */}
                            <button
                                onClick={() => {
                                    setGirisYukleniyor(true)
                                    setTimeout(() => {
                                        const user: KepenkUser = { ad: 'Demo Kullanıcı', email: 'demo@kepenk.ai', girisZamani: Date.now() }
                                        kullaniciKaydet(user)
                                        setKullanici(user)
                                        setGirisModalAcik(false)
                                        setGirisYukleniyor(false)
                                        const ok = kotaEkle(sablonId)
                                        setKalanHak(kotaKalan())
                                        if (!ok) setKotaDoldu(true)
                                    }, 600)
                                }}
                                className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition mb-4"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                Google ile Devam Et
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-white/30 text-xs">veya e-posta ile</span>
                                <div className="flex-1 h-px bg-white/10" />
                            </div>

                            <div className="space-y-3">
                                {girisAdim === 'kayit' && (
                                    <input
                                        type="text"
                                        value={kayitAd}
                                        onChange={e => setKayitAd(e.target.value)}
                                        placeholder="Adınız Soyadınız"
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition"
                                    />
                                )}
                                <input
                                    type="email"
                                    value={girisEmail}
                                    onChange={e => setGirisEmail(e.target.value)}
                                    placeholder="E-posta adresiniz"
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition"
                                    onKeyDown={e => e.key === 'Enter' && (girisAdim === 'giris' ? handleGiris() : handleKayit())}
                                />
                                <input
                                    type="password"
                                    value={girisSifre}
                                    onChange={e => setGirisSifre(e.target.value)}
                                    placeholder="Şifreniz"
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition"
                                    onKeyDown={e => e.key === 'Enter' && (girisAdim === 'giris' ? handleGiris() : handleKayit())}
                                />
                            </div>

                            {girisHata && (
                                <p className="text-red-400 text-xs mt-2">{girisHata}</p>
                            )}

                            <button
                                onClick={girisAdim === 'giris' ? handleGiris : handleKayit}
                                disabled={girisYukleniyor}
                                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 rounded-xl font-bold text-sm mt-4 hover:from-violet-500 hover:to-fuchsia-500 transition disabled:opacity-50"
                            >
                                {girisYukleniyor ? 'Giriş yapılıyor...' : girisAdim === 'giris' ? 'Giriş Yap' : 'Ücretsiz Kayıt Ol'}
                            </button>

                            <p className="text-center text-xs text-white/30 mt-4">
                                {girisAdim === 'giris' ? (
                                    <>Hesabınız yok mu? <button onClick={() => { setGirisAdim('kayit'); setGirisHata('') }} className="text-violet-400 font-bold">Ücretsiz Kaydol</button></>
                                ) : (
                                    <>Zaten üye misiniz? <button onClick={() => { setGirisAdim('giris'); setGirisHata('') }} className="text-violet-400 font-bold">Giriş Yap</button></>
                                )}
                            </p>

                            <div className="mt-6 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3">
                                <p className="text-emerald-300 text-[11px] font-semibold text-center">🎁 Aylık 3 site ücretsiz özelleştir · Yayınla istediğinde öde</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══ KOTA DOLDU BANNER ═══ */}
            {kotaDoldu && (
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex items-center justify-center gap-3 shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 text-xs font-bold">Aylık ücretsiz kotanız doldu. Düzenleme salt okunur modda.</span>
                    <button
                        onClick={() => setPaywallAcik(true)}
                        className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-lg hover:bg-amber-400 transition"
                    >
                        Plan Yükselt
                    </button>
                </div>
            )}

            {/* ── Üst Bar ── */}
            <div className="h-14 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 shrink-0 z-10 relative">
                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rust/30 to-transparent pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                    <Link
                        href="/sablonlar"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Şablonlar</span>
                    </Link>
                    <div className="w-px h-6 bg-white/10" />
                    <span className="text-lg">{sablon.icon}</span>
                    <span className="text-white font-bold text-sm">{sablon.ad}</span>
                    <span
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border hidden sm:inline"
                        style={{ background: paketRenk.bg, color: paketRenk.text, borderColor: paketRenk.border }}
                    >
                        {sablon.minPaket}
                    </span>
                    {/* Kota Badge */}
                    {kullanici && (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full hidden md:inline border ${
                            kotaDoldu
                                ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        }`}>
                            {kotaDoldu ? `🔴 Kota doldu` : `🟢 ${kalanHak}/${AYLIK_KOTA} hak kaldı`}
                        </span>
                    )}
                </div>

                {/* Cihaz toggle */}
                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 hidden md:flex">
                    {([
                        { id: 'masaustu' as const, icon: Monitor },
                        { id: 'tablet' as const, icon: Tablet },
                        { id: 'mobil' as const, icon: Smartphone },
                    ]).map(d => (
                        <button
                            key={d.id}
                            onClick={() => setOnizleme(d.id)}
                            className={`p-2 rounded-lg transition ${onizleme === d.id ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}
                        >
                            <d.icon className="w-4 h-4" />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* User info */}
                    {kullanici && (
                        <div className="hidden md:flex items-center gap-2 mr-2">
                            <div className="w-7 h-7 rounded-full bg-violet-600/20 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-violet-400" />
                            </div>
                            <span className="text-white/50 text-xs font-medium max-w-[100px] truncate">{kullanici.ad}</span>
                            <button onClick={handleCikis} className="text-white/20 hover:text-white/60 transition" title="Çıkış Yap">
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={kaydet}
                        disabled={kotaDoldu}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${kaydedildi ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'} disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                        {kaydedildi ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                        {kaydedildi ? 'Kaydedildi' : 'Taslak Kaydet'}
                    </button>
                    <button
                        onClick={() => setPaywallAcik(true)}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-rose-500 hover:from-orange-500 hover:to-rose-400 text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-lg shadow-orange-900/20"
                    >
                        <Rocket className="w-3.5 h-3.5" />
                        Yayınla
                    </button>
                </div>
            </div>

            {/* ── İçerik ── */}
            <div className="flex-1 flex overflow-hidden">

                {/* SOL: Düzenleme paneli */}
                <div className="w-80 lg:w-96 bg-black/60 backdrop-blur-2xl border-r border-white/10 flex flex-col shrink-0 overflow-hidden z-10 relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-rust/5 via-transparent to-transparent pointer-events-none" />
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <h2 className="text-white text-xs font-bold uppercase tracking-wider">İşletme Bilgileri</h2>
                        </div>

                        {ALANLAR.map(alan => (
                            <div key={alan.key}>
                                <label className="text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-1.5 block">
                                    {alan.label}
                                </label>
                                <input
                                    type={alan.type || 'text'}
                                    value={form[alan.key]}
                                    onChange={e => alaniGuncelle(alan.key, e.target.value)}
                                    placeholder={alan.placeholder}
                                    readOnly={kotaDoldu}
                                    className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rust/50 focus:bg-white/[0.06] transition-all ${kotaDoldu ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                            </div>
                        ))}

                        {/* ✨ AI İçerik Üret butonu */}
                        <button
                            onClick={aiIcerikUret}
                            disabled={!form.isletmeAdi || aiYukleniyor || kotaDoldu}
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                                aiUretildi
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                                    : aiYukleniyor
                                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 cursor-wait'
                                    : 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/25 text-violet-300 hover:from-violet-600/30 hover:to-fuchsia-600/30 hover:text-violet-200'
                            } disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                            {aiYukleniyor ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> AI İçerik Üretiliyor...</>
                            ) : aiUretildi ? (
                                <><Check className="w-4 h-4" /> İçerikler Oluşturuldu!</>
                            ) : (
                                <><Sparkles className="w-4 h-4" /> ✨ AI ile İçerik Üret</>
                            )}
                        </button>
                        {!aiUretildi && !aiYukleniyor && (
                            <p className="text-[10px] text-white/20 text-center -mt-2">
                                İşletme adınızı girin, AI başlık, slogan, hizmetler ve yorumları otomatik oluştursun
                            </p>
                        )}

                        {/* AI üretilmişse ek alanları göster */}
                        {form.hikaye && (
                            <div>
                                <label className="text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-1.5 block">Hakkımızda</label>
                                <textarea
                                    value={form.hikaye}
                                    onChange={e => alaniGuncelle('hikaye', e.target.value)}
                                    readOnly={kotaDoldu}
                                    className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rust/50 focus:bg-white/[0.06] transition-all resize-none ${kotaDoldu ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    rows={3}
                                />
                            </div>
                        )}

                        {/* Info banner */}
                        <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3 mt-2">
                            <div className="flex items-start gap-2">
                                <span className="text-blue-400 text-sm mt-0.5">💡</span>
                                <div>
                                    <p className="text-blue-300 text-[11px] font-semibold mb-0.5">Canlı Önizleme</p>
                                    <p className="text-blue-200/40 text-[10px] leading-relaxed">
                                        Yazdığınız her değişiklik anında sağdaki önizlemede görünür. Taslağınız otomatik kaydedilir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alt bilgi */}
                    <div className="border-t border-white/10 p-4 bg-black/40 backdrop-blur-md relative z-10">
                        <button
                            onClick={() => setPaywallAcik(true)}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-rose-500 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-orange-900/20"
                        >
                            <Rocket className="w-4 h-4" />
                            Siteyi Yayınla — Planını Seç
                        </button>
                        <p className="text-[10px] text-white/20 text-center mt-2">
                            Düzenleme ücretsiz · Yayınlamak için plan gerekli
                        </p>
                    </div>
                </div>

                {/* SAĞ: Canlı Önizleme */}
                <div className="flex-1 flex items-center justify-center bg-[#020204] relative p-4 overflow-hidden">
                    {/* Ambient Background Glows */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rust/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-60" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50" />

                    <motion.div
                        layout
                        className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                        style={{
                            width: onizlemeGenislik,
                            maxWidth: '100%',
                            height: '100%',
                        }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    >
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 border-b border-stone-200 shrink-0">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 bg-white text-center text-stone-400 font-mono text-[10px] py-1 rounded-md border border-stone-200 truncate px-3">
                                {form.kisaAd ? `${form.kisaAd.toLowerCase().replace(/\s+/g, '-')}.kepenk.site` : 'isletmeniz.kepenk.site'}
                            </div>
                        </div>
                        {/* iframe */}
                        <div className="flex-1 relative">
                            <iframe
                                className="w-full h-full border-none absolute inset-0"
                                srcDoc={previewHtml}
                                title={`${sablon.ad} Önizleme`}
                                style={{ background: '#fff' }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ══ PAYWALL MODAL ══ */}
            <AnimatePresence>
                {paywallAcik && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setPaywallAcik(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-white text-2xl font-bold font-syne flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-amber-400" />
                                        Sitenizi Yayınlayın
                                    </h2>
                                    <p className="text-white/40 text-sm mt-1">
                                        Taslağınız hazır! Planınızı seçin ve saniyeler içinde yayına alın.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setPaywallAcik(false)}
                                    className="p-2 rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Draft preview */}
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6 flex items-center gap-4">
                                <span className="text-3xl">{sablon.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-white font-bold text-sm truncate">
                                        {form.isletmeAdi || 'İşletme Adınız'}
                                    </div>
                                    <div className="text-white/30 text-xs truncate">
                                        {sablon.ad} şablonu · {sablon.moduller?.length || 0} modül
                                    </div>
                                </div>
                                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full font-bold shrink-0">
                                    Taslak Hazır
                                </span>
                            </div>

                            {/* Plan cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {PLANLAR.map(plan => (
                                    <div
                                        key={plan.id}
                                        className={`relative rounded-2xl p-5 border transition-all cursor-pointer hover:scale-[1.02] ${plan.popüler
                                            ? 'bg-gradient-to-b from-orange-600/10 to-rose-600/10 border-orange-500/30 ring-1 ring-orange-500/20'
                                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
                                            }`}
                                        onClick={() => router.push(`/onboarding?sablon=${sablonId}&plan=${plan.id}`)}
                                    >
                                        {plan.popüler && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                                                ⭐ EN POPÜLER
                                            </div>
                                        )}
                                        <div className="text-2xl mb-2">{plan.emoji}</div>
                                        <h3 className="text-white font-bold text-lg mb-1">{plan.ad}</h3>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-white text-3xl font-extrabold">₺{plan.fiyat}</span>
                                            <span className="text-white/30 text-xs">/ay</span>
                                        </div>
                                        <div className="space-y-2">
                                            {plan.ozellikler.map((oz, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                                                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                    {oz}
                                                </div>
                                            ))}
                                        </div>
                                        <button className={`w-full mt-4 py-2.5 rounded-xl font-bold text-sm transition-all ${plan.popüler
                                            ? 'bg-gradient-to-r from-orange-600 to-rose-500 text-white hover:shadow-lg hover:shadow-orange-900/20'
                                            : 'bg-white/5 text-white/80 hover:bg-white/10'
                                            }`}>
                                            Planı Seç →
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-[11px] text-white/20">
                                14 gün ücretsiz deneme · İstediğiniz zaman iptal · KDV dahil
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
