'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import TopBar from './TopBar'
import LeftBar from './LeftBar'
import Canvas from './Canvas'
import RightPanel from './RightPanel'
import { useEditorStore, type SiteData } from '../store/editor-store'
import { useEsnaf } from '@/context/EsnafContext'
import { THEME_CATALOG_ARRAY } from '@kepenk/templates/src/registry/theme-catalog'
import { loadTheme } from '@kepenk/templates/src/registry/config-loader'
import { themeConfigToSiteData } from '@/utils/themeToSiteData'
import ContextMenu from './ContextMenu'
import InlineEditPanel from './InlineEditPanel'
import ImageEditOverlay from './ImageEditOverlay'
import SettingsModal from './SettingsModal'
import AIEditorMode from './AIEditorMode'
import { useAutosave } from '../hooks/useAutosave'

export default function EditorShell() {
    const isDirty = useEditorStore(s => s.isDirty)
    const siteData = useEditorStore(s => s.siteData)
    const setSiteData = useEditorStore(s => s.setSiteData)
    const editorMode = useEditorStore(s => s.editorMode)
    const { esnaf, loading: esnafLoading } = useEsnaf()
    const [mounted, setMounted] = useState(false)

    /* Wait for mount before using portal */
    useEffect(() => { setMounted(true) }, [])

    /* Populate siteData from EsnafContext + ThemeCatalog on first load */
    useEffect(() => {
        if (siteData || esnafLoading) return

        // If esnaf has an AST structure in siteData, load it directly
        if (esnaf?.siteData && typeof esnaf.siteData === 'object' && esnaf.siteData.theme) {
            setSiteData(esnaf.siteData as SiteData)
            return
        }

        // Fallback to legacy siteJson from a previous session
        if (esnaf?.siteJson && typeof esnaf.siteJson === 'object' && esnaf.siteJson.sektorId) {
            setSiteData(esnaf.siteJson as SiteData)
            return
        }

        // Create initial from Theme Catalog match
        const sektor = esnaf?.sektor || ''
        let match = THEME_CATALOG_ARRAY.find(d => d.sectorLabel.toLowerCase().includes(sektor.toLowerCase()) || d.id.includes(sektor.toLowerCase()))
        if (!match) match = THEME_CATALOG_ARRAY[0]

        loadTheme(match.id).then(res => {
            if (res) {
                const initial = themeConfigToSiteData(res.config, res.business, {
                    isletmeAdi: esnaf?.isletmeAdiTam || esnaf?.isletmeAdi || esnaf?.ad,
                    telefon: esnaf?.telefon || esnaf?.waNumarasi || '',
                    adres: esnaf?.ilce ? `${esnaf.ilce}, İstanbul` : 'İstanbul',
                    paket: esnaf?.paket || 'STANDART',
                })
                setSiteData(initial)
            }
        }).catch(err => {
            console.error("Failed to load initial theme:", err)
        })
    }, [esnaf, esnafLoading, siteData, setSiteData])


    /* Activate autosave — 3s debounce + ⌘S */
    useAutosave()

    /* Global keyboard shortcuts for editor UX */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                const store = useEditorStore.getState()
                if (store.contextMenu) store.closeContextMenu()
                if (store.inlineEdit) store.closeInlineEdit()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    /* Warn before leaving with unsaved changes */
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (isDirty) { e.preventDefault(); e.returnValue = '' }
        }
        window.addEventListener('beforeunload', handler)
        return () => window.removeEventListener('beforeunload', handler)
    }, [isDirty])

    /* Load Inter font (non-blocking) */
    useEffect(() => {
        if (!document.getElementById('ke-inter-font')) {
            const link = document.createElement('link')
            link.id = 'ke-inter-font'
            link.rel = 'stylesheet'
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
            document.head.appendChild(link)
        }
    }, [])

    if (!mounted) return null

    /* Portal: renders directly on document.body, escaping dashboard stacking context */
    return createPortal(
        <>
            <style>{`
                .ke-editor-root { position: fixed; inset: 0; display: flex; flex-direction: column; z-index: 99999; font-family: 'Inter', system-ui, -apple-system, sans-serif; background: #e8ecf1; -webkit-font-smoothing: antialiased; isolation: isolate; }
                .ke-editor-body { flex: 1; display: flex; overflow: hidden; position: relative; }
                .ke-editor-root *, .ke-editor-root *::before, .ke-editor-root *::after { box-sizing: border-box; }
            `}
            </style>
            <div className="ke-editor-root">
                <TopBar />
                <div className="ke-editor-body">
                    {editorMode === 'ai' ? (
                        <AIEditorMode />
                    ) : (
                        <>
                            <LeftBar />
                            <Canvas />
                            <RightPanel />
                        </>
                    )}
                </div>
                <ContextMenu />
                <InlineEditPanel />
                <ImageEditOverlay />
                <SettingsModal />
            </div>
        </>,
        document.body
    )
}
