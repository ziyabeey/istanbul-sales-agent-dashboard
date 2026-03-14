/**
 * kargoAdapter.test.ts — Kargo Adapter Mock Fiyat ve Registry Testleri
 */
import { describe, it, expect } from 'vitest'

// Mock firebaseAdmin before importing kargoAdapter
import { vi } from 'vitest'
vi.mock('@/lib/firebaseAdmin', () => ({
    adminDb: null,
    Timestamp: { now: () => ({ seconds: 0 }) },
}))

import { getAdapter, tumAdapterler, kargoFiyatHesapla, type KargoFiyatParams } from '@/lib/kargoAdapter'

const STANDART_PAKET: KargoFiyatParams = {
    agirlik: 1000, // 1kg
    gondericiPK: '34000',
    aliciPK: '06000',
}

describe('kargoAdapter', () => {
    describe('getAdapter', () => {
        it('yurtici adaptörünü dönmeli', () => {
            const adapter = getAdapter('yurtici')
            expect(adapter).not.toBeNull()
            expect(adapter!.firmaId).toBe('yurtici')
            expect(adapter!.firmaAd).toBe('Yurtiçi Kargo')
        })

        it('mng adaptörünü dönmeli', () => {
            const adapter = getAdapter('mng')
            expect(adapter).not.toBeNull()
            expect(adapter!.firmaId).toBe('mng')
        })

        it('aras adaptörünü dönmeli', () => {
            const adapter = getAdapter('aras')
            expect(adapter).not.toBeNull()
        })

        it('sendeo adaptörünü dönmeli', () => {
            const adapter = getAdapter('sendeo')
            expect(adapter).not.toBeNull()
        })

        it('geçersiz firma için null dönmeli', () => {
            expect(getAdapter('ups')).toBeNull()
            expect(getAdapter('')).toBeNull()
        })
    })

    describe('tumAdapterler', () => {
        it('4 adapter dönmeli', () => {
            const all = tumAdapterler()
            expect(all).toHaveLength(4)
            const ids = all.map(a => a.firmaId)
            expect(ids).toContain('yurtici')
            expect(ids).toContain('mng')
            expect(ids).toContain('aras')
            expect(ids).toContain('sendeo')
        })
    })

    describe('fiyatHesapla — mock mod', () => {
        it('Yurtiçi 1kg standart + express dönmeli', async () => {
            const adapter = getAdapter('yurtici')!
            const fiyatlar = await adapter.fiyatHesapla(STANDART_PAKET)
            expect(fiyatlar.length).toBeGreaterThanOrEqual(2)
            
            const standart = fiyatlar.find(f => f.servis === 'standart')!
            const express = fiyatlar.find(f => f.servis === 'express')!
            
            expect(standart.fiyatKurus).toBe(3500) // 35₺ taban (1kg = taban)
            expect(express.fiyatKurus).toBe(5250)  // 35₺ * 1.5
            expect(standart.parabirimi).toBe('TRY')
        })

        it('2kg paket doğru ek ücret hesaplamalı', async () => {
            const adapter = getAdapter('yurtici')!
            const fiyatlar = await adapter.fiyatHesapla({ ...STANDART_PAKET, agirlik: 2000 })
            const standart = fiyatlar.find(f => f.servis === 'standart')!
            // 3500 + (2-1) * 800 = 4300
            expect(standart.fiyatKurus).toBe(4300)
        })

        it('tüm firmalar fiyat dönmeli', async () => {
            for (const adapter of tumAdapterler()) {
                const fiyatlar = await adapter.fiyatHesapla(STANDART_PAKET)
                expect(fiyatlar.length).toBeGreaterThanOrEqual(1)
                for (const f of fiyatlar) {
                    expect(f.fiyatKurus).toBeGreaterThan(0)
                    expect(f.firmaId).toBe(adapter.firmaId)
                    expect(f.parabirimi).toBe('TRY')
                }
            }
        })
    })

    describe('gonderiOlustur — mock mod', () => {
        it('takip numarası dönmeli', async () => {
            const adapter = getAdapter('yurtici')!
            const sonuc = await adapter.gonderiOlustur({
                siparisId: 'test-1',
                shopId: 'shop-1',
                aliciAd: 'Test Müşteri',
                aliciTelefon: '5551234567',
                aliciAdres: 'Test Adres',
                aliciIlce: 'Kadıköy',
                aliciSehir: 'İstanbul',
                aliciPK: '34700',
                gondericiAd: 'Test Mağaza',
                gondericiTelefon: '5559876543',
                gondericiAdres: 'Mağaza Adres',
                gondericiSehir: 'İstanbul',
                agirlik: 1000,
            })
            expect(sonuc.basarili).toBe(true)
            expect(sonuc.takipNo).toBeTruthy()
            expect(sonuc.takipNo).toMatch(/^YK/)
        })
    })

    describe('kargoFiyatHesapla — tüm firmalar', () => {
        it('fiyata göre sıralı sonuç dönmeli', async () => {
            const fiyatlar = await kargoFiyatHesapla('dummy-shop', STANDART_PAKET)
            expect(fiyatlar.length).toBeGreaterThanOrEqual(4)
            
            // Fiyata göre sıralı mı kontrol et
            for (let i = 1; i < fiyatlar.length; i++) {
                expect(fiyatlar[i].fiyatKurus).toBeGreaterThanOrEqual(fiyatlar[i - 1].fiyatKurus)
            }
        })
    })
})
