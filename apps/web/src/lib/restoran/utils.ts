/**
 * utils.ts — Restoran İşletim Sistemi Yardımcıları
 */

import { KDV_ORANLARI, type KdvTipi, type AdisyonKalem } from './tipler'

// ─── QR Link ───────────────────────────────────────────────────────────

export function qrLinkOlustur(domain: string, masaNo: number): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'
    return `${baseUrl}/sites/${domain}/qr/${masaNo}`
}

// ─── Adisyon ID ────────────────────────────────────────────────────────

let counter = 0
export function adisyonIdOlustur(): string {
    const ts = Date.now().toString(36)
    const rnd = Math.random().toString(36).substring(2, 6)
    counter = (counter + 1) % 1000
    return `A-${ts}-${rnd}-${counter}`
}

// ─── KDV Hesaplama ─────────────────────────────────────────────────────

export interface KdvBreakdown {
    oran: number
    matrahKurus: number
    kdvKurus: number
}

export function kdvHesapla(kalemler: AdisyonKalem[]): {
    kdvDetay: KdvBreakdown[]
    toplamKdvKurus: number
    toplamNetKurus: number
} {
    const gruplar = new Map<KdvTipi, number>()

    for (const kalem of kalemler) {
        const tip = kalem.kdvTipi || 'gida'
        gruplar.set(tip, (gruplar.get(tip) || 0) + kalem.toplamKurus)
    }

    const kdvDetay: KdvBreakdown[] = []
    let toplamKdvKurus = 0

    for (const [tip, brutKurus] of gruplar) {
        const oran = KDV_ORANLARI[tip]
        // KDV dahil fiyattan matrah hesapla: matrah = brüt / (1 + oran/100)
        const matrahKurus = Math.round(brutKurus / (1 + oran / 100))
        const kdvKurus = brutKurus - matrahKurus

        kdvDetay.push({ oran, matrahKurus, kdvKurus })
        toplamKdvKurus += kdvKurus
    }

    return {
        kdvDetay,
        toplamKdvKurus,
        toplamNetKurus: kalemler.reduce((t, k) => t + k.toplamKurus, 0) - toplamKdvKurus,
    }
}

// ─── Fiyat Formatter ───────────────────────────────────────────────────

export function kurusToTL(kurus: number): string {
    return (kurus / 100).toFixed(2).replace('.', ',') + ' ₺'
}

// ─── Kaynak Rozet Renkleri (KDS UI) ────────────────────────────────────

export const KAYNAK_RENKLERI: Record<string, { bg: string; text: string; label: string }> = {
    masa: { bg: '#3b82f6', text: '#ffffff', label: 'Masa' },
    yemeksepeti: { bg: '#ef4444', text: '#ffffff', label: 'Yemeksepeti' },
    trendyol: { bg: '#f97316', text: '#ffffff', label: 'Trendyol' },
    getir: { bg: '#a855f7', text: '#ffffff', label: 'Getir' },
    paket: { bg: '#10b981', text: '#ffffff', label: 'Paket' },
    telefon: { bg: '#6b7280', text: '#ffffff', label: 'Telefon' },
}

// ─── Tarih Formatter (Adisyon kartları için) ───────────────────────────

export function zamanFormat(date: Date): string {
    return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    })
}
