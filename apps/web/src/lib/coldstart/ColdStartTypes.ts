/**
 * ColdStartTypes.ts — İlk Gün Zekası (Cold Start Motor)
 *
 * Yeni esnafın geçmiş verisi olmasa bile ajanların akıllı
 * davranmasını sağlayan sektörel emsal + bölgesel benchmark
 * + onboarding anket harmanlama sistemi.
 */

import { z } from 'zod'

// ── Sektörel Emsal (22 sektörün ortalamaları) ────────────────────

export const MevsimselKatsayi = z.record(
  z.enum(['ocak','subat','mart','nisan','mayis','haziran','temmuz','agustos','eylul','ekim','kasim','aralik']),
  z.number()
)

export const SektorelEmsal = z.object({
  sektorId: z.string(),
  avgGunlukCiro: z.number(),              // kuruş
  avgSiparisAdedi: z.number(),
  yogunSaatler: z.array(z.number()),       // [11,12,13,19,20,21]
  yogunGunler: z.array(z.number()),        // 0=Pazar, 5=Cuma
  populerUrunler: z.array(z.string()),
  avgMusteriBasiHarcama: z.number(),       // kuruş
  avgPersonelSayisi: z.number(),
  mevsimselKatsayilar: MevsimselKatsayi,
  churnRiskGunSiniri: z.number(),          // gün (müşteri bu kadar gelmezse risk)
  tedarikSikligi: z.enum(['gunluk','haftalik','aylik']).default('haftalik'),
})
export type SektorelEmsal = z.infer<typeof SektorelEmsal>

// ── Bölgesel Benchmark ───────────────────────────────────────────

export const BolgeselBenchmark = z.object({
  il: z.string(),
  ilce: z.string(),
  nufusYogunlugu: z.enum(['dusuk', 'orta', 'yuksek']),
  ortalamaKira: z.number(),               // TL
  rakipSayisi: z.number(),
  turistYogunlugu: z.boolean(),
  gelirDuzeyi: z.enum(['dusuk', 'orta', 'yuksek']),
  yogunSaatDilimi: z.enum(['sabah', 'ogle', 'aksam', 'gece']),
})
export type BolgeselBenchmark = z.infer<typeof BolgeselBenchmark>

// ── Onboarding Anket (Esnaf Bilgi Toplama) ───────────────────────

export const OnboardingAnket = z.object({
  gunlukMusteriTahmini: z.number(),
  ortalamaAdisyon: z.number(),             // kuruş
  personelSayisi: z.number(),
  acilisSuresi: z.enum(['yeni','1_yil','3_yil','5_yil_ustu']),
  mevcutPosVar: z.boolean(),
  sosyalMedyaTakipci: z.number().default(0),
  hedefKitle: z.enum(['genç','aile','is_insani','turist','karma']).default('karma'),
  oncelikliHedef: z.enum(['musteri_artir','ciro_artir','maliyet_azalt','verimlilik']).default('ciro_artir'),
})
export type OnboardingAnket = z.infer<typeof OnboardingAnket>

// ── Cold Start Profil (Harmanlanan Sonuç) ────────────────────────

export const ColdStartProfil = z.object({
  shopId: z.string(),
  sektorId: z.string(),
  olusturmaTarihi: z.any(),
  gercekVeriOrani: z.number().min(0).max(100), // %0 (saf emsal) → %100 (tam gerçek)
  tahminGunlukCiro: z.number(),
  tahminYogunSaatler: z.array(z.number()),
  tahminPopulerUrunler: z.array(z.string()),
  tahminMusteriBasiHarcama: z.number(),
  oneriler: z.array(z.string()),           // İlk gün tavsiyeleri
  sonGuncelleme: z.any(),
})
export type ColdStartProfil = z.infer<typeof ColdStartProfil>

// ── Harmanlama Ağırlıkları ───────────────────────────────────────

export interface BlendAgirlik {
  gercekVeri: number   // 0.0 - 1.0
  sektorEmsal: number
  bolge: number
  anket: number
}

/** Geçen gün sayısına göre blend ağırlıklarını döndür */
export function blendAgirliklari(gunSayisi: number): BlendAgirlik {
  if (gunSayisi < 7) return { gercekVeri: 0.0, sektorEmsal: 0.6, bolge: 0.2, anket: 0.2 }
  if (gunSayisi < 30) return { gercekVeri: 0.3, sektorEmsal: 0.4, bolge: 0.15, anket: 0.15 }
  if (gunSayisi < 90) return { gercekVeri: 0.7, sektorEmsal: 0.2, bolge: 0.05, anket: 0.05 }
  return { gercekVeri: 1.0, sektorEmsal: 0.0, bolge: 0.0, anket: 0.0 }
}
