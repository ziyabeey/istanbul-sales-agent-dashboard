'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useEditorStore } from '../../store/editor-store'
import { FONT_CATALOG, FONT_PAIRS, FONT_CATEGORIES, buildGoogleFontsUrl } from '../../data/fontCatalog'

/* ── FontExplorerPanel ────────────────────────────────────────────────────
   Font browser panel for the editor LeftBar (280px wide).
   Provides category filtering, search, font pair suggestions,
   and a lazy-loaded scrollable font list.
──────────────────────────────────────────────────────────────────────── */

export default function FontExplorerPanel() {
    /* ── Store ── */
    const siteData = useEditorStore(s => s.siteData)
    const updateFontSettings = useEditorStore(s => s.updateFontSettings)

    /* ── Current font values ── */
    const currentHeading = siteData?.fontSettings?.heading || siteData?.font || 'Inter'
    const currentBody = siteData?.fontSettings?.body || 'Inter'
    const currentHeadingWeight = siteData?.fontSettings?.headingWeight || 700
    const currentBodyWeight = siteData?.fontSettings?.bodyWeight || 400

    /* ── Local state ── */
    const [activeCategory, setActiveCategory] = useState('all')
    const [search, setSearch] = useState('')
    const [pairsOpen, setPairsOpen] = useState(true)

    /* ── Lazy font loading ── */
    const loadedFontsRef = useRef<Set<string>>(new Set())
    const listRef = useRef<HTMLDivElement>(null)

    const ensureFontLoaded = useCallback((family: string) => {
        if (loadedFontsRef.current.has(family)) return
        loadedFontsRef.current.add(family)
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = buildGoogleFontsUrl([family])
        document.head.appendChild(link)
    }, [])

    /* Load current heading/body fonts immediately */
    useEffect(() => {
        ensureFontLoaded(currentHeading)
        ensureFontLoaded(currentBody)
    }, [currentHeading, currentBody, ensureFontLoaded])

    /* ── Filtered font list ── */
    const filteredFonts = useMemo(() => {
        let list = FONT_CATALOG
        if (activeCategory !== 'all') {
            list = list.filter(f => f.category === activeCategory)
        }
        if (search.trim()) {
            const q = search.trim().toLowerCase()
            list = list.filter(f => f.family.toLowerCase().includes(q))
        }
        return list.sort((a, b) => b.popularity - a.popularity)
    }, [activeCategory, search])

    /* ── Active pair detection ── */
    const activePairId = useMemo(() => {
        const pair = FONT_PAIRS.find(
            p => p.heading === currentHeading && p.body === currentBody
        )
        return pair?.id ?? null
    }, [currentHeading, currentBody])

    /* ── Font row component with IntersectionObserver ── */
    const FontRow = useCallback(({ font }: { font: typeof FONT_CATALOG[number] }) => {
        const rowRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const el = rowRef.current
            if (!el) return
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    ensureFontLoaded(font.family)
                    obs.disconnect()
                }
            }, { rootMargin: '80px', root: listRef.current })
            obs.observe(el)
            return () => obs.disconnect()
        }, [font.family])

        const isHeading = currentHeading === font.family
        const isBody = currentBody === font.family

        return (
            <div ref={rowRef} className="ke-fp-row">
                <div className="ke-fp-row-left">
                    <span
                        className="ke-fp-row-preview"
                        style={{ fontFamily: `'${font.family}', sans-serif` }}
                    >
                        Aa
                    </span>
                    <span
                        className="ke-fp-row-name"
                        style={{ fontFamily: `'${font.family}', sans-serif` }}
                    >
                        {font.family}
                    </span>
                </div>
                <div className="ke-fp-row-actions">
                    {isHeading && <span className="ke-fp-dot ke-fp-dot-active" />}
                    <button
                        className={`ke-fp-action-btn ${isHeading ? 'ke-fp-action-btn-active' : ''}`}
                        title="Baslik fontu olarak ayarla"
                        onClick={() => updateFontSettings({ heading: font.family })}
                    >
                        B
                    </button>
                    {isBody && <span className="ke-fp-dot ke-fp-dot-active" />}
                    <button
                        className={`ke-fp-action-btn ${isBody ? 'ke-fp-action-btn-active' : ''}`}
                        title="Govde fontu olarak ayarla"
                        onClick={() => updateFontSettings({ body: font.family })}
                    >
                        G
                    </button>
                </div>
            </div>
        )
    }, [currentHeading, currentBody, ensureFontLoaded, updateFontSettings])

    /* ── Heading font weight options ── */
    const headingFontItem = FONT_CATALOG.find(f => f.family === currentHeading)
    const bodyFontItem = FONT_CATALOG.find(f => f.family === currentBody)

    return (
        <>
            <style>{`
                .ke-fp-root {
                    display: flex; flex-direction: column; height: 100%;
                    font-family: 'Inter', -apple-system, sans-serif;
                }

                /* ── Category tabs ── */
                .ke-fp-cats {
                    display: flex; flex-wrap: wrap; gap: 4px;
                    padding: 12px 12px 8px;
                }
                .ke-fp-cat {
                    padding: 4px 10px; border: none; border-radius: 20px;
                    font-size: 11px; font-weight: 600; cursor: pointer;
                    font-family: inherit; transition: 0.15s;
                    background: #f1f5f9; color: #64748b;
                }
                .ke-fp-cat:hover { background: #e2e8f0; color: #475569; }
                .ke-fp-cat-active { background: #3b82f6; color: #fff; }
                .ke-fp-cat-active:hover { background: #2563eb; color: #fff; }

                /* ── Search ── */
                .ke-fp-search {
                    padding: 0 12px 10px;
                }
                .ke-fp-input {
                    width: 100%; padding: 8px 10px; border: 1px solid #e2e8f0;
                    border-radius: 8px; font-size: 12px; font-family: inherit;
                    outline: none; background: #f8fafc; box-sizing: border-box;
                }
                .ke-fp-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59,130,246,0.08);
                }

                /* ── Current selection ── */
                .ke-fp-current {
                    padding: 10px 12px; border-bottom: 1px solid #f1f5f9;
                    background: #f8fafc;
                }
                .ke-fp-current-label {
                    font-size: 10px; font-weight: 800; color: #94a3b8;
                    text-transform: uppercase; letter-spacing: 0.06em;
                    margin-bottom: 8px;
                }
                .ke-fp-current-row {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-bottom: 6px;
                }
                .ke-fp-current-row:last-child { margin-bottom: 0; }
                .ke-fp-current-type {
                    font-size: 10px; color: #94a3b8; font-weight: 600;
                    min-width: 40px; flex-shrink: 0;
                }
                .ke-fp-current-name {
                    font-size: 12px; color: #0f172a; font-weight: 600;
                    flex: 1; overflow: hidden; text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .ke-fp-weight-select {
                    padding: 2px 4px; border: 1px solid #e2e8f0;
                    border-radius: 4px; font-size: 10px; font-family: inherit;
                    background: #fff; color: #64748b; cursor: pointer;
                    outline: none; margin-left: 6px;
                }
                .ke-fp-weight-select:focus {
                    border-color: #3b82f6;
                }

                /* ── Pairs section ── */
                .ke-fp-pairs-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 10px 12px 6px; cursor: pointer; user-select: none;
                }
                .ke-fp-pairs-title {
                    font-size: 11px; font-weight: 800; color: #0f172a;
                }
                .ke-fp-pairs-toggle {
                    font-size: 14px; color: #94a3b8; line-height: 1;
                    transition: transform 0.2s;
                }
                .ke-fp-pairs-toggle-open { transform: rotate(0deg); }
                .ke-fp-pairs-toggle-closed { transform: rotate(-90deg); }
                .ke-fp-pairs-list {
                    padding: 0 12px 8px; max-height: 240px; overflow-y: auto;
                }
                .ke-fp-pair-card {
                    padding: 12px; border-radius: 10px;
                    border: 1px solid #e2e8f0; cursor: pointer;
                    margin-bottom: 8px; transition: 0.15s;
                    background: #fff;
                }
                .ke-fp-pair-card:hover { border-color: #93c5fd; background: #f8fafc; }
                .ke-fp-pair-card:last-child { margin-bottom: 0; }
                .ke-fp-pair-card-active {
                    border-color: #3b82f6; background: #eff6ff;
                    box-shadow: 0 0 0 1px rgba(59,130,246,0.15);
                }
                .ke-fp-pair-heading {
                    font-size: 14px; font-weight: 700; color: #0f172a;
                    margin-bottom: 2px; line-height: 1.3;
                }
                .ke-fp-pair-body {
                    font-size: 11px; color: #64748b; margin-bottom: 4px;
                    line-height: 1.3;
                }
                .ke-fp-pair-mood {
                    font-size: 9px; font-weight: 700; color: #94a3b8;
                    text-transform: uppercase; letter-spacing: 0.05em;
                }

                /* ── Font list ── */
                .ke-fp-list-label {
                    font-size: 10px; font-weight: 800; color: #94a3b8;
                    text-transform: uppercase; letter-spacing: 0.06em;
                    padding: 8px 12px 4px;
                }
                .ke-fp-list {
                    flex: 1; overflow-y: auto; padding: 0 4px;
                }
                .ke-fp-row {
                    padding: 10px 12px; border-radius: 8px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background 0.1s;
                }
                .ke-fp-row:hover { background: #f8fafc; }
                .ke-fp-row-left {
                    display: flex; align-items: center; gap: 8px;
                    flex: 1; min-width: 0; overflow: hidden;
                }
                .ke-fp-row-preview {
                    font-size: 16px; font-weight: 500; color: #94a3b8;
                    flex-shrink: 0; width: 28px;
                }
                .ke-fp-row-name {
                    font-size: 13px; color: #0f172a; font-weight: 500;
                    overflow: hidden; text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .ke-fp-row-actions {
                    display: flex; align-items: center; gap: 3px;
                    flex-shrink: 0;
                }
                .ke-fp-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: transparent; flex-shrink: 0;
                }
                .ke-fp-dot-active { background: #3b82f6; }
                .ke-fp-action-btn {
                    width: 24px; height: 24px; border: 1px solid #e2e8f0;
                    border-radius: 5px; font-size: 10px; font-weight: 800;
                    background: #fff; color: #64748b; cursor: pointer;
                    font-family: inherit; display: flex; align-items: center;
                    justify-content: center; transition: 0.15s; padding: 0;
                }
                .ke-fp-action-btn:hover {
                    border-color: #3b82f6; color: #3b82f6; background: #eff6ff;
                }
                .ke-fp-action-btn-active {
                    border-color: #3b82f6; color: #fff; background: #3b82f6;
                }
                .ke-fp-action-btn-active:hover {
                    background: #2563eb; border-color: #2563eb; color: #fff;
                }

                /* ── Empty state ── */
                .ke-fp-empty {
                    padding: 24px 12px; text-align: center;
                    color: #94a3b8; font-size: 12px;
                }

                /* ── Scrollbar ── */
                .ke-fp-list::-webkit-scrollbar,
                .ke-fp-pairs-list::-webkit-scrollbar { width: 4px; }
                .ke-fp-list::-webkit-scrollbar-track,
                .ke-fp-pairs-list::-webkit-scrollbar-track { background: transparent; }
                .ke-fp-list::-webkit-scrollbar-thumb,
                .ke-fp-pairs-list::-webkit-scrollbar-thumb {
                    background: #cbd5e1; border-radius: 4px;
                }
            `}</style>

            <div className="ke-fp-root">
                {/* ── Category filter tabs ── */}
                <div className="ke-fp-cats">
                    {FONT_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`ke-fp-cat ${activeCategory === cat.id ? 'ke-fp-cat-active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* ── Search input ── */}
                <div className="ke-fp-search">
                    <input
                        className="ke-fp-input"
                        type="text"
                        placeholder="Font ara..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* ── Current selection ── */}
                <div className="ke-fp-current">
                    <div className="ke-fp-current-label">Secili Fontlar</div>
                    <div className="ke-fp-current-row">
                        <span className="ke-fp-current-type">Baslik:</span>
                        <span
                            className="ke-fp-current-name"
                            style={{ fontFamily: `'${currentHeading}', sans-serif` }}
                        >
                            {currentHeading}
                        </span>
                        <select
                            className="ke-fp-weight-select"
                            value={currentHeadingWeight}
                            onChange={e => updateFontSettings({ headingWeight: Number(e.target.value) })}
                        >
                            {(headingFontItem?.weights ?? [700]).map(w => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </div>
                    <div className="ke-fp-current-row">
                        <span className="ke-fp-current-type">Govde:</span>
                        <span
                            className="ke-fp-current-name"
                            style={{ fontFamily: `'${currentBody}', sans-serif` }}
                        >
                            {currentBody}
                        </span>
                        <select
                            className="ke-fp-weight-select"
                            value={currentBodyWeight}
                            onChange={e => updateFontSettings({ bodyWeight: Number(e.target.value) })}
                        >
                            {(bodyFontItem?.weights ?? [400]).map(w => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ── Font Pairs ── */}
                <div
                    className="ke-fp-pairs-header"
                    onClick={() => setPairsOpen(v => !v)}
                >
                    <span className="ke-fp-pairs-title">Onerilen Ciftler</span>
                    <span className={`ke-fp-pairs-toggle ${pairsOpen ? 'ke-fp-pairs-toggle-open' : 'ke-fp-pairs-toggle-closed'}`}>
                        &#9662;
                    </span>
                </div>

                {pairsOpen && (
                    <div className="ke-fp-pairs-list">
                        {FONT_PAIRS.map(pair => {
                            const isActive = activePairId === pair.id
                            return (
                                <div
                                    key={pair.id}
                                    className={`ke-fp-pair-card ${isActive ? 'ke-fp-pair-card-active' : ''}`}
                                    onClick={() => {
                                        ensureFontLoaded(pair.heading)
                                        ensureFontLoaded(pair.body)
                                        updateFontSettings({
                                            heading: pair.heading,
                                            body: pair.body,
                                            headingWeight: 700,
                                            bodyWeight: 400,
                                        })
                                    }}
                                >
                                    <div
                                        className="ke-fp-pair-heading"
                                        style={{ fontFamily: `'${pair.heading}', sans-serif` }}
                                    >
                                        {pair.heading}
                                    </div>
                                    <div
                                        className="ke-fp-pair-body"
                                        style={{ fontFamily: `'${pair.body}', sans-serif` }}
                                    >
                                        {pair.body}
                                    </div>
                                    <div className="ke-fp-pair-mood">{pair.mood}</div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* ── Font list ── */}
                <div className="ke-fp-list-label">
                    Tum Fontlar ({filteredFonts.length})
                </div>
                <div className="ke-fp-list" ref={listRef}>
                    {filteredFonts.length === 0 ? (
                        <div className="ke-fp-empty">
                            Aramanizla eslesen font bulunamadi.
                        </div>
                    ) : (
                        filteredFonts.map(font => (
                            <FontRow key={font.family} font={font} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
