'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useEditorStore } from '../store/editor-store'

/**
 * ImageEditOverlay — Kepenk floating image editor.
 * Appears when clicking an image in the iframe preview.
 * Features: mini Unsplash search, URL input, file upload.
 */
export default function ImageEditOverlay() {
    const imageEdit = useEditorStore(s => s.imageEdit)
    const closeImageEdit = useEditorStore(s => s.closeImageEdit)
    const applyImageEdit = useEditorStore(s => s.applyImageEdit)
    const [urlInput, setUrlInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Array<{ id: string; urls: { small: string; regular: string }; alt_description: string | null; user: { name: string } }>>([])
    const [searching, setSearching] = useState(false)
    const [mode, setMode] = useState<'main' | 'search' | 'url'>('main')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

    // Reset state when opened
    useEffect(() => {
        if (imageEdit) {
            setMode('main')
            setSearchQuery('')
            setSearchResults([])
            setUrlInput('')
        }
    }, [imageEdit])

    // Keep in viewport
    useEffect(() => {
        if (!panelRef.current || !imageEdit) return
        const el = panelRef.current
        const rect = el.getBoundingClientRect()
        if (rect.right > window.innerWidth - 20) {
            el.style.left = `${Math.max(20, window.innerWidth - rect.width - 20)}px`
        }
        if (rect.bottom > window.innerHeight - 20) {
            el.style.top = `${Math.max(20, window.innerHeight - rect.height - 20)}px`
        }
    }, [imageEdit, mode, searchResults])

    if (!imageEdit) return null

    const sendToIframe = (newSrc: string) => {
        applyImageEdit(newSrc)
        const iframe = document.querySelector('iframe') as HTMLIFrameElement
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'ke-replace-image',
                oldSrc: imageEdit.src,
                newSrc,
                field: imageEdit.field,
            }, '*')
        }
    }

    const handleUnsplashSearch = async () => {
        if (!searchQuery.trim()) return
        setSearching(true)
        try {
            const res = await fetch(`/api/unsplash?query=${encodeURIComponent(searchQuery)}&count=9&orientation=landscape`)
            const data = await res.json()
            setSearchResults(data.photos || [])
        } catch { setSearchResults([]) }
        finally { setSearching(false) }
    }

    const panelX = Math.min(Math.max(20, imageEdit.x), window.innerWidth - 380)
    const panelY = Math.min(Math.max(20, imageEdit.y), window.innerHeight - 500)

    return (
        <>
            <style>{`
                .ke-io-backdrop { position:fixed; inset:0; z-index:99998; background:rgba(0,0,0,0.15); backdrop-filter:blur(2px); }
                .ke-io {
                    position:fixed; z-index:99999; width:360px;
                    background:#fff; border:1px solid #e2e8f0;
                    border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.06);
                    font-family:'Inter',system-ui,sans-serif;
                    animation:keIoIn 0.18s cubic-bezier(0.2,0,0,1);
                    overflow:hidden;
                }
                @keyframes keIoIn { from{opacity:0;transform:translateY(-6px) scale(0.97)} to{opacity:1;transform:none} }

                /* Header */
                .ke-io-head {
                    display:flex; align-items:center; justify-content:space-between;
                    padding:14px 16px; border-bottom:1px solid #f1f5f9;
                    background:linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
                }
                .ke-io-title { font-size:13px; font-weight:800; color:#92400e; display:flex; align-items:center; gap:7px; }
                .ke-io-close {
                    width:28px; height:28px; border:none; background:rgba(0,0,0,0.06);
                    cursor:pointer; border-radius:8px; display:flex;
                    align-items:center; justify-content:center; color:#78716c; transition:0.15s;
                }
                .ke-io-close:hover { background:rgba(0,0,0,0.1); color:#44403c; }

                /* Current Image */
                .ke-io-preview { padding:12px 16px; border-bottom:1px solid #f1f5f9; }
                .ke-io-thumb {
                    width:100%; height:90px; object-fit:cover; border-radius:10px;
                    background:#f5f5f4; display:block;
                }

                /* Body */
                .ke-io-body { padding:12px 16px 16px; }

                /* Action Buttons (main mode) */
                .ke-io-actions { display:flex; flex-direction:column; gap:5px; }
                .ke-io-action {
                    display:flex; align-items:center; gap:10px;
                    padding:11px 14px; border:1px solid #e2e8f0; border-radius:11px;
                    background:#fff; cursor:pointer; transition:all 0.15s;
                    font-family:inherit; font-size:13px; font-weight:600;
                    color:#334155; text-align:left;
                }
                .ke-io-action:hover { border-color:#93c5fd; background:#f0f7ff; color:#1e40af; }
                .ke-io-action-icon {
                    width:34px; height:34px; border-radius:9px; display:flex;
                    align-items:center; justify-content:center; flex-shrink:0;
                }
                .ke-io-action-icon.purple { background:#f5f3ff; color:#7c3aed; }
                .ke-io-action-icon.blue { background:#eff6ff; color:#2563eb; }
                .ke-io-action-icon.emerald { background:#ecfdf5; color:#059669; }
                .ke-io-action-desc { font-size:10px; color:#94a3b8; font-weight:500; margin-top:1px; }

                /* Search mode */
                .ke-io-search-row { display:flex; gap:6px; margin-bottom:10px; }
                .ke-io-input {
                    flex:1; padding:9px 12px; border:1px solid #e2e8f0; border-radius:10px;
                    font-size:12px; font-family:inherit; outline:none; background:#f8fafc; box-sizing:border-box;
                }
                .ke-io-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.08); background:#fff; }
                .ke-io-search-btn {
                    padding:9px 16px; background:#2563eb; color:#fff; border:none;
                    border-radius:10px; font-size:12px; font-weight:700; cursor:pointer;
                    font-family:inherit; white-space:nowrap;
                }
                .ke-io-search-btn:hover { background:#1d4ed8; }

                /* Results grid */
                .ke-io-grid {
                    display:grid; grid-template-columns:repeat(3,1fr); gap:5px;
                    max-height:220px; overflow-y:auto; margin-bottom:10px;
                }
                .ke-io-grid-item {
                    aspect-ratio:1; border-radius:9px; overflow:hidden;
                    cursor:pointer; background:#f1f5f9; border:2px solid transparent;
                    transition:0.12s; position:relative;
                }
                .ke-io-grid-item:hover { border-color:#3b82f6; transform:scale(1.03); }
                .ke-io-grid-item img { width:100%; height:100%; object-fit:cover; display:block; }
                .ke-io-grid-item::after {
                    content:''; position:absolute; inset:0;
                    background:linear-gradient(transparent 60%, rgba(0,0,0,0.3));
                    opacity:0; transition:0.15s; pointer-events:none;
                }
                .ke-io-grid-item:hover::after { opacity:1; }

                /* Back button */
                .ke-io-back {
                    display:flex; align-items:center; gap:5px;
                    padding:7px 12px; background:#f1f5f9; border:none; border-radius:8px;
                    font-size:11px; font-weight:700; color:#64748b; cursor:pointer;
                    font-family:inherit; transition:0.15s;
                }
                .ke-io-back:hover { background:#e2e8f0; color:#334155; }

                .ke-io-empty { text-align:center; padding:24px; color:#94a3b8; font-size:12px; }

                .ke-io-skel {
                    aspect-ratio:1; border-radius:9px;
                    background:linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
                    background-size:200% 100%;
                    animation:keShim 1.5s ease-in-out infinite;
                }
                @keyframes keShim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
            `}</style>

            <div className="ke-io-backdrop" onClick={closeImageEdit} />
            <div ref={panelRef} className="ke-io" style={{ left: panelX, top: panelY }}>
                {/* Header */}
                <div className="ke-io-head">
                    <span className="ke-io-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
                        </svg>
                        Görsel Değiştir
                    </span>
                    <button className="ke-io-close" onClick={closeImageEdit}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                {/* Current preview */}
                {imageEdit.src && mode === 'main' && (
                    <div className="ke-io-preview">
                        <img className="ke-io-thumb" src={imageEdit.src} alt={imageEdit.alt || ''} />
                    </div>
                )}

                {/* Body */}
                <div className="ke-io-body">
                    {mode === 'main' && (
                        <div className="ke-io-actions">
                            <button className="ke-io-action" onClick={() => setMode('search')}>
                                <div className="ke-io-action-icon purple">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                </div>
                                <div>
                                    Unsplash&apos;tan Arama
                                    <div className="ke-io-action-desc">Yüksek kaliteli ücretsiz görseller</div>
                                </div>
                            </button>
                            <button className="ke-io-action" onClick={() => setMode('url')}>
                                <div className="ke-io-action-icon blue">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                                </div>
                                <div>
                                    URL ile Değiştir
                                    <div className="ke-io-action-desc">Harici görsel bağlantısı yapıştır</div>
                                </div>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    const url = URL.createObjectURL(file)
                                    sendToIframe(url)
                                }}
                            />
                            <button className="ke-io-action" onClick={() => fileInputRef.current?.click()}>
                                <div className="ke-io-action-icon emerald">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                </div>
                                <div>
                                    Bilgisayardan Yükle
                                    <div className="ke-io-action-desc">JPG, PNG, WebP dosyası seç</div>
                                </div>
                            </button>
                        </div>
                    )}

                    {mode === 'search' && (
                        <>
                            <div className="ke-io-search-row">
                                <input
                                    className="ke-io-input"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="modern mimari, mağaza..."
                                    onKeyDown={e => { if (e.key === 'Enter') handleUnsplashSearch() }}
                                    autoFocus
                                />
                                <button className="ke-io-search-btn" onClick={handleUnsplashSearch}>
                                    {searching ? '...' : 'Ara'}
                                </button>
                            </div>

                            {searching ? (
                                <div className="ke-io-grid">
                                    {Array.from({ length: 6 }).map((_, i) => <div key={i} className="ke-io-skel" />)}
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="ke-io-grid">
                                    {searchResults.map(photo => (
                                        <div key={photo.id} className="ke-io-grid-item" onClick={() => sendToIframe(photo.urls.regular)} title={`Photo by ${photo.user.name}`}>
                                            <img src={photo.urls.small} alt={photo.alt_description || ''} loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            ) : searchQuery ? (
                                <div className="ke-io-empty">Aramak için Enter&apos;a basın</div>
                            ) : null}

                            <button className="ke-io-back" onClick={() => { setMode('main'); setSearchResults([]); setSearchQuery('') }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                                Geri
                            </button>
                        </>
                    )}

                    {mode === 'url' && (
                        <>
                            <div className="ke-io-search-row">
                                <input
                                    className="ke-io-input"
                                    value={urlInput}
                                    onChange={e => setUrlInput(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    autoFocus
                                    onKeyDown={e => { if (e.key === 'Enter' && urlInput.trim()) sendToIframe(urlInput.trim()) }}
                                />
                                <button className="ke-io-search-btn" onClick={() => { if (urlInput.trim()) sendToIframe(urlInput.trim()) }}>
                                    Uygula
                                </button>
                            </div>
                            <button className="ke-io-back" onClick={() => { setMode('main'); setUrlInput('') }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                                Geri
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
