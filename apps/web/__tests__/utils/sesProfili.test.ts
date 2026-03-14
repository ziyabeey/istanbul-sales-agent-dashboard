/**
 * sesProfili.test.ts — Ses Profili Prompt Uretici Testleri
 */
import { describe, it, expect } from 'vitest'
import { sesProfiliPrompt } from '@/utils/sesProfilegitici'

describe('sesProfilegitici — sesProfiliPrompt', () => {
    const PROFIL = {
        kisilikTonu: 'samimi',
        cumpeCikisi: 'kisa ve oz',
        emojKullanimi: 'cok',
        hitapSekli: 'abi',
        karakteristikKelimeler: ['haydi', 'tamam', 'gel'],
        karakteristikIfadeler: ['hadi gel abi', 'super olur'],
        ornekMesajlar: [
            'Merhaba abi, hosgeldin!',
            'Bugunku kampanya kacmaz, gel bi bak!',
            'Seni bekliyoruz!',
        ],
    }

    it('gecerli profil ile prompt donmeli', () => {
        const prompt = sesProfiliPrompt(PROFIL)
        expect(prompt).toBeTruthy()
        expect(prompt.length).toBeGreaterThan(100)
    })

    it('kisilik tonunu icermeli', () => {
        expect(sesProfiliPrompt(PROFIL)).toContain('samimi')
    })

    it('hitap seklini icermeli', () => {
        expect(sesProfiliPrompt(PROFIL)).toContain('abi')
    })

    it('karakteristik kelimeleri icermeli', () => {
        const prompt = sesProfiliPrompt(PROFIL)
        expect(prompt).toContain('haydi')
        expect(prompt).toContain('tamam')
    })

    it('ornek mesajlari icermeli (max 3)', () => {
        const prompt = sesProfiliPrompt(PROFIL)
        expect(prompt).toContain('Merhaba abi')
        expect(prompt).toContain('kampanya')
    })

    it('KURAL 1 ve KURAL 2 icermeli', () => {
        const prompt = sesProfiliPrompt(PROFIL)
        expect(prompt).toContain('KURAL 1')
        expect(prompt).toContain('KURAL 2')
    })

    it('null profil icin bos string donmeli', () => {
        expect(sesProfiliPrompt(null)).toBe('')
        expect(sesProfiliPrompt(undefined)).toBe('')
    })

    it('bos profil icin bos string donmeli', () => {
        expect(sesProfiliPrompt({})).toBe('')
        expect(sesProfiliPrompt({ foo: 'bar' })).toBe('')
    })

    it('karakteristikKelimeler olmadan da calismali', () => {
        const eksik = { ...PROFIL, karakteristikKelimeler: undefined, karakteristikIfadeler: undefined }
        const prompt = sesProfiliPrompt(eksik)
        expect(prompt).toBeTruthy()
        expect(prompt).toContain('yok') // fallback
    })

    it('ornekMesajlar olmadan da calismali', () => {
        const eksik = { ...PROFIL, ornekMesajlar: undefined }
        const prompt = sesProfiliPrompt(eksik)
        expect(prompt).toBeTruthy()
    })
})
