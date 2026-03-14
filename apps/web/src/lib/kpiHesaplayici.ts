/**
 * kpiHesaplayici.ts — Merhametsiz KPI & SLA Hesaplama Motoru
 *
 * Mutfak Hızı (Prep Time): mutfak_bitis_ani - siparis_ani (SLA: 12dk)
 * Garson Hızı (Delivery):  garson_teslim_ani - mutfak_bitis_ani (SLA: 3dk)
 *
 * Puanlama: SLA tutarsa +10, her 1dk sapma -2 puan.
 * Gün sonu batch write ile personel_kpi koleksiyonuna yazılır.
 */

import { SLA_HEDEFLERI, type PersonelKpi } from '@/lib/restoran/tipler'

// ═══ YARDIMCI ════════════════════════════════════════════════════════════════

/** Firestore Timestamp veya Date'i milisaniyeye çevir */
export function toMs(ts: any): number {
    if (!ts) return 0
    if (typeof ts === 'number') return ts
    if (ts.toMillis) return ts.toMillis()          // Firestore Timestamp
    if (ts.seconds) return ts.seconds * 1000       // {seconds, nanoseconds}
    if (ts instanceof Date) return ts.getTime()
    return new Date(ts).getTime()
}

/** ms farkını saniyeye çevir */
export function msToSaniye(ms: number): number {
    return Math.max(0, Math.round(ms / 1000))
}

/** Saniyeyi "Xdk Ysn" formatına çevir */
export function sureFormat(saniye: number): string {
    const dk = Math.floor(saniye / 60)
    const sn = saniye % 60
    if (dk === 0) return `${sn}sn`
    return `${dk}dk ${sn}sn`
}

// ═══ TEK SİPARİŞ KPI HESAPLAMA ══════════════════════════════════════════════

export interface SiparisKpiSonuc {
    mutfakSureSaniye: number       // siparis_ani → mutfak_bitis_ani
    garsonSureSaniye: number       // mutfak_bitis_ani → garson_teslim_ani
    toplamSureSaniye: number       // siparis_ani → garson_teslim_ani
    mutfakSlaBasarili: boolean
    garsonSlaBasarili: boolean
    mutfakPuan: number
    garsonPuan: number
}

export function siparisKpiHesapla(adisyon: {
    siparis_ani: any
    mutfak_bitis_ani: any
    garson_teslim_ani: any
}): SiparisKpiSonuc | null {
    const t0 = toMs(adisyon.siparis_ani)
    const t2 = toMs(adisyon.mutfak_bitis_ani)
    const t3 = toMs(adisyon.garson_teslim_ani)

    // Eksik timestamp → hesaplanamaz
    if (!t0 || !t2 || !t3) return null

    const mutfakSureSaniye = msToSaniye(t2 - t0)
    const garsonSureSaniye = msToSaniye(t3 - t2)
    const toplamSureSaniye = msToSaniye(t3 - t0)

    // SLA kontrol
    const mutfakSlaBasarili = mutfakSureSaniye <= SLA_HEDEFLERI.mutfak_sure_saniye
    const garsonSlaBasarili = garsonSureSaniye <= SLA_HEDEFLERI.garson_sure_saniye

    // Puanlama
    const mutfakPuan = hesaplaPuan(mutfakSureSaniye, SLA_HEDEFLERI.mutfak_sure_saniye)
    const garsonPuan = hesaplaPuan(garsonSureSaniye, SLA_HEDEFLERI.garson_sure_saniye)

    return {
        mutfakSureSaniye,
        garsonSureSaniye,
        toplamSureSaniye,
        mutfakSlaBasarili,
        garsonSlaBasarili,
        mutfakPuan,
        garsonPuan,
    }
}

/** SLA hedefindeyse +10, her 1dk sapma -2 */
function hesaplaPuan(gercekSaniye: number, hedefSaniye: number): number {
    if (gercekSaniye <= hedefSaniye) {
        return SLA_HEDEFLERI.puan_baslangic // +10
    }
    const sapmaDk = Math.ceil((gercekSaniye - hedefSaniye) / 60)
    const puan = SLA_HEDEFLERI.puan_baslangic + (sapmaDk * SLA_HEDEFLERI.sapma_cezasi_dk)
    return Math.max(-20, puan) // Min -20
}

// ═══ TOPLU KPI HESAPLAMA (Gün Sonu) ═════════════════════════════════════════

export interface PersonelGunlukOzet {
    personelId: string
    personelAdi: string
    rol: 'asci' | 'garson'
    sureler: number[]          // Her siparişin saniye cinsinden süresi
    puanlar: number[]          // Her siparişin puanı
}

export function gunlukKpiOzetiHesapla(ozet: PersonelGunlukOzet): PersonelKpi {
    const toplamSiparis = ozet.sureler.length
    if (toplamSiparis === 0) {
        return {
            personelId: ozet.personelId,
            personelAdi: ozet.personelAdi,
            rol: ozet.rol,
            tarih: new Date().toISOString().split('T')[0],
            toplamSiparis: 0,
            ortSureSaniye: 0,
            slaBasariOrani: 0,
            toplamPuan: 0,
            enHizliSaniye: 0,
            enYavasSaniye: 0,
        }
    }

    const slaHedef = ozet.rol === 'asci'
        ? SLA_HEDEFLERI.mutfak_sure_saniye
        : SLA_HEDEFLERI.garson_sure_saniye

    const ortSureSaniye = Math.round(
        ozet.sureler.reduce((a, b) => a + b, 0) / toplamSiparis
    )

    const slaBasariSayisi = ozet.sureler.filter(s => s <= slaHedef).length
    const slaBasariOrani = Math.round((slaBasariSayisi / toplamSiparis) * 100)

    const toplamPuan = ozet.puanlar.reduce((a, b) => a + b, 0)

    return {
        personelId: ozet.personelId,
        personelAdi: ozet.personelAdi,
        rol: ozet.rol,
        tarih: new Date().toISOString().split('T')[0],
        toplamSiparis,
        ortSureSaniye,
        slaBasariOrani,
        toplamPuan,
        enHizliSaniye: Math.min(...ozet.sureler),
        enYavasSaniye: Math.max(...ozet.sureler),
    }
}

// ═══ DARBOĞAZ ANALİZİ (AI Uyarı) ════════════════════════════════════════════

export interface DarbograzUyari {
    tip: 'mutfak' | 'garson'
    seviye: 'bilgi' | 'uyari' | 'kritik'
    mesaj: string
    ortalamaSaniye: number
    hedefSaniye: number
    personelId?: string
    personelAdi?: string
}

export function darbograzAnaliz(
    kpiListesi: PersonelKpi[],
    gunAdisyonlari?: SiparisKpiSonuc[]
): DarbograzUyari[] {
    const uyarilar: DarbograzUyari[] = []

    // 1. Genel mutfak ortalama kontrolü
    if (gunAdisyonlari && gunAdisyonlari.length > 5) {
        const ortMutfak = Math.round(
            gunAdisyonlari.reduce((s, a) => s + a.mutfakSureSaniye, 0) / gunAdisyonlari.length
        )
        if (ortMutfak > SLA_HEDEFLERI.mutfak_sure_saniye * 1.5) {
            uyarilar.push({
                tip: 'mutfak',
                seviye: 'kritik',
                mesaj: `🚨 Mutfak tıkanıyor! Ortalama sipariş çıkarma: ${sureFormat(ortMutfak)}. SLA hedefiniz ${sureFormat(SLA_HEDEFLERI.mutfak_sure_saniye)}. Mutfağa +1 personel eklemeniz kârınızı artırabilir.`,
                ortalamaSaniye: ortMutfak,
                hedefSaniye: SLA_HEDEFLERI.mutfak_sure_saniye,
            })
        } else if (ortMutfak > SLA_HEDEFLERI.mutfak_sure_saniye) {
            uyarilar.push({
                tip: 'mutfak',
                seviye: 'uyari',
                mesaj: `⚠️ Mutfak süresi SLA hedefini aşıyor: Ort. ${sureFormat(ortMutfak)} (Hedef: ${sureFormat(SLA_HEDEFLERI.mutfak_sure_saniye)})`,
                ortalamaSaniye: ortMutfak,
                hedefSaniye: SLA_HEDEFLERI.mutfak_sure_saniye,
            })
        }
    }

    // 2. Bireysel garson yavaşlık kontrolü
    const garsonlar = kpiListesi.filter(k => k.rol === 'garson')
    for (const g of garsonlar) {
        if (g.ortSureSaniye > SLA_HEDEFLERI.garson_sure_saniye * 1.5) {
            uyarilar.push({
                tip: 'garson',
                seviye: 'kritik',
                mesaj: `🚨 Garson ${g.personelAdi} ortalama ${sureFormat(g.ortSureSaniye)} teslimat yapıyor. Uyarılması kârınızı artırabilir.`,
                ortalamaSaniye: g.ortSureSaniye,
                hedefSaniye: SLA_HEDEFLERI.garson_sure_saniye,
                personelId: g.personelId,
                personelAdi: g.personelAdi,
            })
        }
    }

    // 3. Bireysel aşçı yavaşlık
    const ascilar = kpiListesi.filter(k => k.rol === 'asci')
    for (const a of ascilar) {
        if (a.ortSureSaniye > SLA_HEDEFLERI.mutfak_sure_saniye * 1.5) {
            uyarilar.push({
                tip: 'mutfak',
                seviye: 'uyari',
                mesaj: `⚠️ Aşçı ${a.personelAdi} ortalama ${sureFormat(a.ortSureSaniye)} hazırlama yapıyor.`,
                ortalamaSaniye: a.ortSureSaniye,
                hedefSaniye: SLA_HEDEFLERI.mutfak_sure_saniye,
                personelId: a.personelId,
                personelAdi: a.personelAdi,
            })
        }
    }

    return uyarilar
}
