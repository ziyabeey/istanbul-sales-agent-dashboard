/**
 * efatura.test.ts — E-Fatura KDV Hesaplama ve Fatura Numara Testleri
 */
import { describe, it, expect } from 'vitest'
import { kdvHesapla } from '@/lib/efatura'

describe('efatura — kdvHesapla', () => {
    it('KDV %18 doğru hesaplamalı', () => {
        const kalem = kdvHesapla(10000, 1, 18) // 100₺, 1 adet, %18
        expect(kalem.birimFiyat).toBe(10000)
        expect(kalem.miktar).toBe(1)
        expect(kalem.kdvOrani).toBe(18)
        expect(kalem.kdvTutar).toBe(1800) // 10000 * 18/100
        expect(kalem.toplamTutar).toBe(11800) // 10000 + 1800
    })

    it('KDV %8 doğru hesaplamalı', () => {
        const kalem = kdvHesapla(5000, 2, 8) // 50₺ x 2 = 100₺ ara toplam
        expect(kalem.kdvTutar).toBe(800) // 10000 * 8/100
        expect(kalem.toplamTutar).toBe(10800) // 10000 + 800
    })

    it('KDV %1 (gıda) doğru hesaplamalı', () => {
        const kalem = kdvHesapla(1000, 10, 1) // 10₺ x 10 = 100₺
        expect(kalem.kdvTutar).toBe(100) // 10000 * 1/100
        expect(kalem.toplamTutar).toBe(10100)
    })

    it('KDV %20 (2025 artışı) doğru hesaplamalı', () => {
        const kalem = kdvHesapla(20000, 1, 20) // 200₺, 1 adet
        expect(kalem.kdvTutar).toBe(4000) // 20000 * 20/100
        expect(kalem.toplamTutar).toBe(24000)
    })

    it('miktar 0 olduğunda hepsi 0 olmalı', () => {
        const kalem = kdvHesapla(10000, 0, 18)
        expect(kalem.kdvTutar).toBe(0)
        expect(kalem.toplamTutar).toBe(0)
    })

    it('birim fiyat 0 olduğunda hepsi 0 olmalı', () => {
        const kalem = kdvHesapla(0, 5, 18)
        expect(kalem.kdvTutar).toBe(0)
        expect(kalem.toplamTutar).toBe(0)
    })

    it('büyük miktarlarda Math.round ile kuruş doğru yuvarlamalı', () => {
        const kalem = kdvHesapla(333, 3, 18) // 3.33₺ x 3 = 9.99₺ → 999 kuruş
        // 999 * 18/100 = 179.82 → Math.round → 180
        expect(kalem.kdvTutar).toBe(180)
        expect(kalem.toplamTutar).toBe(999 + 180)
    })
})
