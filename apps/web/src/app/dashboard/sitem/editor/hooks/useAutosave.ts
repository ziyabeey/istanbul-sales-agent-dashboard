'use client'

/**
 * useAutosave — V1 editor autosave hook.
 * 
 * - Saves siteData to /api/site/editor-kaydet on 3s debounce
 * - ⌘S / Ctrl+S for manual save
 * - Tracks save status: idle → saving → saved → idle
 */

import { useEffect, useRef, useCallback } from 'react'
import { useEditorStore } from '../store/editor-store'

export function useAutosave() {
    const isDirty = useEditorStore(s => s.isDirty)
    const siteData = useEditorStore(s => s.siteData)
    const autosaveStatus = useEditorStore(s => s.autosaveStatus)
    const setAutosaveStatus = useEditorStore(s => s.setAutosaveStatus)
    const setLastSavedAt = useEditorStore(s => s.setLastSavedAt)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const abortRef = useRef<AbortController | null>(null)

    const save = useCallback(async () => {
        const store = useEditorStore.getState()
        const data = store.siteData
        if (!data) return false

        // Cancel any in-flight save
        if (abortRef.current) abortRef.current.abort()
        abortRef.current = new AbortController()

        setAutosaveStatus('saving')

        try {
            const res = await fetch('/api/site/editor-kaydet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ siteJson: data }),
                signal: abortRef.current.signal,
            })

            if (!res.ok) throw new Error('Save failed')

            setAutosaveStatus('saved')
            setLastSavedAt(new Date())

            // Reset isDirty
            useEditorStore.setState({ isDirty: false })

            // Back to idle after 2s
            setTimeout(() => {
                if (useEditorStore.getState().autosaveStatus === 'saved') {
                    setAutosaveStatus('idle')
                }
            }, 2000)

            return true
        } catch (err: any) {
            if (err.name === 'AbortError') return false
            setAutosaveStatus('error')
            setTimeout(() => setAutosaveStatus('idle'), 4000)
            return false
        }
    }, [setAutosaveStatus, setLastSavedAt])

    // Debounced autosave on dirty
    useEffect(() => {
        if (!isDirty || !siteData || autosaveStatus === 'saving') return

        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => { save() }, 3000)

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [isDirty, siteData, autosaveStatus, save])

    // ⌘S / Ctrl+S manual save
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault()
                save()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [save])

    return { save, status: autosaveStatus }
}
