'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useEsnaf } from '@/context/EsnafContext'

/* ═══════ Setup Task Definitions ═══════ */

export interface SetupTask {
    id: string
    label: string
    done: boolean
}

export interface SetupGroup {
    id: string
    title: string
    emoji: string
    weight: number // percentage points
    tasks: SetupTask[]
    href?: string  // link to the relevant page
}

const DEFAULT_GROUPS: Omit<SetupGroup, 'tasks'>[] = [
    { id: 'temel_bilgiler', title: 'İşletme Bilgilerini Tamamlayın', emoji: '📋', weight: 15, href: '/dashboard/profil' },
    { id: 'site_yayin', title: 'Sitenizi Yayınlayın', emoji: '🌐', weight: 20, href: '/dashboard/sitem/editor' },
    { id: 'iletisim', title: 'İletişim Kanallarını Kurun', emoji: '📱', weight: 15, href: '/dashboard/ayarlar' },
    { id: 'urun_hizmet', title: 'Ürün veya Hizmetlerinizi Ekleyin', emoji: '📦', weight: 15, href: '/dashboard/manage/katalog' },
    { id: 'odeme', title: 'Ödeme Yöntemini Kurun', emoji: '💳', weight: 10, href: '/dashboard/manage/odemeler' },
    { id: 'pazarlama', title: 'İlk Pazarlama Adımlarını Atın', emoji: '📢', weight: 15, href: '/dashboard/manage/pazarlama' },
    { id: 'musteri', title: 'İlk Müşterilerinizi Ekleyin', emoji: '👥', weight: 10, href: '/dashboard/manage/crm' },
]

const TASK_DEFINITIONS: Record<string, Omit<SetupTask, 'done'>[]> = {
    temel_bilgiler: [
        { id: 'isletme_adi', label: 'İşletme adı ve sektör' },
        { id: 'adres_konum', label: 'Adres ve konum ekleyin' },
        { id: 'calisma_saatleri', label: 'Çalışma saatlerini belirleyin' },
        { id: 'logo', label: 'Logo yükleyin' },
    ],
    site_yayin: [
        { id: 'icerik_kontrol', label: 'Site içeriğini kontrol edin' },
        { id: 'domain_sec', label: 'Domain seçin veya bağlayın' },
        { id: 'yayinla', label: 'Yayınla butonuna basın' },
    ],
    iletisim: [
        { id: 'whatsapp', label: 'WhatsApp numaranızı bağlayın' },
        { id: 'mail', label: 'Yeni bir mail adresi oluşturun' },
        { id: 'form_test', label: 'İletişim formunu test edin' },
    ],
    urun_hizmet: [
        { id: 'urun_ekle', label: 'En az 3 ürün/hizmet ekleyin' },
        { id: 'fiyat', label: 'Fiyatları belirleyin' },
        { id: 'gorsel', label: 'Görsel yükleyin' },
    ],
    odeme: [
        { id: 'odeme_hesap', label: 'iyzico/PayTR hesabı bağlayın' },
        { id: 'test_odeme', label: 'Test ödemesi yapın' },
    ],
    pazarlama: [
        { id: 'gbp', label: 'Google Business Profile bağlayın' },
        { id: 'sosyal', label: 'Sosyal medya hesabı bağlayın' },
        { id: 'blog', label: 'İlk blog yazınızı AI ile oluşturun' },
    ],
    musteri: [
        { id: 'musteri_ekle', label: 'En az 5 müşteri ekleyin' },
        { id: 'kampanya', label: 'İlk kampanyanızı gönderin' },
    ],
}

/* ═══════ Hook ═══════ */

export function useSetupProgress() {
    const { esnaf } = useEsnaf()
    const [completedTasks, setCompletedTasks] = useState<string[]>([])
    const [dismissed, setDismissed] = useState(false)
    const [loading, setLoading] = useState(true)

    // Load progress from API
    useEffect(() => {
        if (!esnaf?.id) return
        fetch('/api/esnaf/setup-progress')
            .then(r => r.ok ? r.json() : { completedTasks: [], dismissed: false })
            .then(data => {
                setCompletedTasks(data.completedTasks || [])
                setDismissed(data.dismissed || false)
            })
            .catch(() => {
                // Auto-detect some tasks from existing esnaf data
                const auto: string[] = []
                if (esnaf.isletmeAdi) auto.push('isletme_adi')
                if (esnaf.logo) auto.push('logo')
                if (esnaf.adres) auto.push('adres_konum')
                if (esnaf.telefon) auto.push('whatsapp')
                setCompletedTasks(auto)
            })
            .finally(() => setLoading(false))
    }, [esnaf?.id])

    // Save progress
    const saveProgress = useCallback((tasks: string[], isDismissed: boolean) => {
        fetch('/api/esnaf/setup-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedTasks: tasks, dismissed: isDismissed }),
        }).catch(() => { /* silent fail */ })
    }, [])

    // Toggle task completion
    const toggleTask = useCallback((taskId: string) => {
        setCompletedTasks(prev => {
            const next = prev.includes(taskId)
                ? prev.filter(t => t !== taskId)
                : [...prev, taskId]
            saveProgress(next, dismissed)
            return next
        })
    }, [dismissed, saveProgress])

    // Dismiss wizard
    const dismissWizard = useCallback(() => {
        setDismissed(true)
        saveProgress(completedTasks, true)
    }, [completedTasks, saveProgress])

    // Build groups with completion status
    const groups: SetupGroup[] = useMemo(() => {
        return DEFAULT_GROUPS.map(g => ({
            ...g,
            tasks: (TASK_DEFINITIONS[g.id] || []).map(t => ({
                ...t,
                done: completedTasks.includes(t.id),
            })),
        }))
    }, [completedTasks])

    // Calculate total progress
    const progress = useMemo(() => {
        let total = 0
        groups.forEach(g => {
            const done = g.tasks.filter(t => t.done).length
            const ratio = g.tasks.length > 0 ? done / g.tasks.length : 0
            total += g.weight * ratio
        })
        return Math.round(total)
    }, [groups])

    const isComplete = progress >= 100
    const remainingGroups = groups.filter(g => g.tasks.some(t => !t.done))

    return {
        groups,
        progress,
        isComplete,
        remainingGroups,
        toggleTask,
        dismissed,
        dismissWizard,
        loading,
    }
}
