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

export default function DemoSitePreview({ siteData }: { siteData: DemoSiteData }) {
    const hizmetler = siteData.hizmetler || []
    const yorumlar = siteData.modulIcerik?.yorumlar || []
    const bg = siteData.bg || '#111111'
    const accent = siteData.accent || '#c9a227'
    const text = siteData.text || '#f8f5ef'
    const fontFamily = siteData.font || 'Inter'

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
                        className="rounded-full px-4 py-2 text-xs font-black"
                        style={{ background: accent, color: bg }}
                    >
                        Ara
                    </a>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>
                            Randevulu erkek bakimi
                        </p>
                        <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                            {siteData.heroBaslik || siteData.isletmeAdi}
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 opacity-75">
                            {siteData.heroAlt}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">
                                {siteData.adres || 'Istanbul'}
                            </span>
                            <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">
                                {siteData.telefon}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
                        <div className="aspect-[4/5] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/20 to-white/[0.03] p-5">
                            <div className="flex h-full flex-col justify-between">
                                <div>
                                    <div className="mb-4 h-2 w-20 rounded-full" style={{ background: accent }} />
                                    <p className="text-sm font-bold opacity-70">Bugun musait saatler</p>
                                    <p className="mt-2 text-3xl font-black">16:00 / 18:30</p>
                                </div>
                                <div className="space-y-3">
                                    {hizmetler.slice(0, 3).map((hizmet, index) => (
                                        <div key={hizmet} className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                                            <span className="text-sm font-bold">{hizmet}</span>
                                            <span className="text-xs font-black" style={{ color: accent }}>
                                                {index === 0 ? '35 dk' : index === 1 ? '25 dk' : '90 dk'}
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
                    {hizmetler.map((hizmet) => (
                        <div key={hizmet} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                            <p className="text-sm font-black">{hizmet}</p>
                            <p className="mt-2 text-xs leading-5 opacity-65">Randevulu, zamaninda ve ozenli hizmet.</p>
                        </div>
                    ))}
                </div>
            </section>

            {yorumlar.length > 0 && (
                <section className="px-6 py-8 sm:px-10">
                    <h3 className="mb-5 text-xl font-black">Musteri yorumlari</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {yorumlar.map((yorum) => (
                            <figure key={yorum.id || yorum.isim} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                                <div className="mb-3 text-sm font-black" style={{ color: accent }}>
                                    {'*'.repeat(yorum.puan || 5)}
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
