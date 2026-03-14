/**
 * EmlakTypes.ts — Emlak Yönetim Modülü Tip Sistemi
 * ══════════════════════════════════════════════════════════════════════
 * Mülk portföy, müşteri CRM, teklif, gösteri ve platform sendikasyonu
 * için Zod şemaları ve state machine.
 */

import { z } from 'zod'

// ═══ MÜLK DURUM MAKİNESİ (State Machine) ════════════════════════════════

export const MULK_DURUMLARI = [
    'taslak',
    'ilan_aktif',
    'gosterimde',
    'teklif_alindi',
    'pazarlikta',
    'sozlesme_asamasi',
    'satildi_kiralandi',
    'arsiv',
] as const

export type MulkDurum = (typeof MULK_DURUMLARI)[number]

/** Geçerli durum geçişleri — Katı state machine */
export const MULK_GECISLERI: Record<MulkDurum, MulkDurum[]> = {
    taslak: ['ilan_aktif'],
    ilan_aktif: ['gosterimde', 'taslak', 'arsiv'],
    gosterimde: ['teklif_alindi', 'ilan_aktif', 'arsiv'],
    teklif_alindi: ['pazarlikta', 'gosterimde', 'arsiv'],
    pazarlikta: ['sozlesme_asamasi', 'teklif_alindi', 'gosterimde', 'arsiv'],
    sozlesme_asamasi: ['satildi_kiralandi', 'pazarlikta', 'arsiv'],
    satildi_kiralandi: ['arsiv'],
    arsiv: ['taslak'], // Tekrar yayına alınabilir
}

/** Durum renkleri ve etiketleri — UI için */
export const MULK_DURUM_RENKLERI: Record<MulkDurum, { bg: string; text: string; label: string }> = {
    taslak: { bg: 'bg-neutral-700', text: 'text-neutral-400', label: 'Taslak' },
    ilan_aktif: { bg: 'bg-emerald-600', text: 'text-emerald-400', label: 'İlan Aktif' },
    gosterimde: { bg: 'bg-blue-600', text: 'text-blue-400', label: 'Gösterimde' },
    teklif_alindi: { bg: 'bg-amber-600', text: 'text-amber-400', label: 'Teklif Alındı' },
    pazarlikta: { bg: 'bg-orange-600', text: 'text-orange-400', label: 'Pazarlıkta' },
    sozlesme_asamasi: { bg: 'bg-purple-600', text: 'text-purple-400', label: 'Sözleşme' },
    satildi_kiralandi: { bg: 'bg-rose-600', text: 'text-rose-400', label: 'Satıldı/Kiralandı' },
    arsiv: { bg: 'bg-neutral-800', text: 'text-neutral-500', label: 'Arşiv' },
}

// ═══ İLAN TİPLERİ ═══════════════════════════════════════════════════════

export const ILAN_TIPLERI = ['satilik', 'kiralik', 'devren', 'gunluk_kiralik'] as const
export type IlanTipi = (typeof ILAN_TIPLERI)[number]

export const ILAN_TIPI_LABEL: Record<IlanTipi, string> = {
    satilik: 'Satılık',
    kiralik: 'Kiralık',
    devren: 'Devren',
    gunluk_kiralik: 'Günlük Kiralık',
}

// ═══ MÜLK TİPLERİ ══════════════════════════════════════════════════════

export const MULK_TIPLERI = [
    'daire', 'villa', 'mustakil', 'residence', 'arsa', 'tarla',
    'isyeri', 'ofis', 'dukkan', 'depo', 'bina',
] as const
export type MulkTipi = (typeof MULK_TIPLERI)[number]

export const MULK_TIPI_LABEL: Record<MulkTipi, string> = {
    daire: 'Daire',
    villa: 'Villa',
    mustakil: 'Müstakil Ev',
    residence: 'Residence',
    arsa: 'Arsa',
    tarla: 'Tarla',
    isyeri: 'İşyeri',
    ofis: 'Ofis',
    dukkan: 'Dükkan',
    depo: 'Depo',
    bina: 'Bina',
}

// ═══ ISITMA TİPLERİ ════════════════════════════════════════════════════

export const ISITMA_TIPLERI = [
    'dogalgaz_kombi', 'merkezi', 'yerden', 'klima', 'soba', 'yok',
] as const
export type IsitmaTipi = (typeof ISITMA_TIPLERI)[number]

// ═══ CEPHE YÖNLERİ ═════════════════════════════════════════════════════

export const CEPHE_YONLERI = ['kuzey', 'guney', 'dogu', 'bati'] as const
export type CepheYonu = (typeof CEPHE_YONLERI)[number]

// ═══ TAPU ════════════════════════════════════════════════════════════════

export const TAPU_DURUMLARI = [
    'kat_mulkiyeti', 'kat_irtifaki', 'arsa_tapusu', 'hisseli', 'kooperatif',
] as const
export type TapuDurumu = (typeof TAPU_DURUMLARI)[number]

export const KULLANIM_DURUMLARI = ['bos', 'kiracili', 'mal_sahibi_oturuyor'] as const
export type KullanimDurumu = (typeof KULLANIM_DURUMLARI)[number]

// ═══ MÜLK FOTOĞRAF ŞEMASİ ══════════════════════════════════════════════

export const fotografSema = z.object({
    url: z.string().url(),
    sira: z.number().int().min(0),
    ana_foto: z.boolean().default(false),
})
export type Fotograf = z.infer<typeof fotografSema>

// ═══ KOORDİNAT ŞEMASİ ══════════════════════════════════════════════════

export const koordinatSema = z.object({
    lat: z.number().min(35).max(43),  // Türkiye lat aralığı
    lng: z.number().min(25).max(45),  // Türkiye lng aralığı
})

// ═══ ANA MÜLK ZOD ŞEMASİ ═══════════════════════════════════════════════

export const mulkSema = z.object({
    // Kimlik
    mulkId: z.string(),
    esnafId: z.string(),
    ilanTipi: z.enum(ILAN_TIPLERI),
    mulkTipi: z.enum(MULK_TIPLERI),
    durum: z.enum(MULK_DURUMLARI).default('taslak'),

    // Konum
    il: z.string().min(2),
    ilce: z.string().min(2),
    mahalle: z.string().min(2),
    adres: z.string().optional(),
    koordinat: koordinatSema.optional(),

    // Temel Bilgiler
    baslik: z.string().min(10).max(200),
    aciklama: z.string().min(50),
    fiyatTL: z.number().positive(),
    aidatTL: z.number().nonnegative().optional(),
    komisyonOrani: z.number().min(0).max(100).optional(), // Yüzde

    // Fiziki Özellikler
    metrekare: z.number().positive(),
    brut_metrekare: z.number().positive().optional(),
    oda_sayisi: z.string(), // "3+1", "2+1", "Stüdyo 1+0"
    bulundugu_kat: z.number().int(),
    toplam_kat: z.number().int().positive(),
    bina_yasi: z.number().int().nonnegative(),
    banyo_sayisi: z.number().int().nonnegative().default(1),
    balkon: z.boolean().default(false),
    esyali: z.boolean().default(false),
    site_icerisinde: z.boolean().default(false),
    asansor: z.boolean().default(false),
    otopark: z.boolean().default(false),

    // Isıtma & Cephe
    isitma_tipi: z.enum(ISITMA_TIPLERI).default('dogalgaz_kombi'),
    cephe: z.array(z.enum(CEPHE_YONLERI)).default([]),

    // Tapu
    tapu_durumu: z.enum(TAPU_DURUMLARI).default('kat_mulkiyeti'),
    kullanim_durumu: z.enum(KULLANIM_DURUMLARI).default('bos'),
    kredi_uygunlugu: z.boolean().default(true),

    // Medya
    fotograflar: z.array(fotografSema).default([]),
    video_tur_url: z.string().url().optional(),
    sanal_tur_url: z.string().url().optional(),

    // Platform Sendikasyon ID'leri
    sahibinden_ilan_id: z.string().optional(),
    hepsiemlak_ilan_id: z.string().optional(),
    emlakjet_ilan_id: z.string().optional(),
    son_yayinlama_tarihi: z.any().optional(), // Firestore Timestamp

    // Danışman
    danisman_id: z.string(),
    danisman_adi: z.string(),

    // İlgi Metrikleri
    goruntulenme_sayisi: z.number().int().nonnegative().default(0),
    favori_sayisi: z.number().int().nonnegative().default(0),
    arama_sayisi: z.number().int().nonnegative().default(0),

    // Zaman Damgaları
    olusturma_tarihi: z.any(), // Firestore Timestamp
    son_guncelleme: z.any(),
    ilan_bitis_tarihi: z.any().optional(),
})

export type Mulk = z.infer<typeof mulkSema>

// ═══ MÜŞTERİ (LEAD) ZOD ŞEMASİ ════════════════════════════════════════

export const MUSTERI_KAYNAKLARI = [
    'whatsapp', 'website', 'sahibinden', 'hepsiemlak', 'emlakjet',
    'instagram', 'referans', 'yuruyus', 'telefon',
] as const
export type MusteriKaynak = (typeof MUSTERI_KAYNAKLARI)[number]

export const MUSTERI_ILGI_TIPLERI = [
    'alici', 'kiraci', 'yatirimci', 'satici', 'ev_sahibi',
] as const
export type MusteriIlgiTipi = (typeof MUSTERI_ILGI_TIPLERI)[number]

export const MUSTERI_SICAKLIK = ['sicak', 'ilik', 'soguk'] as const
export type MusteriSicaklik = (typeof MUSTERI_SICAKLIK)[number]

export const MUSTERI_DURUMLARI = [
    'aktif', 'gezi_planlandi', 'teklif_verdi', 'kapandi_basarili', 'kapandi_kayip',
] as const
export type MusteriDurum = (typeof MUSTERI_DURUMLARI)[number]

export const ACILIYET_SEVIYELERI = ['acil', 'bu_ay', 'uc_ay', 'arastirma'] as const
export type AciliyetSeviyesi = (typeof ACILIYET_SEVIYELERI)[number]

export const musteriTalepSema = z.object({
    ilan_tipi: z.enum(ILAN_TIPLERI),
    mulk_tipleri: z.array(z.enum(MULK_TIPLERI)).min(1),
    il: z.string().min(2),
    ilceler: z.array(z.string()).min(1),
    min_metrekare: z.number().positive().optional(),
    max_metrekare: z.number().positive().optional(),
    min_fiyat: z.number().nonnegative().optional(),
    max_fiyat: z.number().positive().optional(),
    min_oda: z.string().optional(),
    max_oda: z.string().optional(),
    asansor: z.boolean().optional(),
    otopark: z.boolean().optional(),
    site_ici: z.boolean().optional(),
    esyali: z.boolean().optional(),
    kredi_uygun: z.boolean().optional(),
    aciliyet: z.enum(ACILIYET_SEVIYELERI).default('arastirma'),
})

export type MusteriTalep = z.infer<typeof musteriTalepSema>

export const emlakMusteriSema = z.object({
    musteriId: z.string(),
    esnafId: z.string(),
    ad: z.string().min(2),
    telefon: z.string().min(10),
    email: z.string().email().optional(),
    kaynak: z.enum(MUSTERI_KAYNAKLARI),
    ilgiTipi: z.enum(MUSTERI_ILGI_TIPLERI),

    talep: musteriTalepSema.optional(), // Alıcı/Kiracı için

    mevcut_mulk_id: z.string().optional(), // Satıcı/ev sahibi için

    // CRM
    sicaklik: z.enum(MUSTERI_SICAKLIK).default('ilik'),
    atanan_danisman_id: z.string(),
    atanan_danisman_adi: z.string(),
    son_iletisim: z.any(), // Firestore Timestamp
    sonraki_aksiyon: z.string().optional(),
    notlar: z.array(z.string()).default([]),
    gorulen_mulkler: z.array(z.string()).default([]),

    durum: z.enum(MUSTERI_DURUMLARI).default('aktif'),

    olusturma_tarihi: z.any(),
    son_guncelleme: z.any(),
})

export type EmlakMusteri = z.infer<typeof emlakMusteriSema>

// ═══ TEKLİF ŞEMASİ ═════════════════════════════════════════════════════

export const TEKLIF_DURUMLARI = [
    'beklemede', 'karsi_teklif', 'kabul_edildi', 'reddedildi', 'iptal',
] as const
export type TeklifDurum = (typeof TEKLIF_DURUMLARI)[number]

export const teklifSema = z.object({
    teklifId: z.string(),
    mulkId: z.string(),
    musteriId: z.string(),
    musteri_adi: z.string(),

    teklif_tutarTL: z.number().positive(),
    ilan_fiyatTL: z.number().positive(), // Teklif anındaki ilan fiyatı (snapshot)
    fark_yuzde: z.number(), // (teklif - ilan) / ilan * 100

    durum: z.enum(TEKLIF_DURUMLARI).default('beklemede'),
    karsi_teklif_tutarTL: z.number().positive().optional(),

    not: z.string().optional(),
    tarih: z.any(), // Firestore Timestamp
    son_guncelleme: z.any(),
})

export type Teklif = z.infer<typeof teklifSema>

// ═══ GÖSTERİ (EV GEZMESİ) ŞEMASİ ══════════════════════════════════════

export const GOSTERI_DURUMLARI = [
    'planli', 'onaylandi', 'tamamlandi', 'iptal',
] as const
export type GosteriDurum = (typeof GOSTERI_DURUMLARI)[number]

export const gosteriSema = z.object({
    gosteriId: z.string(),
    mulkId: z.string(),
    musteriId: z.string(),
    musteri_adi: z.string(),
    danisman_id: z.string(),

    tarih_saat: z.any(), // Firestore Timestamp — planlanan gösteri tarihi
    sure_dakika: z.number().int().positive().default(30),

    durum: z.enum(GOSTERI_DURUMLARI).default('planli'),

    musteri_gorusu: z.string().optional(), // Gösteri sonrası yorum
    puan: z.number().int().min(1).max(5).optional(), // Müşteri puanı (1-5 yıldız)

    olusturma_tarihi: z.any(),
})

export type Gosteri = z.infer<typeof gosteriSema>

// ═══ PLATFORM SENDİKASYON DURUMU ════════════════════════════════════════

export const PLATFORM_ADLARI = ['sahibinden', 'hepsiemlak', 'emlakjet'] as const
export type PlatformAdi = (typeof PLATFORM_ADLARI)[number]

export const SYNC_DURUMLARI = [
    'yayinda', 'beklemede', 'hata', 'kaldirildi', 'yayinlanmadi',
] as const
export type SyncDurum = (typeof SYNC_DURUMLARI)[number]

export const platformSyncSema = z.object({
    platform: z.enum(PLATFORM_ADLARI),
    durum: z.enum(SYNC_DURUMLARI).default('yayinlanmadi'),
    platform_ilan_id: z.string().optional(),
    platform_url: z.string().url().optional(),
    son_sync_tarihi: z.any(), // Firestore Timestamp
    hata_mesaji: z.string().optional(),
    yayinlama_tarihi: z.any().optional(),
})

export type PlatformSync = z.infer<typeof platformSyncSema>

// ═══ DANIŞMAN METRİKLERİ ════════════════════════════════════════════════

export const danismanMetrikSema = z.object({
    danisman_id: z.string(),
    ad: z.string(),

    // Portföy
    aktif_ilan_sayisi: z.number().int().nonnegative().default(0),
    toplam_ilan: z.number().int().nonnegative().default(0),

    // Satış
    bu_ay_satis: z.number().int().nonnegative().default(0),
    bu_ay_kiralama: z.number().int().nonnegative().default(0),
    toplam_satis: z.number().int().nonnegative().default(0),
    toplam_kiralama: z.number().int().nonnegative().default(0),

    // Komisyon
    bu_ay_komisyon_TL: z.number().nonnegative().default(0),
    toplam_komisyon_TL: z.number().nonnegative().default(0),

    // Müşteri
    aktif_musteri_sayisi: z.number().int().nonnegative().default(0),
    bu_ay_gosterim: z.number().int().nonnegative().default(0),
})

export type DanismanMetrik = z.infer<typeof danismanMetrikSema>

// ═══ DEĞERLEME RAPORU ═══════════════════════════════════════════════════

export const degerlemeSema = z.object({
    mulkId: z.string(),
    bolgel_ort_fiyat_m2: z.number().positive(),
    karsilastirma_sayisi: z.number().int().nonnegative(),
    avantaj_puani: z.number(), // +/- yüzde
    min_fiyat_onerisi_TL: z.number().positive(),
    onerilen_fiyat_TL: z.number().positive(),
    max_fiyat_onerisi_TL: z.number().positive(),
    faktorler: z.array(z.object({
        faktor: z.string(),
        etki_yuzde: z.number(),
        aciklama: z.string(),
    })),
    hesaplama_tarihi: z.any(),
})

export type DegerlemeRaporu = z.infer<typeof degerlemeSema>

// ═══ YARDIMCI FONKSİYONLAR ═════════════════════════════════════════════

/** Durum geçişi geçerli mi kontrol et */
export function mulkGecisGecerliMi(mevcutDurum: MulkDurum, yeniDurum: MulkDurum): boolean {
    return MULK_GECISLERI[mevcutDurum]?.includes(yeniDurum) ?? false
}

/** İlan aktifleştirme için minimum gereksinimler karşılanıyor mu */
export function ilanAktiflesebilirMi(mulk: Partial<Mulk>): { gecerli: boolean; eksikler: string[] } {
    const eksikler: string[] = []
    if (!mulk.baslik || mulk.baslik.length < 10) eksikler.push('Başlık minimum 10 karakter')
    if (!mulk.aciklama || mulk.aciklama.length < 50) eksikler.push('Açıklama minimum 50 karakter')
    if (!mulk.fiyatTL || mulk.fiyatTL <= 0) eksikler.push('Geçerli fiyat girilmeli')
    if (!mulk.fotograflar || mulk.fotograflar.length < 5) eksikler.push('Minimum 5 fotoğraf gerekli')
    if (!mulk.il) eksikler.push('İl seçilmeli')
    if (!mulk.ilce) eksikler.push('İlçe seçilmeli')
    if (!mulk.mahalle) eksikler.push('Mahalle seçilmeli')
    if (!mulk.metrekare || mulk.metrekare <= 0) eksikler.push('Metrekare girilmeli')
    if (!mulk.oda_sayisi) eksikler.push('Oda sayısı girilmeli')
    return { gecerli: eksikler.length === 0, eksikler }
}

/** Komisyon hesapla */
export function komisyonHesapla(fiyatTL: number, ilanTipi: IlanTipi, oranOverridePct?: number): number {
    const varsayilanOran = ilanTipi === 'satilik' || ilanTipi === 'devren' ? 2 : 1 // Satılık %2, kiralık %1
    const oran = oranOverridePct ?? varsayilanOran
    return Math.round(fiyatTL * oran / 100)
}

/** Fiyatı formatla (1.250.000 TL) */
export function fiyatFormatla(tutar: number): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(tutar)
}

/** Oda sayısını karşılaştırma için sayıya çevir ("3+1" → 4) */
export function odaSayisiniTopla(oda: string): number {
    const parcalar = oda.replace(/\s/g, '').split('+').map(Number)
    return parcalar.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0)
}
