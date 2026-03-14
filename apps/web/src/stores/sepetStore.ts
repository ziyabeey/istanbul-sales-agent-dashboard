/**
 * sepetStore — Zustand + persist (localStorage)
 *
 * Sepet state'i tarayıcı kapansa bile korunur.
 * DeviceId ile cihaz bazlı ayrıştırma.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface SepetKalem {
    menuItemId: string
    ad: string
    adet: number
    birimFiyatKurus: number
    kdvTipi: 'gida' | 'icecek' | 'alkol'
    gorselUrl?: string | null
    notlar?: string
}

interface SepetState {
    kalemler: SepetKalem[]
    masaNo: number | null
    esnafId: string | null
    deviceId: string | null

    // Actions
    oturumBaslat: (esnafId: string, masaNo: number, deviceId: string) => void
    ekle: (kalem: Omit<SepetKalem, 'adet'>) => void
    cikar: (menuItemId: string) => void
    adetGuncelle: (menuItemId: string, adet: number) => void
    notEkle: (menuItemId: string, not: string) => void
    temizle: () => void

    // Computed helpers (inline)
    getToplamKurus: () => number
    getToplamAdet: () => number
}

export const useSepetStore = create<SepetState>()(
    persist(
        (set, get) => ({
            kalemler: [],
            masaNo: null,
            esnafId: null,
            deviceId: null,

            oturumBaslat: (esnafId, masaNo, deviceId) => {
                const current = get()
                // Farklı masa/esnafa geçtiyse sepeti temizle
                if (current.esnafId !== esnafId || current.masaNo !== masaNo) {
                    set({ kalemler: [], esnafId, masaNo, deviceId })
                } else {
                    set({ esnafId, masaNo, deviceId })
                }
            },

            ekle: (kalem) => set((state) => {
                const mevcut = state.kalemler.find(k => k.menuItemId === kalem.menuItemId)
                if (mevcut) {
                    return {
                        kalemler: state.kalemler.map(k =>
                            k.menuItemId === kalem.menuItemId
                                ? { ...k, adet: k.adet + 1 }
                                : k
                        ),
                    }
                }
                return { kalemler: [...state.kalemler, { ...kalem, adet: 1 }] }
            }),

            cikar: (menuItemId) => set((state) => ({
                kalemler: state.kalemler.filter(k => k.menuItemId !== menuItemId),
            })),

            adetGuncelle: (menuItemId, adet) => set((state) => {
                if (adet <= 0) {
                    return { kalemler: state.kalemler.filter(k => k.menuItemId !== menuItemId) }
                }
                return {
                    kalemler: state.kalemler.map(k =>
                        k.menuItemId === menuItemId ? { ...k, adet } : k
                    ),
                }
            }),

            notEkle: (menuItemId, not) => set((state) => ({
                kalemler: state.kalemler.map(k =>
                    k.menuItemId === menuItemId ? { ...k, notlar: not } : k
                ),
            })),

            temizle: () => set({ kalemler: [] }),

            getToplamKurus: () => get().kalemler.reduce((t, k) => t + k.birimFiyatKurus * k.adet, 0),
            getToplamAdet: () => get().kalemler.reduce((t, k) => t + k.adet, 0),
        }),
        {
            name: 'kepenk-sepet',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                kalemler: state.kalemler,
                masaNo: state.masaNo,
                esnafId: state.esnafId,
                deviceId: state.deviceId,
            }),
        }
    )
)
