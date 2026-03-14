/**
 * useMasaSession — Sürtünmesiz oturum yönetimi
 *
 * Müşteri QR okuttuğunda:
 * 1. deviceId (UUID) oluştur/getir → localStorage persist
 * 2. masaNo + esnafId session state
 * Tarayıcı kapansa bile deviceId kalır → sepet/siparişler korunur
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

const DEVICE_ID_KEY = 'kepenk_device_id'
const SESSION_KEY = 'kepenk_masa_session'

export interface MasaSession {
    deviceId: string
    esnafId: string
    masaNo: number
    esnafAd: string
}

export function useMasaSession(esnafId: string, masaNo: number, esnafAd: string): MasaSession {
    const [deviceId, setDeviceId] = useState<string>('')

    useEffect(() => {
        // DeviceId: var mı bak, yoksa oluştur
        let id = localStorage.getItem(DEVICE_ID_KEY)
        if (!id) {
            id = generateUUID()
            localStorage.setItem(DEVICE_ID_KEY, id)
        }
        setDeviceId(id)

        // Session bilgilerini kaydet
        localStorage.setItem(SESSION_KEY, JSON.stringify({
            deviceId: id,
            esnafId,
            masaNo,
            esnafAd,
            timestamp: Date.now(),
        }))
    }, [esnafId, masaNo, esnafAd])

    return { deviceId, esnafId, masaNo, esnafAd }
}

/**
 * Son oturumu getir (sipariş sonrası takip için)
 */
export function getSonOturum(): MasaSession | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(SESSION_KEY)
        if (!raw) return null
        return JSON.parse(raw) as MasaSession
    } catch {
        return null
    }
}
