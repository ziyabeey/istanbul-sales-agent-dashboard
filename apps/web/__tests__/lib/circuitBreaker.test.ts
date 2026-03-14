/**
 * circuitBreaker.test.ts — AI API Devre Kesici Testleri
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
    devreKontrol,
    devreBasarili,
    devreHata,
    circuitBreakerHatasiMi,
    devreleriListele,
} from '@/lib/circuitBreaker'

describe('circuitBreaker', () => {
    let devreName: string
    beforeEach(() => {
        devreName = `test-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`
    })

    describe('devreKontrol — CLOSED durumu', () => {
        it('yeni devre CLOSED ve izin var olmali', () => {
            const sonuc = devreKontrol(devreName)
            expect(sonuc.izinVar).toBe(true)
            expect(sonuc.durum).toBe('CLOSED')
        })

        it('fallbackMesaj CLOSED durumda olmamali', () => {
            const sonuc = devreKontrol(devreName)
            expect(sonuc.fallbackMesaj).toBeUndefined()
        })
    })

    describe('devreHata — hata esigi', () => {
        it('4 hata sonra hala CLOSED olmali (varsayilan esik: 5)', () => {
            for (let i = 0; i < 4; i++) devreHata(devreName)
            const sonuc = devreKontrol(devreName)
            expect(sonuc.durum).toBe('CLOSED')
            expect(sonuc.izinVar).toBe(true)
        })

        it('5 hata sonra OPEN olmali', () => {
            for (let i = 0; i < 5; i++) devreHata(devreName)
            const sonuc = devreKontrol(devreName)
            expect(sonuc.durum).toBe('OPEN')
            expect(sonuc.izinVar).toBe(false)
        })

        it('OPEN durumda fallbackMesaj donmeli', () => {
            for (let i = 0; i < 5; i++) devreHata(devreName)
            const sonuc = devreKontrol(devreName)
            expect(sonuc.fallbackMesaj).toBeTruthy()
        })
    })

    describe('devreBasarili — kurtarma', () => {
        it('basarili istek hata sayacini sifirlamali', () => {
            devreHata(devreName)
            devreHata(devreName)
            devreBasarili(devreName)
            for (let i = 0; i < 4; i++) devreHata(devreName)
            const sonuc = devreKontrol(devreName)
            expect(sonuc.durum).toBe('CLOSED')
        })
    })

    describe('HALF_OPEN gecisleri', () => {
        it('HALF_OPEN durumda basarili istek CLOSED yapmali', () => {
            for (let i = 0; i < 5; i++) devreHata(devreName)
            const sonuc = devreKontrol(devreName, { acikKalmaSuresiMs: 0 })
            expect(sonuc.durum).toBe('HALF_OPEN')
            expect(sonuc.izinVar).toBe(true)

            devreBasarili(devreName)
            const sonuc2 = devreKontrol(devreName)
            expect(sonuc2.durum).toBe('CLOSED')
        })

        it('HALF_OPEN durumda hata OPEN yapmali', () => {
            for (let i = 0; i < 5; i++) devreHata(devreName)
            devreKontrol(devreName, { acikKalmaSuresiMs: 0 })
            devreHata(devreName)
            const sonuc = devreKontrol(devreName)
            expect(sonuc.durum).toBe('OPEN')
        })
    })

    describe('circuitBreakerHatasiMi', () => {
        it('429 rate-limit hatasi tetiklemeli', () => {
            expect(circuitBreakerHatasiMi(429)).toBe(true)
        })

        it('500 server hatasi tetiklemeli', () => {
            expect(circuitBreakerHatasiMi(500)).toBe(true)
        })

        it('502, 503 tetiklemeli', () => {
            expect(circuitBreakerHatasiMi(502)).toBe(true)
            expect(circuitBreakerHatasiMi(503)).toBe(true)
        })

        it('200 tetiklememeli', () => {
            expect(circuitBreakerHatasiMi(200)).toBe(false)
        })

        it('400 tetiklememeli', () => {
            expect(circuitBreakerHatasiMi(400)).toBe(false)
        })

        it('401 tetiklememeli', () => {
            expect(circuitBreakerHatasiMi(401)).toBe(false)
        })

        it('404 tetiklememeli', () => {
            expect(circuitBreakerHatasiMi(404)).toBe(false)
        })
    })

    describe('devreleriListele', () => {
        it('kayitli devreleri donmeli', () => {
            devreKontrol(devreName)
            const liste = devreleriListele()
            expect(liste[devreName]).toBeDefined()
            expect(liste[devreName].state).toBe('CLOSED')
            expect(liste[devreName].hataSayisi).toBe(0)
        })
    })

    describe('ozel config', () => {
        it('hataEsigi:3 ile 3 hatada OPEN olmali', () => {
            for (let i = 0; i < 3; i++) {
                devreHata(devreName, { hataEsigi: 3 })
            }
            const sonuc = devreKontrol(devreName)
            expect(sonuc.durum).toBe('OPEN')
        })
    })
})
