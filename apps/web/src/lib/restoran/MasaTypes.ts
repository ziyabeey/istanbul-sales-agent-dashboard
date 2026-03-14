/**
 * MasaTypes.ts — Masa Yaşam Döngüsü State Machine
 * ══════════════════════════════════════════════════════════════════════
 * 8 Durumlu Döngü:
 *   bos → siparis_verildi → servis_acildi → mutfakta_hazirlaniyor
 *   → mutfak_hazir → teslim_edildi → hesap_odendi_kirli → temizleniyor → bos
 *
 * Temizlik Kilidi: hesap_odendi_kirli | temizleniyor → QR sipariş reddedilir.
 */

import { z } from 'zod'

// ═══ MASA DURUMLARI ══════════════════════════════════════════════════════════

export const masaDurumlari = [
    'bos',                      // Müşteri bekleniyor
    'siparis_verildi',          // QR'dan sipariş geldi (Alman usulü ödendi)
    'servis_acildi',            // Garson çatal/bıçak/su götürdü
    'mutfakta_hazirlaniyor',    // Mutfak hazırlıyor
    'mutfak_hazir',             // Yemek tezgahta hazır
    'teslim_edildi',            // Garson yemeği masaya bıraktı, müşteri yiyor
    'hesap_odendi_kirli',       // Müşteri kalktı, masa kirli
    'temizleniyor',             // Garson temizliyor
] as const

export type MasaDurum = (typeof masaDurumlari)[number]

// Geçerli durum geçişleri
export const MASA_GECISLERI: Record<MasaDurum, MasaDurum[]> = {
    bos: ['siparis_verildi'],
    siparis_verildi: ['servis_acildi', 'iptal' as any], // garson servisi açar
    servis_acildi: ['mutfakta_hazirlaniyor'],
    mutfakta_hazirlaniyor: ['mutfak_hazir'],
    mutfak_hazir: ['teslim_edildi'],
    teslim_edildi: ['hesap_odendi_kirli'],
    hesap_odendi_kirli: ['temizleniyor'],
    temizleniyor: ['bos'],
}

// QR sipariş alınamayacak durumlar (Temizlik Kilidi)
export const MASA_KILITLI_DURUMLAR: MasaDurum[] = [
    'hesap_odendi_kirli',
    'temizleniyor',
]

// Durum → Renk haritası (UI için)
export const MASA_DURUM_RENKLERI: Record<MasaDurum, { bg: string; text: string; label: string }> = {
    bos: { bg: 'bg-neutral-700', text: 'text-neutral-400', label: 'Boş' },
    siparis_verildi: { bg: 'bg-blue-600', text: 'text-blue-400', label: 'Sipariş Verildi' },
    servis_acildi: { bg: 'bg-cyan-600', text: 'text-cyan-400', label: 'Servis Açıldı' },
    mutfakta_hazirlaniyor: { bg: 'bg-orange-600', text: 'text-orange-400', label: 'Mutfakta' },
    mutfak_hazir: { bg: 'bg-amber-500', text: 'text-amber-400', label: 'Hazır!' },
    teslim_edildi: { bg: 'bg-emerald-600', text: 'text-emerald-400', label: 'Yemekte' },
    hesap_odendi_kirli: { bg: 'bg-red-600', text: 'text-red-400', label: 'Kirli' },
    temizleniyor: { bg: 'bg-purple-600', text: 'text-purple-400', label: 'Temizleniyor' },
}

// ═══ MASA ZOD ŞEMASI ════════════════════════════════════════════════════════

export const masaCanliSema = z.object({
    no: z.number().int().min(1).max(999),
    qrLink: z.string().url(),
    aktif: z.boolean().default(true),
    bolge: z.string().max(50).optional(),
    durum: z.enum(masaDurumlari).default('bos'),

    // Atanan personel
    atanan_garson_id: z.string().max(50).optional().nullable(),
    atanan_garson_adi: z.string().max(100).optional().nullable(),

    // Aktif adisyon referansı
    aktif_adisyon_id: z.string().optional().nullable(),

    // Zaman damgaları
    son_siparis_ani: z.any().optional().nullable(),
    son_durum_degisim: z.any().optional().nullable(),
    son_temizlik_ani: z.any().optional().nullable(),

    // Mevcut oturumdaki toplam ciro
    oturum_ciro_kurus: z.number().int().nonnegative().default(0),
})

export type MasaCanli = z.infer<typeof masaCanliSema>

// ═══ PERSONEL (GARSON) ŞEMASI ═══════════════════════════════════════════════

export const personelDurumlari = [
    'online',       // Vardiya açık, görev alabilir
    'mola',         // Mola, görev almaz
    'offline',      // Vardiya kapalı
] as const

export type PersonelDurum = (typeof personelDurumlari)[number]

export const personelSema = z.object({
    personelId: z.string().min(1).max(50),
    ad: z.string().min(1).max(100),
    soyad: z.string().max(100).optional(),
    rol: z.enum(['garson', 'asci', 'patron', 'kasiyer']),
    durum: z.enum(personelDurumlari).default('offline'),
    telefon: z.string().max(20).optional(),
    fcmToken: z.string().optional().nullable(), // Push bildirim

    // Canlı yük metrikleri
    aktif_masa_sayisi: z.number().int().nonnegative().default(0),
    bugun_toplam_masa: z.number().int().nonnegative().default(0),
    bugun_toplam_bahsis_kurus: z.number().int().nonnegative().default(0),

    // Round-robin sıra numarası (eşitlik çözücü)
    son_atama_sira: z.number().int().nonnegative().default(0),

    vardiya_baslangic: z.any().optional(),
    son_gorev_ani: z.any().optional(),
})

export type Personel = z.infer<typeof personelSema>

// ═══ YARDIMCI FONKSİYONLAR ═════════════════════════════════════════════════

/** Masa kilitli mi? (Temizlik devam ediyor) */
export function masaKilitliMi(durum: MasaDurum): boolean {
    return MASA_KILITLI_DURUMLAR.includes(durum)
}

/** Geçiş geçerli mi? */
export function gecisGecerliMi(mevcutDurum: MasaDurum, yeniDurum: MasaDurum): boolean {
    const gecerliDurumlar = MASA_GECISLERI[mevcutDurum]
    return gecerliDurumlar?.includes(yeniDurum) ?? false
}

/** Garson POS'ta gösterilecek aksiyon butonu bilgisi */
export function garsonAksiyonBilgisi(masaDurum: MasaDurum): {
    label: string
    emoji: string
    renk: string
    sonrakiDurum: MasaDurum | null
} | null {
    switch (masaDurum) {
        case 'siparis_verildi':
            return {
                label: 'Servis Aç (Çatal/Bıçak Bırak)',
                emoji: '🍽️',
                renk: 'from-red-600 to-red-500',
                sonrakiDurum: 'servis_acildi',
            }
        case 'mutfak_hazir':
            return {
                label: 'Yemek Hazır, Masaya Teslim Et!',
                emoji: '🏃‍♂️',
                renk: 'from-emerald-600 to-green-500',
                sonrakiDurum: 'teslim_edildi',
            }
        case 'hesap_odendi_kirli':
            return {
                label: 'Masayı Temizle ve Kapat!',
                emoji: '🧹',
                renk: 'from-purple-600 to-violet-500',
                sonrakiDurum: 'temizleniyor',
            }
        default:
            return null
    }
}
