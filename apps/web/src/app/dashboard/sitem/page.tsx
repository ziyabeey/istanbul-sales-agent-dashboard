"use client";

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PaletDegistir from '@/components/Dashboard/PaletDegistir'
import DemoSitePreview from '@/components/Dashboard/DemoSitePreview'
import { useEsnaf } from '@/context/EsnafContext'
import { demoBusiness } from '@/data/demoBusiness'

export default function SitemPage() {
    const { esnaf, esnafId, isDemo, loading, error } = useEsnaf()
    const [siteUrl, setSiteUrl] = useState<string | null>(null)
    const [sektor, setSektor] = useState('diger')
    const [mevcutPaletId, setMevcutPaletId] = useState('siyah-altin')
    const [yukleniyor, setYukleniyor] = useState(false)
    const [mesaj, setMesaj] = useState('')
    const router = useRouter()
    const demoSiteData = isDemo ? (esnaf?.siteData || demoBusiness.siteData) : null
    const demoPublishedSitePath = '/site-preview/demo-berber-01'
    const localPreviewUrl = !isDemo && esnafId
        ? (typeof esnaf?.localPreviewUrl === 'string' && esnaf.localPreviewUrl)
            || (esnaf?.siteData ? `/site-preview/${encodeURIComponent(esnafId)}` : null)
        : null
    const resolvedPreviewUrl = isDemo ? demoPublishedSitePath : (siteUrl || localPreviewUrl)
    const hasLocalPreview = !isDemo && !siteUrl && Boolean(localPreviewUrl)
    const previewLabel = isDemo
        ? `${esnaf?.slug || demoBusiness.slug}.demo.local`
        : resolvedPreviewUrl

    useEffect(() => {
        if (loading) return

        if (isDemo) {
            setSiteUrl(null)
            setSektor(esnaf?.sektor || demoBusiness.sektor)
            setMevcutPaletId(esnaf?.paletId || demoBusiness.paletId)
            return
        }

        setSiteUrl(typeof esnaf?.subdomainUrl === 'string' && esnaf.subdomainUrl ? esnaf.subdomainUrl : null)
        if (esnaf?.sektor) setSektor(esnaf.sektor)
        if (esnaf?.paletId) setMevcutPaletId(esnaf.paletId)
    }, [esnaf, esnafId, isDemo, loading])

    async function handleYenidenUret() {
        if (!esnafId || isDemo) return
        setYukleniyor(true)
        setMesaj('')
        try {
            const res = await fetch('/api/site/guncelle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId }),
            })
            if (res.ok) {
                setMesaj('Siteniz güncelleniyor... 1-2 dakika içinde yenilenir.')
                setTimeout(() => siteUrl && window.open(siteUrl, '_blank'), 5000)
            }
        } finally {
            setYukleniyor(false)
        }
    }

    if (loading) {
        return (
            <div className="p-6 max-w-md mx-auto text-center mt-20">
                <p className="text-muted-foreground text-sm font-bold">Site bilgileri yukleniyor...</p>
            </div>
        )
    }

    if (error && !isDemo) {
        return (
            <div className="p-6 max-w-md mx-auto text-center mt-20">
                <h2 className="text-foreground font-syne font-bold text-2xl mb-2">
                    Site bilgisi alinamadi
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{error}</p>
            </div>
        )
    }

    if (!isDemo && !resolvedPreviewUrl) {
        return (
            <div className="p-6 max-w-md mx-auto text-center mt-20">
                <p className="text-5xl mb-4">⏳</p>
                <h2 className="text-foreground font-syne font-bold text-2xl mb-2">
                    Site hazırlanıyor
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    İşletme bilgilerinizden yerel önizleme oluşturulamadı.
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-foreground font-syne font-extrabold text-3xl mb-6">Web <span className="text-rust">Sitem</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Site Adresi Paneli */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">
                            {isDemo ? 'Yerel Demo' : 'Canlı Bağlantı'}
                        </p>
                        {isDemo ? (
                            <>
                                <h2 className="text-foreground font-syne font-extrabold text-2xl mb-2">
                                    Siten hazır
                                </h2>
                                <p className="text-foreground font-syne font-bold text-lg break-all block mb-4">
                                    {previewLabel}
                                </p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Demo modunda site önizlemesi yerel verilerle gösterilir; yayınlama ve üretim işlemleri kapalıdır.
                                </p>
                                <div className="mt-5 flex flex-col gap-3">
                                    <a
                                        href={demoPublishedSitePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-rust hover:bg-rust-light transition-colors text-foreground text-sm font-bold py-3 rounded-xl text-center"
                                    >
                                        Yayındaki Demo Siteyi Aç ↗
                                    </a>
                                    <p className="text-muted-foreground text-xs leading-relaxed">
                                        Bu demo yayın linki dış servis çağırmadan yerel olarak gösterilir.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <a
                                    href={resolvedPreviewUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground font-syne font-bold text-lg break-all hover:text-rust transition-colors block mb-4"
                                >
                                    {previewLabel?.replace('https://', '')}
                                </a>
                                {hasLocalPreview && (
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        Bu önizleme Cloudflare yayını değildir; gerçek verinizden yerel olarak oluşturulur.
                                    </p>
                                )}
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={resolvedPreviewUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-rust hover:bg-rust-light transition-colors text-foreground text-sm font-bold py-3 rounded-xl text-center"
                                    >
                                        {hasLocalPreview ? 'Yerel Yayın Önizlemesini Aç ↗' : 'Siteyi Aç ↗'}
                                    </a>
                                    <button
                                        onClick={() => resolvedPreviewUrl && navigator.clipboard.writeText(resolvedPreviewUrl)}
                                        className="w-full px-4 py-3 bg-warm/50 hover:bg-warm border border-border-light/20 transition-colors text-muted-foreground font-bold text-sm rounded-xl"
                                    >
                                        Bağlantıyı Kopyala
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {isDemo && (
                        <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-foreground font-syne font-extrabold text-lg mb-4">Hazır Site Özeti</h3>
                            <div className="space-y-3">
                                {[
                                    'Hizmetlerin ve fiyatların listelendi.',
                                    'Müşteri yorumların vitrinde.',
                                    'Telefon, adres ve çalışma saatlerin hazır.',
                                    'Randevu çağrısı görünür; gerçek gönderim kapalı.',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-xl bg-stone-50 px-3 py-2">
                                        <span className="mt-0.5 h-2 w-2 rounded-full bg-rust" />
                                        <p className="text-sm font-medium leading-5 text-muted-foreground">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Güncelle */}
                    {!isDemo && (
                        <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-foreground font-extrabold font-syne text-lg mb-2">
                                Yapay Zeka ile Güncelle
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                Telefon, adres veya hizmetleriniz değiştiyse, robotların siteyi yeniden kodlaması için komut verin.
                            </p>
                            {mesaj && (
                                <p className="text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl text-xs font-bold mb-4">✓ {mesaj}</p>
                            )}
                            <button
                                onClick={handleYenidenUret}
                                disabled={yukleniyor}
                                className="w-full border-2 border-border text-muted-foreground hover:bg-stone hover:text-white transition-colors text-sm font-bold py-3 rounded-xl disabled:opacity-50"
                            >
                                {yukleniyor ? '☁️ Buluta Gönderiliyor...' : '🤖 Zekayı Tetikle (Güncelle)'}
                            </button>
                        </div>
                    )}

                    {/* Palet Değiştirici */}
                    {isDemo ? (
                        <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-foreground font-syne font-extrabold text-lg mb-3">Renk Paleti</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Demo modunda renk paleti sabittir; kaydetme ve yeniden uretim kapali tutulur.
                            </p>
                        </div>
                    ) : esnafId && (
                        <PaletDegistir
                            esnafId={esnafId}
                            mevcutPaletId={mevcutPaletId}
                            sektor={sektor}
                            onDegisti={() => {
                                setMesaj('Siteniz güncelleniyor... 1-2 dakika içinde yenilenir.')
                                if (esnaf?.paletId) setMevcutPaletId(esnaf.paletId)
                            }}
                        />
                    )}

                    {/* Modül Yönetimi */}
                    <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">🧩</span>
                            <h3 className="text-foreground font-extrabold font-syne text-lg">
                                Web Site Özellikleri
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            Sitenizde görünen özellikleri (Randevu formu, İletişim, Müşteri Yorumları, Fiyat Hesaplayıcı vb.) dilediğiniz gibi açıp kapatın.
                        </p>
                        <button
                            onClick={() => !isDemo && router.push('/dashboard/sitem/moduller')}
                            disabled={isDemo}
                            className="w-full bg-background hover:bg-background-light text-white transition-colors text-sm font-bold py-3 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isDemo ? 'Demo Modunda Kapalı' : 'Özellikleri Yönet (Aç/Kapat)'}
                        </button>
                    </div>

                    {/* Site Editörü */}
                    <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                        <div style={{ position: 'absolute', top: 12, right: 12, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', letterSpacing: '0.05em' }}>YENİ</div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">✨</span>
                            <h3 className="text-foreground font-extrabold font-syne text-lg">
                                Görsel Site Editörü
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            Kepenk sürükle-bırak editör ile sitenizi görsel olarak tasarlayın. Bölüm ekleyin, sıralayın, renk/font değiştirin ve AI ile içerik üretin.
                        </p>
                        <button
                            onClick={() => !isDemo && router.push('/dashboard/sitem/editor')}
                            disabled={isDemo}
                            className="w-full bg-rust hover:bg-rust/90 text-foreground transition-colors text-sm font-bold py-3 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isDemo ? 'Demo Modunda Kapalı' : '✨ Editörü Aç'}
                        </button>
                    </div>

                    {/* Domain Yönetimi (Sprint 2+12) */}
                    <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">🌐</span>
                            <h3 className="text-foreground font-extrabold font-syne text-lg">
                                Domain Yönetimi
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            Premium domain hediyenizi seçin, DNS durumunu ve SSL sertifikasını izleyin.
                        </p>
                        <button
                            onClick={() => !isDemo && router.push('/dashboard/sitem/domain')}
                            disabled={isDemo}
                            className="w-full border-2 border-gold text-gold hover:bg-gold hover:text-foreground transition-colors text-sm font-bold py-3 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isDemo ? 'Demo Modunda Kapalı' : '🎁 Domain Yönet'}
                        </button>
                    </div>

                    {/* İpuçları */}
                    <div className="bg-stone-50 border border-border-light/20 rounded-3xl p-6">
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-4">
                            Sitenizi Geliştirin
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: '📸', text: 'Profilinize logo ekleyin. Yapay zeka siteye otomatik yerleştirir.' },
                                { icon: '⭐', text: 'Müşterilerinizden 5 yıldızlı yorumlar aldıkça, siteniz onları vitrine çevirir.' },
                                { icon: '💬', text: 'Ses profilinizi değiştirirseniz, sitenizin yazım dili de ona uygun evrimleşir.' },
                            ].map((i, idx) => (
                                <div key={idx} className="flex items-start gap-3 border-b border-border-light/10 pb-3 last:border-0 last:pb-0">
                                    <span className="text-xl flex-shrink-0 mt-0.5">{i.icon}</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{i.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Site önizleme */}
                <div className="md:col-span-8 bg-stone-light/5 border border-border-light/20 rounded-3xl overflow-hidden shadow-inner flex flex-col h-[600px] md:h-auto min-h-[500px]">
                    <div className="flex items-center gap-2 px-4 py-3 bg-warm border-b border-border-light/20 flex-shrink-0">
                        <div className="flex gap-1.5 w-16">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 bg-white text-center text-muted-foreground font-mono text-xs py-1.5 rounded-lg border border-border-light/20 shadow-sm truncate px-4">
                            {previewLabel}
                        </div>
                        <div className="w-16"></div>
                    </div>
                    {isDemo && (
                        <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold leading-relaxed text-amber-900">
                            Demo modunda site önizlemesi yerel verilerle gösterilir; yayınlama ve üretim işlemleri kapalıdır.
                        </div>
                    )}
                    <div className="flex-grow w-full relative">
                        {!isDemo && yukleniyor && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-4">
                                <div className="w-12 h-12 border-4 border-rust/30 border-t-rust rounded-full animate-spin"></div>
                                <span className="font-syne font-bold text-rust">Yeniden İnşa Ediliyor...</span>
                            </div>
                        )}
                        {isDemo && demoSiteData ? (
                            <DemoSitePreview
                                siteData={demoSiteData}
                                services={esnaf?.services || demoBusiness.services}
                                workingHours={esnaf?.workingHours || demoBusiness.workingHours}
                            />
                        ) : (
                            <iframe
                                src={resolvedPreviewUrl || undefined}
                                className="w-full h-full border-0 absolute inset-0"
                                title="Sitenizin Canlı Görünümü"
                            />
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}
