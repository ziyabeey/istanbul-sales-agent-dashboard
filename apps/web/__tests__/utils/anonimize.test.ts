/**
 * anonimize.test.ts — KVKK Anonimizasyon Testleri
 */
import { describe, it, expect } from 'vitest'
import { anonimizeBaglam } from '@/utils/anonimize'

const ESNAF = {
    ad: 'Ahmet Yılmaz',
    isletmeAdi: 'Güzel Kuaför',
}

describe('anonimize — anonimizeBaglam', () => {
    describe('isim ve işletme adı temizleme', () => {
        it('esnaf adını [ESNAF] ile değiştirmeli', () => {
            const sonuc = anonimizeBaglam('Ahmet Yılmaz aradı.', ESNAF)
            expect(sonuc).toBe('[ESNAF] aradı.')
            expect(sonuc).not.toContain('Ahmet Yılmaz')
        })

        it('işletme adını [İŞLETME] ile değiştirmeli', () => {
            const sonuc = anonimizeBaglam('Güzel Kuaför randevu istedi.', ESNAF)
            expect(sonuc).toBe('[İŞLETME] randevu istedi.')
        })

        it('hem ad hem işletme adını temizlemeli', () => {
            const sonuc = anonimizeBaglam('Ahmet Yılmaz Güzel Kuaför sahibi.', ESNAF)
            expect(sonuc).not.toContain('Ahmet Yılmaz')
            expect(sonuc).not.toContain('Güzel Kuaför')
        })

        it('büyük/küçük harf duyarsız olmalı', () => {
            const sonuc = anonimizeBaglam('ahmet yılmaz iyi bir esnaf.', ESNAF)
            expect(sonuc).not.toContain('ahmet yılmaz')
        })
    })

    describe('telefon numarası temizleme', () => {
        it('+90 başlangıçlı telefonu temizlemeli', () => {
            const sonuc = anonimizeBaglam('Numara: +905321234567', ESNAF)
            expect(sonuc).toBe('Numara: [TELEFON]')
        })

        it('0 ile başlayan 11 haneli telefonu temizlemeli', () => {
            const sonuc = anonimizeBaglam('Ara: 05321234567', ESNAF)
            expect(sonuc).toBe('Ara: [TELEFON]')
        })

        it('boşluklu formatı temizlemeli', () => {
            const sonuc = anonimizeBaglam('Tel: 0532 123 45 67', ESNAF)
            expect(sonuc).toBe('Tel: [TELEFON]')
        })

        it('birden fazla telefonu temizlemeli', () => {
            const sonuc = anonimizeBaglam('Tel1: 05321111111, Tel2: 05329999999', ESNAF)
            expect(sonuc).not.toMatch(/05\d{9}/)
        })
    })

    describe('e-posta temizleme', () => {
        it('e-posta adresini [EPOSTA] ile değiştirmeli', () => {
            const sonuc = anonimizeBaglam('Mail: test@example.com', ESNAF)
            expect(sonuc).toBe('Mail: [EPOSTA]')
        })

        it('subdomain\'li e-postayı temizlemeli', () => {
            const sonuc = anonimizeBaglam('info@sub.domain.co.tr', ESNAF)
            expect(sonuc).toBe('[EPOSTA]')
        })
    })

    describe('edge case\'ler', () => {
        it('boş string için boş dönmeli', () => {
            expect(anonimizeBaglam('', ESNAF)).toBe('')
        })

        it('null/undefined esnaf ile çökmemelı', () => {
            expect(anonimizeBaglam('Merhaba', {})).toBe('Merhaba')
            expect(anonimizeBaglam('Merhaba', null)).toBe('Merhaba')
        })

        it('kişisel veri olmayan metni aynen dönmeli', () => {
            const metin = 'Bugün hava güzel.'
            expect(anonimizeBaglam(metin, ESNAF)).toBe(metin)
        })
    })
})
