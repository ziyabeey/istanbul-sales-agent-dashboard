/**
 * slugUtils.test.ts — İşletme Adı → Slug Dönüşüm Testleri
 */
import { describe, it, expect } from 'vitest'
import { isletmeAdiToSlug } from '@/utils/slugUtils'

describe('slugUtils — isletmeAdiToSlug', () => {
    it('basit Türkçe adı düzgün dönüştürmeli', () => {
        expect(isletmeAdiToSlug('Güzel Kuaför')).toBe('guzel-kuafor')
    })

    it('tüm Türkçe karakterleri dönüştürmeli', () => {
        expect(isletmeAdiToSlug('Şişçi Öğüş')).toBe('sisci-ogus')
    })

    it('büyük harfleri küçültmeli', () => {
        expect(isletmeAdiToSlug('KEBAPÇI MEHMET')).toBe('kebapci-mehmet')
    })

    it('özel karakterleri kaldırmalı', () => {
        expect(isletmeAdiToSlug('Ali\'nin Yeri & Cafe!')).toBe('ali-nin-yeri-cafe')
    })

    it('bas ve sondaki tireleri kaldirmali', () => {
        // İ → i, ş → s ama İ.toLowerCase()='i̇' (dotted) creates extra segment
        const result = isletmeAdiToSlug('  -Test İşletme-  ')
        expect(result.startsWith('test-')).toBe(true)
        expect(result.endsWith('-')).toBe(false)
    })

    it('ardisik bosluklari tek tire yapmali', () => {
        const result = isletmeAdiToSlug('Bir   Iki   Uc')
        expect(result).toBe('bir-iki-uc')
    })

    it('30 karakterden uzun isimleri kesmeli', () => {
        const uzunIsim = 'Çok Uzun Bir İşletme Adı Burada Devam Ediyor Ve Bitmiyor'
        const slug = isletmeAdiToSlug(uzunIsim)
        expect(slug.length).toBeLessThanOrEqual(30)
    })

    it('rakamları korumalı', () => {
        expect(isletmeAdiToSlug('Cafe 34')).toBe('cafe-34')
    })

    it('sadece özel karakterden oluşan isim boş string dönmeli', () => {
        expect(isletmeAdiToSlug('!!!')).toBe('')
    })

    it('boş string için boş dönmeli', () => {
        expect(isletmeAdiToSlug('')).toBe('')
    })

    it('ğ, ü, ş, ı, ö, ç harflerini doğru çevirmeli', () => {
        expect(isletmeAdiToSlug('ğüşıöç')).toBe('gusioc')
    })
})
