'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useEditorStore, type MediaItem } from '../../store/editor-store'
import UnsplashPanel from './UnsplashPanel'

/* ── Helpers ── */

/** Resize image client-side before upload (max 1200px) */
function resizeImage(file: File, maxWidth = 1200): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let w = img.width, h = img.height
                if (w > maxWidth) { h = (h * maxWidth) / w; w = maxWidth }
                canvas.width = w
                canvas.height = h
                const ctx = canvas.getContext('2d')!
                ctx.drawImage(img, 0, 0, w, h)
                resolve(canvas.toDataURL('image/jpeg', 0.85))
            }
            img.onerror = reject
            img.src = reader.result as string
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

const FOLDERS = [
    { id: 'all', label: 'Tümü' },
    { id: 'hero', label: 'Hero' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'urunler', label: 'Ürünler' },
    { id: 'logo', label: 'Logo' },
    { id: 'genel', label: 'Genel' },
]

/**
 * MediaLibraryPanel — Two tabs: "Unsplash" (delegates to UnsplashPanel)
 * and "Kütüphanem" (My Library with upload, folders, AI alt text).
 */
export default function MediaLibraryPanel() {
    const [activeTab, setActiveTab] = useState<'unsplash' | 'library'>('unsplash')

    return (
        <>
            <style>{`
                .ke-ml-tabs {
                    display: flex; border-bottom: 1px solid #e2e8f0;
                    background: #fafbfc;
                }
                .ke-ml-tab {
                    flex: 1; padding: 10px 0; text-align: center;
                    font-size: 12px; font-weight: 700; color: #64748b;
                    cursor: pointer; border: none; background: none;
                    font-family: inherit; transition: 0.15s;
                    border-bottom: 2px solid transparent;
                }
                .ke-ml-tab:hover { color: #334155; background: #f1f5f9; }
                .ke-ml-tab.active {
                    color: #2563eb; border-bottom-color: #2563eb;
                    background: #fff;
                }
                .ke-ml-body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }

                /* Library specific */
                .ke-ml-upload-zone {
                    margin: 12px; padding: 24px; border: 2px dashed #cbd5e1;
                    border-radius: 12px; text-align: center; cursor: pointer;
                    transition: 0.15s; background: #fafbfc;
                }
                .ke-ml-upload-zone:hover { border-color: #93c5fd; background: #eff6ff; }
                .ke-ml-upload-zone.dragover { border-color: #3b82f6; background: #dbeafe; }
                .ke-ml-upload-icon { color: #94a3b8; margin-bottom: 6px; }
                .ke-ml-upload-text { font-size: 12px; font-weight: 700; color: #475569; }
                .ke-ml-upload-hint { font-size: 10px; color: #94a3b8; margin-top: 2px; }

                .ke-ml-folders {
                    display: flex; gap: 4px; padding: 0 12px 8px;
                    overflow-x: auto; flex-shrink: 0;
                }
                .ke-ml-folder-btn {
                    padding: 5px 12px; border: 1px solid #e2e8f0;
                    border-radius: 6px; font-size: 10px; font-weight: 700;
                    background: #fff; color: #64748b; cursor: pointer;
                    font-family: inherit; transition: 0.15s; white-space: nowrap;
                }
                .ke-ml-folder-btn:hover { border-color: #93c5fd; color: #2563eb; }
                .ke-ml-folder-btn.active { border-color: #3b82f6; background: #dbeafe; color: #1e40af; }

                .ke-ml-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 6px; padding: 0 12px 12px; flex: 1; overflow-y: auto;
                }
                .ke-ml-item {
                    aspect-ratio: 1; border-radius: 8px; overflow: hidden;
                    cursor: pointer; position: relative; background: #f1f5f9;
                    border: 2px solid transparent; transition: 0.15s;
                }
                .ke-ml-item:hover { border-color: #3b82f6; }
                .ke-ml-item img {
                    width: 100%; height: 100%; object-fit: cover; display: block;
                }
                .ke-ml-item-overlay {
                    position: absolute; inset: 0;
                    background: rgba(0,0,0,0.5); opacity: 0;
                    transition: 0.15s; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; gap: 4px;
                    padding: 6px;
                }
                .ke-ml-item:hover .ke-ml-item-overlay { opacity: 1; }
                .ke-ml-item-btn {
                    padding: 4px 10px; background: #fff; color: #0f172a;
                    border: none; border-radius: 5px; font-size: 9px;
                    font-weight: 700; cursor: pointer; font-family: inherit;
                    width: 100%; text-align: center;
                }
                .ke-ml-item-btn:hover { background: #f1f5f9; }
                .ke-ml-item-btn.danger { background: #fef2f2; color: #dc2626; }
                .ke-ml-item-btn.danger:hover { background: #fee2e2; }

                .ke-ml-empty {
                    text-align: center; padding: 32px 20px; color: #94a3b8;
                    grid-column: 1 / -1;
                }
                .ke-ml-empty-text { font-size: 12px; font-weight: 600; color: #475569; }
                .ke-ml-empty-desc { font-size: 10px; margin-top: 4px; }

                .ke-ml-loading {
                    aspect-ratio: 1; border-radius: 8px;
                    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
                    background-size: 200% 100%;
                    animation: keShimmer 1.5s ease-in-out infinite;
                }
                @keyframes keShimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

                .ke-ml-uploading {
                    padding: 8px 12px; margin: 0 12px 8px;
                    background: #eff6ff; border: 1px solid #bfdbfe;
                    border-radius: 8px; font-size: 11px; font-weight: 600;
                    color: #2563eb; display: flex; align-items: center; gap: 8px;
                }
                .ke-ml-spinner {
                    width: 14px; height: 14px; border: 2px solid #bfdbfe;
                    border-top-color: #2563eb; border-radius: 50%;
                    animation: keSpin 0.6s linear infinite;
                }
                @keyframes keSpin { to { transform: rotate(360deg); } }

                .ke-ml-storage {
                    padding: 8px 12px; margin: 8px 12px;
                    background: #f8fafc; border: 1px solid #e2e8f0;
                    border-radius: 8px; font-size: 10px; color: #64748b;
                    display: flex; align-items: center; gap: 8px;
                }
                .ke-ml-storage-bar {
                    flex: 1; height: 4px; background: #e2e8f0;
                    border-radius: 2px; overflow: hidden;
                }
                .ke-ml-storage-fill {
                    height: 100%; background: #3b82f6; border-radius: 2px;
                    transition: width 0.3s;
                }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Tab bar */}
                <div className="ke-ml-tabs">
                    <button
                        className={`ke-ml-tab${activeTab === 'unsplash' ? ' active' : ''}`}
                        onClick={() => setActiveTab('unsplash')}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: -2, marginRight: 4 }}>
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        Unsplash
                    </button>
                    <button
                        className={`ke-ml-tab${activeTab === 'library' ? ' active' : ''}`}
                        onClick={() => setActiveTab('library')}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: -2, marginRight: 4 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                        </svg>
                        Kütüphanem
                    </button>
                </div>

                <div className="ke-ml-body">
                    {activeTab === 'unsplash' ? <UnsplashPanel /> : <MyLibrary />}
                </div>
            </div>
        </>
    )
}

/* ═══════ My Library Tab ═══════ */
function MyLibrary() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const mediaLibrary = useEditorStore(s => s.mediaLibrary)
    const setMediaLibrary = useEditorStore(s => s.setMediaLibrary)
    const addMediaItem = useEditorStore(s => s.addMediaItem)
    const removeMediaItem = useEditorStore(s => s.removeMediaItem)

    const [activeFolder, setActiveFolder] = useState('all')
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [generatingAlt, setGeneratingAlt] = useState<string | null>(null)
    const [dragover, setDragover] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Get esnafId from localStorage
    const esnafId = typeof window !== 'undefined' ? localStorage.getItem('esnaf_id') || '' : ''

    // Load media on first render
    useEffect(() => {
        if (loaded || !esnafId) return
        setLoading(true)
        fetch(`/api/media/upload?esnafId=${esnafId}`)
            .then(r => r.json())
            .then(data => {
                if (data.items) setMediaLibrary(data.items)
            })
            .catch(() => {})
            .finally(() => { setLoading(false); setLoaded(true) })
    }, [esnafId, loaded, setMediaLibrary])

    const filteredItems = activeFolder === 'all'
        ? mediaLibrary
        : mediaLibrary.filter(m => m.folder === activeFolder)

    const handleUpload = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0 || !esnafId) return
        setUploading(true)
        try {
            for (const file of Array.from(files)) {
                if (!file.type.startsWith('image/')) continue
                const base64 = await resizeImage(file)
                const res = await fetch('/api/media/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imageBase64: base64,
                        fileName: file.name,
                        folder: activeFolder === 'all' ? 'genel' : activeFolder,
                        esnafId,
                    }),
                })
                const data = await res.json()
                if (data.id) {
                    addMediaItem({
                        id: data.id,
                        url: data.url,
                        alt: data.alt || '',
                        folder: data.folder,
                        fileName: data.fileName,
                        createdAt: data.createdAt,
                    })
                }
            }
        } catch (err) {
            console.error('Upload error:', err)
        } finally {
            setUploading(false)
        }
    }, [esnafId, activeFolder, addMediaItem])

    const handleDelete = useCallback(async (item: MediaItem) => {
        if (!esnafId) return
        removeMediaItem(item.id)
        try {
            await fetch('/api/media/upload', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, mediaId: item.id }),
            })
        } catch {}
    }, [esnafId, removeMediaItem])

    const handleUseAsHero = useCallback((url: string) => {
        updateSiteData({ unsplash: url })
    }, [updateSiteData])

    const handleGenerateAlt = useCallback(async (item: MediaItem) => {
        setGeneratingAlt(item.id)
        try {
            const res = await fetch('/api/media/ai-alt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: item.url }),
            })
            const data = await res.json()
            if (data.alt) {
                // Update in store
                const updated = mediaLibrary.map(m =>
                    m.id === item.id ? { ...m, alt: data.alt } : m
                )
                setMediaLibrary(updated)
            }
        } catch {}
        finally { setGeneratingAlt(null) }
    }, [mediaLibrary, setMediaLibrary])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragover(false)
        handleUpload(e.dataTransfer.files)
    }, [handleUpload])

    // Storage indicator
    const storageUsed = mediaLibrary.reduce((sum, m) => sum + (m.url?.length || 0), 0)
    const storageMax = 50_000_000 // ~50MB
    const storagePercent = Math.min((storageUsed / storageMax) * 100, 100)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Upload Zone */}
            <div
                className={`ke-ml-upload-zone${dragover ? ' dragover' : ''}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragover(true) }}
                onDragLeave={() => setDragover(false)}
                onDrop={handleDrop}
            >
                <div className="ke-ml-upload-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                </div>
                <div className="ke-ml-upload-text">Görsel Yükle</div>
                <div className="ke-ml-upload-hint">Sürükle & bırak veya tıkla (max 2MB)</div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={e => handleUpload(e.target.files)}
                />
            </div>

            {/* Uploading indicator */}
            {uploading && (
                <div className="ke-ml-uploading">
                    <div className="ke-ml-spinner" />
                    Yükleniyor...
                </div>
            )}

            {/* Folders */}
            <div className="ke-ml-folders">
                {FOLDERS.map(f => (
                    <button
                        key={f.id}
                        className={`ke-ml-folder-btn${activeFolder === f.id ? ' active' : ''}`}
                        onClick={() => setActiveFolder(f.id)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="ke-ml-grid">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <div key={i} className="ke-ml-loading" />)
                ) : filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div key={item.id} className="ke-ml-item">
                            <img
                                src={item.url}
                                alt={item.alt || item.fileName}
                                loading="lazy"
                            />
                            <div className="ke-ml-item-overlay">
                                <button
                                    className="ke-ml-item-btn"
                                    onClick={e => { e.stopPropagation(); handleUseAsHero(item.url) }}
                                >
                                    Kullan
                                </button>
                                <button
                                    className="ke-ml-item-btn"
                                    onClick={e => { e.stopPropagation(); handleGenerateAlt(item) }}
                                    disabled={generatingAlt === item.id}
                                >
                                    {generatingAlt === item.id ? 'AI...' : 'AI Alt Metin'}
                                </button>
                                <button
                                    className="ke-ml-item-btn danger"
                                    onClick={e => { e.stopPropagation(); handleDelete(item) }}
                                >
                                    Sil
                                </button>
                            </div>
                            {item.alt && (
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    padding: '2px 4px', background: 'rgba(0,0,0,0.6)',
                                    fontSize: 8, color: '#fff', lineHeight: 1.2,
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                }}>
                                    {item.alt}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="ke-ml-empty">
                        <div className="ke-ml-empty-text">
                            {loaded ? 'Henüz görsel yok' : 'Yükleniyor...'}
                        </div>
                        <div className="ke-ml-empty-desc">
                            {loaded && 'Yukarıdan görsel yükleyerek başlayın'}
                        </div>
                    </div>
                )}
            </div>

            {/* Storage indicator */}
            {mediaLibrary.length > 0 && (
                <div className="ke-ml-storage">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12H2M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
                    </svg>
                    <div className="ke-ml-storage-bar">
                        <div className="ke-ml-storage-fill" style={{ width: `${storagePercent}%` }} />
                    </div>
                    <span>{mediaLibrary.length} görsel</span>
                </div>
            )}
        </div>
    )
}
