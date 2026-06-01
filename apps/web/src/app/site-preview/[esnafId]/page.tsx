import { notFound } from 'next/navigation'
import { demoBusiness } from '@/data/demoBusiness'
import { DEMO_ESNAF_ID } from '@/lib/demoMode'
import { adminDb } from '@/lib/firebaseAdmin'
import { buildLocalSiteDataFromEsnaf } from '@/lib/site/localSiteData'

type PageProps = {
    params: Promise<{ esnafId: string }>
}

type PlainRecord = Record<string, unknown>

type PublicService = {
    id: string
    ad: string
    sureDakika: number
    fiyat: number
}

type PublicReview = {
    id: string
    isim: string
    metin: string
    puan: number
}

type PublicSite = {
    business: {
        telefon: string
        adres: string
        il: string
        ilce: string
        services: PublicService[]
        workingHours: Array<{ gun: string; saat: string }>
    }
    siteData: {
        isletmeAdi: string
        sektor: string
        heroBaslik: string
        heroAlt: string
        telefon: string
        adres: string
        il: string
        ilce: string
        ctaText: string
    }
    reviews: PublicReview[]
    eyebrow: string
    hero: {
        top: string
        accent: string
        bottom: string
    }
    featuredService: {
        label: string
        duration: string
    }
    footerText: string
}

const formatPrice = (price?: number) =>
    typeof price === 'number' ? `${price.toLocaleString('tr-TR')} TL` : 'Fiyat sorunuz'

const prettyText = (value: string) =>
    value
        .replaceAll('Sac', 'Saç')
        .replaceAll('Trasi', 'Traşı')
        .replaceAll('Bakimi', 'Bakımı')
        .replaceAll('Sicak', 'Sıcak')
        .replaceAll('Kadikoy', 'Kadıköy')
        .replaceAll('Istanbul', 'İstanbul')
        .replaceAll('Caferaga', 'Caferağa')
        .replaceAll('cok', 'çok')
        .replaceAll('calisiyorlar', 'çalışıyorlar')

const asRecord = (value: unknown): PlainRecord =>
    value && typeof value === 'object' ? value as PlainRecord : {}

const text = (value: unknown, fallback = '') =>
    typeof value === 'string' && value.trim() ? value.trim() : fallback

const numberValue = (value: unknown, fallback: number) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
        const parsed = Number.parseInt(value.replace(/[^0-9-]/g, ''), 10)
        if (Number.isFinite(parsed)) return parsed
    }

    return fallback
}

const serviceFromValue = (value: unknown, index: number): PublicService | null => {
    if (typeof value === 'string' && value.trim()) {
        const ad = value.trim()
        return {
            id: `service-${index + 1}`,
            ad,
            sureDakika: 45,
            fiyat: 0,
        }
    }

    const record = asRecord(value)
    const ad = text(record.ad, text(record.name, text(record.baslik)))
    if (!ad) return null

    return {
        id: text(record.id, `service-${index + 1}`),
        ad,
        sureDakika: numberValue(record.sureDakika, numberValue(record.sure, numberValue(record.duration, 45))),
        fiyat: numberValue(record.fiyat, numberValue(record.price, 0)),
    }
}

const normalizeServices = (siteData: PlainRecord): PublicService[] => {
    const rawServices = Array.isArray(siteData.hizmetler) ? siteData.hizmetler : []
    const services = rawServices
        .map(serviceFromValue)
        .filter((service): service is PublicService => Boolean(service))

    return services.length > 0
        ? services
        : [
            { id: 'service-1', ad: 'Standart Hizmet', sureDakika: 45, fiyat: 0 },
            { id: 'service-2', ad: 'Premium Hizmet', sureDakika: 60, fiyat: 0 },
        ]
}

const normalizeReviews = (siteData: PlainRecord): PublicReview[] => {
    const modulIcerik = asRecord(siteData.modulIcerik)
    const rawReviews = Array.isArray(siteData.yorumlar)
        ? siteData.yorumlar
        : Array.isArray(modulIcerik.yorumlar)
          ? modulIcerik.yorumlar
          : []

    return rawReviews
        .map((review, index) => {
            const record = asRecord(review)
            const metin = text(record.metin, text(record.text))
            if (!metin) return null

            return {
                id: text(record.id, `review-${index + 1}`),
                isim: text(record.isim, text(record.name, 'Müşteri')),
                metin,
                puan: Math.min(5, Math.max(1, numberValue(record.puan, numberValue(record.rating, 5)))),
            }
        })
        .filter((review): review is PublicReview => Boolean(review))
}

const normalizeWorkingHours = (value: unknown): Array<{ gun: string; saat: string }> => {
    if (Array.isArray(value)) {
        const hours = value
            .map((item) => {
                const record = asRecord(item)
                const gun = text(record.gun, text(record.day))
                const saat = text(record.saat, text(record.hours))
                return gun && saat ? { gun, saat } : null
            })
            .filter((item): item is { gun: string; saat: string } => Boolean(item))

        if (hours.length > 0) return hours
    }

    const record = asRecord(value)
    const haftaIci = text(record.haftaIci)
    const cumartesi = text(record.cumartesi)
    const pazar = text(record.pazar)

    if (haftaIci || cumartesi || pazar) {
        return [
            { gun: 'Hafta içi', saat: haftaIci || '09:00-20:00' },
            { gun: 'Cumartesi', saat: cumartesi || '10:00-18:00' },
            { gun: 'Pazar', saat: pazar || 'Kapalı' },
        ]
    }

    return [
        { gun: 'Hafta içi', saat: '09:00-20:00' },
        { gun: 'Cumartesi', saat: '10:00-18:00' },
        { gun: 'Pazar', saat: 'Kapalı' },
    ]
}

const PUBLIC_SITE_STATUSES = new Set([
    'local-preview-ready',
    'staging-published',
    'live-published',
])

const canRenderPublicSite = (documentData: PlainRecord): boolean =>
    documentData.yayinda === true || PUBLIC_SITE_STATUSES.has(text(documentData.siteDurumu))

const normalizePublicSite = (
    source: unknown,
    esnafId: string,
    options: { isDemo?: boolean } = {}
): PublicSite => {
    const documentData = asRecord(source)
    const rawSiteData = asRecord(documentData.siteData)
    const fallbackSiteData = buildLocalSiteDataFromEsnaf(documentData, esnafId)
    const siteDataRecord = Object.keys(rawSiteData).length > 0 ? rawSiteData : asRecord(fallbackSiteData)

    const isletmeAdi = text(
        siteDataRecord.isletmeAdi,
        text(documentData.isletmeAdi, text(documentData.isletmeAdiTam, 'İşletmeniz'))
    )
    const sektor = text(siteDataRecord.sektor, text(documentData.sektor, 'Hizmet İşletmesi'))
    const il = text(siteDataRecord.il, text(documentData.il, text(documentData.sehir)))
    const ilce = text(siteDataRecord.ilce, text(documentData.ilce))
    const telefon = text(siteDataRecord.telefon, text(documentData.telefon, text(documentData.waNumarasi)))
    const adres = text(siteDataRecord.adres, text(documentData.adres))
    const services = normalizeServices(siteDataRecord)
    const workingHours = normalizeWorkingHours(
        documentData.workingHours ?? documentData.calismaSaatleri ?? siteDataRecord.calismaSaatleri
    )
    const firstService = services[0]

    return {
        business: {
            telefon,
            adres,
            il,
            ilce,
            services,
            workingHours,
        },
        siteData: {
            isletmeAdi,
            sektor,
            heroBaslik: text(siteDataRecord.heroBaslik, `${isletmeAdi} için hazır dijital vitrin`),
            heroAlt: text(siteDataRecord.heroAlt, fallbackSiteData.heroAlt),
            telefon,
            adres,
            il,
            ilce,
            ctaText: text(siteDataRecord.ctaText, fallbackSiteData.ctaText),
        },
        reviews: normalizeReviews(siteDataRecord),
        eyebrow: options.isDemo
            ? 'Moda / Kadıköy / Berber Atölyesi'
            : [ilce, il, sektor].filter(Boolean).join(' / ') || 'Kepenk AI / Yerel İşletme',
        hero: options.isDemo
            ? { top: 'Moda’da', accent: 'usta', bottom: 'bakım.' }
            : { top: isletmeAdi, accent: 'hazır', bottom: 'yayında.' },
        featuredService: options.isDemo
            ? { label: 'Klasik kesim', duration: '35 dk' }
            : {
                label: firstService ? prettyText(firstService.ad) : 'Standart hizmet',
                duration: firstService ? `${firstService.sureDakika} dk` : '45 dk',
            },
        footerText: options.isDemo
            ? 'Demo yayın önizlemesi · Kepenk AI · Dış servis çağrısı yapılmaz'
            : 'Yerel yayın önizlemesi · Kepenk AI · Dış servis çağrısı yapılmaz',
    }
}

async function loadPublicSite(esnafId: string): Promise<PublicSite | null> {
    if (esnafId === DEMO_ESNAF_ID) {
        return normalizePublicSite(demoBusiness, esnafId, { isDemo: true })
    }

    if (!adminDb) return null

    try {
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) return null
        const data = doc.data() ?? {}
        if (!canRenderPublicSite(asRecord(data))) return null

        return normalizePublicSite(data, esnafId)
    } catch {
        return null
    }
}

export default async function DemoPublishedSitePage({ params }: PageProps) {
    const { esnafId } = await params
    const publicSite = await loadPublicSite(esnafId)

    if (!publicSite) notFound()

    const { business, siteData, reviews, eyebrow, hero, featuredService, footerText } = publicSite

    return (
        <main className="min-h-screen overflow-hidden bg-[#17110d] text-[#f8efe2]">
            <section className="relative min-h-screen px-5 py-6 sm:px-8 lg:px-12">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,239,226,0.09),transparent_26%,rgba(201,122,72,0.15)_58%,rgba(127,176,105,0.08))]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] [background-size:56px_56px]" />

                <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl flex-col">
                    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f8efe2]/10 pb-5">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c97a48]">
                                {eyebrow}
                            </p>
                            <p className="mt-2 text-lg font-black tracking-tight sm:text-xl">
                                {siteData.isletmeAdi}
                            </p>
                        </div>
                        <nav className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#f8efe2]/65">
                            <a href="#hizmetler" className="rounded-full border border-[#f8efe2]/10 px-4 py-2 transition hover:border-[#c97a48] hover:text-[#f8efe2] focus:outline-none focus:ring-2 focus:ring-[#c97a48]/60">
                                Hizmetler
                            </a>
                            <a href="#yorumlar" className="rounded-full border border-[#f8efe2]/10 px-4 py-2 transition hover:border-[#c97a48] hover:text-[#f8efe2] focus:outline-none focus:ring-2 focus:ring-[#c97a48]/60">
                                Yorumlar
                            </a>
                            <a href="#iletisim" className="rounded-full border border-[#f8efe2]/10 px-4 py-2 transition hover:border-[#c97a48] hover:text-[#f8efe2] focus:outline-none focus:ring-2 focus:ring-[#c97a48]/60">
                                İletişim
                            </a>
                        </nav>
                    </header>

                    <div className="grid flex-1 gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-3 rounded-full border border-[#f8efe2]/10 bg-[#f8efe2]/5 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d9b38c]">
                                <span className="h-2 w-2 rounded-full bg-[#7fb069]" />
                                Bugün açık · 18:30 müsait
                            </div>
                            <h1 className="mt-8 max-w-4xl text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.82] tracking-normal">
                                {hero.top}
                                <span className="block text-[#c97a48]">{hero.accent}</span>
                                {hero.bottom}
                            </h1>
                            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#f8efe2]/72 sm:text-xl">
                                {prettyText(siteData.heroAlt)} Randevulu, sakin ve detay odaklı bir berber deneyimi.
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#iletisim"
                                    className="group inline-flex items-center justify-center rounded-full bg-[#c97a48] px-7 py-4 text-sm font-black text-[#17110d] transition hover:-translate-y-0.5 hover:bg-[#e2a06d] focus:outline-none focus:ring-2 focus:ring-[#f8efe2]/70"
                                >
                                    Randevu iste
                                    <span className="ml-3 transition group-hover:translate-x-1">→</span>
                                </a>
                                <a
                                    href="#hizmetler"
                                    className="inline-flex items-center justify-center rounded-full border border-[#f8efe2]/15 px-7 py-4 text-sm font-black text-[#f8efe2] transition hover:-translate-y-0.5 hover:border-[#c97a48] hover:bg-[#f8efe2]/5 focus:outline-none focus:ring-2 focus:ring-[#c97a48]/70"
                                >
                                    Hizmetleri gör
                                </a>
                            </div>
                        </div>

                        <aside className="order-1 lg:order-2">
                            <div className="relative ml-auto max-w-xl rounded-lg border border-[#f8efe2]/10 bg-[#231711]/80 p-4 shadow-2xl shadow-black/40 backdrop-blur">
                                <div className="absolute -right-8 top-12 hidden h-44 w-16 rotate-6 rounded-full border border-[#c97a48]/40 lg:block" />
                                <div className="rounded-lg border border-[#f8efe2]/10 bg-[linear-gradient(145deg,rgba(248,239,226,0.12),rgba(201,122,72,0.08)_45%,rgba(0,0,0,0.22))] p-6">
                                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c97a48]">
                                        Atelier kartı
                                    </p>
                                    <div className="mt-16 border-y border-[#f8efe2]/10 py-8">
                                        <p className="text-6xl font-black leading-none sm:text-7xl">{featuredService.duration}</p>
                                        <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#f8efe2]/60">
                                            {featuredService.label}
                                        </p>
                                    </div>
                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-lg bg-black/20 p-4">
                                            <p className="text-xs font-bold text-[#f8efe2]/55">Telefon</p>
                                            <p className="mt-2 text-sm font-black">{business.telefon}</p>
                                        </div>
                                        <div className="rounded-lg bg-black/20 p-4">
                                            <p className="text-xs font-bold text-[#f8efe2]/55">Bölge</p>
                                            <p className="mt-2 text-sm font-black">{business.ilce}, {business.il}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="sticky top-0 z-20 border-y border-[#f8efe2]/10 bg-[#1c130f]/90 py-2 backdrop-blur sm:px-8 sm:py-3 lg:px-12">
                <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 text-[11px] font-black uppercase tracking-[0.12em] text-[#f8efe2]/75 [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-0 sm:text-xs sm:tracking-[0.16em]">
                    <span className="shrink-0 rounded-full border border-[#f8efe2]/10 px-3 py-1.5 sm:border-0 sm:px-0 sm:py-0">Bugün: 16:00 / 18:30</span>
                    <span className="shrink-0 rounded-full border border-[#f8efe2]/10 px-3 py-1.5 sm:border-0 sm:px-0 sm:py-0">{business.telefon}</span>
                    <span className="shrink-0 rounded-full border border-[#f8efe2]/10 px-3 py-1.5 sm:border-0 sm:px-0 sm:py-0">{business.ilce}, {business.il}</span>
                    <span className="shrink-0 rounded-full border border-[#7fb069]/20 px-3 py-1.5 text-[#7fb069] sm:border-0 sm:px-0 sm:py-0">Açık · Randevulu çalışır</span>
                </div>
            </section>

            <section id="hizmetler" className="px-5 py-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c97a48]">Servis menüsü</p>
                            <h2 className="mt-4 text-4xl font-black leading-none sm:text-6xl">
                                Net süre.
                                <span className="block text-[#c97a48]">Net fiyat.</span>
                            </h2>
                        </div>
                        <p className="max-w-2xl text-base leading-8 text-[#f8efe2]/68 lg:ml-auto">
                            Kepenk AI vitrini hizmetleri, fiyatları ve müsait saatleri tek sayfada gösterir.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {business.services.map((service, index) => (
                            <article
                                key={service.id}
                                className="group min-h-72 rounded-lg border border-[#f8efe2]/10 bg-[#211611] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c97a48]/70 hover:bg-[#2b1b13] hover:shadow-2xl hover:shadow-black/30"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f8efe2]/38">
                                    0{index + 1}
                                </p>
                                <h3 className="mt-10 text-2xl font-black leading-tight">
                                    {prettyText(service.ad)}
                                </h3>
                                <div className="mt-10 flex items-end justify-between gap-4 border-t border-[#f8efe2]/10 pt-5">
                                    <span className="text-sm font-bold text-[#f8efe2]/55">{service.sureDakika} dk</span>
                                    <span className="text-xl font-black text-[#c97a48]">{formatPrice(service.fiyat)}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 rounded-lg border border-[#f8efe2]/10 bg-[#f8efe2] p-6 text-[#17110d] sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9f5e37]">
                            Kepenk AI ile hazır
                        </p>
                        <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                            Randevu, müşteri ve vitrin aynı akışta.
                        </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {[
                            ['Mesaj', 'Müşteri sorusu tek panelde görünür.'],
                            ['Randevu', 'Uygun saat vitrinde ve takvimde birleşir.'],
                            ['Hafıza', 'Sadık ve yeni müşteriler takip edilir.'],
                        ].map(([title, copy]) => (
                            <div key={title} className="rounded-lg border border-[#17110d]/10 bg-[#17110d]/5 p-5">
                                <p className="text-lg font-black">{title}</p>
                                <p className="mt-3 text-sm font-medium leading-6 text-[#17110d]/62">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {reviews.length > 0 && (
                <section id="yorumlar" className="border-y border-[#f8efe2]/10 bg-[#211611] px-5 py-20 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c97a48]">Müşteri sesi</p>
                        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-none sm:text-6xl">
                            Koltuğa oturan, tekrar geliyor.
                        </h2>
                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {reviews.map((review) => (
                                <figure
                                    key={review.id || review.isim}
                                    className="rounded-lg border border-[#f8efe2]/10 bg-[#17110d] p-7 transition hover:-translate-y-1 hover:border-[#c97a48]/60"
                                >
                                    <div className="mb-8 inline-flex rounded-full bg-[#c97a48]/15 px-4 py-2 text-sm font-black text-[#e2a06d]">
                                        {'★'.repeat(review.puan || 5)}
                                    </div>
                                    <blockquote className="text-xl font-black leading-9 sm:text-2xl">
                                        &quot;{prettyText(review.metin || '')}&quot;
                                    </blockquote>
                                    <figcaption className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#f8efe2]/50">
                                        {review.isim}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section id="iletisim" className="px-5 py-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c97a48]">Ziyaret</p>
                        <h2 className="mt-4 text-5xl font-black leading-none sm:text-7xl">
                            Koltuğun hazır.
                        </h2>
                        <p className="mt-6 max-w-xl text-base leading-8 text-[#f8efe2]/68">
                            {prettyText(business.adres)}
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={`tel:${siteData.telefon}`}
                                className="inline-flex items-center justify-center rounded-full bg-[#c97a48] px-7 py-4 text-sm font-black text-[#17110d] transition hover:-translate-y-0.5 hover:bg-[#e2a06d] focus:outline-none focus:ring-2 focus:ring-[#f8efe2]/70"
                            >
                                Telefonla ara
                            </a>
                            <button
                                type="button"
                                disabled
                                className="inline-flex items-center justify-center rounded-full border border-[#f8efe2]/15 px-7 py-4 text-sm font-black text-[#f8efe2]/60"
                            >
                                WhatsApp demo modunda kapalı
                            </button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-[#f8efe2]/10 bg-[#211611] p-6">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f8efe2]/45">
                            Çalışma saatleri
                        </p>
                        <div className="mt-5 space-y-3">
                            {business.workingHours.map((item) => (
                                <div key={item.gun} className="flex items-center justify-between gap-4 rounded-2xl bg-black/20 px-4 py-3 text-sm">
                                    <span className="font-bold text-[#f8efe2]/60">{item.gun}</span>
                                    <span className="font-black">{item.saat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-[#f8efe2]/10 px-5 py-7 text-center text-xs font-black uppercase tracking-[0.18em] text-[#f8efe2]/40 sm:px-8 lg:px-12">
                {footerText}
            </footer>
        </main>
    )
}
