export interface RenkPaleti {
    id: string
    ad: string
    aciklama: string
    onizleme: string[]   // CSS renk kodları (3 renk)
    css: {
        arkaplan: string  // body/hero bg
        kart: string  // card bg
        vurgu: string  // CTA, buton, accent
        metin: string  // başlık
        altMetin: string  // paragraph
        hover: string
        gradient?: string  // opsiyonel hero gradient
    }
    font: {
        baslik: string       // Google Fonts family name
        metin: string
    }
    karakter: string      // sektör uyumu bilgisi
}

// ─── Esnaf ─────────────────────────────────────────────────────────────────

export interface Esnaf {
    id: string
    ad: string
    unvan: string
    sektor: string
    telefon: string
    waNumarasi: string
    adres: string
    sehir: string
    ilce: string
    subdomain: string
    subdomainUrl: string
    paket: 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM' | 'PREMIUMPLUS'
    durum: 'aktif' | 'pasif' | 'riskli' | 'onboarding' | 'silindi'
    churnSkoru: number
    kayitTarihi: any
    yenilenmeTarihi: any
    iptalTarihi?: any
    uyariGonderildi?: boolean
    arsivlendi?: boolean
    bildirimAyarlari: {
        sabahMesaji: boolean
        olumsuzYorum: boolean
        haftalikRapor: boolean
    }
    googlePlacesId?: string
    wpSiteId?: number
    iyzicoPlanId?: string

    // Sosyal medya
    instagramUsername: string | null
    instagramUrl: string | null
    instagramTakipci: number | null
    facebookUrl: string | null

    // --- OMNICHANNEL Entegrasyon Bilgileri (Faz 35) ---
    instagramAccountId?: string
    instagramAccessToken?: string
    googleAccountId?: string
    googleLocationId?: string
    googleAccessToken?: string
    // --------------------------------------------------

    secilenPalet?: RenkPaleti | null
    paletId?: string | null

    // Motor 1: AI Müşteri Servisi
    twilioNumarasi?: string
    ayarlar?: Record<string, boolean>

    // Motor 2: İş Zekası
    saglikSkoru?: number
    saglikGuncelleme?: any

    // Motor 3: Esnaf Ağı
    referansPuani?: number

    // Domain
    domain?: {
        durum: 'secim_bekleniyor' | 'tescil_ediliyor' | 'aktif' | 'hata'
        oneriler?: string[]
        tescilliDomain?: string
    }

    // Ek alanlar
    isletmeAdi?: string
    isletmeAdiTam?: string
    soyad?: string
    adSoyad?: string
    hizmetler?: string[]
    email?: string

    // Faz 40 & 41 - Modüler Yapı
    aktifModuller?: string[]     // Uygulama Marketi - Abone olunan ajan/arka plan modülleri
    aktifWebModulleri?: string[] // Sektörel Web Modülü Opt-in seçimleri (Sitede görünecek olanlar)

    // Faz 44 — Denormalize İstatistikler (atomik güncelleme)
    istatistikler?: {
        toplam_bakiye: number
        aylik_ciro: number
        aktif_musteri_sayisi: number
        toplam_gelir: number
        toplam_gider: number
        son_guncelleme: string // ISO date
    }

    // Faz 44 — Aylık Kredi
    kredi?: {
        ay: string  // '2026-03'
        kullanim: number
        limit: number
    }
}

// ─── Agent Logs ────────────────────────────────────────────────────────────

export interface AgentLog {
    ajan: string
    esnafId: string | null
    tip: string
    input: any
    output: any
    basari: boolean
    hata: string | null
    zaman: any
    kanal: 'whatsapp' | 'instagram_dm' | 'email' | 'internal'
}

// ─── Lead ──────────────────────────────────────────────────────────────────

export interface Lead {
    isletmeAdi: string
    telefon: string
    sektor: string
    ilce: string
    googlePuani: number
    yorumSayisi: number
    websiteVar: boolean

    // Instagram alanları
    instagramUsername: string | null
    instagramVarMi: boolean
    instagramTakipci: number | null
    instagramSonGonderiGunu: number | null  // kaç gün önce
    instagramKalitePuani: number            // 0-30 (skora eklenir)

    oncelikSkoru: number                    // 0-100
    sicaklik: 'HOT' | 'WARM' | 'COLD'
    durum: 'yeni' | 'iletisimde' | 'kapandi' | 'reddetti'

    // İletişim kanalları
    iletisimKanallari?: {
        whatsapp?: string
        instagram?: string
        email?: string
    }

    onerilenKanal?: 'whatsapp' | 'instagram_dm' | 'telefon'
    olusturanAjan: string
    zaman: any
}

// ─── Yorum ─────────────────────────────────────────────────────────────────

export interface Yorum {
    esnafId: string
    platform: 'google' | 'facebook'
    yildiz: number
    metin: string
    yazarAdi: string
    tarih: any
    sistemYaniti: string
    yanitDurumu: 'bekliyor' | 'onaylandi' | 'otomatik_yayinlandi'
    yanitZamani: any
}

// ─── Yıllık Fiyatlar (peşin, tek seferlik) ─────────────────────────────────

export const PAKET_FIYATLARI = {
    TEMEL: 3990,       // ~332₺/ay — yıllık peşin
    STANDART: 7990,    // ~666₺/ay — yıllık peşin
    BUYUME: 14900,     // ~1242₺/ay — yıllık peşin
    PREMIUM: 29900,    // ~2492₺/ay — yıllık peşin
    PREMIUMPLUS: 44900, // ~3742₺/ay — yıllık peşin
} as const

export const PAKET_KOTALARI = {
    TEMEL: 5,
    STANDART: 10,
    BUYUME: 25,
    PREMIUM: 100,
    PREMIUMPLUS: 200,
} as const

// Faz 44 — Aylık Kredi Limitleri ("Sınırsız AI" iptal edildi)
export const AYLIK_KREDI_LIMITLERI = {
    TEMEL: 100,
    STANDART: 300,
    BUYUME: 500,
    PREMIUM: 2000,
    PREMIUMPLUS: 5000,
} as const

export type PaketTipi = keyof typeof PAKET_FIYATLARI

// ─── Müşteri Konuşma ────────────────────────────────────────────────────────

export interface MusteriKonusma {
    esnafId: string
    musteriNumara: string
    oturumId: string
    mesaj: string
    kimden: 'musteri' | 'ai'
    twilioMsgId?: string
    zaman: any
}

// ─── Randevu ─────────────────────────────────────────────────────────────────

export interface Randevu {
    esnafId: string
    musteriNumara: string
    musteriAd: string
    hizmet: string
    tarih: any
    saat: string
    durum: 'bekliyor' | 'onaylandi' | 'iptal' | 'tamamlandi'
    kaynak: 'whatsapp_ai' | 'site_formu' | 'manual'
    olusturma: any
}

// ─── Referans ────────────────────────────────────────────────────────────────

export interface Referans {
    verenEsnafId: string
    alanEsnafId: string
    musteriNumara: string
    zaman: any
    durum: 'bekliyor' | 'tamamlandi'
}
