const LOCAL_GENERATED_AT = '1970-01-01T00:00:00.000Z'

type PlainRecord = Record<string, unknown>

export type LocalSiteService = {
    id: string
    ad: string
    sureDakika: number
    fiyat: number
}

export type LocalSiteData = {
    isletmeAdi: string
    sektor: string
    heroBaslik: string
    heroAlt: string
    telefon: string
    adres: string
    il: string
    ilce: string
    hizmetler: LocalSiteService[]
    calismaSaatleri: {
        haftaIci: string
        cumartesi: string
        pazar: string
    }
    yorumlar: Array<{
        id: string
        isim: string
        metin: string
        puan: number
    }>
    ctaText: string
    generatedBy: 'local-deterministic'
    generatedAt: string
}

function asRecord(value: unknown): PlainRecord {
    return value && typeof value === 'object' ? value as PlainRecord : {}
}

function text(value: unknown, fallback = ''): string {
    return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function numberValue(value: unknown, fallback: number): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function slugify(value: string): string {
    return value
        .toLocaleLowerCase('tr-TR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        || 'hizmet'
}

function sectorLabel(sektor: string): string {
    const normalized = sektor.toLocaleLowerCase('tr-TR')

    if (normalized.includes('berber')) return 'Berber'
    if (normalized.includes('kuaf')) return 'Kuaför'
    if (normalized.includes('güzellik') || normalized.includes('guzellik')) return 'Güzellik Salonu'
    if (normalized.includes('restoran') || normalized.includes('lokanta')) return 'Restoran'
    if (normalized.includes('diş') || normalized.includes('dis')) return 'Klinik'

    return sektor
}

function fallbackServices(sektor: string): LocalSiteService[] {
    const normalized = sektor.toLocaleLowerCase('tr-TR')

    if (normalized.includes('berber')) {
        return [
            { id: 'sac-kesimi', ad: 'Saç Kesimi', sureDakika: 35, fiyat: 600 },
            { id: 'sakal-trasi', ad: 'Sakal Tıraşı', sureDakika: 25, fiyat: 450 },
            { id: 'damat-paketi', ad: 'Damat Paketi', sureDakika: 90, fiyat: 2200 },
        ]
    }

    if (normalized.includes('kuaf')) {
        return [
            { id: 'kesim', ad: 'Kesim', sureDakika: 45, fiyat: 750 },
            { id: 'fön', ad: 'Fön', sureDakika: 30, fiyat: 450 },
            { id: 'bakim', ad: 'Bakım', sureDakika: 60, fiyat: 950 },
        ]
    }

    return [
        { id: 'standart-hizmet', ad: 'Standart Hizmet', sureDakika: 45, fiyat: 750 },
        { id: 'premium-hizmet', ad: 'Premium Hizmet', sureDakika: 60, fiyat: 1200 },
        { id: 'danisma', ad: 'Danışma', sureDakika: 20, fiyat: 0 },
    ]
}

function serviceFromRecord(value: unknown, index: number): LocalSiteService | null {
    if (typeof value === 'string' && value.trim()) {
        const ad = value.trim()
        return { id: slugify(ad), ad, sureDakika: 45, fiyat: 0 }
    }

    const record = asRecord(value)
    const ad = text(record.ad, text(record.hizmet_adi, text(record.name)))
    if (!ad) return null

    return {
        id: text(record.id, slugify(`${ad}-${index + 1}`)),
        ad,
        sureDakika: numberValue(record.sureDakika, numberValue(record.hizmet_suresi_dk, 45)),
        fiyat: numberValue(record.fiyat, numberValue(record.toplam_fiyat, 0)),
    }
}

function normalizeServices(esnaf: PlainRecord, sektor: string): LocalSiteService[] {
    const rawServices = Array.isArray(esnaf.services)
        ? esnaf.services
        : Array.isArray(esnaf.hizmetler)
          ? esnaf.hizmetler
          : []

    const services = rawServices
        .map(serviceFromRecord)
        .filter((service): service is LocalSiteService => Boolean(service))

    return services.length > 0 ? services : fallbackServices(sektor)
}

export function buildLocalPreviewPath(esnafId: string): string {
    return `/site-preview/${encodeURIComponent(esnafId)}`
}

export function buildLocalSiteDataFromEsnaf(esnaf: unknown, esnafId: string): LocalSiteData {
    void esnafId

    const record = asRecord(esnaf)
    const isletmeAdi = text(
        record.isletmeAdi,
        text(record.isletmeAdiTam, text(record.unvan, 'İşletmeniz'))
    )
    const sektor = text(record.sektor, 'Hizmet İşletmesi')
    const il = text(record.il, text(record.sehir))
    const ilce = text(record.ilce)
    const telefon = text(record.telefon, text(record.waNumarasi))
    const adres = text(record.adres)
    const etiket = sectorLabel(sektor)

    return {
        isletmeAdi,
        sektor,
        heroBaslik: `${isletmeAdi} için hazır dijital vitrin`,
        heroAlt: `${etiket} hizmetlerinizi, iletişim bilgilerinizi ve randevu çağrınızı tek sayfada gösterin.`,
        telefon,
        adres,
        il,
        ilce,
        hizmetler: normalizeServices(record, sektor),
        calismaSaatleri: {
            haftaIci: '09:00-20:00',
            cumartesi: '10:00-18:00',
            pazar: 'Kapalı',
        },
        yorumlar: [],
        ctaText: 'Randevu iste',
        generatedBy: 'local-deterministic',
        generatedAt: LOCAL_GENERATED_AT,
    }
}
