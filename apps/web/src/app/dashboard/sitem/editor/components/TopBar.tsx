'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useEditorStore } from '../store/editor-store'
import { useEsnaf } from '@/context/EsnafContext'

export default function TopBar() {
    const { esnafId, esnaf } = useEsnaf()
    const deviceMode = useEditorStore(s => s.deviceMode)
    const setDeviceMode = useEditorStore(s => s.setDeviceMode)
    const zoom = useEditorStore(s => s.zoom)
    const setZoom = useEditorStore(s => s.setZoom)
    const undoStack = useEditorStore(s => s.undoStack)
    const redoStack = useEditorStore(s => s.redoStack)
    const undo = useEditorStore(s => s.undo)
    const redo = useEditorStore(s => s.redo)
    const isSaving = useEditorStore(s => s.isSaving)
    const saveSuccess = useEditorStore(s => s.saveSuccess)
    const isDirty = useEditorStore(s => s.isDirty)
    const setSaving = useEditorStore(s => s.setSaving)
    const setSaveSuccess = useEditorStore(s => s.setSaveSuccess)
    const pages = useEditorStore(s => s.pages)
    const activePageId = useEditorStore(s => s.activePageId)
    const setActivePageId = useEditorStore(s => s.setActivePageId)
    const siteData = useEditorStore(s => s.siteData)
    const generatedHtml = useEditorStore(s => s.generatedHtml)

    const router = useRouter()
    const [pageDropdownOpen, setPageDropdownOpen] = useState(false)
    const [publishModal, setPublishModal] = useState<'idle' | 'confirm' | 'publishing' | 'success'>('idle')
    const [siteMenuOpen, setSiteMenuOpen] = useState(false)
    const [upgradeModal, setUpgradeModal] = useState(false)
    const siteMenuRef = useRef<HTMLDivElement>(null)

    const activePage = pages.find(p => p.id === activePageId)

    /* Keyboard shortcuts */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave() }
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
            if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [undo, redo])

    /* Close menus on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (siteMenuRef.current && !siteMenuRef.current.contains(e.target as Node)) {
                setSiteMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSave = useCallback(async () => {
        if (!esnafId) return
        setSaving(true)
        try {
            await fetch('/api/site/editor-kaydet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    siteJson: siteData,
                    siteHtml: generatedHtml,
                }),
            })
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch { /* silent */ }
        finally { setSaving(false) }
    }, [esnafId, siteData, generatedHtml, setSaving, setSaveSuccess])

    const handlePreview = useCallback(() => {
        if (generatedHtml) {
            const blob = new Blob([generatedHtml], { type: 'text/html' })
            window.open(URL.createObjectURL(blob), '_blank')
        } else {
            window.open(`/sites/${esnafId}`, '_blank')
        }
    }, [esnafId, generatedHtml])

    const handlePublish = useCallback(async () => {
        setPublishModal('publishing')
        try {
            await fetch('/api/site/editor-kaydet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    siteJson: siteData,
                    siteHtml: generatedHtml,
                    publish: true,
                }),
            })
            setPublishModal('success')
            setTimeout(() => setPublishModal('idle'), 5000)
        } catch {
            setPublishModal('idle')
        }
    }, [siteData, generatedHtml])

    return (
        <>
            <style>{`
                .ke-topbar { background: #fff; display: flex; flex-direction: column; border-bottom: 1px solid #e2e8f0; z-index: 200; user-select: none; font-family: 'Inter', system-ui, sans-serif; }
                .ke-tb-upper { display: flex; align-items: center; justify-content: space-between; height: 46px; padding: 0 12px; border-bottom: 1px solid #e8ecf1; }
                .ke-tb-lower { display: flex; align-items: center; justify-content: space-between; height: 42px; padding: 0 12px; }

                /* Logo */
                .ke-logo { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 15px; color: #17191c; letter-spacing: -0.02em; }
                .ke-logo svg { width: 28px; height: 28px; }

                /* Menu bar */
                .ke-menu-bar { display: flex; gap: 4px; margin-left: 16px; }
                .ke-menu-item { padding: 6px 12px; font-size: 13px; font-weight: 500; color: #3b4057; cursor: pointer; border-radius: 6px; transition: background 0.15s; }
                .ke-menu-item:hover { background: #f1f5f9; }

                /* Right buttons */
                .ke-tb-right { display: flex; align-items: center; gap: 8px; }
                .ke-btn { padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; display: flex; align-items: center; gap: 6px; font-family: inherit; }
                .ke-btn-ghost { background: transparent; color: #3b4057; }
                .ke-btn-ghost:hover { background: #f1f5f9; }
                .ke-btn-outline { background: #fff; border: 1px solid #cbd5e1; color: #17191c; }
                .ke-btn-outline:hover { background: #f8fafc; border-color: #94a3b8; }
                .ke-btn-primary { background: #17191c; color: #fff; }
                .ke-btn-primary:hover { background: #2d3142; }
                .ke-btn-publish { background: #3b82f6; color: #fff; }
                .ke-btn-publish:hover { background: #2563eb; }
                .ke-btn-success { background: #22c55e; color: #fff; }
                .ke-btn.disabled { opacity: 0.4; pointer-events: none; }

                /* Lower deck */
                .ke-tb-left-lower { display: flex; align-items: center; gap: 8px; }
                .ke-tb-center-lower { flex: 1; display: flex; justify-content: center; align-items: center; }
                .ke-tb-right-lower { display: flex; align-items: center; gap: 4px; }

                /* Page selector */
                .ke-page-sel { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; font-size: 13px; font-weight: 500; color: #17191c; position: relative; min-width: 140px; }
                .ke-page-sel:hover { border-color: #94a3b8; }
                .ke-page-label { font-size: 12px; color: #64748b; font-weight: 600; margin-right: 4px; }
                .ke-page-dd { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); margin-top: 4px; z-index: 10; overflow: hidden; }
                .ke-page-dd-item { padding: 8px 12px; font-size: 13px; cursor: pointer; transition: 0.1s; }
                .ke-page-dd-item:hover { background: #eff6ff; color: #2563eb; }
                .ke-page-dd-item.active { background: #eff6ff; color: #2563eb; font-weight: 600; }

                /* Device toggle */
                .ke-device-group { display: flex; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #f8fafc; }
                .ke-device-btn { padding: 6px 10px; border: none; background: transparent; cursor: pointer; color: #64748b; display: flex; align-items: center; transition: 0.15s; }
                .ke-device-btn.active { background: #fff; color: #17191c; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
                .ke-device-btn:hover:not(.active) { color: #334155; }
                .ke-device-btn + .ke-device-btn { border-left: 1px solid #e2e8f0; }

                /* URL bar */
                .ke-url-bar { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 16px; border-radius: 8px; min-width: 280px; max-width: 400px; }
                .ke-url-bar svg { color: #64748b; flex-shrink: 0; }
                .ke-url-text { font-size: 12px; color: #475569; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

                /* Undo/Redo */
                .ke-undo-group { display: flex; gap: 2px; }
                .ke-icon-btn { width: 32px; height: 32px; border-radius: 6px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569; transition: 0.15s; }
                .ke-icon-btn:hover:not(.disabled) { background: #f1f5f9; color: #17191c; }
                .ke-icon-btn.disabled { opacity: 0.3; cursor: default; }

                /* Zoom */
                .ke-zoom-btn { display: flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 6px; border: none; background: transparent; cursor: pointer; font-size: 12px; color: #475569; font-weight: 600; font-family: inherit; transition: 0.15s; }
                .ke-zoom-btn:hover { background: #f1f5f9; }
                .ke-zoom-btn svg { color: #64748b; }

                .ke-separator { width: 1px; height: 24px; background: #e2e8f0; margin: 0 4px; }

                /* Site menu dropdown */
                .ke-site-menu-wrap { position: relative; }
                .ke-site-dd { position: absolute; top: 100%; left: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 12px 32px rgba(0,0,0,0.12); margin-top: 6px; z-index: 100; min-width: 220px; overflow: hidden; animation: keMenuIn 0.15s ease-out; }
                @keyframes keMenuIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
                .ke-site-dd-item { padding: 9px 16px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #334155; transition: 0.1s; }
                .ke-site-dd-item:hover { background: #f1f5f9; color: #17191c; }
                .ke-site-dd-item.destructive:hover { background: #fef2f2; color: #ef4444; }
                .ke-site-dd-sep { height: 1px; background: #e2e8f0; margin: 4px 0; }
                .ke-dirty-dot { width: 7px; height: 7px; background: #f59e0b; border-radius: 50%; margin-left: 6px; animation: kePulse 2s infinite; }
                @keyframes kePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

                @media (max-width: 900px) {
                    .ke-menu-bar, .ke-url-bar { display: none; }
                    .ke-page-sel { min-width: auto; }
                }
            `}</style>

            <div className="ke-topbar">
                {/* Upper Deck */}
                <div className="ke-tb-upper">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <a href="/dashboard/sitem" className="ke-logo" title="Ana Panele Dön" onClick={e => { if (isDirty && !confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?')) e.preventDefault() }}>
                            <svg viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#17191c"/><path d="M8 8h4.5v12H8V8zm7.5 0H20v12h-4.5V8z" fill="#fff"/></svg>
                            kepenk
                            {isDirty && <span className="ke-dirty-dot" title="Kaydedilmemiş değişiklikler" />}
                        </a>
                        <div className="ke-menu-bar">
                            <div className="ke-site-menu-wrap" ref={siteMenuRef}>
                                <div className="ke-menu-item" onClick={() => setSiteMenuOpen(!siteMenuOpen)}>Site ▾</div>
                                {siteMenuOpen && (
                                    <div className="ke-site-dd">
                                        <div className="ke-site-dd-item" onClick={() => { setSiteMenuOpen(false); handleSave() }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
                                            Kaydet
                                        </div>
                                        <div className="ke-site-dd-item" onClick={() => { setSiteMenuOpen(false); handlePreview() }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            Önizle
                                        </div>
                                        <div className="ke-site-dd-item" onClick={() => { setSiteMenuOpen(false); setPublishModal('confirm') }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                                            Yayınla
                                        </div>
                                        <div className="ke-site-dd-sep" />
                                        <div className="ke-site-dd-item" onClick={() => { setSiteMenuOpen(false); if (!isDirty || confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?')) router.push('/dashboard/sitem') }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                                            Panele Dön
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="ke-menu-item" onClick={() => useEditorStore.getState().openSettingsModal()}>Ayarlar</div>
                            <div className="ke-menu-item">Yardım</div>
                        </div>
                    </div>

                    {/* Editor Mode Toggle */}
                    <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 8, padding: 2, gap: 2 }}>
                        <button onClick={() => useEditorStore.getState().setEditorMode('standard')} style={{
                            padding: '5px 14px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 700,
                            cursor: 'pointer', fontFamily: 'inherit', transition: '0.15s',
                            background: useEditorStore.getState().editorMode === 'standard' ? '#fff' : 'transparent',
                            color: useEditorStore.getState().editorMode === 'standard' ? '#17191c' : '#94a3b8',
                            boxShadow: useEditorStore.getState().editorMode === 'standard' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                        }}>Standart</button>
                        <button onClick={() => useEditorStore.getState().setEditorMode('ai')} style={{
                            padding: '5px 14px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 700,
                            cursor: 'pointer', fontFamily: 'inherit', transition: '0.15s',
                            background: useEditorStore.getState().editorMode === 'ai' ? 'linear-gradient(135deg, #7c3aed, #2563eb)' : 'transparent',
                            color: useEditorStore.getState().editorMode === 'ai' ? '#fff' : '#94a3b8',
                            boxShadow: useEditorStore.getState().editorMode === 'ai' ? '0 1px 3px rgba(124,58,237,0.3)' : 'none',
                        }}>✨ AI</button>
                    </div>

                    <div className="ke-tb-right">
                        <button className="ke-icon-btn" title="Site Ayarları" onClick={() => useEditorStore.getState().setRightPanelOpen(!useEditorStore.getState().rightPanelOpen)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                        </button>
                        <div className="ke-separator" />
                        {/* Autosave status indicator */}
                        {(() => {
                            const as = useEditorStore.getState().autosaveStatus
                            const lastSaved = useEditorStore.getState().lastSavedAt
                            if (as === 'saving') return (
                                <span style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5, marginRight: 6 }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.2-8.6"/></svg>
                                    Kaydediliyor...
                                </span>
                            )
                            if (as === 'saved') return (
                                <span style={{ fontSize: 11, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, marginRight: 6 }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    Kaydedildi ✓
                                </span>
                            )
                            if (as === 'error') return (
                                <span style={{ fontSize: 11, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, marginRight: 6 }}>⚠ Kayıt hatası</span>
                            )
                            if (lastSaved) {
                                const ago = Math.floor((Date.now() - lastSaved.getTime()) / 60000)
                                return (
                                    <span style={{ fontSize: 10, color: '#94a3b8', marginRight: 6 }}>
                                        {ago < 1 ? 'Az önce kaydedildi' : `${ago}dk önce kaydedildi`}
                                    </span>
                                )
                            }
                            return null
                        })()}
                        <button className="ke-btn ke-btn-ghost" style={{ color: '#3b82f6', fontWeight: 700 }} onClick={() => setUpgradeModal(true)}>Yükselt</button>
                        <button className={`ke-btn ke-btn-outline${isSaving ? ' disabled' : ''}`} onClick={handleSave}>
                            {isSaving ? (
                                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.2-8.6"/></svg> Kaydediliyor</>
                            ) : saveSuccess ? (
                                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Kaydedildi!</>
                            ) : 'Kaydet'}
                        </button>
                        <button className="ke-btn ke-btn-primary" onClick={handlePreview}>Önizle</button>
                        <button className="ke-btn ke-btn-publish" onClick={() => setPublishModal('confirm')}>Yayınla</button>
                    </div>
                </div>

                {/* Lower Deck */}
                <div className="ke-tb-lower">
                    <div className="ke-tb-left-lower">
                        {/* Page selector */}
                        <div className="ke-page-sel" onClick={() => setPageDropdownOpen(!pageDropdownOpen)}>
                            <span className="ke-page-label">Sayfa:</span>
                            <span>{activePage?.name ?? 'Anasayfa'}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}><path d="M6 9l6 6 6-6"/></svg>
                            {pageDropdownOpen && (
                                <div className="ke-page-dd">
                                    {pages.map(p => (
                                        <div key={p.id} className={`ke-page-dd-item${p.id === activePageId ? ' active' : ''}`} onClick={(e) => { e.stopPropagation(); setActivePageId(p.id); setPageDropdownOpen(false) }}>
                                            {p.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="ke-separator" />

                        {/* Device toggle */}
                        <div className="ke-device-group">
                            <button className={`ke-device-btn${deviceMode === 'desktop' ? ' active' : ''}`} onClick={() => setDeviceMode('desktop')} title="Masaüstü">
                                <svg width="18" height="18" viewBox="0 0 24 18"><path fill="currentColor" d="M19 0H4a2 2 0 00-2 2v9a2 2 0 002 2h7v3H7v1h9v-1h-4v-3h7a2 2 0 002-2V2a2 2 0 00-2-2zm1 11a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h15a1 1 0 011 1v9z"/></svg>
                            </button>
                            <button className={`ke-device-btn${deviceMode === 'mobile' ? ' active' : ''}`} onClick={() => setDeviceMode('mobile')} title="Mobil">
                                <svg width="18" height="18" viewBox="0 0 24 18"><path fill="currentColor" d="M15 0a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V2a2 2 0 012-2h7zm0 1H8a1 1 0 00-1 1v14a1 1 0 001 1h7a1 1 0 001-1V2a1 1 0 00-1-1zm-2 13v1h-3v-1h3z"/></svg>
                            </button>
                        </div>
                    </div>

                    <div className="ke-tb-center-lower">
                        <div className="ke-url-bar">
                            <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor"><path fillRule="evenodd" d="M9 16A7 7 0 119 2a7 7 0 010 14zm6-7a5.99 5.99 0 00-.341-2h-1.825c.108.634.166 1.305.166 2 0 .695-.058 1.366-.166 2h1.825A5.99 5.99 0 0015 9z" clipRule="evenodd"/></svg>
                            <span className="ke-url-text">{esnaf?.slug ? `${esnaf.slug}.kepenk.ai` : esnaf?.subdomainUrl || 'www.isletme-adi.kepenk.site'}</span>
                        </div>
                    </div>

                    <div className="ke-tb-right-lower">
                        {/* Undo/Redo */}
                        <div className="ke-undo-group">
                            <button className={`ke-icon-btn${undoStack.length === 0 ? ' disabled' : ''}`} onClick={undo} title="Geri Al">
                                <svg width="18" height="18" viewBox="0 0 29 29"><path fill="currentColor" d="M14 11H6.83l3-3.33L9.11 7 5 11.51 9.11 16l.74-.68L6.8 12H14a5 5 0 010 10h-2v1h2a6 6 0 100-12z"/></svg>
                            </button>
                            <button className={`ke-icon-btn${redoStack.length === 0 ? ' disabled' : ''}`} onClick={redo} title="Yinele">
                                <svg width="18" height="18" viewBox="0 0 29 29"><path fill="currentColor" d="M15 11h7.17l-3-3.33.72-.67L24 11.51 19.89 16l-.74-.68L22.2 12H15a5 5 0 000 10h2v1h-2a6 6 0 110-12z"/></svg>
                            </button>
                        </div>

                        <div className="ke-separator" />

                        {/* Zoom */}
                        <button className="ke-zoom-btn" onClick={() => setZoom(zoom === 100 ? 50 : zoom === 50 ? 75 : 100)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5,4 C15.643,4 19,7.358 19,11.5 C19,15.642 15.643,19 11.5,19 C7.357,19 4,15.642 4,11.5 C4,7.358 7.357,4 11.5,4Z M12,8 L12,11 L15,11 L15,12 L12,12 L12,15 L11,15 L11,12 L8,12 L8,11 L11,11 L11,8 L12,8Z"/></svg>
                            %{zoom}
                        </button>

                        <div className="ke-separator" />

                        <button className="ke-zoom-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>
                            Arama
                        </button>
                    </div>
                </div>

                {/* Publish Modal */}
                {publishModal !== 'idle' && (
                    <>
                        <style>{`
                            .ke-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: keFadeIn 0.15s; }
                            .ke-modal { background: #fff; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.15); text-align: center; animation: keModalIn 0.2s ease-out; }
                            @keyframes keModalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: none; } }
                            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                            .ke-modal-icon { margin-bottom: 16px; display: flex; align-items: center; justify-content: center; }
                            .ke-modal-icon svg { width: 48px; height: 48px; }
                            .ke-modal-title { font-size: 18px; font-weight: 800; color: #17191c; margin-bottom: 8px; }
                            .ke-modal-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
                            .ke-modal-actions { display: flex; gap: 8px; justify-content: center; }
                        `}</style>
                        <div className="ke-modal-overlay" onClick={() => publishModal === 'confirm' && setPublishModal('idle')}>
                            <div className="ke-modal" onClick={e => e.stopPropagation()}>
                                {publishModal === 'confirm' && (
                                    <>
                                        <div className="ke-modal-icon">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                                        </div>
                                        <div className="ke-modal-title">Siteyi Yayınla</div>
                                        <div className="ke-modal-desc">Siteniz yayınlandığında tüm değişiklikler canlıya alınacak. Devam etmek istiyor musunuz?</div>
                                        <div className="ke-modal-actions">
                                            <button className="ke-btn ke-btn-outline" onClick={() => setPublishModal('idle')}>İptal</button>
                                            <button className="ke-btn ke-btn-publish" onClick={handlePublish}>Evet, Yayınla</button>
                                        </div>
                                    </>
                                )}
                                {publishModal === 'publishing' && (
                                    <>
                                        <div className="ke-modal-icon" style={{ animation: 'spin 2s linear infinite' }}>
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                        </div>
                                        <div className="ke-modal-title">Yayınlanıyor...</div>
                                        <div className="ke-modal-desc">Siteniz canlıya alınıyor, lütfen bekleyin.</div>
                                    </>
                                )}
                                {publishModal === 'success' && (
                                    <>
                                        <div className="ke-modal-icon">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        </div>
                                        <div className="ke-modal-title">Yayınlandı!</div>
                                        <div className="ke-modal-desc">Tebrikler! Siteniz başarıyla yayınlandı.</div>
                                        <div className="ke-modal-actions">
                                            <button className="ke-btn ke-btn-outline" onClick={() => setPublishModal('idle')}>Kapat</button>
                                            <button className="ke-btn ke-btn-publish" onClick={() => { const url = esnaf?.subdomainUrl || (esnaf?.slug ? `https://${esnaf.slug}.kepenk.ai` : '/'); window.open(url, '_blank') }}>Siteyi Gör</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
                {/* Upgrade Modal */}
                {upgradeModal && (
                    <>
                        <style>{`
                            .ke-upg-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: keFadeIn 0.15s; }
                            @keyframes keFadeIn { from { opacity: 0; } to { opacity: 1; } }
                            .ke-upg-modal { background: #fff; border-radius: 20px; padding: 0; max-width: 780px; width: 95%; box-shadow: 0 20px 60px rgba(0,0,0,0.2); animation: keModalIn 0.2s ease-out; overflow: hidden; }
                            .ke-upg-header { padding: 28px 32px 16px; text-align: center; }
                            .ke-upg-title { font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 6px; }
                            .ke-upg-sub { font-size: 13px; color: #64748b; }
                            .ke-upg-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 8px 24px 28px; }
                            @media (max-width: 700px) { .ke-upg-grid { grid-template-columns: repeat(2, 1fr); } }
                            .ke-upg-card { border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px 14px; text-align: center; transition: all 0.2s; position: relative; }
                            .ke-upg-card:hover { border-color: #93c5fd; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
                            .ke-upg-card.current { border-color: #22c55e; background: #f0fdf4; }
                            .ke-upg-card.recommended { border-color: #3b82f6; background: #eff6ff; }
                            .ke-upg-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 800; padding: 2px 10px; border-radius: 10px; white-space: nowrap; }
                            .ke-upg-badge.green { background: #22c55e; color: #fff; }
                            .ke-upg-badge.blue { background: #3b82f6; color: #fff; }
                            .ke-upg-plan { font-size: 15px; font-weight: 800; color: #0f172a; margin: 8px 0 4px; }
                            .ke-upg-price { font-size: 22px; font-weight: 900; color: #2563eb; margin-bottom: 4px; }
                            .ke-upg-price span { font-size: 12px; font-weight: 500; color: #94a3b8; }
                            .ke-upg-features { list-style: none; padding: 0; margin: 12px 0 0; text-align: left; }
                            .ke-upg-features li { font-size: 11px; color: #475569; padding: 3px 0; display: flex; gap: 5px; align-items: flex-start; line-height: 1.4; }
                            .ke-upg-features li::before { content: '✓'; color: #22c55e; font-weight: 800; flex-shrink: 0; }
                            .ke-upg-action { margin-top: 14px; }
                            .ke-upg-cta { display: block; width: 100%; padding: 8px 0; border-radius: 8px; font-size: 12px; font-weight: 700; border: none; cursor: pointer; font-family: inherit; transition: 0.15s; }
                            .ke-upg-cta.primary { background: #2563eb; color: #fff; }
                            .ke-upg-cta.primary:hover { background: #1d4ed8; }
                            .ke-upg-cta.outline { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
                            .ke-upg-cta.outline:hover { background: #f1f5f9; }
                            .ke-upg-cta.green { background: #22c55e; color: #fff; cursor: default; }
                            .ke-upg-footer { padding: 12px 32px 20px; text-align: center; }
                            .ke-upg-close { padding: 7px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1px solid #e2e8f0; background: #fff; color: #475569; font-family: inherit; transition: 0.15s; }
                            .ke-upg-close:hover { background: #f8fafc; }
                        `}</style>
                        <div className="ke-upg-overlay" onClick={() => setUpgradeModal(false)}>
                            <div className="ke-upg-modal" onClick={e => e.stopPropagation()}>
                                <div className="ke-upg-header">
                                    <div className="ke-upg-title">Paketinizi Yükseltin 🚀</div>
                                    <div className="ke-upg-sub">Daha fazla modül, özellik ve öncelikli destek ile işletmenizi büyütün.</div>
                                </div>
                                <div className="ke-upg-grid">
                                    {[
                                        { id: 'TEMEL', name: 'Temel', price: 'Ücretsiz', features: ['1 sayfa', 'Temel modüller', 'Kepenk alt alan adı', 'Topluluk desteği'] },
                                        { id: 'STANDART', name: 'Standart', price: '₺149', features: ['3 sayfa', '15+ modül', 'Özel alan adı', 'E-posta desteği', 'SEO araçları'] },
                                        { id: 'PREMIUM', name: 'Premium', price: '₺299', rec: true, features: ['10 sayfa', '30+ modül', 'Özel alan adı', 'Öncelikli destek', 'Google entegrasyonu', 'AI içerik üretimi'] },
                                        { id: 'PREMIUMPLUS', name: 'Premium+', price: '₺499', features: ['Sınırsız sayfa', 'Tüm modüller', 'Özel şablon', 'VIP destek', 'API erişimi', 'White-label'] },
                                    ].map(plan => {
                                        const isCurrent = (siteData as any)?.paket === plan.id
                                        return (
                                            <div key={plan.id} className={`ke-upg-card${isCurrent ? ' current' : ''}${plan.rec && !isCurrent ? ' recommended' : ''}`}>
                                                {isCurrent && <div className="ke-upg-badge green">Mevcut Plan</div>}
                                                {plan.rec && !isCurrent && <div className="ke-upg-badge blue">Önerilen</div>}
                                                <div className="ke-upg-plan">{plan.name}</div>
                                                <div className="ke-upg-price">{plan.price}{plan.price !== 'Ücretsiz' && <span>/ay</span>}</div>
                                                <ul className="ke-upg-features">
                                                    {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                                                </ul>
                                                <div className="ke-upg-action">
                                                    {isCurrent ? (
                                                        <button className="ke-upg-cta green">Aktif ✓</button>
                                                    ) : (
                                                        <button className={`ke-upg-cta ${plan.rec ? 'primary' : 'outline'}`} onClick={() => { window.open(`https://wa.me/905xxxxxxxxx?text=${encodeURIComponent(`Merhaba, ${plan.name} paketine yükseltmek istiyorum.`)}`, '_blank'); }}>
                                                            {plan.rec ? 'Hemen Yükselt' : 'Seç'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="ke-upg-footer">
                                    <button className="ke-upg-close" onClick={() => setUpgradeModal(false)}>Kapat</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}
