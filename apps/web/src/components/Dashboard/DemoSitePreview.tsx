"use client"

type DemoReview = {
    id?: string
    isim?: string
    metin?: string
    puan?: number
}

type DemoSiteData = {
    isletmeAdi?: string
    heroBaslik?: string
    heroAlt?: string
    hizmetler?: string[]
    telefon?: string
    adres?: string
    bg?: string
    accent?: string
    text?: string
    font?: string
    modulIcerik?: {
        yorumlar?: DemoReview[]
    }
}

type DemoService = {
    id?: string
    ad?: string
    sureDakika?: number
    fiyat?: number
}

type DemoWorkingHour = {
    gun?: string
    saat?: string
}

export default function DemoSitePreview({
    siteData,
    services = [],
    workingHours = [],
}: {
    siteData: DemoSiteData
    services?: DemoService[]
    workingHours?: DemoWorkingHour[]
}) {
    const hizmetler = siteData.hizmetler || []
    const yorumlar = siteData.modulIcerik?.yorumlar || []
    const bg = siteData.bg || '#111111'
    const accent = siteData.accent || '#c9a227'
    const text = siteData.text || '#f8f5ef'
    const fontFamily = siteData.font || 'Inter'
    const serviceCards = services.length > 0
        ? services
        : hizmetler.map((ad, index) => ({
            id: ad,
            ad,
            sureDakika: index === 0 ? 35 : index === 1 ? 25 : 90,
            fiyat: index === 0 ? 600 : index === 1 ? 450 : 2200,
        }))

    return (
        <div
            className="min-h-full overflow-y-auto"
            style={{ background: bg, color: text, fontFamily }}
        >
            <section className="px-6 py-8 sm:px-10 sm:py-12">
                <div className="mb-10 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-60">Kepenk AI Demo</p>
                        <h2 className="mt-1 text-2xl font-black tracking-tight">{siteData.isletmeAdi || 'Demo Berber'}</h2>
                    </div>
                    <a
                        href={siteData.telefon ? `tel:${siteData.telefon}` : undefined}
                        className="rounded-full px-4 py-2 text-xs font-black transition hover:opacity-90"
                        style={{ background: accent, color: bg }}
                    >
                        Ara
                    </a>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>
                            Randevulu erkek bakımı
                        </p>
                        <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                            {siteData.heroBaslik || siteData.isletmeAdi}
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 opacity-75">
                            {siteData.heroAlt}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">
                                {siteData.adres || 'İstanbul'}
                            </span>
                            <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">
                                {siteData.telefon}
                            </span>
                        </div>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <button
                                type="button"
                                disabled
                                className="rounded-full px-5 py-3 text-sm font-black opacity-95"
                                style={{ background: accent, color: bg }}
                            >
                                WhatsApp&apos;tan Randevu Al
                            </button>
                            <span className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold opacity-70">
                                Demo önizleme: gönderim kapalı
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
                        <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/20 to-white/[0.03] p-5">
                            <div className="flex h-full flex-col justify-between">
                                <div>
                                    <div className="mb-4 h-2 w-20 rounded-full" style={{ background: accent }} />
                                    <p className="text-sm font-bold opacity-70">Bugün müsait saatler</p>
                                    <p className="mt-2 text-3xl font-black">16:00 / 18:30</p>
                                </div>
                                <div className="space-y-3">
                                    {serviceCards.slice(0, 3).map((hizmet) => (
                                        <div key={hizmet.id || hizmet.ad} className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                                            <span className="text-sm font-bold">{hizmet.ad}</span>
                                            <span className="text-xs font-black" style={{ color: accent }}>
                                                {hizmet.sureDakika} dk
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-white/10 bg-white/[0.04] px-6 py-8 sm:px-10">
                <h3 className="mb-5 text-xl font-black">Hizmetler</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                    {serviceCards.map((hizmet) => (
                        <div key={hizmet.id || hizmet.ad} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                            <p className="text-sm font-black">{hizmet.ad}</p>
                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="text-xs font-bold opacity-65">{hizmet.sureDakika} dk</span>
                                <span className="text-sm font-black" style={{ color: accent }}>
                                    {hizmet.fiyat?.toLocaleString('tr-TR')} ₺
                                </span>
                            </div>
                            <p className="mt-2 text-xs leading-5 opacity-65">Randevulu, zamanında ve özenli hizmet.</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-4 border-b border-white/10 px-6 py-8 sm:px-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <h3 className="text-xl font-black">Çalışma saatleri</h3>
                    <div className="mt-4 space-y-3">
                        {workingHours.map((item) => (
                            <div key={item.gun} className="flex items-center justify-between rounded-xl bg-black/15 px-4 py-3 text-sm">
                                <span className="font-bold opacity-70">{item.gun}</span>
                                <span className="font-black">{item.saat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
                    <h3 className="text-xl font-black">Adres ve iletişim</h3>
                    <p className="mt-3 text-sm leading-6 opacity-75">{siteData.adres}</p>
                    <p className="mt-2 text-sm font-bold" style={{ color: accent }}>{siteData.telefon}</p>
                    <button
                        type="button"
                        disabled
                        className="mt-5 rounded-full border border-white/15 px-5 py-3 text-sm font-black opacity-70"
                    >
                        Haritada Görüntüle
                    </button>
                </div>
            </section>

            {yorumlar.length > 0 && (
                <section className="px-6 py-8 sm:px-10">
                    <h3 className="mb-5 text-xl font-black">Müşteri yorumları</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {yorumlar.map((yorum) => (
                            <figure key={yorum.id || yorum.isim} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                                <div className="mb-3 text-sm font-black" style={{ color: accent }}>
                                    {'★'.repeat(yorum.puan || 5)}
                                </div>
                                <blockquote className="text-sm leading-6 opacity-80">&quot;{yorum.metin}&quot;</blockquote>
                                <figcaption className="mt-4 text-xs font-black opacity-60">{yorum.isim}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
